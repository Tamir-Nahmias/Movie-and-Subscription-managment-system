import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { getUserFullDetailsByID } from "../services/userServices.js";

dotenv.config(); // Load environment variables

const router = express.Router();

// Protected route: GET /
router.get("/", (req, res) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  const SECRET_KEY = process.env.SECRET_JWT || "default_secret"; // fallback for development

  jwt.verify(token, SECRET_KEY, (err, data) => {
    if (err) {
      return res.status(500).json("Failed to authenticate token");
    }
    getUserFullDetailsByID(data.userID).then((personData) =>
      res.json(personData)
    );
  });
});

export { router };
