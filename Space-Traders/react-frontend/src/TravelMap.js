import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css'
import { get } from './requests';

class TravelMap extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      player: {},
      currRegion: {},
      regions: {},
      ship: {},
    }
  }

  componentWillMount() {
    get((item) => {
      this.setState({ player: item.Player, currRegion: item.Player.region, regions: item.Planets, ship: item.Ship })
      const currRegion = item.Player.region
      displayPlanet(currRegion)
    })
  }

  render() {
    let buttons = []
    for (let [key, planet] of Object.entries(this.state.regions)) {
      const button =
        <button
          id={planet.name.toLowerCase()}
          class="circle mercuryButt"
          style={{
            left: new String(((planet.x_coordinate + 200) / 400.0) * 92) + "vw",
            top: new String(81 - (((planet.y_coordinate + 200) / 400.0) * 81)) + "vh"
          }}
          onClick={(e) => {
            displayPlanet(planet)
            this.setState({ currRegion: planet })
          }}>
          {planet.name}
        </button>
        buttons.push(button)
    }

    const region = this.state.currRegion
    const ship = this.state.ship
    return (
      <div id="mainMap">
        <div id="mapBack">
          {buttons}
        </div>
        <div id="planetInfo">
          <label id="planetName">Name: </label> {/*These should be initialized to the player's current location*/}
          <br></br>
          <label id="planetTech">Technology: </label>
          <br></br>
          <label id="planetLoc">Location: </label>
          <br></br>
          <label id="planetDist">Distance: </label>
          <br></br>
          <label id="planetFuel">Fuel Cost: </label>
          <Link to={{
            pathname: '/Region',
            region,
            ship
          }}
            className="nav-link">
            <button type="button" id="travelTo" align="right">Travel</button>
          </Link>
        </div>
      </div>
    )
  }
}

function displayPlanet(planet) {
  document.getElementById("planetName").innerText = "Name: " + planet.name;
  document.getElementById("planetTech").innerText = "Technology: " + planet.tech_level;
  document.getElementById("planetLoc").innerText = "Location: (" + planet.x_coordinate + ", " + planet.y_coordinate + ")";
  document.getElementById("planetDist").innerText = planet.distance ? "Distance: " + planet.distance : "Distance: " + 0;
  document.getElementById("planetFuel").innerText = planet.fuel_cost ? "Fuel Cost: " + planet.fuel_cost : "Fuel Cost: " + 0;
}

export default TravelMap