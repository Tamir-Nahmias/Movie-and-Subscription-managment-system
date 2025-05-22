import Member from "../models/membersModel.js";

const getAllMembers = (filters = {}) => {
  return Member.find(filters);
};
const getMemberById = (id) => {
  return Member.findById(id);
};

const addMember = (memberData) => {
  const member = new Member(memberData);
  return member.save();
};

const addManyMembers = (membersData) => {
  return Member.insertMany(membersData);
};

const createMember = (memberData) => {
  const member = new Member(memberData);
  return member.save();
};
const updateMember = (id, memberData) => {
  return Member.findByIdAndUpdate(id, memberData);
};
const deleteMember = (id) => {
  return Member.findByIdAndDelete(id);
};

export {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
  addManyMembers,
  addMember,
};
