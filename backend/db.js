const { MongoClient, ServerApiVersion } = require("mongodb");

const dbUserName = process.env.DB_USERNAME || "guptasitapur489";
const dbPassword = process.env.DB_PASSWORD || "kF7Gkyjw2AodIDPs";
const uri = `mongodb+srv://${dbUserName}:${dbPassword}@inotebook.keyfa7q.mongodb.net/?retryWrites=true&w=majority&appName=iNotebook`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");
  } catch (err) {
    console.error(
      "Error:",
      err.message.includes("bad auth")
        ? "Authentication failed. Check your credentials."
        : err
    );
  } finally {
    await client.close();
  }
}

run().catch(console.error);
