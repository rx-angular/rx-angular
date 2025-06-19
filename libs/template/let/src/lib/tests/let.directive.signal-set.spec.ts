import { JsonPipe } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Signal,
  signal,
  ViewContainerRef,
  WritableSignal,
} from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { provideRxRenderStrategies } from '@rx-angular/cdk/render-strategies';
import { mockConsole } from '@test-helpers/rx-angular';
import { interval, NEVER } from 'rxjs';
import { take } from 'rxjs/operators';
import { RxLet } from '../let.directive';
import { MockChangeDetectorRef } from './fixtures';

@Component({
  template: `
    <ng-container *rxLet="value; let v">{{
      v === undefined ? 'undefined' : v === null ? 'null' : (v | json)
    }}</ng-container>
  `,
  imports: [RxLet, JsonPipe],
})
class LetDirectiveTestComponent {
  value = signal(42);
}

let fixtureLetDirectiveTestComponent: any;
let letDirectiveTestComponent: {
  strategy: string;
  value: Signal<unknown> | unknown | undefined | null;
};
let componentNativeElement: any;

const setupLetDirectiveTestComponent = (): void => {
  TestBed.configureTestingModule({
    imports: [LetDirectiveTestComponent],
    providers: [
      { provide: ChangeDetectorRef, useClass: MockChangeDetectorRef },
      ViewContainerRef,
      provideRxRenderStrategies({ primaryStrategy: 'native' }),
    ],
    teardown: { destroyAfterEach: true },
  });
  fixtureLetDirectiveTestComponent = TestBed.createComponent(
    LetDirectiveTestComponent,
  );
  letDirectiveTestComponent =
    fixtureLetDirectiveTestComponent.componentInstance;
  componentNativeElement = fixtureLetDirectiveTestComponent.nativeElement;
};

describe('LetDirective with signals as values', () => {
  beforeAll(() => mockConsole());
  beforeEach(setupLetDirectiveTestComponent);

  it('should render undefined as value when initially signal(undefined) was passed (as undefined was emitted)', () => {
    letDirectiveTestComponent.value = signal(undefined);
    TestBed.tick();
    expect(componentNativeElement.textContent).toBe('undefined');
  });

  it('should render null as value when initially signal(null) was passed (as null was emitted)', () => {
    letDirectiveTestComponent.value = signal(null);
    TestBed.tick();
    expect(componentNativeElement.textContent).toBe('null');
  });

  it('should render emitted value from passed signal without changing it', () => {
    letDirectiveTestComponent.value = signal(42);
    TestBed.tick();
    expect(componentNativeElement.textContent).toBe('42');
  });

  it('should render undefined as value when a new observable NEVER was passed (as no value ever was emitted from new observable)', () => {
    letDirectiveTestComponent.value = signal(42);
    TestBed.tick();
    expect(componentNativeElement.textContent).toBe('42');
    letDirectiveTestComponent.value = NEVER;
    TestBed.tick();
    expect(componentNativeElement.textContent).toBe('undefined');
  });

  it('should render new value as value when a new signal was passed', () => {
    TestBed.tick();
    letDirectiveTestComponent.value = signal(42);
    TestBed.tick();
    expect(componentNativeElement.textContent).toBe('42');
    letDirectiveTestComponent.value = signal(45);
    TestBed.tick();
    TestBed.tick();
    TestBed.tick();
    expect(componentNativeElement.textContent).toBe('45');
  });

  it('should render the last value when a new signal was passed', () => {
    letDirectiveTestComponent.value = signal(42);
    TestBed.tick();
    expect(componentNativeElement.textContent).toBe('42');

    (letDirectiveTestComponent.value as WritableSignal<number>).set(45);
    TestBed.tick();
    expect(componentNativeElement.textContent).toBe('45');
  });

  it('should render values over time when a new signal was passed', fakeAsync(() => {
    letDirectiveTestComponent.value = signal(undefined);

    interval(1000)
      .pipe(take(3))
      .subscribe((v) => {
        (letDirectiveTestComponent.value as WritableSignal<number>).set(v);
      });

    fixtureLetDirectiveTestComponent.detectChanges();
    expect(componentNativeElement.textContent).toBe('undefined');
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
