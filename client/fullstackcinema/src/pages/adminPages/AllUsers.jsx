import axios from "axios";
import { useEffect, useState } from "react";
import { USERS_URL } from "../../utils/consts";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [deleteIndicator, setDeleteIndicator] = useState(false);
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);

  const handleEdit = (id) => {
    navigate(`../edit-user/${id}`);
  };

  const handleDelete = (id) => {
    axios
      .delete(`${USERS_URL}/${id}`, { headers: { "x-access-token": token } })
      .then(() => setDeleteIndicator(!deleteIndicator));
  };
  useEffect(() => {
    axios
      .get(USERS_URL, {
        headers: {
          "x-access-token": token,
        },
      })
      .then(({ data }) => setUsers(data));
  }, [deleteIndicator]);
  return (
    <>
      <ul>
        {users.map((user) => {
          return (
            <li key={user.id} className="card">
              <div>Name : {user.firstname}</div>
              <div>User Name: {user.username}</div>
              <div>Session Time Out: {user.sessiontimeout}</div>
              <div>Created date : {user.createdDate}</div>
              <div>Permissions : {user.permissions}</div>
              <div>
                <button
                  onClick={() => {
                    handleEdit(user.id);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default AllUsers;
