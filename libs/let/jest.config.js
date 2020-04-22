module.exports = {
  name: 'let',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/let',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
