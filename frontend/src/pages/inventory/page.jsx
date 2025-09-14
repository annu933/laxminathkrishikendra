import { Link } from "react-router-dom";

const React = require("react");

function Inventory() {
  const [data, setData] = React.useState([]);
    console.log(" data",data)

    React.useEffect(() => {
    fetch("/inventory")
      .then(res => res.json())
      .then(data => {
        console.log("Fetched data:", data);
        setData(data?.items);
      });
  }, []);

  const handleDelete =async(id) =>{
    const response = await fetch(`inventory/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if(response.ok){
      const updatedData = data.filter(item => item._id !== id);
      setData(updatedData);
      alert("Item deleted successfully");
    }
    else {
      alert("Failed to delete item");
    }
  }
  return (
    <div>
      <h1>All Inventory Items</h1>
       <Link to="/inventory/create">
        <button>Add Inventory Item</button>
      </Link>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>PurchasePrice</th>
            <th>SellingPrice</th>
            <th>Quantity</th>
            <th>Supplier</th>
            <th>Expiry Date</th>
            <th>Unit</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.purchasePrice}</td>
              <td>{product.sellingPrice}</td>
              <td>{product.quantity}</td>
              <td>{product.supplier}</td>
              <td>{product.expiryDate}</td>
              <td>{product.unit}</td>
              <td>
                <Link to={`/inventory/edit/${product._id}`}>
                  <button
                  >
                    Edit
                    </button>
                </Link>
                <button
              onClick ={()=>handleDelete(product._id)}
              >
                Delete
                </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;
