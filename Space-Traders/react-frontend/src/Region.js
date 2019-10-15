import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import spaceship from './resources/spaceship.png';
import './Region.css';
import { put } from './requests';

function Region(props) {

  let region = props.location.region.name
  let coordX = props.location.region.x_coordinate
  let coordY = props.location.region.y_coordinate

  let ship = props.location.ship

  put(region)
  return (
    <div id="Main">
      <header id="Region-header">
        <h1>{region.toUpperCase()}</h1>
        <h1 style={{ fontSize: "3vh" }}>Location: ({coordX}, {coordY})</h1>
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