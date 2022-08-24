import React from 'react';
import PantallaPresentacion from '../components/PantallaPresentacion';

function Fire() {
  const data = {
    urlIcono: 'https://i.gifer.com/9PrC.gif',
    altIcono: 'Fire',
    link: '/MapsForestFire',
    tituloPresentacion: 'Discover the real-time location of forest fires',
  };
  return (
    <div>
      <PantallaPresentacion data={data} />
    </div>
  );
}

export default Fire;