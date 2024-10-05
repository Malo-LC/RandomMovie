import ky from 'ky';
import { ActorCreditsType, ActorType, RandomIdType } from '../types/MovieTypes.ts';

class API {
  private readonly api = ky.create({ prefixUrl: import.meta.env.VITE_API_ENDPOINT + 'persons/' });

  constructor() {}

  getRandomActorId() {
    return this.api.get<RandomIdType>(`random-id`).json();
  }

  fetchActorById(id: string) {
    return this.api.get<ActorType>(`${id}`).json();
  }

  fetchActorCredits(id: string) {
    return this.api.get<ActorCreditsType>(`${id}/movie-credits`).json();
  }
}

export default new API();
