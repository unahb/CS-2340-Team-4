import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './NPC.css'
import { get } from './requests'
import bandit from './resources/bandit.png'
import trader from './resources/trader.png'
import police from './resources/police.png'
import spaceship from './resources/spaceship.png';



class NPC extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      player: {},
      currRegion: {},
      regions: {},
      ship: {},
      npcType: null
    }

    this.previousRegion = this.props.location.previousRegion
    this.nextRegion = this.props.location.nextRegion
  }

  componentWillMount() {
    get((item) => {
      this.setState({ player: item.Player, currRegion: item.Player.region, regions: item.Planets, ship: item.Ship, npcType: item.Player.encounter.type })
    })
  }

  render() {
    console.log(this.state)
    const npcType = this.state.npcType
    let encounter = ''
    encounter = this.renderBandit();
    // if (npcType == 'Bandits') {
    //   encounter = this.renderBandit()
    // } else if (npcType == 'Trader') {
    //   encounter = this.renderTrader()
    // } else {
    //   encounter = this.renderPolice()
    // }
    return (
      <div id="Welcome">
        <div id="stars">
          {encounter}
        </div>
      </div>
    )
  }

  renderBandit() {
    return (
      <div>
        <header id="Welcome-header">
          <h1>BANDIT ENCOUNTERED!</h1>
        </header>
        <div id="content">
          <div>
            <img src={spaceship} id="spaceship" align="left"/>
          </div>
          <div id="encounter">
            <button id="button_format">pay</button>
            <button id="button_format">flee</button>
            <button id="button_format">fight</button>
          </div>
          <img id="encounter_image" src={bandit} align="right"></img>
        </div>
      </div>
    )
  }

  renderTrader() {
    return (
      <div>
        <header id="Welcome-header">
          <h1>TRADER ENCOUNTERED!</h1>
        </header>
        <div id="content">
          <div>
            <img src={spaceship} id="spaceship" align="left"/>
          </div>
          <div id="encounter">
            <button id="button_format">buy</button>
            <button id="button_format">rob</button>
            <button id="button_format">ignore</button>
            <button id="button_format">negotiate</button>
          </div>
          <img id="encounter_image" src={trader} align="right"></img>
        </div>
      </div>
    )
  }

  renderPolice() {
    return (
      <div>
        <header id="Welcome-header">
          <h1>POLICE ENCOUNTERED!</h1>
        </header>
        <div id="content">
          <div>
            <img src={spaceship} id="spaceship" align="left"/>
          </div>
          <div id="encounter">
            <button id="button_format">forfeit</button>
            <button id="button_format">flee</button>
            <button id="button_format"> fight</button>
          </div>
          <img id="encounter_image" src={police} align="right"></img>
        </div>
      </div>
    )
  }
}

export default NPC
