// module.exports = {
//   transform: { '^.+\\.ts?$': 'ts-jest' },
//   testEnvironment: 'node',
//   testRegex: '/tests/.*\\.(test|spec)?\\.(ts|tsx)$',
//   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
// }

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@exmpl/(.*)': '<rootDir>/src/$1',
  },
}