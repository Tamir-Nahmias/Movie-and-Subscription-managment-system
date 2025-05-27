import {
  addMovieToSubscriberList,
  addNewSubscriber,
  getAllSubs,
  getWatchedMoviesBySubID,
} from "../repositories/subscriptionsWS-External-Repo.js";

const getWatchedMovies = (id) => {
  return getWatchedMoviesBySubID(id);
};

const getAllSubscriptions = () => {
  return getAllSubs();
};

const addMovieToSubList = (id, addedMovie) => {
  return addMovieToSubscriberList(id, addedMovie);
};

const addNewSubscriberService = (subscriber) => {
  return addNewSubscriber(subscriber);
};

export {
  getWatchedMovies,
  getAllSubscriptions,
  addMovieToSubList,
  addNewSubscriberService,
};
