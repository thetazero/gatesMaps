import React, { useState } from 'react';

import logo from './logo.svg';
import './App.css';

import LocationInput from './LocationInput';
import Directions from './Directions';
import { formatTime } from './utils'

const ip = 'http://localhost:4200'

function App() {
  const [time, setTime] = useState(0)
  const [directions, setDirections] = useState([])

  async function navigate(from, to) {
    let data = await fetch(`${ip}/route/${from}/${to}`)
    data = await data.json()
    setTime(data.time)
    setDirections(data.description)
  }
  return (
    <div className="App">

      <LocationInput navigate={navigate}></LocationInput>

      <p>
        Estimated time: {formatTime(time)}
      </p>
      <Directions directions={directions} />

      <a
        className="App-link"
        href="https://www.cmu.edu/finance/property-space/floorplan-room/acad-admin/GHC/index.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        Gates Map
      </a>
      <img src={logo} className="App-logo" alt="logo" />
    </div>
  );
}

export default App;
