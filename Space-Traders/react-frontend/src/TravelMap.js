import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css'

function TravelMap() {
  const dummyREGIONS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  return (
    <div id="Main">
      <div id="mapBack">
        <img id="mapArea" usemap="#planets"/>
        <div className="circle">
        </div>
        <map name="planets">
          <area shape="circle" coords="50vw,50vhs,100" alt="Sun" onClick={(e) => getRegionData()}/>
          <area shape="circle" coords="90,58,3" alt="Mercury"/>
          <area shape="circle" coords="124,58,8" alt="Venus"/>
        </map>
      </div>
    </div>
  )

  function getRegionData() {
    console.log('updating')
    var xhr = new XMLHttpRequest()
  
    // get a callback when the server responds
    xhr.addEventListener('load', () => {
      // update the state of the component with the result here
      console.log(xhr.responseText)
    })
    // open the request with the verb and the url
    xhr.open('GET', '/Space-Traders')
    // send the request
    xhr.send()
  }
}

export default TravelMap
