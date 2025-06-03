import Subscription from "../models/subscriptionsModel.js";
import mongoose from "mongoose";

const getAllSubscriptions = (filters = {}) => {
  return Subscription.find(filters).lean();
};
const getSubscriptionById = (id) => {
  return Subscription.findById(id);
};
const getSubscriptionByMemberFKid = (id) => {
  return Subscription.find({ memberID: new mongoose.Types.ObjectId(id) });
};

const createSubscription = (subscriptionData) => {
  const subscription = new Subscription(subscriptionData);
  return subscription.save();
};
const updateSubscription = (id, subscriptionData) => {
  return Subscription.findByIdAndUpdate(id, subscriptionData);
};

const updateSubsMovieField = (id, updatedMoviesArr) => {
  console.log(id, updatedMoviesArr);
  return Subscription.updateOne({ _id: id }, updatedMoviesArr);
};

const updateSubscriptionMoviesList = (id, addedMovie) => {
  return Subscription.updateOne(
    { memberID: new mongoose.Types.ObjectId(id) },
    {
      $push: {
        movies: addedMovie,
      },
    }
  );
};
const deleteSubscription = (id) => {
  return Subscription.findByIdAndDelete(id);
};

const deleteAllSubscriptions = (filters = {}) => {
  return Subscription.deleteMany(filters);
};

export {
  getAllSubscriptions,
  getSubscriptionById,
  createSubscription,
  updateSubscription,
  deleteSubscription,
  deleteAllSubscriptions,
  getSubscriptionByMemberFKid,
  updateSubscriptionMoviesList,
  updateSubsMovieField,
};
