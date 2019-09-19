import React from 'react';
import spiderman from './resources/spiderman.png';
import './App.css';

function PlayerSetup() {
  return (
    <div id="Welcome">
      <div id="stars">
        <header id="Welcome-header">
          <h1>Choose Your Attributes</h1>
        </header>
        <div>
          <img src={spiderman} id="spaceship" align="left"/>
        </div>
      </div>
    </div>
  );
}

export default PlayerSetup;