import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Film } from './Components/Film';
import { Acteur } from './Components/Acteur';
import { Navbar } from './Components/navbar';
import { ENDPOINT } from './config';
import axios from 'axios';

function App() {
  const [FilmId, setFilmId] = useState(0);
  useEffect(() => {
    try {
      axios.get(`${ENDPOINT}/film/randomId`).then((res) => {
        setFilmId(res.data);
      });
    } catch (error) {
      throw error;
    }
  }, []);

  function Home() {
    return (
      <div className=" h-screen bg-black text-white flex flex-col items-center">
        <h1 className=" text-9xl">Acceuil</h1>
        <Link to={`/film/${FilmId}`}>
          <h1 className=" text-6xl p-10">Film au hasard</h1>
        </Link>
        <Link to={`/film/`}>
          <h1 className=" text-6xl p-10">Acteur au hasard</h1>
        </Link>
      </div>
    );
  }
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/film/:id" element={<Film />} />
        <Route path="/acteur/:id" element={<Acteur />} />
      </Routes>
    </Router>
  );
}

export default App;
