import {
  AfterViewInit,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  Input,
  NgZone,
  ɵZONELESS_ENABLED as ZONELESS_ENABLED,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Directive({
  selector: '[runOutsideZone]',
  standalone: false,
})
export class RunOutsideZoneDirective implements AfterViewInit {
  private isZoneless = inject(ZONELESS_ENABLED);
  private destroyRef = inject(DestroyRef);

  events$ = new BehaviorSubject<string[]>(['click']);

  @Input('runOutsideZone')
  set events(value: string[]) {
    if (this.isZoneless) {
      return;
    }
    if (value && value.length > 0) {
      this.events$.next(value);
    } else {
      this.events$.next(['click']);
    }
  }

  reapplyEventListenersZoneUnPatched(events) {
    events.forEach((ev) => {
      this.unpatchEventListener(this.el.nativeElement, ev);
    });
  }

  constructor(
    private el: ElementRef,
    private ngZone: NgZone,
  ) {}

  ngAfterViewInit(): void {
    if (this.isZoneless) {
      return;
    }

    this.events$
      .pipe(
        tap((eventList) => this.reapplyEventListenersZoneUnPatched(eventList)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  unpatchEventListener(elem: HTMLElement, event: string): void {
    const eventListeners = (elem as any).eventListeners(event);
    // Return if no event listeners are present
    if (!eventListeners) {
      return;
    }

    eventListeners.forEach((listener) => {
      // Remove and reapply listeners with patched API
      elem.removeEventListener(event, listener);
      // Reapply listeners with un-patched API
      this.ngZone.runOutsideAngular(() => {
        elem.addEventListener(event, listener);
      });
    });
  }
}
