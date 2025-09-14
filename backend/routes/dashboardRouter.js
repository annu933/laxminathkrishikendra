const express = require('express');
const Inventory = require('../models/Inventory');
const router = express.Router();


router.get('/',async(req,res) => {
    try{
        const totalInventory = await Inventory.countDocuments();
        res.status(200).json({summary: {
            total_inventory: totalInventory
        }});
    } catch(err){
        res.status(500).json({error:err.message})
    }
})

module.exports = router;