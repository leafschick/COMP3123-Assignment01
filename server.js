// server.js
const express = require("express");
const dotenv = require("dotenv");
const launchMongoConnection = require("./config/db");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();

app.use(express.json());

// Connect to MongoDB
launchMongoConnection();

// Base route
app.get("/", (req, res) => {
  res.send("Assignment 1 API is running");
});

// User routes
app.use("/api/users", userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});
