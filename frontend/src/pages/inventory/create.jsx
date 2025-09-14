import React, { useState } from 'react';

const CreateInventory = ({ onAddSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    unit: '',
    purchasePrice: '',
    sellingPrice: '',
    quantity: '',
    supplier: '',
    expiryDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  

  const formData = new FormData(e.target); // auto-collects all input values

  const response = await fetch("/inventory/create", {
    method: "POST",
    body: formData, // no need for headers like 'Content-Type'
  },
);
console.log("response",response)

  if (response.ok) {
    alert("Product created successfully");
    e.target.reset();
  } else {
    alert("Failed to create product");
  }
};


  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
      <input name="unit" placeholder="Unit" value={formData.unit} onChange={handleChange} />
      <input name="purchasePrice" type="number" placeholder="Purchase Price" value={formData.purchasePrice} onChange={handleChange} />
      <input name="sellingPrice" type="number" placeholder="Selling Price" value={formData.sellingPrice} onChange={handleChange} />
      <input name="quantity" type="number" placeholder="Quantity" value={formData.quantity} onChange={handleChange} />
      <input name="supplier" placeholder="Supplier" value={formData.supplier} onChange={handleChange} />
      <input name="expiryDate" type="date" value={formData.expiryDate} onChange={handleChange} />
      <button type="submit">Add Inventory</button>
    </form>
  );
};

export default CreateInventory;
