/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/*.test.(js|mjs)'],
  moduleFileExtensions: ['js', 'mjs'],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.mjs$': 'babel-jest',
  },
  testPathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/node_modules/'],
}
