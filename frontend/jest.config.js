// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],

  // If you're using [Module Path Aliases](https://nextjs.org/docs/advanced-features/module-path-aliases),
  // you will have to add the moduleNameMapper in order for jest to resolve your absolute paths.
  // The paths have to be matching with the paths option within the compilerOptions in the tsconfig.json
  // For example:

  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',

  // Coverage Configuration
  collectCoverage: false, // Don't collect by default (use --coverage flag)

  collectCoverageFrom: [
    // Include source files
    'models/**/*.{ts,tsx}',
    'lib/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    'app/**/*.{ts,tsx}',

    // Exclude patterns
    '!**/*.test.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
  ],

  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    '/coverage/',
    '/public/',
    '/data/', // JSON data files
    '/styles/', // CSS files
  ],

  coverageThreshold: {
    global: {
      lines: 60,
      statements: 60,
      branches: 50,
      functions: 48,
    },
    './models/calculation-resources.ts': {
      lines: 81,
      statements: 80,
      branches: 71,
      functions: 90,
    },
  },

  coverageReporters: [
    'text',        // Console output
    'text-summary', // Summary in console
    'html',        // HTML report in coverage/ directory
    'lcov',        // For CI/CD integration
    'json-summary', // For programmatic access
  ],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)