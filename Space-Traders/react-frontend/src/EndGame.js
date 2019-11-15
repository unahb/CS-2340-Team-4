import React from 'react';
import "./EndGame.css";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { get } from './requests';
import spaceship from './resources/spaceship.png';

class EndGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      player: {},
      ship: {},
      region: {}
    }
  }

  componentWillMount() {
    this.updateState();
  }

  updateState() {
    get((item) => {
      this.setState({
        player: item.Player,
        ship: item.Ship,
        region: item.region
      })
    })
  }

  render() {
    console.log(this.state)
    if (this.state.ship.current_health <= 0) {
      return this.renderGameOver();
    } else {
      return this.renderWin();
    }
  }

  renderGameOver() {
    return (
      <div id="Welcome">
        <div id="stars">
          <header id="Welcome-header">
            <h1>Game Over</h1>
            <h1>Ship health has reached 0...</h1>
          </header>
          <div>
            <img src={spaceship} id="spaceship" align="left"/>
          </div>
          <div id="endDecision">
            <button type="button" id="endButton">
              <Link to={'/'} className="nav-link">RESTART</Link>
            </button>
          </div>
        </div>
      </div>
    )
  }

  renderWin() {
    const region = this.state.region
    return (
      <div id="Welcome">
        <div id="stars">
          <header id="Welcome-header">
            <h1>You Win!!</h1>
            <h1>Would you like to continue?</h1>
          </header>
          <div>
            <img src={spaceship} id="spaceship" align="left"/>
          </div>
          <div id="endDecision">
            {/* <button type="button" id="endButton">
              <Link to={'/Region', region } className="nav-link">Continue</Link>
            </button>
            <br></br> */}
            <button type="button" id="endButton">
              <Link to={'/'} className="nav-link">RESTART</Link>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default EndGame;