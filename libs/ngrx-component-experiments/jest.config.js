module.exports = {
  name: 'ngrx-component-experiments',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/ngrx-component-experiments',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
