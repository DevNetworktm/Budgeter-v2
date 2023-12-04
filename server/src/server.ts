// Import environment variables
import "dotenv/config";

import app from "./main";

/**
 * The port number for the server.
 * If the environment variable PORT is set, it will be used as the port number.
 * Otherwise, the default port number is 3000.
 */
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
