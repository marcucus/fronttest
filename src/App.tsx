import React from 'react';
import { Router } from '@reach/router';
import { AuthenticationPage } from './routes/authentification';
import { ListSite } from './components/listSite';
import { TableRank } from './components/tableRank';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <AuthenticationPage path='/'/>
            <ListSite path='/ranking/list'/>
            <TableRank path='/ranking/list/table'/>
        </Router>
      </header>
    </div>
  );
}

export default App;
