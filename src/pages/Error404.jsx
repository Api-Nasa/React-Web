import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';
import atom from '../assets/gifs/atom.gif';
export default function Error404() {
  return (
    <div className="App animate__animated animate__zoomIn">
      <header className="App-header">
        <Link to="/Main">
          <button type="button" class="btn btn-primary  ">
            Get started for discover
          </button>
        </Link>
        <img
          src="https://i.gifer.com/DKgy.gif"
          alt="gif cubo"
        />
        <div class="animate__animated animate__zoomIn ">
          <img src={atom} className="App-logo logo-peq " alt="gif atom" />
          <p className="titulo-landing ">
            Esta Url no existe o no está disponible{' '}
          </p>
        </div>
      </header>
    </div>
  );
}
