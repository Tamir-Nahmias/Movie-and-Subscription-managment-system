import express from "express";
const router = express.Router();

import {
  // Handlers for external members with req, res, and try-catch
  getAllExternalMembers,
  getExternalMemberById,
  createExternalMember,
  updateExternalMember,
  deleteExternalMember,
} from "../services/externalMembersServices.js";

// Get all external members
router.get("/", async (req, res) => {
  try {
    const members = await getAllExternalMembers();
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get external member by ID
router.get("/:id", async (req, res) => {
  try {
    const member = await getExternalMemberById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new external member
router.post("/", async (req, res) => {
  try {
    const newMember = await createExternalMember(req.body);
    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an external member
router.put("/:id", async (req, res) => {
  try {
    const updatedMember = await updateExternalMember(req.params.id, req.body);
    if (!updatedMember) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.json(updatedMember);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete an external member
router.delete("/:id", async (req, res) => {
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
