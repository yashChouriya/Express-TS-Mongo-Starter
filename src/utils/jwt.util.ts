import jwt, { Secret } from "jsonwebtoken";

/**
 * JWT - Utility class for creating and verifying JSON Web Tokens (JWTs).
 */
export default class JWT {
  /**
   * createToken - Generates a new JWT with the provided email and expiration time.
   * @param {string} email - The email associated with the JWT.
   * @param {string} expiresIn - The token expiration time (e.g., "1h" for 1 hour).
   * @returns {string | null} - Returns the generated JWT or null if the secret key is not available.
   */
  static createToken(email: string, expiresIn: string): string | null {
    const secret: Secret | undefined = process.env.JWT_SECRET_KEY;
    if (!secret) {
      return null;
    }
    return jwt.sign({ email }, secret, {
      expiresIn,
    });
  }

  /**
   * verifyToken - Verifies the validity of a JWT using the provided secret key.
   * @param {string} token - The JWT to verify.
   * @returns {any | null} - Returns the payload of the JWT if it's valid, or null if verification fails.
   */
  static verifyToken(token: string): any | null {
    const secret: Secret | undefined = process.env.JWT_SECRET_KEY;
    if (!secret) {
      return null;
    }
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      return null;
    }
  }
}
