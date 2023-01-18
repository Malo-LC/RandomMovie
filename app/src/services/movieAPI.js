import axios from "axios";

class API {
  constructor() {
    this.endpoint = process.env.REACT_APP_API_URL;
    this.key = process.env.REACT_APP_API_KEY;
  }

  getRandomFilmId() {
    return axios.get(`${this.endpoint}/film/randomId`);
  }

  getRandomActorId() {
    return axios.get(`${this.endpoint}/acteur/randomId`);
  }

  getMovieDb(type, randomNumber, details = "") {
    return axios.get(`https://api.themoviedb.org/3/${type}/${randomNumber}${details}?api_key=${this.key}&language=fr`);
  }
}

export default new API();
