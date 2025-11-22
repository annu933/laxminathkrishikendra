import { Link } from "react-router-dom";
import { ApiContext } from "../../context/ApiContext";

const React = require("react");

function Product() {
  const axiosInstance = React.useContext(ApiContext);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    axiosInstance.get("/product")
      .then((res) => {
        console.log("Fetched data:", res.data);
        setData(res.data);
      })
      .catch(err => console.log("error:", err));
  }, []);

  return (
    <div>
      <h1>All Products   hello</h1>
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
          {data &&
            data.map((product, index) => (
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
