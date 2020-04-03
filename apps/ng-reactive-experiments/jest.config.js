module.exports = {
  name: 'ng-reactive-experiments',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/ng-reactive-experiments',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
