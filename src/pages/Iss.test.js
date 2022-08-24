/* importaciones necesarias para este test */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import Meteors from './Meteors';
import Iss from './Iss';

/* comprobaremos si un nodo del dom contiene un texto*/


test('el boton ha de coincidir con su tipo', () => {
  const probar = () => <button></button>;
  render(
    <Router>
      <Iss />
    </Router>,
  );
  expect(
    screen.getByText(
      'Discover the real-time location of the international space station',
    ),
  ).toBeInstanceOf(Node);
});
