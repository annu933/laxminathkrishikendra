import React from "react";
import "../dashboard/dashboard.css"; // We'll write styles here
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
const navigate = useNavigate();


React.useEffect(() => {
  const fetchDashboard = async () => {
    try {
      const res = await fetch('/dashboard'); // proxy will send to 3001
      const data = await res.json();
      console.log(data); // { summary: 12 }
    } catch (err) {
      console.error("Error fetching dashboard:", err);
    }
  };

  fetchDashboard();
}, []);
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Fertilizer Shop Dashboard</h1>

      <div className="dashboard-cards">
        <div className="card blue" onClick={()=>navigate("/inventory")}>
          <h3>Total Stock</h3>
          <p>1,200 kg</p>
        </div>
        <div className="card green" onClick={()=>navigate("/inventory")}>
          <h3>Total Sales</h3>
          <p>₹85,000</p>
        </div>
        <div className="card yellow" onClick={()=>navigate("/inventory")}>
          <h3>Total Purchases</h3>
          <p>₹45,000</p>
        </div>
        <div className="card red" onClick={()=>navigate("/inventory")}>
          <h3>Low Stock Items</h3>
          <p>5 Products</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
