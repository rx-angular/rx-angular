module.exports = {
  name: 'state',
  displayName: 'state',
  preset: '../../jest.preset.js',
  coverageReporters: ['lcov', 'cobertura'],
  coverageDirectory: '../../docs/test-coverage/state',
  collectCoverageFrom: [
    './src/**/!(index).ts',
    '!./src/lib/experimental/**/*.ts',
  ],

  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      stringifyContentPathRegex: '\\.(html|svg)$',

      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
  transform: {
    '^.+.(ts|mjs|js|html)$': 'jest-preset-angular',
  },
  transformIgnorePatterns: ['node_modules/(?!.*.mjs$)'],
};
