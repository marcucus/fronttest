import { WebsiteEntity } from "interfaces.foudroyer.com";
import { uniq } from "ramda";
import * as types from "./types";

interface WebsitesState {
  entities: Array<WebsiteEntity["id"]>;
  map: Map<WebsiteEntity["id"], WebsiteEntity>;
  google: WebsiteEntity[];
  fetching: boolean;
  areCredentialsGood: boolean;
  isCreateModalOpen: boolean;
  addSitemap: {
    isOpen: boolean;
    value: string | null;
    isFetching: boolean;
  };
  addCredentials: {
    isOpen: boolean;
    value: string | null;
    isFetching: boolean;
  };
  selected: WebsiteEntity["id"] | null;
}

const initialState: WebsitesState = {
  entities: [],
  map: new Map(),
  selected: null,
  areCredentialsGood: false,
  google: [],
  fetching: false,
  addSitemap: {
    isOpen: false,
    value: null,
    isFetching: false,
  },
  addCredentials: {
    isOpen: false,
    value: null,
    isFetching: false,
  },
  isCreateModalOpen: false,
};

export function websitesReducer(
  state = initialState,
  action: types.WebsitesActionTypes
): WebsitesState {
  if (action.type === types.Store) {
    const map = new Map();

    const entities = action.payload.websites.map((website) => {
      map.set(website.id, website);
      return website.id;
    });

    return {
      ...state,
      entities: [...entities],
      map,
    };
  }

  if (action.type === types.StoreGoogle) {
    return {
      ...state,
      google: action.payload.websites,
    };
  }

  if (action.type === types.updateWebsite) {
    state.map.set(action.payload.website.id, action.payload.website);

    return {
      ...state,
      addSitemap: {
        ...initialState.addSitemap,
      },
    };
  }

  if (action.type === types.setOpenSitemapModal) {
    return {
      ...state,
      addSitemap: {
        ...state.addSitemap,
        isOpen: action.payload.value,
      },
    };
  }

  if (action.type === types.UpdateSitemap) {
    return {
      ...state,
      addSitemap: {
        ...state.addSitemap,
        value: action.payload.value,
      },
    };
  }

  if (action.type === types.updateCredentials) {
    return {
      ...state,
      addCredentials: {
        ...state.addCredentials,
        value: action.payload.value,
      },
    };
  }

  if (action.type === types.Remove) {
    const entities = state.entities.filter((id) => {
      return id !== action.payload.id;
    });

    return {
      ...state,
      entities,
    };
  }

  if (action.type === types.Add) {
    const entities = action.payload.websites.map((website) => {
      state.map.set(website.id, website);
      return website.id;
    });

    return {
      ...state,
      entities: uniq([...state.entities, ...entities]),
    };
  }

  if (action.type === types.SetFetching) {
    return {
      ...state,
      fetching: action.payload,
    };
  }

  if (action.type === types.SetSitemapFetching) {
    return {
      ...state,
      addSitemap: {
        ...state.addSitemap,
        isFetching: action.payload.value,
      },
    };
  }

  if (action.type === types.setCredentialsFetching) {
    return {
      ...state,
      addCredentials: {
        ...state.addCredentials,
        isFetching: action.payload.value,
      },
    };
  }

  if (action.type === types.setCredentialsIsOpen) {
    return {
      ...state,
      addCredentials: {
        ...initialState.addCredentials,
        isOpen: action.payload.value,
      },
    };
  }

  if (action.type === types.SetIsOpenCreateModal) {
    return {
      ...state,
      isCreateModalOpen: action.payload,
    };
  }

  if (action.type === types.SelectWebsite) {
    return {
      ...state,
      selected: action.payload,
      addSitemap: {
        ...initialState.addSitemap,
      },
      addCredentials: {
        ...initialState.addCredentials,
      },
    };
  }

  if (action.type === types.storeCheck) {
    return {
      ...state,
      addSitemap: {
        ...initialState.addSitemap,
        isOpen: !action.payload.isSitemapValid,
      },
      areCredentialsGood: action.payload.isCredentialsValid,
      addCredentials: {
        ...initialState.addCredentials,
        isOpen: false,
      },
    };
  }

  if (action.type === types.setIsCredentialsAreGood) {
    return {
      ...state,
      areCredentialsGood: action.payload.value,
    };
  }

  return state;
}
