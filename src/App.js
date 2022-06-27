import logo from '../src/cool.gif';
import atom from '../src/atom.gif';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div class="titulo">
          <img src={atom} className="App-logo logo-peq" alt="logo" />
         
          <h1 className="titulo-landing">React.js Api-Nasa Web proyect. </h1>
        </div>

        <img src={logo} className="App-logo" alt="logo" />

        <button type="button" class="btn btn-primary edu ">
          Get started for discover{' '}
        </button>
      </header>
    </div>
  );
}

export default App;
