import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { RxVirtualScrollElement } from './model';
import { unpatchedScroll } from './util';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'rx-virtual-scroll-viewport[scrollWindow]',
  providers: [
    {
      provide: RxVirtualScrollElement,
      useExisting: RxVirtualScrollWindowDirective,
    },
  ],
  standalone: true,
})
export class RxVirtualScrollWindowDirective implements RxVirtualScrollElement {
  private readonly document = inject(DOCUMENT);
  private readonly elementRef = new ElementRef(this.document.documentElement);

  readonly elementScrolled$ = unpatchedScroll(this.document);

  getElementRef(): ElementRef<HTMLElement> {
    return this.elementRef;
  }
  measureOffset(): number {
    return 0;
  }
}
