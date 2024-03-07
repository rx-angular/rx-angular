import { RxLet } from '../let.directive';
import { TestBed, fakeAsync } from '@angular/core/testing';
import {
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subscribable, BehaviorSubject, Observable } from 'rxjs';
import { MockChangeDetectorRef } from './fixtures';
import { RX_RENDER_STRATEGIES_CONFIG } from '@rx-angular/cdk/render-strategies';
import { mockConsole } from '@test-helpers/rx-angular';

@Component({
  template: `
    <ng-container *rxLet="value$; let val">
      <div>{{ val }}</div>
    </ng-container>
  `,
})
class LetDirectiveTestComponent {
  value$: Subscribable<number> = new BehaviorSubject<number>(0);
}

let fixtureLetDirectiveTestComponent: any;
let letDirectiveTestComponent: {
  strategy: string;
  value$: Observable<unknown> | unknown | undefined | null;
};
let componentNativeElement: any;

const setupLetDirectiveTestComponent = (): void => {
  TestBed.configureTestingModule({
    declarations: [LetDirectiveTestComponent],
    imports: [RxLet],
    providers: [
      { provide: ChangeDetectorRef, useClass: MockChangeDetectorRef },
      TemplateRef,
      ViewContainerRef,
      {
        provide: RX_RENDER_STRATEGIES_CONFIG,
        useValue: {
          primaryStrategy: 'native',
        },
      },
    ],
    teardown: { destroyAfterEach: true },
  });
  fixtureLetDirectiveTestComponent = TestBed.createComponent(
    LetDirectiveTestComponent
  );
  letDirectiveTestComponent =
    fixtureLetDirectiveTestComponent.componentInstance;
  componentNativeElement = fixtureLetDirectiveTestComponent.nativeElement;
};

describe('RxLet Directive with Subscribable input', () => {
  beforeAll(() => mockConsole());
  beforeEach(setupLetDirectiveTestComponent);

  it('should be instantiable', () => {
    expect(fixtureLetDirectiveTestComponent).toBeDefined();
    expect(letDirectiveTestComponent).toBeDefined();
    expect(componentNativeElement).toBeDefined();
  });

  it('should display value from Subscribable', fakeAsync(() => {
    letDirectiveTestComponent.value$ = 42;
    fixtureLetDirectiveTestComponent.detectChanges();
    expect(componentNativeElement.textContent.trim()).toBe('42');
  }));
});
