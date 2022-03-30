import { ThunkAction } from "redux-thunk";
import { NotificationMessageEntity } from "../../entities/NotificationEntity";
import { actions } from "../actions";
import { RootState } from "../store";
import * as types from "./types";

export const store = (
  payload: types.storeAction["payload"]
): types.ReportsActionTypes => ({
  type: types.store,
  payload,
});

export const setFetching = (
  payload: types.setFetchingAction["payload"]
): types.ReportsActionTypes => ({
  type: types.setFetching,
  payload,
});

export const $fetch =
  (): ThunkAction<void, RootState, any, any> =>
  async (dispatcher, getState) => {
    const { di, websites } = getState();

    if (!websites.selected) {
      dispatcher(
        actions.notifications.create({
          type: "info",
          message: NotificationMessageEntity.WEBSITES_NOT_SELECTED,
        })
      );

      return di.LocationService.navigate("/indexation/");
    }

    dispatcher(setFetching({ value: true }));

    const response = await di.ReportsRepository.fetch({
      website: websites.selected,
    });

    if (response.error === true) {
      dispatcher(setFetching({ value: false }));

      return dispatcher(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      );
    }

    dispatcher(store(response.body));
    dispatcher(setFetching({ value: false }));
  };
