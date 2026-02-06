const express = require("express");
const Inventory = require("../models/Inventory");
const dashboard = require("../models/Dashboards");
const Product = require("../models/Product");
const Sale = require("../models/Sales");

const router = express.Router();
LOW_STOCK_LIMIT = 10;

router.get("/", async (req, res) => {
  try {
    const InventoryCount = await Inventory.countDocuments();
    const ProductCount = await Product.countDocuments();
    const SalesCount = await Sale.countDocuments();
    const revenueAgg = await Sale.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: { $multiply: ["$quantitySold", "$sellingPrice"] }
          }
        }
      }
    ]);
    const lowStockCount = await Inventory.countDocuments({
      quantity: { $lte: LOW_STOCK_LIMIT, $gt: 0 }
    });

    const outOfStockCount = await Inventory.countDocuments({
      quantity: 0
    });

    console.log("revenueAgg", revenueAgg);


    res.status(200).json({
      summary: {
        total_inventory: InventoryCount,
        total_product: ProductCount,
        total_sales: SalesCount,
        total_revenue: revenueAgg[0]?.totalRevenue || 0,
        low_stock_items: lowStockCount,
        out_of_stock_items: outOfStockCount,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
