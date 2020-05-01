import {
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { EMPTY, interval, NEVER, Observable, of, throwError } from 'rxjs';
import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { LetDirective } from '../../src/lib/let';
import { take } from 'rxjs/operators';
import { MockChangeDetectorRef } from '../fixtures';

@Component({
  template: `
    <ng-container *rxLet="value$; $complete as complete">{{
      complete
    }}</ng-container>
  `
})
class LetDirectiveTestCompleteComponent {
  value$: Observable<number> = of(42);
}

let fixtureLetDirectiveTestComponent: any;
let letDirectiveTestComponent: {
  strategy: any;
  value$: Observable<any> | undefined | null;
};
let componentNativeElement: any;

const setupLetDirectiveTestComponentComplete = (): void => {
  TestBed.configureTestingModule({
    declarations: [LetDirectiveTestCompleteComponent, LetDirective],
    providers: [
      { provide: ChangeDetectorRef, useClass: MockChangeDetectorRef },
      TemplateRef,
      ViewContainerRef
    ]
  });

  fixtureLetDirectiveTestComponent = TestBed.createComponent(
    LetDirectiveTestCompleteComponent
  );
  letDirectiveTestComponent =
    fixtureLetDirectiveTestComponent.componentInstance;
  componentNativeElement = fixtureLetDirectiveTestComponent.nativeElement;
};

describe('LetDirective when complete', () => {
  beforeEach(async(setupLetDirectiveTestComponentComplete));

  it('should render true if completed', () => {
    letDirectiveTestComponent.value$ = EMPTY;
    fixtureLetDirectiveTestComponent.detectChanges();
    expect(componentNativeElement.textContent).toBe('true');
  });
});
