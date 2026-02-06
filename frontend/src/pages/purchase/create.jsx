import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../context/ApiContext";

function PurchaseCreate() {
    const [inventoryList, setInventoryList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    // 🔹 Submit Form
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.target).entries());

        data.quantity = Number(data.quantity);
        data.purchasePrice = Number(data.purchasePrice);

        try {
            const response = await axiosInstance.post("/purchase/create", data);
            console.log("Purchase Created:", response.data);
            alert("Purchase Created Successfully");
        } catch (error) {
            console.log("Error creating purchase:", error);
            alert("Failed to create purchase");
        }
    };

    return (
        <div>
            <h1>Add Purchase</h1>

            {/* 🔸 Loading State */}
            {loading && <p>Loading products...</p>}

            {/* 🔸 Error State */}
            {!loading && error && <p style={{ color: "red" }}>{error}</p>}

            {!loading && !error && (
                <form onSubmit={handleSubmit}>

                    {/* Product Dropdown */}
                    <label>
                        Product:
                        <select name="inventoryId" required>
                            <option value="">-- Select Product --</option>

                            {inventoryList.map((item) => (
                                <option key={item._id} value={item._id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <br />

                    {/* Supplier Name */}
                    <label>
                        Supplier:
                        <input type="text" name="supplier" required />
                    </label>
                    <br />

                    {/* Quantity */}
                    <label>
                        Quantity:
                        <input type="number" name="quantity" required />
                    </label>
                    <br />

                    {/* Purchase Price */}
                    <label>
                        Purchase Price:
                        <input type="number" name="purchasePrice" required />
                    </label>
                    <br />

                    {/* Purchase Date */}
                    <label>
                        Date:
                        <input type="date" name="date" required />
                    </label>
                    <br /><br />

                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    );
}

export default PurchaseCreate;
