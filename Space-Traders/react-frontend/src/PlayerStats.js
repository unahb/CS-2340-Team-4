import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import spaceship from './resources/spaceship.png'
import './App.css'
import { post, get } from './requests';

class PlayerStats extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      player: {},
      regions:[],
    }
  }

  componentWillMount() {
    // Make POST request with updated player values
    // Make GET request when POST complete
    const player = this.props.location.player
    const attributes = player.pPoints + "," + player.fPoints + "," + player.mPoints + "," + player.ePoints
    const playerStats = {"difficulty": player.difficulty, "attributes": attributes, "name": player.name}
    post(playerStats, '/Space-Traders', () => {
      get((item) => {
        this.setState({ player: item[0], regions: item.slice(1, 11) })
      })
    })
  }

  render() {
    console.log(this.state)
    const player = this.state.player
    if (Object.entries(player).length !== 0) {
      return (
        <div id="Main">
          <div id="stars">
            <header id="Welcome-header">
              <h1>Hi <span style={styles.green}>{player.name.toUpperCase()}!</span></h1>
            </header>
            <div>
              <img src={spaceship} id="spaceship" align="left" />
            </div>
            <div>
              <text id="statsDifficulty">Difficulty: <span style={styles.blue}>{player.difficulty.toUpperCase()}</span></text>
              <br></br>
              <text id="pLevel">Pilot Level: <span style={styles.blue}>{player.skills[0]}</span></text>
              <br></br>
              <text id="fLevel">Fighter Level: <span style={styles.blue}>{player.skills[1]}</span></text>
              <br></br>
              <text id="mLevel">Merchant Level: <span style={styles.blue}>{player.skills[2]}</span></text>
              <br></br>
              <text id="eLevel">Engineer Level: <span style={styles.blue}>{player.skills[3]}</span></text>
              <br></br>
              <text id="credits">Credits: <span style={styles.blue}>{player.credits}</span></text>
              <br></br>
              <Link 
                to={{
                  pathname: '/TravelMap',
                  player
                }}
                className="nav-link" 
              >
                <button type="button" id="initializeGame" onClick={() => {}}>
                  CONTINUE
                </button>
              </Link>
            </div>
          </div>
        </div>
      )
    } else {
      return (<div></div>)
    }
  }
}

const styles = {
  blue: { color: "#00d0ff" },
  green: { color: "#15ff00" }
}

export default PlayerStats
