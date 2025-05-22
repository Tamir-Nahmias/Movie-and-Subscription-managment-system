import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import { router as membersRouter } from "./controllers/membersController.js";
import { router as moviesRouter } from "./controllers/moviesController.js";
import { setMoviesOnInit } from "./services/movieServices.js";
import { onInitPopulateMemberDB } from "./services/membersServices.js";
import { router as subscriptionsRouter } from "./controllers/subscriptionController.js";

connectDB();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.use("/members", membersRouter);
app.use("/movies", moviesRouter);
app.use("/subscriptions", subscriptionsRouter);

//on initial run , the Service will populate external WS to DB
setMoviesOnInit()
  .then(() => {
    console.log("retreive movies ended successfuly");
  })
  .catch((err) => {
    console.log("error accured during movies retrieving and populating", err);
  });
onInitPopulateMemberDB()
  .then(() => {
    console.log("retreive members ended successfuly");
  })
  .catch((err) => {
    console.log("error accured during members retrieving and populating");
  });
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
