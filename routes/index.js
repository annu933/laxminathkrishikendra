const express = require("express");
const isLoggedin = require("../middlewares/isLoggedin");
const router = express.Router();


const userModel = require("../models/user-model");

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
  res.render("index");
});

router.get("/users", async function (req, res) {
  try {
    let users = await userModel.find();
    console.log("users-data", users);

    res.render("users", { user: users });
  } catch (error) {
    res.status(500).send("Error fetching users");
  }
});

router.get("/register", function (req, res) {
  req.flash("message", "Success!!");
  res.render("User/register");
});
router.get("/login", function (req, res) {
  res.render("User/login");
});

router.get("/shop", isLoggedin, function (req, res) {
  const Message = req.flash("message");
  console.log("Message--?", Message);
  res.render("shop", { Message });
});

router.get("/logout", function (req, res) {
  res.render("logout");
});


module.exports = router;
