/** @type {import('ts-jest').JestConfigWithTsJest} */

export default {
  preset: 'ts-jest/presets/default-esm', // handles TS + ESM
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      useESM: true,   // this replaces the deprecated globals config
    }],
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^tests/(.*)$': '<rootDir>/tests/$1'

  },

};
