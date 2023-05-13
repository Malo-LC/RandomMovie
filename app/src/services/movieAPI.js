import axios from "axios";

class API {
  constructor() {
    this.endpoint = process.env.REACT_APP_API_URL;
  }

  getRandomFilmId() {
    return axios.get(`${this.endpoint}/film/randomId`);
  }

  getRandomActorId() {
    return axios.get(`${this.endpoint}/acteur/randomId`);
  }

  getMovieDbId(type, id, detail = "") {
    return axios.get(`${this.endpoint}/movie-db/${id}?type=${type}&detail=${detail}`);
  }
  getSearch(search) {
    return axios.get(`${this.endpoint}/movie-db/search?search=${search}`);
  }
  async getRoute(type, detail) {
    return axios.get(`${this.endpoint}/movie-db/route?type=${type}&detail=${detail}`);
  }
}

export default new API();
