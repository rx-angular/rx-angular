import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive, ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  Optional,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

import { Observable, Subject, Subscription, Unsubscribable } from 'rxjs';

import {
  getDefaultStrategyCredentialsMap,
  mergeStrategies,
  RX_CUSTOM_STRATEGIES,
  RX_PRIMARY_STRATEGY,
  StrategyCredentialsMap
} from '../../../../shared/rx-angular-pocs/render-stragegies';
import { Hooks } from '../../../../shared/debug-helper/hooks';
import { intersectionObserver } from '../../../../shared/rx-angular-pocs/cdk/intersection-observer';
import { mergeAll, switchMapTo } from 'rxjs/operators';
import { RxEffects } from '../../../../shared/rx-effects.service';
import { createTemplateManager, TemplateManager } from '../../../../../../../../libs/template/src';
import { IfViewContext } from '../../../../shared/rx-angular-pocs/If/rx-if.directive';
import { coalesceWith, priorityTickMap, SchedulingPriority } from '@rx-angular/template';
export interface IfVisibleViewContext<T> {
  // to enable `as` syntax we have to assign the directives selector (var as v)
  rxIfVisible: T;

  $implicit: T;
  // set context var complete to true (var$; let e = $error)
  $errorVal: false | Error;
  // set context var complete to true (var$; let c = $complete)
  $completeVal: boolean;
  // set context var suspense to true (var$; let c = $suspense)
  $suspenseVal: any;
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[ifVisible]',
  providers: [RxEffects]
})
export class IfVisibleDirective<U> extends Hooks {
  private observer = intersectionObserver();
  displayed = false;

  private readonly templateManager: TemplateManager<IfViewContext<U | undefined | null>,
    'view'>;

  constructor(
    rxEf: RxEffects,
    public cdRef: ChangeDetectorRef,
    public viewContainerRef: ViewContainerRef,
    public templateRef: TemplateRef<any>,
    private readonly elemRef: ElementRef
  ) {
    super();
    this.templateManager = createTemplateManager(this.viewContainerRef, {} as any);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting && !this.displayed) {
          this.displayed = true;
          observer.unobserve(this.elemRef.nativeElement.parentElement);
          observer.disconnect();
          priorityTickMap[SchedulingPriority.animationFrame].subscribe(() => {
            this.templateManager.addTemplateRef('view', this.templateRef);
            this.templateManager.displayView('view');
            this.templateManager.getEmbeddedView('view').detectChanges();
          })
        }
      });
    } );

    this.afterViewInit$.subscribe(() => {
      observer.observe(this.elemRef.nativeElement.parentElement)
    })

  }

}
