import jsonfile from "jsonfile";

const PATH = "./data/usersData.json";

const getUsersJson = () => {
  return jsonfile.readFile(PATH);
};

const addUserJson = async (obj) => {
  try {
    const currentUsers = await jsonfile.readFile(PATH); // read once
    currentUsers.push(obj); // update directly
    await jsonfile.writeFile(PATH, currentUsers); // write updated array
    return true;
  } catch (error) {
    console.error("Failed to update user details:", error);
    throw error;
  }
};

const deleteUserByID = async (id) => {
  try {
    const currentUsers = await jsonfile.readFile(PATH); // read once
    const filteredList = currentUsers.filter((user) => user.id !== id);
    await jsonfile.writeFile(PATH, filteredList);
    return `user with id ${id} has been removed`;
  } catch (error) {
    throw error;
  }
};

const updateUserById = async (id, obj) => {
  const currentUsers = await getUsersJson();
  const foundUser = currentUsers.find((user) => user.id === id);
  const index = currentUsers.indexOf(foundUser);
  await currentUsers.splice(index, 1);
  currentUsers.push({ ...foundUser, ...obj });
  await jsonfile.writeFile(PATH, currentUsers);
  return `user id ${id} has changes successfully`;
};

export { getUsersJson, addUserJson, deleteUserByID, updateUserById };
