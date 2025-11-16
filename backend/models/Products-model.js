const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI); //MongoDB Atlas connection

const productSchema = mongoose.Schema({
  fullname: {
    type: String,
    minlength: 3,
    trim: true,
  },
  image: String,
  price: Number,
  discount: {
    type: Number,
    default: 0,
  },
  bgcolor: String,
  panelcolor: String,
  textcolor: String,
});

module.exports = mongoose.model("user", productSchema);
