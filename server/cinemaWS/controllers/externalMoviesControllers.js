import {
  addMovie,
  getAllMovies,
  getMovieByIDService,
  getMoviesJoinedSubscriptions,
  getUnwatchedMovies,
  updateMovie,
} from "../services/externalMoviesServices.js";
import express from "express";
import { requireAuthUsers } from "../utils/middlewares.js";
const router = express.Router();

//http://localhost:3000/movies

router.get("/", requireAuthUsers, async (req, res) => {
  try {
    const { permissions } = req.user; // req.user came from previous handler "requireAuthUsers"
    if (!permissions.includes("View Movies")) {
      res.status(403).json({ message: "user is not permitted" });
    }
    const filters = req.query ?? {};
    const result = await getAllMovies(filters);
    res.json(result);
  } catch (e) {
    res.json(e).status(404);
  }
});
//End point  for external source movies joined subscriptions
// request being sent from allMembers route . showing subscribers and their movies list
router.get("/join-subscriptions", requireAuthUsers, async (req, res) => {
  try {
    const { permissions } = req.user; // req.user came from previous handler "requireAuthUsers"
    if (!permissions.includes("View Subscriptions")) {
      res.status(403).json({ message: "user is not permitted" });
    }
    const { data } = await getMoviesJoinedSubscriptions();
    res.status(200).json(data);
  } catch (e) {
    console.error("Error in /join-subscriptions:", e);
    res.status(500).json({ error: "Failed to join subscriptions." });
  }
});
router.get("/unwatched-movies/:id", requireAuthUsers, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getUnwatchedMovies(id);
    res.json(result);
  } catch (e) {
    res
      .status(404)
      .json({ messgae: "error occured in cineam server - movies" });
  }
});

router.post("/", requireAuthUsers, async (req, res) => {
  try {
    const movie = req.body;
    const data = await addMovie(movie);
    res.json({ message: `user ${data}` });
  } catch (err) {
    res.json.status(404)({ message: ` error occured : ${err}` });
  }
});
//http://localhost:3000/movies/id
router.get("/:id", requireAuthUsers, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getMovieByIDService(id);
    res.json(result);
  } catch (err) {
    res.json(err);
  }
});

//PUT//http://localhost:3000/movies/id
router.put("/:id", requireAuthUsers, async (req, res) => {
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
