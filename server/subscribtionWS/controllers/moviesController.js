import express from "express";
import {
  AddMovieDB,
  getMovieByIDdb,
  getMovies,
  updateMovieByIdDB,
} from "../services/movieServices.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await getMovies();
    res.json(result);
  } catch (e) {
    res.json(e).status(404);
  }
});

router.post("/", async (req, res) => {
  try {
    const movie = req.body;
    const result = await AddMovieDB(movie);
    res.json(result).status(201);
  } catch (e) {
    res.json(e.message).status(500);
  }
});

//http://localhost:5000/movies/id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getMovieByIDdb(id);
    res.json(result);
  } catch (err) {
    res.json(err);
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
    res.json(err);
  }
});

export { router };
