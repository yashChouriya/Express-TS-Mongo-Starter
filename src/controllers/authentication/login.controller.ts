import { Request, Response } from "express";
import { UserModel } from "../../models/users.js";
import PasswordUtil from "../../utils/password.util.js";
import JWTUtil from "../../utils/jwt.util.js";
import {
  DEFAULT_TOKEN_EXPIRATION_LONG,
  DEFAULT_TOKEN_EXPIRATION_SHORT,
} from "../../utils/common.util.js";

/**
 * loginController - Handles user login authentication and response.
 *
 * @param {Request} req - The HTTP request object containing user input data.
 * @param {Response} res - The HTTP response object for sending responses to the client.
 *
 * @returns {Response} - Returns an HTTP response with status, message, success flag, and data.
 */
const loginController = async (req: Request, res: Response) => {
  try {
    // Extract user input data from the request body
    const { email, password, keepLogin } = req.body;

    // Check if email and password are provided; return 400 Bad Request if not
    if (!email || !password) {
      return res.status(400).send({
        message: "Email and Password are required!",
        success: false,
      });
    }

    // Find the user by email in the database
    const existingUser = await UserModel.findOne({ email }).exec();

    // If no user is found, return a 404 Not Found response
    if (!existingUser) {
      return res.status(404).send({
        message: "Account not found with the provided email!",
        success: false,
      });
    }

    // Compare the provided password with the stored hashed password
    const hashedPassword = await PasswordUtil.comparePassword(
      existingUser.password,
      password
    );

    // If passwords don't match, return a 400 Bad Request response
    if (!hashedPassword) {
      return res.status(400).send({
        message: "Password is incorrect!",
        success: false,
      });
    }

    // Set the token expiration based on the 'keepLogin' option
    const tokenExpiresIn = keepLogin
      ? DEFAULT_TOKEN_EXPIRATION_LONG
      : DEFAULT_TOKEN_EXPIRATION_SHORT;

    // Create a JSON Web Token (JWT) for the user
    const token = JWTUtil.createToken(email, tokenExpiresIn);

    // If token creation fails, return a 500 Internal Server Error response
    if (!token) {
      return res
        .status(500)
        .send({ message: "Can't create login token!", success: false });
    }

    // Prepare the user payload with necessary details
    const userPayload = {
      userDetails: {
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        email: existingUser.email,
        username: existingUser.username,
      },
      token,
    };

    // Update the last login time for the user in the database
    const now = Date.now();
    await UserModel.findByIdAndUpdate(existingUser._id, {
      lastLogin: now,
    }).exec();

    // Send a 200 OK response with login success message and user data
    return res.status(200).send({
      message: "Login successful!",
      success: true,
      data: userPayload,
    });
  } catch (error) {
    // Handle errors and return a 400 Bad Request response with the error message
    console.error(error);
    return res.status(400).send({ message: String(error), success: false });
  }
};

export default loginController;
