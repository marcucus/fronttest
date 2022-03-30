import * as types from "./types";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { actions } from "../actions";
import { ErrorEntity, PageEntity } from "interfaces.foudroyer.com";
import { NotificationMessageEntity } from "../../entities/NotificationEntity";

export const store = (
  payload: types.StoreAction["payload"]
): types.PagesActionTypes => ({
  type: types.Store,
  payload,
});

export const storeRecentlyUpdatedPages = (
  payload: types.StoreRecentlyAction["payload"]
): types.PagesActionTypes => ({
  type: types.StoreRecently,
  payload,
});

export const toggleFilterPanel = (): types.PagesActionTypes => ({
  type: types.ToggleFilterPanel,
});

export const togglePageInfo = (
  payload: types.TogglePageInfoAction["payload"]
): types.PagesActionTypes => ({
  type: types.TogglePageInfo,
  payload,
});

export const toggleAllPageInfo = (): types.PagesActionTypes => ({
  type: types.ToggleAllPageInfo,
});

export const toggleFilter = (
  payload: types.ToggleFilterAction["payload"]
): types.PagesActionTypes => ({
  type: types.ToggleFilter,
  payload,
});

export const $toggleFilter =
  (
    payload: types.ToggleFilterAction["payload"]
  ): ThunkAction<any, RootState, any, any> =>
  async (dispatcher, getState) => {
    dispatcher(toggleFilter(payload));
    dispatcher($fetch());
  };

export const add = (
  payload: types.AddAction["payload"]
): types.PagesActionTypes => ({
  type: types.Add,
  payload,
});

export const setFetching = (
  payload: types.SetFetchingAction["payload"]
): types.PagesActionTypes => ({
  type: types.SetFetching,
  payload,
});

export const setFetchingRecently = (
  payload: types.SetFetchingRecentlyAction["payload"]
): types.PagesActionTypes => ({
  type: types.SetFetchingRecently,
  payload,
});

export const addPagesSetFetching = (
  payload: types.SetAddPagesFetchingAction["payload"]
): types.PagesActionTypes => ({
  type: types.SetAddPagesFetching,
  payload,
});

export const setAddPagesModalOpen = (
  payload: types.SetAddPagesModalOpenAction["payload"]
): types.PagesActionTypes => ({
  type: types.SetAddPagesModalOpen,
  payload,
});

export const updateAddPagesModalValue = (
  payload: types.UpdateAddPagesModalValueAction["payload"]
): types.PagesActionTypes => ({
  type: types.UpdateAddPagesModalValue,
  payload,
});

export const $fetchWithSearch =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    const { di, pages } = getState();

    di.AnalyticsService.send({
      category: "pages",
      action: "search",
      data: {
        query: pages.filterNameValue,
      },
    });

    if (pages.fetching) return true;

    dispatcher(pagination.reset());
    dispatcher($fetch());
  };

export const $fetchRecentlyUpdated =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    const { di, websites } = getState();

    if (!websites.selected) return di.LocationService.navigate("/indexation/");

    dispatcher(setFetchingRecently({ fetching: true }));

    const response = await di.PagesRepository.fetch({
      filter: {
        website: websites.selected,
        indexation: null,
        from: null,
        to: null,
        limit: 10,
        offset: 1,
        sort: "desc",
      },
    });

    if (response.error === true) {
      dispatcher(setFetching({ fetching: false }));
      return dispatcher(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      );
    }

    dispatcher(storeRecentlyUpdatedPages({ pages: [...response.body.pages] }));

    dispatcher(setFetchingRecently({ fetching: false }));
  };

export const applyFilter = (): types.PagesActionTypes => ({
  type: types.ApplyFilter,
});

export const filterByName = (
  payload: types.FilterByNameAction["payload"]
): types.PagesActionTypes => ({
  type: types.FilterByName,
  payload,
});

export const $filterByName =
  (
    payload: types.FilterByNameAction["payload"]
  ): ThunkAction<any, RootState, any, any> =>
  async (dispatcher, getState) => {
    dispatcher(filterByName(payload));
  };

export const indexProcessingSetFetching = (
  payload: types.IndexProcessingSetFetchingAction["payload"]
): types.PagesActionTypes => ({
  type: types.IndexProcessingSetFetching,
  payload,
});

export const indexProcessingSetError = (
  payload: types.IndexProcessingSetErrorAction["payload"]
): types.PagesActionTypes => ({
  type: types.IndexProcessingSetError,
  payload,
});

export const indexProcessingIncrementNumberProcessed =
  (): types.PagesActionTypes => ({
    type: types.IndexProcessingIncrementNumberProcessed,
  });

export const $index =
  (page?: PageEntity): ThunkAction<any, RootState, any, any> =>
  async (dispatcher, getState) => {
    const { di, pages, websites } = getState();

    if (!websites.areCredentialsGood) {
      return dispatcher(actions.websites.setCredentialsIsOpen({ value: true }));
    }

    dispatcher(indexProcessingSetFetching({ fetching: true }));

    const pagesToIndex = page ? [page] : pages.pages;

    for (const page of pagesToIndex) {
      const response = await di.IndexationService.index({
        url: page.url,
        website: page.fk_website_id,
      });

      dispatcher(indexProcessingIncrementNumberProcessed());

      if (response.error === true) {
        dispatcher(indexProcessingSetError({ error: response.code }));
        dispatcher(indexProcessingSetFetching({ fetching: false }));

        if (
          response.code === ErrorEntity.GOOGLE_CLOUD_API_ACCOUNT_NOT_FOUND ||
          response.code === ErrorEntity.GOOGLE_CLOUD_API_KEY_BAD_FORMED ||
          response.code === ErrorEntity.GOOGLE_CLOUD_API_KEY_PERMISSION_DENIED
        ) {
          dispatcher(
            actions.notifications.create({
              type: "error",
              message: response.code,
              timeout: 10000,
              onValidate: () => {
                dispatcher(
                  actions.websites.setCredentialsIsOpen({ value: true })
                );
              },
            })
          );
        } else {
          dispatcher(
            actions.notifications.create({
              type: "error",
              message: response.code,
              timeout: 10000,
            })
          );
        }

        return;
      }
    }

    dispatcher(indexProcessingSetFetching({ fetching: false }));
    dispatcher(
      actions.notifications.create({
        type: "success",
        message: NotificationMessageEntity.INDEXATION_SUCCESS,
        timeout: 10000,
      })
    );
  };

/*********************************************************
 *
 * Pagination
 *
 *********************************************************/

export const pagination = {
  reset: (): types.PagesActionTypes => ({
    type: types.resetPagination,
  }),
  total: {
    update: (
      payload: types.storeTotalAction["payload"]
    ): types.PagesActionTypes => ({
      type: types.storeTotal,
      payload,
    }),
  },
  limit: {
    update: (
      payload: types.paginationLimitUpdateAction["payload"]
    ): types.PagesActionTypes => ({
      type: types.paginationLimitUpdate,
      payload,
    }),
  },
  $next:
    (): ThunkAction<any, RootState, any, any> =>
    async (dispatcher, getState) => {
      const { pages } = getState();
      const total = pages.pagination.total;
      const limit = pages.pagination.limit;
      const nextPage = pages.pagination.page + 1;

      if (Math.ceil(total / limit) < nextPage) return false;

      dispatcher(pagination.page.update({ value: nextPage }));
      dispatcher($fetch());
    },
  $previous:
    (): ThunkAction<any, RootState, any, any> =>
    async (dispatcher, getState) => {
      const { pages } = getState();
      const previousPage = pages.pagination.page - 1;

      if (previousPage <= 0) return false;

      dispatcher(pagination.page.update({ value: previousPage }));
      dispatcher($fetch());
    },
  $select:
    (page: number): ThunkAction<any, RootState, any, any> =>
    async (dispatcher, getState) => {
      dispatcher(pagination.page.update({ value: page }));
      dispatcher($fetch());
    },
  page: {
    update: (
      payload: types.paginationUpdateAction["payload"]
    ): types.PagesActionTypes => ({
      type: types.paginationUpdate,
      payload,
    }),
  },
};

export const filter = {
  fields: {
    update: (
      payload: types.FilterFieldsUpdateAction["payload"]
    ): types.PagesActionTypes => ({
      type: types.FilterFieldsUpdate,
      payload,
    }),
    reset: (): types.PagesActionTypes => ({
      type: types.FilterFieldsReset,
    }),
    apply: (): types.PagesActionTypes => ({
      type: types.FilterFieldsApply,
    }),
    $apply:
      (): ThunkAction<any, RootState, any, any> =>
      async (dispatcher, getState) => {
        dispatcher(filter.fields.apply());
        dispatcher($fetch());
      },
  },
};

export const $fetch =
  (): ThunkAction<any, RootState, any, any> => async (dispatcher, getState) => {
    const { di, pages, websites } = getState();

    if (!websites.selected) return di.LocationService.navigate("/indexation/");

    dispatcher(setFetching({ fetching: true }));

    const response = await di.PagesRepository.fetch({
      filter: {
        website: websites.selected,
        indexation: pages.filter.indexationState,
        from: pages.filter.applied.from,
        to: pages.filter.applied.to,
        limit: pages.pagination.limit,
        offset: pages.pagination.page,
        sort: pages.filter.applied.sort,
        search: pages.filterNameValue,
      },
    });

    if (response.error === true) {
      dispatcher(setFetching({ fetching: false }));
      return dispatcher(
        actions.notifications.create({
          type: "error",
          message: response.code,
        })
      );
    }

    dispatcher(store({ pages: [...response.body.pages] }));
    dispatcher(pagination.total.update({ value: response.body.total }));

    dispatcher(setFetching({ fetching: false }));
  };
