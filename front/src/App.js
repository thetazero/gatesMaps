import React, { useState } from 'react';

import './App.css';

import LocationInput from './LocationInput';
import Directions from './Directions';
import { formatTime, niceNumber } from './utils'

const ip = 'http://localhost:4200'

function App() {
  const [time, setTime] = useState(0)
  const [directions, setDirections] = useState([])
  const [timer, setTimer] = useState(0)
  let timerStart = null
  let [timerInterval, setTimerInterval] = useState(-1)

  async function navigate(from, to) {
    if (!from || !to) {
      console.log("clear interval")
      console.log(timerInterval)
      clearInterval(timerInterval)
      setTimerInterval(-1)
      setTimer(0)
      setTime(0)
    } else {
      let data = await fetch(`${ip}/route/${from}/${to}`)
      data = await data.json()
      setTime(data.time)
      setDirections(data.description)
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
      <div className="title">Gates Maps</div>
      <LocationInput navigate={navigate}></LocationInput>

      <div className="time">
        {niceNumber(timer / 1000, 1)} / {formatTime(time)}
      </div>
      <Directions directions={directions} />
      <a
        className="App-link"
        href="https://www.cmu.edu/finance/property-space/floorplan-room/acad-admin/GHC/index.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        Gates Map
      </a>
    </div>
  );
}

export default App;
