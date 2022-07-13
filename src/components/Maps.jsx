import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import '../styles/Maps.css';
/* import geoJson from '../co.geojson';  */
 
let url = "https://data.nasa.gov/resource/gh4g-9sfh.json";
let myJson=""
fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        myJson=data
       /*  alert(geoJson[0].geolocation.latitude) */
    })
 
mapboxgl.accessToken =
  'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const Maps = () => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(5);
  const [lat, setLat] = useState(34);
  const [zoom, setZoom] = useState(1.5);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      /* style: 'mapbox://styles/mapbox/traffic-night-v2', */
      /* style: 'mapbox://styles/mapbox/satellite-v9', */
      /*  style: 'mapbox://styles/mapbox/streets-v11', */
       style: 'mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y',
      center: [lng, lat],
      zoom: 1,
      projection: 'globe', // display the map as a 3D globe
    });
    let addMarker = () => {
      const marker = new mapboxgl.Marker();
      const minPopup = new mapboxgl.Popup({closeOnClick: false, closeButton: false})
      minPopup.setHTML( "<h6>Mi primer marcador</h6><p>Meteorito en Norte de Europa</p>");
      marker.setPopup(minPopup);
      marker.setLngLat([10, 59]);
      marker.addTo(map);
      
    };
    map.on('load', addMarker);

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
    
    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div >
      <div className="sidebarStyle  ">
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div className="map-container" ref={mapContainerRef} />
    </div>
  );
};

export default Maps;
