module.exports = {
  name: 'template',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/template',
  collectCoverageFrom: [
    "./src/**/*.ts"
  ],
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
