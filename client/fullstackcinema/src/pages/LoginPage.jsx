import { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { AUTH_URL, SET_TOKEN } from "../utils/consts";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [details, setDetails] = useState({});
  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post(AUTH_URL, details)
      .then((res) => {
        // sessionStorage.setItem("token", res.data.token);
        dispatch({ type: SET_TOKEN, payload: res.data.token });
        navigate("/main");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <h2>Welcome to Cinema Managment system</h2>;
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
        <button type="submit">Login</button>
        <div>
          <h4>don't have user yet ? </h4>
          <Link to="/user-registration">Click here</Link>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
