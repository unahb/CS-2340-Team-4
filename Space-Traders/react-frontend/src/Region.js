import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import spaceship from './resources/spaceship.png';
import './Region.css';
import { get, put, putTypes } from './requests';

class Region extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      player: {},
      region: {},
      encounter: null,
      ship: {},
    }
  }

  componentWillMount() {
    if (this.props.location.response) {
      get((item) => {
        console.log(item)
        this.setState({ player: item.Player, ship: item.Ship, region: item.Player.region })
      })
    } else {
      put(putTypes.TRAVEL, this.props.location.region.name, () => {
        get((item) => {
          console.log(item)
          if (item.Player.region) {
            this.setState({ player: item.Player, ship: item.Ship, region: item.Player.region })
          } else if (item.Player.encounter) {
            this.setState({ player: item.Player, ship: item.Ship, encounter: item.Player.encounter })
          }
        })
      })
    }
  }

  toggleSidebar() {
    document.getElementById("sidebar").hidden = !document.getElementById("sidebar").hidden
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
        document.getElementById("inp").value = 1;
      })
    } else {
      put(putTypes.SELL, transaction, () => {
        console.log('SELL SUCCESS')
        get((item) => {
          this.setState({ player: item.Player, region: item.Player.region, ship: item.Ship })
        })
        console.log(this.state)
        document.getElementById("inp").value = 1;
      })
    }
  }

  customAlert(title, message) {
    document.getElementById("customAlert").hidden = false;
    document.getElementById("alertHead").innerText = title;
    document.getElementById("alertMes").innerText = message;
    document.getElementById("customAlert").style.zIndex = 1;
  }

  cAlert(title, message) {
    return(
      <div id="customAlert" hidden={this.props.location.response ? false : true}>
        <h1 id="alertHead">{title}</h1>
        <div id="alertMes">{message}</div>
        <br></br>
        <button id="alertBut" onClick={(event) => {
          document.getElementById("customAlert").hidden = true;
          document.getElementById("customConfirm").style.zIndex = 1;
        }}>Ok</button>
      </div>
    );
  }

  render() {
    if (this.state.encounter) {
      return (<Redirect to={{ pathname: '/NPC' }} />);
    } else if (Object.entries(this.state.player).length !== 0) {
      console.log(this.state)
      const region = this.state.region
      const market = this.state.player.region.market
      const ship = this.state.ship
      const player = this.state.player
      let transaction = { good: null, quant: null, isBuy: null }

      let invenTable = []
      for (let [invenItem, invenQuantity] of Object.entries(ship.cargo)) {
        const row =
          <tr class="invenTr">
            <td class="invenTd">
              <button type="button" class="sellButton" style={{ "text-align": "left", fontSize: "1.75vh" }} onClick={(event) => {
                transaction.good = invenItem;
                transaction.quant = 1;
                transaction.isBuy = false;
                customConfirm("Please Confirm", "Sell 1 " + invenItem + "(s) for " + ship.cargo[invenItem].price * 1 + " Credits");
              }}>{invenItem}: {invenQuantity.quantity}, {invenQuantity.price}</button>
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
                transaction.quant = 1;
                transaction.isBuy = true;
                customConfirm("Please Confirm", "Buy 1 " + name + "(s) for " + player.region.market[transaction.good].buy * 1 + " Credits");
              }}>{prices.buy}</button>
            </td>
            <td class="MarkTd">
              <button type="button" class="sellButton" onClick={(event) => {
                if (ship.cargo[name] == undefined) {
                  this.customAlert("Selling Error", "Cannot sell items you do not own")
                } else {
                  transaction.good = name;
                  transaction.quant = 1;
                  transaction.isBuy = false;
                  customConfirm("Please Confirm", "Sell 1 " + name + "(s) for " + ship.cargo[name].price * 1 + " Credits");
                }
              }}>{prices.sell}</button>
            </td>
            <td class="MarkTd">{prices.quantity}</td>
          </tr>
        table.push(row)
      }

      let customAlert = null;
      if (this.props.location.response) {
        customAlert = this.cAlert("Encounter Result", this.props.location.response.substring(18, this.props.location.response.length - 4))
        this.props.location.response = null;
      } else {
        customAlert = this.cAlert("", "")
      }

      return (
        <div id="Main">
          <div id="sidebar" hidden={true} style={styles.sidebar}>
            <h1 id="pixelFont" style={{ fontSize: "2vw", 'text-decoration': "underline" }}>Inventory</h1>
            <h1 id="pixelFont" style={{ fontSize: "0.9vw", }}>Remaining Cargo Space:
                <h1 style={{ fontSize: "1.5vw", color: "blue" }}>{ship.max_cargo_space - ship.current_cargo}</h1>
            </h1>
            <div id="pixelFont" style={{ fontSize: "0.8vw", margin: "1px" }}>Item: Quantity, Unit Value</div>
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
                <img src={spaceship} id="spaceship-static" />
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
          
          {customAlert}

          <div id="customConfirm" hidden="true">
            <h1 id="confirmHead"></h1>
            <div id="confirmMes"></div>
            <input type="number" class="quantityInput" id="inp" defaultValue="1" min="0" max={ship.max_cargo_space} onChange={(event) => {
              if (transaction.isBuy) {
                transaction.quant = document.getElementById("inp").value;
                document.getElementById("confirmMes").innerText = "Buy " + document.getElementById("inp").value * 1 + " " + transaction.good + "(s) for " + player.region.market[transaction.good].buy * document.getElementById("inp").value + " Credits"
              } else {
                transaction.quant = document.getElementById("inp").value;
                document.getElementById("confirmMes").innerText = "Sell " + document.getElementById("inp").value * 1 + " " + transaction.good + "(s) for " + ship.cargo[transaction.good].price * document.getElementById("inp").value + " Credits"
              }
            }}></input>
            <button id="confirmCancel" onClick={(event) => {
              document.getElementById("customConfirm").hidden = true;
              document.getElementById("inp").value = 1;
            }}>Cancel</button>
            <button id="confirmSubmit" onClick={(event) => {
              if (transaction.isBuy) {
                if (document.getElementById("inp").value <= 0 || document.getElementById("inp").value > ship.max_cargo_space - ship.current_cargo || document.getElementById("inp").value > player.region.market[transaction.good].quantity) {
                  document.getElementById("customConfirm").style.zIndex = 0;
                  this.customAlert("Buying Error", "Cannot buy " + document.getElementById("inp").value * 1 + " of " + transaction.good + "(s)")
                } else if (player.region.market[transaction.good].buy * document.getElementById("inp").value > player.credits) {
                  document.getElementById("customConfirm").style.zIndex = 0;
                  this.customAlert("Insufficient Credits", "Cannot buy " + document.getElementById("inp").value * 1 + " " + transaction.good + "(s)")
                } else {
                  this.buySellItem(transaction)
                }
              } else {
                if (document.getElementById("inp").value <= 0 || document.getElementById("inp").value > ship.cargo[transaction.good].quantity) {
                  document.getElementById("customConfirm").style.zIndex = 0;
                  this.customAlert("Selling Error", "Cannot sell " + document.getElementById("inp").value * 1 + " of " + transaction.good + "(s)")
                } else {
                  this.buySellItem(transaction)
                }
              }
            }}>Confirm</button>
          </div>
        </div>
      );
    } else {
      return (
        <div id="Welcome">
          <div id="stars">
            <header id="Welcome-header">
              <h1>Traveling to Planet...</h1>
            </header>
            <img src={spaceship} id="spaceship" align="left"/>
          </div>
        </div>
      );
    }
  }
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