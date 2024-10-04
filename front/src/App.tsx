import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Movie from './pages/Film.tsx';
import Home from './pages/Home.tsx';
import { MOVIES } from './types/Routes.ts';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: `${MOVIES}/:id`,
      element: <Movie />,
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
