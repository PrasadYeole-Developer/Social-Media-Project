const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password required",
    });
  }
  const isUserExists = await User.findOne({
    username: username,
  });
  if (isUserExists) {
    return res.status(409).json({
      message: "Username already exists",
    });
  }
  try {
    const user = await User.create({
      username: username,
      password: password,
    });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token);
    const userData = {
      id: user._id,
      username: user.username,
    };
    return res.status(201).json({
      message: "User profile created successfully",
      user: userData,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = { registerUser };
