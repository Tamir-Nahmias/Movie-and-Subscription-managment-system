import {
  addUserJson,
  deleteUserByID,
  getUsersJson,
  updateUserById,
} from "../repositories/usersFileRepo.js";
import {
  addUserPermissions,
  deleteUserByIDPermission,
  getUsersPermissions,
  updateUserPermissionsById,
} from "../repositories/permissionsFileRepo.js";

import {
  getAllUsers as getAllUsersDB,
  getUserById,
  addUser as addUserDB,
  updateUser,
  deleteUser,
} from "../repositories/usersDBRepo.js";

const getAllUsers = async (filters) => {
  return getAllUsersDB(filters);
};

const isUserNameExistInDB = async (username) => {
  const result = await getAllUsers({ username: username });
  return result.length > 0 ? result[0] : false;
};

const getUserFullDetailsByID = async (id) => {
  const permissions = await getPermissionsById(id);
  const personalDetails = await getDetailsById(id);
  const { username } = await getUserById(id);
  return { ...permissions[0], ...personalDetails[0], username };
};
const getUsersFullDetailsFromAllSources = async () => {
  debugger;
  const userDB = await getAllUsers();
  const permissionsDetails = await getUsersPermissions();
  const permissionMap = new Map(
    permissionsDetails.map((user) => [user.id, user.permissions])
  );
  const personalDetails = await getUsersJson();
  const personsDetailsMap = new Map(
    personalDetails.map((user) => [user.id, user])
  );
  console.log(permissionMap, personsDetailsMap);
  debugger;
  return userDB.map((user) => {
    const id = user._id.toString();
    return {
      id,
      permissions: permissionMap.get(id) || "",
      username: user.username || "",
      firstname: personsDetailsMap.get(id)?.firstname || "",
      createdDate: personsDetailsMap.get(id)?.createdDate || "",
      lastname: personsDetailsMap.get(id)?.lastname || "",
      sessiontimeout: personsDetailsMap.get(id)?.sessiontimeout || 0,
    };
  });
};

const getPermissionsById = async (id) => {
  const permissions = await getUsersPermissions();
  return permissions.filter((user) => user.id == id);
};

const getDetailsById = async (id) => {
  const personDetails = await getUsersJson();
  return personDetails.filter((user) => user.id == id);
};

const addUserInAllSources = async (obj) => {
  const { username, permissions, firstname, lastname, sessiontimeout } = obj;
  //createdDate should be set up here
  // id - first we create a db user - then we retrieve its id and then setting up the json user files
  try {
    const { _id } = await addUserDB({ username: username, password: "INIT" });

    await addUserJson({
      id: _id,
      firstname,
      lastname,
      createdDate: new Date().toLocaleDateString(),
      sessiontimeout,
    });
    await addUserPermissions({ id: _id, permissions: permissions });
    return _id;
  } catch (error) {
    return new Error(error);
  }
};

const deleteUserFromAllSources = async (id) => {
  try {
    const deletedUser = await deleteUser(id);
    await deleteUserByID(id);
    await deleteUserByIDPermission(id);
    if (!deletedUser) return "no user to delete was found";
    return `user with id ${id} has been removed succefuly`;
  } catch (error) {
    console.error("error accured", error);
    throw error;
  }
};

const updateUserInAllSources = async (id, obj) => {
  try {
    const { username, firstname, lastname, permissions, sessiontimeout } = obj;
    const dbResult = await updateUser(id, { username });
    const userResult = await updateUserById(id, {
      firstname,
      lastname,
      sessiontimeout,
    });
    const permissionsResult = await updateUserPermissionsById(id, {
      permissions,
    });
    return { dbResult, userResult, permissionsResult };
  } catch (err) {
    console.error("error occured : ");
    throw new Error(`Error in userService update user details ${obj}`);
  }
};

const setUserPassWordDB = (id, obj) => {
  return updateUser(id, obj);
};

export {
  getAllUsers,
  getUserFullDetailsByID,
  addUserInAllSources,
  getUsersFullDetailsFromAllSources,
  deleteUserFromAllSources,
  updateUserInAllSources,
  isUserNameExistInDB,
  setUserPassWordDB,
};
