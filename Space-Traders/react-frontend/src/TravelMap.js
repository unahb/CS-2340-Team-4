import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './TravelMap.css'
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
      displayPlanet(currRegion, this.state.player, this.state.ship)
    })
  }

  render() {
    let buttons = []
    for (let [key, planet] of Object.entries(this.state.regions)) {
      const button =
        <button
          id={planet.name.toLowerCase()}
          class="circle"
          style={{
            left: new String(((planet.x_coordinate + 200) / 400.0) * 72) + "vw",
            top: new String(81 - (((planet.y_coordinate + 200) / 400.0) * 81)) + "vh"
          }}
          onClick={(e) => {
            displayPlanet(planet, null, this.state.ship)
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
        <div id="planetInfo" style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', marginRight: '4vw' }}>
            <label id="planetName">Name: </label> {/*These should be initialized to the player's current location*/}
            <br></br>
            <label id="planetTech">Technology: </label>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch'}}>
            <label id="planetLoc" style={{ marginBottom: '2vh' }}>Location: </label>
            <label id="planetDist" style={{ marginBottom: '2vh' }}>Distance: </label>
            <label id="planetFuel">Fuel Cost: </label>
          </div>

          <Link to={{
            pathname: '/Region',
            region
          }}
            className="nav-link">
            <button type="button" id="travelTo" align="right">Travel</button>
          </Link>
        </div>
        <div id="travelInfo">
          <label id="shipType">Ship Type: {ship.type}</label>
          <br></br>
          <br></br>
          <br></br>
          <label id="fuelLeft">Fuel:</label>
          <br></br>
          <br></br>
          <label id="cargoSpace">Cargo Space: {ship.max_cargo_space - ship.current_cargo} / {ship.max_cargo_space}</label>
          <br></br>
          <br></br>
          <br></br>
          <label id="shipHealth">Ship Health: {ship.current_health} / {ship.max_health}</label>
          <br></br>
          <br></br>
          <br></br>
          <label id="shipValue">Ship Value: {ship.current_value}</label>
        </div>
      </div>
    )
  }
}

function displayPlanet(planet, player, ship) {
  if (player != null && planet.name == player.region.name) {
    document.getElementById(planet.name.toLowerCase()).style.backgroundColor = "#FF0000"
  }
  if (player != null || (ship != null && ship.current_fuel >= planet.fuel_cost)) {
    document.getElementById("travelTo").disabled = false;
    document.getElementById("travelTo").innerText = "Travel"
  } else {
    document.getElementById("travelTo").disabled = true;
    document.getElementById("travelTo").innerText = "Insufficient Fuel"
  }
  document.getElementById("planetName").innerText = "Name: " + planet.name;
  document.getElementById("planetTech").innerText = "Technology: " + planet.tech_level;
  document.getElementById("planetLoc").innerText = "Location: (" + planet.x_coordinate + ", " + planet.y_coordinate + ")";
  document.getElementById("planetDist").innerText = planet.distance ? "Distance: " + planet.distance : "Distance: " + 0;
  document.getElementById("fuelLeft").innerText = "Fuel:\n" + ship.current_fuel + " / " + ship.max_fuel_capacity + "\n";
  document.getElementById("planetFuel").innerText = planet.fuel_cost ? "Fuel Cost: " + planet.fuel_cost : "Fuel Cost: " + 0;
}

export default TravelMap