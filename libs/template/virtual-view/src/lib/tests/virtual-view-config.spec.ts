import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { fc, test } from '@fast-check/jest';
import {
  provideVirtualViewConfig,
  VIRTUAL_VIEW_CONFIG_DEFAULT,
  VIRTUAL_VIEW_CONFIG_TOKEN,
} from '../virtual-view.config';
import { RxVirtualView } from '../virtual-view.directive';
import { SimpleHost } from './test-utils/host-components';
import {
  emitIntersection,
  installObserverMocks,
  IntersectionObserverMock,
  ResizeObserverMock,
} from './test-utils/observer-mocks';
import { configureBrowser } from './test-utils/testbed';

/**
 * Configuration coverage for `RxVirtualView` (R8).
 *
 * This spec holds the example/edge-case portion of R8:
 * - documented defaults from `VIRTUAL_VIEW_CONFIG_DEFAULT` (8.1), and
 * - the containment host-style branches (8.3, 8.4, 8.5).
 *
 * The precedence (Property 7, 8.2) and deep-merge (Property 8, 8.6/8.7)
 * property tests live in sibling sub-tasks (9.2 / 9.3), not here.
 */
describe('RxVirtualView configuration', () => {
  /* ---------------------------------------------------------------------- */
  /*  Documented defaults (8.1)                                             */
  /* ---------------------------------------------------------------------- */

  describe('documented defaults (Req 8.1)', () => {
    it('resolves VIRTUAL_VIEW_CONFIG_TOKEN to the documented default values when no config is provided', () => {
      // A bare TestBed with no `provideVirtualViewConfig`: the token is
      // `providedIn: 'root'` with a factory returning VIRTUAL_VIEW_CONFIG_DEFAULT.
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({});

      const config = TestBed.inject(VIRTUAL_VIEW_CONFIG_TOKEN);

      // Whole-object equality plus per-field assertions so a change to any
      // documented default is caught explicitly.
      expect(config).toEqual(VIRTUAL_VIEW_CONFIG_DEFAULT);

      expect(config.enabled).toBe(VIRTUAL_VIEW_CONFIG_DEFAULT.enabled);
      expect(config.keepLastKnownSize).toBe(
        VIRTUAL_VIEW_CONFIG_DEFAULT.keepLastKnownSize,
      );
      expect(config.useContentVisibility).toBe(
        VIRTUAL_VIEW_CONFIG_DEFAULT.useContentVisibility,
      );
      expect(config.useContainment).toBe(
        VIRTUAL_VIEW_CONFIG_DEFAULT.useContainment,
      );
      expect(config.placeholderStrategy).toBe(
        VIRTUAL_VIEW_CONFIG_DEFAULT.placeholderStrategy,
      );
      expect(config.contentStrategy).toBe(
        VIRTUAL_VIEW_CONFIG_DEFAULT.contentStrategy,
      );
      expect(config.cacheEnabled).toBe(
        VIRTUAL_VIEW_CONFIG_DEFAULT.cacheEnabled,
      );
      expect(config.startWithPlaceholderAsap).toBe(
        VIRTUAL_VIEW_CONFIG_DEFAULT.startWithPlaceholderAsap,
      );
      expect(config.scrollMargin).toBe(
        VIRTUAL_VIEW_CONFIG_DEFAULT.scrollMargin,
      );
      expect(config.enableAfterHydration).toBe(
        VIRTUAL_VIEW_CONFIG_DEFAULT.enableAfterHydration,
      );
      expect(config.cache.contentCacheSize).toBe(
        VIRTUAL_VIEW_CONFIG_DEFAULT.cache.contentCacheSize,
      );
      expect(config.cache.placeholderCacheSize).toBe(
        VIRTUAL_VIEW_CONFIG_DEFAULT.cache.placeholderCacheSize,
      );
    });
  });

  /* ---------------------------------------------------------------------- */
  /*  Containment host-style branches (8.3, 8.4, 8.5)                       */
  /* ---------------------------------------------------------------------- */

  describe('containment host style (Req 8.3, 8.4, 8.5)', () => {
    let restore: () => void;

    beforeEach(() => {
      restore = installObserverMocks();
    });

    afterEach(() => {
      restore();
    });

    // Sync config keeps placeholder/content rendering deterministic within a
    // tick. The containment/content-visibility booleans are driven through the
    // SimpleHost inputs (which are always bound and would otherwise coerce the
    // unset `undefined` value to `false`), not through config.
    const syncConfig = {
      placeholderStrategy: 'sync',
      contentStrategy: 'sync',
    } as const;

    it('applies "size layout paint" when useContainment + useContentVisibility are true and the placeholder is visible (Req 8.3)', () => {
      configureBrowser({ host: SimpleHost, config: { ...syncConfig } });
      const fixture = TestBed.createComponent(SimpleHost);
      fixture.componentRef.setInput('useContentVisibility', true);
      fixture.componentRef.setInput('useContainment', true);
      fixture.detectChanges();

      const view = fixture.debugElement.query(By.css('.widget')).nativeElement;

      // Not intersecting -> placeholder becomes visible.
      emitIntersection(view, false);
      fixture.detectChanges();

      expect(view.style.contain).toBe('size layout paint');
    });

    it('applies exactly "content" (no size layout paint) when useContainment is true and content is visible (Req 8.4)', () => {
      configureBrowser({ host: SimpleHost, config: { ...syncConfig } });
      const fixture = TestBed.createComponent(SimpleHost);
      fixture.componentRef.setInput('useContentVisibility', true);
      fixture.componentRef.setInput('useContainment', true);
      fixture.detectChanges();

      const view = fixture.debugElement.query(By.css('.widget')).nativeElement;

      // Intersecting -> content becomes visible.
      emitIntersection(view, true);
      fixture.detectChanges();

      expect(view.style.contain).toBe('content');
      expect(view.style.contain).not.toContain('size');
      expect(view.style.contain).not.toContain('layout');
      expect(view.style.contain).not.toContain('paint');
    });

    it('applies no "contain" style when useContainment is false (Req 8.5)', () => {
      configureBrowser({ host: SimpleHost, config: { ...syncConfig } });
      const fixture = TestBed.createComponent(SimpleHost);
      fixture.componentRef.setInput('useContentVisibility', true);
      fixture.componentRef.setInput('useContainment', false);
      fixture.detectChanges();

      const view = fixture.debugElement.query(By.css('.widget')).nativeElement;

      // Placeholder visible.
      emitIntersection(view, false);
      fixture.detectChanges();
      expect(view.style.contain).toBe('');

      // Content visible.
      emitIntersection(view, true);
      fixture.detectChanges();
      expect(view.style.contain).toBe('');
    });
  });

  /* ---------------------------------------------------------------------- */
  /*  Property 7 — directive input overrides config value (Req 8.2)         */
  /* ---------------------------------------------------------------------- */

  describe('directive input overrides config value (Property 7, Req 8.2)', () => {
    let restore: () => void;

    beforeEach(() => {
      restore = installObserverMocks();
    });

    afterEach(() => {
      restore();
    });

    // The boolean options `SimpleHost` binds and that `RxVirtualView` exposes as
    // `input(..., { transform: booleanAttribute })` signals defaulting to the
    // resolved config value.
    type BooleanOption =
      | 'cacheEnabled'
      | 'useContentVisibility'
      | 'useContainment'
      | 'keepLastKnownSize'
      | 'startWithPlaceholderAsap';

    // Feature: virtual-view-test-coverage, Property 7: Directive input overrides config value
    test.prop(
      [
        fc.record({
          option: fc.constantFrom<BooleanOption>(
            'cacheEnabled',
            'useContentVisibility',
            'useContainment',
            'keepLastKnownSize',
            'startWithPlaceholderAsap',
          ),
          configVal: fc.boolean(),
          inputVal: fc.boolean(),
        }),
      ],
      { numRuns: 100 },
    )(
      'reports the bound directive-input value regardless of the config value',
      ({ option, configVal, inputVal }) => {
        // Reset per-iteration observer state so registries do not leak across
        // the 100 generated runs sharing a single `beforeEach`/`afterEach`.
        IntersectionObserverMock.instances = [];
        ResizeObserverMock.instances = [];

        // Config sets `option` to `configVal`; the host input will bind
        // `inputVal`, which must win.
        configureBrowser({
          host: SimpleHost,
          config: {
            [option]: configVal,
            placeholderStrategy: 'sync',
            contentStrategy: 'sync',
          },
        });

        const fixture = TestBed.createComponent(SimpleHost);

        try {
          // Binding the host input propagates to the directive's `input()`.
          fixture.componentRef.setInput(option, inputVal);
          fixture.detectChanges();

          const directive = fixture.debugElement
            .query(By.css('.widget'))
            .injector.get(RxVirtualView);

          // The directive-input value wins over the configured value.
          expect(directive[option]()).toBe(inputVal);
        } finally {
          fixture.destroy();
        }
      },
    );
  });

  /* ---------------------------------------------------------------------- */
  /*  Property 8 — provideVirtualViewConfig deep-merges over defaults        */
  /*  (Req 8.6, 8.7)                                                         */
  /* ---------------------------------------------------------------------- */

  describe('provideVirtualViewConfig deep-merge (Property 8, Req 8.6, 8.7)', () => {
    // A partial config where every top-level field (and the nested `cache`) is
    // optional. `requiredKeys: []` makes each key independently present/absent,
    // so a generated partial can supply any subset of overrides — the exact
    // shape `provideVirtualViewConfig` must deep-merge over the defaults. The
    // `enabled` field is intentionally omitted from generation (see task note):
    // its merge behavior is identical to the other primitives and generating
    // signals adds no coverage for the precedence/merge rule under test.
    const partialConfigArb = fc.record(
      {
        keepLastKnownSize: fc.boolean(),
        useContentVisibility: fc.boolean(),
        useContainment: fc.boolean(),
        cacheEnabled: fc.boolean(),
        startWithPlaceholderAsap: fc.boolean(),
        enableAfterHydration: fc.boolean(),
        scrollMargin: fc.oneof(
          fc.string(),
          fc.nat({ max: 1000 }).map((n) => `${n}px`),
        ),
        placeholderStrategy: fc.constantFrom(
          'low',
          'normal',
          'immediate',
          'userBlocking',
          'idle',
        ),
        contentStrategy: fc.constantFrom(
          'low',
          'normal',
          'immediate',
          'userBlocking',
          'idle',
        ),
        cache: fc.record(
          {
            contentCacheSize: fc.nat(),
            placeholderCacheSize: fc.nat(),
          },
          { requiredKeys: [] },
        ),
      },
      { requiredKeys: [] },
    );

    // Feature: virtual-view-test-coverage, Property 8: provideVirtualViewConfig deep-merges over defaults
    test.prop([partialConfigArb, fc.boolean()], { numRuns: 100 })(
      'resolves the token to the defaults deep-merged with the partial, identically for object and factory forms',
      (partial, useFactory) => {
        TestBed.resetTestingModule();
        TestBed.configureTestingModule({
          providers: [
            provideVirtualViewConfig(useFactory ? () => partial : partial),
          ],
        });

        const resolved = TestBed.inject(VIRTUAL_VIEW_CONFIG_TOKEN);

        const expected = {
          ...VIRTUAL_VIEW_CONFIG_DEFAULT,
          ...partial,
          cache: {
            ...VIRTUAL_VIEW_CONFIG_DEFAULT.cache,
            ...(partial.cache ?? {}),
          },
        };

        expect(resolved).toEqual(expected);
      },
    );
  });
});
