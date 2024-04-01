const express = require("express");
const router = express.Router();
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const  OpenAI = require("openai");
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ChatGPT_API_KEY = process.env.ChatGPT_API_KEY;
// Gemini google ai
router.post("/gemini", async (req, res) => {
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const prompt = req.body.prompt;
  console.log(prompt);
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  res.send(text);
});


// ChatGPT OpenAi
const openai = new OpenAI({
  apiKey: ChatGPT_API_KEY,
}); 
router.post("/chatgpt", async (req, res) => {
  try {
    const prompt  = req.body.prompt;
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { "role": "user", "content": prompt },
      ],
      max_tokens:100,
      response_format: { type: "json_object" },
    });
    const content = completion.choices[0].message.content;
    res.json({ response: content });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
// router.post("/chatgpt", async (req, res) => {
//   try {
//     const prompt  = req.body.prompt;
//     const completion = await openai.createCompletion({
//       messages: [
//         {
//           role: "system",
//           content: "You are a helpful assistant designed to output JSON.",
//         },
//         { role: "user", content: prompt },
//       ],
//       model: "text-davinci-003",
//       response_format: { type: "json_object" },
//       prompt:prompt
//     });

//     const content = completion.choices[0].message.content;

//     res.json({ response: content });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Server error");
//   }
// });


module.exports = router;
