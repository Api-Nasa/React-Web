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
            Proyecto React.js para consumo de Api-Nasa
          </h1>
          <div className="botonera-cabecera">
            <button
              id="cambiar"
              type="button"
              className="btn btn-outline-info btn-sm boton-cabecera"
             /*  onClick={(event) =>
                dispatch({ type: 'CAMBIARNOMBRE', payload: { id: 'cambiar' } })
              } */
            >
              Boton sin definir{' '}
            </button>
            <button
            id="cargar"
              type="button"
              className="btn btn-outline-info btn-sm boton-cabecera"
             /*  onClick={(event) =>
                dispatch({ type: 'CARGARAPI', payload: { id: 'cargar' } })
              } */
            >
              Prueba para Hook Reducer
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
              muestra un mensaje en contenido
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
