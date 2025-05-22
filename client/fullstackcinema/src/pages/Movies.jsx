import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router";

const Movies = () => {
  const permissions = useSelector(
    (state) => state.connectedUserDetails?.permissions
  );
  return (
    <div>
      <h2> Movies </h2>
      <Link to={"all-movies"}>All movies</Link>
      {permissions.includes("Create Movies") && (
        <Link to={"add-movie"}>Add movie</Link>
      )}
      <Outlet />
    </div>
  );
};

export default Movies;
