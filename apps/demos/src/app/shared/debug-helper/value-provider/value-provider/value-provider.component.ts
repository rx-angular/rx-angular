import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { PrimitivesProviderService } from '../primitives-provider.service';

@Component({
  selector: 'rxa-value-provider',
  exportAs: 'rxaValueProvider',
  template: `
    <ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValueProviderComponent extends PrimitivesProviderService {
  @Input()
  truthy = 0.5;

  @Input()
  min = 0;

  @Input()
  max = 10;

  @Input()
  set changes$(o$: Observable<any>) {
    this.outerChanges.next(o$);
  }

  constructor(protected cdRef: ChangeDetectorRef) {
    super(cdRef);
  }
}
