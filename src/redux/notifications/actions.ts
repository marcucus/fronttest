import { ThunkAction } from "redux-thunk";
import * as types from "./types";

export const store = (
  payload: types.storeAction["payload"]
): types.NotificationsActionTypes => ({
  type: types.store,
  payload,
});

export const remove = (
  payload: types.removeAction["payload"]
): types.NotificationsActionTypes => ({
  type: types.remove,
  payload,
});

export const create =
  (
    snack: Omit<types.storeAction["payload"], "id">
  ): ThunkAction<void, any, any, any> =>
  (dispatcher) => {
    const id = Date.now();
    const timeout = snack.timeout || 10000;

    dispatcher(store({ ...snack, id, timeout }));

    setTimeout(() => dispatcher(remove({ id })), timeout);
  };
