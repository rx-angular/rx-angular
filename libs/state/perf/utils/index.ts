import * as Benchmark from 'benchmark';

export interface BenchmarkTestSet {
  [testName: string]: Function;
}

export interface BenchmarkListener {
  [listenerName: string]: Function;
}

export interface BenchmarkSuite {
  testSet: BenchmarkTestSet;
  listeners?: BenchmarkListener;
  options?: Benchmark.Options;
}

export function runBenchmarkSuite(benchmarkSuite: BenchmarkSuite) {
  const suite = new Benchmark.Suite();
  const listeners: BenchmarkListener = {
    cycle: function (event: Event) {
      console.log(String(event.target));
    },
    complete: function () {
      console.log('Fastest is ' + this.filter('fastest').map('name'));
    },
    ...(benchmarkSuite.listeners ? benchmarkSuite.listeners : {}),
  };
  const options: Benchmark.Options = {
    async: true,
    ...(benchmarkSuite.options ? benchmarkSuite.options : {}),
  };

  // Add tests
  Object.entries(benchmarkSuite.testSet).forEach(([name, fn]) => {
    suite.add(name, fn);
  });

  // Add Listener
  Object.entries(listeners).forEach(([name, fn]) => {
    suite.on(name, fn);
  });

  // Run with options
  suite.run(benchmarkSuite.options || {});
}
