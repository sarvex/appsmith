import { ReduxActionTypes } from "@appsmith/constants/ReduxActionConstants";
import type { ENTITY_TYPE, Log, Message } from "entities/AppsmithConsole";
import type { EventName } from "utils/AnalyticsUtil";

export interface LogDebuggerErrorAnalyticsPayload {
  entityName: string;
  entityId: string;
  entityType: ENTITY_TYPE;
  eventName: EventName;
  propertyPath: string;
  errorMessages?: Message[];
  errorMessage?: Message["message"];
  errorType?: Message["type"];
  errorSubType?: Message["subType"];
  analytics?: Log["analytics"];
}

export const debuggerLogInit = (payload: Log[]) => ({
  type: ReduxActionTypes.DEBUGGER_LOG_INIT,
  payload,
});

export const debuggerLog = (payload: Log[]) => ({
  type: ReduxActionTypes.DEBUGGER_LOG,
  payload,
});

export const clearLogs = () => ({
  type: ReduxActionTypes.CLEAR_DEBUGGER_LOGS,
});

export const showDebugger = (payload?: boolean) => ({
  type: ReduxActionTypes.SHOW_DEBUGGER,
  payload,
});

// Add an error
export const addErrorLogInit = (payload: Log[]) => ({
  type: ReduxActionTypes.DEBUGGER_ADD_ERROR_LOG_INIT,
  payload,
});

export const addErrorLogs = (payload: Log[]) => ({
  type: ReduxActionTypes.DEBUGGER_ADD_ERROR_LOGS,
  payload,
});

export const deleteErrorLogsInit = (
  payload: { id: string; analytics?: Log["analytics"] }[],
) => ({
  type: ReduxActionTypes.DEBUGGER_DELETE_ERROR_LOG_INIT,
  payload,
});

export const deleteErrorLog = (ids: string[]) => ({
  type: ReduxActionTypes.DEBUGGER_DELETE_ERROR_LOG,
  payload: ids,
});

// Only used for analytics
export const logDebuggerErrorAnalytics = (
  payload: LogDebuggerErrorAnalyticsPayload,
) => ({
  type: ReduxActionTypes.DEBUGGER_ERROR_ANALYTICS,
  payload,
});

export const hideDebuggerErrors = (payload: boolean) => ({
  type: ReduxActionTypes.HIDE_DEBUGGER_ERRORS,
  payload,
});

// set the selected tab in the debugger.
export const setDebuggerSelectedTab = (selectedTab: string) => {
  return {
    type: ReduxActionTypes.SET_DEBUGGER_SELECTED_TAB,
    payload: selectedTab,
  };
};

// set the height of the response pane in the debugger.
export const setResponsePaneHeight = (payload: number) => {
  return {
    type: ReduxActionTypes.SET_RESPONSE_PANE_HEIGHT,
    payload: { height: payload },
  };
};

// set the height of the response pane in the debugger.
export const setErrorCount = (payload: number) => {
  return {
    type: ReduxActionTypes.SET_ERROR_COUNT,
    payload: { count: payload },
  };
};

// set the height of the response pane in the debugger.
export const setResponsePaneScrollPosition = (payload: number) => {
  return {
    type: ReduxActionTypes.SET_RESPONSE_PANE_SCROLL_POSITION,
    payload: { position: payload },
  };
};

//toggle expand error log item state.
export const toggleExpandErrorLogItem = (id: string, isExpanded: boolean) => {
  return {
    type: ReduxActionTypes.TOGGLE_EXPAND_ERROR_LOG_ITEM,
    payload: { id, isExpanded },
  };
};
