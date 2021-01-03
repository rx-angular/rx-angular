import {
  ChangeDetectorRef,
  Component,
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

import { isObservable, Observable, of, ReplaySubject, Subscription, Unsubscribable } from 'rxjs';
import {
  createTemplateManager,
  Hooks,
  nameToStrategyCredentials,
  ngInputFlatten,
  rxMaterialize,
  RxNotificationKind,
  StrategyCredentials,
  StrategyProvider,
  TemplateManager
} from '../../../cdk';
import { RxContextTemplateNames, rxContextTemplateNames, RxContextViewContext } from './model';
import { distinctUntilChanged, filter, map, mapTo, startWith, switchMap, withLatestFrom } from 'rxjs/operators';
import { RxState } from '@rx-angular/state';

@Component({
  // tslint:disable-next-line:directive-selector component-selector
  selector: '[rxContextContainer]',
  template: `
    <ng-content></ng-content>
    <ng-container [rxSwitch]="templateName$">
      <ng-content *rxSwitchCase="rxSuspenseTpl" select="[rxSuspense]"></ng-content>
      <ng-content *rxSwitchCase="rxErrorTpl" select="[rxError]"></ng-content>
      <ng-content *rxSwitchCase="rxCompleteTpl" select="[rxComplete]"></ng-content>
    </ng-container>
    <ng-content select="[rxContextAfter]"></ng-content>
  `,
  providers: [RxState]
})
// tslint:disable-next-line:directive-class-suffix
export class RxContextContainer<U> extends Hooks implements OnInit, OnDestroy {

  readonly templateName$ = this.rxState.select('templateName');
  readonly strategyName$ = this.rxState.select('strategyName');
  readonly rxSuspenseTpl = RxNotificationKind.suspense;
  readonly rxErrorTpl = RxNotificationKind.error;
  readonly rxCompleteTpl = RxNotificationKind.complete;

  @Input('rxContextContainer')
  set rxContextContainer(potentialObservable: Observable<U> | null | undefined) {
    this.rxState.connect('templateName', potentialObservable.pipe(toTemplateName()));
  }

  @Input('rxContextStrategy')
  set strategy(strategyName$: string | Observable<string> | undefined) {
    this.rxState.connect('strategyName', isObservable(strategyName$) ? strategyName$ : of(strategyName$));
  }

  @Input('completeTrg')
  set rxCompleteTrigger(complete$: Observable<any>) {
    this.rxState.connect('templateName', complete$.pipe(mapTo(RxNotificationKind.complete)));
  }

  @Input('errorTrg')
  set rxErrorTrigger(error$: Observable<any>) {
    this.rxState.connect('templateName', error$.pipe(mapTo(RxNotificationKind.error)));
  }

  @Input('suspenseTrg')
  set rxSuspenseTrigger(suspense$: Observable<any>) {
    this.rxState.connect('templateName', suspense$.pipe(mapTo(RxNotificationKind.suspense)));
  }

  constructor(
    private strategyProvider: StrategyProvider,
    private readonly rxState: RxState<{
      templateName: RxNotificationKind,
      strategyName: string
    }>
  ) {
    super();
  }

  static ngTemplateGuard_rxContext: 'binding';

  /** @internal */
  static ngTemplateContextGuard<U>(
    dir: RxContextContainer<U>,
    ctx: unknown | null | undefined
  ): ctx is RxContextViewContext<U> {
    return true;
  }

  ngOnInit() {
    if(!this.rxState.get('templateName')) {
      this.rxState.set({ templateName: RxNotificationKind.suspense });
    }
  }

  ngOnDestroy() {
  }

}

function toTemplateName<T>() {
  return (o$: Observable<T>): Observable<RxNotificationKind> => o$.pipe(
    rxMaterialize(),
    filter(notification => notification.kind === RxNotificationKind.next),
    map(n => n.kind)
  );
}
