import { ReportEntity } from "../../entities/ReportEntity";

export const store = "REDUX_REPORTS_STORE";

export interface storeAction {
  type: typeof store;
  payload: ReportEntity[];
}

export const setFetching = "REDUX_REPORTS_setFetching";

export interface setFetchingAction {
  type: typeof setFetching;
  payload: { value: boolean };
}

export type ReportsActionTypes = storeAction | setFetchingAction;
