import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      webServerCommands: {
        default: 'npx nx run ssr-hydration:serve',
        production: 'npx nx run ssr-hydration:serve:production',
      },
      cypressDir: 'cypress',
    }),
    // Own port so it can run next to the other apps' e2e targets on one CI agent.
    baseUrl: 'http://localhost:4203',
  },
});
