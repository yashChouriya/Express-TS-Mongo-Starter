# Express TypeScript MongoDB Starter Kit

This starter kit is designed for developing Node.js applications using Express, TypeScript, and MongoDB. It offers a foundational project structure and pre-configured settings to streamline the development process. Key features include a User model with standard fields, authentication routes, controllers for login and signup (with password encryption), and token generation for authentication.

## Project Structure

The project is structured as follows:

```markdown
- `src`: The source code directory.
  - `configs`: Configuration files for Express and the database.
    - `db.config.ts`: MongoDB configuration.
    - `express.config.ts`: Express server configuration.
  - `controllers`: Controllers for handling API requests.
    - `authentication`: Controllers for user authentication.
      - `login.controller.ts`: Manages user login with token generation.
      - `signup.controller.ts`: Handles user signup with password encryption.
  - `middlewares`: Custom middleware functions.
    - `auth.middleware.ts`: Middleware for user authentication and authorization.
  - `models`: Database models and schemas.
    - `users.ts`: User model and schema for MongoDB.
  - `routes`: API route definitions.
    - `authentication`: Authentication-related routes.
      - `index.ts`: Entry point for authentication routes.
  - `utils`: Utility functions and helpers.
    - `common.util.ts`: Common utility functions.
    - `jwt.util.ts`: JWT token generation and verification.
    - `password.util.ts`: Password hashing and comparison.
  - `index.ts`: Entry point of the application.
```

## Prerequisites

Before you start, make sure you have the following prerequisites:

- Node.js and npm installed.
- MongoDB set up with a connection string ready.
- And, of course, ensure it's a good day to code!

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yashChouriya/Express-TS-Mongo-Starter.git
   ```

2. Install dependencies:

   ```bash
   cd Express-TS-Mongo-Starter
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the project root and add the following environment variables:

   ```plaintext
   PORT=3000
   DB_CONNECTION_STRING=mongodb://username:password@localhost:27017/database
   NODE_ENV=development
   JWT_SECRET_KEY=mySecretKey123
   ```

   Adjust these variables as needed for your environment. If you're not sure about the exact values for these variables, you can refer to the `.env.example` file in the project for guidance.

## Usage

- Build the TypeScript code:

  ```bash
  npm run build
  ```

- Start the server:

  ```bash
  npm start
  ```

- Run the server in development mode with hot-reloading:

  ```bash
  npm run dev
  ```

## Configuration

### TypeScript Configuration

The TypeScript configuration is defined in the `tsconfig.json` file located in the project root.

## Acknowledgments

This project leverages several essential open-source libraries and tools to simplify development:

- [Express.js](https://expressjs.com/): A fast and minimalist web framework for Node.js.
- [TypeScript](https://www.typescriptlang.org/): A typed superset of JavaScript that enhances code quality and tooling.
- [MongoDB](https://www.mongodb.com/): A popular NoSQL database used for data storage.
- [JSON Web Token (JWT)](https://jwt.io/): A compact, URL-safe means of representing claims to be transferred between two parties.
- [Mongoose](https://mongoosejs.com/): An elegant MongoDB object modeling tool for Node.js.
- [Helmet](https://helmetjs.github.io/): A security-focused middleware for securing Express.js apps by setting various HTTP headers.
- [Cors](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS): Middleware for enabling Cross-Origin Resource Sharing.
- [Nodemon](https://nodemon.io/): A tool to automatically restart the Node.js server on code changes during development.
- [Concurrently](https://www.npmjs.com/package/concurrently): A utility for running multiple npm scripts concurrently.
- [Dotenv](https://www.npmjs.com/package/dotenv): A module for loading environment variables from a `.env` file.
- [Morgan](https://www.npmjs.com/package/morgan): A middleware for HTTP request logging.
- [Yup](https://github.com/jquense/yup): A library for schema validation.

These libraries are instrumental in building a robust and efficient Node.js application. We extend our gratitude to the creators and maintainers of these tools for their valuable contributions.

Happy coding!
