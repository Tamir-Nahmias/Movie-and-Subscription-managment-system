import dotenv from "dotenv";
const envVarDotEnv = dotenv.config();
envVarDotEnv;
const JWT_SECRET = process.env.SECRET_JWT;
import express from "express";
import jwt from "jsonwebtoken";
import {
  getAllUsers,
  getUserFullDetailsByID,
} from "../services/userServices.js";
const router = express.Router();

//Entry point : http://localhost:3000/auth

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  //check if username and password from db exist
  const userDetails = await getAllUsers({
    username: username,
    password: password,
  });
  if (userDetails.length > 0) {
    // userDetails is an array , containing the tupple from db of the corresponding username and password .
    const { _id: userId } = userDetails[0];

    //to retrieve session time out :
    const { sessiontimeout, permissions } = await getUserFullDetailsByID(
      userId
    );
    console.log(sessiontimeout);

    const token = jwt.sign({ userID: userId, permissions }, JWT_SECRET, {
      expiresIn: `${sessiontimeout}m`,
    });
    const payload = jwt.verify(token, JWT_SECRET); // OR jwt.decode(token)

    res.json({
      token,
      payload,
    });
  } else {
    res.status(404).json({ Error: "username or password incorrect" });
  }
});

export { router };
