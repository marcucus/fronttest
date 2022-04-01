import * as types from "./types";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { actions } from "../actions";
import { NotificationMessageEntity } from "../../entities/NotificationEntity";

export const add = (
  payload: types.AddAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.Add,
  payload,
});

export const store = (
  payload: types.StoreAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.Store,
  payload,
});

export const storeGoogleWebsites = (
  payload: types.StoreGoogleAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.StoreGoogle,
  payload,
});

export const remove = (
  payload: types.RemoveAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.Remove,
  payload,
});

export const updateWebsite = (
  payload: types.updateWebsiteAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.updateWebsite,
  payload,
});

/*********************************************************
 *
 * Sitemap
 *
 *********************************************************/

export const updateSitemap = (
  payload: types.UpdateSitemapAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.UpdateSitemap,
  payload,
});

export const setOpenSitemapModal = (
  payload: types.setOpenSitemapModalAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.setOpenSitemapModal,
  payload,
});

export const setSitemapFetching = (
  payload: types.SetSitemapFetchingAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.SetSitemapFetching,
  payload,
});

export const $saveSitemap =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    const { di, websites } = getState();

    if (!websites.addSitemap.value) {
      dispatcher(
        actions.notifications.create({
          message: NotificationMessageEntity.WEBSITES_SITEMAP_UPDATE_EMPTY,
          type: "error",
        })
      );

      return false;
    }

    dispatcher(setSitemapFetching({ value: true }));

    const website = await di.WebsitesRepository.updateSitemap({
      website: websites.selected as string,
      sitemap: websites.addSitemap.value,
    });

    if (website.error === true) {
      dispatcher(
        actions.notifications.create({
          type: "error",
          message: website.code,
        })
      );

      dispatcher(setSitemapFetching({ value: false }));

      return false;
    }

    dispatcher(updateWebsite({ website: website.body }));
    dispatcher(setSitemapFetching({ value: false }));
    dispatcher(actions.reports.$fetch());
    dispatcher(actions.pages.$fetchRecentlyUpdated());
    dispatcher(actions.pages.$fetch());
  };
/*********************************************************
 *
 * Sitemap
 *
 *********************************************************/

export const updateCredentials = (
  payload: types.updateCredentialsAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.updateCredentials,
  payload,
});

export const setCredentialsFetching = (
  payload: types.setCredentialsFetchingAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.setCredentialsFetching,
  payload,
});

export const setIsCredentialsAreGood = (
  payload: types.setIsCredentialsAreGoodAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.setIsCredentialsAreGood,
  payload,
});

export const setCredentialsIsOpen = (
  payload: types.setCredentialsIsOpenAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.setCredentialsIsOpen,
  payload,
});

export const $saveCredentials =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    const { di, websites } = getState();

    if (!websites.addCredentials.value) {
      dispatcher(
        actions.notifications.create({
          message: NotificationMessageEntity.WEBSITES_CREDENTIALS_UPDATE_EMPTY,
          type: "error",
        })
      );

      return false;
    }

    dispatcher(setCredentialsFetching({ value: true }));

    const response = await di.WebsitesRepository.updateCredentials({
      website: websites.selected as string,
      credentials: websites.addCredentials.value,
    });

    if (response.error === true) {
      dispatcher(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      );

      dispatcher(setCredentialsFetching({ value: false }));

      return false;
    }

    dispatcher(setCredentialsFetching({ value: false }));
    dispatcher(setCredentialsIsOpen({ value: false }));
    dispatcher(setIsCredentialsAreGood({ value: true }));
  };

export const $refreshSitemapAndIndexation =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    const { di, websites } = getState();

    if (!websites.selected) {
      return dispatcher(
        actions.notifications.create({
          message: NotificationMessageEntity.WEBSITES_NOT_SELECTED,
          type: "error",
        })
      );
    }

    dispatcher(actions.loader.setLoading({ value: true }));

    const response = await di.WebsitesRepository.refreshSitemapAndIndexation({
      websiteId: websites.selected,
    });

    if (response.error === true) {
      dispatcher(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      );

      return dispatcher(actions.loader.setLoading({ value: false }));
    }

    dispatcher(actions.loader.setLoading({ value: false }));

    return dispatcher(
      actions.notifications.create({
        message: NotificationMessageEntity.SYNC_SUCCESS,
        type: "success",
        timeout: 10000,
      })
    );
  };

export const setFetching = (
  payload: types.SetFetchingAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.SetFetching,
  payload,
});

export const storeCheck = (
  payload: types.storeCheckAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.storeCheck,
  payload,
});

export const selectWebsite = (
  payload: types.SelectWebsiteAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.SelectWebsite,
  payload,
});

export const $selectWebsite =
  (
    payload: types.SelectWebsiteAction["payload"]
  ): ThunkAction<any, RootState, any, any> =>
  async (dispatcher, getState) => {
    const { di } = getState();

    dispatcher(selectWebsite(payload));

    dispatcher(setFetching(true));

    const response = await di.WebsitesRepository.check({
      website: payload,
    });

    if (response.error) {
      dispatcher(setFetching(true));
      return dispatcher(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      );
    }

    dispatcher(storeCheck(response.body));
    dispatcher(setFetching(false));
  };

export const setIsOpenCreateModal = (
  payload: types.SetIsOpenCreateModalAction["payload"]
): types.WebsitesActionTypes => ({
  type: types.SetIsOpenCreateModal,
  payload,
});

export const $activate =
  (domain: string): ThunkAction<any, RootState, any, any> =>
  async (dispatcher, getState) => {
    const { di } = getState();

    dispatcher(setFetching(true));

    const response = await di.WebsitesRepository.activate(domain);

    if (response.error) {
      dispatcher(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      );

      return dispatcher(setFetching(false));
    }

    await dispatcher($fetchAll());

    dispatcher(
      actions.notifications.create({
        type: "success",
        message: NotificationMessageEntity.WEBSITES_CREATE_SUCCESS,
      })
    );
  };

export const $fetchAll =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    const { di } = getState();

    dispatcher(setFetching(true));

    const response = await di.WebsitesRepository.fetch();

    if (response.error === true) {
      dispatcher(setFetching(false));
      return dispatcher(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      );
    }

    dispatcher(store({ websites: response.body.websites }));
    dispatcher(storeGoogleWebsites({ websites: response.body.google }));

    dispatcher(setFetching(false));
  };

export const $fetch =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    dispatcher($fetchAll());
  };
