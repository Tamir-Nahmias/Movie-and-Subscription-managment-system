import {
  addMovie as addMovieRepo,
  getMovieByID,
  getAllMovies as getMovies,
  getMoviesJoinSubs,
  getUnWatchedMoviesByMemberID,
  updateMovieById,
} from "../repositories/moviesWS-External-Repo.js";

const getAllMovies = async (filters) => {
  const { data } = await getMovies(filters);
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

const getUnwatchedMovies = async (id) => {
  const { data } = await getUnWatchedMoviesByMemberID(id);
  return data;
};

const getMoviesJoinedSubscriptions = () => {
  return getMoviesJoinSubs();
};

export {
  getAllMovies,
  addMovie,
  getMovieByIDService,
  updateMovie,
  getUnwatchedMovies,
  getMoviesJoinedSubscriptions,
};
