import React from 'react';
import { Router } from '@reach/router';
import { AuthenticationPage } from './routes/authentification';
import { ListSite } from './components/listSite';
import { TableRank } from './components/tableRank';
import { RankingSite } from './routes/site';
import { RankingTable } from './routes/ranking';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <AuthenticationPage path='/'/>
            <RankingSite path='/ranking/list'/>
            <RankingTable path='/ranking/list/table'/>
        </Router>
      </header>
    </div>
  );
}

export default App;
