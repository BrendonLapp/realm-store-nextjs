import './App.css';
import NavBar from './components/nav/nav-bar';
import Admin from './Pages/Admin';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';

const App = () => (
  <div className="App">
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/admin">
          <Admin />
        </Route>
      </Switch>
    </Router>
  </div>
);

export default App;
