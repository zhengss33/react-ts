import React from 'react';
import logo from './logo.svg';
import MouseTracker from './components/MouseTracker';
import useMousePosition from './hook/useMousePosition';
import useUrlLoader from './hook/useUrlLoader'
import './App.css';

interface IShowResult {
  message: string,
  status: string
}

function App() {
  const positions = useMousePosition();
  const [data, loading] = useUrlLoader('https://dog.ceo/api/breeds/image/random')
  const dogResult = data as IShowResult;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        <p>X: {positions.x}, Y: {positions.y}</p>
        { loading ? <p>🐶读取中...</p> : <img src={dogResult && dogResult.message}></img>}
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
