import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv();
import { TextDecoder } from 'util';
import { deserialize, serialize } from 'v8';

/* @Notice: schematics have long-running tests that timeout if no cache hit. */
jest.setTimeout(100_000);
/**
 * @Notice: This is a workaround for the following issue: https://github.com/angular/angular/issues/48748
 */
global.TextDecoder = TextDecoder;
/**
 * @Notice: jsdom test environment does not provide `structuredClone`, which
 * `@schematics/angular` relies on. Polyfill it with a faithful implementation.
 */
if (typeof globalThis.structuredClone === 'undefined') {
  globalThis.structuredClone = (value) => deserialize(serialize(value));
}
