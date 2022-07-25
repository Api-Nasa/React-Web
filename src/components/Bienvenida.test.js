
/* importaciones necesarias para este test */
import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import Bienvenida from './Bienvenida';

/* comprobaremos si renderiza bien */
/* utilizando el titulo solicitado */

test('probrando renderizado', async () => {
  render(
    <Router>
      <Bienvenida />
    </Router>
  );

  const title = screen.getByText(/React project to interact with Nasa APIs data/);
  expect(title).toBeInTheDocument();
});

 
  