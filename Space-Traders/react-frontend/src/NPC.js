import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './NPC.css'
import { get } from './requests';

class NPC extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      player: {},
      currRegion: {},
      regions: {},
      ship: {},
      npcType: 'bandit',
    }

    this.previousRegion = this.props.location.previousRegion;
    this.nextRegion = this.props.location.nextRegion;
  }

  componentWillMount() {
    // get((item) => {
    //   this.setState({ player: item.Player, currRegion: item.Player.region, regions: item.Planets, ship: item.Ship })
    //   const currRegion = item.Player.region
    //   displayPlanet(currRegion, this.state.player, this.state.ship)
    // })
  }

  render() {
    const { npcType } = this.state;
    let encounter = '';
    if (npcType == 'bandit') {
      encounter = this.renderBandit();
    } else if (npcType == 'trader') {
      encounter = this.renderTrader();
    } else {
      encounter = this.renderPolice();
    }
    return (
      <div id="Welcome">
      <div id="stars">
        <header id="Welcome-header">
          <h1>BANDIT ENCOUNTERED!</h1>
        </header>
        {encounter}
      </div>
    </div>
    )
  }

  renderBandit() {
    return (
      <div id="encounter">
        
      </div>
    );
  }

  // renderTrader() {
  //   return ();
  // }

  // renderPolice() {
  //   return ();
  // }
}

export default NPC;
