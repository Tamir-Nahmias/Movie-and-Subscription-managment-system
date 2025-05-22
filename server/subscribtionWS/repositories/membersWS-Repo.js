import axios from "axios";

const MEMBERS_URL = "https://jsonplaceholder.typicode.com/users";

const getAllMembersWS = () => {
  return axios.get(MEMBERS_URL);
};

export default getAllMembersWS;
