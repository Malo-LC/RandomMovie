import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../services/MoviesService.ts';
import { CrewType, MovieCreditsType, MovieDetailType, MovieType } from '../types/MovieTypes.ts';
import { ACTORS, MOVIES } from '../types/Routes.ts';

export default function Film() {
  const { id } = useParams();
  const [film, setFilm] = useState<MovieDetailType | undefined>();
  const [credits, setCredits] = useState<MovieCreditsType | undefined>();
  const [similar, setSimilar] = useState<MovieType[]>([]);

  useEffect(() => {
    if (!id) return;
    api.fetchMovieById(id).then(setFilm);
    api.fetchMovieCredits(id).then(setCredits);
    api.fetchSimilarMovies(id).then(setSimilar);
  }, [id]);

  function getReal(key: keyof CrewType) {
    const real: CrewType | undefined = credits?.crew.find((crewMember) => crewMember.job === 'Director');
    return real ? real[key] : 'not found';
  }

  const runtimeToHour = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const min = minutes % 60;
    return `${hours}h ${min}min`;
  };

  if (!film) return <div>Chargement...</div>;

  return (
    <div className="flex h-screen w-screen flex-col items-center p-6">
      <div className="m-2 flex h-full w-10/12 rounded-lg border text-white">
        <img
          className="h-full rounded-lg object-contain p-4"
          src={`https://image.tmdb.org/t/p/original${film.poster_path}`}
          alt="Poster du film"
        />
        <div className="w-full overflow-y-scroll">
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
                  <strong className="underline">Réalisateur:</strong> {getReal('name')}
                </p>
                <img
                  src={`https://image.tmdb.org/t/p/original${getReal('profile_path')}`}
                  className="w-7"
                  alt="Réalisateur"
                />
              </div>
            )}
            <div className="flex p-4 pb-1 pt-0">
              <p className="font-bold underline">Genres: </p>
              {film.genres.map((genre) => {
                return <p key={genre.id}> &ensp;{genre.name}</p>;
              })}
            </div>
            <p className="p-4">{film.overview}</p>
            <div className="flex flex-row flex-wrap pl-4">
              {credits?.cast.slice(0, 10).map((acteur) => (
                <div className="m-2 flex flex-col items-center" key={acteur.id}>
                  <Link to={`${ACTORS}/${acteur.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/original${acteur.profile_path}`}
                      className="w-24 rounded"
                      alt="acteur"
                    />
                  </Link>
                  <p className="overflow-hidden text-xs">{acteur.name}</p>
                </div>
              ))}
            </div>
          </div>
          <>
            <p className="pl-4 font-bold underline">Recommandations:</p>
            <div className="mt-1 flex flex-row flex-wrap">
              {similar.slice(0, 6).map((similarMovie) => (
                <Link
                  className="mb-3 flex w-2/12 flex-col items-center"
                  key={similarMovie.id}
                  to={`${MOVIES}/${similarMovie.id}`}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original${similarMovie.backdrop_path}`}
                    className="w-24 cursor-pointer rounded"
                    alt="acteur"
                  />
                  <p className="overflow-hidden text-xs">{similarMovie.title}</p>
                </Link>
              ))}
            </div>
          </>
        </div>
      </div>
    </div>
  );
}
