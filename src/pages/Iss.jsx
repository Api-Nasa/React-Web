import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';
import atom from '../assets/gifs/atom.gif';
export default function Meteors() {
  return (
    <div className="App animate__animated animate__zoomIn">
      <header className="App-header">
        <Link to="/MapsEstacionIss">
          <button type="button" className="btn btn-primary iss-btn ">
            Get started for discover
          </button>
        </Link>
        <img src="https://i.gifer.com/ONml.gif" alt="Asteriode" />
        <div class="titulo-iss animate__animated animate__zoomIn ">
          <img src={atom} className="App-logo logo-peq " alt="gif atom" />
          <p className="titulo-landing ">
            Discover the real-time location of the international space station{' '}
          </p>
        </div>
      </header>
    </div>
  );
}
