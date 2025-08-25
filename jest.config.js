// jest.config.js
export default {
    testEnvironment: 'node',
    verbose: true,
    collectCoverageFrom: [
        'src/**/*.mjs'
    ],
    coverageThreshold: {
        'src/**/*.mjs': {
            statements: 70,
            branches: 60,
            functions: 75,
            lines: 70
        }
    },
    coverageReporters: [ 'text', 'lcov', 'html' ],
    testMatch: [ '**/tests/unit/**/*.test.js' ]
}