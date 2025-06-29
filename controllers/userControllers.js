const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    res.status(400).json({ error: "User does not exist! Please Sign Up!" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400).json({ error: "Invalid password!" });
  }

  // console.log("Login - " ,user._id);

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  res.json({ email, token });
};

// Sign Up User
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required!" });
  }

  const exists = await userModel.findOne({ email });
  if (exists) {
    return res.status(400).json({ error: "User already exists!" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await userModel.create({ email, password: hashedPassword });

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  res.status(201).json({ email, token });
};

module.exports = {
  loginUser,
  signupUser,
};
