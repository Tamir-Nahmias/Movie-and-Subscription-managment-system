import { useState } from "react";

const SubscribeToMovie = () => {
  const [details, setDetails] = useState({});
  const handleChange = (event) => {
    const { name, value } = event.target;
    setDetails((prevDetails) => setDetails({ ...prevDetails, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <select id="options" name="movies" onChange={handleChange}>
            <option value="">--Please choose an option--</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
            <option value="option4">Option 4</option>
          </select>
          <input type="date" onChange={handleChange}></input>
        </div>
        <div>
          <button type="submit">Subscribe</button>
        </div>
      </form>
    </>
  );
};

export default SubscribeToMovie;
