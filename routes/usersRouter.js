const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
} = require("../controllers/authController");
const userModel = require("../models/user-model");

router.get("/", async function (req, res) {
  try {
    let users = await userModel.find();
    res.render("/shop", { user: users });
  } catch (error) {
    res.status(500).send("Error fetching users");
  }
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);

module.exports = router;
