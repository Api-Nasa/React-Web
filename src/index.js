import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
/* import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import Map, { GeolocateControl, Marker } from 'react-map-gl'; */
/* import * as mapboxgl from 'mapbox-gl'; */
import mapboxgl from 'mapbox-gl';
import '../src/styles/index.css';
import App from './App';
import Main from "./pages/Main"
import Meteors from './pages/Meteors';
import MapsMeteors from './pages/MapsMeteors';
import Error404 from "./pages/Error404"
import reportWebVitals from './reportWebVitals';

mapboxgl.accessToken =
  'pk.eyJ1IjoiZ2EtZWR1YXJkbyIsImEiOiJjbDVmNzQyY3kwaHJpM2pvM29lOWVuZnVlIn0.a20bgkRxwewC43RomqCQ9g';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="Main" element={<Main />} />
      <Route path="Meteors" element={<Meteors />} />
      <Route path="MapsMeteors" element={<MapsMeteors />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
