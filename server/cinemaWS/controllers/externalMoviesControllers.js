import {
  addMovie,
  getAllMovies,
  getMovieByIDService,
  updateMovie,
} from "../services/externalMoviesServices.js";
import express from "express";
const router = express.Router();

//http://localhost:3000/movies

router.get("/", async (req, res) => {
  try {
    const result = await getAllMovies();
    res.json(result);
  } catch (e) {
    res.json(e).status(404);
  }
});

router.post("/", async (req, res) => {
  try {
    const movie = req.body;
    const data = await addMovie(movie);
    res.json({ message: `user ${data}` });
  } catch (err) {
    res.json({ message: ` error occured : ${err}` }).status(400);
  }
});
//http://localhost:3000/movies/id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getMovieByIDService(id);
    res.json(result);
  } catch (err) {
    res.json(err);
  }
});

//PUT//http://localhost:3000/movies/id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await updateMovie(id, obj);
    res.json(result);
  } catch (err) {
    res.json(err);
  }
});

export { router };
