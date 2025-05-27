import Movie from "../models/moviesModel.js";

const getAllMovies = (filters = {}) => {
  return Movie.find(filters).lean();
};
const getMovieById = (id) => {
  return Movie.findById(id);
};
const createMovie = async (movieData) => {
  const movie = new Movie(movieData);
  return movie.save();
};
const addManyMovies = async (moviesData) => {
  return Movie.insertMany(moviesData);
};

const updateMovie = (id, movieData) => {
  return Movie.findByIdAndUpdate(id, movieData);
};
const deleteMovie = async (id) => {
  return Movie.findByIdAndDelete(id);
};
export {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  addManyMovies,
};
