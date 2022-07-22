import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';
import atom from '../assets/gifs/atom.gif';
import asteroid from '../assets/gifs/asteroid.gif';

export default function Meteors() {
  return (
    <div className="App animate__animated animate__zoomIn">
      <header className="App-header">
        <Link to="/MapsMeteors">
          <button type="button" className='btn btn-primary api-btn '>
            Get started for discover
          </button>
        </Link>
        <img src={asteroid} className="App-logo  " alt="gif asteroid" />
        <div className="titulo animate__animated animate__zoomIn ">
          <img src={atom} className="App-logo logo-peq " alt="gif atom" />
          <p className="titulo-landing ">
            Discover the known locations where meteorites have fallen{' '}
          </p>
        </div>
      </header>
    </div>
  );
}
