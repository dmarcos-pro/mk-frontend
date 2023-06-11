import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Ads from './containers/ads';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Ads />,
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
