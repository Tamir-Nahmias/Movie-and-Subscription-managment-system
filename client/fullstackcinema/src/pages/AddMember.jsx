import AddUpdateMemberForm from "./AddUpdateMemberForm";

const AddMember = () => {
  return (
    <>
      <div>Add Member</div>
      <AddUpdateMemberForm isEdit={false} />
    </>
  );
};

export default AddMember;
