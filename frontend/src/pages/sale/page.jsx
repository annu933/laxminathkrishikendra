// import React, { useEffect, useState } from "react";
// import { axiosInstance } from "../../context/ApiContext";
// import { Link, useNavigate } from "react-router-dom";

// const SalesTable = () => {
//   const navigate = useNavigate();
//   const [sales, setSales] = useState([]);

//   React.useEffect(() => {
//     axiosInstance.get("/sales")
//       .then((res) => {
//         console.log("Fetched data:", res.data);
//         setSales(res.data);
//       })
//       .catch(err => console.log("error:", err));
//   }, []);

//   const handleDelete = async (id) => {
//     const res = await fetch(`/sales/delete/${id}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       }
//     })

//     if (res.ok) {
//       const updateData = sales.filter(item => item._id !== id)
//       setSales(updateData)
//       alert("Successfully deleted sale")
//     }
//     else {
//       alert("Failed to delete item")
//     }

//   }

//   return (
//     <div>
//       <h2>Sales Report</h2>

//       <button onClick={() => navigate("/sales/create")}>Create</button>
//       <table border="1" cellPadding="8" cellSpacing="0">
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Product</th>
//             <th>Customer</th>
//             <th>Quantity Sold</th>
//             <th>Price/Unit</th>
//             <th>Total</th>
//             <th>Date</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {sales.length === 0 ? (
//             <tr>
//               <td colSpan="7">No sales data</td>
//             </tr>
//           ) : (
//             sales.map((sale, index) => (
//               <tr key={sale._id}>
//                 <td>{index + 1}</td>
//                 <td>{sale.product?.name || "Unknown"}</td>
//                 <td>{sale.customerName || "-"}</td>
//                 <td>{sale.quantitySold}</td>
//                 <td>{sale.sellingPrice}</td>
//                 <td>{sale.quantitySold * sale.sellingPrice}</td>
//                 <td>{new Date(sale.soldAt).toLocaleDateString()}</td>
//                 <td>
//                   <Link to={`/sales/edit/${sale._id}`}>
//                     <button>Edit</button>
//                   </Link>
//                   <button onClick={() => handleDelete(sale._id)}>
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default SalesTable;


import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../context/ApiContext";
import { useNavigate } from "react-router-dom";
import TableComponent from "../../components/table/TableComponent";

const SalesPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  //------
  const [sales, setSales] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let queryParams = `?page=${page}&limit=${limit}`
    axiosInstance.get("/sales" + queryParams)
      .then((res) => {
        console.log("Fetched Sales:", res.data?.results);
        setSales(res.data?.results);
        setTotalResults(res.data.pagination?.totalRecords || 0);
        setTotalPages(res.data.pagination?.totalPages || 1);
      })
      .catch(err => console.log("error:", err));
  }, [page, limit]);

  const columns = [
    {
      key: "product",
      label: "Product",
      render: (row) => row.product?.name || "Unknown",
    },
    {
      key: "customerName",
      label: "Customer",
      render: (row) => row.customerName || "-",
    },
    {
      key: "quantitySold",
      label: "Quantity Sold",
    },
    {
      key: "sellingPrice",
      label: "Price / Unit",
    },
    {
      key: "total",
      label: "Total",
      render: (row) => row.quantitySold * row.sellingPrice,
    },
    {
      key: "soldAt",
      label: "Date",
      render: (row) =>
        new Date(row.soldAt).toLocaleDateString(),
    },
  ];

  return (
    <div>
      <h2>Sales Report</h2>

      <button onClick={() => navigate("/sales/create")}>
        Create Sale
      </button>

      <TableComponent
        columns={columns}
        data={sales}
        actions={(row) => (
          <>
            <button onClick={() => navigate(`/sales/edit/${row._id}`)}>
              Edit
            </button>
            <button
              onClick={() => console.log("Delete", row._id)}
            >
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

export default SalesPage;
