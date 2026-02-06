import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../context/ApiContext";

const React = require("react");

function Create() {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target); // auto-collects all input values
    const data = Object.fromEntries(new FormData(e.target).entries());

    try {
      const response = await axiosInstance.post("/product/create", data);
      console.log("response-data", response.data)
      navigate("/product")
      return response.data;
    } catch (error) {
      console.log(error)
    }


    console.log("formData", formData);
  };

  return (
    <div>
      <h1>Add Fertilizer</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name: <input type="text" name="name" required />
        </label>
        <br />
        {/* <label>Type: <input type="text" name="type" required /></label><br /> */}
        <label>
          Type:
          <select name="type" required>
            <option value="">--Select Type--</option>
            <option value="organic">Organic</option>
            <option value="chemical">Chemical</option>
            <option value="bio">Bio</option>
          </select>
        </label>
        <br />
        <label>
          Price: <input type="number" name="price" required />
        </label>
        <br />
        <label>
          Stock: <input type="number" name="stock" required />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Create;
