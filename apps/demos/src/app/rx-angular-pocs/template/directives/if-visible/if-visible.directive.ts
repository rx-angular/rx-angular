import { ChangeDetectorRef, Directive, ElementRef, TemplateRef, ViewContainerRef } from '@angular/core';
import { animationFrameTick, Hooks } from '../../../cdk';
import { RxEffects } from '../../../state';
import { TemplateManager, createTemplateManager,intersectionObserver  } from '../../../cdk';

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
  displayed = false;
  private observer = intersectionObserver();

  private readonly templateManager: TemplateManager<IfVisibleViewContext<U | undefined | null>, 'view'>;

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
         animationFrameTick().subscribe(() => {
            this.templateManager.addTemplateRef('view', this.templateRef);
            this.templateManager.displayView('view');
            const view = this.templateManager.getEmbeddedView('view');
            if (view) {
              view.detectChanges();
            }
          });
        }
      });
    });

    this.afterViewInit$.subscribe(() => {
      observer.observe(this.elemRef.nativeElement.parentElement);
    });

  }

}
