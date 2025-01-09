import {
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRxRenderStrategies } from '@rx-angular/cdk/render-strategies';
import { mockConsole } from '@test-helpers/rx-angular';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { RxLet } from '../let.directive';
import { MockChangeDetectorRef } from './fixtures';

@Component({
  template: `
    <ng-container *rxLet="value$; let value; renderCallback: renderCallback$">{{
      value === undefined ? 'undefined' : value === null ? 'null' : value
    }}</ng-container>
  `,
  imports: [RxLet],
})
class LetDirectiveTestComponent {
  value$: Observable<number> = of(42);
  rendered$ = new Subject<number>();
  renderCallback$ = new Subject<number>();
}

let fixtureLetDirectiveTestComponent: any;
let letDirectiveTestComponent: {
  strategy: any;
  value$: Observable<any> | undefined | null;
  renderCallback$: Subject<number>;
};
let componentNativeElement: any;

const setupLetDirectiveTestComponent = (): void => {
  TestBed.configureTestingModule({
    imports: [LetDirectiveTestComponent],
    providers: [
      { provide: ChangeDetectorRef, useClass: MockChangeDetectorRef },
      TemplateRef,
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

describe('LetDirective renderCallback', () => {
  beforeAll(() => mockConsole());
  beforeEach(setupLetDirectiveTestComponent);

  it('should be instantiable', () => {
    expect(fixtureLetDirectiveTestComponent).toBeDefined();
    expect(letDirectiveTestComponent).toBeDefined();
    expect(componentNativeElement).toBeDefined();
  });

  it('should emit the latest value after rendering via renderCallback', (done) => {
    letDirectiveTestComponent.renderCallback$.subscribe((renderedValue) => {
      expect(renderedValue).toBe(42);
      done();
    });
    letDirectiveTestComponent.value$ = new BehaviorSubject(42);
    fixtureLetDirectiveTestComponent.detectChanges();
    expect(componentNativeElement.textContent).toBe('42');
  });
});
