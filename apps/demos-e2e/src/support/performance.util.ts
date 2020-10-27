/**
 * Run Cypress task that enables and starts Profiler as per the `Profiler.enable`
 * and `Profiler.start` methods from Chrome Devtools Protocol.
 *
 * @see https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#method-enable
 * @see https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#method-start
 */
export function startProfiler() {
  cy.task('enableProfiler');
  cy.task('startProfiler');
}

/**
 * Run Cypress task that stops and disables Profiler as per the `Profiler.stop`
 * and `Profiler.disable` methods from Chrome Devtools Protocol and writes results to a file.
 *
 * @param fileNameSuffix - Optional suffix for a file name of the file with results. Helps with distinguishing
 * results per tests.
 *
 * @see https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#method-stop
 * @see https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#method-disable
 */
export function stopProfiler(fileNameSuffix?: string) {
  cy.task('stopProfiler', { suffix: fileNameSuffix });
  cy.task('disableProfiler');
}

/**
 * Run Cypress task that starts Tracing as per the `Tracing.start` method from Chrome Devtools Protocol.
 *
 * @see https://chromedevtools.github.io/devtools-protocol/tot/Tracing/#method-start
 */
export function startTracing() {
  cy.task('startTracing');
}

/**
 * Run Cypress task that ends Tracing as per the `Tracing.end` method from Chrome Devtools Protocol
 * and writes to a file.
 *
 * @param fileNameSuffix - Optional suffix for a file name of the file with results. Helps with distinguishing
 * results per tests.
 *
 * @see https://chromedevtools.github.io/devtools-protocol/tot/Tracing/#method-end
 */
export function stopTracing(fileNameSuffix?: string) {
  cy.task('endTracing', { suffix: fileNameSuffix });
}
