module.exports = {
  name: 'rxjs-state',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/rxjs-state',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
