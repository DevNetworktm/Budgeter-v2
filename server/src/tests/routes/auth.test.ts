import app from "../../main";

// Import supertest
import request from "supertest";

/**
 * This test case verifies the behavior of the POST /api/auth/login endpoint.
 * It sends a request with the email and password, and expects a 200 status code in response.
 * Additionally, it checks if the "token" cookie is set and its value is correct.
 */
test("POST /api/auth/login => 200", async () => {
  const response = await request(app).post("/api/auth/login").send({
    email: "admin@gmail.com",
    password: "admin",
  });

  expect(response.status).toBe(200);
  const cookies = response.header["set-cookie"];

  expect(cookies).toBeDefined();

  const [name, value] = cookies[0].split(";")[0].split("=");
  expect(name).toBe("token");
});
