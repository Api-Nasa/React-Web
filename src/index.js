import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import '../src/styles/index.css';
import App from './App';
import Main from "./pages/Main"
import Meteors from './pages/Meteors';
import Iss from './pages/Iss';
import MapsMeteors from './pages/MapsMeteors';
import MapsEstacionIss from './pages/MapsEstacionIss';
import Error404 from "./pages/Error404"
import reportWebVitals from './reportWebVitals';

mapboxgl.accessToken='pk.eyJ1IjoiZ2EtZWR1YXJkbyIsImEiOiJjbDVmNzQyY3kwaHJpM2pvM29lOWVuZnVlIn0.a20bgkRxwewC43RomqCQ9g'; 


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="Main" element={<Main />} />
      <Route path="Meteors" element={<Meteors />} />
      <Route path="MapsMeteors" element={<MapsMeteors />} />
      <Route path="Iss" element={<Iss/>} />
      <Route path="MapsEstacionIss" element={<MapsEstacionIss />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  </BrowserRouter>,
);

reportWebVitals();
