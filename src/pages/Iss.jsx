/* URL PRESENTACION UBICACION ESTACION INTERNACIONAL */
/* ------------------------------------------------- */
/* importaciones necesarias */
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css'; /* pequeñas modificaciones de estilo al original de create react-app */
/* importacion local de gif de un Atomo (Guiño a React y Nasa) */
import atom from '../assets/gifs/atom.gif'; 


export default function Iss() {
  return (
     /* uso de clases animate.js to zoom-in page*/
    <div className="App animate__animated animate__zoomIn">
      <header className="App-header">

        {/* BOTON PARA LINK TO Page localizacion ISS */}
        <Link to="/MapsEstacionIss">
          <button type="button" className="btn btn-primary iss-btn ">
            Get started for discover
          </button>
        </Link>

        <img src="https://i.gifer.com/ONml.gif" alt="Asteriode" />

        {/* uso de clases animate.js (Zoom-in Imagen Asteroide*/}
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
