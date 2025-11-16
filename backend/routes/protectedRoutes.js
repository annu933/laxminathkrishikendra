const express = require("express");
const router = express.Router();
const { verifyToken, requireRole } = require("../middlewares/auth");

router.get("/user-dashboard",verifyToken,(req,res)=>{
    console.log("resss",res)
    res.json({message: "Welcome user!"})
});

router.get("/admin-dashboard",verifyToken,(req,res)=>{
    res.json({message:"Wlcom Admin!"})
});

module.exports = router;