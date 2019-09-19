import React from 'react';
import spaceship from './spaceship.png';
import './App.css';

function App() {
  return (
    <div id="Welcome">
      <div id="stars">
        <header id="Welcome-header">
          <h1>Welcome to Space Traders!</h1>
        </header>
        <div>
          <img src={spaceship} id="spaceship" align="left"/>
        </div>
        <button type="button" id="startButton">Start Game</button>
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

export default App;