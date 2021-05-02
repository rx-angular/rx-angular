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

import { BehaviorSubject, defer, Observable, ObservableInput, ReplaySubject } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  groupBy,
  map, mergeAll,
  mergeMap, pluck,
  scan, share,
  shareReplay,
  startWith,
  switchAll,
  take,
  tap
} from 'rxjs/operators';
import { RxEffects } from '../../../../shared/rx-effects.service';

type RxForTemplateNames = 'rxSuspense' | 'rxNext' | 'rxError' | 'rxComplete';

export class RxForViewContext<T extends object, U extends NgIterable<T> = NgIterable<T>, K = keyof T> {

  private readonly _record = new ReplaySubject<T>(1);
  private readonly _record$ = this._record.pipe(distinctUntilChanged(this.distinctBy), share());
  private readonly _index = new BehaviorSubject<number>(-1);
  private _implicit: T;


  constructor(private _$implicit: T, public rxFor: U, private distinctBy: (a: T, b: T) => boolean = (a, b) => a === b) {
    // tslint:disable-next-line:no-unused-expression
    this._record.next(_$implicit);
  }

  set index(index: number | any) {
    this._index.next(index);
  }

  set $implicit(record: T) {
    this._implicit = record;
    this._record.next(record);
  }

  get $implicit(): T {
    return this._implicit;
  }

  get record$() {
    return this._record$;
  }

  select = (props: K[]): Observable<any> => {
    return this._record$.pipe(
      pluck(...props as any)
    );
  };
}

export interface CustomVariablesProjectors {
  [variableName: string]: (context) => unknown;
}

export interface RecordViewTuple<T extends object, U extends NgIterable<T>> {
  record: any;
  view: EmbeddedViewRef<RxForViewContext<T, U>>;
}


@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[rxMinimalFor]',
  providers: [RxEffects]
})
export class RxMinimalForOf<T extends object, U extends NgIterable<T> = NgIterable<T>> implements OnInit, OnDestroy {
  private evMap: Map<string, EmbeddedViewRef<RxForViewContext<T, U>>> = new Map();
  private differ: IterableDiffer<T> | null = null;
  private observables$ = new ReplaySubject<ObservableInput<U>>(1);

  values$ = this.observables$
    .pipe(
      distinctUntilChanged(),
      switchAll()
    );

  private readonly records$ = defer(() => this.values$.pipe(
    mergeMap(arr => arr),
    groupBy(r => r[this._rxTrackBy]),
    scan((records, o$) => ({
      ...records,
      [o$.key]: o$.pipe(distinctUntilChanged(this.rxMinimalForDistinctBy))
    }), {}),
    mergeAll(),
    shareReplay({ refCount: true, bufferSize: 1 })
  ));

  @Input()
  set rxMinimalFor(potentialObservable: ObservableInput<U> | null | undefined) {
    this.observables$.next(potentialObservable);
  }

  @Input()
  set rxMinimalForOf(potentialObservable: ObservableInput<U> | null | undefined) {
    this.observables$.next(potentialObservable);
  }

  _rxTrackBy = 'id';
  @Input()
  rxMinimalForDistinctBy = (a, b) => a.value === b.value;

  @Input()
  set rxMinimalForTrackBy(key: string) {
    if (key) {
      this._rxTrackBy = key;
    } else {
      this._rxTrackBy = 'id';
    }
  }


  constructor(
    private rxEffects: RxEffects,
    private cdRef: ChangeDetectorRef,
    private readonly templateRef: TemplateRef<RxForViewContext<T, U>>,
    private readonly viewContainerRef: ViewContainerRef,
    private iterableDiffers: IterableDiffers
  ) {

  }

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

        const evc = new RxForViewContext(r.item, iterable, this.rxMinimalForDistinctBy);
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
