import React from 'react';
import spaceship from './resources/spaceship.png';
import './App.css';

function PlayerSetup() {
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
          <tr>
            <th>Pilot:</th><td id="p1"></td><td id="p2"></td><td id="p3"></td><td id="p4"></td><td id="p5"></td><td id="p6"></td><td id="p7"></td><td id="p8"></td>
            <td>
              <input type="number" name="pskill" min="1" max="8" onChange={updateSkills}></input>
            </td>
          </tr>
          <tr>
            <th>Fighter:</th><td id="f1"></td><td id="f2"></td><td id="f3"></td><td id="f4"></td><td id="f5"></td><td id="f6"></td><td id="f7"></td><td id="f8"></td>
            <td>
              <input type="number" name="fskill" min="1" max="8" onChange={updateSkills}></input>
            </td>
          </tr>
          <tr>
            <th>Merchant:</th><td id="m1"></td><td id="m2"></td><td id="m3"></td><td id="m4"></td><td id="m5"></td><td id="m6"></td><td id="m7"></td><td id="m8"></td>
            <td>
              <input type="number" name="mskill" min="1" max="8" onChange={updateSkills}></input>
            </td>
          </tr>
          <tr>
            <th>Engineer:</th><td id="e1"></td><td id="e2"></td><td id="e3"></td><td id="e4"></td><td id="e5"></td><td id="e6"></td><td id="e7"></td><td id="e8"></td>
            <td>
              <input type="number" name="eskill" min="1" max="8" onChange={updateSkills}></input>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}

function updateSkills() {
  console.log(document.getElementById("pskill").value);
}

export default PlayerSetup;