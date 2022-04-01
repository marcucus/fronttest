import { uniqWith } from "ramda";
import * as types from "./types";
import { set, view, lensPath } from "ramda";
import { PageEntity } from "interfaces.foudroyer.com";

interface PagesState {
  pages: PageEntity[];
  fetching: boolean;
  pagesWithInfoOpen: Set<PageEntity["url"]>;
  isAllPagesWithInfoActivated: boolean;
  filterNameValue: string;
  fetchingRecently: boolean;
  pagesRecentlyUpdated: PageEntity[];
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
  addPagesProcess: {
    modalIsOpen: boolean;
    fetching: boolean;
    pagesAddedManually: string;
  };
  filter: {
    applied: {
      from: Date | null;
      to: Date | null;
      sort: "asc" | "desc";
    };
    panel: {
      isOpen: boolean;
      fields: {
        from: Date | null;
        to: Date | null;
        sort: "asc" | "desc";
      };
    };
    indexationState: PageEntity["indexation_state"] | null;
  };
  indexationProcess: {
    fetching: boolean;
    numberProcessed: number;
    error: string | null;
  };
}

const initialState: PagesState = {
  pages: [],
  fetchingRecently: false,
  pagesRecentlyUpdated: [],
  isAllPagesWithInfoActivated: false,
  pagesWithInfoOpen: new Set(),
  filterNameValue: "",
  fetching: false,
  pagination: {
    total: 0,
    page: 1,
    limit: 100,
  },
  addPagesProcess: {
    fetching: false,
    modalIsOpen: false,
    pagesAddedManually: "",
  },
  indexationProcess: {
    fetching: false,
    numberProcessed: 0,
    error: null,
  },
  filter: {
    applied: {
      from: null,
      to: null,
      sort: "desc",
    },
    panel: {
      fields: {
        from: null,
        to: null,
        sort: "desc",
      },
      isOpen: false,
    },
    indexationState: null,
  },
};

export function pagesReducer(
  state = initialState,
  action: types.PagesActionTypes
): PagesState {
  if (action.type === types.Store) {
    const pages = action.payload.pages;

    if (state.isAllPagesWithInfoActivated) {
      pages.forEach(({ url }) => {
        state.pagesWithInfoOpen.add(url);
      });
    }

    return {
      ...state,
      pages: pages,
    };
  }

  if (action.type === types.StoreRecently) {
    const pages = action.payload.pages;

    return {
      ...state,
      pagesRecentlyUpdated: pages,
    };
  }

  if (action.type === types.Add) {
    return {
      ...state,
      pages: uniqWith<PageEntity, PageEntity>((a, b) => a.url === b.url)([
        ...action.payload.pages,
        ...state.pages,
      ]),
    };
  }

  if (action.type === types.SetAddPagesModalOpen) {
    return {
      ...state,
      addPagesProcess: {
        ...state.addPagesProcess,
        modalIsOpen: action.payload.isOpen,
      },
    };
  }

  if (action.type === types.SetAddPagesFetching) {
    return {
      ...state,
      addPagesProcess: {
        ...state.addPagesProcess,
        fetching: action.payload.fetching,
      },
    };
  }

  if (action.type === types.UpdateAddPagesModalValue) {
    return {
      ...state,
      addPagesProcess: {
        ...state.addPagesProcess,
        pagesAddedManually: action.payload.value,
      },
    };
  }

  if (action.type === types.SetFetching) {
    return {
      ...state,
      fetching: action.payload.fetching,
    };
  }

  if (action.type === types.SetFetchingRecently) {
    return {
      ...state,
      fetchingRecently: action.payload.fetching,
    };
  }

  if (action.type === types.FilterByName) {
    return {
      ...state,
      filterNameValue: action.payload.name,
    };
  }

  if (action.type === types.ToggleFilter) {
    return {
      ...state,
      pagination: {
        ...initialState.pagination,
      },
      filter: {
        ...state.filter,
        indexationState:
          action.payload.type === state.filter.indexationState
            ? null
            : action.payload.type,
      },
    };
  }

  if (action.type === types.IndexProcessingSetFetching) {
    return {
      ...state,
      indexationProcess: {
        ...state.indexationProcess,
        fetching: action.payload.fetching,
      },
    };
  }

  if (action.type === types.IndexProcessingIncrementNumberProcessed) {
    return {
      ...state,
      indexationProcess: {
        ...state.indexationProcess,
        numberProcessed: state.indexationProcess.numberProcessed + 1,
      },
    };
  }

  if (action.type === types.IndexProcessingSetError) {
    return {
      ...state,
      indexationProcess: {
        ...state.indexationProcess,
        error: action.payload.error,
      },
    };
  }

  if (action.type === types.ToggleFilterPanel) {
    const path = lensPath(["filter", "panel", "isOpen"]);

    return set(path, !view(path, state), state);
  }

  if (action.type === types.TogglePageInfo) {
    if (state.pagesWithInfoOpen.has(action.payload.url)) {
      state.pagesWithInfoOpen.delete(action.payload.url);
    } else {
      state.pagesWithInfoOpen.add(action.payload.url);
    }

    return {
      ...state,
      pagesWithInfoOpen: new Set(state.pagesWithInfoOpen),
    };
  }

  if (action.type === types.ToggleAllPageInfo) {
    state.pages.forEach(({ url }) => {
      if (!state.isAllPagesWithInfoActivated) state.pagesWithInfoOpen.add(url);
      if (state.isAllPagesWithInfoActivated)
        state.pagesWithInfoOpen.delete(url);
    });

    return {
      ...state,
      isAllPagesWithInfoActivated: !state.isAllPagesWithInfoActivated,
      pagesWithInfoOpen: new Set(state.pagesWithInfoOpen),
    };
  }

  if (action.type === types.FilterFieldsUpdate) {
    const fields = { ...state.filter.panel.fields };

    if (action.payload.type === "from") fields.from = action.payload.value;
    if (action.payload.type === "to") fields.to = action.payload.value;
    if (action.payload.type === "sort") fields.sort = action.payload.value;

    return {
      ...state,
      filter: {
        ...state.filter,
        panel: {
          ...state.filter.panel,
          fields,
        },
      },
    };
  }

  if (action.type === types.FilterFieldsReset) {
    return {
      ...state,
      filter: {
        ...state.filter,
        panel: {
          ...state.filter.panel,
          fields: { ...initialState.filter.panel.fields },
        },
      },
    };
  }

  if (action.type === types.FilterFieldsApply) {
    return {
      ...state,
      pagination: {
        ...initialState.pagination,
      },
      filter: {
        ...state.filter,
        panel: {
          ...state.filter.panel,
          isOpen: false,
        },
        applied: {
          ...state.filter.panel.fields,
        },
      },
    };
  }

  /*********************************************************
   *
   * Pagination
   *
   *********************************************************/

  if (action.type === types.paginationLimitUpdate) {
    return {
      ...state,
      pagination: {
        ...state.pagination,
        limit: action.payload.value,
      },
    };
  }

  if (action.type === types.resetPagination) {
    console.log(initialState.pagination);
    return {
      ...state,
      pagination: {
        ...initialState.pagination,
      },
    };
  }

  if (action.type === types.paginationUpdate) {
    return {
      ...state,
      pagination: {
        ...state.pagination,
        page: action.payload.value,
      },
    };
  }

  if (action.type === types.storeTotal) {
    return {
      ...state,
      pagination: {
        ...state.pagination,
        total: action.payload.value,
      },
    };
  }

  return state;
}
