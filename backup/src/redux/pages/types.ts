import { PageEntity } from "interfaces.foudroyer.com";

export const Store = "PAGES_STORE";
export interface StoreAction {
  type: typeof Store;
  payload: { pages: PageEntity[] };
}

export const StoreRecently = "PAGES_STORE_RECENTLY";
export interface StoreRecentlyAction {
  type: typeof StoreRecently;
  payload: { pages: PageEntity[] };
}

/*********************************************************
 *
 * Pagination
 *
 *********************************************************/

export const paginationLimitUpdate = "pages/paginationLimitUpdate";
export interface paginationLimitUpdateAction {
  type: typeof paginationLimitUpdate;
  payload: { value: number };
}

export const paginationUpdate = "pages/paginationUpdate";
export interface paginationUpdateAction {
  type: typeof paginationUpdate;
  payload: { value: number };
}

export const storeTotal = "pages/storeTotal";
export interface storeTotalAction {
  type: typeof storeTotal;
  payload: { value: number };
}

export const resetPagination = "pages/resetPagination";
export interface resetPaginationAction {
  type: typeof resetPagination;
}

export const ToggleFilter = "PAGES_TOGGLE_FILTER";
export interface ToggleFilterAction {
  type: typeof ToggleFilter;
  payload: { type: PageEntity["indexation_state"] | null };
}

export const FilterFieldsUpdate = "PAGES_FILTER_FIELDS_UPDATE";
export interface FilterFieldsUpdateAction {
  type: typeof FilterFieldsUpdate;
  payload:
    | { type: "from" | "to"; value: Date | null }
    | { type: "sort"; value: "asc" | "desc" };
}

export const FilterFieldsReset = "PAGES_FILTER_FIELDS_RESET";
export interface FilterFieldsResetAction {
  type: typeof FilterFieldsReset;
}

export const FilterFieldsApply = "PAGES_FILTER_FIELDS_APPLY";
export interface FilterFieldsApplyAction {
  type: typeof FilterFieldsApply;
}

export const TogglePageInfo = "PAGES_TOGGLE_PAGE_INFO";
export interface TogglePageInfoAction {
  type: typeof TogglePageInfo;
  payload: { url: PageEntity["url"] };
}

export const ToggleAllPageInfo = "PAGES_TOGGLE_ALL_PAGE_INFO";
export interface ToggleAllPageInfoAction {
  type: typeof ToggleAllPageInfo;
}

export const ToggleFilterPanel = "PAGES_TOGGLE_FILTER_PANEL";
export interface ToggleFilterPanelAction {
  type: typeof ToggleFilterPanel;
}

export const Add = "PAGES_ADD";
export interface AddAction {
  type: typeof Add;
  payload: { pages: PageEntity[] };
}

export const ApplyFilter = "PAGES_APPLY_FILTER";
export interface ApplyFilterAction {
  type: typeof ApplyFilter;
}

export const SetFetching = "PAGES_SET_FETCHING";
export interface SetFetchingAction {
  type: typeof SetFetching;
  payload: { fetching: boolean };
}

export const SetFetchingRecently = "PAGES_SET_FETCHING_RECENTLY";
export interface SetFetchingRecentlyAction {
  type: typeof SetFetchingRecently;
  payload: { fetching: boolean };
}

export const SetAddPagesModalOpen = "PAGES_SET_ADD_MODAL_IS_OPEN";
export interface SetAddPagesModalOpenAction {
  type: typeof SetAddPagesModalOpen;
  payload: { isOpen: boolean };
}

export const SetAddPagesFetching = "PAGES_ADD_MODAL_FETCHING";
export interface SetAddPagesFetchingAction {
  type: typeof SetAddPagesFetching;
  payload: { fetching: boolean };
}

export const UpdateAddPagesModalValue = "PAGES_UPDATE_ADD_PAGES_MODAL_VALUE";
export interface UpdateAddPagesModalValueAction {
  type: typeof UpdateAddPagesModalValue;
  payload: { value: string };
}

export const FilterByName = "PAGES_FILTER_BY_NAME";
export interface FilterByNameAction {
  type: typeof FilterByName;
  payload: { name: string };
}

export const Remove = "PAGES_REMOVE";
export interface RemoveAction {
  type: typeof Remove;
  payload: { id: string };
}

export const IndexProcessingSetFetching = "PAGES_IndexProcessingSetFetching";
export interface IndexProcessingSetFetchingAction {
  type: typeof IndexProcessingSetFetching;
  payload: { fetching: boolean };
}

export const IndexProcessingSetError = "PAGES_IndexProcessingSetError";
export interface IndexProcessingSetErrorAction {
  type: typeof IndexProcessingSetError;
  payload: { error: string };
}

export const IndexProcessingIncrementNumberProcessed =
  "PAGES_IndexProcessingIncrementNumberProcessed";
export interface IndexProcessingIncrementNumberProcessedAction {
  type: typeof IndexProcessingIncrementNumberProcessed;
}

export type PagesActionTypes =
  | StoreAction
  | AddAction
  | RemoveAction
  | IndexProcessingSetFetchingAction
  | IndexProcessingSetErrorAction
  | IndexProcessingIncrementNumberProcessedAction
  | ApplyFilterAction
  | SetAddPagesFetchingAction
  | SetFetchingAction
  | SetAddPagesModalOpenAction
  | UpdateAddPagesModalValueAction
  | ToggleFilterAction
  | ToggleFilterPanelAction
  | TogglePageInfoAction
  | ToggleAllPageInfoAction
  | FilterFieldsUpdateAction
  | FilterFieldsApplyAction
  | SetFetchingRecentlyAction
  | FilterFieldsResetAction
  | FilterByNameAction
  | StoreRecentlyAction
  /*********************************************************
   *
   * Pagination
   *
   *********************************************************/
  | paginationUpdateAction
  | storeTotalAction
  | resetPaginationAction
  | paginationLimitUpdateAction;
