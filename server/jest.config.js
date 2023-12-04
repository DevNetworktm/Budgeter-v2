module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.ts"],
  rootDir: "./src",
  setupFilesAfterEnv: ["./tests/jest.setup.ts"],
};
