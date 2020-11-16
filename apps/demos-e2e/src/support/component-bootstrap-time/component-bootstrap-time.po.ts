/*
  Set of helpers for testing "RxLet vs Push" demo page.
*/

export function bootstrap(id: string) {
  cy.get(id).click();
  cy.get(id).click();
}

export function testComponentBootstrap(id: string) {
  for (let i = 0; i < 10; ++i) {
    bootstrap(id);
  }
}

export function getMeasurement(id: string, win: Window): Measurement {
  const bootstrapMarks = win.performance.getEntriesByName(id + 'Bootstrap');
  const readyMarks = win.performance.getEntriesByName(id + 'Ready');
  const measurements = bootstrapMarks.map(
    (b, i) => readyMarks[i].startTime - b.startTime
  );
  const totalTime = measurements.reduce((total, time) => total + time, 0);

  return {
    id,
    runs: measurements.length,
    average: totalTime / measurements.length,
  };
}

export function getSortedMeasurements(ids: string[], win: Window): string {
  const measurements: Measurement[] = ids
    .map((id) => getMeasurement(id, win))
    .sort((a, b) => a.average - b.average);

  const formattedOutput = measurements
    .map(
      (m, i) =>
        `- ${m.id}. ${m.runs} runs. Average bootstrap time: ${m.average} (${
          !i
            ? 'fastest'
            : measurements[0].id +
              ' +' +
              (m.average - measurements[0].average) +
              'ms'
        }) ${
          !i || i === 1
            ? ''
            : '(' +
              measurements[i - 1].id +
              ' +' +
              (m.average - measurements[i - 1].average) +
              'ms' +
              ')'
        }`
    )
    .join('\n\n');

  return formattedOutput;
}

interface Measurement {
  id: string;
  runs: number;
  average: number;
}
