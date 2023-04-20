import { DebugElement, NgZone } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { firstValueFrom, of, Subject } from 'rxjs';
import { RxStyleModule } from '../style.module';
import { createTestComponent, TestComponent } from './fixtures';

describe('RxStyle strategies', () => {
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
      `<div [rxStyle]="expr" [rxStyleRenderCallback]="renderedValue$" [rxStyleStrategy]="strategy"></div>`
    );
    getComponent().expr = { 'width.px': of(40) };
    getComponent().renderedValue$ = new Subject();
  });

  describe('ngZone', () => {
    let ngZone: NgZone;

    beforeEach(() => {
      ngZone = TestBed.inject(NgZone);
    });

    afterEach(() => {
      ngZone = null;
    });

    it('should run outside ngZone', async () => {
      getComponent().strategy = 'normal';
      fixture.detectChanges();
      const ngZoneSpy = jest.spyOn(ngZone, 'run');
      const renderedValue = await firstValueFrom(getComponent().renderedValue$);
      expect(renderedValue).toEqual({ 'width.px': 40 });
      expect(ngZoneSpy).toHaveBeenCalledTimes(1);
      ngZoneSpy.mockReset();
    });
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
      'should render with given strategy',
      waitForAsync(async () => {
        getComponent().strategy = strategy;
        const promise = firstValueFrom(getComponent().renderedValue$);
        fixture.detectChanges();
        const renderedValue = await promise;
        expect(renderedValue).toEqual({ 'width.px': 40 });
        expect(getElement().styles).toEqual({ width: '40px' });
      })
    );
  });
});
