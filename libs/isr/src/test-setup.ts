import '@angular/compiler';
import '@analogjs/vitest-angular/setup-zone';
import { setupTestBed } from '@analogjs/vitest-angular/setup-testbed';
import { provideZoneChangeDetection } from '@angular/core';

setupTestBed({
  zoneless: false,
  providers: [provideZoneChangeDetection()],
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true,
});
