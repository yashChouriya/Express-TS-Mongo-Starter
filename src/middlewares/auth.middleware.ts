import { Request, Response, NextFunction } from "express";
import JWT from "../utils/jwt.util.js"; // Import your JWT module
import { UserModel, IUser } from "../models/users.js"; // Import your user model

// Middleware function
export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Extract the token from the Authorization header
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Token not found in Authorization header" });
  }

  // Verify the token using your JWT class
  const userPayload = JWT.verifyToken(token);

  if (!userPayload) {
    return res.status(401).json({ message: "Invalid token" });
  }

  // Check if the user exists in the database using the email from the token payload
  try {
    const user: IUser | null = await UserModel.findOne({
      email: userPayload.email,
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Add the user to the request object
    req.user = user;

    // Continue with the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error fetching user from the database:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
