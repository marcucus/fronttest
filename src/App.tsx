import React from "react";
import { Router } from "@reach/router";
import { SelectPage } from "./routes/select";
import { PagesPage } from "./routes/pages";
import { ModuleProvider } from "./modules/ModuleProvider";
import { init } from "./redux/store";
import { Provider } from "react-redux";
import { Notifications } from "./components/Notifications/Notifications";
import { FullPageLoader } from "./components/FullPageLoader/FullPageLoader";
import { CustomIntlProvider } from "./components/CustomIntlProvider/CustomIntlProvider";
import { DashboardPage } from "./routes/dashboard";
import { AuthenticationPage } from "./routes/authentication";
import { StaticInitialization } from "./components/StaticInitialization/StaticInitialization";
import { startSentry } from "./utils/sentry";
import { ToolsPage } from "./routes/tools";
import { RankingPage } from "./routes/ranking";
import { ToolsBuilderRoute } from "./routes/tools/builder";
import { ToolsBuilderSlugRoute } from "./routes/tools/builder/[slug]";
import { TableRank } from "./components/TableRank/TableRank";


startSentry();

function App() {
  const module = new ModuleProvider().build();

  const { store } = init({}, module);

  return (
    <Provider store={store}>
      <CustomIntlProvider defautlLang="en">
        <StaticInitialization>
          <Router>
            <AuthenticationPage path="/" />
            <ToolsPage path="/tools/" />
            <RankingPage path="/tools/ranking" />
            <TableRank path="/tools/ranking/table" />
            <SelectPage path="/tools/indexation/" />
            <DashboardPage path="/tools/indexation/dashboard/" />
            <PagesPage path="/tools/indexation/pages/" />

            <ToolsBuilderRoute path="/tools/builder/" />
            <ToolsBuilderSlugRoute path="/tools/builder/:slug" />
          </Router>

          <FullPageLoader />
          <Notifications />
        </StaticInitialization>
      </CustomIntlProvider>
    </Provider>
  );
}

export default App;
