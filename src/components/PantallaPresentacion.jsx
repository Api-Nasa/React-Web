/* COMPONENTE para todas las PANTALLAS DE PRESENTACION */
/* ----------------------------------------- */
/* Importaciones necesarias */
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css'; /* pequeñas modificaciones de estilo al original de create react-app */
import atom from '../assets/gifs/atom.gif'; /* importacion local de gif de un Atomo (Guiño a React y Nasa) */

export default function PantallaPresentacion( props) {
  return (
    <div className="App animate__animated animate__fadeIn">
      {/* uso animacion animate.js */}
      <header className="App-header">
        <Link to={props.data.link}>
          <button type="button" className="btn btn-primary api-btn ">
            Get started for discover
          </button>
        </Link>
        {/* carga  gif animado */}
        <img className="App-Logo"
          src={props.data.urlIcono}
          alt={props.data.altIcono}
        />
        <div className="titulo animate__animated animate__zoomIn ">
          <img src={atom} className="App-logo logo-peq " alt="gif atom" />
          {/* gif de un Atomo (Guiño a React y Nasa) */}
          <p className="titulo-landing ">{props.data.tituloPresentacion} </p>
        </div>
      </header>
    </div>
  );
}
