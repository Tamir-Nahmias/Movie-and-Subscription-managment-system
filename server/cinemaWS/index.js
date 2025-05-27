// C-I-N-E-M-A WS
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import { router as externalMoviesRouter } from "./controllers/externalMoviesControllers.js";
import { router as authRouter } from "./controllers/authControllers.js";
import { router as mainRouter } from "./controllers/mainController.js";
import { router as userRouter } from "./controllers/userController.js";
import { router as externalMemberRouter } from "./controllers/externalMembersControllers.js";
import { router as externalSubsRouter } from "./controllers/externalSubscriptionsControllers.js";
connectDB();

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/movies", externalMoviesRouter);
app.use("/members", externalMemberRouter);
app.use("/subscriptions", externalSubsRouter);
app.use("/auth", authRouter);
app.use("/main", mainRouter);
app.use("/users", userRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
