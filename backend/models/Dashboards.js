const mongoose = require("mongoose");

const dashboardSchema = mongoose.Schema({
  total_sales: { type: String, required: true },
  total_product: { type: String, required: true },
  total_purchases: { type: String, required: true },
  low_stock_items: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("Dashboard", dashboardSchema);
