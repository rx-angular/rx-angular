import { Directive, ElementRef, inject } from '@angular/core';
import { RxVirtualScrollElement } from './model';
import { unpatchedScroll } from './util';

@Directive({
  selector: '[rxVirtualScrollElement]',
  providers: [
    {
      provide: RxVirtualScrollElement,
      useExisting: RxVirtualScrollElementDirective,
    },
  ],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'rx-virtual-scroll-element',
  },
  standalone: true,
})
export class RxVirtualScrollElementDirective implements RxVirtualScrollElement {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly elementScrolled$ = unpatchedScroll(this.elementRef.nativeElement);

  getElementRef(): ElementRef<HTMLElement> {
    return this.elementRef;
  }
  measureOffset(): number {
    return this.elementRef.nativeElement.getBoundingClientRect().top;
  }
}
