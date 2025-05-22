import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    genres: { type: [String], required: true },
    premiered: { type: Date, required: true },
    image: { type: String, required: true },
  },
  { versionKey: false }
);

const Movie = mongoose.model("Movie", movieSchema, "movies");

export default Movie;
