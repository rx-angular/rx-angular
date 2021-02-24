export default {
    entry: './dist/libs/@rx-angular/template/rx-angular-template.es5.js',
    dest: './dist/libs/template/bundles/rx-angular-template.umd.js',
    format: 'umd',
    exports: 'named',
    moduleName: 'rx-angular.template',
    globals: {
      '@angular/core': 'ng.core',
      '@rx-angular/cdk': 'rx-angular.cdk',
      rxjs: 'Rx',
    }
  };