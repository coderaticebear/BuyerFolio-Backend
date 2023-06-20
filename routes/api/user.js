/**
 * API for User Model and routes.
 */
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const jsonwt = require("jsonwebtoken");
// Load the User Model & Profile Model
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const settings = require("../../config/settings");

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

      const {
        username,
        email,
        password,
        firstName,
        lastName,
        address,
        phone,
        birthDate,
      } = req.body;

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

/**
 * @async
 * Login API
 */
router.post(
  "/login",
  [
    body("username").notEmpty().trim(), // Validate that the 'username' field is not empty and trim any leading/trailing spaces
    body("password").notEmpty(), // Validate that the 'password' field is not empty
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req); // Retrieve the validation errors from the request
      if (!errors.isEmpty()) {
        // Check if there are any validation errors
        return res.status(400).json({
          status: false,
          message: "Validation error",
          errors: errors.array(), // Return the validation errors as an array
        });
      }

      const { username, password } = req.body; // Extract the 'username' and 'password' from the request body
      const user = await User.findOne({ username }); // Find the user with the given 'username'

      if (user) {
        // If a user is found
        const isPasswordCorrect = await bcrypt.compare(password, user.password); // Compare the provided password with the hashed password stored in the user object

        if (isPasswordCorrect) {
          // If the password is correct
          const payload = {
            username: user.username,
          };

          const token = jsonwt.sign(payload, settings.secret, {
            expiresIn: "1h", // Generate a JWT token with the provided payload, secret, and expiration time of 1 hour
          });

          return res.status(200).json({
            status: true,
            token: "Bearer " + token, // Return the token in the response with 'Bearer' prefix
          });
        } else {
          return res.status(401).json({
            status: false,
            message: "Incorrect password", // Return an error message indicating that the password is incorrect
          });
        }
      } else {
        return res.status(400).json({
          status: false,
          message: "User not found", // Return an error message indicating that the user was not found
        });
      }
    } catch (err) {
      // Catch any potential errors that occurred during execution
      console.error(err);
      return res.status(500).json({
        status: false,
        message: "Internal server error", // Return an error message indicating an internal server error
      });
    }
  }
);

// Export the router
module.exports = router;
