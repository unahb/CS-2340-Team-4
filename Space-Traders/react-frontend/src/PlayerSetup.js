import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import spaceship from './resources/spaceship.png';
import './App.css';
import { post, get } from './requests';

function PlayerSetup() {
  const types = [{name: 'Pilot:', id: 'p'}, {name: 'Fighter:', id: 'f'}, {name: 'Merchant:', id: 'm'}, {name: 'Engineer:', id: 'e'}]
  const points = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  let totalPoints = 16
  let player = { name: null, pPoints: 0, fPoints: 0, mPoints: 0, ePoints: 0, total: 0, difficulty: "easy"}
  const table = types.map((row) => 
    <tr>
      <th>{row.name}</th>
      {points.map(i => <td id={row.id + i}></td>)}
      <td>
        <input type="range" id={row.id + 'skill'} min={0} max={9} defaultValue={0} onChange={(event) => {
          if (row.id == 'p') {
            if (player.total - player.pPoints + parseInt(document.getElementById("pskill").value) > totalPoints) {
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
            if (player.total - player.fPoints + parseInt(document.getElementById("fskill").value) > totalPoints) {
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
            if (player.total - player.mPoints + parseInt(document.getElementById("mskill").value) > totalPoints) {
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
            if (player.total - player.ePoints + parseInt(document.getElementById("eskill").value) > totalPoints) {
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
          document.getElementById("totalPoints").innerText = totalPoints - player.total;
          if (document.getElementById("name").value != "" && player.total == totalPoints) {
            document.getElementById("submitButton").disabled = false;
          } else {
            document.getElementById("submitButton").disabled = true;
          }
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
            <input type="text" id="name" autoFocus placeholder="Please enter your name!" onChange={(event) => {
              player.name = event.target.value
              if (document.getElementById("name").value != "" && player.total == totalPoints) {
                document.getElementById("submitButton").disabled = false;
              } else {
                document.getElementById("buttons").hidden = false;
                document.getElementById("submitButton").disabled = true;
              }
            }}></input>
          </form>
        </div>
        <div id="buttons" hidden={true}>
          <button type="button" id="easyButton" onClick={(event) => {
              totalPoints = 16
              difficultyChanged("easyButton", "easy", totalPoints, player)
            }}>
            Easy
          </button>
          <br></br>
          <button type="button" id="mediumButton" onClick={(event) => {
              totalPoints = 12
              difficultyChanged("mediumButton", "medium", totalPoints, player)
            }}> 
            Medium
          </button>
          <br></br>
          <button type="button" id="hardButton" onClick={(event) => {
              totalPoints = 8
              difficultyChanged("hardButton", "hard", totalPoints, player)
            }}>
            Hard
          </button>
          <br></br>
          <label id="totalPoints" hidden={true}>
            {totalPoints - player.total}
          </label>
        </div>
        
        <table id="Attribute-Table" align="right" hidden={true}>
          <tr>
            <th>Skill</th>
            <th colSpan="9">Level</th>
            <th>Overall:</th>
          </tr>
          {table}
        </table>
        <Link 
            to={{ 
              pathname: '/PlayerStats',
              player
            }}
            className="nav-link" 
        >
        <button hidden={true} type="submit" id="submitButton" onClick={() => updatePlayerData(player)}>
          SUBMIT
        </button>
        </Link>
      </div>
    </div>
  );
}

function difficultyChanged(buttonId, difficulty, totalPoints, player) {
  document.getElementById("easyButton").style.color = buttonId == "easyButton" ? "blue" : null;
  document.getElementById("mediumButton").style.color = buttonId == "mediumButton" ? "blue" : null;
  document.getElementById("hardButton").style.color = buttonId == "hardButton" ? "blue" : null;
  document.getElementById("submitButton").disabled = true;
  document.getElementById("submitButton").hidden = false;
  document.getElementById("Attribute-Table").hidden = false;
  document.getElementById("totalPoints").hidden = false;
  document.getElementById("totalPoints").innerText = totalPoints;
  player.difficulty = difficulty
  reset(player)
}

function reset(player) {
  player.pPoints = 0;
  player.fPoints = 0;
  player.mPoints = 0;
  player.ePoints = 0;
  player.total = 0;
  document.getElementById("pskill").value = 0;
  document.getElementById("fskill").value = 0;
  document.getElementById("mskill").value = 0;
  document.getElementById("eskill").value = 0;
  for (var i = 1; i <= 9; i++) {
    document.getElementById("p" + i).style.opacity = "0.0";
    document.getElementById("f" + i).style.opacity = "0.0";
    document.getElementById("m" + i).style.opacity = "0.0";
    document.getElementById("e" + i).style.opacity = "0.0";
  }
}

function updatePlayerData(player) {
  // Send POST request to update player data
  const attributes = player.pPoints + "," + player.fPoints + "," + player.mPoints + "," + player.ePoints
  const playerStats = {"difficulty": player.difficulty, "attributes": attributes, "name": player.name}
  post(playerStats, '/Space-Traders')
  get()
}

export default PlayerSetup;