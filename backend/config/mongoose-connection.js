// const mongoose = require("mongoose");
// const config = require("config");
// require('dotenv').config();
// const dbgr = require("debug")("development : mongoose");
// mongoose
//   .connect(`config.get(${MONGODB_URL})/bagshop`)
//   .then(function () {
//     dbgr("connected");
//   })
//   .catch(function (err) {
//     dbgr("not connected", err);
//   });

// module.exports = mongoose.connection;




const mongoose = require("mongoose"); 
const config = require("config");
require("dotenv").config();
const dbgr = require("debug")("development:mongoose");

// Get URL from config OR fallback to .env
const mongoUrl = config.has("MONGODB_URL")
  ? config.get("MONGODB_URL")
  : process.env.MONGODB_URL;

mongoose
  .connect(`${mongoUrl}/bagshop`)
  .then(() => {
    dbgr("connected to MongoDB");
  })
  .catch((err) => {
    dbgr("not connected", err);
  });

module.exports = mongoose.connection;
