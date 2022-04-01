import * as darkMode from "./dark-mode/actions"
import * as di from "./di/actions"
import * as lang from "./lang/actions"
import * as websites from "./websites/actions"
import * as pages from "./pages/actions"
import * as notifications from "./notifications/actions"
import * as auth from "./auth/actions"
import * as modal from "./modal/actions"
import * as reports from "./reports/actions"
import * as loader from "./loader/actions"
import * as editor from "./editor/actions"

export const actions = {
  notifications,
  modal,
  loader,
  darkMode,
  pages,
  auth,
  reports,
  websites,
  lang,
  di,
  editor, 
}
