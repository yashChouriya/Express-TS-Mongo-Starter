/**
 * Regular expression to validate passwords.
 * Passwords must be at least 8 characters long and contain at least one uppercase letter,
 * one lowercase letter, one digit, and one special character.
 */
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

/**
 * Regular expression to validate email addresses.
 * It checks if an email address has a valid format.
 */
const EMAIL_REGEX = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

/**
 * Default token expiration time for long-term authentication (72 hours).
 */
export const DEFAULT_TOKEN_EXPIRATION_LONG = "72h";

/**
 * Default token expiration time for short-term authentication (6 hours).
 */
export const DEFAULT_TOKEN_EXPIRATION_SHORT = "6h";

/**
 * Validates a password against the PASSWORD_REGEX.
 * @param {string} password - The password to validate.
 * @returns {boolean|string} - Returns true if the password is valid, or an error message if it's not.
 */
export const validatePassword = (password: string): boolean | string => {
  if (!PASSWORD_REGEX.test(password)) {
    return "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.";
  }
  return true;
};

/**
 * Validates an email address against the EMAIL_REGEX.
 * @param {string} email - The email address to validate.
 * @returns {boolean|string} - Returns true if the email is valid, or an error message if it's not.
 */
export const validateEmail = (email: string): boolean | string => {
  if (!EMAIL_REGEX.test(email)) {
    return "Email is not a valid email address";
  }
  return true;
};
