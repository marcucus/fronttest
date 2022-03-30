import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { actions } from "./actions";

import { diReducer } from "./di/reducers";
import { DiInjectable } from "./di/types";
import { darkModeReducer } from "./dark-mode/reducers";
import { langReducer } from "./lang/reducers";
import { authReducer } from "./auth/reducers";
import { websitesReducer } from "./websites/reducers";
import { pagesReducer } from "./pages/reducers";
import { modalReducer } from "./modal/reducers";
import { notificationsReducer } from "./notifications/reducers";
import { reportsReducer } from "./reports/reducers";
import { editorReducer } from "./editor/reducers";
import { loaderReducer } from "./loader/reducers";

const enhancer = applyMiddleware(thunk);

export const reducers = combineReducers({
  di: diReducer,
  notifcations: notificationsReducer,
  lang: langReducer,
  loader: loaderReducer,
  auth: authReducer,
  modal: modalReducer,
  websites: websitesReducer,
  pages: pagesReducer,
  reports: reportsReducer,
  editor: editorReducer,
  darkMode: darkModeReducer,
});

export type RootState = ReturnType<typeof reducers>;

export const init = (initialState = {}, di: DiInjectable) => {
  const store = createStore(reducers, initialState, enhancer);

  store.dispatch(actions.di.register(di));

  return { store };
};
