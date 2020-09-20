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
  TemplateRef,
  TrackByFunction,
  ViewContainerRef
} from '@angular/core';

import { Observable, ObservableInput, ReplaySubject, Subscription, Unsubscribable } from 'rxjs';
import { distinctUntilChanged, filter, map, switchAll, tap } from 'rxjs/operators';

interface RecordViewTuple<T, U extends NgIterable<T>> {
  record: any;
  view: EmbeddedViewRef<Poc6Locv6ViewContext<T, U>>;
}


export class Poc6Locv6ViewContext<T, U extends NgIterable<T> = NgIterable<T>> {

  localVariableProjections: CustomVariablesProjectors = {};

  constructor(public $implicit: T, public pocLet: U, public index: number, public count: number) {
  }

  get first(): boolean {
    return this.index === 0;
  }

  get last(): boolean {
    return this.index === this.count - 1;
  }

  get even(): boolean {
    return this.index % 2 === 0;
  }

  get odd(): boolean {
    return !this.even;
  }

  get customVariable(): unknown {
    return Object.entries(this.localVariableProjections)
      .reduce((acc, [name, fn]) => {
        return { ...acc, [name]: fn(this) };
      }, {});
  }
}

interface CustomVariablesProjectors {
  [variableName: string]: (context) => unknown;
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[poc6LocV]'
})
export class Poc6Locv6<T, U extends NgIterable<T> = NgIterable<T>> implements OnInit, OnDestroy {
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

  _localVariableProjections;
  @Input()
  set poc6LocVLocalVariableProjections(o: CustomVariablesProjectors) {
    this._localVariableProjections = o;
  }
  @Input()
  set poc6LocVIterableTrackBy(fn: TrackByFunction<T>) {
    this._trackByFn = fn;
  }

  @Input()
  set poc6LocV(potentialObservable: ObservableInput<U & NgIterable<T>> | null | undefined) {
    this.observables$.next(potentialObservable);
  }

  constructor(
    private cdRef: ChangeDetectorRef,
    private readonly nextTemplateRef: TemplateRef<Poc6Locv6ViewContext<T, U>>,
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
            new Poc6Locv6ViewContext<T, U>(null, this.values, -1, -1),
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

          const view = <EmbeddedViewRef<Poc6Locv6ViewContext<T, U>>>this.viewContainerRef.get(previousIndex);
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
      const viewRef = <EmbeddedViewRef<Poc6Locv6ViewContext<T, U>>>this.viewContainerRef.get(i);
      viewRef.context.localVariableProjections = this._localVariableProjections;

      viewRef.context.index = i;
      viewRef.context.count = ilen;
      viewRef.context.pocLet = this.values;
    }

    changes.forEachIdentityChange((record: IterableChangeRecord<T>) => {
      const viewRef =
        <EmbeddedViewRef<Poc6Locv6ViewContext<T, U>>>this.viewContainerRef.get(record.currentIndex);
      viewRef.context.$implicit = record.item;
      viewRef.detectChanges();
    });
  }

  private _perViewChange(
    view: EmbeddedViewRef<Poc6Locv6ViewContext<T, U>>, record: IterableChangeRecord<T>) {
    view.context.$implicit = record.item;
    view.detectChanges();
  }

}
