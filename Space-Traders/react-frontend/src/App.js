import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Welcome from './Welcome';
import PlayerSetup from './PlayerSetup';
import PlayerStats from './PlayerStats';
import TravelMap from './TravelMap';
import Region from './Region';
import Npc from './NPC';
import EndGame from './EndGame';

class App extends Component {
  render() {
    return (
    <Router>
        <div>
          <Switch>
              <Route exact path='/' component={Welcome} />
              <Route path='/PlayerSetup' component={PlayerSetup} />
              <Route path='/PlayerStats' component={PlayerStats} />
              <Route path='/TravelMap' component={TravelMap} />
              <Route path='/Region' component={Region} />
              <Route path='/NPC' component={Npc} />
              <Route path='/EndGame' component={EndGame} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
