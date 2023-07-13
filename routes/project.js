const express = require("express");
const router = express.Router();
const fs = require("fs");
const fetchUser = require("../middleware/fetchUser");
const path = require("path");
const SavedProject = require("../models/SavedProject");

// File path for projects.json
const projectFilePath = path.join(__dirname, "projects.json");

// Fetch all projects
router.get("/fetchAllProjects", async (req, res) => {
  try {
    // Read projects.json file
    const rawData = fs.readFileSync(projectFilePath);
    const projectsData = JSON.parse(rawData);

    // Extract projects from the data
    const projects = projectsData.projects;

    res.json({ projects });
    // console.log(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Save a project
router.post("/save/:projectId", fetchUser, async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.user.id;
    // const userName = req.user.name;

    // Check if the project is already saved by the user
    const existingProject = await SavedProject.findOne({
      projectId: projectId,
      author: userId,
    });

    if (existingProject) {
      return res.status(400).json({ error: "Project already saved" });
    }
    // Read projects.json file
    const rawData = fs.readFileSync(projectFilePath);
    const projectsData = JSON.parse(rawData);

    // Find the project by ID
    const project = projectsData.projects.find(
      (project) => project.projectId === projectId
    );

    if (!project) {
      // Return a 404 error if the project is not found
      return res.status(404).json({ error: "Project not found" });
    }

    // Create a new saved project instance
    const newSavedProject = new SavedProject({
      projectId: project.projectId,
      name: project.name,
      description: project.description,
      gitHubUrl: project.gitHub_Url,
      author: userId,
      user : req.user._id
    });

    try {
      // Save the project in the database
      const saved = await newSavedProject.save();
      res.json(saved);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to save project" });
    }
  } catch (error) {
    console.error(error);
    res.status(501).json({ error: "Server Error" });
  }
});

// Fetch user-specific saved projects
router.get("/fetchSavedProjects", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;

    // Query the database to fetch user-specific saved projects
    const SavedProjects = await SavedProject.find({ author: userId });

    res.json({ SavedProjects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Route for deleting a saved project
router.delete("/remove/:projectId", fetchUser, async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const userId = req.user.id;

    // Find the saved project by projectId and author
    const savedProject = await SavedProject.findOneAndDelete({
      projectId: projectId,
      author: userId,
    });

    if (!savedProject) {
      // Return a 404 error if the saved project is not found
      return res.status(404).json({ error: "Saved project not found" });
    }

    res.json({ message: "Saved project successfully removed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error " });
  }
});

module.exports = router;
