import { UserEntity } from "interfaces.foudroyer.com";
import * as types from "./types";

interface AuthState {
  user: UserEntity | null;
  authenticated: boolean;
  isFetching: boolean;
  initialised: boolean;
}

const initialState: AuthState = {
  user: null,
  authenticated: false,
  isFetching: false,
  initialised: false,
};

export function authReducer(
  state = initialState,
  action: types.AuthActionTypes
): AuthState {
  if (action.type === types.storeUser) {
    return {
      ...state,
      user: action.payload,
      authenticated: true,
    };
  }

  if (action.type === types.setInitialised) {
    return {
      ...state,
      initialised: true,
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
