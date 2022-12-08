import {
  ReduxActionTypes,
  ReduxAction,
} from "@appsmith/constants/ReduxActionConstants";
import { Action } from "entities/Action";

export const changeQuery = (
  id: string,
  newQuery?: boolean,
  action?: Action,
): ReduxAction<{
  id: string;
  newQuery?: boolean;
  action?: any;
}> => {
  return {
    type: ReduxActionTypes.QUERY_PANE_CHANGE,
    payload: { id, newQuery, action },
  };
};

export const setQueryPaneConfigSelectedTabIndex: (
  payload: number,
) => ReduxAction<{ selectedTabIndex: number }> = (payload: number) => ({
  type: ReduxActionTypes.SET_QUERY_PANE_CONFIG_SELECTED_TAB,
  payload: { selectedTabIndex: payload },
});

export const setQueryPaneResponseSelectedTab: (
  payload: string,
) => ReduxAction<{ selectedTab: string }> = (payload: string) => ({
  type: ReduxActionTypes.SET_QUERY_PANE_RESPONSE_SELECTED_TAB,
  payload: { selectedTab: payload },
});

export const setQueryPaneResponsePaneHeight: (
  payload: number,
) => ReduxAction<{ height: number }> = (payload: number) => ({
  type: ReduxActionTypes.SET_QUERY_PANE_RESPONSE_PANE_HEIGHT,
  payload: { height: payload },
});

export const setFocusableFormControlField = (key?: string) => {
  return {
    type: ReduxActionTypes.SET_FOCUSABLE_FORM_CONTROL_FIELD,
    payload: { key },
  };
};

export const setFocusableFormControlFieldInit = (key?: string) => {
  return {
    type: ReduxActionTypes.SET_FOCUSABLE_FORM_CONTROL_FIELD_INIT,
    payload: { key },
  };
};
