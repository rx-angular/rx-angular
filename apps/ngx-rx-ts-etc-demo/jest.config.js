module.exports = {
  name: 'ngx-rx-ts-etc-demo',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/ngx-rx-ts-etc-demo',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
