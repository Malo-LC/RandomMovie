import ky from 'ky';
import { Movie } from '../types/MovieTypes.ts';

class API {
  private readonly api = ky.create({ prefixUrl: import.meta.env.VITE_API_ENDPOINT });

  constructor() {
  }

  getRandomFilmId() {
    return this.api.get(`film/randomId`).json();
  }

  getRandomActorId() {
    return this.api.get(`acteur/randomId`).json();
  }

  getMovieDbId(type: string, id: string, detail = '') {
    return this.api.get(`movie-db/${id}?type=${type}&detail=${detail}`).json();
  }

  getSearch(search: string) {
    return this.api.get(`movie-db/search?search=${search}`).json();
  }

  getRoute(type: string, detail: string) {
    return this.api.get<Movie[]>(`movie-db/route?type=${type}&detail=${detail}`).json();
  }
}

export default new API();
