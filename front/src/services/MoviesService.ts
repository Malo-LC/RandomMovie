import ky from 'ky';
import { MovieCreditsType, MovieDetailType, MovieType, RandomIdType } from '../types/MovieTypes.ts';

class API {
  private readonly api = ky.create({ prefixUrl: import.meta.env.VITE_API_ENDPOINT + 'movies/' });

  constructor() {}

  getRandomFilmId() {
    return this.api.get<RandomIdType>(`random-id`).json();
  }

  fetchMovieById(id: string) {
    return this.api.get<MovieDetailType>(`${id}`).json();
  }

  fetchMovieCredits(id: string) {
    return this.api.get<MovieCreditsType>(`${id}/credits`).json();
  }

  fetchSimilarMovies(id: string) {
    return this.api.get<MovieType[]>(`${id}/similar`).json();
  }

  getSearch(search: string) {
    return this.api.get<MovieType[]>(`search?search=${search}`).json();
  }

  getNowPlaying() {
    return this.api.get<MovieType[]>(`now-playing`).json();
  }
}

export default new API();
