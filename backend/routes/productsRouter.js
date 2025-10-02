// routes/fertilizers.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const Fertilizer =  require("../models/Fertilizer.js");

const upload = multer();

// Create fertilizer
// router.post("/", async (req, res) => {
//   try {
//     const newFertilizer = new Fertilizer(req.body);
//     const saved = await newFertilizer.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// Get all fertilizers
// router.get("/product/all", async (req, res) => {
//   const data = await Fertilizer.find();
//   res.json(data);
// });

router.get("/", async (req, res) => {
  const data = await Fertilizer.find();
  res.json(data);
});

// router.get("/create", (req, res) => {
//    res.json({ message: "Product creation endpoint hit" });
// });

router.post("/create",upload.none(), async (req, res) => {
  const { name, type, price, stock } = req.body;
  try {
    await Fertilizer.create({ name, type, price, stock });
       res.status(201).json({ message: "Fertilizer created" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating fertilizer");
  }
});

// router.post("/create",async(req,res)=>{
//   const{name,type,price,stock} = req.body;

//   try{
//     await Fertilizer.create({name,type,price,stock});
//     res.status(201).json({message: "Product has created!"});

//   }catch(err){
//     console.error(err);
//     res.status(500).json({message: "Product has not created"}).send("Product has not created")
//   }
// })


// Get single fertilizer
// router.get("/:id", async (req, res) => {
//   const item = await Fertilizer.findById(req.params.id);
//   res.json(item);
// });

// Update fertilizer
// router.put("/:id", async (req, res) => {
//   const updated = await Fertilizer.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   });
//   res.json(updated);
// });

// Delete fertilizer
// router.delete("/:id", async (req, res) => {
//   await Fertilizer.findByIdAndDelete(req.params.id);
//   res.json({ message: "Deleted successfully" });
// });

module.exports = router;