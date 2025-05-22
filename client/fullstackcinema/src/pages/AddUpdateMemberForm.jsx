import axios from "axios";
import { useEffect, useState } from "react";
import { MEMBERS_URL } from "../utils/consts";
import { useNavigate } from "react-router";

const AddUpdateMemberForm = ({ isEdit, id }) => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

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
        .get(`${MEMBERS_URL}/${id}`)
        .then(({ data }) => setFormData(data))
        .catch((err) => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    isEdit
      ? ""
      : axios
          .post(MEMBERS_URL, formData)
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

      <button type="submit">{isEdit ? "Update" : "Add"}</button>
      <button type="button" onClick={handleCancel}>
        cancel
      </button>
    </form>
  );
};

export default AddUpdateMemberForm;
