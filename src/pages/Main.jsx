/* URL principal de APOD ( Astronomy Picture of the Day) */
/* ----------------------------------------------------- */
/* importaciones necesarias */
import React from 'react';
import { Link } from 'react-router-dom';
import { useReducer } from 'react';
import { useRef, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
/* LAS SIGUIENTES IMPORTACIONES SE USAN PARA HACER ZOOM EN IMAGENES */
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
/* importación de firebase-google */
import firebase from 'firebase/compat/app';
import {getFirestore,collection,getDocs,doc,updateDoc,setDoc} from 'firebase/firestore';
// importación para graficos
import { Line } from 'react-chartjs-2';
import{Chart as ChartJs, Title, Tooltip, LineElement, Legend, CategoryScale,LinearScale,PointElement,Filler} from 'chart.js'
// importaciones para Tooltips
import jBox from 'jbox';
import 'jbox/dist/jBox.all.css';
/* IMPORTACIONES DE ESTILOS CSS */
import '../styles/App.css';  /* pequeñas modificaciones de estilo al original de create react-app */
import '../styles/main.css'; /* ESTILOS PRINCIPALES PROYECTO */

/* importacion local de gif de un Atomo (Guiño a React y Nasa) */
import atom from '../assets/gifs/atom.gif';


/* API kEY NASA-APOD */
const apikey = 'your api key';

// chart register
ChartJs.register(
  Title,Tooltip,LineElement,Legend,CategoryScale,LinearScale,PointElement,Filler
)

/* VARIABLE GLOBALES USADAS */
let fechaapi = '';
let visited = [];
let aleatorio = 0;
let dict = {};
let imagelist = [];
let videolist = [];
let visitasLabels = [];
let visitasData = [];
let dia = new Date().toISOString().slice(0, 10);




  //configuracion firebase
const config = {
  //your proyect config
};


const app = firebase.initializeApp(config);
const db = getFirestore(app);

// bajamos el objeto json (data-firebase-firestore con lista de fechas de favoritos)
async function getListaFavoritos(db) {
  const FavoritosCol = collection(db, 'listareact');
  const usersSnapshot = await getDocs(FavoritosCol);
  const usersList = usersSnapshot.docs.map(doc => doc.data());
  for (let i in usersList) {
    if (usersList[i].tipo === "image") {
      imagelist.push(usersList[i].fecha);
    } else {
      videolist.push(usersList[i].fecha);
    }
  }
};
  
  // bajamos el objeto json (data-firebase con lista de visitas acumuladas)
  async function getListaVisitas(db) {
    const VisitasCol = collection(db, 'visitasNasa');
    const usersSnapshot = await getDocs(VisitasCol);
    const Visitas = usersSnapshot.docs.map(doc => doc.data());
    Visitas.sort((a, b) => {
      if (a.fecha < b.fecha) {
        return -1;
      } else if (a.fecha > b.fecha) {
        return 1;
      } else {
        return 0;
      }
    });

    for (let i in Visitas) {
      if (Visitas[i].fecha === dia) {
        Visitas[i].visitas += 1;
        const myRef = doc(db, 'visitasNasa', dia);
        // aumenta numero visitas
        await updateDoc(myRef, {
          visitas: Visitas[i].visitas,
        });
      }
      visitasLabels.push(Visitas[i].fecha);
      visitasData.push(Visitas[i].visitas);
    }

    console.log('lista de firebase', visitasData);
    if (!visitasLabels.includes(dia)){
      // Add a new document in collection "visitasNasa"
      await setDoc(doc(db, "visitasNasa", dia), {
        fecha: dia,
        visitas: 1,
      });
      visitasLabels.push(dia);
      visitasData.push(1);
    }; 
}
  
  getListaFavoritos(db);
  getListaVisitas(db);
  
  // variables usadas (Estado inicial)
  const Estadoinicial = {
    title: '',
    fecha: '',
    contentBox: '',
    imagesrc: '',
    hdimagesrc: '',
    /* LIVE ESTACION INTERNACIONAL VIDEO */
    videosrc:
      '//www.youtube.com/embed/86YLFOog4GM?autoplay=1&mute=1&enablejsapi=1',
    datebox: '',
    history: '',
    Data: '',
    dataChart: {
      labels: visitasLabels,
      datasets: [
        {
          label: 'Visitas-por-fecha',
          data: visitasData,
          backgroundColor: 'yellow',
          borderColor: 'yellow',
          borderWidth: 2,
          tension: 0.4,
          /*  fill: true, */
          pointStyle: 'circle',
          pointBorderColor: 'red',
          pointBackgroundColor: 'white',
          pointBorderWidth: 5,
          showLine: true,
          gridLinesColor: 'blue',
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };


  // APOD = FUNCION FECH API Y TOMA DE DATOS Astronomy Picture of the Day
  const APOD = async () => {
    const API =
      'https://api.nasa.gov/planetary/apod?api_key=' + apikey + '&date=' + fechaapi + '&hd=true';

    try {
      const fetchData = await fetch(API);
      Estadoinicial.Data = await fetchData.json();
      Estadoinicial.title = Estadoinicial.Data.title;
      Estadoinicial.imagesrc = Estadoinicial.Data.url;
      Estadoinicial.hdimagesrc = Estadoinicial.Data.hdurl;
      Estadoinicial.explanation = Estadoinicial.Data.explanation;
      const botoneselemento = document.getElementById('botones-elemento');
      botoneselemento.style.display = "inline-block"
      const photo = document.getElementById('fotodeldia');
      const video = document.getElementById('div-video');
      const titulo = document.querySelector('#head');
      titulo.innerHTML = Estadoinicial.title;
      photo.src = Estadoinicial.imagesrc;
      const explanation = document.getElementById('explanation');
      explanation.innerHTML = Estadoinicial.Data.explanation;
      const deleteimage = document.getElementById('deleteimage');
      deleteimage.style.display = "inline-block"
      const hd = document.getElementById('hd');
      hd.style.display = "inline-block"
      const nextrandom = document.getElementById('nextrandom');
      nextrandom.style.display = "inline-block"

      // ASIGNACIONES SEGUN EL TIPO DE MEDIO (IMAGE/VIDEO)

      if (Estadoinicial.Data.media_type === 'video') {
      
        /* cargar contenido seguro en su sitio, simplemente elimine el protocolo del enlace */
        let urlreducida = Estadoinicial.imagesrc.replace('https:', '');
        /* prepara lo videos para reproducción automática */
        urlreducida = urlreducida + '?rel=0&amp;autoplay=1';
        deleteimage.style.display = "none"
        hd.style.display = "none"
        video.style.display = 'block';
        photo.style.display = 'none';
        const botoneselemento = document.getElementById('botones-elemento');
        botoneselemento.style.display = "none"
        document.getElementById('video').src = urlreducida;
      } else {
        if (Estadoinicial.Data.media_type === 'image') {
          photo.style.display = 'block';
          video.style.display = 'none';
          deleteimage.style.display = "inline-block"
          const videoplay = document.getElementById('video');
          videoplay.src = '';

          // SE AÑADIRAN (SI NO EXISTEN), IMAGENES VISITADAS 
          // TANTO A LISTA, DICCIONARIO COMO REGISTRO EN LOCALSTORAGE
          if (!visited.includes(Estadoinicial.imagesrc)) {
            visited.unshift(Estadoinicial.imagesrc);
            localStorage.setItem('historialvisitas', JSON.stringify(visited));
            dict[Estadoinicial.imagesrc] = fechaapi;
            localStorage.setItem('diccionario', JSON.stringify(dict));
            console.log(visited);
          }
          // MUESTRA IMAGEN DE UN ASTRONAUTA CUANDO NO ENCUENTRA RECURSO SOLICITADO
          // Y MENSAJE Y EXPLICACION DE RECURSO NO ENCONTRADO
        } else {
          video.style.display = 'none';
          video.src = '';
          photo.style.display = 'block';
          photo.src = "https://res.cloudinary.com/dquxfl0fe/image/upload/v1657344274/API-GA/astronauta_ulcwcc.jpg";
          titulo.innerHTML = 'Recurso no encontrado ';
          const explanation = document.getElementById('explanation');
          explanation.innerHTML =
            'Nothing has been found. Remember that we have a selection of our favorite resources on the main menu.';
        }
      }
      console.log(Estadoinicial.Data);
    
    } catch (error) {
      console.log(error);
    }

    // MUESTRA EL BOTON DE ELIMINAR HISTORIAL EN CUANTO LA LISTA SEA >1   
    if (visited.length > 1) {
      const history = document.getElementById('history');
      history.style.display = 'block';
    } else {
      const history = document.getElementById('history');
      history.style.display = 'none';
    }
   
  };

  // FUNCION REDUCER PARA CASOS DE DISPACHT (CUANDO SE DISPARA EVENTO)
  function reducer(state = Estadoinicial, action) {
    
    switch (action.type) {
      // MOSTRARA LA FOTO DEL DIA
     
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
        // REGISTRA FECHA CALENDARIO Y ESPERA CONFIRMACION APPLY
        state.fecha = action.payload.id;
        fechaapi = state.fecha;
        fechaapi = fechaapi.toString();
        return {
          ...state,
        };
      }
      // RECABA DATOS DE IMAGENES LATERALES DE HISTORIAL
      case 'CLICKMINIATURA': {
        const photo = document.getElementById('fotodeldia');
        const hd = document.getElementById('hd');
        hd.style.display = 'none';
        const nextrandom = document.getElementById('nextrandom');
        nextrandom.style.display = 'none';
        const deleteimage = document.getElementById('deleteimage');
        deleteimage.style.display = 'none';
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
      // LIMPIA EL REGISTRO DE HISTORIAL TANTO EN LISTA
      // COMO EN LOCALSTORAGE
      case 'LIMPIARSTORAGE': {
        localStorage.removeItem('historialvisitas');
        document.querySelector('#history').click();
        visited = [];
        APOD();
        return {
          ...state,
        };
      }
      // EN ESTE CASO SE CANCELA EL BORRADO DE HISTORIAL
      case 'NOTREMOVE': {
        document.querySelector('#history').click();
        return {
          ...state,
        };
      }
      // EN ESTE CASO SE CIERRRA EL ELEMENTO COLLAPSE DE EXPLANATION
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
      // EN ESTE CASO SE CAMBIA LA URL HABITUAL POR LA DE HD
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
      // ESTE CASO ACEPTA Y EJECUTA LA FECHA ESCOGIDA DEL CALENDARIO
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
      // EN ESTE CASO SE HACE UN "RANDOM" SOBRE LISTADO DE IMAGENES EN LISTA DE FAVORITOS
      // Y POSTERIORMENTE SE ENVIA FECHA A URL API PARA TRAER SUS DATOS
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
      // EN ESTE CASO SE HACE UN "RANDOM" SOBRE LISTADO DE VIDEOS EN LISTA DE FAVORITOS
      // Y POSTERIORMENTE SE ENVIA FECHA A URL API PARA TRAER SUS DATOS
      case 'VIDEOFAVORITOS': {
        document.querySelector('#favoritos').click();
        aleatorio = Math.floor(Math.random() * videolist.length);
        fechaapi = videolist[aleatorio];
        APOD();
        return {
          ...state,
        };
      }
      // CIERRA/ABRE COLLAPSE DE FAVORITOS
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
      // CIERRA/ABRE COLLAPSE DE CHART
      case 'CLOSECHART': {
        document.querySelector('#buttonChart').click();
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
        return {
          ...state,
        };
      }
      // ELIMINA SOLO IMAGEN SELECCIONADA TANTO DE LA LISTA Y DICT
      // COMO DE LOCALSTORAGE
      case 'DELETEIMAGE': {
        delete dict[Estadoinicial.imagesrc];
        visited = visited.filter(item => item !== Estadoinicial.imagesrc);
        localStorage.setItem('historialvisitas', JSON.stringify(visited));
        const photo = document.getElementById('fotodeldia');
        photo.style.display = 'none';
        const video = document.getElementById('video');
        const divvideo = document.getElementById('div-video');
        divvideo.style.display = 'block';
        video.src =
          '//www.youtube.com/embed/86YLFOog4GM?autoplay=1&mute=1&enablejsapi=1';
        const botoneselemento = document.getElementById('botones-elemento');
        botoneselemento.style.display = 'none';
        const explanation = document.getElementById('explanation');
        explanation.innerHTML =
          'The image has been removed. Remember that we have a selection of our favorite resources on the main menu';
        const head = document.getElementById('head');
        head.innerHTML = 'Image has been successfully removed';
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
        return {
          ...state,
        };
      }
      // ABRE URL SEGUN DISPACHT BOTON NASA
      case 'NASALINK': {
        window.open('https://www.nasa.gov/nasalive', '_blank');
        return {
          ...state,
        };
      }
      // ABRE URL SEGUN DISPACHT BOTON ADECCO
      case 'ADECCOLINK': {
        window.open('https://fundacionadecco.org/', '_blank');
        return {
          ...state,
        };
      }
      // ABRE URL SEGUN DISPATCH BOTON GENERAL ASSEMBLY
      case 'GALINK': {
        window.open('https://generalassemb.ly/', '_blank');
        return {
          ...state,
        };
      }

      // RECIBE DISPATCH PARA SUBIR SCROLL TOP
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
      // CASE DEFAULT
      default: {
        return { ...state };
      }
    }
  }



  // LLAMADA A FUNCION INICIO PROGRAMA (COMENZAR)
  comenzar();

  document.addEventListener('readystatechange', event => {
    // Cuando elementos HTML/DOM estan listos
  
    if (event.target.readyState === 'interactive') {
      //does same as:  ..addEventListener("DOMContentLoaded"..
    
      console.log("ok")
   
    }
    // When window loaded ( external resources are loaded too- `css`,`src`, etc...)
    if (event.target.readyState === 'complete') {
   
      console.log('ok. estado completo de carga');
      Estadoinicial.imagesrc = '//www.youtube.com/embed/86YLFOog4GM?autoplay=1&mute=1&enablejsapi=1'
    
    }
    
  });



  // funcion inicial que toma fecha del dia para variable global
  // toma lectura de posible historial en Localstorage
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
    
  };


  // FUNCION PRINCIPAL QUE ESCUCHA ESTADOS Y RENDERIZA 
export default function Main() {

  // preparación de referencia para poder usar tooltip libreria ajena (JBOX)
  let el = '';
  let el2 = '';
  const ref = useRef(null);
  const myref = useRef(null);
  useEffect(() => {
    el = ref.current;
  el2=myref.current
    new jBox('Mouse', {
      attach: '#' + el.id,
      animation: { open: 'slide:left', close: 'flip:top' },
      closeOnClick: true,
      color:'blue',
     /*  theme:'TooltipDark', */
      position: {
        x: 'right',
        y: 'bottom',
      },
      content: 'Estadistica de visitas recibidas',
    });
    
   

   new jBox('Notice', {
   autoClose: 3000,
     color: 'red',
   position: { x: 'center', y: 'center' },
   content:
     ' Vea las Novedades añadidas en Septiembre !!',
   });
     new jBox('Notice', {
       autoClose: 3000,
       delayOpen:3000,
       color: 'blue',
       position: { x: 'center', y: 'center' },
       content:
         'Click en el gif animado del menú para ver las Novedades de Septiembre',
     });
 
    
    
  }, []);

 
  

  
  
  
    // NECESARIO PARA RESPONDER O DESPACHAR ACCIONES (USEREDUCER)
    const [state, dispatch] = useReducer(reducer, Estadoinicial);
    Estadoinicial.title = " International Space Station [ISS] LIVE"
    return (
      <div className="container-fluid todo animate__animated animate__fadeIn">
        <div className="row">
          {/* zona para titulos y botones -----------------------------------------------------------*/}
          <div className="col-12 col-titulo ">
            {' '}
            {/* VER WIREFRAME EN README.MD */}
            <div className="cabecera">
              <button
                id="buttonChart"
                ref={ref}
                type="button"
                className="transparente"
                data-bs-toggle="collapse"
                data-bs-target="#collapseChart"
                aria-expanded="false"
                aria-controls="collapseChart"
              >
                <img src={atom} width="60rem" alt="gif atom" />
              </button>

              <h1 className="titulo-landing titulo-cabecera">
                Unofficial mirror of the NASA Astronomy Picture of the Day
                (APOD)
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
                  Our favourites Resorces{' '}
                </button>
              </div>
            </div>
          </div>

          {/* zona para opciones aside (VER WIREFRAME)-------------------------------------------------- */}
          <div className="col-2  aside ">
            <div className="div-flex">
              <Link to="/Meteors">
                <button
                  type="button"
                  className="btn btn-primary button-meteors "
                >
                  Go to Meteorite Map
                </button>
              </Link>
            </div>
            <div className="div-flex">
              <Link to="/Fire">
                <button
                  type="button"
                  className="btn btn-primary button-meteors "
                >
                  Go to Forest Fire Map
                </button>
              </Link>
            </div>
            <div className="div-flex">
              <Link to="/Iss">
                <button
                  type="button"
                  className="btn btn-primary button-meteors "
                >
                  Go to Map ISS Location
                </button>
              </Link>
            </div>
            <div className="div-flex">
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

          {/* zona para contenido (VER WIREFRAME)----------------------------------------------------- */}

          <div id="contenido" className="col-10 contenido ">
            {/* ZONA DE APERTURA COLLAPSE CALENDARIO */}
            <div className="collapse marginbotton1rem" id="collapseCalendar">
              <div className="card card-body mensaje-gris-oscuro animate__animated animate__fadeIn">
                <div
                  style={{
                    margin: 'auto',
                    display: 'block',
                    width: '50vw',
                  }}
                >
                  <h4>Every day a photo, a video, or a game</h4>
                  {/* COMPONENTE CALENDARIO */}
                  <TextField
                    style={{ width: '30vw' }}
                    id="date"
                    className="datepicker"
                    label="Choose your day"
                    type="date"
                    value={state.fecha}
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
                    className="btn btn-secondary btn-lg boton-fecha button-apply"
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
            {/* ZONA COLLAPSE BORRAR HISTORIAL */}
            <div className="collapse marginbotton1rem" id="collapseHistory">
              <div className="card card-body mensaje-gris-oscuro">
                <p className="animate__animated animate__fadeIn">
                  El historial de su navegación en esta página se almacena
                  exclusivamente en el Caché de su navegador. Usted puede
                  remover ese registro en cualquier momento. Así mismo un par:
                  clave/Valor, es el encargado de mostrarle de nuevo cualquiera
                  de las imagenes que usted vaya conservando. Se ha traducido
                  este texto para empatizar con la comunidad hispanohablante que
                  ha crecido un 70 % en los últimos 30 años. 591 millones de
                  personas en todo el mundo hablan español, según el último
                  anuario del Instituto Cervantes. (14 de Octubre 2021){' '}
                </p>
                <p className="animate__animated animate__fadeIn white">
                  Your browsing history on this site is stored exclusively in
                  your browser's storage. You can remove this record at any
                  time. Also a pair: key/value, is in charge of showing you
                  again any of the images that you keep.{' '}
                </p>

                <div className="div-flex">
                  <button
                    type="button"
                    className="btn btn-danger btn-sm fit-button animate__animated animate__heartBeat"
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
                    className="btn btn-secondary btn-sm fit-button "
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
            {/* ZONA COLLAPSE FAVORITOS */}
            <div className="collapse marginbotton1rem " id="collapsefavoritos">
              <div
                id="colapsefavoritos"
                className="card card-body mensaje-gris-oscuro collapse-mobile"
              >
                <p className="animate__animated animate__fadeIn center">
                  Each key of our favorite images and videos is hosted on google
                  back-end service Firebase-FireStore. We hope you like them.
                </p>
                <div className="cabecera">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm fit-button"
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
                    className="btn btn-secondary btn-sm fit-button"
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
                    className="close btn btn-outline-secondary btn-sm fit-button"
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

            {/* ZONA COLLAPSE CHART */}
            <div className="collapse marginbotton1rem " id="collapseChart">
              <div className="card card-body mensaje-gris-oscuro collapse-mobile">
                <p className="animate__animated animate__fadeIn center">
                  Registro de visitas almacenado en Google Cloud
                </p>
                <div className="cabecera"></div>
                <div className="div-flex">
                  <button
                    type="button"
                    id="colapseChart"
                    className="close btn btn-outline-secondary btn-sm fit-button"
                    data-dismiss="alert"
                    aria-label="Close"
                    onClick={e =>
                      dispatch({
                        type: 'CLOSECHART',
                        payload: { id: e.target.value },
                      })
                    }
                  >
                    Close this Window
                  </button>
                </div>
                <div className="mychart">
                  <Line data={state.dataChart} />
                </div>
              </div>
            </div>

            {/* ZONA COLLAPSE EXPLICACION DEL RECURSO (IMAGEN O VIDEO) */}
            <div className="collapse marginbotton1rem" id="collapseExplanation">
              <div
                id="colapseexplanation"
                className="card card-body mensaje-gris-oscuro"
              >
                <p id="explanation">{state.explanation}</p>
                <p id="dateresourse">Resourse Date: {fechaapi}</p>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm fit-button"
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
                className="btn btn-outline-secondary button-in-collapse animate__animated animate__slideInRight"
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
                className="btn btn-outline-danger button-in-collapse animate__animated animate__slideInRight"
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
                className="btn btn-outline-info button-in-collapse animate__animated animate__slideInRight "
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
            {/* COMPONENTE IMPORTADO QUE ENVUELVE IMAGEN Y SE ENCARGA DEL ZOOM */}
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

            {/* ZONA (IFRAME) VIDEO AND PHP GAME */}
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
                id="nasa"
                src="https://res.cloudinary.com/dquxfl0fe/image/upload/v1657194000/API-GA/nasa-logo_w5ebmi.png"
                className=" imagen-flex nasa-logo"
                alt="logo Nasa"
                ref={myref}
                onClick={e =>
                  dispatch({
                    type: 'NASALINK',
                    payload: { id: e.target.value },
                  })
                }
              />
            </div>

            <h3 className="centrado">
              " Demostrando talento senior gracias a la Fundación Adecco "
            </h3>

            <h5 className="centrado">
              Claudia Muñoz García | Eduardo Cabrera Blázquez
            </h5>

            <div className="div-flex ">
              <img
                src="https://res.cloudinary.com/dquxfl0fe/image/upload/v1657191232/API-GA/Fundacion-Adecco_nhqdiv.png"
                className=" imagen-flex imagenes-fondo "
                alt="fundación Adecco"
              />
            </div>
            <div className="div-flex">
              <Link to="/Meteors">
                <button
                  type="button"
                  className="btn btn-primary button-meteors map-oculto"
                >
                  Go to Meteorite Map
                </button>
              </Link>
            </div>
            <div className="div-flex">
              <Link to="/Fire">
                <button
                  type="button"
                  className="btn btn-primary button-meteors map-oculto"
                >
                  Go to Forest Fire Map
                </button>
              </Link>
            </div>
            <div className="div-flex">
              <Link to="/Iss">
                <button
                  type="button"
                  className="btn btn-primary button-meteors map-oculto"
                >
                  Go to Map ISS Location
                </button>
              </Link>
            </div>
            <div className="div-flex">
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
              <p className="centrado">Tu Historial visitado</p>
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