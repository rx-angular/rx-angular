import { ChangeDetectorRef, Component, ElementRef, TemplateRef, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RX_ANGULAR_CONFIG } from '@rx-angular/cdk';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { mockConsole } from '@test-helpers';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { LetDirective } from '../../src/lib/let/let.directive';
import { MockChangeDetectorRef, MockElementRef } from '../fixtures';

@Component({
  template: `
    <ng-container *rxLet="value$; let value; renderCallback: renderCallback$">{{value === undefined ? 'undefined' : value === null ? 'null' : value}}</ng-container>
  `
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
    declarations: [LetDirectiveTestComponent, LetDirective],
    providers: [
      { provide: ChangeDetectorRef, useClass: MockChangeDetectorRef },
      TemplateRef,
      ViewContainerRef,
      {
        provide: RX_ANGULAR_CONFIG, useValue: {
          primaryStrategy: 'native'
        }
      }
    ]
  });
  fixtureLetDirectiveTestComponent = TestBed.createComponent(
    LetDirectiveTestComponent
  );
  letDirectiveTestComponent =
    fixtureLetDirectiveTestComponent.componentInstance;
  componentNativeElement = fixtureLetDirectiveTestComponent.nativeElement;
};

describe('LetDirective renderCallback', () => {
  beforeAll(() => mockConsole());
  beforeEach((setupLetDirectiveTestComponent));

  it('should be instantiable', () => {
    expect(fixtureLetDirectiveTestComponent).toBeDefined();
    expect(letDirectiveTestComponent).toBeDefined();
    expect(componentNativeElement).toBeDefined();
  });

  it('should emit the latest value after rendering via renderCallback', done => {
    letDirectiveTestComponent.renderCallback$.subscribe(renderedValue => {
      expect(renderedValue).toBe(42);
      done();
    });
    letDirectiveTestComponent.value$ = new BehaviorSubject(42);
    fixtureLetDirectiveTestComponent.detectChanges();
    expect(componentNativeElement.textContent).toBe('42');
  });
});
