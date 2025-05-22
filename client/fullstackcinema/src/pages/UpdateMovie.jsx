import { Link, useParams } from "react-router";
import AddUpdateMovieForm from "./AddUpdateMovieForm";
const UpdateMovie = () => {
  const { id } = useParams();
  return (
    <div>
      Update Movie
      <AddUpdateMovieForm id={id} isEdit={true} />
    </div>
  );
};

export default UpdateMovie;
