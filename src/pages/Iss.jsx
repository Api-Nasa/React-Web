import React from 'react';
import PantallaPresentacion from '../components/PantallaPresentacion';

function Iss() {
  const data = {
    urlIcono: 'https://i.gifer.com/ONml.gif',
    altIcono: 'Iss',
    link: '/MapsEstacionIss',
    tituloPresentacion:
      ' Discover the real-time location of the international space station',
  };
  return (
    <div>
      <PantallaPresentacion data={data} />
    </div>
  );
}

export default Iss;

