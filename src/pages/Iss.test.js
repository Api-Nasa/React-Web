
/* importaciones necesarias para este test */
import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import { render } from '@testing-library/react';
import Iss from './Iss';

/* probamos instantanea o snapshot */


test('react component snapshot', () => {
  const view = render(
    <Router>
      <Iss/>
    </Router>,
  );
  expect(view).toMatchSnapshot();
});


  