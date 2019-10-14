import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import spaceship from './resources/spaceship.png';
import './Region.css';
import { put } from './requests';

function Region(props) {

  let region = ""
  let coordX = 0
  let coordY = 0

  region = props.location.region.name
  coordX = props.location.region.x_coordinate
  coordY = props.location.region.y_coordinate

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