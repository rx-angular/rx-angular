We need some information in the docs about why developing zoneless angular applications is benefitial.

  Here are some thoughts:

  - not limited to build target es2015 (async await) -> smaller bundle size
  -  no dependency to zone.js or zone rxjs-patch -> smaller bundle size
  -  no ExpressionChangedAfterItHasBeenChecked (TODO: do a little research if this is actually true)
  - no brute force rendering (performance)
  - easier interopt with 3rd party libraries/frameworks (e.g. react/view)
  - bug free webcomponents
  - (more) control about what changes get rendered and when
  - no zone related issues in tests
