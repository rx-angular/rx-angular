import {
  ChangeDetectorRef,
  Directive,
  EmbeddedViewRef,
  Input,
  IterableChangeRecord,
  IterableChanges,
  IterableDiffer,
  IterableDiffers,
  NgIterable,
  OnDestroy,
  OnInit,
  TemplateRef, TrackByFunction,
  ViewContainerRef
} from '@angular/core';

import { ObservableInput, ReplaySubject, Subscription, Unsubscribable } from 'rxjs';
import { distinctUntilChanged, filter, groupBy, map, mergeAll, mergeMap, switchAll, tap } from 'rxjs/operators';

export class PocForViewContext<T, U extends NgIterable<T> = NgIterable<T>> {

  $implicit: T;
  public pocLet: U;

}
interface RecordViewTuple<T, U extends NgIterable<T>> {
  record: any;
  view: EmbeddedViewRef<PocForViewContext<T, U>>;
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[pocForIterable]'
})
export class PocForIterable<T, U extends NgIterable<T> = NgIterable<T>> implements OnInit, OnDestroy {
  private differ: IterableDiffer<T> | null = null;
  private subscription: Unsubscribable = new Subscription();

  observables$ = new ReplaySubject<ObservableInput<U & NgIterable<T>>>(1);
  values: U & NgIterable<T>;
  values$ = this.observables$
    .pipe(
      distinctUntilChanged(),
      switchAll()
    );

  private _trackByFn: TrackByFunction<T>;
  @Input()
  set pocForIterableTrackBy(fn: TrackByFunction<T>) {
    this._trackByFn = fn;
  }

  @Input()
  set pocForIterable(potentialObservable: ObservableInput<U & NgIterable<T>> | null | undefined) {
    this.observables$.next(potentialObservable);
  }

  @Input()
  pocForIterableDistinctBy = (a, b) => a === b;

  constructor(
    private cdRef: ChangeDetectorRef,
    private readonly nextTemplateRef: TemplateRef<PocForViewContext<T, U>>,
    private readonly viewContainerRef: ViewContainerRef,
    private iterableDiffers: IterableDiffers
  ) {

  }

  ngOnInit() {
    this.subscription = this.values$.pipe(
        // the actual values arrive here
        tap(value => {
          // set helper variable for applyChanges method
          this.values = value;
          // set new differ if there is none yet
          if (!this.differ && value) {
            this.differ = this.iterableDiffers.find(value).create(this._trackByFn);
          }
        }),
        // if there is no differ, we don't need to apply changes
        filter(() => !!this.differ),
        // apply differ -> return changes
        map(value => this.differ.diff(value)),
        // filter out no changes
        filter(changes => !!changes)
      )
      .subscribe(
        changes => {
          this.applyChanges(changes);
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private applyChanges(changes: IterableChanges<T>) {
    // behavior like *ngFor
    const insertTuples: RecordViewTuple<T, U>[] = [];
    // TODO: dig into `IterableDiffer`
    changes.forEachOperation(
      (
        changeRecord: IterableChangeRecord<T>,
        previousIndex: number | null,
        currentIndex: number | null
      ) => {
        if (changeRecord.previousIndex == null) {
          // this is basically the first run
          // create the embedded view for each value with default values
          const view = this.viewContainerRef.createEmbeddedView(
            this.nextTemplateRef,
            {
              $implicit: this.values as any,
              pocLet: this.values,
            },
            currentIndex === null ? undefined : currentIndex
          );
          insertTuples.push({
            view,
            record: changeRecord
          });

        } else if (currentIndex == null) {

          this.viewContainerRef.remove(
            previousIndex === null ? undefined : previousIndex);

        } else if (previousIndex !== null) {

          const view = <EmbeddedViewRef<PocForViewContext<T, U>>>this.viewContainerRef.get(previousIndex);
          this.viewContainerRef.move(view, currentIndex);
          insertTuples.push({
            view,
            record: changeRecord
          });
        }
      });

    for (let i = 0; i < insertTuples.length; i++) {
      this._perViewChange(insertTuples[i].view, insertTuples[i].record);
    }

    for (let i = 0, ilen = this.viewContainerRef.length; i < ilen; i++) {
      const viewRef = <EmbeddedViewRef<PocForViewContext<T, U>>>this.viewContainerRef.get(i);
      viewRef.context.pocLet = this.values;
    }

    changes.forEachIdentityChange((record: IterableChangeRecord<T>) => {
      const viewRef =
        <EmbeddedViewRef<PocForViewContext<T, U>>>this.viewContainerRef.get(record.currentIndex);
      viewRef.context.$implicit = record.item;
      viewRef.detectChanges();
    });
  }

  private _perViewChange(
    view: EmbeddedViewRef<PocForViewContext<T, U>>, record: IterableChangeRecord<T>) {
    view.context.$implicit = record.item;
    view.detectChanges();
  }

}
