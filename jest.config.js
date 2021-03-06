module.exports = {
  roots: ["<rootDir>"],
  moduleFileExtensions: ["ts", "tsx", "js", "json", "jsx"],
  testPathIgnorePatterns: ["<rootDir>[/\\\\](node_modules|.next)[/\\\\]"],
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$"],
  moduleDirectories: ["node_modules", "src", "src/utils"],
  transform: {
    "^.+\\.(ts|tsx)$": "babel-jest",
  },
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
  moduleNameMapper: {
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/config/jest/fileMock.js",
  },
  setupFilesAfterEnv: [
    require.resolve("jest-extended"),
    require.resolve("@testing-library/jest-dom"),
  ],
};
