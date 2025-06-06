import {
  getMembers,
  addMember,
  updateMember,
  deleteMember,
  getAllMoviesAndSubscriptionsPerMemberOrAll,
} from "../repositories/membersWS-External-Repo.js";

// Get all external members
const getAllExternalMembers = async () => {
  const { data } = await getMembers();
  return data;
};

const getAllOrPartlyMOviesPerMember = (filters) => {
  return getAllMoviesAndSubscriptionsPerMemberOrAll(filters);
};

// Get external member by ID
const getExternalMemberById = async (id) => {
  const { data } = await getMembers(id);
  return data;
};

// Create a new external member
const createExternalMember = async (memberData) => {
  const { data } = await addMember(memberData);
  return data;
};

// Update an external member by ID
const updateExternalMember = (id, memberData) => {
  return updateMember(id, memberData);
};

// Delete an external member by ID
const deleteExternalMember = async (id) => {
  const { data } = await deleteMember(id);
  return data;
};

export {
  getAllExternalMembers,
  getExternalMemberById,
  createExternalMember,
  updateExternalMember,
  deleteExternalMember,
  getAllOrPartlyMOviesPerMember,
};
