module.exports = {
  name: 'cdk',
  preset: '../../jest.config.js',
  coverageReporters: ['lcov', 'cobertura'],
  coverageDirectory: '../../docs/test-coverage/cdk',
  collectCoverageFrom: [
    './src/**/!(index).ts',
    '!./src/lib/experimental/**/*.ts',
  ],
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
      astTransformers: [
        'jest-preset-angular/build/InlineFilesTransformer',
        'jest-preset-angular/build/StripStylesTransformer',
      ],
    },
  },
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
  displayName: 'cdk',
};
