const mongoose = require("mongoose");
const { Schema } = mongoose;

const SavedProjectSchema = new Schema(
  {
    projectId: {
      type: Number,
      required: true,
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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }
  // {
  //   // Create a compound index on projectId and author fields
  //   // to enforce unique combination for each user
  //   indexes: [{ fields: { projectId: 1, author: 1 }, unique: true }],
  // }
);

const SavedProject = mongoose.model("SavedProject", SavedProjectSchema);

module.exports = SavedProject;
