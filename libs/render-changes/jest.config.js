module.exports = {
  name: 'render-changes',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/render-changes',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
