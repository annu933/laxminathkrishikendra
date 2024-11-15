const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/bagshop");

const userSchema = mongoose.Schema({
  fullname: string,
  email: string,
  password: string,
  cart: {
    type: Array,
    default: [],
  },
  isadmin: Boolean,
  orders: {
    type: Array,
    default: [],
  },
  contact: number,
  picture: string,
});

module.exports = mongoose.model("user", userSchema);
