import { nxComponentTestingPreset } from '@nrwl/angular/plugins/component-testing';
import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    ...nxComponentTestingPreset(__filename),
    specPattern: ['**/*.cy.ts'],
    viewportHeight: 600,
  },
  viewportHeight: 600,
});
