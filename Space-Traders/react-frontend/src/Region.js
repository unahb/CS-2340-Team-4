import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import spaceship from './resources/spaceship.png';
import './Region.css';
import { put } from './requests';

function Region(props) {

  let region = ""
  let coordX = 0
  let coordY = 0

  if (props.location.player) {
    console.log('player')
    region = props.location.player.region_name
    coordX = props.location.player.region_x_coordinate
    coordY = props.location.player.region_y_coordinate
  } else {
    console.log('region')
    region = props.location.currRegion.name
    coordX = props.location.currRegion.x_coordinate
    coordY = props.location.currRegion.y_coordinate
  }

  put(region)
  return (
    <div id="Main">
      <header id="Region-header">
        <h1>{region.toUpperCase()}</h1>
        <h1 style={{ fontSize: 20 }}>Location: ({coordX}, {coordY})</h1>
      </header>
      <Link
        to={{
          pathname: '/TravelMap',
        }}
        className="nav-link"
      >
        <button type="button" id="mapButton">
          Map
        </button>
      </Link>
    </div>
  );
}

export default Region;