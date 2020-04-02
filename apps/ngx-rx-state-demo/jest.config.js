module.exports = {
  name: 'ngx-rx-state-demo',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/ngx-rx-state-demo',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
