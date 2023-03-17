/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: [
    "node_modules",
    "src/**",
  ],
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1"
  }
};