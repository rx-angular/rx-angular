import { Component, TemplateRef, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RxVirtualView } from '../virtual-view.directive';
import { RxVirtualViewContent } from '../virtual-view-content.directive';
import { RxVirtualViewObserver } from '../virtual-view-observer.directive';
import { RxVirtualViewPlaceholder } from '../virtual-view-placeholder.directive';
import { SimpleHost } from './test-utils/host-components';
import { installObserverMocks } from './test-utils/observer-mocks';
import { configureBrowser } from './test-utils/testbed';

/**
 * R3 — Content and placeholder directive registration coverage.
 *
 * These examples verify that `RxVirtualViewContent` and
 * `RxVirtualViewPlaceholder` register their templates with the host
 * `RxVirtualView` during construction (via `registerContent` /
 * `registerPlaceholder`), and that `RxVirtualViewContent` exposes both a
 * `viewContainerRef` and a `templateRef` to the host.
 *
 * The registration calls happen inside the directive constructors, so the
 * prototype spies must be installed BEFORE the component is created (i.e.
 * before `TestBed.createComponent` / `detectChanges` instantiate the
 * directives). Because both directives are structural (`*rxVirtualViewContent`
 * / `*rxVirtualViewPlaceholder`) their host is an `<ng-template>` comment
 * anchor, which `DebugElement.query` cannot return; the directive instances are
 * therefore captured from the spy call arguments (the directives pass `this` to
 * the register methods).
 */
describe('RxVirtualViewContent / RxVirtualViewPlaceholder (R3)', () => {
  let restoreObservers: () => void;
  let fixture: ComponentFixture<SimpleHost>;

  beforeEach(() => {
    restoreObservers = installObserverMocks();
    configureBrowser({ host: SimpleHost });
  });

  afterEach(() => {
    restoreObservers();
  });

  it('registers the content template with the host RxVirtualView (R3.1)', () => {
    const registerContentSpy = jest.spyOn(
      RxVirtualView.prototype,
      'registerContent',
    );

    fixture = TestBed.createComponent(SimpleHost);
    fixture.detectChanges();

    expect(registerContentSpy).toHaveBeenCalledTimes(1);
    const registeredContent = registerContentSpy.mock.calls[0][0];
    expect(registeredContent).toBeInstanceOf(RxVirtualViewContent);
  });

  it('registers the placeholder template with the host RxVirtualView (R3.2)', () => {
    const registerPlaceholderSpy = jest.spyOn(
      RxVirtualView.prototype,
      'registerPlaceholder',
    );

    fixture = TestBed.createComponent(SimpleHost);
    fixture.detectChanges();

    expect(registerPlaceholderSpy).toHaveBeenCalledTimes(1);
    // The placeholder directive registers itself and exposes its templateRef.
    const registeredPlaceholder = registerPlaceholderSpy.mock.calls[0][0];
    expect(registeredPlaceholder.templateRef).toBeInstanceOf(TemplateRef);
  });

  it('exposes viewContainerRef and templateRef on RxVirtualViewContent (R3.3)', () => {
    const registerContentSpy = jest.spyOn(
      RxVirtualView.prototype,
      'registerContent',
    );

    fixture = TestBed.createComponent(SimpleHost);
    fixture.detectChanges();

    const contentDirective = registerContentSpy.mock
      .calls[0][0] as RxVirtualViewContent;

    expect(contentDirective.viewContainerRef).toBeInstanceOf(ViewContainerRef);
    expect(contentDirective.templateRef).toBeInstanceOf(TemplateRef);
  });
});

/**
 * Inline host with an `rxVirtualViewObserver` and an enabled `rxVirtualView`
 * that has NO `*rxVirtualViewContent` child (only a placeholder). The observer
 * is present so the constructor `effectOnceIf` does not throw about a missing
 * observer first — the ONLY error that can surface is the missing-content error
 * thrown from `ngAfterContentInit`.
 */
@Component({
  selector: 'rx-missing-content-host',
  standalone: true,
  imports: [RxVirtualViewObserver, RxVirtualView, RxVirtualViewPlaceholder],
  template: `
    <div class="container" rxVirtualViewObserver [root]="null">
      <div rxVirtualView #vv="rxVirtualView" class="widget">
        <div *rxVirtualViewPlaceholder class="placeholder">ze-placeholder</div>
      </div>
    </div>
  `,
})
class MissingContentHost {}

/**
 * R3.4 — Missing-content expected-error coverage.
 *
 * An enabled `RxVirtualView` with no `*rxVirtualViewContent` must throw
 * `RxVirtualView expects you to provide a RxVirtualViewContent`. The check runs
 * inside `ngAfterContentInit`, which fires during the first change detection, so
 * the throw is asserted around `fixture.detectChanges()`.
 */
describe('RxVirtualView missing content (R3.4)', () => {
  let restoreObservers: () => void;

  beforeEach(() => {
    restoreObservers = installObserverMocks();
    configureBrowser({ host: MissingContentHost });
  });

  afterEach(() => {
    restoreObservers();
  });

  it('throws the content-required error during change detection when enabled and no content is provided (R3.4)', () => {
    const fixture = TestBed.createComponent(MissingContentHost);

    expect(() => fixture.detectChanges()).toThrow(
      'RxVirtualView expects you to provide a RxVirtualViewContent',
    );
  });
});
