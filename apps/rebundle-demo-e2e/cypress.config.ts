import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      webServerCommands: {
        default: 'npx nx run rebundle-demo:serve:production',
        production: 'npx nx run rebundle-demo:serve:production',
      },
      cypressDir: 'src',
    }),
    baseUrl: 'http://localhost:4201',
  },
});
