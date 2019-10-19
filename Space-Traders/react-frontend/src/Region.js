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
        document.getElementById("inp").value = 0;
      })
    } else {
      put(putTypes.SELL, transaction, () => {
        console.log('SELL SUCCESS')
        get((item) => {
          this.setState({ player: item.Player, region: item.Player.region, ship: item.Ship })
        })
        console.log(this.state)
        document.getElementById("inp").value = 0;
      })  
    }
  }

  render() {
    if (Object.entries(this.state.player).length !== 0) {
      const region = this.state.region
      const market = this.state.player.region.market
			const ship = this.state.ship
      const player = this.state.player
      let transaction = { good: null, quant: null, isBuy: null }

      console.log(player)
      console.log(ship)

      let invenTable = []
      for (let [invenItem, invenQuantity] of Object.entries(ship.cargo)) {
        const row =
          <tr class="invenTr">
            <td class="invenTd">
              <button type="button" class="sellButton" style={{"text-align": "left", fontSize: "1.75vh"}} onClick={(event) => {
                transaction.good = invenItem;
                transaction.isBuy = false;
                customConfirm("Please Confirm", "Sell 0 " + invenItem +"(s) for 0 Credits");
              }}>{invenItem}: {invenQuantity.quantity}</button>
            </td>
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
                transaction.good = name;
                transaction.isBuy = true;
                customConfirm("Please Confirm", "Buy 0 " + name +"(s) for 0 Credits");
							}}>{prices.buy}</button>
						</td>
            <td class="MarkTd">
							<button type="button" class="sellButton" onClick={(event) => {
                if (ship.cargo[name] == undefined) {
                  customAlert("Selling Error", "Cannot sell items you do not own")
                } else {
                  transaction.good = name;
                  transaction.isBuy = false;
                  customConfirm("Please Confirm", "Sell 0 " + name +"(s) for 0 Credits");
                }
							}}>{prices.sell}</button>
						</td>
            <td class="MarkTd">{prices.quantity}</td>
          </tr>
        table.push(row)
      }

      return (
        <div id="Main">
          <div id="sidebar" hidden={true} style={styles.sidebar}>
            <h1 id="pixelFont" style={{ fontSize: "2vw", 'text-decoration': "underline" }}>Inventory</h1>
            <h1 id="pixelFont" style={{ fontSize: "0.9vw", }}>Remaining Cargo Space:
              <h1 style={{ fontSize: "1.5vw", color: "blue" }}>{ship.max_cargo_space - ship.current_cargo}</h1>
            </h1>
            <div id="itemContents">
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
              <th class="MarkTh" style={styles.yellow}>Stock</th>
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
              document.getElementById("customConfirm").style.zIndex = 1;
						}}>Ok</button>
					</div>

					<div id="customConfirm" hidden="true">
						<h1 id="confirmHead"></h1>
						<div id="confirmMes"></div>
					  <input type="number" class="quantityInput" id="inp" defaultValue="0" min="0" max={ship.max_cargo_space} onChange={(event) => {
              if (transaction.isBuy) {
                transaction.quant = document.getElementById("inp").value;
                document.getElementById("confirmMes").innerText = "Buy " + document.getElementById("inp").value * 1 + " " + transaction.good +"(s) for " + player.region.market[transaction.good].buy * document.getElementById("inp").value + " Credits"
              } else {
                transaction.quant = document.getElementById("inp").value;
                document.getElementById("confirmMes").innerText = "Sell " + document.getElementById("inp").value * 1 + " " + transaction.good +"(s) for " + ship.cargo[transaction.good].price * document.getElementById("inp").value + " Credits"
              }
            }}></input>
						<button id="confirmCancel" onClick={(event) => {
              document.getElementById("customConfirm").hidden = true;
              document.getElementById("inp").value = 0;
						}}>Cancel</button>
						<button id="confirmSubmit" onClick={(event) => {
              if (transaction.isBuy) {
                if (document.getElementById("inp").value <= 0 || document.getElementById("inp").value > ship.max_cargo_space - ship.current_cargo || document.getElementById("inp").value > player.region.market[transaction.good].quantity) {
                  document.getElementById("customConfirm").style.zIndex = 0;
									customAlert("Buying Error", "Cannot buy " + document.getElementById("inp").value * 1 + " of " + transaction.good + "(s)")
								} else if (player.region.market[transaction.good].buy * document.getElementById("inp").value > player.credits) {
                  document.getElementById("customConfirm").style.zIndex = 0;
									customAlert("Insufficient Credits", "Cannot buy "+ document.getElementById("inp").value * 1 + " " + transaction.good + "(s)")
								} else {
                  this.buySellItem(transaction)
                }
              } else {
                if (document.getElementById("inp").value <= 0 || document.getElementById("inp").value > ship.cargo[transaction.good].quantity) {
                  document.getElementById("customConfirm").style.zIndex = 0;
                  customAlert("Selling Error", "Cannot sell " + document.getElementById("inp").value * 1 + " of " + transaction.good + "(s)")
								} else {
                  this.buySellItem(transaction)
								}
              }
            }}>Confirm</button>
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
    right: '2vw',
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  spaceshipContainer: {
    backgroundColor: "#65cee6",
    borderRadius: '10vh',
  },
  sidebar: {
    position: 'absolute',
    right: '1px',
    bottom: 0,
    height: '84vh',
    width: '22vw',
    'align-content': 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    opacity: 0.8,
  },
}

export default Region;