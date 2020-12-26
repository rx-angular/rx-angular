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
  ViewContainerRef
} from '@angular/core';

import { defer, ObservableInput, ReplaySubject } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  groupBy,
  map,
  mergeAll,
  mergeMap,
  scan,
  shareReplay,
  startWith,
  switchAll,
  take
} from 'rxjs/operators';
import { RxForViewContext } from './model';
import { RxEffects } from '../rx-effects';

type RxForTemplateNames = 'rxSuspense' | 'rxNext' | 'rxError' | 'rxComplete';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[rxFor]',
  providers: [RxEffects]
})
export class RxForDirective<T extends object, U extends NgIterable<T> = NgIterable<T>> implements OnInit, OnDestroy {
  observables$ = new ReplaySubject<ObservableInput<U>>(1);
  @Input()
  set rxFor(potentialObservable: ObservableInput<U> | null | undefined) {
    this.observables$.next(potentialObservable);
  }

  @Input()
  set rxForOf(potentialObservable: ObservableInput<U> | null | undefined) {
    this.observables$.next(potentialObservable);
  }

  @Input()
  set rxForTrackBy(key: string) {
    if (key) {
      this._rxTrackBy = key;
    } else {
      this._rxTrackBy = 'id';
    }
  }

  values$ = this.observables$
    .pipe(
      distinctUntilChanged(),
      switchAll()
    );

  _rxTrackBy = 'id';
  private evMap: Map<string, EmbeddedViewRef<RxForViewContext<T, U>>> = new Map();
  private differ: IterableDiffer<T> | null = null;

  private readonly records$ = defer(() => this.values$.pipe(
    mergeMap(arr => arr),
    groupBy(r => r[this._rxTrackBy]),
    scan((records, o$) => ({
      ...records,
      [o$.key]: o$.pipe(distinctUntilChanged(this.rxForDistinctBy))
    }), {}),
    mergeAll(),
    shareReplay({ refCount: true, bufferSize: 1 })
  ));


  constructor(
    private rxEffects: RxEffects,
    private cdRef: ChangeDetectorRef,
    private readonly templateRef: TemplateRef<RxForViewContext<T, U>>,
    private readonly viewContainerRef: ViewContainerRef,
    private iterableDiffers: IterableDiffers
  ) {

  }
  @Input()
  rxForDistinctBy = (a, b) => a.value === b.value;

  initDiffer(iterable: U = [] as U) {
    this.differ = this.iterableDiffers.find(iterable).create((index: number, item: T) => item[this._rxTrackBy]);
    this.rxEffects.hold(this.values$.pipe(
      startWith(iterable),
      map(i => ({ diff: this.differ.diff(i), iterable: i })),
      filter(r => r.diff != null),
      shareReplay(1)
    ), (r) => this.applyChanges(r.diff, r.iterable));
  }

  ngOnInit() {
    this.rxEffects.hold(this.values$.pipe(take(1)), (value) => this.initDiffer(value));
  }

  ngOnDestroy() {
    this.viewContainerRef.clear();
  }

  private applyChanges(changes: IterableChanges<T>, iterable: U) {
    changes.forEachOperation((
      r: IterableChangeRecord<T>,
      previousIndex: number | null,
      currentIndex: number | null
    ) => {
      const idx = currentIndex == null ? undefined : currentIndex;
      const recordId = r.item[this._rxTrackBy];
      const name = 'rxNext';
      const evName = name + recordId;

      // enter
      if (r.previousIndex == null) {

        const evc = new RxForViewContext(r.item, iterable, this.rxForDistinctBy);
        const view = this.viewContainerRef
          .createEmbeddedView(this.templateRef, evc, idx);
        this.evMap.set(evName, view);
        view.detectChanges();

      } else if (currentIndex == null) {

        this.viewContainerRef.remove(
          previousIndex === null ? undefined : previousIndex);

      } else if (previousIndex !== null) {

        const view = <EmbeddedViewRef<RxForViewContext<T, U>>>this.viewContainerRef.get(previousIndex);
        this.viewContainerRef.move(view, idx);
        view.context.$implicit = r.item;

      }
    });

    changes.forEachIdentityChange((record: IterableChangeRecord<T>) => {
      const viewRef =
        <EmbeddedViewRef<RxForViewContext<T, U>>>this.viewContainerRef.get(record.currentIndex);
      viewRef.context.$implicit = record.item;
    });
    /*
     // behavior like *ngFor
     const tuplesToDetectChanges: RecordViewTuple<T, U>[] = [];
     // TODO: dig into `IterableDiffer`
     changes.forEachOperation(
     (
     changeRecord: IterableChangeRecord<T>,
     previousIndex: number | null,
     currentIndex: number | null
     ) => {
     const id = changeRecord.item[this._rxTrackBy];
     // Insert
     if (changeRecord.previousIndex == null) {
     const evName = 'rxNext' + id;
     // this is basically the first run
     // create the embedded view for each value with default values
     this.templateManager.displayView('rxNext', id);
     tuplesToDetectChanges.push({
     view: this.templateManager.getEmbeddedView(evName),
     record: changeRecord
     });

     } else if (currentIndex == null) {

     this.viewContainerRef.remove(
     previousIndex === null ? undefined : previousIndex);

     } else if (previousIndex !== null) {

     const view = <EmbeddedViewRef<RxForViewContext<T, U>>>this.viewContainerRef.get(previousIndex);
     this.viewContainerRef.move(view, currentIndex);
     tuplesToDetectChanges.push({
     view,
     record: changeRecord
     });
     }
     });

     for (let i = 0; i < tuplesToDetectChanges.length; i++) {
     this._perViewChange(tuplesToDetectChanges[i].view, tuplesToDetectChanges[i].record);
     }

     for (let index = 0, count = this.viewContainerRef.length; index < count; index++) {
     this.templateManager.updateViewContext({
     index, count,
     rxFor: iterable,
     record$: this.records$.pipe(map(records => records[this._rxTrackBy]))
     });

     }

     changes.forEachIdentityChange((record: IterableChangeRecord<T>) => {
     const viewRef =
     <EmbeddedViewRef<RxForViewContext<T, U>>>this.viewContainerRef.get(record.currentIndex);
     viewRef.context.$implicit = record.item;
     viewRef.detectChanges();
     });

     */
  }

  private _perViewChange(
    view: EmbeddedViewRef<RxForViewContext<T, U>>, record: IterableChangeRecord<T>) {
    view.context.$implicit = record.item;
    view.detectChanges();
  }

}
