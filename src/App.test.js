
import React from 'react';
import App from './App';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';


test('renders react component', async () => {
 render(
   <Router>
     <App />
   </Router>,
 );

  expect(screen.getByRole('button')).toHaveTextContent(
    /Get started for discover/,
  );
 
});
 