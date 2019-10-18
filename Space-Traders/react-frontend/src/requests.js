// GET request to retrieve data
function get(callback) {
  var xhrGET = new XMLHttpRequest()
  // get a callback when the server responds to GET request
  xhrGET.addEventListener('load', () => {
    // pass data back to callback function
    // console.log(xhrGET.responseText)
    if (callback) {
      callback(JSON.parse(xhrGET.responseText))
    }
  })
  xhrGET.open('GET', '/Space-Traders')
  xhrGET.send();
}

// POST request and return updated data
function post(value, location, callback) {
  var xhrPOST = new XMLHttpRequest()
  // get a callback when the server responds to POST request
  xhrPOST.addEventListener('load', () => {
    console.log(xhrPOST.responseText)
    if (callback) {
      callback(xhrPOST.responseText)
    }
  })

  // open and send POST request to update player data
  xhrPOST.open('POST', location)
  xhrPOST.setRequestHeader("Content-Type", "application/json");
  xhrPOST.send(JSON.stringify(value))
}

// PUT request and return updated data
function put(type, props, callback) {
  var xhrPUT = new XMLHttpRequest()
  // get a callback when the server responds to PUT request
  xhrPUT.addEventListener('load', () => {
    console.log(xhrPUT.responseText)
    if (callback) {
      callback(xhrPUT.responseText)
    }
  })

  // open and send PUT request to update player data
  if (type === putTypes.TRAVEL) {
    xhrPUT.open('PUT', "/Space-Traders/travel/" + props)
  } else if (type === putTypes.BUY) {
    xhrPUT.open('PUT', "/Space-Traders/buy/" + props.good + "/" + props.quant)
  } else if (type === putTypes.SELL) {
    xhrPUT.open('PUT', "/Space-Traders/sell/" + props.good + "/" + props.quant)
  }
  
  xhrPUT.send()
}

const putTypes = {
  TRAVEL: 'travel',
  BUY: 'buy',
  SELL: 'sell'
}

export { get, post, put, putTypes }