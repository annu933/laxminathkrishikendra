// routes/saleRouter.js
const express = require("express");
const router = express.Router();
const Sale = require("../models/Sale");
const Inventory = require("../models/Inventory");


// router.get("/", async (req, res) => {
//   const data = await Sale.find();
//   res.json(data);
// });


// GET /sales
router.get("/", async (req, res) => {
  try {
    const sales = await Sale.find().populate("product");
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sales" });
  }
});


// POST /sale - Create a sale
router.post("/create", async (req, res) => {
  try {
    const { productId, quantitySold, sellingPrice, customerName } = req.body;

    const product = await Inventory.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    if (product.quantity < quantitySold) {
      return res.status(400).json({ error: "Not enough stock" });
    }

    const sale = new Sale({
      product: productId,
      quantitySold,
      sellingPrice,
      customerName,
    });

    await sale.save();

    // Reduce quantity in inventory
    product.quantity -= quantitySold;
    await product.save();

    res.status(201).json({ message: "Sale recorded", sale });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
