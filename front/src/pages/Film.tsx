import dayjs from 'dayjs';
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/MovieAPI";
import { CrewType, MovieCreditsType, MovieDetailType, MovieType } from '../types/MovieTypes.ts';
import { MOVIES } from '../types/Routes.ts';

export default function Film() {
  const { id } = useParams();
  const [film, setFilm] = useState<MovieDetailType | undefined>();
  const [credits, setCredits] = useState<MovieCreditsType | undefined>();
  const [similar, setSimilar] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    api.fetchMovieById(id)
      .then((film) => {
        setFilm(film);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    api.fetchMovieCredits(id).then(setCredits);
    api.fetchSimilarMovies(id).then(setSimilar);
  }, [id]);

  function getReal(key: keyof CrewType) {
    const real: CrewType | undefined = credits?.crew.find((crewMember) => crewMember.job === "Director");
    return real ? real[key] : "not found";
  }

  const runtimeToHour = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const min = minutes % 60;
    return `${hours}h ${min}min`;
  }

  return (
    <div className="w-screen h-max flex flex-col items-center p-10 pt-6">
      {film ? (
        <div className="flex border rounded-lg w-10/12 m-2 text-white">
          <div className="mt-5">
            <img
              className="max-w-xs m-4 rounded-lg"
              src={`https://image.tmdb.org/t/p/original${film.poster_path}`}
              alt="Poster du film"
            />
          </div>
          <div className="w-full">
            <div className="flex flex-row items-center p-0">
              <a href={`https://www.imdb.com/title/${film.imdb_id}`} target="_blank" rel="noreferrer">
                <h1 className="p-4 text-5xl">{film.title}</h1>
              </a>
              <p className="p-4">{Math.round(film.vote_average * 100) / 100}⭐</p>
            </div>
            <p className="pl-4">
              {dayjs(film.release_date).year()} {runtimeToHour(film.runtime)}
            </p>
            <div>
              {credits?.crew && (
                <div className="flex flex-row items-center pb-0">
                  <p className="p-4 pb-1">
                    <strong className="underline">Réalisateur:</strong> {getReal("name")}
                  </p>
                  {
                    getReal("profile_path")
                    && (
                      <img
                        src={`https://image.tmdb.org/t/p/original${getReal("profile_path")}`}
                        className="w-7"
                        alt="Réalisateur" />
                    )
                  }
                </div>
              )}
              <div className="p-4 pt-0 flex pb-1">
                <p className="underline font-bold">Genres: </p>
                {film.genres.map((genre) => {
                  return <p key={genre.id}> &ensp;{genre.name}</p>;
                })}
              </div>
              <p className="p-4">{film.overview}</p>
              <div className="flex flex-row flex-wrap pl-4">
                {
                  credits?.cast.slice(0, 10).map((acteur) => (
                      <div className="flex flex-col items-center m-2" key={acteur.id}>
                        <Link to={`/acteur/${acteur.id}`}>
                          <img
                            src={`https://image.tmdb.org/t/p/original${acteur.profile_path}`}
                            className="w-24 rounded" alt="acteur"
                          />
                        </Link>
                        <p className="text-xs overflow-hidden">{acteur.name}</p>
                      </div>
                    )
                  )
                }
              </div>
            </div>
            <>
              <p className="underline font-bold pl-4">Recommandations:</p>
              <div className="flex flex-row flex-wrap mt-1">
                {
                  similar.slice(0, 6).map((similarMovie) => (
                      <Link
                        className="flex flex-col items-center w-2/12 mb-3 "
                        key={similarMovie.id}
                        to={`${MOVIES}/${similarMovie.id}`}
                      >
                        <img
                          src={`https://image.tmdb.org/t/p/original${similarMovie.backdrop_path}`}
                          className="w-24 rounded cursor-pointer"
                          alt="acteur"
                        />
                        <p className="text-xs overflow-hidden">{similarMovie.title}</p>
                      </Link>
                    )
                  )}
              </div>
            </>
          </div>
        </div>
      ) : (
        <>
          {
            loading
              ? <h1 className="text-5xl text-white">Chargement...</h1>
              : <h1 className="text-5xl text-white">Aucun Film...</h1>
          }
        </>
      )}
    </div>
  );
}
