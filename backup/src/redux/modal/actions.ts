import * as types from "./types";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";

export const close = (): types.ModalActionTypes => ({
  type: types.close,
});

export const storeOpen = (): types.ModalActionTypes => ({
  type: types.open,
});

export const openCta = (
  payload: types.openCtaAction["payload"]
): types.ModalActionTypes => ({
  type: types.openCta,
  payload,
});

export const closeCta = (): types.ModalActionTypes => ({
  type: types.closeCta,
});

export const onOpenComingSoon = (
  payload: types.onOpenComingSoonAction["payload"]
): types.ModalActionTypes => ({
  type: types.onOpenComingSoon,
  payload,
});

export const onCloseComingSoon = (): types.ModalActionTypes => ({
  type: types.onCloseComingSoon,
});

export const ctaFetching = () => ({
  type: types.ctaFetching,
});

export const ctaFetchEnd = () => ({
  type: types.ctaFetchEnd,
});

export const fetchSubmit =
  (): ThunkAction<any, RootState, any, any> => async (dispatch, getState) => {
    const { modal } = getState();

    if (modal.cta.onSubmit) modal.cta.onSubmit();

    dispatch(closeCta());
  };
