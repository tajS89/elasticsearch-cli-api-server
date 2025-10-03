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
    '^(\\.{1,2}/.*)\\.js$': '$1', // fixes relative imports for ESM
  },
};
