import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Welcome from './Welcome';
import PlayerSetup from './PlayerSetup';
import PlayerStats from './PlayerStats';
import TravelMap from './TravelMap';
import Region from './Region';
import Npc from './NPC';

class App extends Component {
  render() {
    return (
    <Router>
        <div>
          {/* <h2>Welcome to Space Trader!</h2>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/'} className="nav-link"> Home </Link></li>
            <li><Link to={'/PlayerSetup'} className="nav-link">Player Setup</Link></li>
          </ul>
          </nav>
          <hr /> */}
          <Switch>
              <Route exact path='/' component={Welcome} />
              <Route path='/PlayerSetup' component={PlayerSetup} />
              <Route path='/PlayerStats' component={PlayerStats} />
              <Route path='/TravelMap' component={TravelMap} />
              <Route path='/Region' component={Region} />
              <Route path='/NPC' component={Npc} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
