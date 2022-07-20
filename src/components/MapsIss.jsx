import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import '../styles/Maps.css';
/* import geoJson from '../co.geojson';  */
let zoomy=1

let url = 'https://api.wheretheiss.at/v1/satellites/25544';
let myJson = ""


  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      myJson = data
      /*  alert(geoJson[0].geolocation.latitude) */
    })



  

let map=""

mapboxgl.accessToken = process.env.REACT_APP_API_KEY;

const MapsIss = () => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(5);
  const [lat, setLat] = useState(34);
  const [zoom, setZoom] = useState(1.5);

  // Initialize map when component mounts
  useEffect(() => {
    map = new mapboxgl.Map({
      container: mapContainerRef.current,
     /*  style: 'mapbox://styles/mapbox/traffic-night-v2', */
      style:'mapbox://styles/mapbox/satellite-streets-v11',
     /*  style: 'mapbox://styles/mapbox/satellite-v9', */
      /*  style: 'mapbox://styles/mapbox/streets-v11', */
      center: [lng, lat],
      zoom: 1,
      projection: 'globe', // display the map as a 3D globe
    });
    
    

    
      
    

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
    /* map.addControl(new mapboxgl.NavigationControl(), 'top-right'); */

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    document.getElementById('fly2').addEventListener('click', () => {
      zoomy = 1
      document.getElementById('fly').click()
    });
    document.getElementById('fly3').addEventListener('click', () => {
      zoomy = 6
      document.getElementById('fly').click()
    });
      document.getElementById('fly').addEventListener('click', () => {
           try {
             map.flyTo({
               center: [myJson.longitude, myJson.latitude],
               zoom: zoomy,
               speed: 1,
               essential: true, // this animation is considered essential with respect to prefers-reduced-motion
             });

             let html =
               '<h6> Visibilidad: ' +
               myJson.visibility +
               '</h6><p>Altitud km ' +
               myJson.altitude +
               '</p>';
             var el = document.createElement('div');
             el.className = 'marker';
             let addMarker = () => {
               const marker = new mapboxgl.Marker(el);

               const minPopup = new mapboxgl.Popup({
                 closeOnClick: false,
                 closeButton: false,
               });
               minPopup.setHTML(html);
               marker.setPopup(minPopup);
               marker.setLngLat([myJson.longitude, myJson.latitude]);
               marker.addTo(map);
             };

             map.on('zoom', addMarker);
           } catch (error) {
             console.error(error);
             // expected output: ReferenceError: nonExistentFunction is not defined
             // Note - error messages will vary depending on browser
           }
       
      });
    
   
    function mandarMensaje() {
       let url = 'https://api.wheretheiss.at/v1/satellites/25544';
      try {
        fetch(url)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data);
            myJson = data;
            var testData = !!document.getElementById('fly');
            if (testData) {
               document.getElementById('fly').click();
            } 
             
           
          });
      }catch (error) {
  console.error(error);
 
}
  
    }
    
        setInterval(mandarMensaje, 1000);
    

 
    
    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  
  return (
    <div>
      <div className="sidebarStyle  ">
        <div className="lat-long">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>

        <button
          id="modal1"
          type="button"
          class="btn btn-outline-danger btn-sm fit-button animate__animated animate__heartBeat fly"
          data-bs-toggle="modal"
          data-bs-target="#info-iss"
        >
          About this (MVP)
        </button>
        <button id="fly" type="button" class="btn btn-danger btn-sm oculto">
          Fly to zoom 9 ---oculto no borrar ----
        </button>

        <button
          id="fly3"
          type="button"
          class="btn btn-outline-secondary btn-sm fit-button  fly "
        >
          Fly to zoom 6
        </button>
        <button
          id="fly2"
          type="button"
          class="btn btn-outline-secondary btn-sm fit-button  fly "
        >
          Fly to zoom 1
        </button>
        <Link to="/">
          <button
            id="exit"
            type="button"
            className="btn btn-primary api-btn btn-sm fit-button  fly "
          >
            Go Home
          </button>
        </Link>
      </div>

      <div className="map-container" ref={mapContainerRef} />

      <div
        class="modal fade mymodal "
        id="info-iss"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
          <div class="modal-content">
            <div class="modal-header mymodal">
              <h5 class="modal-title" id="exampleModalLabel">
                International Space Station Current Location (MVP) -- Minimum
                viable product.
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
                By making calls to the api every second, and recalculating the
                gelocalization of coordinates, we wanted to keep track of the
                international space station on the map and in real time.
              </p>
              <div classname="flex-modal">
                <img
                  className="img-modal"
                  src="https://res.cloudinary.com/dquxfl0fe/image/upload/v1658070467/API-GA/estacion-espacial-internacional-1_o25lxn.jpg"
                  alt="nasa-iss"
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
                  src="https://res.cloudinary.com/dquxfl0fe/image/upload/v1658071685/API-GA/iis01_ihytaj.png"
                  alt="iss-location01"
                />
              </div>
              <hr></hr>
              <p className="blue-text">
                As you can see both in the previous image and in the next one,
                we had planned to generate the trace left in its orbit.
              </p>
              <hr></hr>
              <div classname="flex-modal">
                <img
                  className="img-modal"
                  src="https://res.cloudinary.com/dquxfl0fe/image/upload/v1658071886/API-GA/iss02_vtmrz2.png"
                  alt="iss-location02"
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

export default MapsIss;
