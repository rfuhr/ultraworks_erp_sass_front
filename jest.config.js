/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/apps', '<rootDir>/libs'],
  testMatch: ['**/*.spec.ts'],
  moduleNameMapper: {
    '^@app/tokens$': '<rootDir>/libs/tokens/src/public-api.ts',
    '^@app/uw-ui$': '<rootDir>/libs/uw-ui/src/public-api.ts',
    '^@app/core$': '<rootDir>/libs/core/src/public-api.ts',
    '^@app/data$': '<rootDir>/libs/data/src/public-api.ts',
    '^@app/i18n$': '<rootDir>/libs/i18n/src/public-api.ts',
  },
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  collectCoverageFrom: [
    'libs/core/src/**/*.ts',
    'libs/data/src/**/*.ts',
    'libs/uw-ui/src/**/*.ts',
    'apps/frontend/src/app/**/*.ts',
    '!**/*.spec.ts',
    '!**/*.stories.ts',
    '!**/public-api.ts',
    '!**/*.module.ts',
    '!**/*.routes.ts',
    '!**/index.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60,
    },
    './libs/core/': {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    './libs/data/': {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    './apps/frontend/src/app/features/': {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/storybook-static/',
    '/.angular/',
    '/e2e/',
  ],
};
