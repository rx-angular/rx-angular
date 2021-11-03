import {
  Directive,
  ElementRef,
  Input,
  IterableChanges,
  IterableDiffer,
  IterableDiffers,
  KeyValueChanges,
  KeyValueDiffer,
  KeyValueDiffers,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ɵisListLikeIterable as isListLikeIterable
} from '@angular/core';
import {
  accumulateObservables,
  RxStrategyNames,
  RxStrategyProvider
} from '@rx-angular/cdk';
import { coerceAllFactory } from '@rx-angular/cdk/coercing';
import {
  BehaviorSubject, defer,
  isObservable,
  Observable,
  ObservableInput,
  ReplaySubject,
  Subject,
  Subscription
} from 'rxjs';
import { map, switchAll, switchMap, withLatestFrom } from 'rxjs/operators';

type NgClassValues =
  | string[]
  | Set<string>
  | Record<string, boolean>
  | string
  | null
  | undefined;

type RxClassInput =
  | Observable<NgClassValues>
  | Record<string, Observable<boolean>>;

@Directive({ selector: '[rxClass]' })
export class ClassDirective implements OnInit, OnDestroy {
  private iterableDiffer: IterableDiffer<string> | null = null;
  private keyValueDiffer: KeyValueDiffer<string, any> | null = null;
  private rawClass: NgClassValues = null;
  private newInput = false;
  private sub = new Subscription();
  private classValueChanged = false;

  constructor(
    private readonly iterableDiffers: IterableDiffers,
    private readonly keyValueDiffers: KeyValueDiffers,
    private readonly ngEl: ElementRef,
    private readonly renderer: Renderer2,
    private readonly strategyProvider: RxStrategyProvider
  ) {}

  private rxClass = coerceAllFactory<NgClassValues>(
    () => new ReplaySubject(1),
    switchAll()
  );

  @Input('rxClass')
  set rxClass$(value$: RxClassInput) {
    this.newInput = true;
    this.rxClass.next(
      (isObservable(value$) ? value$ : accumulateObservables(value$)).pipe(
        map((value) => (typeof value === 'string' ? [value] : value))
      )
    );
  }

  private strategy = coerceAllFactory(
    () => new BehaviorSubject<ObservableInput<string> | string>(this.strategyProvider.primaryStrategy),
    switchAll()
  );

  @Input('rxClassStrategy')
  set strategy$(
    strategy: RxStrategyNames<string> | Observable<RxStrategyNames<string>>
  ) {
    this.strategy.next(strategy);
  }

  private rendered$ = new Subject<void>();

  @Output() readonly rendered = defer(() => this.rendered$);

  ngOnInit(): void {
    this.sub.add(
      this.rxClass.values$
        .pipe(
          withLatestFrom(this.strategy.values$),
          switchMap(([value, strategy]) =>
            this.strategyProvider.schedule(
              () => {
                if (this.newInput) {
                  this.initDiffers(value);
                  this.newInput = false;
                }
                this.classValueChanged = false;
                this.rawClass = value;
                this.applyChanges();

                if (this.classValueChanged) {
                  this.rendered$.next();
                }
              },
              { strategy, scope: this, patchZone: false }
            )
          )
        )
        .subscribe()
    );
  }

  private initDiffers(value: NgClassValues): void {
    if (isListLikeIterable(value)) {
      this.iterableDiffer = this.iterableDiffers
        .find(value)
        .create();
    } else {
      this.keyValueDiffer = this.keyValueDiffers
        .find(value)
        .create();
    }
  }

  private applyChanges(): void {
    if (this.iterableDiffer) {
      const iterableChanges = this.iterableDiffer.diff(
        this.rawClass as string[]
      );
      if (iterableChanges) {
        this.applyIterableChanges(iterableChanges);
      }
    } else if (this.keyValueDiffer) {
      const keyValueChanges = this.keyValueDiffer.diff(
        this.rawClass as { [k: string]: any }
      );
      if (keyValueChanges) {
        this.applyKeyValueChanges(keyValueChanges);
      }
    }
  }

  private applyKeyValueChanges(changes: KeyValueChanges<string, any>): void {
    changes.forEachAddedItem((record) =>
      this.toggleClass(record.key, record.currentValue)
    );
    changes.forEachChangedItem((record) =>
      this.toggleClass(record.key, record.currentValue)
    );
    changes.forEachRemovedItem((record) => {
      if (record.previousValue) {
        this.toggleClass(record.key, false);
      }
    });
  }

  private applyIterableChanges(changes: IterableChanges<string>): void {
    changes.forEachAddedItem((record) =>
      this.toggleClass(record.item, true)
    );

    changes.forEachRemovedItem((record) =>
      this.toggleClass(record.item, false)
    );
  }

  /**
   * Adds or removes the provided class.
   *
   * @param klass defines class to add/remove
   * @param enabled defines it the class provided as the first param should be added or removed
   */
  private toggleClass(klass: string, enabled: boolean): void {
    klass = klass.trim();
    if (klass) {
      klass.split(/\s+/g).forEach((cls) => {
        if (enabled) {
          this.renderer.addClass(this.ngEl.nativeElement, cls);
        } else {
          this.renderer.removeClass(this.ngEl.nativeElement, cls);
        }
        this.classValueChanged = true;
      });
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
