const mongoose = require("mongoose");
// const mongoURI = process.env.DATABASE;
const mongoURI =
  "mongodb+srv://nimble2905:personal_website2905@cluster1.m3e9kv0.mongodb.net/personal_website?retryWrites=true&w=majority";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected successfully to MongoDB Database");
  } catch (error) {
    console.error("Error connecting to Mongo:", error.message);
  }
};

module.exports = connectToMongo;
