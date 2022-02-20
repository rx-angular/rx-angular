import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RxStrategyProvider } from '@rx-angular/cdk/render-strategies';
import { BehaviorSubject, of } from 'rxjs';
import { ClassDirective } from '../class.directive';

@Component({
  selector: 'rx-test-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class='container-one'
      [rxClass]='containerOneClasses$'
    ></div>
    <div
      class='container-two'
      [rxClass]='containerTwoClasses$'
    ></div>
    <div
      class='container-three'
      [rxClass]="{
        'class-one': setClassOne$,
        'class-two': setClassTwo$
      }"
    ></div>
    <div
      class='container-four'
      [rxClass]='containerFourClasses$'
    ></div>
    <div
      class='container-five'
      [rxClass]='containerFiveClasses$'
    ></div>
    <div
      class='container-six'
      [rxClass]='containerSixClass$'
    ></div>
  `
})
class TestComponent {
  readonly containerOneClasses$ = of({
    'class-one': true,
    'class-two': true
  });
  readonly containerTwoClasses$ = of(['class-one', 'class-two']);
  readonly containerFourClasses$ = new BehaviorSubject<string[]>([
    'class-one',
    'class-two'
  ]);
  readonly containerFiveClasses$ = new BehaviorSubject<Set<string>>(
    new Set(['class-one', 'class-two'])
  );
  readonly containerSixClass$ = new BehaviorSubject<string>('class-one');
  readonly setClassOne$ = of(true);
  readonly setClassTwo$ = of(false);
}

describe('rxClass', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TestComponent, ClassDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: RxStrategyProvider,
          useValue: new RxStrategyProvider({ primaryStrategy: 'native' }),
        }
      ]
    }).createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should set rxClasses in the container-one', () => {
    const rxClasses = ['class-one', 'class-two'];
    const container = fixture.debugElement.query(By.css('.container-one'));
    const classes = Object.entries(container.classes).reduce((acc, [key, value]) => (
      value ? [...acc, key] : [...acc]
    ), []);
    rxClasses.forEach((klass) => {
      expect(classes).toContain(klass);
    });
  });

  it('should set rxClasses in the container-two', () => {
    const rxClasses = ['class-one', 'class-two'];
    const container = fixture.debugElement.query(By.css('.container-two'));
    const classes = Object.entries(container.classes).reduce((acc, [key, value]) => (
      value ? [...acc, key] : [acc]
    ), []);
    rxClasses.forEach((klass) => {
      expect(classes).toContain(klass);
    });
  });

  it('should set class-one in the container-three', () => {
    const container = fixture.debugElement.query(By.css('.container-three'));
    const classes = Object.entries(container.classes).reduce((acc, [key, value]) => (
      value ? [...acc, key] : [...acc]
    ), []);
    expect(classes).toContain('class-one');
  });

  it('should replace previously set classes in the container-four', () => {
    fixture.componentInstance.containerFourClasses$.next([
      'class-one',
      'class-three'
    ]);
    fixture.detectChanges();
    const container = fixture.debugElement.query(By.css('.container-four'));
    const classes = Object.entries(container.classes).reduce((acc, [key, value]) => (
      value ? [...acc, key] : [...acc]
    ), []);
    expect(classes).not.toContain('class-two');
    expect(classes).toContain('class-one');
    expect(classes).toContain('class-three');
  });

  it('should replace previously set classes when using Set in the container-five', () => {
    fixture.componentInstance.containerFiveClasses$.next(
      new Set(['class-one', 'class-three'])
    );
    fixture.detectChanges();
    const container = fixture.debugElement.query(By.css('.container-five'));
    const classes = Object.entries(container.classes).reduce((acc, [key, value]) => (
      value ? [...acc, key] : [...acc]
    ), []);
    expect(classes).not.toContain('class-two');
    expect(classes).toContain('class-one');
    expect(classes).toContain('class-three');
  });

  it('should replace previously set classes with null in the container-five', () => {
    fixture.componentInstance.containerFiveClasses$.next(
      null
    );
    fixture.detectChanges();
    const container = fixture.debugElement.query(By.css('.container-five'));
    const classes = Object.entries(container.classes).reduce((acc, [key, value]) => (
      value ? [...acc, key] : [...acc]
    ), []);
    expect(classes).not.toContain('class-two');
    expect(classes).not.toContain('class-one');
  });

  it('should set class-one and replace it with class-two in the container-six', () => {
    const container = fixture.debugElement.query(By.css('.container-six'));
    const classes = Object.entries(container.classes).reduce((acc, [key, value]) => (
      value ? [...acc, key] : [...acc]
    ), []);
    expect(classes).toContain('class-one');
    fixture.componentInstance.containerSixClass$.next('class-two');
    fixture.detectChanges();
    const container2 = fixture.debugElement.query(By.css('.container-six'));
    const classes2 = Object.entries(container2.classes).reduce((acc, [key, value]) => (
      value ? [...acc, key] : [...acc]
    ), []);
    expect(classes2).not.toContain('class-one');
    expect(classes2).toContain('class-two');
  });
});
