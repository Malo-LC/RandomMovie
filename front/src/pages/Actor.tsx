import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/PersonsService.ts';
import { ActorCreditsType, ActorType } from '../types/MovieTypes.ts';
import { MOVIES } from '../types/Routes.ts';

export default function Actor() {
  const { id } = useParams();
  const [acteur, setActeur] = useState<ActorType | undefined>();
  const [credits, setCredits] = useState<ActorCreditsType>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    api.fetchActorById(id).then(setActeur);
    api.fetchActorCredits(id).then(setCredits);
  }, [id]);

  if (!acteur) return <div>Chargement...</div>;

  return (
    <div className="m-2 mx-auto flex w-10/12 flex-grow rounded-lg border p-6 text-white">
      <img
        className="h-fit w-1/2 rounded-lg object-contain"
        src={`https://image.tmdb.org/t/p/original${acteur.profile_path}`}
        alt="Acteur"
      />
      <div className="col-span-2 w-full">
        <div className="flex flex-row items-center p-0">
          <h1
            onClick={() => window.open(`https://www.imdb.com/name/${acteur.imdb_id}`)}
            className="cursor-pointer p-4 text-5xl"
          >
            {acteur.name}
          </h1>
          <p className="p-4">{Math.round(acteur.popularity * 100) / 100}📈</p>
        </div>
        <p className="flex flex-row pl-4">
          <span className="font-bold underline">Né le: </span>&ensp;
          {acteur.birthday}
        </p>
        <p className="p-4">{acteur.biography}</p>
        <p className="p-4 font-bold underline">Connu pour:</p>
        <div className="flex flex-row flex-wrap">
          {credits?.cast.slice(0, 10).map((film) => (
            <div className="mb-3 flex w-2/12 flex-col items-center" key={film.id}>
              <img
                src={`https://image.tmdb.org/t/p/original${film.backdrop_path}`}
                className="w-24 cursor-pointer rounded"
                alt="acteur"
                onClick={() => navigate(`${MOVIES}/${film.id}`)}
              />
              <p className="overflow-hidden text-xs">{film.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
