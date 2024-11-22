module.exports = {
    preset: 'ts-jest', 
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js', 'json', 'node'], 
    roots: ['<rootDir>/test'], 
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',  
      '^src/(.*)$': '<rootDir>/src/$1',
    },
    transform: {
      '^.+\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.json' }], 
    },
    testMatch: [
      '**/test/**/*.spec.ts', 
    ],
    collectCoverage: true, 
    coverageDirectory: './coverage',
    coverageProvider: 'v8', 
    setupFiles: ['dotenv/config'], 
    transformIgnorePatterns: ['node_modules/(?!(@nestjs|nestjs-query)/)'],
  };
  