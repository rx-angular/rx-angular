# Resources related to performance

  As we ship a highly performant library (@rx-angular/template) 
  we should provide information on how to inspect the rendering of angular.

  ## Measurement
  - Browser performance tools
  - Use the `num-renders` component as indicator
  - https://google.github.io/tracing-framework/getting-started.html
  - https://github.com/angular/angular/blob/41ed694d01414edabc4f0ac3a8cb17681683fc32/packages/core/src/profile/wtf_impl.ts
  - https://docs.sentry.io/platforms/javascript/guides/angular/components/tracehelpers/
  - https://github.com/facebook/react/commit/2bea3fb0b8f13db702da14b2b02e85127ed397a4
  - https://gist.github.com/naugtur/4b03a9f9f72346a9f79d7969728a849f# Ideas
  - We definitely should have examples of bad performance (easy to grasp and commonly used) and how to improve with @rx-anglar
  - We should use our captured material to create snippets on how to measure performance.
  - We should add examples to the official docs page
  - We could research tools on how to measure performance
  - Benchmark CD runs https://angular.io/api/platform-browser/enableDebugTools#description
  - benchpress
  -  https://github.com/alan-agius4/angular-benchpress-playground/blob/master/e2e/app.e2e-spec.ts
  - https://github.com/angular/angular/tree/master/modules/benchmarks
  - https://github.com/angular/angular/blob/master/dev-infra/benchmark/driver-utilities/perf_util.ts
  - https://github.com/paulirish/automated-chrome-profiling
  - https://github.com/GoogleChromeLabs/psi
  - https://github.com/krausest/js-framework-benchmark
  - https://arkit.pro/svg/UDfDp34EW20C0C2zh-YeWrym37waaQe4sf82-dqTdI-vq3fv7r80MavQoKbGJ6s_t8In--2Vj8kYFKbFFAWq1jZuvcAL7PSL9_AS-WmGMEDtlbU28LS0
  - https://github.com/angular/angular/blob/master/docs/TOOLS.md
  - https://github.com/angular/angular/issues/14033#issuecomment-612841032

  ## Articles

  - https://codeburst.io/painting-and-rendering-optimization-techniques-in-browser-2e53a70e7ee
  - https://codeburst.io/javascript-compiler-optimization-techniques-only-for-experts-58d6f5f958ca

  ## Code 
  - https://github.com/facebook/react/blob/master/packages/scheduler/src/Scheduler.js
