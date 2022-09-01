import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './routes/Home';
import PageNotFound from './routes/PageNotFound';
import SummonerDetails from './routes/SummonerDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/' element={ <Home /> }></Route>
          <Route exact path='/summoners/:summonerName' element={ <SummonerDetails /> }></Route>
          <Route path='*' element={ <PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
