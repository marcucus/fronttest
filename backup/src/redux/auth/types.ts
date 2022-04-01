import { UserEntity } from "interfaces.foudroyer.com";

export const storeUser = "AUTH_STORE_USER";

export interface storeUserAction {
  type: typeof storeUser;
  payload: UserEntity;
}

export const setFetching = "AUTH_SET_FETCHING";

export interface setFetchingAction {
  type: typeof setFetching;
  payload: { value: boolean };
}

export const setInitialised = "AUTH_SET_INITIALISED";

export interface setInitialisedAction {
  type: typeof setInitialised;
}

export type AuthActionTypes =
  | storeUserAction
  | setFetchingAction
  | setInitialisedAction;
