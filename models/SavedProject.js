const mongoose = require("mongoose");
const { Schema } = mongoose;

const SavedProjectSchema = new Schema({
  projectId:{
    type:Number,
    required:true,
    unique:true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  gitHubUrl: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model/component
    required: true,
  },
  // Additional fields as needed
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const savedProject = mongoose.model("SavedProject", SavedProjectSchema);

module.exports = savedProject;
