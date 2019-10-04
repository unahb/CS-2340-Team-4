import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css'

function TravelMap() {
  return (
    <div id="mainMap">
      <div id="mapBack">
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
      </div>
      <div id="planetInfo">
        <label id="planetName">Name: </label>
        <br></br>
        <label id="planetTech">Tech: </label>
        <br></br>
        <label id="planetLoc">Location: </label>
        <Link to={{ 
              pathname: '/Regions'
            }}
            className="nav-link">
            <button type="button" id="travelTo" align="right">Travel</button>
        </Link>
      </div>
    </div>
  )
}

function regionSetup(x, y, butt) {
  var radius = "2vw";
  var left = new String(((x + 200) / 400.0) * 92) + "vw";
  var top = new String((((y + 200) / 400.0) * 81)) + "vh";
  butt.style.top = top;
  butt.style.left = left;
  butt.style.width = radius;
  butt.style.height = radius;
}

function displayPlanet(event) {
  document.getElementById("planetName").innerText = "Name: Mercury,";
  document.getElementById("planetTech").innerText = "Tech: Agriculture,";
  document.getElementById("planetLoc").innerText = "Location: (-200, -200)";
}

export default TravelMap