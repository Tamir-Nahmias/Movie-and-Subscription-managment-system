import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { MOVIES_URL, SUBS_URL } from "../utils/consts";
import { useSelector } from "react-redux";

const SubscribeToMovie = ({ id, refreshList, setRefreshList }) => {
  const [unwatchedMovie, setUnwatchedMovie] = useState([]);
  const [details, setDetails] = useState({});
  const [isSubscriberExistsAlready, setIsSubscriberExistsAlready] = useState();
  const token = useSelector((state) => state.token);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isSubscriberExistsAlready) {
      axios.post(
        `${SUBS_URL}`,
        {
          memberID: id,
          movies: [
            {
              movieID: details.movieID,
              date: details.date,
            },
          ],
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      fetchUnwatchedMovies(); // refreshing lists
      setRefreshList(!refreshList);
    } else {
      axios.put(
        `${SUBS_URL}/update-subscription/${id}`,
        {
          movieID: details.movieID,
          date: details.date,
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      setRefreshList(!refreshList);
      fetchUnwatchedMovies(); //for refrshing the list after submitting the request
    }
  };
  const fetchUnwatchedMovies = () => {
    if (!id) return;
    axios
      .get(`${MOVIES_URL}/unwatched-movies/${id}`, {
        headers: {
          "x-access-token": token,
        },
      })
      .then(({ data }) => {
        setUnwatchedMovie(data.movies);
        setIsSubscriberExistsAlready(!data.collectionEmpty);
      })
      .catch(() => setIsSubscriberExistsAlready(false));
  };
  useEffect(() => {
    fetchUnwatchedMovies();
  }, [id]);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <select id="options" name="movieID" onChange={handleChange}>
            <option value="">--Please choose an option--</option>

            {unwatchedMovie?.map((movie) => (
              <option key={movie._id} value={movie._id}>
                {movie.name}
              </option>
            ))}
          </select>

          <input type="date" name="date" onChange={handleChange}></input>
        </div>
        <div>
          <button type="submit">Subscribe</button>
        </div>
      </form>
    </>
  );
};

export default SubscribeToMovie;
