import { React, useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../../../front/src/services/MovieAPI";

export function Film() {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [credits, setCredits] = useState(null);
  const [similmar, setSimilar] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getFilmInfo = async () => {
    try {
      setLoading(true);
      const res = await API.fetchMovieById("movie", id);
      setFilm(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const getCreditsFilm = async () => {
    const res = await API.fetchMovieById("movie", film.id, "/credits");
    setCredits(res.data);
  };
  const getSimilarFilms = async () => {
    const res = await API.fetchMovieById("movie", film.id, "/similar");
    setSimilar(res.data);
  };

  useEffect(() => {
    setFilm(null);
    getFilmInfo();
  }, [id]);

  useEffect(() => {
    if (!film) return;
    getCreditsFilm();
    getSimilarFilms();
  }, [film]);

  function getReal(key) {
    const real = credits.crew.find((element) => element.job === "Director");
    return real ? real[key] : "NoReal";
  }

  function runtimeToHour(minutes) {
    const hours = Math.floor(minutes / 60);
    const min = minutes % 60;
    return `${hours}h ${min}min`;
  }

  return (
    <div className="w-screen h-max flex flex-col items-center p-10 pt-6">
      {film ? (
        <div className="flex border rounded-lg w-10/12 m-2 text-white">
          <div className="mt-5">
            <img className="max-w-xs m-4 rounded-lg" src={`https://image.tmdb.org/t/p/original${film.poster_path}`} alt="Poster du film" />
          </div>
          <div className="w-full">
            <div className="flex flex-row items-center p-0">
              <a href={`https://www.imdb.com/title/${film.imdb_id}`} target="_blank" rel="noreferrer">
                <h1 className="p-4 text-5xl">{film.title}</h1>
              </a>
              <p className="p-4">{Math.round(film.vote_average * 100) / 100}⭐</p>
            </div>
            <p className="pl-4">
              {film.release_date?.slice([0], [4])}&ensp; &ensp;{runtimeToHour(film.runtime)}
            </p>
            <div>
              {credits?.crew && (
                <div className="flex flex-row items-center pb-0">
                  <p className="p-4 pb-1">
                    <strong className="underline">Réalisateur:</strong> {getReal("name")}
                  </p>
                  {getReal("profile_path") && <img src={`https://image.tmdb.org/t/p/original${getReal("profile_path")}`} className="w-7" alt="Réalisateur" />}
                </div>
              )}
              <div className="p-4 pt-0 flex pb-1">
                <p className="underline font-bold">Genres: </p>
                {film.genres.map((genre) => {
                  return <p key={genre.id}> &ensp;{genre.name}</p>;
                })}
              </div>
              <p className="p-4">{film.overview}</p>
              {credits?.cast && (
                <div className="flex flex-row flex-wrap pl-4">
                  {credits.cast.slice([0], [10]).map((acteur) => {
                    if (acteur.profile_path) {
                      return (
                        <div className="flex flex-col items-center m-2" key={acteur.id}>
                          <Link to={`/acteur/${acteur.id}`}>
                            <img src={`https://image.tmdb.org/t/p/original${acteur.profile_path}`} className="w-24 rounded" alt="acteur" />
                          </Link>
                          <p className="text-xs overflow-hidden">{acteur.name}</p>
                        </div>
                      );
                    } else return <div key={acteur.id} />;
                  })}
                </div>
              )}
            </div>
            {similmar?.results && (
              <>
                <p className="underline font-bold pl-4">Recommandations:</p>
                <div className="flex flex-row flex-wrap mt-1">
                  {similmar.results.slice([0], [6]).map((filmSim) => {
                    if (filmSim.backdrop_path) {
                      return (
                        <div className="flex flex-col items-center w-2/12 mb-3 " key={filmSim.id}>
                          <img
                            src={`https://image.tmdb.org/t/p/original${filmSim.backdrop_path}`}
                            className="w-24 rounded cursor-pointer"
                            alt="acteur"
                            onClick={() => navigate(`/film/${filmSim.id}`)}
                          />
                          <p className="text-xs overflow-hidden">{filmSim.title}</p>
                        </div>
                      );
                    }
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <>{loading ? <h1 className="text-5xl text-white">Chargement...</h1> : <h1 className="text-5xl text-white">Aucun Film...</h1>}</>
      )}
    </div>
  );
}
