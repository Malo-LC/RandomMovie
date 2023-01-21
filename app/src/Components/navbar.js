import { React } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "./search";
import API from "../services/movieAPI";

export function Navbar() {
  const navigate = useNavigate();

  async function getRandomFilmId() {
    const res = await API.getRandomFilmId();
    navigate(`/film/${res.data}`);
  }

  async function getRandomActorId() {
    const res = await API.getRandomActorId();
    navigate(`/acteur/${res.data}`);
  }
  return (
    <div className="bg-black flex flex-row items-center w-screen justify-center">
      <button type="button" onClick={() => navigate("/")} className="bg-slate-500 w-40 m-5 mb-0">
        Acceuil
      </button>
      <button type="button" onClick={() => getRandomFilmId()} className="bg-slate-500 w-40 m-5 mb-0">
        Film au hasard
      </button>
      <button type="button" onClick={() => getRandomActorId()} className="bg-slate-500 w-40 m-5 mb-0">
        Acteur au hasard
      </button>
      <Search />
    </div>
  );
}
