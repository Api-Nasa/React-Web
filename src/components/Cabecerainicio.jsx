import React from 'react';
/* import { useReducer } from 'react'; */
import atom from '../assets/gifs/atom.gif';







export default function Cabecerainicio() {
 
  return (
    <>
      {/* zona para titulos y botones -----------------------------------------------------------*/}
      <div className="col-12 col-titulo ">
        <div className="cabecera">
          <img src={atom} className=" logo-speq " alt="gif atom" />
          <h1 className="titulo-landing titulo-cabecera">
            React project to interact with Nasa APIs data
          </h1>
          <div className="botonera-cabecera">
            <button
              id="cambiar"
              type="button"
              className="btn btn-outline-info btn-sm boton-cabecera"
             /*  onClick={(event) =>
                dispatch({
                  type: 'TODAYPHOTO',
                  payload: { id: 'cambiar' },
                })
              } */
            >
              Today's photo{' '}
            </button>

            <button
              className="btn btn-outline-info btn-sm boton-cabecera"
              type="button"
              id="mensaje"
              data-bs-toggle="collapse"
              data-bs-target="#collapseExample"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              Choose Photo By Day
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
