import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import spaceship from './resources/spaceship.png';
import './App.css';

function PlayerStats(props) {
  const player = props.location.player
  console.log(player)
  return (
    <div id="Main">
      <div id="stars">
        <header id="Welcome-header">
          <h1>Hi {player.name}!</h1>
        </header>
        <div>
          <img src={spaceship} id="spaceship" align="left"/>
        </div>
        <div>
          <text id="statsDifficulty">Difficulty: {player.difficulty}</text>
          <br></br>
          <text id="pLevel">Pilot Level: {player.pPoints}</text>
          <br></br>
          <text id="fLevel">Fighter Level: {player.fPoints}</text>
          <br></br>
          <text id="mLevel">Merchant Level: {player.mPoints}</text>
          <br></br>
          <text id="eLevel">Engineer Level: {player.ePoints}</text>
          <br></br>
          <text id="credits">Credits: {player.credits}</text>
        </div>
      </div>
    </div>
  );
}

export default PlayerStats;