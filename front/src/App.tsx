import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Movie from './pages/Film.tsx';
import Home from './pages/Home.tsx';
import Actor from './pages/Actor.tsx';
import { MOVIES, ACTORS } from './types/Routes.ts';

function App() {
  const router = createBrowserRouter([
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
  ]);

  return <RouterProvider router={router} />;
}

export default App;
