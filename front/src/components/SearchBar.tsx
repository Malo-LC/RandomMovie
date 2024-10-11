import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import moviesService from '../services/MoviesService.ts';
import { MovieType } from '../types/MovieTypes.ts';
import { MOVIES } from '../types/Routes.ts';

export default function SearchBar() {
  const [search, setSearch] = useState('');
  const [result, setResult] = useState<MovieType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // debounce
    const timeout = setTimeout(() => {
      if (search) {
        moviesService.getSearch(search).then(setResult);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div className="m-5 mb-0 w-40 bg-slate-500 text-white">
      <input
        onChange={(e) => setSearch(e.target.value)}
        value={search || ''}
        placeholder="Rechercher un film..."
        className="w-40 border-b border-white bg-black focus:outline-none"
        type="text"
      />
      <div className="absolute">
        {result.slice(0, 6).map((film) => (
          <div
            key={film.id}
            className="flex w-80 cursor-pointer flex-row border bg-black text-white"
            onClick={() => {
              navigate(`${MOVIES}/${film.id}`);
              setSearch('');
              setResult([]);
            }}
          >
            <img src={`https://image.tmdb.org/t/p/original${film.poster_path}`} alt="poster" className="w-12" />
            <p>{film.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
