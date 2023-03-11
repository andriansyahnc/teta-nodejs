import type {Config} from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ["<rootDir>/test/setup-tests.ts"],
  bail: true,
  transformIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/node_modules/"],
  testMatch: [ "**/__tests__/**/*.[t]s?(x)", "**/?(*.)+(spec|test).[t]s?(x)" ],
  collectCoverage: true,
  testTimeout: 10000
}

export default config;
