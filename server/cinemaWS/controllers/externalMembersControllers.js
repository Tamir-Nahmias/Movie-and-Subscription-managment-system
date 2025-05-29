import express from "express";
const router = express.Router();

import {
  // Handlers for external members with req, res, and try-catch
  getAllExternalMembers,
  getExternalMemberById,
  createExternalMember,
  updateExternalMember,
  deleteExternalMember,
  getAllOrPartlyMOviesPerMember,
} from "../services/externalMembersServices.js";
import { requireAuthUsers } from "../utils/middlewares.js";
//http://localhost:3000/members
// Get all external members
router.get("/", requireAuthUsers, async (req, res) => {
  try {
    const members = await getAllExternalMembers();
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/member-watched", requireAuthUsers, async (req, res) => {
  try {
    // Replace this with your actual service to fetch members

    const filters = req.query;
    const { data } = await getAllOrPartlyMOviesPerMember(filters);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get external member by ID
router.get("/:id", requireAuthUsers, async (req, res) => {
  try {
    const { id } = req.params;

    const member = await getExternalMemberById(id.toString());

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new external member
router.post("/", requireAuthUsers, async (req, res) => {
  try {
    const newMember = await createExternalMember(req.body);
    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an external member
router.put("/:id", requireAuthUsers, async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const { data: updatedMember } = await updateExternalMember(id, body);
    if (!updatedMember) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.json(updatedMember);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete an external member
router.delete("/:id", requireAuthUsers, async (req, res) => {
  try {
    const deleted = await deleteExternalMember(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.json({ message: "Member deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export { router };
