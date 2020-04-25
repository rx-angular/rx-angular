module.exports = {
  name: 'architecture-demos',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/architecture-demos',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
