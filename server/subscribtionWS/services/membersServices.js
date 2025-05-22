import {
  addManyMembers,
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
  addMember,
} from "../repositories/membersDB-Repo.js";
import getAllMembersWS from "../repositories/membersWS-Repo.js";

//name , email, city
const onInitPopulateMemberDB = async () => {
  const { data } = await getAllMembersWS();
  const members = data.map((member) => {
    return {
      name: member.name,
      email: member.email,
      city: member.address.city,
    };
  });
  return addManyMembers(members);
};

const getMembers = () => {
  return getAllMembers();
};

const addMemberDB = (member) => {
  return createMember(member);
};

const getMemberByIDdb = async (id) => {
  return getMemberById(id);
};

const updateMemberByIdDB = (id, obj) => {
  return updateMember(id, obj);
};

const deleteMembetByiDFromDB = (id) => {
  return deleteMember(id);
};

export {
  onInitPopulateMemberDB,
  getMembers,
  addMemberDB,
  getMemberByIDdb,
  updateMemberByIdDB,
  deleteMembetByiDFromDB,
};
