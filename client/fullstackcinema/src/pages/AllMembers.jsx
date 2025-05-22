import { useEffect, useState } from "react";
import axios from "axios";
import { MEMBERS_URL } from "../utils/consts";
import { useNavigate } from "react-router";
import SubscribeToMovie from "./SubscribeToMovie";

const AllMembers = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const fetchMembers = () => {
    axios.get(MEMBERS_URL).then(({ data }) => setMembers(data));
  };
  useEffect(() => {
    fetchMembers();
  }, []);

  const handleEdit = (id) => {
    navigate(`../edit-members/${id}`);
  };
  const handlDelete = (id) => {
    axios
      .delete(`${MEMBERS_URL}/${id}`)
      .then(() => fetchMembers())
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div>AllMembers</div>
      <ul>
        {members.map((member) => (
          <li key={member._id}>
            <div>Name: {member.name}</div>
            <div>Email: {member.email}</div>
            <div>City: {member.city}</div>
            <div>
              Movies Watched:
              <button
                onClick={() => {
                  setIsClicked(!isClicked);
                }}
              >
                Subscribe to new movie
              </button>
              {isClicked && <SubscribeToMovie />}
            </div>
            <div>
              <button onClick={() => handleEdit(member._id)}>Edit</button>
              <button onClick={() => handlDelete(member._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AllMembers;
