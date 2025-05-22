import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router";

const Subscriptions = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("all-members");
  }, []);
  return (
    <div>
      <h2>Subscriptions</h2>

      <Link to="add-members">Add Member</Link>
      <Link to="all-members">All Members</Link>
      <Outlet />
    </div>
  );
};

export default Subscriptions;
