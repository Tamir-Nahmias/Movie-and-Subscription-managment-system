import {
  addMovie as addMovieRepo,
  getMovieByID,
  getAllMovies as getMovies,
  updateMovieById,
} from "../repositories/moviesWS-External-Repo.js";

const getAllMovies = async () => {
  const { data } = await getMovies();
  return data;
};

const addMovie = async (movie) => {
  const { data } = await addMovieRepo(movie);
  return data;
};

const getMovieByIDService = async (id) => {
  const { data } = await getMovieByID(id);
  return data;
};

const updateMovie = async (id, obj) => {
  const { data } = await updateMovieById(id, obj);
  return data;
};

export { getAllMovies, addMovie, getMovieByIDService, updateMovie };
