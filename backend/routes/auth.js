const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const fetchUser = require("../middleware/fetchUser");

// Signup Api
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if all fields are provided
    if (!name || !email || !password) {
      return res.status(422).json({ error: "Please fill all the fields" });
    }

    // Check if user with the provided email already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(422).json({ error: "Email already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(12);
    const hashedpassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({ name, email, password: hashedpassword });
    await newUser.save();

    // data
    const data = {
      user: {
        id: newUser.id,
      },
    };

    // Create a token
    const token = jwt.sign(data, JWT_SECRET);
    return res.json({ token: token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// login
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(422).json({ error: "Please fill all the fields" });
    }

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(422).json({ error: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(422).json({ error: "Invalid credentials" });
    }
    // data
    const data = {
      user: {
        id: user.id,
      },
    };
    // Create JWT token
    const token = jwt.sign(data, JWT_SECRET);

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


// Get Loggedin user data
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;