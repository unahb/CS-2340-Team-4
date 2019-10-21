import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import spaceship from './resources/spaceship.png'
import './PlayerStats.css'
import { post, get } from './requests';

class PlayerStats extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      player: {}
    }
  }

  componentWillMount() {
    // Make POST request with updated player values
    const player = this.props.location.player
    const attributes = player.pPoints + "," + player.fPoints + "," + player.mPoints + "," + player.ePoints
    const playerStats = {"difficulty": player.difficulty, "attributes": attributes, "name": player.name}
    post(playerStats, '/Space-Traders', this.getRegionCoordinates.bind(this))
  }

  // Make GET request when POST complete
  getRegionCoordinates() {
    get((item) => {
      console.log(item)
      this.setState({ player: item.Player })
    })
  }

  render() {
    console.log(this.state)
    const player = this.state.player
    const region = this.state.player.region
    if (Object.entries(player).length !== 0) {
      return (
        <div id="Main">
          <div id="stars">
            <header id="Hi-header">
              <h1>Hi <span style={styles.green}>{player.name.toUpperCase()}!</span></h1>
            </header>
            <div>
              <img src={spaceship} id="spaceship" align="left" />
            </div>
            <div>
              <text id="statsDifficulty">Difficulty: <span style={styles.blue}>{player.difficulty.toUpperCase()}</span></text>
              <br></br>
              <text id="pLevel">Pilot Level: <span style={styles.blue}>{player.skills.Pilot}</span></text>
              <br></br>
              <text id="fLevel">Fighter Level: <span style={styles.blue}>{player.skills.Fighter}</span></text>
              <br></br>
              <text id="mLevel">Merchant Level: <span style={styles.blue}>{player.skills.Merchant}</span></text>
              <br></br>
              <text id="eLevel">Engineer Level: <span style={styles.blue}>{player.skills.Engineer}</span></text>
              <br></br>
              <text id="creditsStat">Credits: <span style={styles.blue}>{player.credits}</span></text>
              <br></br>
              <Link 
                to={{
                  pathname: '/Region',
                  region
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
