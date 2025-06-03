import {
  getAllSubscriptions as getAll,
  getSubscriptionById,
  createSubscription,
  updateSubscription,
  deleteSubscription,
  getSubscriptionByMemberFKid,
  updateSubscriptionMoviesList,
} from "../repositories/subscriptionsDB-Repo.js";

const getAllSubscriptions = (filters = {}) => {
  return getAll(filters);
};

const getWatchedMoviesByMemberID = async (id) => {
  const [data] = await getSubscriptionByMemberFKid(id);
  return data.movies;
};

const addMovieToSubscription = (id, addedMovie) => {
  return updateSubscriptionMoviesList(id, addedMovie);
};

const addNewSubscriber = (subscriber) => {
  return createSubscription(subscriber);
};

const deleteSubscriptionsByMemberID = (filter) => {
  return;
};

export {
  getAllSubscriptions,
  getWatchedMoviesByMemberID,
  addMovieToSubscription,
  addNewSubscriber,
};
