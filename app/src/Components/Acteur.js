import { React, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../../front/src/services/MoviesService";
import { RiLoader2Line } from "react-icons/ri";

export function Acteur() {
  const { id } = useParams();
  const [acteur, setActeur] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function getActeurInfo() {
    try {
      const res = await API.fetchMovieById("person", id);
      setActeur(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getCreditsActor() {
    setLoading(true);
    const res = await API.fetchMovieById("person", acteur.id, "/movie_credits");
    setCredits(res.data);
    setLoading(false);
  }
  useEffect(() => {
    setActeur(null);
    getActeurInfo();
  }, [id]);

  useEffect(() => {
    if (!acteur) return;
    getCreditsActor();
  }, [acteur]);

  return (
    <div className="w-screen h-max flex flex-col items-center p-10 pt-6">
      {acteur ? (
        <div className="flex border rounded-lg w-10/12 m-2 text-white">
          <div>
            <img className="max-w-xs m-4 rounded-lg" src={`https://image.tmdb.org/t/p/original${acteur.profile_path}`} alt="Acteur" />
          </div>
          <div className=" w-full col-span-2">
            <div className="flex flex-row items-center p-0">
              <a href={`https://www.imdb.com/name/${acteur.imdb_id}`} target="_blank" rel="noreferrer">
                <h1 className="p-4 text-5xl">{acteur.name}</h1>
              </a>
              <p className="p-4">{Math.round(acteur.popularity * 100) / 100}📈</p>
            </div>
            <p className="pl-4 flex flex-row">
              <span className="underline font-bold">Né le: </span>&ensp;
              {acteur.birthday}
            </p>
            <p className="p-4">{acteur.biography}</p>
            {credits?.cast && (
              <>
                <p className="underline font-bold p-4">Connu pour:</p>
                <div className="flex flex-row flex-wrap">
                  {credits.cast.slice([0], [10]).map((film) => {
                    if (film.backdrop_path) {
                      return (
                        <div className="flex flex-col items-center w-2/12 mb-3 " key={film.id}>
                          <img
                            src={`https://image.tmdb.org/t/p/original${film.backdrop_path}`}
                            className="w-24 rounded cursor-pointer"
                            alt="acteur"
                            onClick={() => navigate(`/film/${film.id}`)}
                          />
                          <p className=" text-xs overflow-hidden">{film.title}</p>
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
        <>
          {loading ? (
            <div>
              <h1 className="text-5xl text-white">Chargement...</h1>
              <RiLoader2Line className="animate-spin text-5xl text-white" />
            </div>
          ) : (
            <h1 className="text-5xl text-white">Aucun Acteur...</h1>
          )}
        </>
      )}
    </div>
  );
}
