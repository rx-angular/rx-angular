import { ChangeDetectorRef, Component, TemplateRef, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, EMPTY, interval, NEVER, Observable, of, Subject } from 'rxjs';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { LetDirective } from '../../src/lib/let';
import { take } from 'rxjs/operators';
import { MockChangeDetectorRef } from '../fixtures';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { mockConsole } from '@test-helpers';

@Component({
  template: `
    <ng-template let-value [rxLet]="value$" (rendered)="rendered$.next($event)">{{value === undefined ? 'undefined' : value === null ? 'null' : value}}</ng-template>
  `
})
class LetDirectiveTestComponent {
  value$: Observable<number> = of(42);
  rendered$ = new Subject<number>();
}

let fixtureLetDirectiveTestComponent: any;
let letDirectiveTestComponent: {
  strategy: any;
  value$: Observable<any> | undefined | null;
  rendered$: Subject<number>;
};
let componentNativeElement: any;

const setupLetDirectiveTestComponent = (): void => {
  TestBed.configureTestingModule({
    declarations: [LetDirectiveTestComponent, LetDirective],
    providers: [
      { provide: ChangeDetectorRef, useClass: MockChangeDetectorRef },
      TemplateRef,
      ViewContainerRef
    ]
  });
  fixtureLetDirectiveTestComponent = TestBed.createComponent(
    LetDirectiveTestComponent
  );
  letDirectiveTestComponent =
    fixtureLetDirectiveTestComponent.componentInstance;
  componentNativeElement = fixtureLetDirectiveTestComponent.nativeElement;
};

describe('LetDirective renderCallback', () => {
  beforeAll(() => mockConsole());
  beforeEach((setupLetDirectiveTestComponent));

  it('should be instantiable', () => {
    expect(fixtureLetDirectiveTestComponent).toBeDefined();
    expect(letDirectiveTestComponent).toBeDefined();
    expect(componentNativeElement).toBeDefined();
  });

  it('should render nothing when initially undefined was passed (as no value ever was emitted)', done => {
    letDirectiveTestComponent.rendered$.subscribe(renderedValue => {
      expect(renderedValue).toBe(42);
      done();
    });
    letDirectiveTestComponent.value$ = new BehaviorSubject(42);
    fixtureLetDirectiveTestComponent.detectChanges();
    expect(componentNativeElement.textContent).toBe('42');
  });

  it('should render values over time when a new observable was passed', fakeAsync(() => {
    letDirectiveTestComponent.value$ = interval(1000).pipe(take(3));
    fixtureLetDirectiveTestComponent.detectChanges();
    expect(componentNativeElement.textContent).toBe('');
    tick(1000);
    fixtureLetDirectiveTestComponent.detectChanges();
    expect(componentNativeElement.textContent).toBe('0');
    tick(1000);
    fixtureLetDirectiveTestComponent.detectChanges();
    expect(componentNativeElement.textContent).toBe('1');
    tick(1000);
    fixtureLetDirectiveTestComponent.detectChanges();
    expect(componentNativeElement.textContent).toBe('2');

    tick(1000);
    fixtureLetDirectiveTestComponent.detectChanges();
    // Remains at 2, since that was the last value.
    expect(componentNativeElement.textContent).toBe('2');
  }));
});
