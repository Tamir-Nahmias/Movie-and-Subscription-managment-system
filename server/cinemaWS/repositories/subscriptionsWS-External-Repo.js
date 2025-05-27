import axios from "axios";
import { SUBS_URL_EX } from "../utils/consts.js";

//const SUBS_URL = "http://localhost:5000/subscriptions";

const getWatchedMoviesBySubID = (id) => {
  return axios.get(`${SUBS_URL_EX}/watched-movies/${id}`);
};

const getAllSubs = () => {
  return axios.get(`${SUBS_URL_EX}`);
};

const addMovieToSubscriberList = (id, addedMovie) => {
  return axios.put(`${SUBS_URL_EX}/update-subscription/${id}`, addedMovie);
};

const addNewSubscriber = (subscriber) => {
  return axios.post(`${SUBS_URL_EX}`, subscriber);
};

export {
  getWatchedMoviesBySubID,
  getAllSubs,
  addMovieToSubscriberList,
  addNewSubscriber,
};
