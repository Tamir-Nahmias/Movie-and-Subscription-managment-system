import axios from "axios";

const MOVIES_URL = "http://localhost:5000/movies";

const getAllMovies = () => {
  return axios.get(MOVIES_URL);
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

export { getAllMovies, addMovie, getMovieByID, updateMovieById };
