import mongoose, { Document, Model, Schema } from "mongoose";

/**
 * IUser - Interface defining the structure of a user document in MongoDB.
 * It extends the `Document` interface and includes properties for user information.
 */
export interface IUser extends Document {
  firstName: string; // User's first name
  lastName: string; // User's last name
  email: string; // User's email address
  password: string; // User's hashed password
  username: string; // User's username
  lastLogin: Date; // Date of the user's last login
  createdAt: Date; // Date of user document creation
  updatedAt: Date; // Date of user document last update
}

/**
 * UserSchema - Defines the schema for the User model in MongoDB.
 * It includes the fields defined in the IUser interface with their respective data types
 * and additional constraints such as required fields and uniqueness.
 */
const UserSchema: Schema<IUser> = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    lastLogin: {
      type: Date,
    },

    // add more user fields here
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

/**
 * UserModel - The Mongoose model for the User collection in MongoDB.
 * It uses the IUser interface to define the structure of user documents
 * and applies the UserSchema for validation and data storage.
 */
export const UserModel: Model<IUser> = mongoose.model<IUser>(
  "User",
  UserSchema
);
