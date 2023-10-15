import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { rxState } from './rx-state';
import { Component, Injectable } from '@angular/core';
import { Subject, map, merge } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { TestScheduler } from 'rxjs/testing';
import { jestMatcher } from '@test-helpers/rx-angular';

@Component({
  selector: 'rx-counter',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <button id="increment" (click)="increment.next()">Increment</button>
    <button id="decrement" (click)="decrement.next()">Decrement</button>
    <div id="counter">{{ count$ | async }}</div>
  `,
})
export class CounterComponent {
  readonly increment = new Subject<void>();
  readonly decrement = new Subject<void>();

  private readonly state = rxState<{ count: number }>(({ connect, set }) => {
    set({ count: 0 });
    connect(
      'count',
      merge(
        this.increment.pipe(map(() => 1)),
        this.decrement.pipe(map(() => -1))
      ),
      ({ count }, slice) => count + slice
    );
  });

  readonly count$ = this.state.select('count');
}

describe('CounterComponent', () => {
  let fixture: ComponentFixture<CounterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CounterComponent],
    });
    fixture = TestBed.createComponent(CounterComponent);
  });

  it('should increment', () => {
    const incrementButton = fixture.debugElement.query(By.css('#increment'));
    incrementButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('#counter')).nativeElement.textContent
    ).toBe('1');
  });

  it('should decrement', () => {
    const decrementButton = fixture.debugElement.query(By.css('#decrement'));
    decrementButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('#counter')).nativeElement.textContent
    ).toBe('-1');
  });
});

@Injectable()
export class CounterService {
  readonly increment = new Subject<void>();
  readonly decrement = new Subject<void>();

  private readonly state = rxState<{ count: number }>(({ connect, set }) => {
    set({ count: 0 });
    connect(
      'count',
      merge(
        this.increment.pipe(map(() => 1)),
        this.decrement.pipe(map(() => -1))
      ),
      ({ count }, slice) => count + slice
    );
  });

  readonly count$ = this.state.select('count');
}

const testScheduler = new TestScheduler(jestMatcher);

describe('CounterService', () => {
  let service: CounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CounterService],
    });
    service = TestBed.inject(CounterService);
  });

  it('should increment', () => {
    testScheduler.run(({ expectObservable }) => {
      service.increment.next();
      expectObservable(service.count$).toBe('a', { a: 1 });
    });
  });

  it('should decrement', () => {
    testScheduler.run(({ expectObservable }) => {
      service.decrement.next();
      expectObservable(service.count$).toBe('a', { a: -1 });
    });
  });
});
