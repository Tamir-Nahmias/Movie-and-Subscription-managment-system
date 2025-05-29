import { useState } from "react";
import axios from "axios";
import { MOVIES_URL } from "../utils/consts";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const AddUpdateMovieForm = ({ id, isEdit }) => {
  const [formDetails, setFormDetails] = useState({});
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();
  const handleChange = (event) => {
    const attribute = event.target.name;
    const value = event.target.value;
    setFormDetails({ ...formDetails, [attribute]: value });
  };
  useEffect(() => {
    {
      isEdit &&
        axios
          .get(`${MOVIES_URL}/${id}`, {
            headers: {
              "x-access-token": token,
            },
          })
          .then(({ data }) => setFormDetails(data));
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    isEdit
      ? axios
          .put(`${MOVIES_URL}/${id}`, formDetails, {
            headers: {
              "x-access-token": token,
            },
          })
          .then(({ data }) => console.log(data))
      : axios
          .post(MOVIES_URL, formDetails, {
            headers: {
              "x-access-token": token,
            },
          })
          .then(navigate("../all-movies"));
  };
  const handleCancel = () => {
    navigate("../all-movies");
  };
  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              placeholder="The GodFather"
              onChange={handleChange}
              name="name"
              defaultValue={(isEdit && formDetails.name) || ""}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="genres">Genres:</label>
            <input
              type="text"
              id="genres"
              placeholder="Drama,Thriller"
              onChange={handleChange}
              name="genres"
              defaultValue={(isEdit && formDetails.genres) || ""}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl">Image URL:</label>
            <input
              type="text"
              id="imageUrl"
              placeholder="http://www.someurl.jp"
              onChange={handleChange}
              name="image"
              defaultValue={(isEdit && formDetails.image) || ""}
            ></input>
          </div>

          <div className="form-group">
            <label htmlFor="premiered">Premiered:</label>
            <input
              type="date"
              id="premiered"
              onChange={handleChange}
              name="premiered"
              defaultValue={isEdit && formDetails.premiered?.split("T")[0]}
            ></input>
          </div>

          <div className="button-group">
            <button type="submit" className="save-btn">
              Save
            </button>
            <button type="button" className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddUpdateMovieForm;
