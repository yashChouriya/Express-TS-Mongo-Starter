import mongoose from "mongoose";
/**
 * The function `dbConfiguration` connects to a MongoDB database using the provided connection string.
 * @param {string} dbConnectionString - The `dbConnectionString` parameter is a string that represents
 * the connection URL for your MongoDB database. It typically includes the protocol (e.g.,
 * "mongodb://"), the host and port of the database server, and the name of the database you want to
 * connect to.
 */
const dbConfiguration = (dbConnectionString: string) => {
  // Connect to the database
  mongoose.Promise = Promise;
  mongoose.connect(dbConnectionString);
  mongoose.connection.on("error", (error: Error) => console.error(error));
  mongoose.connection.on("open", (error: Error) =>
    console.info("⚡️[database]: Database connection established!")
  );
};

export default dbConfiguration;
