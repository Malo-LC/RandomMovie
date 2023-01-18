import axios from "axios";
import { React } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "./search";

export function Navbar() {
  const ENDPOINT = process.env.REACT_APP_API_URL;
  console.log(ENDPOINT);
  const navigate = useNavigate();

  function getRandomFilmId() {
    axios.get(`${ENDPOINT}/film/randomId`).then((res) => {
      navigate(`/film/${res.data}`);
    });
  }

  function getRandomActorId() {
    axios.get(`${ENDPOINT}/acteur/randomId`).then((res) => {
      navigate(`/acteur/${res.data}`);
    });
  }
  return (
    <div className="bg-black flex flex-row items-center w-screen justify-center ">
      <Link to={"/"}>
        <button type="button" className="bg-slate-500 w-40 m-5 mb-0">
          Acceuil
        </button>
      </Link>
      <button
        type="button"
        onClick={() => {
          getRandomFilmId();
        }}
        className="bg-slate-500 w-40 m-5 mb-0"
      >
        Film au hasard
      </button>
      <button
        type="button"
        onClick={() => {
          getRandomActorId();
        }}
        className="bg-slate-500 w-40 m-5 mb-0"
      >
        Acteur au hasard
      </button>

      <Search />
    </div>
  );
}
