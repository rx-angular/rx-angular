import { ChangeDetectorRef, Directive, ElementRef, TemplateRef, ViewContainerRef } from '@angular/core';
import { Hooks } from '../../../../shared/debug-helper/hooks';
import { intersectionObserver } from '../../../../shared/rx-angular-pocs/cdk/intersection-observer';
import { RxEffects } from '../../../../shared/rx-effects.service';
import { IfViewContext } from '../../../../shared/rx-angular-pocs/if/rx-if.directive';
import { priorityTickMap, SchedulingPriority, createTemplateManager, TemplateManager } from '@rx-angular/template';

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
        if (entry.isIntersecting && !this.displayed) {
          this.displayed = true;
          observer.unobserve(this.elemRef.nativeElement.parentElement);
          observer.disconnect();
          priorityTickMap[SchedulingPriority.animationFrame].subscribe(() => {
            this.templateManager.addTemplateRef('view', this.templateRef);
            this.templateManager.displayView('view');
            this.templateManager.getEmbeddedView('view').detectChanges();
          });
        }
      });
    });

    this.afterViewInit$.subscribe(() => {
      observer.observe(this.elemRef.nativeElement.parentElement);
    });

  }

}
