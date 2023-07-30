import { defineConfig } from 'cypress';
import { nxComponentTestingPreset } from '@nx/angular/plugins/component-testing';

export default defineConfig({
  component: {
    ...nxComponentTestingPreset(__filename),
    defaultCommandTimeout: 10000,
    specPattern: ['**/*.cy.ts'],
    viewportHeight: 600,
  },
  viewportHeight: 600,
});
