// import React, { useState } from "react";
// import "../dashboard/dashboard.css"; // We'll write styles here
// import { useNavigate } from "react-router-dom";
// import { axiosInstance } from "../../context/ApiContext";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [dashboardData, setDashboardData] = useState();

//   React.useEffect(() => {
//     axiosInstance.get("/dashboard")
//       .then((res) => {
//         console.log("res", res.data);
//         setDashboardData(res.data?.summary);
//       })
//       .catch(err => console.log("error", err))
//   }, [])

//   return (
//     <div className="dashboard-container">
//       <h1 className="dashboard-title">Fertilizer Shop Dashboard</h1>

//       <div className="dashboard-cards">
//         <div className="card green" onClick={() => navigate("/inventory")}>
//           <h3>Total Inventory</h3>
//           <p>{dashboardData?.total_inventory}</p>
//         </div>
//         <div className="card blue" onClick={() => navigate("/inventory")}>
//           <h3>Total Product</h3>
//           <p>{dashboardData?.total_product}</p>
//         </div>
//         <div className="card red" onClick={() => navigate("/inventory")}>
//           <h3>Total Sales</h3>
//           <p>{dashboardData?.total_sales}</p>
//         </div>
//         <div className="card blue" onClick={() => navigate("/inventory")}>
//           <h3>Total Stock</h3>
//           <p>1,200 kg</p>
//         </div>
//         <div className="card green" onClick={() => navigate("/inventory")}>
//           <h3>Total Sales</h3>
//           <p>₹85,000</p>
//         </div>
//         <div className="card yellow" onClick={() => navigate("/inventory")}>
//           <h3>Total Purchases</h3>
//           <p>₹45,000</p>
//         </div>
//         <div className="card red" onClick={() => navigate("/inventory")}>
//           <h3>Low Stock Items</h3>
//           <p>5 Products</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../context/ApiContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/dashboard")
      .then((res) => {
        setData(res.data.summary);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Fertilizer Shop Dashboard</h1>

      <div className="dashboard-cards">
        <div className="card green" onClick={() => navigate("/product")}>
          <h3>Total Products</h3>
          <p>{data.total_product}</p>
        </div>

        <div className="card blue" onClick={() => navigate("/inventory")}>
          <h3>Total Inventory Items</h3>
          <p>{data.total_inventory}</p>
        </div>

        <div className="card red" onClick={() => navigate("/sales")}>
          <h3>Total Sales</h3>
          <p>{data.total_sales}</p>
        </div>

        <div className="card green" onClick={() => navigate("/sales")}>
          <h3>Total Revenue</h3>
          <p>₹ {data.total_revenue}</p>
        </div>

        <div className="card yellow" onClick={() => navigate("/inventory")}>
          <h3>Low Stock Items</h3>
          <p>{data.low_stock_items}</p>
        </div>

        <div className="card red" onClick={() => navigate("/inventory")}>
          <h3>Out of Stock Items</h3>
          <p>{data.out_of_stock_items}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
