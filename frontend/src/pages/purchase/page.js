// import { Link } from "react-router-dom";
// import { ApiContext } from "../../context/ApiContext";
// import React from "react";

// function Purchases() {
//     const axiosInstance = React.useContext(ApiContext);
//     const [data, setData] = React.useState([]);

//     React.useEffect(() => {
//         axiosInstance
//             .get("/purchase")
//             .then((res) => {
//                 console.log("Fetched Purchases:", res.data);

//                 // Normalize response
//                 const list = Array.isArray(res.data)
//                     ? res.data
//                     : Array.isArray(res.data.data)
//                         ? res.data.data
//                         : [];

//                 setData(list);
//             })
//             .catch((err) => console.log("Error fetching purchases:", err));
//     }, []);

//     const handleDelete = async (id) => {
//         const res = await fetch(`/purchase/delete/${id}`, {
//             method: "DELETE",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         })
//         if (res.ok) {
//             const updatedData = data.filter((item) => item._id !== id);
//             setData(updatedData)
//             alert("Successfully deleted purchase")
//         } else {
//             alert("Failed to delete item")
//         }
//     }

//     return (
//         <div>
//             <h1>All Purchases</h1>

//             <Link to="/purchase/create">
//                 <button>Add Purchase</button>
//             </Link>

//             <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
//                 <thead>
//                     <tr>
//                         <th>Product Name</th>
//                         <th>Quantity</th>
//                         <th>Purchase Price</th>
//                         <th>Supplier</th>
//                         <th>Date</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>

//                 <tbody>
//                     {data.length > 0 ? (
//                         data.map((item, index) => (
//                             <tr key={index}>
//                                 <td>{item.inventoryId?.name || "N/A"}</td>
//                                 <td>{item.quantity}</td>
//                                 <td>{item.purchasePrice}</td>
//                                 <td>{item.supplier}</td>
//                                 <td>{new Date(item.date).toLocaleDateString()}</td>
//                                 <td>
//                                     <Link to={`/purchase/edit/${item._id}`}>
//                                         <button>Edit</button>
//                                     </Link>
//                                     <button onClick={() => handleDelete(item._id)}>
//                                         Delete
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="5">No Purchases Found</td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default Purchases;


import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../context/ApiContext";
import { useNavigate } from "react-router-dom";
import TableComponent from "../../components/table/TableComponent";

const PurchasePage = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [purchase, setPurchase] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let queryParams = `?page=${page}&limit=${limit}`;
        axiosInstance.get(`/purchase${queryParams}`).then((res) => {
            console.log("Fetched Purchases:", res.data);
            setPurchase(res.data.results || []);
            setTotalResults(res.data.pagination?.totalRecords || 0);
            setTotalPages(res.data.pagination?.totalPages || 1);
        });
    }, [page, limit]);

    const columns = [
        {
            key: "inventoryId", label: "Product Name",
            render: (row) => row.inventoryId?.name || "N/A",
        },
        { key: "quantity", label: "Quantity" },
        { key: "purchasePrice", label: "Purchase Price" },
        { key: "supplier", label: "Supplier" },
        { key: "date", label: "Date" },
    ];

    return (
        <div>
            <h2>Purchase</h2>

            <TableComponent
                columns={columns}
                data={purchase}
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

export default PurchasePage;