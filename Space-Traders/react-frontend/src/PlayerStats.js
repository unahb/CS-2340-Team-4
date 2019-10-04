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
    get((item) => {
      const parsed = JSON.parse(item)
      this.setState({ player: parsed[0], regions: parsed.slice(1, 11) })
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
              <button type="button" id="initializeGame">
                Continue
              </button>
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
