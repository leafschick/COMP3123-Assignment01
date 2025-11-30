// config/db.js
const mongoose = require("mongoose");

const launchMongoConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("The MongoDB is now connected");
  } catch (err) {
    console.error("Sorry but the MongoDB connection error:", err.message);
    process.exit(1); // stop app if DB fails
  }
};

module.exports = launchMongoConnection;
