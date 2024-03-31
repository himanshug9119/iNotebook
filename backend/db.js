const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");
const dbUserName = process.env.DB_USERNAME || "guptasitapur489";
const dbPassword = process.env.DB_PASSWORD || "kF7Gkyjw2AodIDPs";
const uri = `mongodb+srv://${dbUserName}:${dbPassword}@inotebook.keyfa7q.mongodb.net/?retryWrites=true&w=majority&appName=iNotebook`;

async function run() {
  try {
    await mongoose.connect(uri);
    console.log("Successfully connected to MongoDB!");
  } catch (err) {
    console.error(
      "Error:",
      err.message.includes("bad auth")
        ? "Authentication failed. Check your credentials."
        : err
    );
  } 
}

run().catch(console.error);
