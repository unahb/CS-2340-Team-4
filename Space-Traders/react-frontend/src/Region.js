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

  toggleSidebar() {
    if (document.getElementById("sidebar").hidden) {
      document.getElementById("sidebar").hidden = false;
    } else {
      document.getElementById("sidebar").hidden = true;
    }
  }

  render() {
    if (Object.entries(this.state.player).length !== 0) {
      const region = this.state.region
      const market = this.state.player.region.market
      const ship = this.state.ship

      console.log(ship)

      let table = []
      for (let [name, prices] of Object.entries(market)) {
        console.log(prices)
        const row =
          <tr class="MarkTr">
            <th class="MarkTh">{name}</th>
            <td class="MarkTd">{prices.Buy}</td>
            <td class="MarkTd">{prices.Sell}</td>
          </tr>
        table.push(row)
      }

      return (
        <div id="Main">
          <div id="sidebar" hidden={true} style={styles.sidebar}>
            <h1 id="pixelFont">Inventory</h1>
          </div>

          <div id="banner" style={{ flexDirection: 'row' }}>
            <header id="Region-header">
              <h1>{region.name.toUpperCase()}</h1>
              <h1 style={{ fontSize: 20, marginTop: -15 }}>Location: ({region.x_coordinate}, {region.y_coordinate})</h1>
            </header>
            <button type="button" style={styles.spaceshipButton} onClick={() => this.toggleSidebar()}>
              <div style={styles.spaceshipContainer}>
                <img src={spaceship} id="spaceship-static"/>
              </div>
            </button>
          </div>



          <table id="table" align="center">
            <tr class="MarkTr">
              <th class="MarkTh" style={styles.blue}>Items</th>
              <th class="MarkTh" style={styles.yellow}>Buy</th>
              <th class="MarkTh" style={styles.yellow}>Sell</th>
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

const styles = {
  // colors
  blue: { color: "#00d0ff" },
  green: { color: "#15ff00" },
  yellow: { color: "yellow" },

  // components
  spaceshipButton: {
    position: 'absolute',
    top: '2vh',
    right: '3vh',
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  spaceshipContainer: {
    backgroundColor: "#65cee6",
    borderRadius: '10vh',
  },
  sidebar: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: '84vh',
    width: '45vh',
    'align-content': 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    opacity: 0.8,
  },
}

export default Region;