import { useNavigate } from 'react-router-dom';
import movieService from '../services/MoviesService.ts';
import personsService from '../services/PersonsService.ts';
import { ACTORS, MOVIES } from '../types/Routes.ts';

export function Navbar() {
  const navigate = useNavigate();

  async function getRandomFilmId() {
    movieService.getRandomFilmId().then((response) => navigate(`${MOVIES}/${response.randomId}`));
  }

  async function getRandomActorId() {
    personsService.getRandomActorId().then((response) => navigate(`${ACTORS}/${response.randomId}`));
  }

  return (
    <div className="flex w-screen flex-row items-center justify-center bg-black">
      <button type="button" onClick={() => navigate('/')} className="m-5 mb-0 w-40 bg-slate-500">
        Accueil
      </button>
      <button type="button" onClick={() => getRandomFilmId()} className="m-5 mb-0 w-40 bg-slate-500">
        Film au hasard
      </button>
      <button type="button" onClick={() => getRandomActorId()} className="m-5 mb-0 w-40 bg-slate-500">
        Acteur au hasard
      </button>
      {/*<Search />*/}
    </div>
  );
}
