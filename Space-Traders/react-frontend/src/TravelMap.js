import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css'

function TravelMap() {
  return (
    <div id="mainMap">
      <div id="mapBack">
        <link to={{ 
              pathname: '/PlayerStats'
            }}
            className="nav-link">
          <button class="circle mercuryButt" onClick={(e) => {
            regionSetup(-200, -200, e.target); // Replace 1st param with x-coord of planet and 2nd param with y-coord (from api data)
            displayPlanet(e);
          }}>Mercury</button>
          <button class="circle venusButt" onClick={(e) => {
            regionSetup(-200, 200, e.target);
          }}>Venus</button>
          <button class="circle earthButt" onClick={(e) => {
            regionSetup(200, -200, e.target);
          }}>Earth</button>
          <button class="circle marsButt" onClick={(e) => {
            regionSetup(200, 200, e.target);
          }}>Mars</button>
          <button class="circle jupiterButt" onClick={(e) => {
            regionSetup(-150, 50, e.target);
          }}>Jupiter</button>
          <button class="circle saturnButt" onClick={(e) => {
            regionSetup(0, -150, e.target);
          }}>Saturn</button>
          <button class="circle uranusButt" onClick={(e) => {
            regionSetup(0, -100, e.target);
          }}>Uranus</button>
          <button class="circle neptuneButt" onClick={(e) => {
            regionSetup(0, -50, e.target);
          }}>Neptune</button>
          <button class="circle plutoButt" onClick={(e) => {
            regionSetup(0, 200, e.target);
          }}>Pluto</button>
          <button class="circle europaButt" onClick={(e) => {
            regionSetup(50, -150, e.target);
          }}>Europa</button>
        </link>
      </div>
      <div id="planetInfo">
        <label id="planetName">Name: </label>
        <label id="planetTech">Technology: </label>
        <label id="planetLoc">Location: </label>
        <button type="button" id="travelTo">Travel</button>
      </div>
    </div>
  )
}

function regionSetup(x, y, butt) {
  var radius = "2vw";
  var left = new String(((x + 200) / 400.0) * 92) + "vw";
  var top = new String((((y + 200) / 400.0) * 86)) + "vh";
  butt.style.top = top;
  butt.style.left = left;
  butt.style.width = radius;
  butt.style.height = radius;
}

function displayPlanet(event) {
  document.getElementById("planeName").innerText = "Mercury";
  document.getElementById("planeTech").innerText = "Mercury";
  document.getElementById("planeLoc").innerText = "Mercury";
}

export default TravelMap