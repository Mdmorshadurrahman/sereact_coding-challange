import React from 'react';
import { NavLink, createBrowserRouter } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import Sphere from '../Pages/Sphere/Sphere';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/sphere',
    element: <Sphere />,
  },
  {
    path: '/*',
    element: (
      <div className="min-h-screen bg-black text-white flex justify-center items-center font-bold text-5xl">
        Sorry, You are in dead-end! Go to -{'>'}{' '}
        <NavLink
          to={'/'}
          className="text-red-500 bg-white hover:text-green-500 p-2 rounded-md"
        >
          Home
        </NavLink>
      </div>
    ),
  },
]);
export default Router;
