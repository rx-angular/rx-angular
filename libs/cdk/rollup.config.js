export default {
    entry: './dist/libs/@rx-angular/cdk/rx-angular-cdk.es5.js',
    dest: './dist/libs/cdk/bundles/rx-angular-cdk.umd.js',
    format: 'umd',
    exports: 'named',
    moduleName: 'rx-angular.cdk',
    globals: {
      '@angular/core': 'ng.core',
      rxjs: 'Rx',
    }
  };