const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProjectSchema = new Schema({
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
  // Additional fields as needed
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Projects = mongoose.model("Project", ProjectSchema);

module.exports = Projects;
