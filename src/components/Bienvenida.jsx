/* PRIMER COMPONENTE Y BIENVENIDA APLICACIÓN */
/* ----------------------------------------- */
/* Importaciones necesarias */
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css'; /* pequeñas modificaciones de estilo al original de create react-app */
import atom from '../assets/gifs/atom.gif';/* importacion local de gif de un Atomo (Guiño a React y Nasa) */

export default function Bienvenida() {
  return (
    <div className="App animate__animated animate__fadeIn">
      {/* uso animacion animate.js */}
      <header className="App-header">
        <Link to="/Main">
          <button type="button" className="btn btn-primary api-btn ">
            Get started for discover
          </button>
        </Link>
        {/* carga desde nuestro CDN Cloudinay de gif Tierra Girando */}
        <img
          src="https://res.cloudinary.com/dquxfl0fe/image/upload/v1657439542/API-GA/cool-bueno_h6o002.gif"
          alt="Earth"
        />
        <div className="titulo animate__animated animate__zoomIn ">
          <img src={atom} className="App-logo logo-peq " alt="gif atom" />
          {/* gif de un Atomo (Guiño a React y Nasa) */}
          <p className="titulo-landing ">
            React project to interact with Nasa APIs data{' '}
          </p>
        </div>
      </header>
    </div>
  );
}
