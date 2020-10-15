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
    resetCRI: async () => {
      if (client) {
        debug('resetting CRI client');
        await client.close();
        client = null;
      }

      return Promise.resolve(true);
    },

    enableProfiler: async () => {
      debug('enableProfiler');
      client = client || (await CDP({ port }));

      const { Profiler } = client;
      await Profiler.setSamplingInterval({ interval: 100 });

      return Profiler.enable();
    },

    disableProfiler: async () => {
      debug('disableProfiler');
      client = client || (await CDP({ port }));

      return client.Profiler.disable();
    },

    startProfiler: async () => {
      debug('startProfiler');
      client = client || (await CDP({ port }));

      return client.Profiler.start();
    },

    stopProfiler: async (params) => {
      debug('stopProfiler');
      client = client || (await CDP({ port }));

      const profilerResults = await client.Profiler.stop();

      fs.writeFileSync(
        `./profiling_${params.title}_${currentDateString()}.cpuprofile`,
        JSON.stringify(profilerResults.profile || 'Profile not found')
      );

      return Promise.resolve(profilerResults);
    },

    startTracing: async () => {
      debug('startTracing');
      client = client || (await CDP({ port }));
      const { Page, Tracing } = client;

      await Page.enable();
      tracingEvents = [];
      Tracing.dataCollected(({ value }) => {
        tracingEvents.push(...value);
      });

      return Tracing.start({
        categories: TRACE_CATEGORIES.join(','),
        options: 'sampling-frequency=10000',
      });
    },

    endTracing: async (params) => {
      debug('endTracing');
      client = client || (await CDP({ port }));

      await client.Tracing.end();
      const tracingComplete = await client.Tracing.tracingComplete();

      fs.writeFileSync(
        `./tracing_${params.title}_${currentDateString()}.json`,
        JSON.stringify(tracingEvents)
      );

      return Promise.resolve(tracingComplete);
    },
  });
};

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
