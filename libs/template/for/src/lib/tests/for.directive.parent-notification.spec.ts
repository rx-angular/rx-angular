import {
  Component,
  ElementRef,
  ErrorHandler,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  RxRenderBehavior,
  RxStrategyProvider,
} from '@rx-angular/cdk/render-strategies';
import { mockConsole } from '@test-helpers';
import { asapScheduler, delay } from 'rxjs';
import { RxFor } from '../for.directive';
import { ForModule } from '../for.module';
import { TestComponent } from './fixtures';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'test-cmp',
  template: `<div>
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
  </div>`,
})
class ParentNotifyTestComponent extends TestComponent {
  @ViewChildren('listChild')
  listChildren: QueryList<ElementRef<HTMLSpanElement>>;
  @ViewChildren(RxFor)
  forChildren: QueryList<RxFor<number>>;
}

async function rendered(
  component: ParentNotifyTestComponent,
  behavior: RxRenderBehavior
) {
  return new Promise<void>((resolve) => {
    component.renderedValue$
      .pipe(
        behavior({
          work: () => {},
        }),
        delay(0, asapScheduler)
      )
      .subscribe(() => {
        resolve();
      });
  });
}

describe('rxFor parent-notifications', () => {
  let fixture: ComponentFixture<ParentNotifyTestComponent>;
  let errorHandler: ErrorHandler;
  let strategyProvider: RxStrategyProvider;
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
      imports: [ForModule],
      teardown: { destroyAfterEach: true },
    });
    fixture = TestBed.createComponent(ParentNotifyTestComponent);
    component = fixture.componentInstance;
    strategyProvider = TestBed.inject(RxStrategyProvider);
  });

  describe.each([
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
});
