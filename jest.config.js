module.exports = {
    preset: 'ts-jest', // Usa o preset ts-jest para lidar com TypeScript
    testEnvironment: 'node', // Ambiente de teste baseado em Node.js
    moduleFileExtensions: ['ts', 'js', 'json', 'node'], // Extensões de arquivos que o Jest deve processar
    roots: ['<rootDir>/test'], // Onde os arquivos de teste estão localizados
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',  // Mapear qualquer caminho começando com @/ para o diretório src
      '^src/(.*)$': '<rootDir>/src/$1',
    },
    transform: {
      '^.+\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.json' }], // Transforma arquivos TypeScript usando ts-jest
    },
    testMatch: [
      '**/test/**/*.spec.ts', // Onde o Jest deve procurar os arquivos de teste
    ],
    collectCoverage: true, // Coleta de cobertura de testes
    coverageDirectory: './coverage', // Diretório onde o Jest vai armazenar os resultados de cobertura
    coverageProvider: 'v8', // Usando o V8 para calcular a cobertura
    setupFiles: ['dotenv/config'], // Carrega variáveis de ambiente de um arquivo .env, caso necessário
    transformIgnorePatterns: ['node_modules/(?!(@nestjs|nestjs-query)/)'], // Para ignorar a transformação de certos pacotes
  };
  