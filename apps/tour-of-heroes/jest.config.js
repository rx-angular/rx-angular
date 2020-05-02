module.exports = {
  name: 'tour-of-heroes',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/tour-of-heroes',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
