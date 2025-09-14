import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SaleForm = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    quantitySold: "",
    sellingPrice: "",
    customerName: "",
  });

  // Fetch products on load
  useEffect(() => {
    fetch("/inventory")
      .then((res) => res.json())
      .then((data) => setProducts(data?.items || []))
      .catch((err) => console.error("Failed to load products", err));
  }, []);

  console.log("Products:", products);

  // Handle product selection
  const handleProductChange = (e) => {
    const productId = e.target.value;
    setSelectedProductId(productId);
    const product = products.find((p) => p._id === productId);
    setSelectedProduct(product);
    if (product) {
      setFormData((prev) => ({
        ...prev,
        sellingPrice: product.sellingPrice || "",
      }));
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit the sale
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      productId: selectedProductId,
      ...formData,
    };

    try {
      const res = await fetch("/sale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Sale recorded successfully!");
        setFormData({ quantitySold: "", sellingPrice: "", customerName: "" });
        setSelectedProduct(null);
        setSelectedProductId("");
        navigate('/inventory'); 
      } else {
        alert("Failed to record sale.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while recording the sale.");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h2>Sales Entry</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Select Product:
          <select
            value={selectedProductId}
            onChange={handleProductChange}
            required
          >
            <option value="">-- Select --</option>
            {Array.isArray(products) && products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </select>
        </label>

        {selectedProduct && (
          <div style={{ background: "#f5f5f5", padding: "10px", marginTop: "10px", borderRadius: "4px" }}>
            <p>
              <strong>Available Stock:</strong> {selectedProduct.quantity}
            </p>
            <p>
              <strong>Default Price:</strong> ₹{selectedProduct.sellingPrice}
            </p>
          </div>
        )}

        <label>
          Quantity Sold:
          <input
            type="number"
            name="quantitySold"
            value={formData.quantitySold}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Selling Price:
          <input
            type="number"
            name="sellingPrice"
            value={formData.sellingPrice}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Customer Name:
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleInputChange}
          />
        </label>

        <button type="submit" style={{ marginTop: "20px" }}>
          Submit Sale
        </button>
      </form>
    </div>
  );
};

export default SaleForm;
