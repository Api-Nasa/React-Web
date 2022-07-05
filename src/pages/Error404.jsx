import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import '../styles/App.css';
import asteroid from '../assets/gifs/asteroid.gif';
import atom from '../assets/gifs/atom.gif';
export default function Error404() {
  return (
    <div className="App animate__animated animate__zoomIn">
      <header className="App-header">
        <Link to="/Main">
          <button type="button" class="btn btn-primary api-btn ">
            Get started for discover
          </button>
        </Link>
        <img src={asteroid} className="App-logo  " alt="gif asteroid" />
        <div class="titulo animate__animated animate__zoomIn ">
          <img src={atom} className="App-logo logo-peq " alt="gif atom" />
          <p className="titulo-landing ">
            Esta Url no existe o no está disponible{' '}
          </p>
        </div>
      </header>
    </div>
  );
}
