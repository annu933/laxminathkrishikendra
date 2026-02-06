// routes/Product.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const Product = require("../models/Product");

const upload = multer();

router.get("/", async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalRecords = await Product.countDocuments();

    const products = await Product.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);


    const data = await Product.find();
    console.log("Products router LOADED");
    res.status(200).json({
      success: true,
      results: products,
      pagination: {
        totalRecords,
        totalPages: Math.ceil(totalRecords / limit),
        currentPage: page,
        limit,
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/view/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Product.findById(id);
    if (!data) {
      res.status(400).json({ error: "Product not found" });
    }
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post("/create", upload.none(), async (req, res) => {
  const { name, type, price, stock } = req.body;
  try {
    await Product.create({ name, type, price, stock });
    res.status(201).json({ message: "Product created" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating Product");
  }
});


router.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateItem = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (updateItem) {
      res.status(200).json({ message: "Product item updated successfully" });
    } else {
      res.status(404).json({ error: "Product item not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteItem = await Product.findByIdAndDelete(id);
    if (deleteItem) {
      res.status(200).json({ message: "Product item deleted successfully" });
    } else {
      res.status(404).json({ error: "Product item not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
