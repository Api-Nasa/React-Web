import React from 'react';
/* import { useReducer } from 'react'; */
import atom from '../assets/gifs/atom.gif';







export default function Cabecerainicio(Estadoinicial) {
 
  return (
    <>
      {/* zona para titulos y botones -----------------------------------------------------------*/}
      {/* zona para titulos y botones -----------------------------------------------------------*/}
      <div className="col-12 col-titulo ">
        <div className="cabecera">
          <img src={atom} className=" logo-speq " alt="gif atom" />
          <h1 className="titulo-landing titulo-cabecera">
            Unofficial mirror of the NASA Astronomy Picture of the Day (APOD)
          </h1>
          <div className="botonera-cabecera">
            <button
              id="cambiar"
              type="button"
              className="btn btn-outline-info btn-sm boton-cabecera animate__animated animate__zoomIn"
              onClick={event =>
                dispatch({
                  type: 'TODAYPHOTO',
                  payload: { id: 'cambiar' },
                })
              }
            >
              Today's photo OR Video{' '}
            </button>

            <button
              className="btn btn-outline-info btn-sm boton-cabecera animate__animated animate__zoomIn"
              type="button"
              id="mensaje"
              data-bs-toggle="collapse"
              data-bs-target="#collapseCalendar"
              aria-expanded="false"
              aria-controls="collapseCalendar"
            >
              Choose Resorce By Day
            </button>
            <button
              id="favoritos"
              type="button"
              className="btn btn-outline-info btn-sm boton-cabecera animate__animated animate__zoomIn"
              data-bs-toggle="collapse"
              data-bs-target="#collapsefavoritos"
              aria-expanded="false"
              aria-controls="collapsefavoritos"
            >
              Our fovourites Resorces{' '}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
