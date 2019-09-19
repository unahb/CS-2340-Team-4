import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import spaceship from './resources/spaceship.png';
import './App.css';

function Welcome() {
  return (
    <div id="Welcome">
      <div id="stars">
        <header id="Welcome-header">
          <h1>Welcome to Space Traders!</h1>
        </header>
        <div>
          <img src={spaceship} id="spaceship" align="left"/>
        </div>
        <button onClick={() => toNext()} type="button" id="startButton">
          <Link to={'/PlayerSetup'} className="nav-link">START</Link>
        </button>
        {/* <script type="text/javascript">
          document.querySelector("startButton").addEventListner("click",
            function() {
              document.getElementById("spaceship").style.animation = "nextScreen 1 25s ease-in-out";
            })
        </script> */}
      </div>
    </div>
  );
}

function toNext() {
  console.log('next screen')
}

export default Welcome;