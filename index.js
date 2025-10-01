const express = require("express");
// const jwt = require("jsonwebtoken");
const app = express();
const cors = require("cors");
// const cookieParser = require("cookie-parser");
const port = process.env.PORT || 5000;
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://restaurant-6febb.web.app",
      "https://restaurant-6febb.firebaseapp.com",
    ],
    credentials: true,
  })
);

// middleware
app.use(cors());
app.use(express.json());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.63qrdth.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// const uri = `mongodb://localhost:27017`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const usersCollection = client.db("ElectroMart").collection("users");
    const productCollection = client.db("ElectroMart").collection("products");
    const reviewCollection = client.db("ElectroMart").collection("review");
    const orderCollection = client.db("ElectroMart").collection("order");
    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", async (req, res) => {
  res.send("restaurant-server is running");
});
app.listen(port, () => {
  console.log(`restaurant-server is running on port ${port}`);
});
