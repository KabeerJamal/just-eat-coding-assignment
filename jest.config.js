// jest.config.js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ["<rootDir>/src/__tests__/helpers/","<rootDir>/dist/"]
}