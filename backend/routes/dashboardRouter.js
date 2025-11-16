const express = require("express");
const Inventory = require("../models/Inventorys");
const dashboard = require("../models/Dashboards");
const Product = require("../models/Product");
const Sale = require("../models/Sales");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const InventoryCount = await Inventory.countDocuments();
    const ProductCount = await Product.countDocuments();
    const SalesCount = await Sale.countDocuments();
    console.log("ProductCount", ProductCount);
    res.status(200).json({
      summary: {
        total_inventory: InventoryCount,
        total_product: ProductCount,
        total_sales: SalesCount,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
