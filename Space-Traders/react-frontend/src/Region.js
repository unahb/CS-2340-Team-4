import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import spaceship from './resources/spaceship.png';
import './Region.css';
import { get, put } from './requests';

class Region extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      player: {},
      region: {},
      ship: {},
    }
  }

  componentWillMount() {
    console.log(this.props)
    put(this.props.location.region.name, () => {
      get((item) => {
        this.setState({ player: item.Player, region: item.Player.region, ship: item.Ship })
      })
    })
  }

  render() {
    if (Object.entries(this.state.player).length !== 0) {
      const region = this.state.region
      const market = this.state.player.region.market
      const ship = this.state.ship

      let table = []
      for (let [name, prices] of Object.entries(market)) {
        console.log(prices)
        const row =
          <tr id="tableRow">
            <th>{name}</th>
            <td>{prices.Buy}</td>
            <td>{prices.Sell}</td>
          </tr>
        table.push(row)
      }

      return (
        <div id="Main">
          <header id="Region-header">
            <h1>{region.name.toUpperCase()}</h1>
            <h1 style={{ fontSize: 20, marginTop: -15 }}>Location: ({region.x_coordinate}, {region.y_coordinate})</h1>
          </header>

          <table id="table" align="left">
            <tr>
              <th>Items</th>
              <th>Buy</th>
              <th>Sell</th>
            </tr>
            {table}
          </table>

          <Link
            to={{
              pathname: '/TravelMap',
            }}
            className="nav-link"
          >
            <button type="button" id="mapButton">
              Map
            </button>
          </Link>
        </div>
      );
    } else {
      return (<div></div>)
    }
  }
}

export default Region;