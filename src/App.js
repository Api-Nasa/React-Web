import React from 'react';
import PantallaPresentacion from './components/PantallaPresentacion';

function App() {
  const data = {
    urlIcono:
      'https://res.cloudinary.com/dquxfl0fe/image/upload/v1657439542/API-GA/cool-bueno_h6o002.gif',
    altIcono: 'Earth',
    link: '/Main',
    tituloPresentacion: ' React project to interact with Nasa APIs data',
  };
   return (
    <div>
      <PantallaPresentacion data={data} />
    </div>
  );
}

export default App;
