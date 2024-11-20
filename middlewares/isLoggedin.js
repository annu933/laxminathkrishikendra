const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async function (req, res, next) {
  if (!req.cookies.token) {
    req.flash("error", "you need to login first");
    return res.redirect("/");
  }

  try {
    // if token present , get the value
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    // .select used to not get password in user
    let user = await userModel
      .findOne({ email: decoded.email })
      .select("-password");
    //  in req-> create user name's field
    req.user = user;
    // next, used to proceed
    next();
  } catch (error) {
    req.flash("error", "Sommething went wrong");
    res.redirect("/");
  }
};
