import { Component, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRxRenderStrategies } from '@rx-angular/cdk/render-strategies';
import { tap } from 'rxjs';
import { provideVirtualViewConfig } from '../virtual-view.config';
import { RxVirtualView } from '../virtual-view.directive';
import { RxVirtualViewContent } from '../virtual-view-content.directive';
import { RxVirtualViewObserver } from '../virtual-view-observer.directive';
import { RxVirtualViewPlaceholder } from '../virtual-view-placeholder.directive';

@Component({
  template: `
    <div class="container" rxVirtualViewObserver [root]="null">
      <div rxVirtualView class="widget">
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
});
