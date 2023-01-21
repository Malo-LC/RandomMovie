import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/movieAPI";

export function Search() {
  const [search, setSearch] = useState(null);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  async function getSearch() {
    try {
      const res = await API.getSearch(search);
      setResult(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (search) {
      getSearch();
    } else {
      setResult(null);
    }
  }, [search]);

  return (
    <div className="bg-slate-500 w-40 m-5 mb-0 text-white">
      <input
        onChange={(e) => setSearch(e.target.value)}
        value={search || ""}
        placeholder="Rechercher un film..."
        className="bg-black focus:outline-none border-b w-40 border-white"
        type="text"
      />
      {result?.results && (
        <div className="absolute">
          {result.results.slice([0], [4]).map((film) => {
            if (film.poster_path) {
              return (
                <div
                  key={film.id}
                  className="flex flex-row w-80 text-white border cursor-pointer bg-black"
                  onClick={() => {
                    navigate(`/film/${film.id}`);
                    setSearch(null);
                  }}>
                  <img src={`https://image.tmdb.org/t/p/original${film.poster_path}`} alt="poster" className="w-12" />
                  <p>{film.title}</p>
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
}
