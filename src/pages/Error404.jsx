import React from 'react';
import PantallaPresentacion from '../components/PantallaPresentacion';

function Error404() {
  const data = {
    urlIcono: 'https://i.gifer.com/DKgy.gif',
    altIcono: 'Gif cubo',
    link: '/Main',
    tituloPresentacion: 'Esta Url no existe o no está disponible',
  };
  return (
    <div>
      <PantallaPresentacion data={data} />
    </div>
  );
}

export default Error404;

