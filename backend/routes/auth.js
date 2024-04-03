const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey12901282918njkdafj";
const fetchUser = require("../middleware/fetchUser"); // Middleware to fetch user details

// Signup API
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(422).json({ error: "Please fill all the fields" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(422).json({ error: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const data = {
      user: {
        id: newUser.id,
      },
    };

    const token = jwt.sign(data, JWT_SECRET, { expiresIn: "1h" });
    return res.json({ token });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

// Login API
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ error: "Please fill all the fields" });
    }

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(422).json({ error: "Invalid credentials" });
    }

    const data = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(data, JWT_SECRET, { expiresIn: "1h" });

    return res.json({ token });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

// Get Logged-in user data
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password");

    return res.json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
