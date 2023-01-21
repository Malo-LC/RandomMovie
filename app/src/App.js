import { React } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Film } from "./Components/Film";
import { Acteur } from "./Components/Acteur";
import { Navbar } from "./Components/navbar";
import { Home } from "./Components/Home";

function App() {
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
