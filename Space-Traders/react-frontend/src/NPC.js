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
      this.setState({
        player: item.Player,
        currRegion: item.Player.region,
        regions: item.Planets,
        ship: item.Ship,
        npcType: item.Player.encounter.type })
    })
  }

  render() {
    console.log(this.state)
    let npcType = this.state.npcType
    let image = null;
    let encounter = ''
    if (npcType == 'Bandits') {
      npcType = 'BANDIT';
      image = bandit;
      encounter = this.renderBandit()
    } else if (npcType == 'Trader') {
      npcType = 'TRADER';
      image = trader;
      encounter = this.renderTrader()
    } else {
      npcType = 'POLICE';
      image = police;
      encounter = this.renderPolice()
    }
    if (npcType) {
      return (
        <div id="Welcome">
          <div id="stars">
            <div>
              <header id="Welcome-header">
                <h1>{npcType} ENCOUNTERED!</h1>
              </header>
              <div id="content">
                <div>
                  <img src={spaceship} id="spaceship" align="left" />
                </div>
                {encounter}
                <img id="encounter_image" src={image} align="right"></img>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (<div></div>);
    }
  }

  renderBandit() {
    return (
      <div id="encounter">
        <button id="button_format">pay</button>
        <button id="button_format">flee</button>
        <button id="button_format">fight</button>
      </div>
    )
  }

  renderTrader() {
    
    return (
      <div id="encounter">
        <button id="button_format">buy</button>
        <button id="button_format">rob</button>
        <button id="button_format">ignore</button>
        <button id="button_format">negotiate</button>
      </div>
    )
  }

  renderPolice() {
    return (
      <div id="encounter">
        <button id="button_format">forfeit</button>
        <button id="button_format">flee</button>
        <button id="button_format"> fight</button>
      </div>
    )
  }
}

export default NPC
