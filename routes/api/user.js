/**
 * API for User Model and routes.
 */
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");

// Load the User Model & Profile Model
const User = require("../../models/User");
const Profile = require("../../models/Profile");

// Middleware for JSON parsing
router.use(express.json());
router.use(express.urlencoded());

// Define a GET route for the root path
router.get("/", (req, res) => {
  res.send("API EndPoint");
});

// Define a POST route for user registration
/**
 * @async
 * Register API
 * Endpoint to Register User info and profile Details
 */
router.post(
  "/register",
  [
    // Input validation and sanitization using express-validator
    body("username").notEmpty().trim(),
    body("email").isEmail().normalizeEmail(),
    body("password").notEmpty(),
    body("firstName").notEmpty().trim(),
    body("lastName").notEmpty().trim(),
    body("address").notEmpty().trim(),
    body("phone").notEmpty().trim(),
    body("birthDate").isISO8601().toDate(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: false,
          message: "Validation error",
          errors: errors.array(),
        });
      }

      const { username, email, password, firstName, lastName, address, phone, birthDate } = req.body;

      // Check if the username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({
          status: false,
          message: "Username already exists.",
        });
      }

      // Check if the email already exists
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({
          status: false,
          message: "Email already exists.",
        });
      }

      // Hash the password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create a new User instance
      const user = new User({
        username,
        email,
        password: hashedPassword,
      });

      // Create a new Profile instance
      const profile = new Profile({
        firstName,
        lastName,
        address,
        phone,
        birthDate,
        userId: user._id,
      });
      profile.birthDate = new Date(profile.birthDate).toISOString();

      // Save the user and profile details to the database
      await Promise.all([user.save(), profile.save()]);

      // Return a success response
      res.status(200).json({
        status: true,
        data: {
          username: user.username,
        },
        message: "User details added successfully",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        status: false,
        message: "Error while adding user",
      });
    }
  }
);
// Export the router
module.exports = router;