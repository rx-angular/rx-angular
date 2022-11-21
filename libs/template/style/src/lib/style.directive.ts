import {
  Directive,
  DoCheck,
  ElementRef,
  Input,
  KeyValueChanges,
  KeyValueDiffer,
  KeyValueDiffers,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  RendererStyleFlags2,
  SimpleChanges,
} from '@angular/core';
import {
  onStrategy,
  RxStrategyNames,
  RxStrategyProvider,
} from '@rx-angular/cdk/render-strategies';
import { coerceAllFactory, coerceObservable } from '@rx-angular/cdk/coercing';
import {
  isObservable,
  NextObserver,
  Observable,
  ReplaySubject,
  Subscription,
  switchMap,
  combineLatest,
  Subject,
  BehaviorSubject,
  NEVER,
} from 'rxjs';
import { map, shareReplay, switchAll, withLatestFrom } from 'rxjs/operators';

type RxStyleMap = {
  [style: string]: string | number | Observable<number | string>;
};
function isRxStyleMap(v: unknown): v is RxStyleMap {
  const keys = Object.keys(v);
  return typeof v === 'object' && keys.some((key) => isObservable(v[key]));
}
type RxStyleValues = { [style: string]: number | string } | null | undefined;
type RxStyleInput = Observable<RxStyleValues> | RxStyleValues | RxStyleMap;

/* eslint-disable @angular-eslint/no-conflicting-lifecycle */
@Directive({ selector: '[rxStyle]' })
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class RxStyle implements OnInit, OnChanges, DoCheck, OnDestroy {
  /** @internal */
  private staticStyles: RxStyleValues;
  /** @internal */
  private renderOnCheck = false;
  /** @internal */
  private strategyHandler = coerceAllFactory(
    () =>
      new BehaviorSubject<RxStrategyNames<string>>(
        this.strategyProvider.primaryStrategy
      )
  );
  /** @internal */
  private readonly values$ = new ReplaySubject<RxStyleInput>(1);
  /** @internal */
  private readonly styles$ = this.values$.pipe(
    map((values) => {
      if (isRxStyleMap(values)) {
        return combineLatest(
          Object.keys(values).map((key) => {
            return coerceObservable(values[key]).pipe(
              map((value) => ({ [key]: value }))
            );
          })
        ).pipe(
          map((values) =>
            values.reduce(
              (styleValues, currentValue) => ({
                ...styleValues,
                ...currentValue,
              }),
              {} as RxStyleValues
            )
          )
        );
      }
      return coerceObservable(values);
    }),
    switchAll(),
    shareReplay({ refCount: true, bufferSize: 1 })
  );
  /** @internal */
  private differ: KeyValueDiffer<string, string | number> | null = null;

  @Input('rxStyle') style: RxStyleInput;

  @Input('rxStyleStrategy')
  set strategy(
    strategy: RxStrategyNames<string> | Observable<RxStrategyNames<string>>
  ) {
    this.strategyHandler.next(strategy);
  }

  @Input('rxStyleRenderCallback')
  renderObserver: NextObserver<RxStyleValues> | null = null;

  @Output('rxStyleRenderCallback')
  renderCallback = new Subject<RxStyleValues>();

  /** @internal */
  private readonly subscription = new Subscription();

  constructor(
    private elementRef: ElementRef,
    private differs: KeyValueDiffers,
    private renderer: Renderer2,
    private strategyProvider: RxStrategyProvider
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.style) {
      if (
        this.style != null &&
        !isObservable(this.style) &&
        !isRxStyleMap(this.style)
      ) {
        this.staticStyles = this.style;
        this.renderOnCheck = true;
      } else {
        this.staticStyles = undefined;
        this.renderOnCheck = false;
        this.values$.next(this.style);
      }
    }
  }

  ngOnInit() {
    this.subscription.add(
      this.styles$
        .pipe(
          map((styles) => ({
            styles,
            changes: this.getDiffer(styles)?.diff(styles),
          })),
          withLatestFrom(this.strategyHandler.values$),
          switchMap(([{ changes, styles }, strategy]) =>
            changes
              ? onStrategy(
                  styles,
                  this.strategyProvider.strategies[strategy] ??
                    this.strategyProvider.strategies[
                      this.strategyProvider.primaryStrategy
                    ],
                  () => {
                    this.applyChanges(changes);
                  }
                )
              : NEVER
          )
        )
        .subscribe((rendered) => {
          this.renderObserver?.next(rendered);
          this.renderCallback.next(rendered);
        })
    );
  }

  ngDoCheck() {
    if (this.renderOnCheck) {
      this.values$.next(this.staticStyles);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /** @internal */
  private getDiffer(
    values: RxStyleValues
  ): KeyValueDiffer<string, string | number> {
    if (!this.differ && values) {
      this.differ = this.differs.find(values).create();
    }
    return this.differ;
  }

  /** @internal */
  private setStyle(
    nameAndUnit: string,
    value: string | number | null | undefined
  ): void {
    const [name, unit] = nameAndUnit.split('.');
    const flags =
      name.indexOf('-') === -1
        ? undefined
        : (RendererStyleFlags2.DashCase as number);

    if (value != null) {
      this.renderer.setStyle(
        this.elementRef.nativeElement,
        name,
        unit ? `${value}${unit}` : value,
        flags
      );
    } else {
      this.renderer.removeStyle(this.elementRef.nativeElement, name, flags);
    }
  }

  /** @internal */
  private applyChanges(
    changes: KeyValueChanges<string, string | number>
  ): void {
    changes.forEachRemovedItem((record) => this.setStyle(record.key, null));
    changes.forEachAddedItem((record) =>
      this.setStyle(record.key, record.currentValue)
    );
    changes.forEachChangedItem((record) =>
      this.setStyle(record.key, record.currentValue)
    );
  }
}
