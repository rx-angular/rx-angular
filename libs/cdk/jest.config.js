module.exports = {
  bail: true,
  name: 'cdk',
  displayName: 'cdk',
  preset: '../../jest.preset.js',
  coverageReporters: ['lcov', 'cobertura'],
  coverageDirectory: '../../docs/test-coverage/cdk',
  collectCoverageFrom: [
    './src/**/!(index).ts',
    '!./src/lib/experimental/**/*.ts',
  ],
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      stringifyContentPathRegex: '\\.(html|svg)$',
      astTransformers: {
        before: [
          'jest-preset-angular/build/InlineFilesTransformer',
          'jest-preset-angular/build/StripStylesTransformer',
        ],
      },
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
