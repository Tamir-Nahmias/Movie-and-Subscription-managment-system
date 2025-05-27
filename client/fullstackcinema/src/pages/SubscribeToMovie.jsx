import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { MOVIES_URL, SUBS_URL } from "../utils/consts";

const SubscribeToMovie = ({ id, refreshList, setRefreshList }) => {
  const [unwatchedMovie, setUnwatchedMovie] = useState([]);
  const [details, setDetails] = useState({});
  const [isSubscriberExistsAlready, setIsSubscriberExistsAlready] = useState();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isSubscriberExistsAlready) {
      axios.post(`${SUBS_URL}`, {
        memberID: id,
        movies: [
          {
            movieID: details.movieID,
            date: details.date,
          },
        ],
      });
      fetchUnwatchedMovies(); // refreshing lists
      setRefreshList(!refreshList);
    } else {
      axios.put(`${SUBS_URL}/update-subscription/${id}`, {
        movieID: details.movieID,
        date: details.date,
      });
      setRefreshList(!refreshList);
      fetchUnwatchedMovies(); //for refrshing the list after submitting the request
    }
  };
  const fetchUnwatchedMovies = () => {
    if (!id) return;
    axios
      .get(`${MOVIES_URL}/unwatched-movies/${id}`)
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
