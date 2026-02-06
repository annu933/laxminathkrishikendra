// // /frontend/src/pages/page.jsx
// import { Link } from "react-router-dom";
// import { ApiContext } from "../../context/ApiContext";

// const React = require("react");

// function Product() {
//   const axiosInstance = React.useContext(ApiContext);
//   const [data, setData] = React.useState([]);

//   React.useEffect(() => {
//     axiosInstance.get("/product")
//       .then((res) => {
//         console.log("Fetched data:", res);
//         setData(res.data?.products);
//       })
//       .catch(err => console.log("error:", err));
//   }, []);

//   const handleDelete = async (id) => {
//     const res = await fetch(`/product/delete/${id}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//     if (res.ok) {
//       const updatedData = data.filter((item) => item._id !== id);
//       setData(updatedData)
//       alert("Successfully deleted product")
//     } else {
//       alert("Failed to delete item")
//     }
//   }

//   return (
//     <div>
//       <h1>All Products   hello</h1>
//       <Link to="/product/create">
//         <button>Add Product</button>
//       </Link>
//       <table border="1" cellPadding="10">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Type</th>
//             <th>Price</th>
//             <th>Stock</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data &&
//             data.map((product, index) => (
//               <tr key={index}>
//                 <td>{product.name}</td>
//                 <td>{product.type}</td>
//                 <td>{product.price}</td>
//                 <td>{product.stock}</td>
//                 <td>
//                   <Link to={`/product/edit/${product._id}`}>
//                     <button>Edit</button>
//                   </Link>
//                   <button onClick={() => handleDelete(product._id)}>
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Product;



import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../context/ApiContext";
import { useNavigate } from "react-router-dom";
import TableComponent from "../../components/table/TableComponent";

const ProductPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let queryParams = `?page=${page}&limit=${limit}`;
    axiosInstance.get("/product" + queryParams).then((res) => {
      setProducts(res.data.results || res.data);
      setTotalResults(res.data.pagination?.totalRecords || 0);
      setTotalPages(res.data.pagination?.totalPages || 1);
    });
  }, [page, limit]);

  const columns = [
    { key: "name", label: "Name" },
    { key: "type", label: "Type" },
    { key: "price", label: "Price" },
    { key: "stock", label: "Stock" },
  ];

  return (
    <div>
      <h2>Products</h2>

      <TableComponent
        columns={columns}
        data={products}
        actions={(row) => (
          <>
            <button onClick={() => navigate(`/product/edit/${row._id}`)}>
              Edit
            </button>
            <button onClick={() => console.log("Delete", row._id)}>
              Delete
            </button>
          </>
        )}
        page={page}
        limit={limit}
        totalPages={totalPages}
        totalResults={totalResults}
        onPageChange={setPage}
        onLimitChange={(val) => {
          setPage(1);
          setLimit(val);
        }}
      />
    </div>
  );
};

export default ProductPage;

