import {
  getAllSubscriptions as getAll,
  getSubscriptionById,
  createSubscription,
  updateSubscription,
  deleteSubscription,
} from "../repositories/subscriptionsDB-Repo.js";

const getAllSubscriptions = (filters = {}) => {
  return getAll(filters);
};

export { getAllSubscriptions };
