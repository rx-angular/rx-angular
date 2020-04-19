module.exports = {
  name: 'ngx-rx-experiments',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/ngx-rx-experiments',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
