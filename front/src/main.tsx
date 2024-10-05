import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import Actor from './pages/Actor.tsx';
import Movie from './pages/Film.tsx';
import Home from './pages/Home.tsx';
import { ACTORS, MOVIES } from './types/Routes.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: `${MOVIES}/:id`,
        element: <Movie />,
      },
      {
        path: `${ACTORS}/:id`,
        element: <Actor />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />,
);
