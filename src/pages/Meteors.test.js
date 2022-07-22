
/* importaciones necesarias para este test */
import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import Meteors from './Meteors';

/* comprobaremos si un nodo del dom contiene */
/* la propiedad esperada (type) y el titulo solicitado */

test('el boton ha de coincidir con su tipo', () => {
  const probar = () => (
    <button >    
    </button>
  );
  render(
    <Router>
      <Meteors />
    </Router>,
  );
  const node = screen.getByText('Get started for discover').closest("button");

  expect(node).toHaveProperty('type', 'button');
});

  