import getAllMoviesWS from "../repositories/moviesWS-Repo.js";
import {
  addManyMovies,
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
} from "../repositories/moviesDB-Repo.js";

import { getSubscriptionByMemberFKid } from "../repositories/subscriptionsDB-Repo.js";
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

const getMovies = (filters) => {
  return getAllMovies(filters);
};
const getUnWatchedMoviesByMemberID = async (filters) => {
  const movies = await getAllMovies();
  const memberSubscriptions = await getSubscriptionByMemberFKid(filters);
  const filteredMovies = memberSubscriptions[0].movies?.map(
    (movieOfSubscriber) => movieOfSubscriber.movieID.toString()
  );
  return movies.filter(
    (movie) => !filteredMovies.includes(movie._id.toString())
  );
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

const getMoviesJoinSubscription = async () => {
  try {
    const movies = await getAllMovies(); // Should return an array
    const subscriptions = await getAllSubscriptions(); // Should return an array

    if (!Array.isArray(movies) || !Array.isArray(subscriptions)) {
      console.error("❌ Expected both movies and subscriptions to be arrays.");
      return [];
    }

    console.log("✅ Movies count:", movies.length);
    console.log("✅ Subscriptions count:", subscriptions.length);

    // Create a map from movieID to movie data
    const movieMap = new Map(
      movies.map((movie) => [movie._id.toString(), movie])
    );

    const joinedSubscriptions = subscriptions.map((sub) => {
      if (!Array.isArray(sub.movies)) {
        console.warn("⚠️ Subscription has no 'movies' array:", sub);
        return { ...sub, movies: [] };
      }

      const enrichedMovies = sub.movies
        .map(({ movieID, date }) => {
          const movie = movieMap.get(movieID?.toString());

          if (!movie) {
            console.warn(`⚠️ Movie ID ${movieID} not found in movieMap.`);
            return null;
          }

          return {
            ...movie,
            date, // Add date from subscription
          };
        })
        .filter(Boolean); // Remove nulls (unmatched movieIDs)

      return {
        ...sub,
        movies: enrichedMovies,
      };
    });

    return joinedSubscriptions;
  } catch (err) {
    console.error("🔥 Error in getMoviesJoinSubscription:", err.message);
    return [];
  }
};

export {
  setMoviesOnInit,
  getMovies,
  AddMovieDB,
  getMovieByIDdb,
  updateMovieByIdDB,
  getUnWatchedMoviesByMemberID,
  getMoviesJoinSubscription,
};
