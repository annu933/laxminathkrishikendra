// routes/saleRouter.js
const express = require("express");
const router = express.Router();
const Sale = require("../models/Sales");
const Inventory = require("../models/Inventory");
const LOW_STOCK_LIMIT = 10;


const checkLowStock = (quantity) => {
  return quantity <= LOW_STOCK_LIMIT;
};


// router.get("/", async (req, res) => {
//   const data = await Sale.find();
//   res.json(data);
// });


// GET /sales
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalRecords = await Sale.countDocuments();

    const sales = await Sale.find().populate("product")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      results: sales,
      pagination: {
        totalRecords,
        totalPages: Math.ceil(totalRecords / limit),
        currentPage: page,
        limit
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sales" });
  }
});

// GET /sales by id
router.get("/:id", async (req, res) => {
  const sale = await Sale.findById(req.params.id).populate("product");
  res.json(sale);
});



// POST /sale - Create a sale
router.post("/create", async (req, res) => {
  try {
    const { productId, quantitySold, sellingPrice, customerName } = req.body;

    const inventory = await Inventory.findById(productId);
    if (!inventory) return res.status(404).json({ error: "Product not found" });

    if (inventory.quantity < quantitySold) {
      return res.status(400).json({ message: `Insufficient stock. Available: ${inventory.quantity}` });
    }

    const sale = new Sale({
      product: productId,
      quantitySold,
      sellingPrice,
      customerName,
    });

    await sale.save();

    // Reduce quantity in inventory
    inventory.quantity -= quantitySold;

    const isLowStock = checkLowStock(inventory.quantity);
    await inventory.save();

    // res.status(201).json({ message: "Sale recorded", sale });
    res.status(201).json({
      message: isLowStock
        ? "Sale recorded. Warning: Low stock!"
        : "Sale recorded",
      sale,
      lowStock: isLowStock,
      remainingStock: inventory.quantity,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// PUT /sales/edit/:id
router.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { productId, quantitySold, sellingPrice, customerName } = req.body;

    const existingSale = await Sale.findById(id);
    if (!existingSale) {
      return res.status(404).json({ error: "Sale not found" });
    }

    // Restore previous quantity to inventory
    const oldProduct = await Inventory.findById(existingSale.product);
    if (oldProduct) {
      oldProduct.quantity += existingSale.quantitySold;

      await oldProduct.save();
    }

    // Check new product stock
    const newProduct = await Inventory.findById(productId);
    if (!newProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (newProduct.quantity < quantitySold) {
      return res.status(400).json({ message: `Insufficient stock. Available` });
    }

    // Deduct new quantity
    newProduct.quantity -= quantitySold;

    const isLowStock = checkLowStock(newProduct.quantity);
    await newProduct.save();

    // Update sale
    existingSale.product = productId;
    existingSale.quantitySold = quantitySold;
    existingSale.sellingPrice = sellingPrice;
    existingSale.customerName = customerName;

    await existingSale.save();

    // res.status(200).json({
    //   message: "Sale updated successfully",
    //   sale: existingSale,
    // });
    res.status(200).json({
      message: isLowStock
        ? "Sale updated. Warning: Low stock!"
        : "Sale updated successfully",
      sale: existingSale,
      lowStock: isLowStock,
      remainingStock: newProduct.quantity,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /sales/delete/:id
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await Sale.findByIdAndDelete(id);
    if (!sale) {
      return res.status(404).json({ error: "Sale not found" });
    }
    // Restore quantity to inventory
    const product = await Inventory.findById(sale.product);
    if (product) {
      product.quantity += sale.quantitySold;
      const isLowStock = checkLowStock(product.quantity);
      await product.save();
    }
    // res.status(200).json({ message: "Sale deleted successfully" });

    res.status(200).json({
      message: "Sale deleted successfully",
      lowStock: isLowStock,
      remainingStock: product.quantity,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
