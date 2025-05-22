import axios from "axios";
import React, { useState } from "react";
import { USERS_URL } from "../utils/consts";
import { useParams, Outlet, useNavigate } from "react-router";

const RegistrationPage = () => {
  const [details, setDetails] = useState({});
  const [isUsernameExist, setIsUsernameExist] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const updatePassWordAndRedirect = (id) => {
    axios
      .patch(`${USERS_URL}/update-pass-word/${id}`, {
        password: details.password,
      })
      .then(navigate("/"));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`${USERS_URL}/db-validation/${details.username}`)
      .then(({ data }) =>
        data ? updatePassWordAndRedirect(data._id) : setIsUsernameExist(data)
      ); //the returned value data is returned object  or false
  };

  return (
    <>
      <h2>Registration Page</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {!isUsernameExist && <h3>user doesnt exist</h3>}
    </>
  );
};

export default RegistrationPage;
