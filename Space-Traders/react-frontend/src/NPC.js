import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'
import './NPC.css'
import { get, put, putTypes } from './requests';
import bandit from './resources/bandit.png'
import trader from './resources/trader.png'
import police from './resources/police.png'
import spaceship from './resources/spaceship.png';

class NPC extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      player: {},
      goToRegion: null,
      regions: {},
      ship: {},
      npcType: null
    }
  }

  componentWillMount() {
    get((item) => {
      this.setState({
        player: item.Player,
        currRegion: item.Player.region,
        regions: item.Planets,
        ship: item.Ship,
        npcType: item.Player.encounter.type
      })
    })
  }

  render() {
    if (this.state.goToRegion) {
      const response = this.state.goToRegion
      return (<Redirect to={{ pathname: '/Region', response }} />);
    } else {
      console.log(this.state)
      let npcType = this.state.npcType
      let image = null;
      let encounter = ''
      if (npcType == 'Bandits') {
        npcType = 'BANDIT';
        image = bandit;
        encounter = this.renderBandit(this.state.player.encounter)
      } else if (npcType == 'Trader') {
        npcType = 'TRADER';
        image = trader;
        encounter = this.renderTrader(this.state.player.encounter)
      } else if (npcType == 'Police') {
        npcType = 'POLICE';
        image = police;
        encounter = this.renderPolice(this.state.player.encounter)
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
              {encounter}
              <img id="encounter_image" src={bandit} align="right"></img>
            </div>
          </div>
        )
      } else {
        return (<div></div>);
      }
    }
  }

  renderBandit(encounter) {
    const actions = encounter.actions;
    return (
      <div id="encounter">
        <button id="button_format" onClick={() => this.putRequest(actions[0])}>{actions[0]}: {encounter.cost}</button>
        <button id="button_format" onClick={() => this.putRequest(actions[1])}>{actions[1]}</button>
        <button id="button_format" onClick={() => this.putRequest(actions[2])}>{actions[2]}</button>
      </div>
    )
  }

  renderTrader(encounter) {
    const actions = encounter.actions;
    return (
      <div id="encounter">
        <button id="button_format" onClick={() => this.putRequest(actions[0])}>{actions[0]}</button>
        <button id="button_format" onClick={() => this.putRequest(actions[1])}>{actions[1]}</button>
        <button id="button_format" onClick={() => this.putRequest(actions[2])}>{actions[2]}</button>
        <button id="button_format" onClick={() => this.putRequest(actions[3])}>{actions[3]}</button>
      </div>
    )
  }

  renderPolice(encounter) {
    const actions = encounter.actions;
    return (
      <div id="encounter">
        <button id="button_format" onClick={() => this.putRequest(actions[0])}>{actions[0]}</button>
        <button id="button_format" onClick={() => this.putRequest(actions[1])}>{actions[1]}</button>
        <button id="button_format" onClick={() => this.putRequest(actions[2])}>{actions[2]}</button>
      </div>
    )
  }

  putRequest(action) {
    put(putTypes.ENCOUNTER, action, (response) => {
      this.setState({ goToRegion: response })
    })
  }
}

export default NPC;
