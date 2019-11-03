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
              {encounter}
              <img id="encounter_image" src={bandit} align="right"></img>
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
        <button id="button_format" onClick={() => {
          if (true) {
            return
          }
        }}>Pay: {this.state.player.encounter.cost}</button>
        <button id="button_format">Flee</button>
        <button id="button_format">Fight</button>
      </div>
    )
  }

  renderTrader() {
    
    return (
      <div id="encounter">
        <button id="button_format">Buy</button>
        <button id="button_format">Rob</button>
        <button id="button_format">Ignore</button>
        <button id="button_format">Negotiate</button>
      </div>
    )
  }

  renderPolice() {
    return (
      <div id="encounter">
        <button id="button_format">Forfeit</button>
        <button id="button_format">Flee</button>
        <button id="button_format">Fight</button>
      </div>
    )
  }
}

export default NPC
