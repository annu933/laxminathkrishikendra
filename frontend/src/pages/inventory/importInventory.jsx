import React, { useState } from "react";
import * as XLSX from "xlsx";

const InventoryUpload = () => {
  const [sheetData, setSheetData] = useState([]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: "array" });

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const jsonData = XLSX.utils.sheet_to_json(sheet); // Converts sheet to JSON

    setSheetData(jsonData);
  };

  const handleSubmit = async () => {
    if (sheetData.length === 0) {
      alert("No data to upload");
      return;
    }

    const res = await fetch("/inventory/bulk-create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sheetData),
    });

    if (res.ok) {
      alert("Inventory uploaded successfully!");
    } else {
      alert("Upload failed");
    }
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      <button onClick={handleSubmit} disabled={sheetData.length === 0}>
        Upload Inventory
      </button>
    </div>
  );
};

export default InventoryUpload;
