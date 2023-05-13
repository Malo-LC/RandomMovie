import React, { useState, useEffect } from "react";
import API from "../services/movieAPI";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();
  const [nowPlaying, setNowPlaying] = useState(null);
  const [Loading, setLoading] = useState(false);

  const getLatestMovies = async () => {
    try {
      setTimeout(() => setLoading(true), 2000);
      const res = await API.getRoute("movie", "now_playing");
      setLoading(false);
      setNowPlaying(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getLatestMovies();
  }, []);

  return (
    <div className="h-screen bg-black text-white flex flex-col items-center">
      <h1 className="text-9xl my-12">Acceuil</h1>
      <div className="flex flex-wrap justify-center w-full">
        {nowPlaying?.results ? (
          <div className="w-full">
            <div className="text-3xl my-3 text-center">Derniers films :</div>
            <div className="flex flex-row flex-wrap items-center justify-center">
              {nowPlaying.results.map((movie) => (
                <div className="flex h-[450px] p-5 flex-col items-center cursor-pointer border" onClick={() => navigate(`/film/${movie.id}`)}>
                  <img className="max-w-[250px] pb-4 rounded-lg" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="" />
                  <h3 className="text-2xl">{movie.title}</h3>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <h3 className="text-2xl">Loading...</h3>
            {Loading && <div className="mt-5">First loading can take some time, due to server starting</div>}
          </div>
        )}
      </div>
    </div>
  );
}
