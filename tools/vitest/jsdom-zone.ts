import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { runInContext } from 'node:vm';
import { builtinEnvironments, type Environment } from 'vitest/runtime';

// jsdom first, then zone.js, so zone patches the jsdom globals and is loaded
// before `@angular/core/testing` captures `Zone` (which fakeAsync needs).

// `require` resolves zone.js to its UMD build, which can run directly in a vm context.
const zoneSource = readFileSync(
  createRequire(import.meta.url).resolve('zone.js'),
  'utf8',
);

export default {
  name: 'jsdom-zone',
  viteEnvironment: 'client',
  async setup(global, options) {
    const env = await builtinEnvironments.jsdom.setup(global, options);
    await import('zone.js');
    return env;
  },
  // Used by the `vmThreads` pool: one vm context per spec file.
  async setupVM(options) {
    const env = await builtinEnvironments.jsdom.setupVM!(options);
    let zoneLoaded = false;
    return {
      ...env,
      getVmContext() {
        const context = env.getVmContext();
        if (!zoneLoaded) {
          zoneLoaded = true;
          // Vitest adds `setImmediate` & co. to the context right after this call;
          // load zone.js one microtask later so it patches those too.
          queueMicrotask(() => runInContext(zoneSource, context));
        }
        return context;
      },
    };
  },
} satisfies Environment;
