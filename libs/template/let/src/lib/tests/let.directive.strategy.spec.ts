import { Component, NgZone } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RxStrategyProvider } from '@rx-angular/cdk/render-strategies';
import { BehaviorSubject, firstValueFrom, Observable, of, Subject } from 'rxjs';

import { LetDirective } from '../let.directive';
import Spy = jasmine.Spy;
import SpyInstance = jest.SpyInstance;

@Component({
  template: `
    <ng-container
      *rxLet="
        value$;
        let value;
        strategy: strategy;
        patchZone: patchZone;
        renderCallback: renderedValue$
      "
      >{{ (value | json) || 'undefined' }}</ng-container
    >
  `,
})
class LetDirectiveTestStrategyComponent {
  value$: Observable<number> = new BehaviorSubject<number>(42);
  renderedValue$ = new Subject<number>();
  strategy: string;
  patchZone = true;
}

let fixture: ComponentFixture<LetDirectiveTestStrategyComponent>;
let componentInstance: LetDirectiveTestStrategyComponent;
let componentNativeElement: HTMLElement;
let primaryStrategy: string;
let strategyProvider: RxStrategyProvider;

describe('LetDirective strategies', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LetDirectiveTestStrategyComponent, LetDirective],
      teardown: { destroyAfterEach: true },
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LetDirectiveTestStrategyComponent);
    componentInstance = fixture.componentInstance;
    componentNativeElement = fixture.nativeElement;
    strategyProvider = TestBed.inject(RxStrategyProvider);
    primaryStrategy = strategyProvider.primaryStrategy;
  });

  describe('ngZone', () => {
    let ngZone: NgZone;

    beforeEach(() => {
      ngZone = TestBed.inject(NgZone);
    });

    it('should run outside ngZone', async () => {
      componentInstance.strategy = 'normal';
      componentInstance.patchZone = false;
      fixture.detectChanges();
      const ngZoneSpy = jest.spyOn(ngZone, 'run');
      const v = await firstValueFrom(componentInstance.renderedValue$);
      expect(v).toBe(42);
      expect(ngZoneSpy).toHaveBeenCalledTimes(1);
      ngZoneSpy.mockReset();
    });

    it('should run inside ngZone', async () => {
      componentInstance.strategy = 'normal';
      fixture.detectChanges();
      const ngZoneSpy = jest.spyOn(ngZone, 'run');
      const v = await firstValueFrom(componentInstance.renderedValue$);
      expect(v).toBe(42);
      expect(ngZoneSpy).toHaveBeenCalledTimes(2);
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
    it('should render with given strategy', (done) => {
      componentInstance.strategy = strategy;
      componentInstance.renderedValue$.subscribe((v) => {
        expect(v).toBe(42);
        done();
      });
      fixture.detectChanges();
    });
    it('should not affect primary strategy', (done) => {
      componentInstance.strategy = strategy;
      componentInstance.renderedValue$.subscribe((v) => {
        expect(v).toBe(42);
        expect(strategyProvider.primaryStrategy).toBe(primaryStrategy);
        done();
      });
      fixture.detectChanges();
    });
  });
});
