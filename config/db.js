// config/db.js
const mongoose = require("mongoose");

const launchMongoConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Your MongoDB is now up and connected");
  } catch (err) {
    console.error("Sorry but their seems to be a MongoDB connection error:", err.message);
    process.exit(1); // stop app if DB fails
  }
};

module.exports = launchMongoConnection;
