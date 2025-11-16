const mongoose = require("mongoose");

// mongoose.connect("mongodb://127.0.0.1:27017"); //LOCAL MongoDB
mongoose.connect(process.env.MONGO_URI); //MongoDB Atlas connection

const userSchema = mongoose.Schema({
  fullname: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  cart: {
    type: Array,
    default: [],
  },
  orders: {
    type: Array,
    default: [],
  },
  contact: Number,
  picture: String,
});

module.exports = mongoose.model("user", userSchema);
