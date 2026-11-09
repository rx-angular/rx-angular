import { NgModule } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserTestingModule,
  platformBrowserTesting,
} from '@angular/platform-browser/testing';
import providers from './test-providers';

// What the Angular CLI unit-test builder does for us, for configs that run vitest directly.
@NgModule({ providers })
class TestProvidersModule {}

getTestBed().initTestEnvironment(
  [BrowserTestingModule, TestProvidersModule],
  platformBrowserTesting(),
);
