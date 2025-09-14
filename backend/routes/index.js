const express = require("express");
const isLoggedin = require("../middlewares/isLoggedin");
const router = express.Router();
const userModel = require("../Backend/models/user-model");


// router.get("/", async function (req, res) {
//   try {
//     let users = await userModel.find();
//     console.log("users-data", users);

//     res.render("users", { user: users });
//   } catch (error) {
//     res.status(500).send("Error fetching users");
//   }
// });

router.get("/", async function (req, res) {
   res.json({ message: "User Registered" });
});

router.get("/users", async function (req, res) {
  try {
    let users = await userModel.find();
    console.log("users-data", users);
    res.json({ users }); // Return as JSON
  } catch (error) {
    console.log("users error",error)
    res.status(500).send("Error fetching users");
  }
});

router.get("/register", function (req, res) {
  req.flash("message", "Success!!");
  res.json({ message: "Register endpoint hit", flash: req.flash("message") });
});
router.get("/login", function (req, res) {
   res.json({ message: "Login endpoint hit" });
});

router.get("/shop", isLoggedin, function (req, res) {
  const message = req.flash("message");
  res.json({ message: "Welcome to the shop!", flash: message });
});

router.get("/logout", function (req, res) {
   res.json({ message: "You are logged out" });
});


module.exports = router;
