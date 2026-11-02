import { builtinEnvironments, type Environment } from 'vitest/runtime';

// jsdom first, then zone.js: zone patches the jsdom globals and is loaded
// before `@angular/core/testing` captures `Zone` (which fakeAsync needs).
export default {
  name: 'jsdom-zone',
  viteEnvironment: 'client',
  async setup(global, options) {
    const env = await builtinEnvironments.jsdom.setup(global, options);
    await import('zone.js');
    return env;
  },
} satisfies Environment;
