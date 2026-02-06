const mongoose = require("mongoose");


const purchaseSchema = mongoose.Schema({
    inventoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Inventory", required: true },
    quantity: { type: Number, required: true, min: 1 },
    purchasePrice: { type: Number, required: true },
    supplier: { type: String, required: true, trim: true },
    date: { type: Date, default: Date.now },
},
    { timestamps: true });

module.exports = mongoose.model("Purchase", purchaseSchema)