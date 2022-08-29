import 'jest-preset-angular/setup-jest';

/* @Notice: schematics have long-running tests that timeout if no cache hit. */
jest.setTimeout(100_000);
