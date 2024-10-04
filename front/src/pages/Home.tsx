import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/MovieAPI';
import { MovieType } from '../types/MovieTypes.ts';
import { MOVIES } from '../types/Routes.ts';

export default function Home() {
  const navigate = useNavigate();
  const [recentMovies, setRecentMovies] = useState<MovieType[]>([]);

  useEffect(() => {
    api.getCustomRoute('movie', 'now_playing').then((movies) => setRecentMovies(movies));
  }, []);

  return (
    <div className="flex h-screen flex-col items-center bg-black text-white">
      <h1 className="my-12 text-9xl">Accueil</h1>
      <div className="flex w-full flex-wrap justify-center">
        <div className="w-full">
          <div className="my-3 text-center text-3xl">Derniers films :</div>
          <div className="flex flex-row flex-wrap items-center justify-center">
            {recentMovies.map((movie) => (
              <div
                key={movie.id}
                className="flex h-[450px] cursor-pointer flex-col items-center border p-5"
                onClick={() => navigate(`${MOVIES}/${movie.id}`)}
              >
                <img
                  className="max-w-[250px] rounded-lg pb-4"
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt=""
                />
                <h3 className="text-2xl">{movie.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
