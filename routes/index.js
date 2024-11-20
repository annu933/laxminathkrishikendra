const express = require("express");
const isLoggedin = require("../middlewares/isLoggedin");
const router = express.Router();

router.get("/", function (req, res) {
  // get the error : which were set on isLoggedin file
  let error = req.flash("error");
  console.log("error", error);

  res.render("index", { error });
});

router.get("/shop", isLoggedin, function (req, res) {
  res.render("shop");
});

module.exports = router;
