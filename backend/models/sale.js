// models/Sale.js
const mongoose = require("mongoose");

const saleSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Inventory",
    required: true,
  },
  quantitySold: {
    type: Number,
    required: true,
  },
  sellingPrice: {
    type: Number,
    required: true,
  },
  customerName: String,
  soldAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Sale", saleSchema);
