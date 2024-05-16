import {
  Component,
  ElementRef,
  ErrorHandler,
  QueryList,
  ViewChildren,
  viewChildren,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  RxRenderBehavior,
  RxStrategyProvider,
} from '@rx-angular/cdk/render-strategies';
import { mockConsole } from '@test-helpers/rx-angular';
import { asapScheduler, delay } from 'rxjs';
import { RxFor } from '../for.directive';
import { TestComponent } from './fixtures';

const testTemplate = `<div>
    <span
      #listChild
      *rxFor="let item of itemsCold$; strategy: strategy; parent: parent"
      >{{ item.toString() }};</span
    >
    <span
      *rxFor="
        let item of itemsCold$;
        strategy: strategy;
        renderCallback: renderedValue$;
        parent: parent
      "
      >{{ item.toString() }};</span
    >
  </div>`;

@Component({
  selector: 'rx-test-cmp',
  template: testTemplate,
})
class ParentNotifyTestComponent extends TestComponent {
  @ViewChildren('listChild')
  listChildren: QueryList<ElementRef<HTMLSpanElement>>;
  @ViewChildren(RxFor)
  forChildren: QueryList<RxFor<number>>;
}

@Component({
  selector: 'rx-test-cmp',
  template: testTemplate,
  imports: [RxFor],
  standalone: true,
})
class ParentNotifySignalTestComponent extends TestComponent {
  parent = false;
  listChildren = viewChildren('listChild');
  forChildren = viewChildren(RxFor);
}

async function rendered(component: TestComponent, behavior: RxRenderBehavior) {
  return new Promise<void>((resolve) => {
    component.renderedValue$
      .pipe(
        behavior({
          work: () => {},
        }),
        delay(0, asapScheduler),
      )
      .subscribe(() => {
        resolve();
      });
  });
}

describe('rxFor parent-notifications', () => {
  let strategyProvider: RxStrategyProvider;
  let behavior: RxRenderBehavior;

  function forEachStrategy(testFn: (strategy: string) => void) {
    describe.each([
      ['immediate'],
      ['userBlocking'],
      ['normal'],
      ['low'],
      ['idle'],
    ])('Strategy: %p', (strategy) => {
      beforeEach(() => {
        behavior = strategyProvider.strategies[strategy].behavior;
      });

      testFn(strategy);
    });
  }

  describe('legacy queries', () => {
    let fixture: ComponentFixture<ParentNotifyTestComponent>;
    let errorHandler: ErrorHandler;
    let component: ParentNotifyTestComponent;

    afterEach(() => {
      fixture = null as any;
      errorHandler = null as any;
    });

    beforeAll(() => {
      mockConsole();
    });

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ParentNotifyTestComponent],
        imports: [RxFor],
        teardown: { destroyAfterEach: true },
      });
      fixture = TestBed.createComponent(ParentNotifyTestComponent);
      component = fixture.componentInstance;
      strategyProvider = TestBed.inject(RxStrategyProvider);
    });

    forEachStrategy((strategy) => {
      describe('parent: true', () => {
        beforeEach(() => {
          component.strategy = strategy;
          component.parent = true;
          fixture.detectChanges();
          component.itemsCold$.next([1, 2]);
        });

        it('should update ViewChild', async () => {
          await rendered(component, behavior);
          expect(component.listChildren.length).toBe(2);
        });

        it('should update parent', async () => {
          const cdRef = (component.forChildren.first as any).cdRef;
          cdRef.detectChanges = jest.fn();
          await rendered(component, behavior);
          expect(cdRef.detectChanges).toHaveBeenCalled();
        });

        it('should scope parent notifications', async () => {
          const cdRef = (component.forChildren.first as any).cdRef;
          const cdRef2 = (component.forChildren.last as any).cdRef;
          expect(cdRef2).toEqual(cdRef);
          cdRef.detectChanges = jest.fn();
          await rendered(component, behavior);
          expect(cdRef.detectChanges).toHaveBeenCalledTimes(1);
        });
      });

      describe('parent: false', () => {
        beforeEach(() => {
          component.strategy = strategy;
          component.parent = false;
          fixture.detectChanges();
          component.itemsCold$.next([1, 2]);
        });

        it('should not update ViewChild', async () => {
          await rendered(component, behavior);
          expect(component.listChildren.length).toBe(0);
        });

        it('should not update parent', async () => {
          const cdRef = (component.forChildren.first as any).cdRef;
          cdRef.detectChanges = jest.fn();
          const behavior = strategyProvider.strategies[strategy].behavior;
          await rendered(component, behavior);
          expect(cdRef.detectChanges).not.toHaveBeenCalled();
        });
      });
    });

    /*describe.each([
      ['immediate'],
      ['userBlocking'],
      ['normal'],
      ['low'],
      ['idle'],
    ])('Strategy: %p', (strategy) => {
      let behavior: RxRenderBehavior;

      beforeEach(() => {
        behavior = strategyProvider.strategies[strategy].behavior;
      });



    });*/
  });

  describe('signal queries', () => {
    let fixture: ComponentFixture<ParentNotifySignalTestComponent>;
    let component: ParentNotifySignalTestComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ParentNotifySignalTestComponent],
      });
      fixture = TestBed.createComponent(ParentNotifySignalTestComponent);
      component = fixture.componentInstance;
      strategyProvider = TestBed.inject(RxStrategyProvider);
    });

    forEachStrategy((strategy) => {
      describe('parent: false', () => {
        beforeEach(() => {
          component.strategy = strategy;
          fixture.detectChanges();
          component.itemsCold$.next([1, 2]);
        });

        it('should update viewchildren', async () => {
          await rendered(component, behavior);
          expect(component.listChildren().length).toBe(2);
        });

        it('should not update parent', async () => {
          const cdRef = (component.forChildren()[0] as any)?.cdRef;
          cdRef.detectChanges = jest.fn();
          const behavior = strategyProvider.strategies[strategy].behavior;
          await rendered(component, behavior);
          expect(cdRef.detectChanges).not.toHaveBeenCalled();
        });
      });
    });
  });
});
