const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");

const JWT_SECRET = "nitin_kumar@2905";
// Route 1 : Create a user using : Post "/api/auth/createuser" , No login required
router.post(
  "/createUser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Minimum length is 8").isLength({ min: 8 }),
  ],
  async (req, res) => {
    // If there are error , return bad request & the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const success = false;
      return res.status(400).json({ success, errors: errors.array() });
    }
    // Check whether the user exists with the same email or not:
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        const success = false;
        return res
          .status(400)
          .json({ success, error: "User already exists with this email." });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      // Create a user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      const success = true;
      res.json({ success, authToken });
      console.log("User Created Successfully");
    } catch (error) {
      console.log(error);
      res.json({ error: "Internal server error" });
    }
  }
);

// Route 2:  Authentication:
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password cannot be empty").exists(),
  ],
  async (req, res) => {
    // If there are errors, return bad requests
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "User doesn't exist" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        const success = false;
        return res.status(400).json({
          success,
          error: "Please enter correct credentials to login",
        });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      const success = true;
      res.json({ success, authToken });
      console.log("Login successfully");
    } catch (error) {
      console.log(error);
      res.json({ error: "Internal server error" });
    }
  }
);

// Route 3 : Get logged in user details Using POST /api/auth/getUser  -- login required

router.get("/getUser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("+password");
    res.send({ user });
    console.log("Fetched data successfully");
  } catch (error) {
    console.log(error);
    res.json({ error: "Internal server error" });
  }
});

// Route 4: Delete the logged user using DELETE /api/auth/deleteUser -- login required
router.delete("/deleteUser/:id", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    await User.findByIdAndDelete(userId);
    res.json("Account deleted successfully");
    console.log("Account deleted successfully");
  } catch (error) {
    console.log(error);
    return res.json({ error: "Internal server error" });
  }
});

module.exports = router;
