const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  try {
    let { email, password, fullname } = req.body;
    let user = await userModel.findOne({ email });
    if (user)
      return res.status(401).send("You already have account, please login");
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async (err, hash) => {
        // Store hash in your password DB.
        if (err) return res.send(err.message);
        else {
          let user = await userModel.create({
            email,
            password: hash,
            fullname,
          });

          // sign way to identify the user, currentally taking two thing email, user_id
          let token = generateToken(user);
          res.cookie("token", token);
          res.redirect("/login");
        }
      });
    });
  } catch (error) {
    res.send("error", error.message);
  }
};

module.exports.loginUser = async function (req, res) {
  try {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    if (!user) return res.send("Email or password incorrect");

    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        let token = generateToken(user);
        res.cookie("token", token);
        // res.send("You can login");
        req.flash("message", "Successfully Login");
        res.redirect("/shop");
      } else {
        // res.send("Email or password incorrect");
        res.redirect("/login");
      }
    });
  } catch (err) {
    console.log("err", err.message);
  }
};

module.exports.logout = async function (req, res) {
  res.cookie("token", "");
  res.redirect("/");
};
