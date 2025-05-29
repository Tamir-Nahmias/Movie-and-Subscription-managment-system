import axios from "axios";
import { useState } from "react";
import { MEMBERS_URL, MOVIES_URL } from "../utils/consts";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";

const AllMoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const token = useSelector((state) => state.token);

  // const [permissions, setPermissions] = useState([]);
  const state = useSelector((state) => state.connectedUserDetails.permissions);
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const DisplayedMovie = queryParams.get("name");
    axios // returns ALL movies  ALWAYS with their subscribers if exist
      .get(`${MEMBERS_URL}/member-watched`, {
        params: { name: DisplayedMovie }, // the name filter uses for if we wre reffered from members page
        headers: {
          "x-access-token": token,
        },
      })
      .then(({ data }) => setMovies(data));
  }, []);

  const handleEdit = (id) => {
    navigate(`../update-movie/${id}`);
  };

  return (
    <>
      <h5>All Movies Page</h5>
      <ul>
        {movies.map((movie) => {
          const { name, premiered, image, genres, subscriptions } = movie;
          return (
            <li key={movie._id}>
              <h3>
                {name} ,{premiered.slice(0, 4)}
              </h3>
              <div id="genres">{genres}</div>
              <img src={image} width="100px" height="auto" />
              <div>
                <h4>watched by :</h4>
                <ul>
                  {subscriptions?.map((watch, index) => {
                    return (
                      <li key={index}>
                        <Link
                          to={`../../subscriptions/all-members/?memberID=${watch.memberID}`}
                        >
                          {watch.memberName}
                        </Link>
                        {watch.date.split("T")[0]}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div>
                <button
                  onClick={() => {
                    handleEdit(movie._id);
                  }}
                >
                  Edit
                </button>
                <button>Delete</button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default AllMoviesPage;
