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
          <area shape="circle" coords="50vw,50vhs,100" alt="Sun" onClick={(e) => console.log("Hello")}/>
          <area shape="circle" coords="90,58,3" alt="Mercury"/>
          <area shape="circle" coords="124,58,8" alt="Venus"/>
        </map>
      </div>
    </div>
  )
}

export default TravelMap
