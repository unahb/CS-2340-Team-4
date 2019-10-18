import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import spaceship from './resources/spaceship.png';
import './Region.css';
import { get, put, putTypes } from './requests';

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
    put(putTypes.TRAVEL, this.props.location.region.name, () => {
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

  buySellItem(transaction) {
    document.getElementById("customConfirm").hidden = true;
    if (transaction.isBuy) {
      put(putTypes.BUY, transaction, () => {
        console.log('BUY SUCCESS')
        get((item) => {
          this.setState({ player: item.Player, region: item.Player.region, ship: item.Ship })
        })
        console.log(this.state)
        document.getElementById(transaction.good + "inp").value = 0;
      })
    } else {
      put(putTypes.SELL, transaction, () => { console.log('SELL SUCCESS') })  
    }
  }

  render() {
    if (Object.entries(this.state.player).length !== 0) {
      const region = this.state.region
      const market = this.state.player.region.market
			const ship = this.state.ship
      const player = this.state.player
      let transaction = {good: null, quant: null, isBuy: null}

      console.log(ship)

      let invenTable = []
      for (let [invenItem, invenQuantity] of Object.entries(ship.cargo)) {
        const row =
          <tr class="invenTr">
            <td class="invenTd" style={{left: "1vw"}}>{invenItem}: {invenQuantity}</td>
          </tr>
        invenTable.push(row)
      }

      let table = []
      for (let [name, prices] of Object.entries(market)) {
        const row =
          <tr class="MarkTr">
            <td class="MarkTd">{name}</td>
						<td class="MarkTd">
							<button type="button" class="buyButton" onClick={(event) => {
								if (document.getElementById(name + "inp").value <= 0) {
									customAlert("Buying Error", "Cannot buy " + document.getElementById(name + "inp").value + " of " + name + "(s)")
								} else if (prices.Buy * document.getElementById(name + "inp").value > player.credits) {
									customAlert("Insufficient Credits", "Cannot buy "+ document.getElementById(name + "inp").value + " " + name + "(s)")
								} else {
                  customConfirm("Please Confirm", "Buy " + document.getElementById(name + "inp").value + " " + name +"(s) for " + prices.Buy * document.getElementById(name + "inp").value + " Credits");
                  transaction.good = name;
                  transaction.quant = document.getElementById(name + "inp").value;
                  transaction.isBuy = true;
								}
							}}>{prices.Buy}</button>
						</td>
            <td class="MarkTd">
							<button type="button" class="sellButton" onClick={(event) => {
								if (document.getElementById(name + "inp").value <= 0) {
									customAlert("Selling Error", "Cannot sell " + document.getElementById(name + "inp").value + " of " + name + "(s)")
								} else {
                  customConfirm("Please Confirm", "Sell " + document.getElementById(name + "inp").value + " " + name +"(s) for " + prices.Sell * document.getElementById(name + "inp").value + " Credits");
                  transaction.good = name;
                  transaction.quant = document.getElementById(name + "inp").value;
                  transaction.isBuy = false;
								}
							}}>{prices.Sell}</button>
						</td>
						<td class="MarkTd">
							<input type="number" class="quantityInput" id={name + "inp"} defaultValue="0" min="0"></input>
						</td>
          </tr>
        table.push(row)
      }

      return (
        <div id="Main">
          <div id="sidebar" hidden={true} style={styles.sidebar}>
            <h1 id="pixelFont" style={{ fontSize: "2.5vw", 'text-decoration': "underline" }}>Inventory</h1>
            <h1 id="pixelFont" style={{ fontSize: "0.9vw", }}>Remaining Cargo Space: {ship.max_cargo_space - ship.current_cargo}</h1>
            <div id="itemContents">
              Hello Bitch ;-)
              {invenTable}
            </div>
          </div>

          <div id="banner" style={{ flexDirection: 'row' }}>
            <header id="Region-header">
              <h1>{region.name.toUpperCase()}</h1>
              <h1 style={{ fontSize: "2vw", marginTop: -15 }}>Location: ({region.x_coordinate}, {region.y_coordinate})</h1>
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
							<th class="MarkTh" style={styles.yellow}>Quantity</th>
            </tr>
            {table}
          </table>

					<br></br>
					<div id="credits" align="left">Credits: {player.credits}</div>

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

					<div id="customAlert" hidden="true">
						<h1 id="alertHead"></h1>
						<div id="alertMes"></div>
            <br></br>
						<button id="alertBut" onClick={(event) => {
							document.getElementById("customAlert").hidden = true;
						}}>Ok</button>
					</div>

					<div id="customConfirm" hidden="true">
						<h1 id="confirmHead"></h1>
						<div id="confirmMes"></div>
						<button id="confirmCancel" onClick={(event) => {
							document.getElementById("customConfirm").hidden = true;
						}}>Cancel</button>
						<button id="confirmSubmit" onClick={(event) => this.buySellItem(transaction)}>Submit</button>
					</div>
        </div>
      );
    } else {
      return (<div></div>)
    }
  }
}

function customAlert(title, message) {
	document.getElementById("customAlert").hidden = false;
	document.getElementById("alertHead").innerText = title;
	document.getElementById("alertMes").innerText = message;
	document.getElementById("customAlert").style.zIndex = 1;
}

function customConfirm(title, message) {
	document.getElementById("customConfirm").hidden = false;
	document.getElementById("confirmHead").innerText = title;
	document.getElementById("confirmMes").innerText = message;
	document.getElementById("customConfirm").style.zIndex = 1;
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