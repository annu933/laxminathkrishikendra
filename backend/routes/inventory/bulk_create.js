// app.post("/inventory/bulk-create", async (req, res) => {
//   try {
//     const data = req.body;

//     if (!Array.isArray(data) || data.length === 0) {
//       return res.status(400).json({ error: "Invalid data" });
//     }

//     const result = await Inventory.insertMany(data);
//     res.status(200).json({ message: "Inserted", count: result.length });
//   } catch (err) {
//     console.error("Bulk insert error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });


const express = require('express');
const router = express.Router();
const Inventory = require('../../models/Inventory');

// Bulk create from Excel
router.post('/bulk-create', async (req, res) => {
  try {
    const data = req.body;

    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ error: 'Invalid data format' });
    }

    const inserted = await Inventory.insertMany(data);
    res.status(200).json({ message: 'Inventory inserted', count: inserted.length });
  } catch (error) {
    console.error('Bulk insert error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
