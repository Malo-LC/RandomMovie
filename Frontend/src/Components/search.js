import axios from 'axios';
import { React, useState, useEffect } from 'react';
import { key } from '../config';
import { useNavigate } from 'react-router-dom';

export function Search() {
  const [search, setSearch] = useState('');
  const [result, setResult] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function getSearch() {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=fr&query=${search}&page=1`
        );
        setResult(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    if (search) {
      getSearch();
    } else {
      setResult('');
    }
  }, [search]);

  return (
    <div className="bg-black w-40  flex flex-col items-center  m-5 mb-0 text-white">
      <input
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        value={search}
        placeholder="Rechercher un film..."
        className=" bg-inherit focus:outline-none border-b "
        type="text"
      />
      {result.results && (
        <div className=" absolute mt-10">
          {result.results.slice([0], [4]).map((film) => {
            if (film.poster_path) {
              return (
                <div
                  key={film.id}
                  className="flex flex-row w-80 text-white border cursor-pointer bg-black"
                  onClick={() => {
                    navigate(`/film/${film.id}`);
                    setSearch('');
                  }}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original${film.poster_path}`}
                    alt="poster"
                    className=" w-12"
                  />
                  <p>{film.title}</p>
                </div>
              );
            } else return <div key={film.id} />;
          })}
        </div>
      )}
    </div>
  );
}
