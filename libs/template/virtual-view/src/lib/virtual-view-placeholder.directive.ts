import { Directive, inject, TemplateRef } from '@angular/core';
import { _RxVirtualView, _RxVirtualViewPlaceholder } from './model';

@Directive({ selector: '[rxVirtualViewPlaceholder]', standalone: true })
export class RxVirtualViewPlaceholder implements _RxVirtualViewPlaceholder {
  #virtualView = inject(_RxVirtualView);
  constructor(public templateRef: TemplateRef<unknown>) {
    this.#virtualView.registerPlaceholder(this);
  }
}
