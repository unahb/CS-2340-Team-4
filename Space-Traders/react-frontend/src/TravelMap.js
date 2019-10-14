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
      regions: [],
    }
  }

  componentWillMount() {
    get((item) => {
      this.setState({ player: item[0], regions: item.slice(1, 11) })
      const player = this.state.player
      console.log(player)
      const currRegion = 
        { name: player.region_name,
          tech_level: player.region_tech_level,
          x_coordinate: player.region_x_coordinate,
          y_coordinate: player.region_y_coordinate,
          distance: 0
        }
      this.setState({ currRegion: currRegion })
      displayPlanet(currRegion)
      const distances = this.state.regions.map((region) => {
        const distance = calculateDistance(player.region_x_coordinate, player.region_y_coordinate, region.x_coordinate, region.y_coordinate)
        region.distance = distance
        return region
      })
      console.log(distances)
    })
  }

  render() {
    const buttons = this.state.regions.map((region) =>
      <button 
        id={region.name.toLowerCase()} 
        class="circle mercuryButt" 
        style={{ left: new String(((region.x_coordinate + 200) / 400.0) * 92) + "vw",
          top: new String(81 - (((region.y_coordinate + 200) / 400.0) * 81)) + "vh" }}
        onClick={(e) => {
          displayPlanet(region)
          this.setState({ currRegion: region })
        }}>
        {region.name}
      </button>)

    const currRegion = this.state.currRegion
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
          <Link to={{
            pathname: '/Region',
            currRegion
          }}
            className="nav-link">
            <button type="button" id="travelTo" align="right" disabled="true">Travel</button>
          </Link>
        </div>
      </div>
    )
  }
}

// Calculate distance between current and planet location
function calculateDistance(playerX, playerY, regionX, regionY) {
  const distance = Math.sqrt(Math.pow((playerX - regionX), 2) + Math.pow((playerY - regionY), 2))
  return distance
}

function displayPlanet(planet) {
  document.getElementById("planetName").innerText = "Name: " + planet.name;
  document.getElementById("planetTech").innerText = "Technology: " + planet.tech_level;
  document.getElementById("planetLoc").innerText = "Location: (" + planet.x_coordinate + ", " + planet.y_coordinate + ")";
  document.getElementById("planetDist").innerText = "Distance: " + planet.distance;
}

export default TravelMap