import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import {
  MAIN_URL,
  SET_CONNECTED_USER,
  SET_ROLE_ADMIN,
} from "../../utils/consts";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dispatchFininshed, setDispatchFininshed] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [name, setFirstname] = useState("");
  const token = useSelector((state) => state.token);
  const loggedUser = useSelector((state) => state.connectedUserDetails);
  const adminID = import.meta.env.VITE_ADMIN_ID;

  const fetchUser = () => {
    axios
      .get(MAIN_URL, {
        headers: {
          "x-access-token": token,
        },
      })
      .then(({ data }) => dispatch({ type: SET_CONNECTED_USER, payload: data }))
      .catch((error) => {
        console.error(error);
        navigate("/not-authorized");
      })
      .finally(() => setDispatchFininshed(!dispatchFininshed));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    setFirstname(loggedUser.firstname);
    if (loggedUser.id === adminID) {
      dispatch({ type: SET_ROLE_ADMIN });
      setIsAdmin(true);
    }
  }, [dispatchFininshed]);

  return (
    <>
      <h3>Hello, {name}</h3>
      <nav>
        <Link to="movies">Movies</Link>
        <Link to="subscriptions">Subscriptions</Link>
        {isAdmin && <Link to="manage-users">Manage Users</Link>}
        <Link onClick={() => (window.location.href = "/")}>Log out</Link>
      </nav>
      <Outlet />
    </>
  );
};

export default MainPage;
