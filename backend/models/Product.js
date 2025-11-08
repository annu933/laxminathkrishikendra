const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["organic", "chemical", "bio"], required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  manufacturer: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", ProductSchema);
