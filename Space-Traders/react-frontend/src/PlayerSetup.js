import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import spaceship from './resources/spaceship.png';
import './App.css';

function PlayerSetup() {
  const types = [{name: 'Pilot:', id: 'p'}, {name: 'Fighter:', id: 'f'}, {name: 'Merchant:', id: 'm'}, {name: 'Engineer:', id: 'e'}]
  const points = [1, 2, 3, 4, 5, 6, 7, 8]

  let totalPoints = 16
  let player = {pPoints: 1, fPoints: 1, mPoints: 1, ePoints: 1, total: 4}
  const table = types.map((row) => 
    <tr>
      <th>{row.name}</th>
      {points.map(i => <td id={row.id + i}></td>)}
      <td>
        <input type="number" name={row.id + 'skill'} min={1} max={8} defaultValue={1} onChange={(event) => {
          if (row.id == 'p') {
            if (player.total == totalPoints && event.target.value - player.pPoints > 0) {
              event.target.value = player.pPoints
              return;
            }
            player.pPoints = parseInt(event.target.value)
            console.log(player.pPoints)
          } else if (row.id == 'f') {
            if (player.total == totalPoints && event.target.value - player.fPoints > 0) {
              event.target.value = player.fPoints
              return;
            }
            player.fPoints = parseInt(event.target.value)
            console.log(player.fPoints)
          } else if (row.id == 'm') {
            if (player.total == totalPoints && event.target.value - player.mPoints > 0) {
              event.target.value = player.mPoints
              return;
            }
            player.mPoints = parseInt(event.target.value)
            console.log(player.mPoints)
          } else if (row.id == 'e') {
            if (player.total == totalPoints && event.target.value - player.ePoints > 0) {
              event.target.value = player.ePoints
              return;
            }
            player.ePoints = parseInt(event.target.value)
            console.log(player.ePoints)
          }
          player.total = player.pPoints + player.fPoints + player.mPoints + player.ePoints
          console.log('total: ' + player.total)
        }}></input>
      </td>
    </tr>
  )
  return (
    <div id="Welcome">
      <div id="stars">
        <header id="Welcome-header">
          <h1>Choose Your Attributes</h1>
        </header>
        <div>
          <img src={spaceship} id="spaceship" align="left"/>
        </div>
        <table id="Attribute-Table">
          <tr>
            <th>Skill</th>
            <th colSpan="8">Level</th>
            <th>Overall:</th>
          </tr>
          {table}
        </table>
        <button type="submit" id="submitButton">
          <Link to={'/PlayerStats'} className="nav-link">SUBMIT</Link>
        </button>
      </div>
    </div>
  );
}

export default PlayerSetup;