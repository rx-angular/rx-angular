import * as vitest from 'vitest';

// zone.js only patches vitest's describe/it (needed for fakeAsync) when it can see a `vitest` global.
(globalThis as Record<string, unknown>)['vitest'] ??= vitest;
// @ts-ignore -- zone.js ships no types for its plugins; the error only shows under noImplicitAny
await import('zone.js/plugins/vitest-patch');
