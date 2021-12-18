import logo from './logo.svg';
import './App.css';

useEffect(() => {
  async function start() {
    const wasm = await import('@emurgo/cardano-serialization-lib-browser');
  }
  start();
}, []);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          Testing import success. WOOO.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
