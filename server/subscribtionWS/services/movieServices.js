import getAllMoviesWS from "../repositories/moviesWS-Repo.js";
import {
  addManyMovies,
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
} from "../repositories/moviesDB-Repo.js";
import { getAllSubscriptions } from "./subscriptionsServices.js";

const setMoviesOnInit = async () => {
  const { data } = await getAllMoviesWS();
  const movies = data.map((movie) => {
    return {
      name: movie.name,
      genres: movie.genres,
      premiered: movie.premiered,
      image: movie.image.original,
    };
  });
  return addManyMovies(movies);
};

const getMovies = () => {
  return getAllMovies();
};
const getUnWatchedMoviesByMemberID = async (filters) => {
  const movies = await getAllMovies();
  const memberSubscriptions = await getAllSubscriptions(filters);
  const filteredMovies = memberSubscriptions.map((sub) => {
    return sub.movies?.movieID;
  });
  return movies.filter((movie) => !filteredMovies.includes(movie._id));
};

const AddMovieDB = (movie) => {
  return createMovie(movie);
};

const getMovieByIDdb = async (id) => {
  return await getMovieById(id);
};

const updateMovieByIdDB = async (id, obj) => {
  return await updateMovie(id, obj);
};

export {
  setMoviesOnInit,
  getMovies,
  AddMovieDB,
  getMovieByIDdb,
  updateMovieByIdDB,
  getUnWatchedMoviesByMemberID,
};
