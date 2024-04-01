const express = require("express");
const router = express.Router();
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Gemini google ai
router.post("/gemini", async (req, res) => {
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const prompt = req.body.prompt;
  console.log(prompt);
  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  console.log(text);
  res.send(text);
});



module.exports = router;
