import { Link, Outlet, Route } from "react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ManageUsers = () => {
  //localhost/manage-users/
  const navigate = useNavigate();
  const role = useSelector((state) => state.role);

  useEffect(() => {
    if (role !== "admin") {
      navigate("/not-authorized");
    }
  }, [role]);

  return (
    <>
      <nav className="secondary">
        <Link to="add-user">Add User</Link>
        <Link to="all-users">All Users</Link>
      </nav>
      <Outlet />
    </>
  );
};

export default ManageUsers;
