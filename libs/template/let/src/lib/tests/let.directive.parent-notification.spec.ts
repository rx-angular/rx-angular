import {
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { RxStrategyProvider } from '@rx-angular/cdk/render-strategies';
import { asapScheduler, delay, Observable, ReplaySubject, Subject } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { LetDirective } from '../let.directive';

@Component({
  template: `
    <div #otherChild></div>
    <div
      #letChild
      *rxLet="value$; let value; strategy: strategy; parent: withParent"
    >
      {{ (value | json) || 'undefined' }}
    </div>

    <div
      *rxLet="
        value$;
        let value;
        strategy: strategy;
        renderCallback: rendered$;
        parent: withParent
      "
    >
      {{ (value | json) || 'undefined' }}
    </div>
  `,
})
class LetDirectiveTestStrategyComponent {
  @ViewChild('letChild') viewChild: ElementRef;
  @ViewChild('otherChild') otherChild: ElementRef;
  @ViewChildren(LetDirective) letChildren: QueryList<LetDirective<any>>;
  strategy: string;
  value$: Observable<number> = new ReplaySubject(1);
  rendered$ = new Subject();
  withParent = true;
}

let fixture: any;
let componentInstance: {
  viewChild: ElementRef;
  otherChild: ElementRef;
  strategy: string;
  value$: Subject<any>;
  rendered$: Observable<unknown>;
  withParent: boolean;
  letChildren: QueryList<LetDirective<any>>;
};
let strategyProvider: RxStrategyProvider;

describe('LetDirective parent notification', () => {
  // beforeAll(() => mockConsole());
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LetDirectiveTestStrategyComponent, LetDirective],
      teardown: { destroyAfterEach: true },
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LetDirectiveTestStrategyComponent);
    componentInstance = fixture.componentInstance;
    strategyProvider = TestBed.inject(RxStrategyProvider);
  });

  describe.each([
    ['immediate'],
    ['userBlocking'],
    ['normal'],
    ['low'],
    ['idle'],
  ])('Strategy: %p', (strategy) => {
    describe('parent: true', () => {
      beforeEach(() => {
        componentInstance.strategy = strategy;
        componentInstance.value$.next(42);
        componentInstance.withParent = true;
      });

      it('should update ViewChild', (done) => {
        const behavior = strategyProvider.strategies[strategy].behavior;
        componentInstance.rendered$
          .pipe(
            behavior({
              work: () => {},
            }),
            delay(0, asapScheduler)
          )
          .subscribe(() => {
            expect(componentInstance.viewChild).toBeDefined();
            done();
          });
        fixture.detectChanges();
        expect(componentInstance.otherChild).toBeDefined();
      });

      it('should update parent', (done) => {
        fixture.detectChanges();
        const cdRef = componentInstance.letChildren.first.cdRef;
        cdRef.detectChanges = jest.fn();
        const behavior = strategyProvider.strategies[strategy].behavior;
        componentInstance.rendered$
          .pipe(
            behavior({
              work: () => {},
            }),
            delay(0, asapScheduler)
          )
          .subscribe(() => {
            expect(cdRef.detectChanges).toHaveBeenCalled();
            done();
          });
      });

      it('should scope parent notifications', (done) => {
        fixture.detectChanges();
        const cdRef = componentInstance.letChildren.first.cdRef;
        const cdRef2 = componentInstance.letChildren.last.cdRef;
        expect(cdRef2).toEqual(cdRef);
        cdRef.detectChanges = jest.fn();
        const behavior = strategyProvider.strategies[strategy].behavior;
        componentInstance.rendered$
          .pipe(
            behavior({
              work: () => {},
            }),
            delay(0, asapScheduler)
          )
          .subscribe(() => {
            expect(cdRef.detectChanges).toHaveBeenCalledTimes(1);
            done();
          });
      });
    });

    describe('parent: false', () => {
      beforeEach(() => {
        componentInstance.strategy = strategy;
        componentInstance.value$.next(42);
        componentInstance.withParent = false;
      });

      it('should not update ViewChild', (done) => {
        const behavior = strategyProvider.strategies[strategy].behavior;
        componentInstance.rendered$
          .pipe(
            behavior({
              work: () => {},
            }),
            delay(0, asapScheduler)
          )
          .subscribe(() => {
            expect(componentInstance.viewChild).not.toBeDefined();
            done();
          });
        fixture.detectChanges();
        expect(componentInstance.otherChild).toBeDefined();
      });

      it('should not update parent', (done) => {
        fixture.detectChanges();
        const cdRef = componentInstance.letChildren.first.cdRef;
        cdRef.detectChanges = jest.fn();
        const behavior = strategyProvider.strategies[strategy].behavior;
        componentInstance.rendered$
          .pipe(
            behavior({
              work: () => {},
            }),
            delay(0, asapScheduler)
          )
          .subscribe(() => {
            expect(cdRef.detectChanges).not.toHaveBeenCalled();
            done();
          });
      });
    });
  });
});
