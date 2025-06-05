import { Link, useParams } from "react-router";
import AddUpdateMovieForm from "./AddUpdateMovieForm";
const UpdateMovie = () => {
  const { id } = useParams();
  return <AddUpdateMovieForm id={id} isEdit={true} />;
};

export default UpdateMovie;
