module.exports = {
  name: 'rxjs-base-state',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/rxjs-base-state',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
