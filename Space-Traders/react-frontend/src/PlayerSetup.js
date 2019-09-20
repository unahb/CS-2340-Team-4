import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import spaceship from './resources/spaceship.png';
import './App.css';

function PlayerSetup() {
  const types = [{name: 'Pilot:', id: 'p'}, {name: 'Fighter:', id: 'f'}, {name: 'Merchant:', id: 'm'}, {name: 'Engineer:', id: 'e'}]
  const points = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  let totalPoints = 16
  let player = {name: null, difficulty: null, pPoints: 1, fPoints: 1, mPoints: 1, ePoints: 1, total: 4}
  const table = types.map((row) => 
    <tr>
      <th>{row.name}</th>
      {points.map(i => <td id={row.id + i}></td>)}
      <td>
        <input type="number" id={row.id + 'skill'} min={1} max={9} defaultValue={1} onChange={(event) => {
          if (row.id == 'p') {
            if (player.total == totalPoints && event.target.value - player.pPoints > 0) {
              event.target.value = player.pPoints
              return;
            }
            player.pPoints = parseInt(event.target.value)
            for (var i = 1; i <= 9; i++) {
              if (i <= player.pPoints) {
                document.getElementById("p" + i).style.opacity = "1.0";
                document.getElementById("p" + i).style.backgroundColor = "#00ff00";
              } else {
                document.getElementById("p" + i).style.opacity = "0.0";
              }
            }
          } else if (row.id == 'f') {
            if (player.total == totalPoints && event.target.value - player.fPoints > 0) {
              event.target.value = player.fPoints
              return;
            }
            player.fPoints = parseInt(event.target.value)
            for (var i = 1; i <= 9; i++) {
              if (i <= player.fPoints) {
                document.getElementById("f" + i).style.opacity = "1.0";
                document.getElementById("f" + i).style.backgroundColor = "#00ff00";
              } else {
                document.getElementById("f" + i).style.opacity = "0.0";
              }
            }
          } else if (row.id == 'm') {
            if (player.total == totalPoints && event.target.value - player.mPoints > 0) {
              event.target.value = player.mPoints
              return;
            }
            player.mPoints = parseInt(event.target.value)
            for (var i = 1; i <= 9; i++) {
              if (i <= player.mPoints) {
                document.getElementById("m" + i).style.opacity = "1.0";
                document.getElementById("m" + i).style.backgroundColor = "#00ff00";
              } else {
                document.getElementById("m" + i).style.opacity = "0.0";
              }
            }
          } else if (row.id == 'e') {
            if (player.total == totalPoints && event.target.value - player.ePoints > 0) {
              event.target.value = player.ePoints
              return;
            }
            player.ePoints = parseInt(event.target.value)
            for (var i = 1; i <= 9; i++) {
              if (i <= player.ePoints) {
                document.getElementById("e" + i).style.opacity = "1.0";
                document.getElementById("e" + i).style.backgroundColor = "#00ff00";
              } else {
                document.getElementById("e" + i).style.opacity = "0.0";
              }
            }
          }
          player.total = player.pPoints + player.fPoints + player.mPoints + player.ePoints
          console.log("total points: " + totalPoints);
        }}></input>
      </td>
    </tr>
  )
  return (
    <div id="Main">
      <div id="stars">
        <header id="Attributes-header">
          <h1>Choose Your Attributes</h1>
        </header>
        <div>
          <img src={spaceship} id="spaceship" align="left"/>
        </div>
        <div>
          <form id="nameForm">
            <input type="text" id="name" placeholder="Please enter your name!"></input>
          </form>
        </div>
        <div>
          <button type="button" id="easyButton" onClick={(event) => {
              player.difficulty = "Easy"
              totalPoints = 16;
              reset(player);
            }}>
            Easy
          </button>
          <br></br>
          <button type="button" id="mediumButton" onClick={(event) => {
              player.difficulty = "Medium"
              totalPoints = 12;
              reset(player);
            }}> 
            Medium
          </button>
          <br></br>
          <button type="button" id="hardButton" onClick={(event) => {
              player.difficulty = "Easy"
              totalPoints = 8;
              reset(player);
            }}>
            Hard
          </button>
        </div>
        <table id="Attribute-Table" align="right">
          <tr>
            <th>Skill</th>
            <th colSpan="9">Level</th>
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

function reset(player) {
  player.pPoints = 1;
  player.fPoints = 1;
  player.mPoints = 1;
  player.ePoints = 1;
  player.total = 4;
  document.getElementById("pskill").value = 1;
  document.getElementById("fskill").value = 1;
  document.getElementById("mskill").value = 1;
  document.getElementById("eskill").value = 1;
  for (var i = 1; i <= 9; i++) {
    if (i <= 1) {
      document.getElementById("p" + i).style.opacity = "1.0";
      document.getElementById("p" + i).style.backgroundColor = "#00ff00";
      document.getElementById("f" + i).style.opacity = "1.0";
      document.getElementById("f" + i).style.backgroundColor = "#00ff00";
      document.getElementById("m" + i).style.opacity = "1.0";
      document.getElementById("m" + i).style.backgroundColor = "#00ff00";
      document.getElementById("e" + i).style.opacity = "1.0";
      document.getElementById("e" + i).style.backgroundColor = "#00ff00";
    } else {
      document.getElementById("p" + i).style.opacity = "0.0";
      document.getElementById("f" + i).style.opacity = "0.0";
      document.getElementById("m" + i).style.opacity = "0.0";
      document.getElementById("e" + i).style.opacity = "0.0";
    }
  }
}

export default PlayerSetup;