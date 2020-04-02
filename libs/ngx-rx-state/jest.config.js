module.exports = {
  name: 'ngx-rx-state',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/ngx-rx-state',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
