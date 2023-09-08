import express from "express";
import * as dotenv from "dotenv";
import expressConfig from "./configs/express.config.js";
import dbConfiguration from "./configs/db.config.js";

dotenv.config();

// Create an Express application instance
const app = express();

// Define the port for the server to listen on (default is 3000 if not provided)
const port = process.env.PORT ?? 3000;

// Get the database connection string from environment variables
const dbConnectionString = process.env.DB_CONNECTION_STRING;

// Check if required environment variables are loaded correctly
if (!port || !dbConnectionString) {
  console.error(
    "PORT || DB_CONNECTION_STRING environment variables are not loaded correctly!"
  );
  process.exit(1);
}

// Initialize Express configuration, including middleware and API routes
expressConfig(app);

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);

  // Connect to the database using the provided connection string
  dbConfiguration(dbConnectionString);
});
