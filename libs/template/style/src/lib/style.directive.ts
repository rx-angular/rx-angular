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
  Renderer2,
  RendererStyleFlags2,
  SimpleChanges,
} from '@angular/core';
import {
  onStrategy,
  RxStrategyNames,
  RxStrategyProvider,
} from '@rx-angular/cdk/render-strategies';
import { coerceObservableWith } from '@rx-angular/cdk/coercing';
import {
  isObservable,
  NextObserver,
  Observable,
  ObservableInput,
  ReplaySubject,
  Subscription,
  switchMap,
} from 'rxjs';
import { map, shareReplay, switchAll } from 'rxjs/operators';

type RxStyleValues = { [style: string]: any } | null | undefined;

/* eslint-disable @angular-eslint/no-conflicting-lifecycle */
@Directive({ selector: '[rxStyle]' })
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class RxStyle implements OnInit, OnChanges, DoCheck, OnDestroy {
  /** @internal */
  private staticStyles: RxStyleValues;
  /** @internal */
  private renderOnCheck = false;
  /** @internal */
  private readonly values$ = new ReplaySubject<
    Observable<RxStyleValues> | RxStyleValues
  >(1);
  /** @internal */
  private readonly styles$ = this.values$.pipe(
    coerceObservableWith(),
    switchAll(),
    shareReplay({ refCount: true, bufferSize: 1 })
  );
  /** @internal */
  private differ: KeyValueDiffer<string, string | number> | null = null;

  @Input('rxStyle') style: ObservableInput<RxStyleValues> | RxStyleValues;

  @Input('rxStyleStrategy') strategy: RxStrategyNames<string>;

  @Input('rxStyleRenderCallback')
  renderObserver: NextObserver<RxStyleValues> | null = null;

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
      if (!isObservable(this.style)) {
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
          switchMap(({ changes, styles }) =>
            changes
              ? onStrategy(
                  styles,
                  this.strategyProvider.strategies[this.strategy] ??
                    this.strategyProvider.strategies[
                      this.strategyProvider.config.primaryStrategy
                    ],
                  () => {
                    this.applyChanges(changes);
                  }
                )
              : [styles]
          )
        )
        .subscribe((rendered) => this.renderObserver?.next(rendered))
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
