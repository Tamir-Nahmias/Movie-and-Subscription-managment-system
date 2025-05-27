import axios from "axios";
import { MEMBERS_URL } from "../utils/consts.js";

const getMembers = (id = "") => {
  return axios.get(`${MEMBERS_URL}/${id}`);
};
const getAllMoviesAndSubscriptionsPerMemberOrAll = (filters) => {
  return axios.get(`${MEMBERS_URL}/member-watched`, { params: filters });
};
const addMember = (member) => {
  return axios.post(MEMBERS_URL, member);
};
const updateMember = (member) => {
  return axios.put(`${MEMBERS_URL}/${member.id}`, member);
};
const deleteMember = (id) => {
  return axios.delete(`${MEMBERS_URL}/${id}`);
};

export {
  getMembers,
  addMember,
  updateMember,
  deleteMember,
  getAllMoviesAndSubscriptionsPerMemberOrAll,
};
