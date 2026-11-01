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
    baseUrl: 'http://localhost:4200',
  },
});
