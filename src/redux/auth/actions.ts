import { ThunkAction } from "redux-thunk";
import { actions } from "../actions";
import { RootState } from "../store";
import * as types from "./types";

export const storeUser = (
  payload: types.storeUserAction["payload"]
): types.AuthActionTypes => ({
  type: types.storeUser,
  payload,
});

export const setFetching = (
  payload: types.setFetchingAction["payload"]
): types.AuthActionTypes => ({
  type: types.setFetching,
  payload,
});

export const setInitialised = (): types.AuthActionTypes => ({
  type: types.setInitialised,
});

export const logout = (
  payload: types.setFetchingAction["payload"]
): types.AuthActionTypes => ({
  type: types.setFetching,
  payload,
});

export const $logout =
  (): ThunkAction<void, RootState, any, any> =>
  async (dispatcher, getState) => {
    const { di } = getState();

    di.AnalyticsService.send({
      action: "logout",
      category: "authentication",
    });
    di.AnalyticsService.logout();
  };

export const $authenticateWithGoogle =
  (): ThunkAction<void, RootState, any, any> =>
  async (dispatcher, getState) => {
    const { di } = getState();

    dispatcher(setFetching({ value: true }));

    const response = await di.AuthRepository.authenticateWithGoogle();

    if (response.error === true) {
      dispatcher(
        actions.notifications.create({
          type: "error",
          message: response.code,
          timeout: 10000,
        })
      );
    } else {
      di.LocalStorageService.storeToken(response.body.token);
      const userInfo = await di.AuthRepository.getUserInfo();

      if (userInfo.error === false) {
        di.AnalyticsService.authenticate({ id: userInfo.body.id });
        di.AnalyticsService.send({
          action: "login",
          category: "authentication",
        });

        dispatcher(storeUser(userInfo.body));
        di.LocationService.navigate("/tools/");
      }
    }

    dispatcher(setFetching({ value: false }));
  };

export const $isAuthenticated =
  (): ThunkAction<void, RootState, any, any> =>
  async (dispatcher, getState) => {
    const { di } = getState();

    dispatcher(setFetching({ value: true }));

    const user = await di.AuthRepository.getUserInfo();

    if (user.error === false) {
      di.AnalyticsService.authenticate({ id: user.body.id });
      dispatcher(storeUser(user.body));
    } else {
      di.LocationService.navigate("/");
    }

    dispatcher(setInitialised());
    dispatcher(setFetching({ value: false }));
  };
