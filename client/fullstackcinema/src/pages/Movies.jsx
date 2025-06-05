import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router";

const Movies = () => {
  const permissions = useSelector(
    (state) => state.connectedUserDetails?.permissions
  );
  return (
    <div>
      <nav className="secondary">
        {permissions.includes("View Movies") ? (
          <Link to={"all-movies"}>All movies</Link>
        ) : (
          <h3>you don't have the permission to view movies</h3>
        )}

        {permissions.includes("Create Movies") ? (
          <Link to={"add-movie"}>Add movie</Link>
        ) : (
          <h3>You don't have the permission to add Movie</h3>
        )}
      </nav>
      <Outlet />
    </div>
  );
};

export default Movies;
