module.exports = {
  name: 'tour-of-heroes-ngxs',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/tour-of-heroes-ngxs',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
