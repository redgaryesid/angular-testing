import type { Config } from 'jest';

export default {
    moduleNameMapper: {
        '@shared/(.*)': '<rootDir>/src/app/domains/shared/$1',
        '@products/(.*)': '<rootDir>/src/app/domains/products/$1',
        '@info/(.*)': '<rootDir>/src/app/domains/info/$1',
        '@envs/(.*)': '<rootDir>/src/app/domains/enviroments/$1',
    },
    coverageDirectory: '<rootDir>/coverage',
    collectCoverageFrom: [
        'src/app/**/*.ts',
        '!<rootDir>/node_modules/',
        '!<rootDir>/test/'
    ],
} satisfies Config;