import express from "express";
import {
  addMovieToSubscription,
  addNewSubscriber,
  getAllSubscriptions,
  getWatchedMoviesByMemberID,
} from "../services/subscriptionsServices.js";
const router = express.Router();
//localhost:5000/subscriptions/
router.get("/", async (req, res) => {
  try {
    const result = await getAllSubscriptions();
    res.json(result);
  } catch (e) {
    res.status(404).json({ Error: e });
  }
});

router.get("/watched-movies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getWatchedMoviesByMemberID(id);
    res.json(result);
  } catch (err) {
    res.status(404).json({ Error: err });
  }
});

router.put("/update-subscription/:id", async (req, res) => {
  try {
    const { movieID, date } = req.body;
    const { id } = req.params;
    const result = await addMovieToSubscription(id, { movieID, date });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(404).json({ ["Error Occured"]: error });
  }
});
router.post("/", async (req, res) => {
  try {
    const subscriber = req.body;
    const result = await addNewSubscriber(subscriber);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(204).json({ ["Error Occured"]: error });
  }
});

export { router };
