import { useEffect } from "react";
import GenericForm from "./GenericForm";
import { useParams } from "react-router";
import { USERS_URL } from "../../utils/consts";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const EditUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const token = useSelector((state) => state.token);
  useEffect(() => {
    try {
      axios
        .get(`${USERS_URL}/${id}`, {
          headers: { "x-access-token": token },
        })
        .then(({ data }) => setUser(data));
    } catch (error) {
      console.error(error);
      throw Error;
    }
  }, []);
  return (
    <>
      <h4>Edit User</h4>
      <GenericForm action="edit" defaultValues={user} id={id} />
    </>
  );
};

export default EditUser;
