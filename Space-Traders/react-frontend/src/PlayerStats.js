import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import spaceship from './resources/spaceship.png';
import './App.css';

function PlayerStats() {
  return (
    <div id="Main">
      <div id="stars">
        <header id="Welcome-header">
          <h1>Your Player</h1>
        </header>
        <div>
          <img src={spaceship} id="spaceship" align="left"/>
        </div>
      </div>
    </div>
  );
}

export default PlayerStats;