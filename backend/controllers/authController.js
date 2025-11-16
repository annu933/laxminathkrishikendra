// 🔐 What This Page Is For:
// It handles User Registration, Login, and Logout using:

// bcrypt → for password hashing
// jsonwebtoken (JWT) → for secure user session tokens
// cookie → to store the token in the browser
// flash messages → for login feedback
// mongoose model → to save users to MongoDB



const userModel = require("../models/Users-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  try {
    let { email, password, fullname } = req.body;

    let existingUser = await userModel.findOne({ email });
    if (existingUser)
      return res.status(401).json({ message: "You already have account, please login" } //pass the message in json formate
      );
    // Hash the password
    const salt = await bcrypt.genSalt(10,);
    const hashPassword = await bcrypt.hash(password, salt)


    const user = await userModel.create({
      fullname,
      email,
      password: hashPassword,
    })
    // Generate token
    const token = generateToken(user)
    // Set token in HTTP-only cookie (optional)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60, // 1 hour
    })
    // Respond with user info
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        email: user.email,
        fullname: user.fullname
      }
    })
  } catch (error) {
    console.error("Registration Error", error.message)
    return res.status(500).json({ message: error.message })
  }
};

module.exports.loginUser = async function (req, res) {
  try {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    if (!user) return res.send("Email or password incorrect");

    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) return res.status(401).json({ message: "Password Incorrect" })

    let token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60, // 1 hour
    })

    res.status(200).json({
      message: "Login Successfully",
      token,
      user: {
        id: user._id,
        email: user.email,
        fullname: user.fullname,
        role: user.role
      }
    })

  } catch (err) {

    console.error("err", err.message)
    return res.status(500).json({ message: "Something went wrong" })
  }
};

module.exports.logout = async function (req, res) {
  res.cookie("token", "");
  res.redirect("/");
};
