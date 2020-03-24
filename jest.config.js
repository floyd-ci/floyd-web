module.exports = {
  collectCoverageFrom: ["src/**/*.ts"],
  globals: {
    "ts-jest": {
      diagnostics: {
        ignoreCodes: ["TS2307"],
      },
    },
  },
  preset: "ts-jest",
  setupFiles: ["./jest.setup.ts"],
  testEnvironment: "node",
};
