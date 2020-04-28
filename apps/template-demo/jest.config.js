module.exports = {
  name: 'template-demo',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/template-demo',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
