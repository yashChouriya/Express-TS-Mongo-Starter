import authenticationRoutes from "./authentication/index.js";

// Define the project routes as an array of objects.
const projectRoutes = [
  {
    path: "/auth", // The base path for authentication routes.
    component: authenticationRoutes,
  },

  //   ...add other routes here
];

// Export the project routes for use in other parts of the application.
export default projectRoutes;
