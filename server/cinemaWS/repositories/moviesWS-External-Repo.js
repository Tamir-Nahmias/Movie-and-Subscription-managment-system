import axios from "axios";

const MOVIES_URL = "http://localhost:5000/movies";

const getAllMovies = (filters) => {
  return axios.get(MOVIES_URL, {
    params: filters,
  });
};

const getUnWatchedMoviesByMemberID = (id) => {
  return axios.get(`${MOVIES_URL}/unwatched-movies/${id}`);
};

const addMovie = (movie) => {
  return axios.post(MOVIES_URL, movie);
};

const getMovieByID = (id) => {
  return axios.get(`${MOVIES_URL}/${id}`);
};

const updateMovieById = (id, obj) => {
  return axios.put(`${MOVIES_URL}/${id}`, obj);
};

const getMoviesJoinSubs = () => {
  return axios.get(`${MOVIES_URL}/join-subscriptions`);
};

export {
  getAllMovies,
  addMovie,
  getMovieByID,
  updateMovieById,
  getUnWatchedMoviesByMemberID,
  getMoviesJoinSubs,
};
