import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    city: { type: String, required: true },
  },
  { versionKey: false }
);

const Member = mongoose.model("Member", memberSchema, "members");

export default Member;
