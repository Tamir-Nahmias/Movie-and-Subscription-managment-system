import { useEffect, useState } from "react";
import setPermissions from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { USERS_URL } from "../../utils/consts";
import { useSelector } from "react-redux";

const GenericForm = (props) => {
  const { action, defaultValues, id } = props;
  const [permitSub, setPermitSub] = useState(false);
  const [permitMovie, setPermitMovie] = useState(false);
  const [isViewLocked, setIsViewLocked] = useState(false);
  const [isDefaultValFinsihed, setIsDefaultValFinsihed] = useState(false);
  const [isViewLockedMovie, setIsViewLockedMovie] = useState(false);
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);

  useEffect(() => {
    if (action === "edit" && defaultValues?.permissions) {
      setIsDefaultValFinsihed(true);
    }
  }, [action, defaultValues]);

  useEffect(() => {
    if (action === "edit" && defaultValues?.permissions) {
      setformDetails((currentForm) => {
        return {
          ...currentForm,
          permissions: defaultValues.permissions,
          firstname: defaultValues.firstname,
          lastname: defaultValues.lastname,
          username: defaultValues.username,
          sessiontimeout: defaultValues.sessiontimeout,
        };
      });
    }
  }, [defaultValues]);

  const [formDetails, setformDetails] = useState({
    firstname: "",
    lastname: "",
    username: "",
    sessiontimeout: 0,
    permissions: [],
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    const writePermissions = [
      "Create Subscriptions",
      "Update Subscriptions",
      "Delete Subscriptions",
    ];
    const writePermissionsMovie = [
      "Create Movies",
      "Update Movies",
      "Delete Movies",
    ];

    if (type === "checkbox") {
      if (writePermissions.includes(value)) {
        setPermissions(
          setformDetails,
          writePermissions,
          checked,
          value,
          setPermitSub,
          setIsViewLocked,
          "View Subscriptions"
        );
      } else if (writePermissionsMovie.includes(value)) {
        setPermissions(
          setformDetails,
          writePermissionsMovie,
          checked,
          value,
          setPermitMovie,
          setIsViewLockedMovie,
          "View Movies"
        );
      } else if (value === "View Subscriptions") {
        setformDetails((prevDetails) => {
          let updatedPermissions = checked
            ? [...prevDetails.permissions, value]
            : prevDetails.permissions.filter((perm) => perm !== value);

          setPermitSub(checked);
          setIsViewLocked(false);

          return { ...prevDetails, permissions: updatedPermissions };
        });
      } else if (value === "View Movies") {
        setformDetails((prevDetails) => {
          let updatedPermissions = checked
            ? [...prevDetails.permissions, value]
            : prevDetails.permissions.filter((perm) => perm !== value);

          setPermitMovie(checked);
          setIsViewLockedMovie(false);

          return { ...prevDetails, permissions: updatedPermissions };
        });
      }
    } else {
      setformDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmitAdd = (event) => {
    event.preventDefault();
    axios
      .post(USERS_URL, formDetails, {
        headers: {
          "x-access-token": token,
        },
      })
      .then(() => {
        navigate("../all-users");
      });
  };

  const handleSubmitUpdate = (event) => {
    event.preventDefault();
    axios
      .put(`${USERS_URL}/${id}`, formDetails, {
        headers: {
          "x-access-token": token,
        },
      })
      .then(() => navigate("../all-users"))
      .catch((error) => console.error(error));
  };

  const handleCancel = () => {
    navigate("../all-users"); // relative path
    //second option
    // navigate("/main/manage-users/all-users"); // absolute path
  };

  return (
    <>
      <form onSubmit={action === "add" ? handleSubmitAdd : handleSubmitUpdate}>
        <div>
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            onChange={handleChange}
            defaultValue={defaultValues?.firstname ?? ""}
          />
        </div>

        <div>
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            onChange={handleChange}
            defaultValue={defaultValues?.lastname ?? ""}
          />
        </div>

        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleChange}
            defaultValue={defaultValues?.username ?? ""}
          />
        </div>

        <div>
          <label htmlFor="sessiontimeout">Session Timeout (minutes)</label>
          <input
            type="number"
            id="sessiontimeout"
            name="sessiontimeout"
            onChange={handleChange}
            defaultValue={defaultValues?.sessiontimeout ?? ""}
          />
        </div>

        <div>
          <label htmlFor="createdDate">
            Created Date : {defaultValues?.createdDate ?? ""}
          </label>
        </div>

        {(action === "add" || isDefaultValFinsihed) && (
          <fieldset>
            <legend>Permissions</legend>

            <label>
              <input
                type="checkbox"
                name="permissions"
                value="View Subscriptions"
                onChange={handleChange}
                disabled={isViewLocked}
                checked={
                  action === "edit"
                    ? formDetails?.permissions?.includes(
                        "View Subscriptions"
                      ) ?? false
                    : permitSub
                }
              />
              View Subscriptions
            </label>
            <br />

            <label>
              <input
                type="checkbox"
                name="permissions"
                value="Create Subscriptions"
                onChange={handleChange}
                defaultChecked={
                  action === "edit"
                    ? defaultValues?.permissions?.includes(
                        "Create Subscriptions"
                      ) ?? false
                    : false
                }
              />
              Create Subscriptions
            </label>
            <br />

            <label>
              <input
                type="checkbox"
                name="permissions"
                value="Delete Subscriptions"
                onChange={handleChange}
                defaultChecked={
                  action === "edit"
                    ? defaultValues?.permissions?.includes(
                        "Delete Subscriptions"
                      ) ?? false
                    : false
                }
              />
              Delete Subscriptions
            </label>
            <br />

            <label>
              <input
                type="checkbox"
                name="permissions"
                value="Update Subscriptions"
                onChange={handleChange}
                defaultChecked={
                  action === "edit"
                    ? defaultValues?.permissions?.includes(
                        "Update Subscriptions"
                      ) ?? false
                    : false
                }
              />
              Update Subscriptions
            </label>
            <br />

            <label>
              <input
                type="checkbox"
                name="permissions"
                value="View Movies"
                onChange={handleChange}
                // checked={permitMovie}
                checked={
                  action === "edit"
                    ? formDetails?.permissions?.includes("View Movies") ?? false
                    : permitMovie
                }
                disabled={isViewLockedMovie}
              />
              View Movies
            </label>
            <br />

            <label>
              <input
                type="checkbox"
                name="permissions"
                value="Create Movies"
                onChange={handleChange}
                defaultChecked={
                  action === "edit"
                    ? defaultValues?.permissions?.includes("Create Movies") ??
                      false
                    : false
                }
              />
              Create Movies
            </label>
            <br />

            <label>
              <input
                type="checkbox"
                name="permissions"
                value="Delete Movies"
                onChange={handleChange}
                defaultChecked={
                  action === "edit"
                    ? defaultValues?.permissions?.includes("Delete Movies") ??
                      false
                    : false
                }
              />
              Delete Movies
            </label>
            <br />

            <label>
              <input
                type="checkbox"
                name="permissions"
                value="Update Movies"
                onChange={handleChange}
                defaultChecked={
                  action === "edit"
                    ? defaultValues?.permissions?.includes("Update Movies") ??
                      false
                    : false
                }
              />
              Update Movies
            </label>
          </fieldset>
        )}

        <div>
          <button type="submit">{action}</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </>
  );
};

export default GenericForm;
