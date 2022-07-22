
/* importaciones necesarias para este test */
import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import Error404 from './Error404';

/* comprobaremos si renderiza bien*/
/* si el texto solicitado coincide */
/* con su nodo o selector */

test('comprobación de nodo', () => {
  const coincidencia = () => (
    <p></p>
  );
   render(
    <Router>
      <Error404 />
    </Router>
  );
  expect(screen.getByText('Esta Url no existe o no está disponible')).toBeInstanceOf(Node);
});

  