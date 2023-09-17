/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    rootDir: '.',
    moduleFileExtensions: ['js', 'ts'],
    testRegex: ".int.spec.ts$",
    transform: {
      "^.+\\.(t|j)s$": "ts-jest"
    }
  };