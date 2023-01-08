import { uuid4 } from "@sentry/utils";
import { EventType } from "constants/AppsmithActionConstants/ActionConstants";
import { LogObject, Methods, Severity } from "entities/AppsmithConsole";
import { klona } from "klona/lite";
import moment from "moment";
import { TriggerMeta } from "@appsmith/sagas/ActionExecution/ActionExecutionSagas";
import { ENTITY_TYPE } from "entities/DataTree/types";
import { TriggerEmitter } from "./utils/TriggerEmitter";

class UserLog {
  private source: any = {};
  public setupConsole(eventType?: EventType, triggerMeta?: TriggerMeta) {
    const type =
      eventType === EventType.ON_JS_FUNCTION_EXECUTE
        ? ENTITY_TYPE.JSACTION
        : ENTITY_TYPE.WIDGET;
    const name =
      triggerMeta?.source?.name || triggerMeta?.triggerPropertyName || "";
    const id = triggerMeta?.source?.id || "";
    this.setSource({ type, name, id });
  }

  public setSource(source: any) {
    this.source = source;
  }

  private saveLog(method: Methods, data: any[]) {
    const parsed = this.parseLogs(method, data);
    TriggerEmitter.getInstance().emit("process_logs", parsed);
  }

  public overrideConsoleAPI() {
    const { debug, error, info, log, table, warn } = self.console;
    self.console = {
      ...self.console,
      table: (...args: any) => {
        table.call(this, args);
        this.saveLog("table", args);
      },
      error: (...args: any) => {
        error.apply(this, args);
        this.saveLog("error", args);
      },
      log: (...args: any) => {
        log.apply(this, args);
        this.saveLog("log", args);
      },
      debug: (...args: any) => {
        debug.apply(this, args);
        this.saveLog("debug", args);
      },
      warn: (...args: any) => {
        warn.apply(this, args);
        this.saveLog("warn", args);
      },
      info: (...args: any) => {
        info.apply(this, args);
        this.saveLog("info", args);
      },
    };
  }
  private replaceFunctionWithNamesFromObjects(data: any) {
    if (typeof data === "function") return `func() ${data.name}`;
    if (!data || typeof data !== "object") return data;
    if (data instanceof Promise) return "Promise";
    const acc: any =
      Object.prototype.toString.call(data) === "[object Array]" ? [] : {};
    return Object.keys(data).reduce((acc, key) => {
      acc[key] = this.replaceFunctionWithNamesFromObjects(data[key]);
      return acc;
    }, acc);
  }
  // iterates over the data and if data is object/array, then it will remove any functions from it
  private sanitizeData(data: any): any {
    try {
      const returnData = this.replaceFunctionWithNamesFromObjects(data);
      return returnData;
    } catch (e) {
      return [`There was some error: ${e} ${JSON.stringify(data)}`];
    }
  }
  // parses the incoming log and converts it to the log object
  private parseLogs(method: Methods, data: any[]): LogObject {
    // Create an ID
    const id = uuid4();
    const timestamp = moment().format("hh:mm:ss");
    // Parse the methods
    let output = data;
    // For logs UI we only keep 3 levels of severity, info, warn, error
    let severity = Severity.INFO;
    if (method === "error") {
      severity = Severity.ERROR;
      output = data.map((error) => {
        return error?.stack || error;
      });
    } else if (method === "warn") {
      severity = Severity.WARNING;
    }

    return {
      method,
      id,
      data: this.sanitizeData(klona(output)),
      timestamp,
      severity,
      source: this.source,
    };
  }
}

const userLogs = new UserLog();

export default userLogs;