import {
  Directive,
  inject,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { _RxVirtualViewTemplate } from './model';
import { RxVirtualView } from './virtual-view.directive';

@Directive({ selector: '[rxVirtualViewTemplate]', standalone: true })
export class RxVirtualViewTemplate implements _RxVirtualViewTemplate {
  #virtualView = inject(RxVirtualView);
  viewContainerRef = inject(ViewContainerRef);
  constructor(public templateRef: TemplateRef<unknown>) {
    this.#virtualView.registerTemplate(this);
  }
}
