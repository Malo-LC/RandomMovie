import { React } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Film } from './Film';
import { Acteur } from './Acteur';

function App() {
  function Home() {
    return (
      <div>
        <h1>Acceuil</h1>
        <Link to={`/film/550`}>
          <h1>Film</h1>
        </Link>
      </div>
    );
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/film/:id" element={<Film />} />
        <Route path="/acteur/:id" element={<Acteur />} />
      </Routes>
    </Router>
  );
}

export default App;
