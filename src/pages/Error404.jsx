/* URL DONDE SE REDIRIGEN DESTINOS NO CONTEMPLADOS */
/* ---------------------------------------------- */
/* importaciones necesarias */
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css'; /* pequeñas modificaciones de estilo al original de create react-app */
import atom from '../assets/gifs/atom.gif'; /* importacion local de gif de un Atomo (Guiño a React y Nasa) */


export default function Error404() {
  return (
    <div className="App animate__animated animate__zoomIn"> {/* uso de clases animate.js */}
      <header className="App-header">

        {/* BOTON PARA LINK TO MAIN */}
        <Link to="/Main">
          <button type="button" class="btn btn-primary  ">
            Get started for discover
          </button>
        </Link>
        
        <img
          src="https://i.gifer.com/DKgy.gif"
          alt="gif cubo"
        />
        <div class="animate__animated animate__zoomIn "> {/* uso de clases animate.js */}
          {/* gif de un Atomo (Guiño a React y Nasa) */}
          <img src={atom} className="App-logo logo-peq " alt="gif atom" />
          <p className="titulo-landing ">
            Esta Url no existe o no está disponible{' '}
          </p>
        </div>
      </header>
    </div>
  );
}
