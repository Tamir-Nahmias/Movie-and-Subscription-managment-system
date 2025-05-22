import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/subscriptionDB")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Failed to connect to MongoDB", err));
};

export default connectDB;
