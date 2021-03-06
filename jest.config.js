module.exports = {
  clearMocks: true,

  collectCoverageFrom: ["src/**/*.{js,jsx}"],

  coverageDirectory: "coverage",

  moduleFileExtensions: ["js", "json", "jsx"],

  testEnvironment: "jsdom",

  testMatch: ["**/__tests__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"],

  testPathIgnorePatterns: ["\\\\node_modules\\\\"],

  testURL: "http://localhost",

  transformIgnorePatterns: ["<rootDir>/node_modules/"],

  setupFiles: ['<rootDir>/enzyme.config.js'],

  verbose: false,

  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.js"
  }
};
