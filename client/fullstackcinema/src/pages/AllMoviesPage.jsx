import axios from "axios";
import { useState } from "react";
import { MOVIES_URL } from "../utils/consts";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const AllMoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  // const [permissions, setPermissions] = useState([]);
  const state = useSelector((state) => state.connectedUserDetails.permissions);
  useEffect(() => {
    axios.get(MOVIES_URL).then(({ data }) => setMovies(data));
  }, []);
  const handleEdit = (id) => {
    navigate(`../update-movie/${id}`);
  };

  return (
    <>
      <h5>All Movies Page</h5>
      <ul>
        {movies.map((movie) => {
          const { name, premiered, image, genres } = movie;
          return (
            <li key={movie._id}>
              <h3>
                {name} ,{premiered.slice(0, 4)}
              </h3>
              <div id="genres">{genres}</div>
              <img src={image} width="100px" height="auto" />
              <div>
                <h4>watched by :</h4>
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
