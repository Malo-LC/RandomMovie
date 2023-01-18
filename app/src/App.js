import { React } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Film } from "./Components/Film";
import { Acteur } from "./Components/Acteur";
import { Navbar } from "./Components/navbar";

function App() {
  function Home() {
    return (
      <div className=" h-screen bg-black text-white flex flex-col items-center">
        <h1 className=" text-9xl mt-24">Acceuil</h1>
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
