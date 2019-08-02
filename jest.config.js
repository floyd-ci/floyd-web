module.exports = {
  collectCoverageFrom: ["src/**/*.ts"],
  preset: "ts-jest",
  setupFiles: ["./jest.setup.ts"],
  testEnvironment: "node",
};
