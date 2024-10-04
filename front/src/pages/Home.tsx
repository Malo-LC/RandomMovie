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
    <div className="h-screen bg-black text-white flex flex-col items-center">
      <h1 className="text-9xl my-12">Accueil</h1>
      <div className="flex flex-wrap justify-center w-full">
        <div className="w-full">
          <div className="text-3xl my-3 text-center">Derniers films :</div>
          <div className="flex flex-row flex-wrap items-center justify-center">
            {recentMovies.map((movie) => (
              <div
                key={movie.id}
                className="flex h-[450px] p-5 flex-col items-center cursor-pointer border"
                onClick={() => navigate(`${MOVIES}/${movie.id}`)}
              >
                <img
                  className="max-w-[250px] pb-4 rounded-lg"
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
