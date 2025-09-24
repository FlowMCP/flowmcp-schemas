// jest.config.js
export default {
    testEnvironment: 'node',
    verbose: true,
    collectCoverageFrom: [
        'src/**/*.mjs'
    ],
    coverageThreshold: {
        'src/**/*.mjs': {
            statements: 0,
            branches: 0,
            functions: 0,
            lines: 0
        }
    },
    coverageReporters: [ 'text', 'lcov', 'html' ],
    testMatch: [ '**/tests/unit/**/*.test.js' ]
}