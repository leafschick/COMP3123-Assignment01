const mongoose = require("mongoose");

const launchMongoConnection = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:3000/comp3123_assignment1";
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

module.exports = launchMongoConnection;
