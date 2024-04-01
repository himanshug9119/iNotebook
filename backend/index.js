const db = require("./db");
const express = require("express");
const app = express();
const ip = "127.0.0.1";
const port = 3000;

// for sending data to the server 
app.use(express.json());

// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));
app.use("/api/ai", require("./routes/ai"));

app.get("/", (req, res) => {
    // send back a response that says it works
    res.send({ message: `Server is running on http://${ip}:${port}` });
});

// listen 
app.listen(port, () => {
  console.log(`App listening at http://${ip}:${port}`);
});