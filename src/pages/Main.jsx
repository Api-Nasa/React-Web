import React from 'react';
import { useReducer } from 'react';
import TextField from '@material-ui/core/TextField';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';


/* import { Link } from 'react-router-dom'; */
import '../styles/App.css';
import '../styles/main.css';
import atom from '../assets/gifs/atom.gif';
import astronauta from '../assets/images/astronauta.jpg';
/* import Cabecerainicio from '../components/Cabecerainicio'; */



const apikey = "kadmSLpXgRgSyk6BFuvcflgvpPTYq12zQ3uaou9t"
/* const heading = document.querySelector('#head'); */
/* heading.textContent = 'Astronomy Picture of the Day'; */
const dateBox = document.querySelector('#date');
/* const title = document.querySelector('.title'); */
/* const image = document.querySelector('img');
const contentBox = document.querySelector('.explain'); */
let fechaapi=""
let visited=[]
let dict={}
const Estadoinicial = {
  title: '',
  fecha: '',
  contentBox: '',
  imagesrc: '',
  hdimagesrc:'',
  videosrc:'',
  datebox: '',
  history:'',
  Data:'',
};



// APOD = Astronomy Picture of the Day
const APOD = async () => {
   
  
  const API =
    'https://api.nasa.gov/planetary/apod?api_key=' + apikey + '&date='+fechaapi+'&hd=true';
   
    try {
      const fetchData = await fetch(API);
      Estadoinicial.Data = await fetchData.json()
      Estadoinicial.title = Estadoinicial.Data.title
      Estadoinicial.imagesrc = Estadoinicial.Data.url
      Estadoinicial.hdimagesrc = Estadoinicial.Data.hdurl;
      Estadoinicial.explanation = Estadoinicial.Data.explanation
      
      const photo = document.getElementById('fotodeldia');
      /*  const miniatura = document.getElementById('miniatura'); */
      const video = document.getElementById('div-video');
      const titulo=document.querySelector('#head')
      
      
      
      titulo.innerHTML = Estadoinicial.title;
      photo.src = Estadoinicial.imagesrc; 
       const explanation = document.getElementById('explanation');
       explanation.innerHTML = Estadoinicial.Data.explanation;
     /*  miniatura.src = Estadoinicial.imagesrc;  */
      
      if (Estadoinicial.Data.media_type === 'video') {
        /* cargar contenido seguro en su sitio, simplemente elimine el protocolo del enlace */
        const urlreducida = Estadoinicial.imagesrc.replace('https:', '');
        video.style.display = 'block';
        photo.style.display = 'none';
        /*  miniatura.style.display ="none" */
        document.getElementById('video').src = urlreducida;
      }
      else{
        if (Estadoinicial.Data.media_type === 'image') {
      photo.style.display ="block"
      video.style.display ="none"
      const videoplay = document.getElementById('video');
      videoplay.src = ""
      if (! visited.includes(Estadoinicial.imagesrc)){
        visited.unshift(Estadoinicial.imagesrc);
        localStorage.setItem('historialvisitas', JSON.stringify(visited));
        dict[Estadoinicial.imagesrc]=fechaapi;
       localStorage.setItem('diccionario', JSON.stringify(dict));
       
       console.log(visited)
      }    
      
        }
        else {
           video.style.display ="none"
           video.src=""
           photo.style.display ="block"
         /*   miniatura.style.display ="block" */
           photo.src =astronauta
         /*   miniatura.src=astronauta */
           titulo.innerHTML = "Recurso no encontrado ";
           
        }
      }
      console.log(Estadoinicial.Data);
      if (visited.length >1){
      const history = document.getElementById('history');
       history.style.display ="block"
      } else {
        const history = document.getElementById('history');
       history.style.display ="none"
      }
      

        
        
        
    } catch (error) {
      console.log(error);
      const photo = document.getElementById('fotodeldia');
      const miniatura = document.getElementById('miniatura');
      const video = document.getElementById('video');
      const titulo = document.querySelector('#head');
     /*  video.style.display ="none" */
     /*  video.src="" */
      /* photo.style.display ="block"
      miniatura.style.display ="block"
      photo.src =astronauta
      miniatura.src=astronauta */
      /* titulo.innerHTML = "Recurso no encontrado "; */
        /* title.innerHTML = "No Internet"; */

    };
};





function reducer(state = Estadoinicial, action) {
  
switch (action.type) {
  case 'TODAYPHOTO': {
    fechaapi = new Date().toJSON().slice(0, 10);
    fechaapi = fechaapi.toString();
    APOD();

    return {
      ...state,
    };
  }
  case 'LOADPHOTO': {
    
    state.fecha = action.payload.id;
    fechaapi = state.fecha;
    fechaapi = fechaapi.toString();
    APOD();
    document.querySelector('#mensaje').click();

    return {
      ...state,
    };
  }
  case 'CLICKMINIATURA': {
    const photo = document.getElementById('fotodeldia');
    photo.src = action.payload.link;
    photo.imageSrc = action.payload.link;
    fechaapi = dict[action.payload.link];
    APOD();
    const explanation = document.getElementById('explanation');
    explanation.innerHTML = Estadoinicial.explanation;

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    return {
      ...state,
    };
  }
  case 'LIMPIARSTORAGE': {
    localStorage.removeItem('historialvisitas');
    document.querySelector('#history').click();
    visited = [];

    APOD();
    /*  const history = document.getElementById('#history');
    history.style.display = "none"  */

    return {
      ...state,
    };
  }
  case 'CLOSEEXPLANATION': {
    document.querySelector('#explanationbutton').click();
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    return {
      ...state,
    };
  }
  case 'HIGHTDEFINITION': {
    const photo = document.getElementById('fotodeldia');
    photo.src=Estadoinicial.hdimagesrc
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    return {
      ...state,
    };
  }
  case 'NASALINK': {
     window.open('https://www.nasa.gov/nasalive', '_blank');

    return {
      ...state,
    };
  }
  case 'ADECCOLINK': {
     window.open('https://fundacionadecco.org/', '_blank');

    return {
      ...state,
    };
  }
  case 'GALINK': {
     window.open('https://generalassemb.ly/', '_blank');

    return {
      ...state,
    };
  }
  default: {
    return { ...state };
  }
} 
}
comenzar()
  
  function comenzar(){
   fechaapi = new Date().toJSON().slice(0,10)
   fechaapi = fechaapi.toString()
  
     visited =JSON.parse(localStorage.getItem('historialvisitas'));
     dict=JSON.parse(localStorage.getItem('diccionario'));
   if (visited === null){
    visited=[]
     dict = {}
   
   }
  
   APOD();
  
  }
   
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }  

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
              Unofficial mirror of the NASA Astronomy Picture of the Day (APOD)
            </h1>
            <div className="botonera-cabecera">
              <button
                id="cambiar"
                type="button"
                className="btn btn-outline-info btn-sm boton-cabecera"
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
                className="btn btn-outline-info btn-sm boton-cabecera"
                type="button"
                id="mensaje"
                data-bs-toggle="collapse"
                data-bs-target="#collapseCalendar"
                aria-expanded="false"
                aria-controls="collapseCalendar"
              >
                Choose Resorce By Day
              </button>
            </div>
          </div>
        </div>

        {/* zona para opciones aside ------------------------------------------------------------- */}
        <div class="col-2  aside ">
          <div class="div-flex">
            <button
              className="btn btn-outline-secondary oculto history"
              type="button"
              id="history"
              data-bs-toggle="collapse"
              data-bs-target="#collapseHistory"
              data-toggle="modal"
              aria-expanded="false"
              aria-controls="collapseHistory"
            >
              Remove Image history
            </button>
            {state.history}
          </div>
          <div>
            {visited.map((url, index) => (
              <img
                key={index}
                className="miniatura"
                src={url}
                alt="miniatura foto Nasa"
                onClick={event =>
                  dispatch({
                    type: 'CLICKMINIATURA',
                    payload: { link: url, index: url },
                  })
                }
              />
            ))}
          </div>
        </div>

        {/* zona para contenido ------------------------------------------------------------------- */}
        <div id="contenido" class="col-10 contenido ">
          <div class="collapse marginbotton1rem" id="collapseCalendar">
            <div
              id="colapsecalendar"
              class="card card-body mensaje-gris-oscuro"
            >
              <div
                style={{
                  margin: 'auto',
                  display: 'block',
                  width: '50vw',
                }}
              >
                <h4>Cada día una foto, un video, o un juego</h4>
                <TextField
                  style={{ width: '30vw' }}
                  id="date"
                  className="datepicker"
                  label="Choose your day"
                  type="date"
                  value={state.fecha}
                  /*  defaultValue={state.Data.date} */
                  onInput={e =>
                    dispatch({
                      type: 'LOADPHOTO',
                      payload: { id: e.target.value },
                    })
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <button
                  type="button"
                  class="btn btn-secondary btn-lg boton-fecha"
                >
                  Aply Date
                </button>
              </div>
            </div>
          </div>
          <div class="collapse marginbotton1rem" id="collapseHistory">
            <div id="colapsehistory" class="card card-body mensaje-gris-oscuro">
              <button
                type="button"
                class="btn btn-secondary btn-sm"
                onClick={e =>
                  dispatch({
                    type: 'LIMPIARSTORAGE',
                    payload: { id: e.target.value },
                  })
                }
              >
                click to remove image history
              </button>
            </div>
          </div>
          <div class="collapse marginbotton1rem" id="collapseExplanation">
            <div
              id="colapseexplanation"
              class="card card-body mensaje-gris-oscuro"
            >
              <p id="explanation">{state.explanation}</p>
              <button
                type="button"
                class="btn btn-secondary btn-sm"
                onClick={e =>
                  dispatch({
                    type: 'CLOSEEXPLANATION',
                    payload: { id: e.target.value },
                  })
                }
              >
                Hide this Explanation Window
              </button>
            </div>
          </div>
          <h1
            id="head"
            onInput={event =>
              dispatch({ type: 'CARGARAPI', payload: { id: 'head' } })
            }
          >
            {state.Data.title}
          </h1>
          <button
            className="btn btn-outline-secondary button-in-collapse"
            type="button"
            id="explanationbutton"
            data-bs-toggle="collapse"
            data-bs-target="#collapseExplanation"
            data-toggle="modal"
            aria-expanded="false"
            aria-controls="collapseExplanation"
          >
            View /Hide Explanation for this Resource
          </button>
          <button
            type="button"
            id="hd"
            class="btn btn-outline-secondary button-in-collapse"
            onClick={e =>
              dispatch({
                type: 'HIGHTDEFINITION',
                payload: { id: e.target.value },
              })
            }
          >
            View Resource in Hight definition
          </button>
          <TransformWrapper
            defaultScale={1}
            defaultPositionX={1}
            defaultPositionY={1}
          >
            <TransformComponent>
              <img
                id="fotodeldia"
                className="imagen-flex "
                src={state.imagesrc}
                alt="foto del día"
              />
            </TransformComponent>
          </TransformWrapper>

          <div id="div-video" className="video-responsive">
            <iframe
              id="video"
              width="853"
              height="480"
              src={state.imagesrc}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </div>
          <div className="div-flex">
            <img
              src="https://res.cloudinary.com/dquxfl0fe/image/upload/v1657192729/API-GA/adecco_o0ddcs.png"
              className=" imagen-flex logo-click "
              alt="logo fundación Adecco"
              onClick={e =>
                dispatch({
                  type: 'ADECCOLINK',
                  payload: { id: e.target.value },
                })
              }
            />
            <img
              src="https://res.cloudinary.com/dquxfl0fe/image/upload/v1657192742/API-GA/ga_atwyd7.png"
              className=" imagen-flex logo-click "
              alt="logo General Assemby"
              onClick={e =>
                dispatch({
                  type: 'GALINK',
                  payload: { id: e.target.value },
                })
              }
            />
            <img
              src="https://res.cloudinary.com/dquxfl0fe/image/upload/v1657194000/API-GA/nasa-logo_w5ebmi.png"
              className=" imagen-flex nasa-logo"
              alt="logo Nasa"
              onClick={e =>
                dispatch({
                  type: 'NASALINK',
                  payload: { id: e.target.value },
                })
              }
            />
          </div>
          <h3>
            <center>
              " Demostrando talento senior gracias a la Fundación Adecco "
            </center>
          </h3>
          <h5>
            <center>Claudia Muñoz García | Eduardo Cabrera Blázquez</center>
          </h5>
          <div className="div-flex">
            <img
              src="https://res.cloudinary.com/dquxfl0fe/image/upload/v1657191232/API-GA/Fundacion-Adecco_nhqdiv.png"
              className=" imagen-flex imagenes-fondo "
              alt="fundación Adecco"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
