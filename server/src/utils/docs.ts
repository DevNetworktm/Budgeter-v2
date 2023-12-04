import type { Express } from "express";

import fs from "fs";
import path from "path";

import yaml from "yaml";
import swaggerUi from "swagger-ui-express";

/**
 * Adds documentation to the Express app using Swagger UI.
 * @param app The Express app.
 */
export function addDocumentation(app: Express) {
  const file = fs.readFileSync(
    path.join(__dirname, "..", "docs", "v1", "doc.yml"),
    "utf8"
  );
  const swaggerDocument = yaml.parse(file);
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
