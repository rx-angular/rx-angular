import { Component, EnvironmentInjector, InjectionToken } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { jestMatcher } from '@test-helpers/rx-angular';
import { join } from 'node:path';
import { Observable, of, Subject, tap, timer } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import * as ts from 'typescript';
import {
  RxEffects as RxEffectsHandle,
  rxEffects,
  RxEffectsSetupFn,
} from './rx-effects';

// reproduction of https://github.com/rx-angular/rx-angular/issues/1737:
// declaration emit for this token needs a nameable type for the handle
export const GLOBAL_EFFECTS = new InjectionToken('GLOBAL_EFFECTS', {
  providedIn: 'root',
  factory: () => rxEffects(),
});

describe(rxEffects, () => {
  it('should expose the handle type', () => {
    const token = new InjectionToken<RxEffectsHandle>('RX_EFFECTS_HANDLE');
    expect(token).toBeTruthy();
  });

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

  // jest specs are transpiled without type-checking and are never
  // declaration-emitted, so the compiler is asked directly here
  describe('declaration emit', () => {
    it('should name the returned handle in a consumer d.ts', () => {
      const { diagnostics, declaration } = emitDeclarations(`
        import { InjectionToken } from '@angular/core';
        import { rxEffects } from './rx-effects';

        export const GLOBAL_EFFECTS = new InjectionToken('GLOBAL_EFFECTS', {
          providedIn: 'root',
          factory: () => rxEffects(),
        });
      `);

      expect(diagnostics).toEqual([]);
      expect(declaration).toContain('import("./rx-effects").RxEffects');
    });

    it('should not leak an internal alias into the unregister callback', () => {
      const { diagnostics, declaration } = emitDeclarations(`
        import { Injector } from '@angular/core';
        import { of } from 'rxjs';
        import { rxEffects } from './rx-effects';

        export function setup(injector: Injector) {
          return rxEffects({ injector }).register(of('src'));
        }
      `);

      expect(diagnostics).toEqual([]);
      expect(declaration).toContain('export declare function setup');
      expect(declaration).toContain('() => void');
    });
  });
});

/**
 * Type-checks and declaration-emits `source` as if it were a consumer module
 * sitting next to `rx-effects.ts`. Returns the compiler diagnostics (formatted
 * as `TSxxxx: message`) together with the generated `.d.ts` content.
 */
function emitDeclarations(source: string) {
  const fileName = join(__dirname, 'declaration-emit-fixture.ts');
  const options: ts.CompilerOptions = {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    strict: true,
    skipLibCheck: true,
    declaration: true,
    emitDeclarationOnly: true,
    types: [],
  };

  const host = ts.createCompilerHost(options, true);
  const readFile = host.readFile.bind(host);
  const fileExists = host.fileExists.bind(host);
  const emitted = new Map<string, string>();
  host.readFile = (name) => (name === fileName ? source : readFile(name));
  host.fileExists = (name) => name === fileName || fileExists(name);
  host.writeFile = (name, text) => void emitted.set(name, text);

  const program = ts.createProgram([fileName], options, host);
  const { diagnostics: emitDiagnostics } = program.emit();

  return {
    diagnostics: [...ts.getPreEmitDiagnostics(program), ...emitDiagnostics].map(
      (d) =>
        `TS${d.code}: ${ts.flattenDiagnosticMessageText(d.messageText, ' ')}`,
    ),
    declaration: emitted.get(fileName.replace(/\.ts$/, '.d.ts')),
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
