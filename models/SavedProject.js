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
    gitHub_Url: {
      type: String,
      required: true,
    },
    visit: {
      type: String,
      require: true
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
);

const SavedProject = mongoose.model("SavedProject", SavedProjectSchema);

module.exports = SavedProject;
