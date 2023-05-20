const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");

router.get(`/user`, requireLogin, (req, res) => {
  User.findOne({ _id: req.user._id })
    .select("-password")
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => {
      return res.status(404).json({ error: "User Not Found" });
    });
});

router.put("/edituser/:userId", requireLogin, (req, res) => {
  const { name, email, password, age, mobile } = req.body;
  const { userId } = req.params;

  if (!email || !password || !name) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      bcrypt.hash(password, 10).then((hashedpassword) => {
        const update = {
          email,
          password: hashedpassword,
          name,
          age,
          mobile,
        };

        User.findByIdAndUpdate(userId, update, { new: true })
          .then((user) => {
            res.json({ message: "User Edited successfully" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete(`/deleteuser`, requireLogin, (req, res) => {
  User.deleteOne({ _id: req.user._id })
    .then((result) => {
      return res.json({ message: "User Deleted" });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
