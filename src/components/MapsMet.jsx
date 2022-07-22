/* COMPONENTE (MAPA) UBICACION METEORITOS REGISTRADOS NASA */
/* ------------------------------------------------------- */
/* Importaciones necesarias */
import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';  /* libreria Mapas usada */
import '../styles/Maps.css'; /* estilo para opciones en mapas */

/* URL API METEORITOS REGISTRADOS */
let url = "https://data.nasa.gov/resource/gh4g-9sfh.json";
/* variable global para datos api-json */
let myJson = ""

/* Obtención de datos de la API */
try {
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      myJson = data;
    });
} catch (error) {
  console.error(error);
}
/* clave concedida por Mapbox */
 mapboxgl.accessToken='YOUR API-KEY';
 

function MapsMet() {
  /* creación de referencia para permitir multiples renderizados por REF */
  const mapContainerRef = useRef(null);
  /* Definición inicial de estados */
  const [lng, setLng] = useState(5);
  const [lat, setLat] = useState(34);
  const [zoom, setZoom] = useState(1.5);

  /* useEffects se ejecutará pra Inicilizar el mapa cada vez que se monta o se renderiza */
  useEffect(() => {
     /* deficiones principales del Mapa */
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/satellite-v8',
      center: [lng, lat],
      zoom: 1,
      projection: 'globe'
    });

    /* ITERACIONES SOBRE OBJETO JSON Y SUS ELEMENTOS*/
    for (let meteorito of myJson) {

      /* PREPARACION DE TEXTO QUE SE VERÁ EN POPUP DE CADA MARCADOR */ 
      let html = '<h6> Name: ' + meteorito.name + '</h6><p>Masa en Kg: ' + parseInt(meteorito.mass) / 1000 + '</p>';
      /* CREACIÓN DE CADA MARCADOR POR CADA METEORITO */
      let addMarker = () => {
        try {
          const marker = new mapboxgl.Marker();
          const minPopup = new mapboxgl.Popup({
            closeOnClick: false,
            closeButton: false,
          });
          minPopup.setHTML(html);
          marker.setPopup(minPopup);
          marker.setLngLat([
            meteorito.geolocation.longitude,
            meteorito.geolocation.latitude,
          ]);
          marker.addTo(map);
        } catch (error) {
          console.error(error);
        }
      };
      map.on('load', addMarker);

    };
    /* Cuando el estilo se ha cargado, prepara el fondo estrellado */
    /* Esta definición viene preparada desde Mapbox */
    map.on('style.load', () => {
      map.setFog({
        color: 'rgb(186, 210, 235)',
        'high-color': 'rgb(36, 92, 223)',
        'horizon-blend': 0.02,
        'space-color': 'rgb(11, 11, 25)',
        'star-intensity': 0.6, // Background star brightness (default 0.35 at low zoooms )
      });
    });

     /* SE AÑADE UN CONTROL DE MAPBOX (ARRIBA Y DERECHA) PARA CONTROL DE ZOOM */
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    /* funciones de Mapbox para reasignar coordenadas (on move) */
    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    /* LAS SIGUIENTES LINEAS SON "LAS ESCUCHAS" Y EJECUCIONES DEL DROPDOWN DE OPCIONES */
    /* ------------------------------------------------------------------------------- */

    document.getElementById('Home').addEventListener('click', () => {
      /* VUELA A LOS PARAMETROS ORIGINAL */
      map.flyTo({
        center: [5, 34],
        zoom: 1,
        speed: 0.2,
        essential: true, // this animation is considered essential with respect to prefers-reduced-motion
      });
    });
    document.getElementById('NA').addEventListener('click', () => {
      // VUELA A COORDENADAS DE NORTE-AMERICA
      map.flyTo({
        center: [-96, 42],
        zoom: 2.45,
        speed: 0.2,
        essential: true, // this animation is considered essential with respect to prefers-reduced-motion
      });
    });
    document.getElementById('SA').addEventListener('click', () => {
      // VUELA A COORDENADAS DE SUR-AMERICA
      map.flyTo({
        center: [-63, -24],
        zoom: 2.45,
        speed: 0.2,
        essential: true, // this animation is considered essential with respect to prefers-reduced-motion
      });
    });
    document.getElementById('EU').addEventListener('click', () => {
      // VUELA A COORDENADAS DE EUROPA
      map.flyTo({
        center: [11, 48],
        zoom: 3.45,
        speed: 0.2,
        essential: true, // this animation is considered essential with respect to prefers-reduced-motion
      });
    });
    document.getElementById('AF').addEventListener('click', () => {
      // VUELA A CORRDENADAS DE AFRICA
      map.flyTo({
        center: [24, 5.1],
        zoom: 2.22,
        speed: 0.2,
        essential: true, // this animation is considered essential with respect to prefers-reduced-motion
      });
    });
    document.getElementById('AS').addEventListener('click', () => {
      // VUELA A COORDENADAS DE ASIA
      map.flyTo({
        center: [79.8, 26],
        zoom: 3,
        speed: 0.2,
        essential: true, // this animation is considered essential with respect to prefers-reduced-motion
      });
    });
    document.getElementById('OC').addEventListener('click', () => {
      // VUELA A COORDENADAS DE OCEANIA
      map.flyTo({
        center: [134, -23],
        zoom: 2,
        speed: 0.2,
        essential: true, // this animation is considered essential with respect to prefers-reduced-motion
      });
    });

    /* escuchas y ejecución de los botones de Adecco y General Assembly */
    document.getElementById('adecco').addEventListener('click', () => {
      window.open('https://fundacionadecco.org/', '_blank');
    });
    document.getElementById('GA').addEventListener('click', () => {
      window.open('https://generalassemb.ly/', '_blank');
    });

    // Clean up on unmount
    return () => map.remove();
  }, []); // 


  return (
    <div>
      <div className="sidebarStyle"> {/* zona o estilo para todas las opciones */}
        <div className="lat-long">   {/* estilo para coordenadas */}
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>

        {/* BOTON QUE VA A ABRIR UN (MODAL BOOTSTRAP) CON INFORMACION SOBRE ESTE MVP*/}
        <button
          id="modal1"
          type="button"
          className="btn btn-outline-danger btn-sm fit-button animate__animated animate__heartBeat fly"
          data-bs-toggle="modal"
          data-bs-target="#info-meteors">
          About this (MVP)
        </button>

        <div className="fly">
          {/* ZONA DE OPCIONES DEL DROPDOWN */}
          <div class="dropdown">
            <button
              className="btn btn-outline-secondary btn-sm dropdown-toggle"
              type="button"
              id="opciones"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              Available Options Menu for this MPV Version
            </button>
            <ul
              className="dropdown-menu dropdown-menu-dark"
              aria-labelledby="dropdownMenuButton2"
            >
              <li>
                <a id="Home" className="dropdown-item active" href="#opciones">
                  Reset Location
                </a>
              </li>
              <li>
                <a id="NA" className="dropdown-item" href="#opciones">
                  North America
                </a>
              </li>
              <li>
                <a id="SA" className="dropdown-item" href="#opciones">
                  Soth America
                </a>
              </li>
              <li>
                <a id="EU" className="dropdown-item" href="#opciones">
                  Europe
                </a>
              </li>
              <li>
                <a id="AF" className="dropdown-item" href="#opciones">
                  Africa
                </a>
              </li>
              <li>
                <a id="AS" className="dropdown-item" href="#opciones">
                  Asia
                </a>
              </li>
              <li>
                <a id="OC" className="dropdown-item" href="#opciones">
                  Oceania
                </a>
              </li>
              <li>
                <hr className="dropdown-divider "></hr>
              </li>
              <li>
                <Link to="/">
                  <a className="dropdown-item blue-text" href="#opciones">
                    Go Home Page
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* DIV (POR REFERENCIA) PARA RENDERIZAR EL MAPA EN MULTIPLES OCASIONES */}
      <div className="map-container" ref={mapContainerRef} />

       {/* CONTENIDO DEL MODAL BOOTSTRAP (INFORMACION DE PROTOTIPO O MVP) */}
      <div className="modal fade mymodal "
        id="info-meteors"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
          <div className="modal-content">
            <div class="modal-header mymodal">
              <h5 className="modal-title" id="exampleModalLabel">
                Meteorite Landings API (MVP) -- Minimum viable product.
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body mymodal">
              <p className="blue-text">
                Geolocation of locations based on a Nasa API using a large
                dataset from the Meteoritical Society containing information on
                all known meteorite landings.
              </p>
              <div classname="flex-modal">
                <img
                  className="img-modal"
                  src="https://res.cloudinary.com/dquxfl0fe/image/upload/v1657993747/API-GA/meterors_arcrgl.jpg"
                  alt="nasa-api-meteors"
                />
              </div>

              <p className="blue-text">
                This version corresponds to a (MVP), or minimum viable product
                that will be revised in future updates of this application. The
                images below were captured at various stages of the project, and
                are hosted in our own cdn media library (Cloudinary Service).
              </p>
              <hr></hr>
              <div classname="flex-modal">
                <img
                  className="img-modal"
                  src="https://res.cloudinary.com/dquxfl0fe/image/upload/v1657987557/API-GA/meteo1_irog03.png"
                  alt="meteor-mapbox"
                />
              </div>
              <hr></hr>
              <p className="blue-text">
                taking into account the amount of data that Nasa offers us
                including coordinates, we have contemplated the use of
                geolocation libraries such as Mapbox in an experimental way for
                the current version of this application.
              </p>
              <hr></hr>
              <div classname="flex-modal">
                <img
                  className="img-modal"
                  src="https://res.cloudinary.com/dquxfl0fe/image/upload/v1657989860/API-GA/meteor2_suwanw.png"
                  alt="meteor-mapbox"
                />
              </div>
              <hr></hr>
              <p className="blue-text">
                The following images shows our first test with the Mapbox
                library.
              </p>
              <hr></hr>
              <div classname="flex-modal">
                <img
                  className="img-modal"
                  src="https://res.cloudinary.com/dquxfl0fe/image/upload/v1657990689/API-GA/meteor3_vga2xl.png"
                  alt="meteor-mapbox"
                />
              </div>
              <hr></hr>
              <p className="blue-text">
                First we tested with other APIs and we even thought about the
                possibility of modifying the bookmark icons, as you can see in
                the following picture
              </p>
              <hr></hr>
              <div classname="flex-modal">
                <img
                  className="img-modal"
                  src="https://res.cloudinary.com/dquxfl0fe/image/upload/v1657992176/API-GA/meteors4_pv74ne.png"
                  alt="meteor-mapbox"
                />
              </div>
              <hr></hr>
              <p className="blue-text">
                Finally, we will show you the color palette we decided to use
                throughout the project.
              </p>
              <hr></hr>
              <div classname="flex-modal">
                <img
                  className="img-modal"
                  src="https://res.cloudinary.com/dquxfl0fe/image/upload/v1657994150/API-GA/paleta_sdyfk5.png"
                  alt="meteor-mapbox"
                />
              </div>
              <div className="flex-modal">
                <img
                  id="adecco"
                  src="https://res.cloudinary.com/dquxfl0fe/image/upload/v1657192729/API-GA/adecco_o0ddcs.png"
                  className=" imagen-flex logo-click boton-flex"
                  alt="logo fundación Adecco"
                />
                <img
                  id="GA"
                  src="https://res.cloudinary.com/dquxfl0fe/image/upload/v1657192742/API-GA/ga_atwyd7.png"
                  className=" imagen-flex logo-click boton-flex "
                  alt="logo General Assemby"
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
              <div className="flex-modal">
                <img
                  src="https://res.cloudinary.com/dquxfl0fe/image/upload/v1657191232/API-GA/Fundacion-Adecco_nhqdiv.png"
                  className=" imagen-flex imagenes-fondo "
                  alt="fundación Adecco"
                />
              </div>
            </div>
            <div className="modal-footer mymodal">
              <p> Api.Nasa.2022@gmail.com</p>
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Close this Window
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default MapsMet;
