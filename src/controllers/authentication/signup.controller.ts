import { Request, Response } from "express";
import { UserModel } from "../../models/users.js";
import PasswordUtil from "../../utils/password.util.js";
import { validatePassword } from "../../utils/common.util.js";
import { generateFromEmail } from "unique-username-generator";

/**
 * signupController - Handles user registration by validating input data, checking for existing accounts,
 * validating the password, hashing the password, generating a unique username, and creating a new user account.
 *
 * @param {Request} req - The HTTP request object containing user registration data.
 * @param {Response} res - The HTTP response object for sending responses to the client.
 *
 * @returns {Response} - Returns an HTTP response with a status code, message, and success flag.
 */
const signupController = async (req: Request, res: Response) => {
  try {
    // Extract user registration data from the request body
    const { firstName, lastName, email, password } = req.body;

    console.table(req.body);

    // Check if required fields are provided; return 400 Bad Request if any are missing
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).send({
        message: "firstName, lastName, email, and password are required!",
        success: false,
      });
    }

    // Check if an account with the provided email already exists; return 400 Bad Request if it does
    const existingUser = await UserModel.findOne({ email }).exec();
    if (existingUser) {
      return res.status(400).send({
        message:
          "An account already exists with the provided email. Please log in or use a different email.",
        success: false,
      });
    }

    // Validate the password; return 400 Bad Request if it doesn't meet criteria
    const isPasswordValid = validatePassword(password);
    if (isPasswordValid !== true) {
      return res.status(400).send({
        message: isPasswordValid,
        success: false,
      });
    }

    // Hash the provided password for secure storage
    const hashedPassword = await PasswordUtil.hashPassword(password);

    // Generate a unique username based on the email address
    const uniqueUsername = generateFromEmail(email, 3);

    // Create a new user account in the database
    await UserModel.create({
      firstName,
      lastName,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      username: uniqueUsername,
    });

    // Return a 200 OK response with a success message
    return res.status(200).send({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    // Handle errors and return a 400 Bad Request response with the error message
    console.error(error);
    return res.status(400).send({ message: String(error), success: false });
  }
};

export default signupController;
