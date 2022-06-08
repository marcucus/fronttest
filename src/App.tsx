import React from 'react';
import { Router } from '@reach/router';
import { RankingSite } from './routes/site';
import { HomePage } from './routes/home';
import { UserProfil } from './routes/profil';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <HomePage path='/'/>
            <RankingSite path='/ranking'/>
            <UserProfil path='/profil'/>
        </Router>
      </header>
    </div>
  );
}

export default App;
