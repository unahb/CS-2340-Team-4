import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import spaceship from './resources/spaceship.png';
import './Welcome.css';

function Welcome() {
  return (
    <div id="Welcome">
      <div id="stars">
        <header id="Welcome-header">
          <h1>Welcome to Space Traders!</h1>
        </header>
        <div>
          <img src={spaceship} id="spaceship" align="left"/>
        </div>
        <button type="button" id="startButton">
          <Link to={'/PlayerSetup'} className="nav-link">START</Link>
        </button>
      </div>
    </div>
  );
}

export default Welcome;