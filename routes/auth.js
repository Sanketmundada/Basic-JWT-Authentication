const express = require("express");
const Joi = require("@hapi/joi");
const bcrpyt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerValidation, LoginValidation } = require("../validation");

const router = express.Router();
//User Model-
const User = require("../models/User");

//REGISTER ROUTE
router.post("/register", async (req, res) => {
  //Checking for any validation error if any
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if user is already there in db
  const emailexist = await User.findOne({ email: req.body.email });
  if (emailexist) res.status(400).send("User Already Exists !!!");

  //Hash the password
  const salt = await bcrpyt.genSalt(10);
  const hashPassword = await bcrpyt.hash(req.body.password, salt);

  //Create a new User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });
  try {
    const currUser = await user.save();
    res.send({ user: user.id });
  } catch (error) {
    res.status(400).send(error);
  }
});

//LOGIN ROUTE
router.post("/login", async (req, res) => {
  //Checking for any validation error if any
  const { error } = LoginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if email exists or not
  const user = await User.findOne({ email: req.body.email });
  if (!user) res.status(400).send("Invalid Credentials !!!");

  //Check if password is correct or not
  const validPass = await bcrpyt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid Credentials !!!");

  //Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.tokenSecret);
  res.header("auth-token", token).send(token);

  res.send("Success");
});

module.exports = router;
