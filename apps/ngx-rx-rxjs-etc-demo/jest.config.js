module.exports = {
  name: 'ngx-rx-rxjs-etc-demo',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/ngx-rx-rxjs-etc-demo',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
