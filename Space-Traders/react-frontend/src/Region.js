import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import spaceship from './resources/spaceship.png';
import './App.css';
import { put } from './requests';

function Region(props) {
  const region = props.location.player.location
  put(region)
  return (
    <div id="Main">
        <header id="Welcome-header">
          <h1>{region}</h1>
        </header>
        <button type="button" id="startButton">
          <Link to={'/PlayerSetup'} className="nav-link">back</Link>
        </button>
    </div>
  );
}

export default Region;