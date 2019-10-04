// GET request to retrieve data
function get(callback) {
  var xhrGET = new XMLHttpRequest()
  // get a callback when the server responds to GET request
  xhrGET.addEventListener('load', () => {
    // pass data back to callback function
    // console.log(xhrGET.responseText)
    if (callback) {
      callback(xhrGET.responseText)
    }
  })
  xhrGET.open('GET', '/Space-Traders')
  xhrGET.send();
}

// POST request and return updated data
function post(value, location) {
  var xhrPOST = new XMLHttpRequest()
  var xhrGET = new XMLHttpRequest()
  // get a callback when the server responds to POST request
  xhrPOST.addEventListener('load', () => {
    console.log(xhrPOST.responseText)
    // open GET request to fetch updated data
    xhrGET.open('GET', '/Space-Traders')
    xhrGET.send();
  })
  // get a callback when the server responds to GET request
  xhrGET.addEventListener('load', () => {
    // pass data back to callback function
    // console.log(xhrGET.responseText)
  })

  // open and send POST request to update player data
  xhrPOST.open('POST', location)
  xhrPOST.setRequestHeader("Content-Type", "application/json");
  xhrPOST.send(JSON.stringify(value))
}

export { get, post }