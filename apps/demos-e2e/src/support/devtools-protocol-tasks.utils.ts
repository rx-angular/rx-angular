/**
 * Runs Cypress tasks that enable and start Profiler as per the `Profiler.enable`
 * and `Profiler.start` methods from the Chrome Devtools Protocol.
 */
export function startProfiler() {
  cy.task('enableProfiler');
  cy.task('startProfiler');
}

/**
 * Runs Cypress tasks that stop and disable Profiler as per the `Profiler.stop`
 * and `Profiler.disable` methods from the Chrome Devtools Protocol and writes results to a file.
 *
 * @param fileNameSuffix - Optional suffix for a file name of the file with results. Helps with distinguishing
 * results per tests.
 */
export function stopProfiler(fileNameSuffix?: string) {
  cy.task('stopProfiler', { suffix: fileNameSuffix });
  cy.task('disableProfiler');
}

/**
 * Runs Cypress task that starts Tracing as per the `Tracing.start` method from the Chrome Devtools Protocol.
 */
export function startTracing() {
  cy.task('startTracing');
}

/**
 * Runs Cypress task that ends Tracing as per the `Tracing.end` method from the Chrome Devtools Protocol
 * and writes to a file.
 *
 * @param fileNameSuffix - Optional suffix for a file name of the file with results. Helps with distinguishing
 * results per tests.
 */
export function stopTracing(fileNameSuffix?: string) {
  cy.task('endTracing', { suffix: fileNameSuffix });
}

export function writeAverage(id: string, result: string) {
  cy.task('writeAverage', { id, result });
}
