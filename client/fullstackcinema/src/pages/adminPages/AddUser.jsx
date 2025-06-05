import GenericForm from "./GenericForm";

const AddUser = () => {
  return (
    <>
      <h4 style={{ textAlign: "center" }}>Add User</h4>
      <GenericForm action="add" />
    </>
  );
};

export default AddUser;
