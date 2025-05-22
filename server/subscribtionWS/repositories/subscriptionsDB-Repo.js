import Subscription from "../models/subscriptionsModel.js";

const getAllSubscriptions = (filters = {}) => {
  return Subscription.find(filters);
};
const getSubscriptionById = (id) => {
  return Subscription.findById(id);
};

const createSubscription = (subscriptionData) => {
  const subscription = new Subscription(subscriptionData);
  return subscription.save();
};
const updateSubscription = (id, subscriptionData) => {
  return Subscription.findByIdAndUpdate(id, subscriptionData);
};
const deleteSubscription = (id) => {
  return Subscription.findByIdAndDelete(id);
};

const deleteAllSubscriptions = () => {
  return Subscription.deleteMany({});
};

export {
  getAllSubscriptions,
  getSubscriptionById,
  createSubscription,
  updateSubscription,
  deleteSubscription,
  deleteAllSubscriptions,
};
