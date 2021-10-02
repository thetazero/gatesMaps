import logo from './logo.svg';
import './App.css';

import LocationInput from './LocationInput';


function App() {
  let time = 0

  function navigate(from, to) {
    alert(from, to)
    time=3
  }
  return (
    <div className="App">
      <header className="App-header">

        <a
          className="App-link"
          href="https://www.cmu.edu/finance/property-space/floorplan-room/acad-admin/GHC/index.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Gates Map
        </a>

        <LocationInput navigate={navigate}></LocationInput>

        <p>
          Estimated time: {time}
        </p>

        <img src={logo} className="App-logo" alt="logo" />

      </header>
    </div>
  );
}

export default App;
