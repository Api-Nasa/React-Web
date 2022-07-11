import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';
import atom from '../assets/gifs/atom.gif';

export default function Bienvenida() {
  return (
    <div className="App animate__animated animate__fadeIn">
      <header className="App-header">
        <Link to="/Main">
          <button type="button" className="btn btn-primary api-btn ">
            Get started for discover
          </button>
        </Link>
        <img src="https://res.cloudinary.com/dquxfl0fe/image/upload/v1657439542/API-GA/cool-bueno_h6o002.gif"  alt="gif asteroid" />
        <div className="titulo animate__animated animate__zoomIn ">
          <img src={atom} className="App-logo logo-peq " alt="gif atom" />
          <p className="titulo-landing ">
            React project to interact with Nasa APIs data{' '}
          </p>
        </div>
      </header>
    </div>
  );
}
