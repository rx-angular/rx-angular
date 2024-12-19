import { TemplateRef, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';

export interface _RxVirtualViewTemplate {
  viewContainerRef: ViewContainerRef;
  templateRef: TemplateRef<unknown>;
}

export interface _RxVirtualViewPlaceholder {
  templateRef: TemplateRef<unknown>;
}

export abstract class _RxVirtualViewObserver {
  abstract register(virtualView: HTMLElement): Observable<boolean>;
}

export abstract class _RxVirtualView {
  abstract registerTemplate(template: _RxVirtualViewTemplate): void;
  abstract registerPlaceholder(placeholder: _RxVirtualViewPlaceholder): void;
}
