import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import spaceship from './resources/spaceship.png';

function GameOver() {
  return (
    <div id="Welcome">
      <div id="stars">
        <header id="Welcome-header">
          <h1 style={{ fontSize: '10vh' }}>Game Over...</h1>
        </header>
        <div>
          <img src={spaceship} id="spaceship" align="left"/>
        </div>
        <button type="button" id="startButton">
          <Link to={'/'} className="nav-link">RESTART</Link>
        </button>
      </div>
    </div>
  );
}

export default GameOver;