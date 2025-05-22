import { useParams } from "react-router";
import AddUpdateMemberForm from "./AddUpdateMemberForm";

const UpdateMember = () => {
  const { id } = useParams();
  return (
    <>
      <h2>Update Member</h2>;
      <AddUpdateMemberForm id={id} isEdit={true} />
    </>
  );
};

export default UpdateMember;
