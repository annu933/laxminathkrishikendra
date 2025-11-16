import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../context/ApiContext";

const SalesTable = () => {
  const [sales, setSales] = useState([]);
  React.useEffect(() => {
    axiosInstance.get("/sales")
      .then((res) => {
        console.log("Fetched data:", res.data);
        setSales(res.data);
      })
      .catch(err => console.log("error:", err));
  }, []);

  return (
    <div>
      <h2>Sales Report</h2>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Customer</th>
            <th>Quantity Sold</th>
            <th>Price/Unit</th>
            <th>Total</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {sales.length === 0 ? (
            <tr>
              <td colSpan="7">No sales data</td>
            </tr>
          ) : (
            sales.map((sale, index) => (
              <tr key={sale._id}>
                <td>{index + 1}</td>
                <td>{sale.product?.name || "Unknown"}</td>
                <td>{sale.customerName || "-"}</td>
                <td>{sale.quantitySold}</td>
                <td>{sale.sellingPrice}</td>
                <td>{sale.quantitySold * sale.sellingPrice}</td>
                <td>{new Date(sale.soldAt).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;
