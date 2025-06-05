import axios from "axios";
import { useEffect, useState } from "react";
import { MEMBERS_URL } from "../utils/consts";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const AddUpdateMemberForm = ({ isEdit, id }) => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);

  const handleCancel = () => {
    navigate("../all-members");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    isEdit &&
      axios
        .get(`${MEMBERS_URL}/${id}`, {
          headers: {
            "x-access-token": token,
          },
        })
        .then(({ data }) => setFormData(data))
        .catch((err) => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, city } = formData;
    isEdit
      ? axios.put(`${MEMBERS_URL}/${id}`, formData, {
          headers: {
            "x-access-token": token,
          },
        })
      : axios
          .post(MEMBERS_URL, formData, {
            headers: {
              "x-access-token": token,
            },
          })
          .then(({ data }) => console.log(`user added succesfuly`, data));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>
        {isEdit ? "Edit" : "Add New"} Member : {formData.name}
      </h2>

      <div>
        <label>
          Name :
          <input
            type="text"
            name="name"
            onChange={handleChange}
            defaultValue={formData.name}
          />
        </label>
      </div>

      <div>
        <label>
          Email
          <input
            type="email"
            name="email"
            onChange={handleChange}
            defaultValue={formData.email}
          />
        </label>
      </div>

      <div>
        <label>
          City
          <input
            type="text"
            name="city"
            onChange={handleChange}
            defaultValue={formData.city}
          />
        </label>
      </div>
      <div className="btn-cluster">
        <button type="submit">{isEdit ? "Update" : "Add"}</button>
        <button type="button" onClick={handleCancel} className="btn-cancel">
          cancel
        </button>
      </div>
    </form>
  );
};

export default AddUpdateMemberForm;
