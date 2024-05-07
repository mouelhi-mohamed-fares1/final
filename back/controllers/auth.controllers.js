const dotenv = require("dotenv");
dotenv.config();
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");



const register = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password || !req.body.role) {
      throw new Error("Please enter all necessary user details");
    }
    const { username, password, role } = req.body;

    // Check duplicate emails
    const isEmailExist = await userModel.findOne({ username: username });

    if (isEmailExist) {
      throw new Error("Email already exists, please enter a new email.");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new userModel({
      username: username,
      password: passwordHash,
      role: role,
    });

    const savedUser = await newUser.save();

    return res.status(201).json({
      user: savedUser,
      message: "Success",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Error",
    });
  }
};

const login = async (req, res) => {
  try {
    // Validate user request
    if (!req.body.username || !req.body.password) {
      throw new Error("Email and password are required.");
    }
    console.log("check 0")

    const existUser = await userModel.findOne({ username: req.body.username });

    console.log("check 1")


    if (!existUser) {
      return res.status(401).json("Wrong Email/Password");
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(req.body.password, existUser.password);
    console.log("check 2")


    if (!isPasswordValid) {
      throw new Error("Invalid password.");

    }
    // Generate token
    const token = jwt.sign(
      {
        _id: existUser._id,
        username: existUser.username,
        role: existUser.role,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "2 days",
      }
    );
    console.log("check 3")

    return res.status(200).json({ user: existUser, token: token });


  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Error catch",
    });
  }
};

const logout = async (req, res) => {
  // Clear user session
  req.session = null;

  res.status(200).json({
    message: "Logout successful",
  });
};

module.exports = {
  register,
  login,
  logout,
};