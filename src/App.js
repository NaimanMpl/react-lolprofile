import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import './App.css';
import SummonerDetails from './routes/SummonerDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/' element={ <Home /> }></Route>
          <Route exact path='/summoners/:summonerName' element={ <SummonerDetails /> }></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
