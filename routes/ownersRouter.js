const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");

if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    let owners = ownerModel.find();
    console.log("owners.module", owners.module);

    if (owners.module > 0) {
      return res
        .status(500)
        .send("You don't have permission to create new owner");
    }
    const { fullname, email, password } = req.body;

    let ownerCreated = await ownerModel.create({
      fullname,
      email,
      password,
    });
    res.status(201).send(ownerCreated);
  });
}


router.get("/", function (req, res) {
  res.send("owner-router");
});


module.exports = router;
