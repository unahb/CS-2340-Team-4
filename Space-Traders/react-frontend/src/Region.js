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
      const coordX = this.state.region.x_coordinate
      const coordY = this.state.region.y_coordinate
      const market = this.state.player.region.market
      const ship = this.state.ship

      // const table = market..map((row) =>
      //   <tr>
      //     <th>{row.name}</th>
      //       <td>

      //       </td>
      //   </tr>
      // )
    
      return (
        <div id="Main">
          <header id="Region-header">
            <h1>{region.name.toUpperCase()}</h1>
            <h1 style={{ fontSize: 20, marginTop: -15 }}>Location: ({coordX}, {coordY})</h1>
          </header>

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