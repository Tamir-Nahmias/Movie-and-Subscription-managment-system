import express from "express";
import {
  addMemberDB,
  deleteMemberByiDFromDB,
  getMemberByIDdb,
  getMembers,
  getSubsByMovies,
  updateMemberByIdDB,
} from "../services/membersServices.js";
const router = express.Router();
//http://localhost:5000/members
router.post("/", async (req, res) => {
  try {
    const result = await addMemberDB(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/", async (req, res) => {
  try {
    // Replace this with your actual service to fetch members
    const filters = req.query;
    const members = await getMembers(filters);
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/member-watched", async (req, res) => {
  try {
    // Replace this with your actual service to fetch members

    const filters = req.query;
    const { movies } = await getSubsByMovies(filters);
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const members = await getMemberByIDdb(id);
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteMemberByiDFromDB(id);
    res.json({ message: "Member removed", user: result });
  } catch (error) {
    res.json({ errorMessage: error }).status(404);
    throw new Error(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const result = await updateMemberByIdDB(id, body);
    res.json(result);
  } catch (e) {
    console.error({ ["Error message"]: e });
    res.status(404).json({ message: "Error - user didn't update" });
  }
});

export { router };
