import { ChangeDetectorRef, Directive, EmbeddedViewRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { Observable, ObservableInput, ReplaySubject, Subscription, Unsubscribable } from 'rxjs';
import { distinctUntilChanged, switchAll, switchMapTo, tap } from 'rxjs/operators';
import { Hooks } from '../../../../shared/debug-helper/hooks';
import { RxState } from '../../../../../../../../libs/state/src/lib';
import { constantPluck, RxIterableDiffer, rxIterableDifferFactory } from './rx-differ';

export interface RxForDifferViewContext<T extends object, K = keyof T> {
  $implicit?: T;
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[rxForDiffer]',
  providers: [RxState]
})
export class RxForDifferDirective<U extends object> extends Hooks {
  private subscription: Unsubscribable = new Subscription();
  private rxDiffer: RxIterableDiffer<U>;

  observables$ = new ReplaySubject(1);
  embeddedViews: Map<U, { view: EmbeddedViewRef<any>, item: any }> = new Map();

  array$: Observable<U[]> = this.observables$
    .pipe(
      distinctUntilChanged(),
      switchAll()
    );

  @Input()
  set rxForDiffer(potentialObservable: ObservableInput<U> | null | undefined) {
    this.observables$.next(potentialObservable);
  }

  @Input()
  set rxForDifferTrackBy(trackByFnOrKey: string | ((i) => any)) {
    console.log('rxForDifferTrackBy', trackByFnOrKey);
    const trackBy = typeof trackByFnOrKey !== 'function' ? constantPluck(trackByFnOrKey) : trackByFnOrKey;
    this.state.set({ trackBy });
  }

  @Input()
  rxForDifferDistinctBy(distinctByFnOrKey: string | ((i) => any)) {
    console.log('rxForDifferDistinctBy', distinctByFnOrKey);
    const distinctBy = typeof distinctByFnOrKey !== 'function' ? constantPluck(distinctByFnOrKey) : distinctByFnOrKey;
    this.state.set({ distinctBy });
  }

  constructor(
    private state: RxState<{ trackBy: ((i) => any), distinctBy: ((i) => any) }>,
    private cdRef: ChangeDetectorRef,
    private readonly templateRef: TemplateRef<RxForDifferViewContext<any>>,
    private readonly viewContainerRef: ViewContainerRef
  ) {
    super();
    this.state.set({ distinctBy: i => i, trackBy: i => i });
    this.state.hold(this.afterViewInit$.pipe(
      tap(() => {
        this.setupDiffer();
        this.state.hold(this.rxDiffer.enter$, i => this.onEnter(i));
        this.state.hold(this.rxDiffer.update$, i => this.onUpdate(i));
        this.state.hold(this.rxDiffer.exit$, i => this.onExit(i));
      }),
      switchMapTo(this.array$),
      tap(v => this.rxDiffer.next(v))
      )
    );
    this.state.hold(this.onDestroy$, () => this.tearDownDirective());
  }

  private setupDiffer() {
    this.rxDiffer = rxIterableDifferFactory<U & object>({
      trackBy: this.state.get('trackBy'),
      distinctBy: this.state.get('distinctBy')
    });
    this.rxDiffer.connect();
  }

  private tearDownDirective() {
    this.viewContainerRef.clear();
    this.subscription.unsubscribe();
  }

  onEnter = (item: U): void => {
    console.log('onEnter', item);
    const key = this.state.get('trackBy')(item);
    console.log('key', key, this.state.get('trackBy'));
    let existingItem = this.embeddedViews.has(key) ? this.embeddedViews.get(key) : undefined;
    if (!existingItem) {
      const view = this.viewContainerRef
        .createEmbeddedView(this.templateRef, { $implicit: item });
      existingItem = { view, item };
      this.embeddedViews.set(key, existingItem);
      existingItem.view.detectChanges();
    }
  };

  onUpdate = (item: U): void => {
    const key = this.state.get('trackBy')(item);
    console.log('onUpdate', item, key);
    const existingItem = this.embeddedViews.has(key) ? this.embeddedViews.get(key) : undefined;
    if (existingItem) {
      existingItem.view.context.$implicit = item;
      existingItem.view.detectChanges();
    }
  };

  onExit = (item: U): void => {
    console.log('onExit', item);
  };

}
