import React, { useRef, useCallback } from "react";
import type { RefObject } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Icon, IconSize } from "design-system-old";
import {
  createMessage,
  DEBUGGER_ERRORS,
  DEBUGGER_LOGS,
  INSPECT_ENTITY,
} from "@appsmith/constants/messages";
import { showDebugger } from "actions/debuggerActions";
import { setDatasourcePaneResponsePaneHeight } from "actions/datasourceActions";
import { setQueryPaneResponseSelectedTab } from "actions/queryPaneActions";
import Resizable, {
  ResizerCSS,
} from "components/editorComponents/Debugger/Resizer";
import EntityBottomTabs from "components/editorComponents/EntityBottomTabs";
import { DEBUGGER_TAB_KEYS } from "components/editorComponents/Debugger/helpers";
import Errors from "components/editorComponents/Debugger/Errors";
import DebbuggerLogs from "components/editorComponents/Debugger/DebuggerLogs";
import EntityDeps from "components/editorComponents/Debugger/EntityDependecies";
import { getDatasourceResponsePaneHeight } from "selectors/datasourceSelectors";
import { getQueryPaneResponseSelectedTab } from "selectors/queryPaneSelectors";
import { ActionExecutionResizerHeight } from "../APIEditor/constants";

export const TabbedViewContainer = styled.div`
  ${ResizerCSS}
  height: ${ActionExecutionResizerHeight}px;
  // Minimum height of bottom tabs as it can be resized
  min-height: 36px;
  width: 100%;
  .react-tabs__tab-panel {
    overflow: hidden;
  }
  .react-tabs__tab-list {
    margin: 0px;
  }
  &&& {
    ul.react-tabs__tab-list {
      margin: 0px ${(props) => props.theme.spaces[11]}px;
      background-color: ${(props) =>
        props.theme.colors.apiPane.responseBody.bg};
    }
    .react-tabs__tab-panel {
      height: calc(100% - 36px);
    }
  }
  .close-debugger {
    position: absolute;
    top: 0px;
    right: 0px;
    padding: 9px 11px;
  }
  background-color: ${(props) => props.theme.colors.apiPane.responseBody.bg};
  border-top: 1px solid #e8e8e8;
`;

export const ResizerMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 50px);
  overflow: hidden;
  gap: 10px;
  .db-form-resizer-content {
    flex-direction: column;
  }
`;

export const ResizerContentContainer = styled.div`
  overflow: auto;
  flex: 1;
  position: relative;
  display: flex;
`;

export default function Debugger() {
  const dispatch = useDispatch();

  const panelRef: RefObject<HTMLDivElement> = useRef(null);

  // fetch the height of the response pane from the store
  const responsePaneHeight = useSelector(getDatasourceResponsePaneHeight);

  // fetch the selected tab from the store
  const selectedResponseTab = useSelector(getQueryPaneResponseSelectedTab);

  // define the tabs for the debugger
  const DEBUGGER_TABS = [
    {
      key: DEBUGGER_TAB_KEYS.ERROR_TAB,
      title: createMessage(DEBUGGER_ERRORS),
      panelComponent: <Errors hasShortCut />,
    },
    {
      key: DEBUGGER_TAB_KEYS.LOGS_TAB,
      title: createMessage(DEBUGGER_LOGS),
      panelComponent: <DebbuggerLogs hasShortCut />,
    },
    {
      key: DEBUGGER_TAB_KEYS.INSPECT_TAB,
      title: createMessage(INSPECT_ENTITY),
      panelComponent: <EntityDeps />,
    },
  ];

  // set the height of the response pane in the store
  const setResponsePaneHeight = useCallback((height: number) => {
    dispatch(setDatasourcePaneResponsePaneHeight(height));
  }, []);

  // set the selected tab in the store
  const setSelectedResponseTab = useCallback((tabKey: string) => {
    dispatch(setQueryPaneResponseSelectedTab(tabKey));
  }, []);

  // close the debugger
  //TODO: move this to a common place
  const onClose = () => dispatch(showDebugger(false));

  return (
    <TabbedViewContainer
      className="t--datasource-bottom-pane-container"
      ref={panelRef}
    >
      <Resizable
        initialHeight={responsePaneHeight}
        onResizeComplete={(height: number) => setResponsePaneHeight(height)}
        openResizer={false}
        panelRef={panelRef}
        snapToHeight={ActionExecutionResizerHeight}
      />

      <EntityBottomTabs
        expandedHeight={`${ActionExecutionResizerHeight}px`}
        onSelect={setSelectedResponseTab}
        selectedTabKey={selectedResponseTab}
        tabs={DEBUGGER_TABS}
      />

      <Icon
        className="close-debugger t--close-debugger"
        name="close-modal"
        onClick={onClose}
        size={IconSize.MEDIUM}
      />
    </TabbedViewContainer>
  );
}
