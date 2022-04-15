import { Router } from '@reach/router';
import { RankingSite } from './routes/site';
import { RankingTable } from './routes/ranking';
import { HomePage } from './routes/home';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <HomePage path='/'/>
            <RankingSite path='/ranking/list'/>
            <RankingTable path='/ranking/list/table'/>
        </Router>
      </header>
    </div>
  );
}

export default App;
