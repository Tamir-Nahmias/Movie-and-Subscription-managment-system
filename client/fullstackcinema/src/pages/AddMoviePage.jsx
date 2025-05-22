import AddUpdateMovieForm from "./AddUpdateMovieForm";

const AddMoviePage = () => {
  return (
    <>
      <h2>Add Movie Page</h2>
      <AddUpdateMovieForm isEdit={false} />
    </>
  );
};

export default AddMoviePage;
