import { WebsiteEntity } from "interfaces.foudroyer.com";
import { CheckResponseEntity } from "../../interfaces/IWebsitesRepository";

export const Select = "websites/SELECT";
export interface SelectAction {
  type: typeof Select;
  payload: { id: WebsiteEntity["id"] };
}

export const Add = "websites/ADD";
export interface AddAction {
  type: typeof Add;
  payload: { websites: WebsiteEntity[] };
}

export const updateWebsite = "websites/updateWebsite";
export interface updateWebsiteAction {
  type: typeof updateWebsite;
  payload: { website: WebsiteEntity };
}

export const setOpenSitemapModal = "websites/setOpenSitemapModal";
export interface setOpenSitemapModalAction {
  type: typeof setOpenSitemapModal;
  payload: { value: boolean };
}

export const Store = "websites/STORE";
export interface StoreAction {
  type: typeof Store;
  payload: { websites: WebsiteEntity[] };
}

export const StoreGoogle = "websites/GOOGLE_STORE";
export interface StoreGoogleAction {
  type: typeof StoreGoogle;
  payload: { websites: WebsiteEntity[] };
}

/*********************************************************
 *
 * Credentials
 *
 *********************************************************/

export const setCredentialsFetching = "websites/setCredentialsFetching";
export interface setCredentialsFetchingAction {
  type: typeof setCredentialsFetching;
  payload: { value: boolean };
}

export const setIsCredentialsAreGood = "websites/setIsCredentialsAreGood";
export interface setIsCredentialsAreGoodAction {
  type: typeof setIsCredentialsAreGood;
  payload: { value: boolean };
}

export const setCredentialsIsOpen = "websites/setCredentialsIsOpen";
export interface setCredentialsIsOpenAction {
  type: typeof setCredentialsIsOpen;
  payload: { value: boolean };
}

export const updateCredentials = "websites/updateCredentials";
export interface updateCredentialsAction {
  type: typeof updateCredentials;
  payload: { value: string };
}

/*********************************************************
 *
 * Sitemap
 *
 *********************************************************/

export const SetSitemapFetching = "websites/SET_SITEMAP_FETCHING";
export interface SetSitemapFetchingAction {
  type: typeof SetSitemapFetching;
  payload: { value: boolean };
}

export const UpdateSitemap = "websites/UPDATE_SITEMAP";
export interface UpdateSitemapAction {
  type: typeof UpdateSitemap;
  payload: { value: string };
}

export const Remove = "websites/REMOVE";
export interface RemoveAction {
  type: typeof Remove;
  payload: { id: WebsiteEntity["id"] };
}

export const SetFetching = "websites/SET_FETCHING";
export interface SetFetchingAction {
  type: typeof SetFetching;
  payload: boolean;
}

export const SelectWebsite = "websites/SELECT_WEBSITE";
export interface SelectWebsiteAction {
  type: typeof SelectWebsite;
  payload: WebsiteEntity["id"];
}

export const storeCheck = "websites/storeCheck";
export interface storeCheckAction {
  type: typeof storeCheck;
  payload: CheckResponseEntity;
}

export const SetIsOpenCreateModal = "websites/SET_IS_OPEN_CREATE_MODAL";
export interface SetIsOpenCreateModalAction {
  type: typeof SetIsOpenCreateModal;
  payload: boolean;
}

export const Update = "websites/UPDATE";
export interface UpdateAction {
  type: typeof Update;
  payload: WebsiteEntity;
}

export const refreshSitemapAndIndexation =
  "websites/refreshSitemapAndIndexation";
export interface refreshSitemapAndIndexationAction {
  type: typeof refreshSitemapAndIndexation;
}

export const DraftUpdate = "websites/DRAFT_UPDATE";
export interface DraftUpdateAction {
  type: typeof DraftUpdate;
  payload: {
    [key: string]: string;
  };
}

export const DraftUpdateFetching = "websites/DRAFT_UPDATE_FETCHING";
export interface DraftUpdateFetchingAction {
  type: typeof DraftUpdateFetching;
  payload: boolean;
}

export const DraftClear = "websites/DRAFT_CLEAR";
export interface DraftClearAction {
  type: typeof DraftClear;
}

export const DraftSetUrlChecked = "websites/DRAFT_SET_URL_CHECKED";
export interface DraftSetUrlCheckedAction {
  type: typeof DraftSetUrlChecked;
  payload: boolean;
}

export type WebsitesActionTypes =
  | UpdateAction
  | AddAction
  | SetFetchingAction
  | SelectWebsiteAction
  | SetIsOpenCreateModalAction
  | DraftClearAction
  | DraftUpdateFetchingAction
  | DraftSetUrlCheckedAction
  | DraftUpdateAction
  | StoreAction
  | RemoveAction
  | SetSitemapFetchingAction
  | UpdateSitemapAction
  | StoreGoogleAction
  | updateWebsiteAction
  | setOpenSitemapModalAction
  | setCredentialsFetchingAction
  | setIsCredentialsAreGoodAction
  | updateCredentialsAction
  | setCredentialsIsOpenAction
  | storeCheckAction
  | refreshSitemapAndIndexationAction
  | SelectAction;
