import { DebugElement, NgZone } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { firstValueFrom, of, ReplaySubject, Subject } from 'rxjs';
import { RxStyleModule } from '../style.module';
import { createTestComponent, TestComponent } from './fixtures';

describe('RxStyle renderCallback', () => {
  let fixture: ComponentFixture<TestComponent>;

  function getComponent(): TestComponent {
    return fixture.componentInstance;
  }

  function getElement(): DebugElement {
    return fixture.debugElement.children[0];
  }

  afterEach(() => {
    fixture = null;
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [RxStyleModule],
    });
    fixture = createTestComponent(
      `<div [rxStyle]="expr" (rxStyleRenderCallback)="renderCallback($event)" [rxStyleRenderCallback]="renderedValue$" [rxStyleStrategy]="strategy"></div>`
    );
    getComponent().renderedValue$ = new Subject();
    getComponent().strategy = new ReplaySubject(1);
    getComponent().expr = new ReplaySubject(1);
    getComponent().renderCallback = jest.fn();
    fixture.detectChanges();
  });

  describe.each([
    [''] /* <- Invalid strategy should fallback. */,
    ['invalid'] /* <- Same here. */,

    ['immediate'],
    ['userBlocking'],
    ['normal'],
    ['low'],
    ['idle'],
    ['native'],
  ])('Strategy: %p', (strategy) => {
    it(
      'should output rendered value',
      waitForAsync(async () => {
        getComponent().strategy.next(strategy);
        getComponent().expr.next({ 'width.px': 40 });
        const renderedValue = await firstValueFrom(
          getComponent().renderedValue$
        );
        expect(renderedValue).toEqual({ 'width.px': 40 });
        expect(getElement().styles).toEqual({ width: '40px' });
        expect(getComponent().renderCallback).toHaveBeenCalledTimes(1);
        expect(getComponent().renderCallback).toHaveBeenCalledWith({
          'width.px': 40,
        });
      })
    );

    it(
      'should output rendered value on update',
      waitForAsync(async () => {
        getComponent().strategy.next(strategy);
        getComponent().expr.next({ 'width.px': 40 });
        const renderedValue = await firstValueFrom(
          getComponent().renderedValue$
        );
        expect(renderedValue).toEqual({ 'width.px': 40 });
        expect(getElement().styles).toEqual({ width: '40px' });
        expect(getComponent().renderCallback).toHaveBeenCalledTimes(1);
        expect(getComponent().renderCallback).toHaveBeenCalledWith({
          'width.px': 40,
        });

        const updatedPromise = firstValueFrom(getComponent().renderedValue$);

        getComponent().expr.next({ 'width.px': 60 });

        expect(await updatedPromise).toEqual({ 'width.px': 60 });

        expect(getElement().styles).toEqual({ width: '60px' });
        expect(getComponent().renderCallback).toHaveBeenCalledTimes(2);
        expect(getComponent().renderCallback).toHaveBeenCalledWith({
          'width.px': 60,
        });
      })
    );

    it(
      'should not output rendered value when there is no change',
      waitForAsync(async () => {
        getComponent().strategy.next(strategy);
        getComponent().expr.next({ 'width.px': 40 });
        await firstValueFrom(getComponent().renderedValue$);
        expect(getElement().styles).toEqual({ width: '40px' });
        expect(getComponent().renderCallback).toHaveBeenCalledWith({
          'width.px': 40,
        });

        const updatedValuePromise = Promise.race([
          firstValueFrom(getComponent().renderedValue$),
          new Promise((resolve) => setTimeout(() => resolve(false), 20)),
        ]);

        getComponent().expr.next({ 'width.px': 40 });

        expect(await updatedValuePromise).toBe(false);
        expect(getComponent().renderCallback).toHaveBeenCalledTimes(1);
      })
    );
  });
});
