import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import spaceship from './resources/spaceship.png'
import './App.css'

function Map() {
  const dummyREGIONS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  return (
    <div id="Main">
      <div id="stars">
        <header id="Welcome-header">
          <h1>Hi {player.name}!</h1>
        </header>
        <tr>
          <td></td>
        </tr>
        {/* <div>
          <img src={spaceship} id="spaceship" align="left" />
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
          <br></br>
          <button type="button" id="initailizeGame">
            Continue
          </button>
        </div> */}
      </div>
    </div>
  )
}

export default Map
