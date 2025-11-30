// controllers/userController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// POST /api/users/register
const createNewUserAccount = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ message: "You must complete all fields" });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "The user already registered" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = await User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "The user has now been registered successfully",
      user: {
        id: newUser._id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error("Sorry looks like we are having register error Please try again later:", err.message);
    res.status(500).json({ message: "Server has had an error while registering user" });
  }
};

// POST /api/users/login
const loginExistingUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Simple validation
    if (!email || !password) {
      return res.status(400).json({ message: "You must provid an email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "This is an invalid email or password" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Again, this is an invalid email or password" });
    }

    // Create token (simple version)
    const token = jwt.sign(
      { id: user._id, email: user.email },
      "mysecretjwtkey",
      { expiresIn: "1h" }
    );

    res.json({
      message: "User has now login successful",
      token,
    });
  } catch (err) {
    console.error("There seems to be a ogin error:", err.message);
    res.status(500).json({ message: "Server error while logging in user" });
  }
};

module.exports = {
  createNewUserAccount,
  loginExistingUser,
};
