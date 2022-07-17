import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import '../styles/Maps.css';
function askConfirmation(evt) {
  var msg =
    'Si recarga la página perdera todos los datos Marcadores.\n¿Deseas recargar la página?';
  evt.returnValue = msg;
  
  return msg;
}

window.addEventListener('beforeunload', askConfirmation);

let url = "https://data.nasa.gov/resource/gh4g-9sfh.json";
let myJson=""
fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        myJson=data
      
    })
 
mapboxgl.accessToken =
  'your key';

const MapsMet = () => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(5);
  const [lat, setLat] = useState(34);
  const [zoom, setZoom] = useState(1.5);

  // Initialize map when component mounts
  useEffect(() => {
    
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      /* style: 'mapbox://styles/mapbox/traffic-night-v2', */
      style: 'mapbox://styles/mapbox/satellite-v8',
      /*  style: 'mapbox://styles/mapbox/streets-v11', */
     /*   style: 'mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y', */
      center: [lng, lat],
      zoom: 1,
      projection: 'globe', // display the map as a 3D globe
    });
    for (let meteorito of myJson) {
    let html='<h6> Name: '+meteorito.name+'</h6><p>Masa en Kg: '+parseInt(meteorito.mass)/1000+'</p>'
    let addMarker = () => {
      
      const marker = new mapboxgl.Marker();
      const minPopup = new mapboxgl.Popup({closeOnClick: false, closeButton: false})
      minPopup.setHTML( html);
      marker.setPopup(minPopup);
      marker.setLngLat([meteorito.geolocation.longitude,meteorito.geolocation.latitude]);
      marker.addTo(map);
    };
      map.on('load', addMarker);  
      
  };

    map.on('style.load', () => {
      map.setFog({
        color: 'rgb(186, 210, 235)', // Lower atmosphere
        'high-color': 'rgb(36, 92, 223)', // Upper atmosphere
        'horizon-blend': 0.02, // Atmosphere thickness (default 0.2 at low zooms)
        'space-color': 'rgb(11, 11, 25)', // Background color
        'star-intensity': 0.6, // Background star brightness (default 0.35 at low zoooms )
      });
    
     
      
    });
   
    
    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

      
      document.getElementById('Home').addEventListener('click', () => {
        // Fly to a origin location
        map.flyTo({
          center: [5, 34],
          zoom: 1,
          speed:0.2,
          essential: true, // this animation is considered essential with respect to prefers-reduced-motion
        });
      });
       document.getElementById('NA').addEventListener('click', () => {
        // Fly to a random location
        map.flyTo({
          center: [-96, 42],
          zoom: 2.45,
          speed:0.2,
          essential: true, // this animation is considered essential with respect to prefers-reduced-motion
        });
       });
     document.getElementById('SA').addEventListener('click', () => {
       // Fly to a random location
       map.flyTo({
         center: [-63, -24],
         zoom: 2.45,
         speed: 0.2,
         essential: true, // this animation is considered essential with respect to prefers-reduced-motion
       });
     });
     document.getElementById('EU').addEventListener('click', () => {
       // Fly to a random location
       map.flyTo({
         center: [11, 48],
         zoom: 3.45,
         speed: 0.2,
         essential: true, // this animation is considered essential with respect to prefers-reduced-motion
       });
     });
      document.getElementById('AF').addEventListener('click', () => {
       // Fly to a random location
       map.flyTo({
         center: [24, 5.1],
         zoom: 2.22,
         speed: 0.2,
         essential: true, // this animation is considered essential with respect to prefers-reduced-motion
       });
      });
     document.getElementById('AS').addEventListener('click', () => {
       // Fly to a random location
       map.flyTo({
         center: [79.8, 26],
         zoom: 3,
         speed: 0.2,
         essential: true, // this animation is considered essential with respect to prefers-reduced-motion
       });
     });
     document.getElementById('OC').addEventListener('click', () => {
       // Fly to a random location
       map.flyTo({
         center: [134, -23],
         zoom: 2,
         speed: 0.2,
         essential: true, // this animation is considered essential with respect to prefers-reduced-motion
       });
     });

     document.getElementById('adecco').addEventListener('click', () => {
         window.open('https://fundacionadecco.org/', '_blank');
     })
      document.getElementById('OC').addEventListener('click', () => {
          window.open('https://generalassemb.ly/', '_blank');
      })
    
    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  
  return (
    <div>
      <div className="sidebarStyle">
        <div className="lat-long">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>

        <button
          id="modal1"
          type="button"
          class="btn btn-outline-danger btn-sm fit-button animate__animated animate__heartBeat fly"
          data-bs-toggle="modal"
          data-bs-target="#info-meteors"
        >
          About this (MVP)
        </button>
        <div className="fly">
          <div class="dropdown">
            <button
              class="btn btn-outline-secondary btn-sm dropdown-toggle"
              type="button"
              id="opciones"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Available Options Menu for this MPV Version
            </button>
            <ul
              class="dropdown-menu dropdown-menu-dark"
              aria-labelledby="dropdownMenuButton2"
            >
              <li>
                <a id="Home" class="dropdown-item active" href="#opciones">
                  Reset Location
                </a>
              </li>
              <li>
                <a id="NA" class="dropdown-item" href="#opciones">
                  North America
                </a>
              </li>
              <li>
                <a id="SA" class="dropdown-item" href="#opciones">
                  Soth America
                </a>
              </li>
              <li>
                <a id="EU" class="dropdown-item" href="#opciones">
                  Europe
                </a>
              </li>
              <li>
                <a id="AF" class="dropdown-item" href="#opciones">
                  Africa
                </a>
              </li>
              <li>
                <a id="AS" class="dropdown-item" href="#opciones">
                  Asia
                </a>
              </li>
              <li>
                <a id="OC" class="dropdown-item" href="#opciones">
                  Oceania
                </a>
              </li>
              <li>
                <hr class="dropdown-divider "></hr>
              </li>
              <li>
                <Link to="/">
                  <a class="dropdown-item blue-text" href="#opciones">
                    Go Home Page
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="map-container" ref={mapContainerRef} />
      <div
        class="modal fade mymodal "
        id="info-meteors"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
          <div class="modal-content">
            <div class="modal-header mymodal">
              <h5 class="modal-title" id="exampleModalLabel">
                Meteorite Landings API (MVP) -- Minimum viable product.
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body mymodal">
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
            <div class="modal-footer mymodal">
              <p> Api.Nasa.2022@gmail.com</p>
              <button
                type="button"
                class="btn btn-outline-secondary"
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
