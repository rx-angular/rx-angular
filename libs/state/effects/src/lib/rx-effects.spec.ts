import { Component, EnvironmentInjector, InjectionToken } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { jestMatcher } from '@test-helpers/rx-angular';
import { dirname, join, relative, sep } from 'node:path';
import { Observable, of, Subject, tap, timer } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import * as ts from 'typescript';
import { rxEffects, RxEffectsSetupFn } from './rx-effects';

// runtime half of https://github.com/rx-angular/rx-angular/issues/1737
const GLOBAL_EFFECTS = new InjectionToken('GLOBAL_EFFECTS', {
  providedIn: 'root',
  factory: () => rxEffects(),
});

describe(rxEffects, () => {
  it('should provide the handle via an injection token', () => {
    const effects = TestBed.inject(GLOBAL_EFFECTS);
    expect(effects.register).toBeInstanceOf(Function);
    expect(effects.onDestroy).toBeInstanceOf(Function);
  });

  it('should register an observable', () => {
    const spy = jest.fn();
    setupComponent(({ register }) => register(of('src').pipe(tap(spy))));
    expect(spy).toHaveBeenCalledWith('src');
  });

  it('should unregister a subscription', () => {
    expect.assertions(1);
    const spy = jest.fn();
    const scheduler = new TestScheduler(jestMatcher);

    setupComponent(({ register }) => {
      const unRegister = register(timer(10, scheduler), spy);
      unRegister();
      scheduler.flush();
      expect(spy).not.toHaveBeenCalled();
    });
  });

  it('should register an observable and sideEffect fn', () => {
    const spy = jest.fn();
    setupComponent(({ register }) => register(of('src'), spy));
    expect(spy).toHaveBeenCalledWith('src');
  });

  it('should continuously run sideEffect', () => {
    const spyNext = jest.fn();
    const trigger = new Subject();
    setupComponent(({ register }) => {
      register(trigger, spyNext);
    });

    trigger.next(1);
    expect(spyNext).toHaveBeenCalledWith(1);
    trigger.next(2);
    expect(spyNext).toHaveBeenCalledWith(2);
    expect(spyNext).toHaveBeenCalledTimes(2);
  });

  it('should register multiple observables', () => {
    const spy = jest.fn();
    setupComponent(({ register }) => {
      register(of('src').pipe(tap(spy)));
      register(of('src2'), spy);
    });
    expect(spy.mock.calls[0][0]).toEqual('src');
    expect(spy.mock.calls[1][0]).toEqual('src2');
  });

  it('should handle errors', () => {
    const spyNext = jest.fn();
    const spyError = jest.fn();
    const trigger = new Subject();
    setupComponent(({ register }) => {
      register(trigger, spyNext);
      register(trigger, { next: () => void 0, error: spyError });
    });

    expect(spyNext).toHaveBeenCalledTimes(0);
    trigger.next(1);
    expect(spyNext).toHaveBeenCalledTimes(1);
    trigger.error('E');
    expect(spyNext).toHaveBeenCalledTimes(1);
    expect(spyError).toHaveBeenCalledTimes(1);
  });

  it('should unsubscribe onDestroy', () => {
    const spyInternalOnCleanup = jest.fn();

    const { fixture } = setupComponent(({ register }) => {
      register(
        new Observable(() => {
          return spyInternalOnCleanup;
        }),
      );
    });
    fixture.destroy();
    expect(spyInternalOnCleanup).toHaveBeenCalled();
  });

  it('should call onDestroy', () => {
    const spySideEffect = jest.fn();
    const spyInternalOnCleanup = jest.fn();

    const { fixture, component } = setupComponent(({ register, onDestroy }) => {
      register(of('src').pipe(tap(spySideEffect)));
      onDestroy(spyInternalOnCleanup);
    });
    const spyOnCleanup = jest.fn();
    component.effects.onDestroy(spyOnCleanup);

    expect(spySideEffect).toHaveBeenCalled();
    expect(spyInternalOnCleanup).not.toHaveBeenCalled();
    expect(spyOnCleanup).not.toHaveBeenCalled();
    fixture.destroy();
    expect(spyInternalOnCleanup).toHaveBeenCalled();
    expect(spyOnCleanup).toHaveBeenCalled();
  });

  describe('without injection context', () => {
    it('should throw when invoked without injection context', () => {
      const { rxEffects } = setUpWithoutInjectionContext();
      expect(() => rxEffects(() => {}, {})).toThrow(
        /rxEffects\(\) can only be used within an injection context/,
      );
    });

    it('should be able to use a custom Injector', () => {
      const { rxEffects } = setUpWithoutInjectionContext();

      const envInjector = TestBed.inject(EnvironmentInjector);

      const effects = rxEffects(() => {}, { injector: envInjector });
      expect(effects).toBeDefined();
    });
  });

  // Regression guard for https://github.com/rx-angular/rx-angular/issues/1737.
  //
  // ng-packagr flattens each entry point's declarations with rollup-plugin-dts,
  // which preserves only the export list of the entry module
  // (`libs/state/effects/src/index.ts`). Every type missing from that list is
  // re-emitted WITHOUT `export` in the published `state-effects.d.ts`, and a
  // consumer that stores the handle in an exported symbol then hits TS4023.
  // Exporting the interface from its declaring module is therefore not enough:
  // these guards assert on the entry point, because that is the only boundary a
  // package consumer ever sees. Importing `./rx-effects` directly would let the
  // compiler reach a module that does not exist in the published package and
  // would pass even while the bug ships.
  //
  // Jest specs are transpiled without type checking (`isolatedModules`) and are
  // never declaration-emitted, so the compiler is driven directly here.
  describe('declaration emit', () => {
    let result: ReturnType<typeof emitDeclarations>;

    beforeAll(() => {
      result = emitDeclarations({
        // verbatim reproduction from the issue report
        'token.ts': `
          import { InjectionToken } from '@angular/core';
          import { rxEffects } from '@rx-angular/state/effects';

          export const GLOBAL_EFFECTS = new InjectionToken('GLOBAL_EFFECTS', {
            providedIn: 'root',
            factory: () => rxEffects(),
          });
        `,
        // the handle type has to be importable by name, and annotating with it
        // has to stay assignable to what `rxEffects()` actually returns
        'annotated.ts': `
          import { Injector } from '@angular/core';
          import { RxEffectsHandle, rxEffects } from '@rx-angular/state/effects';

          export function createEffects(injector: Injector): RxEffectsHandle {
            return rxEffects({ injector });
          }
        `,
      });
    });

    it('should compile the reported consumer without diagnostics', () => {
      expect(result.diagnostics).toEqual([]);
    });

    it('should list the handle type in the entry point declarations', () => {
      // rollup-plugin-dts keeps only what this export list names, so the handle
      // has to appear here for the published `state-effects.d.ts` to export it
      expect(result.declarations.get('../index.d.ts')).toContain(
        `export type { RxEffects as RxEffectsHandle } from './lib/rx-effects';`,
      );
    });

    it('should name the handle through the public entry point', () => {
      expect(result.declarations.get('token.d.ts')).toBe(
        [
          `import { InjectionToken } from '@angular/core';`,
          `export declare const GLOBAL_EFFECTS: InjectionToken<import("@rx-angular/state/effects").RxEffectsHandle>;`,
          ``,
        ].join('\n'),
      );
    });

    it('should not reach into a private module path', () => {
      // `./lib/rx-effects` is inlined into `state-effects.d.ts` by ng-packagr and
      // is not resolvable from an installed package
      expect(result.declarations.get('token.d.ts')).not.toMatch(
        /rx-effects"\)/,
      );
    });

    it('should expose the unregister callback as a plain signature', () => {
      expect(result.declarations.get('annotated.d.ts')).toBe(
        [
          `import { Injector } from '@angular/core';`,
          `import { RxEffectsHandle } from '@rx-angular/state/effects';`,
          `export declare function createEffects(injector: Injector): RxEffectsHandle;`,
          ``,
        ].join('\n'),
      );
      expect(result.declarations.get('rx-effects.d.ts')).toContain(
        'onDestroy: (fn: () => void) => () => void;',
      );
    });
  });
});

/**
 * Type-checks and declaration-emits `sources` as consumer modules sitting next
 * to `rx-effects.ts`, using the library's real emit settings from
 * `libs/state/tsconfig.lib.json` so the guard cannot drift from what ships.
 *
 * Returns the compiler diagnostics (formatted as `TSxxxx: message`) plus every
 * emitted `.d.ts`, keyed by its path relative to this directory.
 */
function emitDeclarations(sources: Record<string, string>) {
  const configPath = join(__dirname, '../../../tsconfig.lib.json');
  const { config, error } = ts.readConfigFile(configPath, ts.sys.readFile);
  if (error) {
    throw new Error(ts.flattenDiagnosticMessageText(error.messageText, ' '));
  }
  const { options: libOptions, errors } = ts.parseJsonConfigFileContent(
    config,
    ts.sys,
    dirname(configPath),
  );
  if (errors.length) {
    throw new Error(
      errors
        .map((d) => ts.flattenDiagnosticMessageText(d.messageText, ' '))
        .join('\n'),
    );
  }
  const options: ts.CompilerOptions = {
    ...libOptions,
    declaration: true,
    emitDeclarationOnly: true,
    declarationMap: false,
    inlineSources: false,
    configFilePath: undefined,
  };

  const fixtures = new Map(
    Object.entries(sources).map(([name, source]) => [
      join(__dirname, name),
      source,
    ]),
  );

  const host = ts.createCompilerHost(options, true);
  const readFile = host.readFile.bind(host);
  const fileExists = host.fileExists.bind(host);
  const emitted = new Map<string, string>();
  host.readFile = (name) => fixtures.get(name) ?? readFile(name);
  host.fileExists = (name) => fixtures.has(name) || fileExists(name);
  host.writeFile = (name, text) => void emitted.set(name, text);

  const program = ts.createProgram([...fixtures.keys()], options, host);
  const { diagnostics: emitDiagnostics } = program.emit();

  return {
    diagnostics: [...ts.getPreEmitDiagnostics(program), ...emitDiagnostics].map(
      (d) =>
        `TS${d.code}: ${ts.flattenDiagnosticMessageText(d.messageText, ' ')}`,
    ),
    declarations: new Map(
      [...emitted].map(([name, text]) => [
        relative(__dirname, name).split(sep).join('/'),
        text,
      ]),
    ),
  };
}

function setupComponent(setupFn?: RxEffectsSetupFn) {
  @Component({})
  class TestComponent {
    readonly effects = rxEffects(setupFn);
  }

  TestBed.configureTestingModule({
    imports: [TestComponent],
  });

  const fixture = TestBed.createComponent(TestComponent);

  return {
    fixture,
    component: fixture.componentInstance,
  };
}

function setUpWithoutInjectionContext() {
  return {
    rxEffects(...args: Parameters<typeof rxEffects>) {
      const effects = rxEffects(...args);
      return effects;
    },
  };
}
