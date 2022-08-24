import React from 'react';
import PantallaPresentacion from '../components/PantallaPresentacion';

function Meteors() {
  const data = {
    urlIcono:
      'https://res.cloudinary.com/dquxfl0fe/image/upload/c_scale,r_30,w_290/a_0/v1661277579/API-GA/asteroid_mq32m3.gif',
    altIcono: 'Meteor',
    link: '/MapsMeteors',
    tituloPresentacion:
      'Discover the known locations where meteorites have fallen',
  };
  return (
    <div>
      <PantallaPresentacion data={data} />
    </div>
  );
}

export default Meteors;


