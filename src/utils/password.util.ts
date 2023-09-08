import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

/**
 * Password - Utility class for hashing and comparing passwords securely.
 */
export default class Password {
  /**
   * hashPassword - Hashes a plain-text password using a randomly generated salt.
   * @param {string} password - The plain-text password to be hashed.
   * @returns {Promise<string>} - Returns a promise that resolves to the hashed password with salt.
   */
  static async hashPassword(password: string): Promise<string> {
    const salt = randomBytes(16).toString("hex");
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${buf.toString("hex")}.${salt}`;
  }

  /**
   * comparePassword - Compares a supplied password with a stored hashed password.
   * @param {string} storedPassword - The stored hashed password with salt.
   * @param {string} suppliedPassword - The plain-text password to compare.
   * @returns {Promise<boolean>} - Returns a promise that resolves to true if passwords match, false otherwise.
   */
  static async comparePassword(
    storedPassword: string,
    suppliedPassword: string
  ): Promise<boolean> {
    const [hashedPassword, salt] = storedPassword.split(".");
    const hashedPasswordBuf = Buffer.from(hashedPassword, "hex");
    const suppliedPasswordBuf = (await scryptAsync(
      suppliedPassword,
      salt,
      64
    )) as Buffer;
    return timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
  }
}
