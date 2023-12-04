import request from "supertest";
import app from "../../main";

let authToken: string;

/**
 * Performs the necessary setup before running the tests.
 * It logs in as an admin user and retrieves the authentication token.
 */
beforeAll(async () => {
  const authResponse = await request(app).post("/api/auth/login").send({
    email: "admin@gmail.com",
    password: "admin",
  });

  authToken = authResponse.header["set-cookie"][0].split(";")[0].split("=")[1];
});

/**
 * Represents the response object returned from the API endpoint.
 * @typedef {Object} Response
 * @property {number} status - The HTTP status code of the response.
 * @property {Object} body - The body of the response.
 */

/**
 * Tests the GET /api/users/me endpoint.
 * It expects a successful response with status code 200 and the correct email in the body.
 */
test("GET /api/users/me => 200", async () => {
  const response = await request(app)
    .get("/api/users/me")
    .set("Cookie", [`token=${authToken}`]);

  expect(response.status).toBe(200);
  expect(response.body).toBeDefined();
  expect(response.body.email).toBe("admin@gmail.com");
});

test("GET /api/users/me?all=true => 200", async () => {
  const response = await request(app)
    .get("/api/users/me?all=true")
    .set("Cookie", [`token=${authToken}`]);

  expect(response.status).toBe(200);
  expect(response.body).toBeDefined();
  expect(response.body.email).toBe("admin@gmail.com");
  expect(response.body.Account).toBeDefined();
});
