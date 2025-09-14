import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditInventory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  // Fetch data on mount
  useEffect(() => {
    fetch(`/inventory/${id}`)
      .then(res => res.json())
      .then(data => {
        setFormData({
          name: data.name || '',
          category: data.category || '',
          unit: data.unit || '',
          purchasePrice: data.purchasePrice || '',
          sellingPrice: data.sellingPrice || '',
          quantity: data.quantity || '',
          supplier: data.supplier || '',
          expiryDate: data.expiryDate?.substring(0, 10) || '',
        });
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const res = await fetch(`/inventory/edit/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert('Inventory updated successfully!');
      navigate('/inventory'); // update to correct path
    } else {
      alert('Failed to update.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" />
      <input name="unit" value={formData.unit} onChange={handleChange} placeholder="Unit" />
      <input name="purchasePrice" value={formData.purchasePrice} onChange={handleChange} placeholder="Purchase Price" type="number" />
      <input name="sellingPrice" value={formData.sellingPrice} onChange={handleChange} placeholder="Selling Price" type="number" />
      <input name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Quantity" type="number" />
      <input name="supplier" value={formData.supplier} onChange={handleChange} placeholder="Supplier" />
      <input name="expiryDate" value={formData.expiryDate} onChange={handleChange} type="date" />
      <button type="submit">Update Inventory</button>
    </form>
  );
};

export default EditInventory;
