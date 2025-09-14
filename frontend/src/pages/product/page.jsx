import { Link } from "react-router-dom";

const React = require("react");

function Product() {
  const [data, setData] = React.useState([]);
    console.log(" data",data)

    React.useEffect(() => {
    fetch("/product")
      .then(res => res.json())
      .then(data => {
        console.log("Fetched data:", data);
        setData(data);
      });
  }, []);
  return (
    <div>
      <h1>All Products</h1>
       <Link to="/products/create">
        <button>Add Product</button>
      </Link>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.type}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Product;
