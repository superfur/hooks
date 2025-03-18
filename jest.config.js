export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': ['babel-jest', { configFile: './babel.config.cjs' }],
  },
  testMatch: [
    '**/__tests__/**/*.test.(ts|tsx|js|jsx)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    '/node_modules/(?!solid-js/web)/',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  globals: {
    'ts-jest': {
      babelConfig: true,
      tsconfig: 'tsconfig.json',
    }
  },
  setupFilesAfterEnv: ['./jest.setup.cjs'],
  extensionsToTreatAsEsm: ['.ts', '.tsx', '.jsx'],
  coverageDirectory: 'coverage',
};