const express = require("express");
const router = express.Router();
const Purchase = require("../models/Purchase");
const Inventory = require("../models/Inventory");

router.get("/", async (req, res) => {

    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;



        const totalRecords = await Purchase.countDocuments();

        const purchases = await Purchase.find()
            .populate("inventoryId")
            .sort({ "createdAt": -1 })
            .skip(skip)
            .limit(limit)
            ;
        res.status(200).json({
            success: true,
            results: purchases,
            pagination: {
                totalRecords,
                totalPages: Math.ceil(totalRecords / limit),
                currentPage: page,
                limit,
            },
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch Purchases" });

    }
});

router.post("/create", async (req, res) => {
    try {
        const { inventoryId, quantity, purchasePrice, supplier, date } = req.body;
        const inventory = await Inventory.findById(inventoryId);

        if (!inventory) {
            return res.status(404).json({ message: "Inventory Item not found" })
        }
        const newPurchase = await Purchase.create({
            inventoryId, quantity, purchasePrice, supplier, date
        })
        inventory.quantity += quantity;
        inventory.purchasePrice += purchasePrice;
        await inventory.save();

        return res.status(201).json({
            message: "Purchase added Successfully",
            newPurchase,
            updateInventory: inventory
        })

    } catch (err) {
        res.status(500).json({ message: "Failed to create Purchase", err });
        console.log(err);
    }
});

router.get("/view/:id", async (req, res) => {

    try {
        const { id } = req.params;
        const item = await Purchase.findById(id).populate("inventoryId");
        if (!item) {
            res.status(404).json({ error: "Purchase item not found" });
        }
        res.json(item)
    } catch (error) {
        console.log("error-->", error.message)
        res.status(500).json({ error: error.message });
    }
});

router.put("/edit/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updateItem = await Purchase.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (updateItem) {
            res.status(200).json({ message: "Purchase item updated successfully" });
        } else {
            res.status(404).json({ error: "Purchase item not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteItem = await Purchase.findByIdAndDelete(id);
        if (deleteItem) {
            res.status(200).json({ message: "Purchase item deleted successfully" });
        } else {
            res.status(404).json({ error: "Purchase item not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;