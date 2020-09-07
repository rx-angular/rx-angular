import {
  ChangeDetectorRef,
  Directive,
  EmbeddedViewRef,
  Input,
  NgIterable,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

import { ObservableInput, ReplaySubject, Subscription, Unsubscribable } from 'rxjs';
import { distinctUntilChanged, switchAll } from 'rxjs/operators';

export interface PocForViewContext<T, U extends NgIterable<T> = NgIterable<T>> {
  $implicit: T;
  pocLet: U;
  index: number;
  count: number;
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[pocForBasic]'
})
export class ForPocBasicDirective<T, U extends NgIterable<T> = NgIterable<T>> implements OnInit, OnDestroy {
  observables$ = new ReplaySubject<ObservableInput<U & NgIterable<T>>>(1);
  viewContext = { $implicit: undefined };
  embeddedView;
  values: U & NgIterable<T>;
  values$ = this.observables$
    .pipe(
      distinctUntilChanged(),
      switchAll(),
      distinctUntilChanged()
    );

  @Input()
  set pocForBasic(potentialObservable: ObservableInput<U & NgIterable<T>> | null | undefined) {
    this.observables$.next(potentialObservable);
  }
  private subscription: Unsubscribable = new Subscription();

  constructor(
    private cdRef: ChangeDetectorRef,
    private readonly nextTemplateRef: TemplateRef<PocForViewContext<T, U>>,
    private readonly viewContainerRef: ViewContainerRef
  ) {

  }

  ngOnInit() {
    this.subscription = this.values$
      .subscribe(
        values => {
          this.renderValues(values);
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private renderValues(values: U & NgIterable<T> | null | undefined) {
    // this is the most easy way that I could think of implementing a very basic rxFor directive just rendering
    // an array of templates
    if (values) {
      let i = 0;
      for (const value of values) {
        let view = this.viewContainerRef.get(i);
        if (!!view) {
          this.viewContainerRef.remove(i);
        }
        view = this.viewContainerRef.createEmbeddedView(
          this.nextTemplateRef,
          {
            $implicit: null,
            pocLet: values,
            count: -1,
            index: -1
          },
          i
        );
        (view as EmbeddedViewRef<PocForViewContext<T, U>>).context.$implicit = value;
        i++;
      }
      for (let i = 0, ilen = this.viewContainerRef.length; i < ilen; i++) {
        const viewRef = <EmbeddedViewRef<PocForViewContext<T, U>>>this.viewContainerRef.get(i);
        viewRef.context.index = i;
        viewRef.context.count = ilen;
        viewRef.context.pocLet = this.values;
        viewRef.detectChanges();
      }
    } else {
      this.viewContainerRef.clear();
      this.cdRef.detectChanges();
    }
  }

}
