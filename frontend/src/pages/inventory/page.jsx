import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import InventoryUpload from "./importInventory";
import { axiosInstance } from "../../context/ApiContext";

function Inventory() {
  const [data, setData] = useState([]);
  const [showUploadPopup, setShowUploadPopup] = useState(false);

  React.useEffect(() => {
    axiosInstance.get("/inventory")
      .then((res) => {
        console.log("Fetched data:", res.data);
        setData(res.data?.items);
      })
      .catch(err => console.log("error:", err));
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch(`inventory/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const updatedData = data.filter((item) => item._id !== id);
      setData(updatedData);
      alert("Item deleted successfully");
    } else {
      alert("Failed to delete item");
    }
  };

  // ✅ Download Excel template
  const handleDownloadTemplate = () => {
    const headers = [
      "name",
      "category",
      "unit",
      "purchasePrice",
      "sellingPrice",
      "quantity",
      "supplier",
      "expiryDate",
    ];

    const exampleRow = {
      name: "Urea Fertilizer",
      category: "Fertilizer",
      unit: "kg",
      purchasePrice: 350,
      sellingPrice: 450,
      quantity: 100,
      supplier: "IFFCO Ltd.",
      expiryDate: "2026-12-31",
    };

    const ws = XLSX.utils.json_to_sheet([exampleRow], { header: headers });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "InventoryTemplate");
    XLSX.writeFile(wb, "inventory_template.xlsx");
  };

  return (
    <div>
      <h1>All Inventory Items</h1>
      <Link to="/inventory/create">
        <button>Add Inventory Item</button>
      </Link>

      {/* Buttons for Template & Upload */}
      <button onClick={handleDownloadTemplate}>
        📥 Inventory Upload Template
      </button>
      <button onClick={() => setShowUploadPopup(true)}>
        📂 Inventory Upload
      </button>

      {/* Popup Modal */}
      {showUploadPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{ background: "#fff", padding: "20px", borderRadius: "8px" }}
          >
            <h2>Upload Inventory</h2>
            <InventoryUpload />
            <button onClick={() => setShowUploadPopup(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Table */}
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
          {data &&
            data.map((product, index) => (
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
                    <button>Edit</button>
                  </Link>
                  <button onClick={() => handleDelete(product._id)}>
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
