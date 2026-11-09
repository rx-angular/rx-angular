import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SimpleHost } from './test-utils/host-components';
import {
  emitIntersection,
  installObserverMocks,
} from './test-utils/observer-mocks';
import { configureBrowser } from './test-utils/testbed';

/**
 * Coverage for `#renderContent()` claiming the view container.
 *
 * `#registerContentSync()` renders the active content whenever the directive is
 * *disabled* — `shouldShow` is unconditionally `true` in that state. If the
 * container already holds a view at that moment the content is appended next to
 * it, both views stay mounted in the same container, and the host measures the
 * sum of the two.
 *
 * The reachable route into that state is `startWithPlaceholderAsap`: the
 * placeholder is inserted in `ngAfterContentInit` *before* `#renderedContent` is
 * ever assigned, so the identity guard in the sync effect does not short-circuit
 * and a later `enabled` false transition renders content on top of it.
 */
describe('RxVirtualView — content container ownership', () => {
  let restore: () => void;

  beforeEach(() => {
    restore = installObserverMocks();
  });

  afterEach(() => {
    restore();
  });

  /**
   * Boots `SimpleHost` with an eagerly-rendered placeholder and an `enabled`
   * signal the spec controls.
   */
  function bootWithEagerPlaceholder(
    enabled: ReturnType<typeof signal<boolean>>,
  ) {
    configureBrowser({
      host: SimpleHost,
      config: {
        enabled,
        placeholderStrategy: 'sync',
        contentStrategy: 'sync',
        startWithPlaceholderAsap: true,
      },
    });

    const fixture = TestBed.createComponent(SimpleHost);
    fixture.componentRef.setInput('startWithPlaceholderAsap', true);
    fixture.detectChanges();
    return fixture;
  }

  it('claims the container instead of stacking content next to an eager placeholder', () => {
    const enabled = signal(true);
    const fixture = bootWithEagerPlaceholder(enabled);

    // startWithPlaceholderAsap put the placeholder in the container and left
    // #renderedContent unassigned.
    expect(fixture.debugElement.queryAll(By.css('.placeholder')).length).toBe(
      1,
    );
    expect(fixture.debugElement.queryAll(By.css('.template')).length).toBe(0);

    // Virtual views switch off (e.g. the active product changes and the config
    // signal re-evaluates). The content-sync effect now renders content.
    enabled.set(false);
    fixture.detectChanges();

    // Exactly one view may occupy the container. Appending would leave the
    // placeholder mounted alongside the content and double the measured height.
    expect(fixture.debugElement.queryAll(By.css('.template')).length).toBe(1);
    expect(fixture.debugElement.queryAll(By.css('.placeholder')).length).toBe(
      0,
    );

    fixture.destroy();
  });

  it('keeps a single view in the container across a disable/enable cycle', () => {
    const enabled = signal(true);
    const fixture = bootWithEagerPlaceholder(enabled);

    const widgetEl = fixture.debugElement.query(By.css('.widget'))
      .nativeElement as HTMLElement;

    enabled.set(false);
    fixture.detectChanges();

    enabled.set(true);
    fixture.detectChanges();

    emitIntersection(widgetEl, false);
    fixture.detectChanges();

    const templates = fixture.debugElement.queryAll(By.css('.template')).length;
    const placeholders = fixture.debugElement.queryAll(
      By.css('.placeholder'),
    ).length;

    expect(templates + placeholders).toBe(1);

    fixture.destroy();
  });
});
