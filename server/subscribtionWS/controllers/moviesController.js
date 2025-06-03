import express from "express";
import {
  AddMovieDB,
  deleteMovieFromAllSources,
  getMovieByIDdb,
  getMovies,
  getMoviesJoinSubscription,
  getUnWatchedMoviesByMemberID,
  updateMovieByIdDB,
} from "../services/movieServices.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const filters = req.query ?? {};
    const result = await getMovies(filters);
    res.json(result);
  } catch (e) {
    res.status(404).json(e);
  }
});
router.get("/join-subscriptions", async (req, res) => {
  try {
    const result = await getMoviesJoinSubscription();
    res.status(200).json(result);
  } catch (e) {
    console.error("Error in /join-subscriptions:", e);
    res.status(500).json({ error: "Failed to join subscriptions." });
  }
});

router.get("/unwatched-movies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getUnWatchedMoviesByMemberID(id);
    const isValidArray = Array.isArray(result) && result.length > 0;
    const isEmptyObject =
      result &&
      typeof result === "object" &&
      !Array.isArray(result) &&
      Object.keys(result).length === 0;
    if (!isValidArray || isEmptyObject) {
      return res.json({ movies: result, collectionEmpty: true });
    }
    //still in try brackets : if result is not an empty array or any unfit type object then return result
    res.json({ movies: result, collectionEmpty: false });
  } catch (e) {
    const allMovies = await getMovies(); // in case of an Error : bring back All the movies  - it means the subscriber collection empty
    res.json({ movies: allMovies, collectionEmpty: true }); // if
  }
});

router.post("/", async (req, res) => {
  try {
    const movie = req.body;
    const result = await AddMovieDB(movie);
    res.json(result).status(201);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//http://localhost:5000/movies/id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getMovieByIDdb(id);
    res.json(result);
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
});
//PUT//http://localhost:5000/movies/id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await updateMovieByIdDB(id, obj);
    res.json(result);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteMovieFromAllSources(id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

export { router };
