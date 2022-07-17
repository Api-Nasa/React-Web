import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import '../styles/Maps.css';
/* import geoJson from '../co.geojson';  */
let zoomy=1
function askConfirmation(evt) {
  var msg =
    'Si recarga la página perdera todos los datos Marcadores.\n¿Deseas recargar la página?';
  evt.returnValue = msg;
  
  return msg;
}
window.addEventListener('beforeunload', askConfirmation);
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


function calcularposicion() {
  let url = 'https://api.wheretheiss.at/v1/satellites/25544';
fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      myJson = data
      /*  alert(geoJson[0].geolocation.latitude) */
    })
}
  

let map=""

mapboxgl.accessToken =
  'your key';

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
     /*  style:'mapbox://styles/mapbox/satellite-streets-v11', */
      style: 'mapbox://styles/mapbox/satellite-v9',
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
            document.getElementById('fly').click();
            /*  alert(geoJson[0].geolocation.latitude) */
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
          data-bs-target="#info-meteors"
        >
          About this (MVP)
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
      </div>

      <div className="map-container" ref={mapContainerRef} />
      <button
        id="fly"
        type="button"
        class="btn btn-danger btn-sm fit-button animate__animated animate__heartBeat fly oculto"
      >
        Fly to zoom 9 ---oculto no borrar ----
      </button>
    </div>
  );
};

export default MapsIss;
