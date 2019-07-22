module.exports = {
  roots: ["<rootDir>"],
  transform: { "^.+\\.tsx?$": "babel-jest" },
  testPathIgnorePatterns: [
    "<rootDir>/client/.next/",
    "<rootDir>/node_modules/"
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["<rootDir>/setupEnzyme.ts"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": "babel-jest"
  },
  testMatch: ["**/__tests__/**/*.test.(ts|tsx|js)"]
};
