import logo from './logo.svg';
import './App.css';

function App() {
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

        <p>
          Starting Location:
        </p>

        <input type="text" id="myText1" value="Dog type in yo location">
        </input>

        <p>
          Destination:
        </p>

        <input type="text" id="myText2" value="Dog type in yo destination">
        </input>

        var time = 0:00
        <p>
        Estimated time: <time></time>
        </p>

        <img src={logo} className="App-logo" alt="logo" />
        
      </header>
      <body>

      </body>
    </div>
  );
}

export default App;
