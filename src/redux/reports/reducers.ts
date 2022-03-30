import * as types from "./types";
import { ReportEntity } from "../../entities/ReportEntity";

interface ReportsState {
  reports: Array<ReportEntity>;
  isFetching: boolean;
}

const initialState: ReportsState = {
  reports: [],
  isFetching: false,
};

export function reportsReducer(
  state = initialState,
  action: types.ReportsActionTypes
): ReportsState {
  if (action.type === types.store) {
    return {
      ...state,
      reports: action.payload,
    };
  }
  if (action.type === types.setFetching) {
    return {
      ...state,
      isFetching: action.payload.value,
    };
  }

  return state;
}
