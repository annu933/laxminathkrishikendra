// routes/Product.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const Product = require("../models/Product");

const upload = multer();

// Create Product
// router.post("/", async (req, res) => {
//   try {
//     const newProduct = new Product(req.body);
//     const saved = await newProduct.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// Get all Product
// router.get("/product/all", async (req, res) => {
//   const data = await Product.find();
//   res.json(data);
// });

router.get("/", async (req, res) => {
  const data = await Product.find();
  res.json(data);
});

// router.get("/create", (req, res) => {
//    res.json({ message: "Product creation endpoint hit" });
// });

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

// router.post("/create",async(req,res)=>{
//   const{name,type,price,stock} = req.body;

//   try{
//     await Product.create({name,type,price,stock});
//     res.status(201).json({message: "Product has created!"});

//   }catch(err){
//     console.error(err);
//     res.status(500).json({message: "Product has not created"}).send("Product has not created")
//   }
// })

// Get single Product
// router.get("/:id", async (req, res) => {
//   const item = await Product.findById(req.params.id);
//   res.json(item);
// });

// Update Product
// router.put("/:id", async (req, res) => {
//   const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   });
//   res.json(updated);
// });

// Delete Product
// router.delete("/:id", async (req, res) => {
//   await Product.findByIdAndDelete(req.params.id);
//   res.json({ message: "Deleted successfully" });
// });

module.exports = router;
