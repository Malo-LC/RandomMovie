import axios from "axios";
import { React, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export function Acteur() {
  const { id } = useParams();

  const key = process.env.REACT_APP_API_KEY;

  const [acteur, setActeur] = useState("");
  const [credits, setCredits] = useState("");
  const [randomNumber, setRandomNumber] = useState(id);
  const navigate = useNavigate();

  useEffect(() => {
    setRandomNumber(id);
  }, [id]);
  useEffect(() => {
    async function getActeurInfo() {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/person/${randomNumber}?api_key=${key}&language=fr`
        );
        setActeur(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getActeurInfo();
  }, [randomNumber]);

  useEffect(() => {
    async function getCreditsActor() {
      const res = await axios.get(
        `https://api.themoviedb.org/3/person/${acteur.id}/movie_credits?api_key=${key}&language=fr`
      );
      setCredits(res.data);
    }

    if (acteur.id !== undefined) {
      getCreditsActor();
    }
  }, [acteur]);

  return (
    <div className=" w-screen h-screen flex flex-col items-center p-10 pt-6">
      {acteur.length !== 0 ? (
        <div className="grid grid-cols-3 place-items-center place-content-between border rounded  w-10/12 m-2 text-white">
          <img
            className="max-w-xs m-4 h-auto w-auto block"
            src={`https://image.tmdb.org/t/p/original${acteur.profile_path}`}
            alt="Acteur"
          />
          <div className=" w-full col-span-2">
            <div className="flex flex-row items-center p-0">
              <a
                href={`https://www.imdb.com/name/${acteur.imdb_id}`}
                target="_blank"
                rel="noreferrer"
              >
                <h1 className="p-4 text-7xl">{acteur.name}</h1>
              </a>

              <p className="p-4">
                {Math.round(acteur.popularity * 100) / 100}📈
              </p>
            </div>
            <p className="pl-4 flex flex-row">
              <span className="underline font-bold">Né le: </span>&ensp;
              {acteur.birthday}
            </p>
            <p className="p-4">{acteur.biography}</p>

            {credits.cast && (
              <>
                <p key={credits.id} className="underline font-bold pl-4">
                  Connu pour:{" "}
                </p>
                &ensp;
                <div className="flex flex-row">
                  {credits.cast.slice([0], [10]).map((film) => {
                    if (film.backdrop_path) {
                      return (
                        <div
                          className="flex flex-col items-center w-2/12 mb-3 "
                          key={film.id}
                        >
                          <img
                            src={`https://image.tmdb.org/t/p/original${film.backdrop_path}`}
                            className="w-24 rounded cursor-pointer"
                            alt="acteur"
                            onClick={() => {
                              navigate(`/film/${film.id}`);
                            }}
                          />
                          <p className=" text-xs overflow-hidden">
                            {film.title}
                          </p>
                        </div>
                      );
                    } else {
                      return <div key={film.id} />;
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
  );
}
