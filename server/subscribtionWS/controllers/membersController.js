import express from "express";
import {
  addMemberDB,
  deleteMembetByiDFromDB,
  getMemberByIDdb,
  getMembers,
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
    const members = await getMembers();
    res.status(200).json(members);
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
    const result = await deleteMembetByiDFromDB(id);
    res.json({ message: "Member removed", user: result });
  } catch (error) {
    res.json({ errorMessage: error }).status(404);
    throw new Error(error);
  }
});
export { router };
