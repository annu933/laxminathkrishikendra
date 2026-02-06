import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../context/ApiContext";
import { useNavigate, useParams } from "react-router-dom";

function PurchaseUpdate() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        inventoryId: "",
        purchasePrice: " ",
        quantity: " ",
        supplier: " ",
        date: "",
        createdAt: "",
        updatedAt: "",
    })
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [inventoryList, setInventoryList] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`/purchase/view/${id}`)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log("data-purchase", data, {
                    inventoryId: data.inventoryId._id || "",
                    purchasePrice: data.purchasePrice || " ",
                    quantity: data.quantity || " ",
                    supplier: data.supplier || " ",
                    date: data.date?.substring(0, 10) || "",
                    createdAt: data.createdAt?.substring(0, 10) || "",
                    updatedAt: data.updatedAt?.substring(0, 10) || "",
                })
                setFormData({
                    inventoryId: data.inventoryId._id || "",
                    purchasePrice: data.purchasePrice || " ",
                    quantity: data.quantity || " ",
                    supplier: data.supplier || " ",
                    date: data.date?.substring(0, 10) || "",
                    createdAt: data.createdAt?.substring(0, 10) || "",
                    updatedAt: data.updatedAt?.substring(0, 10) || "",
                })
                console.log("purchase data by id", data)
            })
    }, [id])
    console.log("allpurchase-data", formData)

    function handleChange(e) {
        console.log("eeeeeeeeee", e)
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    // 🔹 Fetch Inventory for dropdown
    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const res = await axiosInstance.get("/inventory");
                console.log("inventory-res:", res.data);

                // Normalize response into a clean array
                const list =
                    Array.isArray(res.data)
                        ? res.data
                        : Array.isArray(res.data.items)
                            ? res.data.items
                            : Array.isArray(res.data.data)
                                ? res.data.data
                                : Array.isArray(res.data.inventory)
                                    ? res.data.inventory
                                    : [];

                setInventoryList(list);
            } catch (err) {
                console.log("Error loading inventory:", err);
                setError("Failed to load inventory");
                setInventoryList([]);
            } finally {
                setLoading(false);
            }
        };

        fetchInventory();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("onsubmit", formData)
        const res = await fetch(`/purchase/edit/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            alert("Successfully updated Purchases");
            navigate("/purchase"); // update to correct path
        } else {
            alert("Failed to update purchases")
        }
    }

    return (
        <form onSubmit={handleSubmit}>

            <label>
                Product:
                <select name="inventoryId"
                    value={formData.inventoryId}
                    required>
                    <option value="">-- Select Product --</option>

                    {inventoryList.map((item) => (
                        <option key={item._id} value={item._id}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </label>
            <input
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
                placeholder="Supplier"
            />
            <input
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Quantity"
                type="number"
            />
            <input
                name="purchasePrice"
                value={formData.purchasePrice}
                onChange={handleChange}
                placeholder="Purchase Price"
                type="number"
            />

            <input
                name="date"
                value={formData.date}
                onChange={handleChange}
                type="date"
            />
            <button type="submit">Update Inventory</button>
        </form>
    );
}

export default PurchaseUpdate;