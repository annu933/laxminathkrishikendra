const React = require("react");

function Create() {
 

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target); // auto-collects all input values

  const response = await fetch("/product/create", {
    method: "POST",
    body: formData, // no need for headers like 'Content-Type'
  });

  if (response.ok) {
    alert("Product created successfully");
    e.target.reset();
  } else {
    alert("Failed to create product");
  }
};

  return (
    <div>
      <h1>Add Fertilizer</h1>
      <form onSubmit={handleSubmit}>
          <label>Name: <input type="text" name="name" required /></label><br />
          <label>Type: <input type="text" name="type" required /></label><br />
          <label>Price: <input type="number" name="price" required /></label><br />
          <label>Stock: <input type="number" name="stock" required /></label><br />
          <button type="submit">Submit</button>
        </form>
    </div>
  );
}

export default Create;
