const express = require("express");
const router = express.Router();
const Inventory = require("../models/Inventory"); // ✅ use Inventory model
const multer = require("multer");

const upload = multer();

// router.get("/", async (req, res) => {
//   const data = await Inventory.find();
//   console.log("data",data)
//   res.json(data);
// });

// POST /api/inventory/add
router.post("/create", upload.none(), async (req, res) => {
  try {
    const {
      name,
      category,
      unit,
      purchasePrice,
      sellingPrice,
      quantity,
      supplier,
      expiryDate,
    } = req.body;

    // Check if item already exists
    let item = await Inventory.findOne({ name });

    if (item) {
      item.quantity += quantity;
      await item.save();
      return res.status(200).json({ message: "Inventory updated", item });
    }

    // Create new inventory item
    const newItem = new Inventory({
      name,
      category,
      unit,
      purchasePrice,
      sellingPrice,
      quantity,
      supplier,
      expiryDate,
    });

    await newItem.save();
    res.status(201).json({ message: "Inventory item added", item: newItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add this to inventoryRouter.js
router.get("/", async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalRecords = await Inventory.countDocuments();

    const inventory = await Inventory.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);


    // console.log("inventory", inventory);
    res.status(200).json({
      success: true,
      results: inventory,
      pagination: {
        totalRecords,
        totalPages: Math.ceil(totalRecords / limit),
        currentPage: page,
        limit
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// delete inventory item
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Inventory.findByIdAndDelete(id);
    if (deletedItem) {
      res.status(200).json({ message: "Inventory item deleted successfully" });
    } else {
      res.status(404).json({ error: "Inventory item not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateItem = await Inventory.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (updateItem) {
      res.status(200).json({ message: "Inventory item updated successfully" });
    } else {
      res.status(404).json({ error: "Inventory item not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// GET /inventory/:id
router.get("/:id", async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Inventory not found" });
    res.json(item);
  } catch (err) {
    console.error("Error fetching inventory item:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /total_stock
router.get("/total_stock", async (req, res) => {
  try {
    const inventory = await Inventory.findById(req.params.id);
    const totalStock = await inventory.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    console.log("totalStock", totalStock);
    if (!inventory)
      return res.status(404).json({ message: "Inventory not found" });
    res.json(inventory);
  } catch (err) {
    console.error("Error fetching inventory item:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
//
