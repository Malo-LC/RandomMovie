import ky from 'ky';
import { ActorCreditsType, ActorType, MovieCreditsType, MovieDetailType, MovieType } from '../types/MovieTypes.ts';

class API {
  private readonly api = ky.create({ prefixUrl: import.meta.env.VITE_API_ENDPOINT });

  constructor() {}

  getRandomFilmId() {
    return this.api.get(`film/randomId`).json();
  }

  getRandomActorId() {
    return this.api.get(`acteur/randomId`).json();
  }

  fetchMovieById(id: string) {
    return this.api.get<MovieDetailType>(`movie-db/${id}`).json();
  }

  fetchMovieCredits(id: string) {
    return this.api.get<MovieCreditsType>(`movie-db/${id}/credits`).json();
  }

  fetchSimilarMovies(id: string) {
    return this.api.get<MovieType[]>(`movie-db/${id}/similar`).json();
  }

  fetchActorById(id: string) {
    return this.api.get<ActorType>(`movie-db/person/${id}`).json();
  }

  fetchActorCredits(id: string) {
    return this.api.get<ActorCreditsType>(`movie-db/person/${id}/movie-credits`).json();
  }

  getSearch(search: string) {
    return this.api.get(`movie-db/search?search=${search}`).json();
  }

  getCustomRoute(type: string, detail: string) {
    return this.api.get<MovieType[]>(`movie-db/route?type=${type}&detail=${detail}`).json();
  }
}

export default new API();
