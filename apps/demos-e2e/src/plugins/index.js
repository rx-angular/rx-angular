const { preprocessTypescript } = require('@nrwl/cypress/plugins/preprocessor');
const CDP = require('chrome-remote-interface');
const debug = require('debug')('cypress:server:protocol');
const fs = require('fs');

let port = 0;
let client = null;
let tracingEvents = [];
// copied from https://github.com/paulirish/automated-chrome-profiling/blob/master/get-timeline-trace.js#L5
const TRACE_CATEGORIES = [
  '-*',
  'devtools.timeline',
  'disabled-by-default-devtools.timeline',
  'disabled-by-default-devtools.timeline.frame',
  'toplevel',
  'blink.console',
  'disabled-by-default-devtools.timeline.stack',
  'disabled-by-default-devtools.screenshot',
  'disabled-by-default-v8.cpu_profile',
  'disabled-by-default-v8.cpu_profiler',
  'disabled-by-default-v8.cpu_profiler.hires',
];

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  // Preprocess Typescript file using Nx helper
  on('file:preprocessor', preprocessTypescript(config));

  on('before:browser:launch', (browser, launchOptionsOrArgs) => {
    debug('browser launch args or options %o', launchOptionsOrArgs);
    const args = Array.isArray(launchOptionsOrArgs)
      ? launchOptionsOrArgs
      : launchOptionsOrArgs.args;

    port = ensureRemoteDebuggingPort(args);
    debug('ensureRemoteDebuggingPort %d', port);
    debug('Chrome arguments %o', args);
  });

  on('task', {
    /**
     * Task for resetting Chrome Remote Interface. Suggested to be run before each test running CDP-related Cypress tasks.
     * @returns {Promise<boolean>}
     */
    resetCRI: async () => {
      if (client) {
        debug('resetting CRI client');
        await client.close();
        client = null;
      }

      return Promise.resolve(true);
    },

    /**
     * Task for running CDP's `Profiler.enable` method.
     * @returns {Promise<*>}
     * @see https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#method-enable
     */
    enableProfiler: async () => {
      debug('enableProfiler');
      client = client || (await CDP({ port }));

      const { Profiler } = client;
      await Profiler.setSamplingInterval({ interval: 100 });

      return Profiler.enable();
    },

    /**
     * Task for running CDP's `Profiler.disable` method.
     * @returns {Promise<*>}
     * @see https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#method-disable
     */
    disableProfiler: async () => {
      debug('disableProfiler');
      client = client || (await CDP({ port }));

      return client.Profiler.disable();
    },

    /**
     * Task for running CDP's `Profiler.start` method.
     * @returns {Promise<*>}
     * @see https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#method-start
     */
    startProfiler: async () => {
      debug('startProfiler');
      client = client || (await CDP({ port }));

      return client.Profiler.start();
    },

    /**
     * Task for running CDP's `Profiler.stop` method and saving results to a `.cpuprofile` file.
     * @returns {Promise<*>}
     * @see https://chromedevtools.github.io/devtools-protocol/tot/Profiler/#method-stop
     */
    stopProfiler: async (params) => {
      debug('stopProfiler');
      client = client || (await CDP({ port }));

      const profilerResults = await client.Profiler.stop();

      fs.writeFileSync(
        `./profiling${params.suffix ? '_' + params.suffix : ''}_${currentDateString()}.cpuprofile`,
        JSON.stringify(profilerResults.profile || 'Profile not found')
      );

      return Promise.resolve(profilerResults);
    },

    /**
     * Task for running CDP's `Tracing.start` method.
     * @returns {Promise<*>}
     * @see https://chromedevtools.github.io/devtools-protocol/tot/Tracing/#method-start
     */
    startTracing: async () => {
      debug('startTracing');
      client = client || (await CDP({ port }));
      const { Page, Tracing } = client;

      await Page.enable();
      tracingEvents = [];
      Tracing.dataCollected(({ value }) => {
        tracingEvents.push(...value);
      });

      // copied from https://github.com/paulirish/automated-chrome-profiling/blob/206a6512af1f59fb51fd82f5df4b9bd462a6d4b6/get-timeline-trace.js#L12
      return Tracing.start({
        categories: TRACE_CATEGORIES.join(','),
        options: 'sampling-frequency=10000',
      });
    },

    /**
     * Task for running CDP's `Tracing.end` method and saving results to a `.json` file.
     * @returns {Promise<*>}
     * @see https://chromedevtools.github.io/devtools-protocol/tot/Tracing/#method-end
     */
    endTracing: async (params) => {
      debug('endTracing');
      client = client || (await CDP({ port }));

      await client.Tracing.end();
      const tracingComplete = await client.Tracing.tracingComplete();

      fs.writeFileSync(
        `./tracing${params.suffix ? '_' + params.suffix : ''}_${currentDateString()}.json`,
        JSON.stringify(tracingEvents)
      );

      return Promise.resolve(tracingComplete);
    },
  });
};

/**
 * Sets and returns (or just returns existing) port number for remote browser debugging.
 * @param args - Arguments provided when launching a browser.
 * @returns {number}
 * @see http://chromedevtools.github.io/devtools-protocol/#remote
 */
function ensureRemoteDebuggingPort(args) {
  const existing = args.find(
    (arg) => arg.slice(0, 23) === '--remote-debugging-port'
  );

  if (existing) {
    return Number(existing.split('=')[1]);
  }

  const port = 40000 + Math.round(Math.random() * 25000);
  args.push(`--remote-debugging-port=${port}`);
  return port;
}

/**
 * Returns current date in the YYYYMMDD-HHmmSS format.
 * @returns {string}
 */
function currentDateString() {
  const date = new Date();
  const year = date.getFullYear();
  const month = formatNumbers(date.getMonth() + 1);
  const day = formatNumbers(date.getDate());
  const hours = formatNumbers(date.getHours());
  const minutes = formatNumbers(date.getMinutes());
  const seconds = formatNumbers(date.getSeconds());
  return `${year}${month}${day}-${hours}${minutes}${seconds}`;

  function formatNumbers(number) {
    return number > 9 ? `${number}` : `0${number}`;
  }
}
