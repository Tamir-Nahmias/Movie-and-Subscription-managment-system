import { useParams } from "react-router";
import AddUpdateMemberForm from "./AddUpdateMemberForm";

const UpdateMember = () => {
  const { id } = useParams();
  return <AddUpdateMemberForm id={id} isEdit={true} />;
};

export default UpdateMember;
