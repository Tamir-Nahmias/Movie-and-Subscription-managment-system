import express from "express";
import dotenv from "dotenv";
dotenv.config();

import {
  addUserInAllSources,
  deleteUserFromAllSources,
  getUserFullDetailsByID,
  getUsersFullDetailsFromAllSources,
  isUserNameExistInDB,
  setUserPassWordDB,
  updateUserInAllSources,
} from "../services/userServices.js";
import { requireAdmin } from "../utils/middlewares.js";

const router = express.Router();

//http://localhost:5173/users

router.post("/", requireAdmin, async (req, res) => {
  try {
    console.log("in router post");
    const body = req.body;
    const result = await addUserInAllSources(body);
    res.json(`user added successfuly with id: ${result}`);
  } catch (error) {
    // return new Error(`error accured in controller ${error}`);
    res.json(error);
  }
});
//http://localhost:5173/users

router.get("/", requireAdmin, async (req, res) => {
  try {
    const result = await getUsersFullDetailsFromAllSources();
    res.json(result);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch user data" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getUserFullDetailsByID(id);
    res.json(result);
  } catch (err) {
    res.json(err);
  }
});

router.get("/db-validation/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const result = await isUserNameExistInDB(username);
    res.json(result);
  } catch (err) {
    res.json(err);
  }
});

router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteUserFromAllSources(id);
    res.json(result);
  } catch (error) {
    console.error("error occured", error);
    throw error;
  }
});
router.put("/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await updateUserInAllSources(id, obj);
    res.json(result);
  } catch (e) {
    console.error(e);
    res.json(e);
    throw e;
  }
});

router.patch("/update-pass-word/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await setUserPassWordDB(id, obj);
    res.json(result);
  } catch (err) {
    res.json(err);
    throw err;
  }
});

export { router };
