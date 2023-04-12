import {
  Directive,
  effect,
  EmbeddedViewRef,
  Input,
  OnDestroy,
  OnInit,
  Signal,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { RxStrategyProvider } from '@rx-angular/cdk/render-strategies';
import { Subject } from 'rxjs';

@Directive({ selector: '[signalLet]', standalone: true })
export class SignalLetDirective<T> implements OnInit, OnDestroy {
  static ngTemplateGuard_rxLet: 'binding';

  @Input() signalLet: Signal<T>;
  constructor(
    private viewContainerRef: ViewContainerRef,
    private template: TemplateRef<{ $implicit: T }>,
    private strategyProvider: RxStrategyProvider
  ) {}

  ngOnInit() {
    let embeddedView: EmbeddedViewRef<{ $implicit: T }>;
    const scheduleCd$ = new Subject<T>();
    effect(() => {
      const value = this.signalLet();
      scheduleCd$.next(value);
    });
    scheduleCd$
      .pipe(
        this.strategyProvider.scheduleWith((value) => {
          if (!embeddedView) {
            embeddedView = this.viewContainerRef.createEmbeddedView(
              this.template,
              { $implicit: value }
            );
            embeddedView.detach();
          } else {
            embeddedView.context.$implicit = value;
          }
          embeddedView.detectChanges();
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.viewContainerRef.clear();
  }
}
