import React from 'react';
import spaceship from './resources/spaceship.png';
import './App.css';

function PlayerSetup() {
  const types = [{name: 'Pilot:', id: 'p'}, {name: 'Fighter:', id: 'f'}, {name: 'Merchant:', id: 'm'}, {name: 'Engineer:', id: 'e'}]
  const points = [1, 2, 3, 4, 5, 6, 7, 8]
  const table = types.map((row) => 
    <tr>
      <th>{row.name}</th>
      {points.map(i => <td id={row.id + i}></td>)}
      <td>
        <input type="number" name={row.id + 'skill'} min="1" max="8" onChange={updateSkills}></input>
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
            <th>Overall:
              <button type="submit" id="attributeSubmit">
                Submit
              </button>
            </th>
          </tr>
          {table}
        </table>
      </div>
    </div>
  );
}

function updateSkills() {
  console.log(document.getElementById("pskill").value);
}

export default PlayerSetup;