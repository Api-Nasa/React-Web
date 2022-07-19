import React from 'react';
import { Link } from 'react-router-dom';
import { useReducer } from 'react';
import TextField from '@material-ui/core/TextField';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';


/* import { Link } from 'react-router-dom'; */
import '../styles/App.css';
import '../styles/main.css';
import atom from '../assets/gifs/atom.gif';

/* import Cabecerainicio from '../components/Cabecerainicio'; */

const apikey = 'kadmSLpXgRgSyk6BFuvcflgvpPTYq12zQ3uaou9t';
let fechaapi = '';
let visited = [];
let aleatorio=0
let dict = {};
let imagelist = [
  "2022-02-12",
  "2022-05-04",
  "2021-11-18",
  "2020-10-27",
  "2015-06-06",
  "2015-09-28",
  "2015-03-19",
  "2022-06-16",
  "2022-05-18",
  "2015-07-26",
  "2015-09-13",
  "2015-03-21",
  "2015-08-22",
  "2015-10-25",
  "2015-12-31",
  "2021-12-13",
  "2022-02-04",
  "2021-10-21",
  "2021-02-22",
  "2021-01-19",
  "2020-12-20",
  "2020-11-16",
  "2020-08-24",
  "2020-07-27",
  "2020-02-28",
  "2020-02-11",
  "2020-06-05",
  "2019-12-25",
  "2019-12-19",
  "2019-11-28",
  "2019-11-09",
  "2019-10-29",
  "2019-09-28",
  "2019-07-22",
  "2019-03-22",
  "2019-06-30",
  "2019-01-11",
  "2018-10-13",
  "2018-03-01",
  "2018-01-27",
  "2017-07-24",
  "2017-07-22",
  "2017-05-10",
  "2016-06-16",
  "2016-05-18",
  "2016-05-07",
  "2016-03-05",
  "2016-02-24",
  "2016-02-18",
  "2015-07-12",
  "2022-07-04",
  "2022-07-08",
  "2022-07-02",
  "2022-07-01",
  "2022-06-29",
  "2022-06-27",
  "2022-06-25",
  "2022-05-12",
  "2022-05-05",
  "2022-04-27",
  "2022-04-26",
  "2022-04-25",
  "2022-04-24",
  "2022-04-21",
  "2022-04-19",
  "2022-04-18",
  "2022-04-17",
  "2022-04-12",
  "2022-04-07",
  "2022-04-05",
  "2022-04-04",
  "2022-04-01",
  "2022-03-29",
  "2022-03-28",
  "2022-03-23",
  "2022-03-22",
  "2022-03-21",
  "2022-03-16",
  "2022-03-15",
  "2022-03-13",
  "2022-03-12",
  "2022-03-11",
  "2022-03-10",
  "2022-03-08",
  "2022-03-07",
  "2022-03-06",
  "2022-03-04",
  "2022-02-28",
  "2022-02-23",
  "2022-02-22",
  "2022-02-11",
  "2022-02-08",
  "2022-02-07",
  "2022-01-31",
  "2022-01-27",
  "2022-01-26",
  "2022-01-23",
  "2022-01-21",
  "2022-01-18",
  "2022-01-16",
  "2022-01-12",
  "2022-01-11",
  "2022-01-09",
  "2022-01-07",
  "2022-01-06",
  "2022-01-04",
  "2022-01-02",
  "2021-12-31",
  "2021-12-30",
  "2021-12-29",
  "2021-01-25",
  "2021-12-23",
  "2021-12-22",
  "2021-12-21",
  "2021-12-19",
  "2021-12-13",
  "2021-12-12",
  "2021-12-11",
  "2021-12-10",
  "2021-12-09",
  "2021-12-06",
  "2021-12-04",
  "2021-11-22",
  "2021-11-25",
  "2021-11-23",
  "2021-11-22",
  "2021-11-15",
  "2021-11-14",
  "2021-10-31",
  "2021-10-30",
  "2021-10-21",
  "2021-10-14",
  "2021-10-07",
  "2021-10-02",
  "2021-09-30",
  "2021-09-23",
  "2021-09-21",
  "2021-09-16",
  "2021-09-15",
  "2021-09-14",
  "2021-09-12",
  "2021-09-08",
  "2021-09-06",
  "2021-08-31",
  "2021-08-26",
  "2021-08-22",
  "2021-08-18",
  "2021-08-12",
  "2021-08-01",
  "2020-01-11",
  "2020-01-10",
  "2020-01-06",
  "2020-01-02",
  "2020-01-01",
  "2019-12-29",
  "2019-12-28",
  "2019-12-26",
  "2019-12-25",
  "2019-12-17",
  "2019-12-16",
  "2019-12-17",
  "2019-12-07",
  "2019-12-04",
  "2019-08-19",
  "2019-08-05",
  "2019-08-09",
  "2021-09 13",
  "2021-07-26",
  "2017-01-04",
  "2017-01-01",
  "2017-01-09",
  "2017-01-10",
  "2017-01-23",
  "2017-01-29",
  "2017-02-08",
  "2017-02-18",
  "2017-02-23",
  "2017-02-26",
  "2017-02-28",
  "2017-03-05",
  "2017-03-08",
  "2017-03-23",
  "2017-03-23",
  "2017-03-27",
  "2017-04-11",
  "2017-04-24",
  "2017-05-01",
  "2016-12-28",
  "2016-12-26",
  "2016-12-21",
  "2016-12-19",
  "2016-12-18",
  "2016-11-30",
  "2016-10-31",
  "2016-10-27",
  "2016-10-09",
  "2016-09-25",
  "2016-09-23",
  "2016-09-18",
  "2016-09-11",
  "2016-09-02",
  "2016-08-30",
  "2016-08-26",
  "2015-12-22",
  "2015-12-15",
  "2015-11-29",
  "2015-11-24",
  "2015-11-23",
  "2015-11-11",
  "2015-11-03",
  "2015-11-01",
];
let videolist = [
  "2021-01-11",
  "2015-10-28",
  "2015-12-25",
  "2018-06-12",
  "2021-10-26",
  "2020-06-15",
  "2020-02-23",
  "2020-04-04",
  "2020-03-03",
  "2019-10-21",
  "2018-04-29",
  "2018-03-12",
  "2016-06-28",
  "2022-05-09",
  "2022-03-30",
  "2022-02-09",
  "2022-02-01",
  "2022-01-10",
  "2021-12-28",
  "2021-11-30",
  "2021-10-26",
  "2021-10-11",
  "2021-10-10",
  "2021-09-28",
  "2021-09-22",
  "2021-09-05",
  "2021-08-25",
  "2021-07-14",
  "2019-09-03",
  "2019-07-17",
  "2017-01-16",
  "2017-02-01",
  "2017-02-21",
  "2017-04-17",
  "2016-11-05",
  "2016-09-26",
  "2016-09-21",
  "2015-10-28",
  "2015-12-02",
  "2015-11-09",
  "2015-11-02",
];

const Estadoinicial = {
  title: '',
  fecha: '',
  contentBox: '',
  imagesrc:'',
  hdimagesrc : '',
  videosrc: '//www.youtube.com/embed/86YLFOog4GM?autoplay=1&mute=1&enablejsapi=1',
  datebox: '',
  history: '',
  Data: '',
};

// APOD = Astronomy Picture of the Day
const APOD = async () => {
  const API =
    'https://api.nasa.gov/planetary/apod?api_key=' +
    apikey +
    '&date=' +
    fechaapi +
    '&hd=true';

  try {
    const fetchData = await fetch(API);
    Estadoinicial.Data = await fetchData.json();
    Estadoinicial.title = Estadoinicial.Data.title;
    Estadoinicial.imagesrc = Estadoinicial.Data.url;
    Estadoinicial.hdimagesrc = Estadoinicial.Data.hdurl;
    Estadoinicial.explanation = Estadoinicial.Data.explanation;

    const botoneselemento = document.getElementById('botones-elemento');
    botoneselemento.style.display="inline-block"
    const photo = document.getElementById('fotodeldia');
    const video = document.getElementById('div-video');
    const titulo = document.querySelector('#head');
    

    titulo.innerHTML = Estadoinicial.title;
    photo.src = Estadoinicial.imagesrc;
    const explanation = document.getElementById('explanation');
    explanation.innerHTML = Estadoinicial.Data.explanation;
    /*  miniatura.src = Estadoinicial.imagesrc;  */
     const deleteimage = document.getElementById('deleteimage');
     deleteimage.style.display="inline-block"
     const hd = document.getElementById('hd');
     hd.style.display="inline-block"
    const nextrandom = document.getElementById('nextrandom');
    nextrandom.style.display="inline-block"


    if (Estadoinicial.Data.media_type === 'video') {
      
      /* cargar contenido seguro en su sitio, simplemente elimine el protocolo del enlace */
      let urlreducida = Estadoinicial.imagesrc.replace('https:', '');
      /* prepara lo videos para reproducción automática */
      urlreducida = urlreducida + '?rel=0&amp;autoplay=1';
      deleteimage.style.display="none"
      hd.style.display="none"
      video.style.display = 'block';
      photo.style.display = 'none';
      const botoneselemento = document.getElementById('botones-elemento');
      botoneselemento.style.display="none"
      /*  miniatura.style.display ="none" */
      document.getElementById('video').src = urlreducida;
    } else {
      if (Estadoinicial.Data.media_type === 'image') {
        photo.style.display = 'block';
        video.style.display = 'none';
        deleteimage.style.display="inline-block"
        const videoplay = document.getElementById('video');
        videoplay.src = '';
        if (!visited.includes(Estadoinicial.imagesrc)) {
          visited.unshift(Estadoinicial.imagesrc);
          localStorage.setItem('historialvisitas', JSON.stringify(visited));
          dict[Estadoinicial.imagesrc] = fechaapi;
          localStorage.setItem('diccionario', JSON.stringify(dict));
          console.log(visited);
        }
      } else {
        video.style.display = 'none';
        video.src = '';
        photo.style.display = 'block';
        /*   miniatura.style.display ="block" */
        photo.src = "https://res.cloudinary.com/dquxfl0fe/image/upload/v1657344274/API-GA/astronauta_ulcwcc.jpg";
        /*   miniatura.src=astronauta */
        titulo.innerHTML = 'Recurso no encontrado ';
        const explanation = document.getElementById('explanation');
        explanation.innerHTML =
          'Nothing has been found. Remember that we have a selection of our favorite resources on the main menu.';
      }
    }
    console.log(Estadoinicial.Data);
    
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
  }
  if (visited.length > 1) {
    const history = document.getElementById('history');
    history.style.display = 'block';
  } else {
    const history = document.getElementById('history');
    history.style.display = 'none';
  }
};

function reducer(state = Estadoinicial, action) {
 
  switch (action.type) {
    case 'TODAYPHOTO': {
      fechaapi = new Date().toJSON().slice(0, 10);
      fechaapi = fechaapi.toString();
      const nextrandom = document.getElementById('nextrandom');
      nextrandom.style.display = 'none';
      const deleteimage = document.getElementById('deleteimage');
      deleteimage.style.display = 'none';
      APOD();
      return {
        ...state,
      };
    }
    case 'LOADPHOTO': {
      state.fecha = action.payload.id;
      fechaapi = state.fecha;
      fechaapi = fechaapi.toString();

      return {
        ...state,
      };
    }
    case 'CLICKMINIATURA': {
      const photo = document.getElementById('fotodeldia');
      const hd = document.getElementById('hd');
      hd.style.display="none"
      const nextrandom = document.getElementById('nextrandom');
      nextrandom.style.display="none"
      const deleteimage = document.getElementById('deleteimage');
      deleteimage.style.display="none"
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
    case 'NOTREMOVE': {
       document.querySelector('#history').click();
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
      photo.src = Estadoinicial.hdimagesrc;
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });

      return {
        ...state,
      };
    }
    case 'APPLYDATE': {
      document.querySelector('#mensaje').click();
       const videoplay = document.getElementById('video');
       videoplay.src = '';
       const nextrandom = document.getElementById('nextrandom');
       nextrandom.style.display = 'none';
       const deleteimage = document.getElementById('deleteimage');
       deleteimage.style.display = 'none';
      APOD();
      return {
        ...state,
      };
    }
    case 'FAVORITOS': {
      document.querySelector('#favoritos').click();
      aleatorio = Math.floor(Math.random() * imagelist.length);
      fechaapi = imagelist[aleatorio];
      const nextrandom = document.getElementById('nextrandom');
      nextrandom.style.display = 'none';
      const deleteimage = document.getElementById('deleteimage');
      deleteimage.style.display = 'none';
      APOD();
      return {
        ...state,
      };
    }
    case 'VIDEOFAVORITOS': {
      document.querySelector('#favoritos').click();
      aleatorio = Math.floor(Math.random() * videolist.length);
      fechaapi = videolist[aleatorio];
      APOD();
      
      return {
        ...state,
      };
    }
    case 'MENURANDOM': {
      document.querySelector('#favoritos').click();
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });

      return {
        ...state,
      };
    }

    case 'DELETEIMAGE': {
      delete dict[Estadoinicial.imagesrc];
      visited = visited.filter(item => item !== Estadoinicial.imagesrc);
      localStorage.setItem('historialvisitas', JSON.stringify(visited));
      const photo = document.getElementById('fotodeldia');
      photo.style.display = "none"
      const video = document.getElementById('video');
      const divvideo = document.getElementById('div-video');
      divvideo.style.display = "block"
      video.src =
        '//www.youtube.com/embed/86YLFOog4GM?autoplay=1&mute=1&enablejsapi=1';
      const botoneselemento = document.getElementById('botones-elemento');
      botoneselemento.style.display="none"
      const explanation = document.getElementById('explanation');
      explanation.innerHTML =
        'The image has been removed. Remember that we have a selection of our favorite resources on the main menu';
      const head = document.getElementById('head');
      head.innerHTML = 'Image has been successfully removed';
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
    case 'SUBIRSCROLL': {
      window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });


      return {
        ...state,
      };
    }
    default: {
      return { ...state };
    }
  }
}
comenzar();
document.addEventListener('readystatechange', event => {
  // When HTML/DOM elements are ready:
  if (event.target.readyState === 'interactive') {
    //does same as:  ..addEventListener("DOMContentLoaded"..
    console.log("ok")
  }

  // When window loaded ( external resources are loaded too- `css`,`src`, etc...)
  if (event.target.readyState === 'complete') {
    console.log('ok');
    Estadoinicial.imagesrc= '//www.youtube.com/embed/86YLFOog4GM?autoplay=1&mute=1&enablejsapi=1'

    
    
     
  }
});

function comenzar() {
  fechaapi = new Date().toJSON().slice(0, 10);
  fechaapi = fechaapi.toString();

  visited = JSON.parse(localStorage.getItem('historialvisitas'));
  dict = JSON.parse(localStorage.getItem('diccionario'));
  if (visited === null) {
    visited = [];
    dict = {};
  }
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });

}



export default function Main() {
  const [state, dispatch] = useReducer(reducer, Estadoinicial);
  
   Estadoinicial.title=" International Space Station [ISS] LIVE"
  return (
    <div class="container-fluid todo animate__animated animate__fadeIn">
      <div class="row">
        {/* zona para titulos y botones -----------------------------------------------------------*/}
        <div className="col-12 col-titulo ">
          <div className="cabecera">
            <img src={atom} className=" logo-speq " alt="gif atom" />
            <h1 className="titulo-landing titulo-cabecera">
              Unofficial mirror of the NASA Astronomy Picture of the Day (APOD)
            </h1>
            <div>
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

        {/* zona para opciones aside ------------------------------------------------------------- */}
        <div class="col-2  aside ">
          <div class="div-flex">
            <Link to="/Meteors">
              <button type="button" class="btn btn-primary button-meteors ">
                Go to Meteorite Map
              </button>
            </Link>
          </div>
          <div class="div-flex">
            <Link to="/Iss">
              <button type="button" class="btn btn-primary button-meteors ">
                Go to Map ISS Location
              </button>
            </Link>
          </div>
          <div class="div-flex">
            <button
              className="btn btn-outline-secondary history oculto"
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
          </div>
          <div>
            {visited.map((url, index) => (
              <img
                key={index}
                className="miniatura "
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
            <div class="card card-body mensaje-gris-oscuro animate__animated animate__fadeIn">
              <div
                style={{
                  margin: 'auto',
                  display: 'block',
                  width: '50vw',
                }}
              >
                <h4>Every day a photo, a video, or a game</h4>
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
                  class="btn btn-secondary btn-lg boton-fecha button-apply"
                  onClick={e =>
                    dispatch({
                      type: 'APPLYDATE',
                      payload: { id: e.target.value },
                    })
                  }
                >
                  Apply Date / Close
                </button>
              </div>
            </div>
          </div>
          <div class="collapse marginbotton1rem" id="collapseHistory">
            <div class="card card-body mensaje-gris-oscuro">
              <p class="animate__animated animate__fadeIn">
                El historial de su navegación en esta página se almacena
                exclusivamente en el Caché de su navegador. Usted puede remover
                ese registro en cualquier momento. Así mismo un par:
                clave/Valor, es el encargado de mostrarle de nuevo cualquiera de
                las imagenes que usted vaya conservando. Se ha traducido este
                texto para empatizar con la comunidad hispanohablante que ha
                crecido un 70 % en los últimos 30 años. 591 millones de personas
                en todo el mundo hablan español, según el último anuario del
                Instituto Cervantes. (14 de Octubre 2021){' '}
              </p>
              <p class="animate__animated animate__fadeIn white">
                Your browsing history on this site is stored exclusively in your
                browser's storage. You can remove this record at any time. Also
                a pair: key/value, is in charge of showing you again any of the
                images that you keep.{' '}
              </p>

              <div className="div-flex">
                <button
                  type="button"
                  class="btn btn-danger btn-sm fit-button animate__animated animate__heartBeat"
                  onClick={e =>
                    dispatch({
                      type: 'LIMPIARSTORAGE',
                      payload: { id: e.target.value },
                    })
                  }
                >
                  click to remove image history
                </button>
                <button
                  type="button"
                  class="btn btn-secondary btn-sm fit-button "
                  onClick={e =>
                    dispatch({
                      type: 'NOTREMOVE',
                      payload: { id: e.target.value },
                    })
                  }
                >
                  Don't remove yet
                </button>
              </div>
            </div>
          </div>
          <div class="collapse marginbotton1rem " id="collapsefavoritos">
            <div
              id="colapsefavoritos"
              class="card card-body mensaje-gris-oscuro collapse-mobile"
            >
              <p className="animate__animated animate__fadeIn center">
                We have selected the images and videos that we we liked the
                most. We hope you like them.{' '}
              </p>
              <div className="cabecera">
                <button
                  type="button"
                  class="btn btn-secondary btn-sm fit-button"
                  onClick={e =>
                    dispatch({
                      type: 'FAVORITOS',
                      payload: { id: e.target.value },
                    })
                  }
                >
                  click to view the best image (Random)
                </button>

                <button
                  type="button"
                  class="btn btn-secondary btn-sm fit-button"
                  onClick={e =>
                    dispatch({
                      type: 'VIDEOFAVORITOS',
                      payload: { id: e.target.value },
                    })
                  }
                >
                  click to view the best Video (Random)
                </button>
              </div>
              <div className="div-flex">
                <button
                  type="button"
                  class="close btn btn-outline-secondary btn-sm fit-button"
                  data-dismiss="alert"
                  aria-label="Close"
                  onClick={e =>
                    dispatch({
                      type: 'MENURANDOM',
                      payload: { id: e.target.value },
                    })
                  }
                >
                  Close this Window
                </button>
              </div>
            </div>
          </div>
          <div class="collapse marginbotton1rem" id="collapseExplanation">
            <div
              id="colapseexplanation"
              class="card card-body mensaje-gris-oscuro"
            >
              <p id="explanation">{state.explanation}</p>
              <p id="dateresourse">Resourse Date: {fechaapi}</p>
              <button
                type="button"
                class="btn btn-secondary btn-sm fit-button"
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
            className="title"
            onInput={event =>
              dispatch({ type: 'CARGARAPI', payload: { id: 'head' } })
            }
          >
            {Estadoinicial.title}
          </h1>
          <div id="botones-elemento" className="botones-elemento">
            <button
              className="btn btn-outline-secondary button-in-collapse animate__animated animate__slideInRight"
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
              class="btn btn-outline-secondary button-in-collapse animate__animated animate__slideInRight"
              onClick={e =>
                dispatch({
                  type: 'HIGHTDEFINITION',
                  payload: { id: e.target.value },
                })
              }
            >
              View Resource in HD
            </button>
            <button
              type="button"
              id="deleteimage"
              class="btn btn-outline-danger button-in-collapse animate__animated animate__slideInRight"
              onClick={e =>
                dispatch({
                  type: 'DELETEIMAGE',
                  payload: { id: e.target.value },
                })
              }
            >
              Delete this image from history
            </button>
            <button
              type="button"
              id="nextrandom"
              class="btn btn-outline-info button-in-collapse animate__animated animate__slideInRight "
              onClick={e =>
                dispatch({
                  type: 'MENURANDOM',
                  payload: { id: e.target.value },
                })
              }
            >
              Random Menu
            </button>
          </div>
          <TransformWrapper
            Scale={1}
            defaultScale={1}
            defaultPositionX={1}
            defaultPositionY={1}
          >
            <TransformComponent>
              <img
                id="fotodeldia"
                className="imagen-flex oculto "
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
              loading="lazy"
              src={state.videosrc}
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
          <div class="div-flex">
            <Link to="/Meteors">
              <button
                type="button"
                class="btn btn-primary button-meteors map-oculto"
              >
                Go to Meteorite Map
              </button>
            </Link>
          </div>
          <div class="div-flex">
            <Link to="/Iss">
              <button
                type="button"
                class="btn btn-primary button-meteors map-oculto"
              >
                Go to Map ISS Location
              </button>
            </Link>
          </div>
          <div class="div-flex">
            <button
              className="btn btn-outline-secondary history history-oculto"
              type="button"
              id="history-movil"
              data-bs-toggle="collapse"
              data-bs-target="#collapseHistory"
              data-toggle="modal"
              aria-expanded="false"
              aria-controls="collapseHistory"
              onClick={event =>
                dispatch({
                  type: 'SUBIRSCROLL',
                })
              }
            >
              Remove Image history
            </button>
          </div>
          <div className="listado-oculto">
            <center>Tu Historial visitado</center>
            <hr></hr>
            {visited.map((url, index) => (
              <img
                key={index}
                className="miniatura "
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
      </div>
    </div>
  );
}
