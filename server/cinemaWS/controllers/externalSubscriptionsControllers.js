import express from "express";
import {
  addMovieToSubList,
  addNewSubscriberService,
  getAllSubscriptions,
  getWatchedMovies,
} from "../services/externalSubscriptionsServices.js";
import { requireAuthUsers } from "../utils/middlewares.js";
const router = express.Router();

//localhost:3000/subscriptions
router.get("/", requireAuthUsers, async (req, res) => {
  try {
    const { data } = await getAllSubscriptions();
    res.json(data);
  } catch (e) {
    res.status(404).json({ Error: e });
  }
});

router.get("/watched-movies/:id", requireAuthUsers, async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await getWatchedMovies(id);
    res.json(data);
  } catch (err) {
    res.status(404).json({ Error: err });
  }
});

router.put("/update-subscription/:id", requireAuthUsers, async (req, res) => {
  try {
    const { movieID, date } = req.body;
    const { id } = req.params;
    const { data } = await addMovieToSubList(id, { movieID, date });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(404).json({ ["Error Occured"]: error });
  }
});
router.post("/", requireAuthUsers, async (req, res) => {
  try {
    const subscriber = req.body;
    const { data } = await addNewSubscriberService(subscriber);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(204).json({ ["Error Occured"]: error });
  }
});

export { router };
