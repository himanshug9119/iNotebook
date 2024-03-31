const db = require("./db");
const express = require("express");
const app = express();
const port = 3000;

// for sending data to the server 
app.use(express.json());

// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));


// listen 
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});