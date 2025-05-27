import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    memberID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
    movies: [
      {
        movieID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Movie",
          required: true,
        },
        date: { type: Date, required: true },
        _id: false, // <- THIS disables _id on subdocument
      },
    ],
  },
  { versionKey: false }
);

const Subscription = mongoose.model(
  "Subscription",
  subscriptionSchema,
  "subscriptions"
);

export default Subscription;
