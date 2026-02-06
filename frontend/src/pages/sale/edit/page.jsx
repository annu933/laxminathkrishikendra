import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../../context/ApiContext";

const UpdateSales = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [formData, setFormData] = useState({
        quantitySold: "",
        sellingPrice: "",
        customerName: "",
        productId: ""
    });

    React.useEffect(() => {
        axiosInstance.get(`/sales/${id}`)
            .then((res) => {
                const data = res.data;

                setFormData({
                    quantitySold: data.quantitySold || "",
                    sellingPrice: data.sellingPrice || "",
                    customerName: data.customerName || "",
                    productId: data.product?._id || "",
                });

                setSelectedProductId(data.product?._id || "");
                setSelectedProduct(data.product || null);
            })
            .catch(err => console.log("error:", err));
    }, [id]);




    React.useEffect(() => {
        axiosInstance.get("/inventory")
            .then((res) => {
                console.log("Fetched data:", res.data);
                setProducts(res.data?.items);
            })
            .catch(err => console.log("error:", err));
    }, []);


    // Handle product selection
    const handleProductChange = (e) => {
        const productId = e.target.value;
        setSelectedProductId(productId);
        const product = products.find((p) => p._id === productId);
        setSelectedProduct(product);
        if (product) {
            setFormData((prev) => ({
                ...prev,
                productId: productId,
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
        // e.preventDefault();


        // await axiosInstance.put(`/sales/edit/${id}`, formData);

        // alert("Sale updated successfully");
        // navigate("/sales");

        try {
            e.preventDefault();
            const response = await axiosInstance.put(`/sales/edit/${id}`, formData);
            alert("Sale updated successfully!");
            navigate("/sales");
            // return response.data;
        } catch (error) {
            console.log("error", error.response?.data?.message);
            console.error(error.response?.data?.message || "Sale failed");
        }
    };



    console.log("sales formData:", formData);

    return (
        <div
            style={{ maxWidth: "500px", margin: "0 auto" }}
        >
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
                        {Array.isArray(products) &&
                            products.map((product) => (
                                <option key={product._id} value={product._id}>
                                    {product.name}
                                </option>
                            ))}
                    </select>
                </label>

                {selectedProduct && (
                    <div
                        style={{
                            background: "#f5f5f5",
                            padding: "10px",
                            marginTop: "10px",
                            borderRadius: "4px",
                        }}
                    >
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

export default UpdateSales;
