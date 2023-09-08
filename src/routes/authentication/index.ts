import express from "express";
import signupController from "../../controllers/authentication/signup.controller.js";
import loginController from "../../controllers/authentication/login.controller.js";

// Create an instance of an Express router.
const router = express.Router();

/**
 * POST /auth/login
 * Route to handle user login requests.
 * When a POST request is made to /auth/login, it invokes the loginController function.
 */
router.post("/login", loginController);

/**
 * POST /auth/signup
 * Route to handle user signup requests.
 * When a POST request is made to /auth/signup, it invokes the signupController function.
 */
router.post("/signup", signupController);

// add more routes like forget password, reset password here

// Export the router for use in other parts of the application.
export default router;
