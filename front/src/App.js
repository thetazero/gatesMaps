import React, { useState } from 'react';
import './App.css';
import { ip } from "./config"

import LocationInput from './LocationInput';
import Directions from './Directions';
import { niceNumber } from './utils'

function App() {
  const [time, setTime] = useState(0)
  const [directions, setDirections] = useState([])
  const [timer, setTimer] = useState(0)
  let timerStart = null
  let [timerInterval, setTimerInterval] = useState(-1)
  let [path, setPath] = useState([])

  async function navigate(from, to) {
    if (!from || !to) {
      clearInterval(timerInterval)
      setTimerInterval(-1)
      console.log(path)
      let newTime = await fetch(`${ip}/route`, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          route: path,
          time: timer / 1000,
        })
      })
      newTime = await newTime.json()
      setTimer(0)
      setTime(0)
      setPath([])
      setDirections([])
    } else {
      let data = await fetch(`${ip}/route/${from}/${to}`)
      data = await data.json()
      setTime(data.time)
      setDirections(data.description)
      setPath(data.route)
      setTimer(0)
      timerStart = Date.now()
      let temp = setInterval(() => {
        setTimer(Date.now() - timerStart)
      }, 1000 / 60)
      setTimerInterval(temp)
    }
  }
  return (
    <div className="App">
      <div className="title">
        Gates Map
      </div>

      <LocationInput navigate={navigate}></LocationInput>

      <div className="time">
        {niceNumber(timer / 1000, 1)} / {niceNumber(time, 1)} s
      </div>
      <Directions directions={directions} />
      {/* <a
        className="App-link"
        href="https://www.cmu.edu/finance/property-space/floorplan-room/acad-admin/GHC/index.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        Gates Map
      </a> */}
      <footer style={{ position: 'absolute', bottom: '10px', color: 'grey', width: "100vw", fontSize: '0.8em' }}>(6th/7th floors only)</footer>
    </div>
  );
}

export default App;
