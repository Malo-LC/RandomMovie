import axios from 'axios';
import { React, useState, useEffect } from 'react';
import { key } from '../config';
import { useParams, useNavigate, Link } from 'react-router-dom';

export function Film() {
  const { id } = useParams();
  const [film, setFilm] = useState('');
  const [credits, setCredits] = useState('');
  const [randomNumber, setRandomNumber] = useState(useParams().id);
  const [similmar, setSimilar] = useState(useParams().id);
  const navigate = useNavigate();
  useEffect(() => {
    function getFilmInfo() {
      try {
        axios
          .get(
            `https://api.themoviedb.org/3/movie/${randomNumber}?api_key=${key}&language=fr`
          )
          .then((res) => {
            setFilm(res.data);
          });
      } catch (error) {
        console.log(error);
      }
    }
    getFilmInfo();
  }, [randomNumber]);

  useEffect(() => {
    setRandomNumber(id);
  }, [id]);

  useEffect(() => {
    async function getCreditsFilm() {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${film.id}/credits?api_key=${key}&language=fr`
      );
      setCredits(res.data);
    }
    async function getSimilarFilms() {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${film.id}/similar?api_key=${key}&language=fr`
      );
      setSimilar(res.data);
    }
    if (film.id !== undefined) {
      getCreditsFilm();
      getSimilarFilms();
    }
  }, [film]);

  function getReal() {
    for (let i = 0; i < credits.crew.length; i++) {
      if (credits.crew[i].job === 'Director') {
        return credits.crew[i];
      }
    }
    return 'NoReal';
  }

  function runtimeToHour(minutes) {
    let hours = 0;
    while (minutes >= 60) {
      hours++;
      minutes -= 60;
    }
    if (hours === 0) {
      return `${minutes}m`;
    }
    return `${hours}h ${minutes}m`;
  }

  return (
    <div className="bg-black  h-screen">
      <div className="bg-black w-screen h-max flex flex-col items-center p-10 pt-6">
        {film.length !== 0 ? (
          <div className="grid grid-cols-3 place-items-center place-content-between border rounded  w-10/12 m-2 text-white">
            <img
              className=" max-w-md m-4 h-auto w-auto block"
              key={film.id}
              src={`https://image.tmdb.org/t/p/original${film.poster_path}`}
              alt="Poster du film"
            />
            <div className=" w-full col-span-2">
              <div className="flex flex-row items-center p-0">
                <a
                  href={`https://www.imdb.com/title/${film.imdb_id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <h1 className="p-4 text-7xl">{film.title}</h1>
                </a>

                <p className="p-4">
                  {Math.round(film.vote_average * 100) / 100}⭐
                </p>
              </div>
              <p className="pl-4">
                {film.release_date.slice([0], [4])}&ensp; &ensp;
                {runtimeToHour(film.runtime)}
              </p>
              <div>
                {credits.crew && (
                  <div className="flex flex-row items-center pb-0">
                    <p className="p-4 pb-1">
                      <strong className="underline">Réalisateur:</strong>{' '}
                      {getReal().name}{' '}
                    </p>
                    {getReal().profile_path && (
                      <img
                        src={`https://image.tmdb.org/t/p/original${
                          getReal().profile_path
                        }`}
                        className="w-7"
                        alt="Réalisateur"
                      />
                    )}
                  </div>
                )}
                <div className="p-4 pt-0 flex pb-1">
                  <p className="underline font-bold">Genres: </p>
                  {film.genres.map((genre) => {
                    return <p key={genre.id}> &ensp;{genre.name}</p>;
                  })}
                </div>
                <p key={film.id} className="p-4">
                  {film.overview}
                </p>
                {credits.cast && (
                  <div className="flex flex-row flex-wrap pl-4">
                    {credits.cast.slice([0], [10]).map((acteur) => {
                      if (acteur.profile_path) {
                        return (
                          <div
                            className="flex flex-col items-center m-2"
                            key={acteur.id}
                          >
                            <Link to={`/acteur/${acteur.id}`}>
                              <img
                                src={`https://image.tmdb.org/t/p/original${acteur.profile_path}`}
                                className="w-24 rounded"
                                alt="acteur"
                              />
                            </Link>
                            <p className=" text-xs overflow-hidden">
                              {acteur.name}
                            </p>
                          </div>
                        );
                      } else return <div key={acteur.id} />;
                    })}
                  </div>
                )}
              </div>
              {similmar.results && (
                <>
                  <p className="underline font-bold pl-4">Recommandations:</p>
                  <div className="flex flex-row flex-wrap mt-1">
                    {similmar.results.slice([0], [6]).map((filmSim) => {
                      if (filmSim.backdrop_path) {
                        return (
                          <div
                            className="flex flex-col items-center w-2/12 mb-3 "
                            key={filmSim.id}
                          >
                            <img
                              src={`https://image.tmdb.org/t/p/original${filmSim.backdrop_path}`}
                              className="w-24 rounded cursor-pointer"
                              alt="acteur"
                              onClick={() => {
                                navigate(`/film/${filmSim.id}`);
                              }}
                            />
                            <p className=" text-xs overflow-hidden">
                              {filmSim.title}
                            </p>
                          </div>
                        );
                      } else {
                        return <div key={filmSim.id} />;
                      }
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <h1>Aucun film...</h1>
        )}
      </div>
    </div>
  );
}
