import { useEffect, useState } from "react";
import axios from "axios";
import { MEMBERS_URL, MOVIES_URL, SUBS_URL } from "../utils/consts";
import { Link, useLocation, useNavigate } from "react-router";
import SubscribeToMovie from "./SubscribeToMovie";

const AllMembers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [members, setMembers] = useState([]);
  const [watchedMoviesByMember, setWatchedMoviesByMember] = useState([]);
  const [openMemberIds, setOpenMemberIds] = useState([]);
  const [refreshList, setRefreshList] = useState(true);

  const openSubscribeForm = (id) => {
    setOpenMemberIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const fetchMembers = () => {
    const queryParams = new URLSearchParams(location.search);
    const memberID = queryParams.get("memberID");
    axios
      .get(`${MEMBERS_URL}/${memberID ?? ""}`)
      .then(({ data }) =>
        Array.isArray(data) ? setMembers(data) : setMembers([data])
      );
  };

  const fetchWatchedMovies = () => {
    axios
      .get(`${MOVIES_URL}/join-subscriptions`)
      .then(({ data }) => setWatchedMoviesByMember(data))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fetchWatchedMovies();
  }, [refreshList]);

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleEdit = (id) => {
    navigate(`../edit-members/${id}`);
  };
  const handlDelete = (id) => {
    axios
      .delete(`${MEMBERS_URL}/${id}`)
      .then(() => fetchMembers())
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div>AllMembers</div>
      <ul>
        {members.map((member) => (
          <li key={member._id}>
            <div>Name: {member.name}</div>
            <div>Email: {member.email}</div>
            <div>City: {member.city}</div>
            <div>
              Movies Watched:
              <ul>
                {watchedMoviesByMember
                  ?.filter(
                    (subscription) => member._id == subscription.memberID
                  )
                  .flatMap((subscription) =>
                    subscription.movies.map((movie, index) => (
                      <li key={`${subscription._id}-${index}`}>
                        <Link to={`../../movies/all-movies?name=${movie.name}`}>
                          {movie.name}
                        </Link>
                        ,{new Date(movie.date).toLocaleDateString()}
                      </li>
                    ))
                  )}
              </ul>
              <button
                onClick={() => {
                  openSubscribeForm(member._id);
                }}
              >
                Subscribe to new movie
              </button>
              {openMemberIds.includes(member._id) && (
                <SubscribeToMovie
                  id={member._id}
                  setRefreshList={setRefreshList}
                  refreshList={refreshList}
                />
              )}
            </div>
            <div>
              <button onClick={() => handleEdit(member._id)}>Edit</button>
              <button onClick={() => handlDelete(member._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AllMembers;
