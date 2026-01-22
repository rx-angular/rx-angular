import { Component, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRxRenderStrategies } from '@rx-angular/cdk/render-strategies';
import { tap } from 'rxjs';
import { provideVirtualViewConfig } from '../virtual-view.config';
import { RxVirtualView } from '../virtual-view.directive';
import { VirtualViewCache } from '../virtual-view-cache';
import { RxVirtualViewContent } from '../virtual-view-content.directive';
import { RxVirtualViewObserver } from '../virtual-view-observer.directive';
import { RxVirtualViewPlaceholder } from '../virtual-view-placeholder.directive';

@Component({
  template: `
    <div class="container" rxVirtualViewObserver [root]="null">
      <div
        rxVirtualView
        class="widget"
        [useContentVisibility]="useContentVisibility()"
        [cacheEnabled]="cacheEnabled()"
      >
        <div *rxVirtualViewContent class="template">ze-template</div>
        @if (withPlaceholder()) {
          <div *rxVirtualViewPlaceholder class="placeholder">
            ze-placeholder
          </div>
        }
      </div>
    </div>
  `,
  standalone: true,
  imports: [
    RxVirtualViewObserver,
    RxVirtualView,
    RxVirtualViewPlaceholder,
    RxVirtualViewContent,
  ],
})
class VirtualViewTestComponent {
  withPlaceholder = input(true);
  useContentVisibility = input(true);
  cacheEnabled = input(true);
}

class IntersectionObserverMock {
  static cb: (entries: IntersectionObserverEntry[]) => void;

  constructor(
    public cb: (entries: IntersectionObserverEntry[]) => void,
    init?: IntersectionObserverInit,
  ) {
    IntersectionObserverMock.cb = cb;
  }

  observe(element: Element) {}

  unobserve(element: Element) {}

  disconnect() {}
}

class ResizeObserverMock {
  static cb: (entries: ResizeObserverEntry[]) => void;

  constructor(public cb: (entries: ResizeObserverEntry[]) => void) {
    ResizeObserverMock.cb = cb;
  }

  observe(element: Element, options?: ResizeObserverOptions) {}

  unobserve(element: Element) {}

  disconnect() {}
}

describe('RxVirtualView', () => {
  let origIntersectionObserver;
  let origResizeObserver;
  let fixture: ComponentFixture<VirtualViewTestComponent>;
  beforeEach(() => {
    origIntersectionObserver = window.IntersectionObserver;
    origResizeObserver = window.ResizeObserver;
    window.IntersectionObserver = IntersectionObserverMock as any;
    window.ResizeObserver = ResizeObserverMock as any;

    TestBed.configureTestingModule({
      imports: [VirtualViewTestComponent],
      providers: [
        provideRxRenderStrategies({
          primaryStrategy: 'sync',
          customStrategies: {
            sync: {
              name: 'sync',
              work: (cdRef) => {
                cdRef.detectChanges();
              },
              behavior:
                ({ work }) =>
                (o$) =>
                  o$.pipe(tap(() => work())),
            },
          },
        }),
        provideVirtualViewConfig({
          placeholderStrategy: 'sync',
          contentStrategy: 'sync',
          useContentVisibility: true,
          keepLastKnownSize: true,
        }),
      ],
    });
    fixture = TestBed.createComponent(VirtualViewTestComponent);
  });

  afterEach(() => {
    window.IntersectionObserver = origIntersectionObserver;
    window.ResizeObserver = origResizeObserver;
  });

  it('should display template when visible', () => {
    fixture.detectChanges();
    const view = fixture.debugElement.query(By.css('.widget')).nativeElement;
    IntersectionObserverMock.cb([
      { isIntersecting: true, target: view } as any,
    ]);
    expect(view.textContent.trim()).toEqual('ze-template');
  });
  it('should display nothing when not visible and no placeholder', () => {
    fixture.componentRef.setInput('withPlaceholder', false);
    fixture.detectChanges();
    const view = fixture.debugElement.query(By.css('.widget')).nativeElement;
    IntersectionObserverMock.cb([
      { isIntersecting: false, target: view } as any,
    ]);
    expect(view.textContent.trim()).toEqual('');
  });
  it('should display placeholder when not visible', () => {
    fixture.detectChanges();
    const view = fixture.debugElement.query(By.css('.widget')).nativeElement;
    IntersectionObserverMock.cb([
      { isIntersecting: false, target: view } as any,
    ]);
    expect(view.textContent.trim()).toEqual('ze-placeholder');
  });

  it('should emit visibilityChanged when visibility changes', () => {
    fixture.detectChanges();
    const view = fixture.debugElement.query(By.css('.widget'));
    const directive = view.injector.get(RxVirtualView);
    const spy = jest.spyOn(directive.visibilityChanged, 'emit');

    IntersectionObserverMock.cb([
      { isIntersecting: true, target: view.nativeElement } as any,
    ]);
    expect(spy).toHaveBeenCalledWith({ content: true, placeholder: false });

    IntersectionObserverMock.cb([
      { isIntersecting: false, target: view.nativeElement } as any,
    ]);
    expect(spy).toHaveBeenCalledWith({ content: false, placeholder: true });
  });

  it('should apply content-visibility when useContentVisibility is true', () => {
    fixture.detectChanges();
    const view = fixture.debugElement.query(By.css('.widget'));
    const directive = view.injector.get(RxVirtualView);

    expect(directive.useContentVisibility()).toBe(true);
  });

  it('should NOT apply content-visibility when useContentVisibility is false', () => {
    fixture.componentRef.setInput('useContentVisibility', false);
    fixture.detectChanges();
    const view = fixture.debugElement.query(By.css('.widget')).nativeElement;

    expect(view.getAttribute('style')).not.toContain('content-visibility');
  });

  it('should apply containment styles when useContainment is true', () => {
    fixture.detectChanges();
    const view = fixture.debugElement.query(By.css('.widget')).nativeElement;

    // Default useContainment is true, useContentVisibility is true
    // Initially placeholder is NOT visible (unless startWithPlaceholderAsap is true)
    // Actually, in ngOnInit, if not visible it calls showPlaceholder$ which calls renderPlaceholder
    // which sets #placeholderVisible to true.

    IntersectionObserverMock.cb([
      { isIntersecting: false, target: view } as any,
    ]);
    fixture.detectChanges();

    expect(view.style.contain).toBe('size layout paint');

    IntersectionObserverMock.cb([
      { isIntersecting: true, target: view } as any,
    ]);
    fixture.detectChanges();
    expect(view.style.contain).toBe('content');
  });

  it('should apply min-size when keepLastKnownSize is true and placeholder is visible', () => {
    fixture.detectChanges();
    const view = fixture.debugElement.query(By.css('.widget'));
    const directive = view.injector.get(RxVirtualView);

    // Mock size
    directive.size.set({ width: 100, height: 200 });
    fixture.detectChanges();

    IntersectionObserverMock.cb([
      { isIntersecting: false, target: view.nativeElement } as any,
    ]);
    fixture.detectChanges();

    expect(view.nativeElement.style.minWidth).toBe('100px');
    expect(view.nativeElement.style.minHeight).toBe('200px');

    IntersectionObserverMock.cb([
      { isIntersecting: true, target: view.nativeElement } as any,
    ]);
    fixture.detectChanges();

    expect(view.nativeElement.style.minWidth).toBe('');
    expect(view.nativeElement.style.minHeight).toBe('');
  });

  it('should start with placeholder immediately when startWithPlaceholderAsap is true', () => {
    // We need a new fixture to test ngOnInit behavior
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [VirtualViewTestComponent],
      providers: [
        provideRxRenderStrategies({
          primaryStrategy: 'sync',
          customStrategies: {
            sync: {
              name: 'sync',
              work: (cdRef) => cdRef.detectChanges(),
              behavior:
                ({ work }) =>
                (o$) =>
                  o$.pipe(tap(() => work())),
            },
          },
        }),
        provideVirtualViewConfig({
          placeholderStrategy: 'sync',
          contentStrategy: 'sync',
          startWithPlaceholderAsap: true,
        }),
      ],
    });
    const fixture2 = TestBed.createComponent(VirtualViewTestComponent);
    fixture2.detectChanges();

    const view = fixture2.debugElement.query(By.css('.widget')).nativeElement;
    // Should show placeholder immediately even before observer emits
    expect(view.textContent.trim()).toEqual('ze-placeholder');
  });
  it('should cache views when cacheEnabled is true (default)', () => {
    fixture.detectChanges();
    const view = fixture.debugElement.query(By.css('.widget'));
    const cache = view.injector.get(VirtualViewCache);
    const storeContentSpy = jest.spyOn(cache, 'storeContent');
    const storePlaceholderSpy = jest.spyOn(cache, 'storePlaceholder');

    // Content is shown
    IntersectionObserverMock.cb([
      { isIntersecting: true, target: view.nativeElement } as any,
    ]);
    fixture.detectChanges();

    // Switch to placeholder -> stores content
    IntersectionObserverMock.cb([
      { isIntersecting: false, target: view.nativeElement } as any,
    ]);
    fixture.detectChanges();
    expect(storeContentSpy).toHaveBeenCalled();

    // Switch back to content -> stores placeholder
    IntersectionObserverMock.cb([
      { isIntersecting: true, target: view.nativeElement } as any,
    ]);
    fixture.detectChanges();
    expect(storePlaceholderSpy).toHaveBeenCalled();
  });

  it('should NOT cache views when cacheEnabled is false', () => {
    fixture.componentRef.setInput('cacheEnabled', false);
    fixture.detectChanges();
    const view = fixture.debugElement.query(By.css('.widget'));
    const cache = view.injector.get(VirtualViewCache);
    const storeContentSpy = jest.spyOn(cache, 'storeContent');
    const storePlaceholderSpy = jest.spyOn(cache, 'storePlaceholder');

    // Content is shown
    IntersectionObserverMock.cb([
      { isIntersecting: true, target: view.nativeElement } as any,
    ]);
    fixture.detectChanges();

    // Switch to placeholder -> should NOT store content
    IntersectionObserverMock.cb([
      { isIntersecting: false, target: view.nativeElement } as any,
    ]);
    fixture.detectChanges();
    expect(storeContentSpy).not.toHaveBeenCalled();

    // Switch back to content -> should NOT store placeholder
    IntersectionObserverMock.cb([
      { isIntersecting: true, target: view.nativeElement } as any,
    ]);
    fixture.detectChanges();
    expect(storePlaceholderSpy).not.toHaveBeenCalled();
  });
});
