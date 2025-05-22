import axios from "axios";

const MOVIES_URL = "https://api.tvmaze.com/shows";

const getAllMoviesWS = () => {
  return axios.get(MOVIES_URL);
};

export default getAllMoviesWS;
