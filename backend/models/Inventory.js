const mongoose  = require("mongoose");

const inventorySchema = mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  unit: String,
  purchasePrice: Number,
  sellingPrice: Number,
  quantity: Number,
  supplier: String,
  expiryDate: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// module.exports = mongoose.model('Inventory', inventorySchema);

module.exports = mongoose.models.Inventory || mongoose.model('Inventory', inventorySchema);

