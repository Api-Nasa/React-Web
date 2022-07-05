import React from 'react';
import { useReducer } from 'react';
import TextField from '@material-ui/core/TextField';



/* import { Link } from 'react-router-dom'; */
import '../styles/App.css';
import '../styles/main.css';
import atom from '../assets/gifs/atom.gif';
/* import Cabecerainicio from '../components/Cabecerainicio'; */



const apikey = "kadmSLpXgRgSyk6BFuvcflgvpPTYq12zQ3uaou9t"
/* const heading = document.querySelector('#head'); */
/* heading.textContent = 'Astronomy Picture of the Day'; */
const dateBox = document.querySelector('#date');
/* const title = document.querySelector('.title'); */
/* const image = document.querySelector('img');
const contentBox = document.querySelector('.explain'); */
let fechaapi=""
const Estadoinicial = {
  title: '',
  fecha: '',
  contentBox: '',
  imagesrc: '',
  datebox: '',
  Data:'',
};

// APOD = Astronomy Picture of the Day
const APOD = async () => {

    const API = "https://api.nasa.gov/planetary/apod?api_key="+apikey
    try {
      const fetchData = await fetch(API);
      Estadoinicial.Data = await fetchData.json()
      Estadoinicial.title = Estadoinicial.Data.title
      Estadoinicial.fecha = Estadoinicial.Data.date
      Estadoinicial.imagesrc = Estadoinicial.Data.url
     /* document.querySelector('#head').innerHTML = Estadoinicial.title;  */
     /*   document.getElementById("fotodeldia").src = Estadoinicial.Data.url;  */
     /*   document.getElementById("miniatura").src = Estadoinicial.Data.url;  */ 
      console.log(Estadoinicial.Data);  
            
        
        
    } catch (error) {
        console.log(error);
        /* title.innerHTML = "No Internet"; */
       

    };
};

// APOD = Astronomy Picture of the Day
const APOD2 = async () => {
   
  
  const API =
    'https://api.nasa.gov/planetary/apod?api_key=' + apikey + '&date='+fechaapi+'&hd=true';
   
    try {
        const fetchData = await fetch(API);
      Estadoinicial.Data = await fetchData.json()
      Estadoinicial.title = Estadoinicial.Data.title
      Estadoinicial.imagesrc = Estadoinicial.Data.url
      document.querySelector('#head').innerHTML = Estadoinicial.title;
      document.getElementById("fotodeldia").src = Estadoinicial.imagesrc; 
      document.getElementById("miniatura").src = Estadoinicial.imagesrc; 
      console.log(Estadoinicial.Data);

        
        
        
    } catch (error) {
        console.log(error);
        /* title.innerHTML = "No Internet"; */

    };
};





function reducer(state = Estadoinicial, action) {
  
switch (action.type) {
  case 'TODAYPHOTO': {
    fechaapi = new Date().toJSON().slice(0,10)
    fechaapi = fechaapi.toString()
    APOD2()
   
    
    return {
      ...state,
    };
  }
  case 'LOADPHOTO': {
    /* alert(action.payload.id) */
    state.fecha = action.payload.id
    fechaapi =state.fecha
    fechaapi = fechaapi.toString()
    

    APOD2()
     
    document.querySelector('#mensaje').click();

    return {
      ...state,
    };
  }
  default: {
    return { ...state };
  }
} 
}
   APOD();
   

export default function Main() {

  const [state, dispatch] = useReducer(reducer, Estadoinicial);
  return (
    <div class="container-fluid todo animate__animated animate__zoomIn">
      <div class="row">
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
                onClick={(event) =>
                  dispatch({
                    type: 'TODAYPHOTO',
                    payload: { id: 'cambiar' },
                  })
                }
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

        {/* zona para opciones aside ------------------------------------------------------------- */}
        <div class="col-2  aside">
          Image history
          <img
            id="miniatura"
            className="imagen-borrar"
            src={state.imagesrc}
            alt="sdd"
          />
        </div>

        {/* zona para contenido ------------------------------------------------------------------- */}
        <div class="col-10 contenido ">
          <div class="collapse marginbotton1rem" id="collapseExample">
            <div id="texto" class="card card-body mensaje-gris-oscuro">
              
              <div
                style={{
                  margin: 'auto',
                  display: 'block',
                  width: '50vw',
                }}
              >
                <h3>Cada día una foto, un video, o un juego</h3>
                <TextField
                  style={{ width: '30vw' }}
                  id="date"
                  className="datepicker"
                  label="Choose your day"
                  type="date"
                  value={state.fecha}
                  /*  defaultValue={state.Data.date} */
                  onInput={(e) =>
                    dispatch({
                      type: 'LOADPHOTO',
                      payload: { id: e.target.value },
                    })
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
            </div>
          </div>
          <h1
            id="head"
            onInput={(event) =>
              dispatch({ type: 'CARGARAPI', payload: { id: 'head' } })
            }
          >
            {state.Data.title}
          </h1>

          <h2 id="date"> {dateBox}</h2>

          <img
            id="fotodeldia"
            className="imagen-flex"
            src={state.imagesrc}
            alt="space"
          />
          <div className="div-flex"></div>
        </div>
      </div>
    </div>
  );
}
