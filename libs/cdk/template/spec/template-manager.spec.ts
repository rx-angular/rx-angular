import { ErrorHandler, TemplateRef, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RxNotificationKind } from '@rx-angular/cdk/notifications';
import { RX_RENDER_STRATEGIES_CONFIG } from '@rx-angular/cdk/render-strategies';
import { RxTemplateManager } from '@rx-angular/cdk/template';
import { mockConsole } from '@test-helpers';
import { of, ReplaySubject, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  createTestComponent,
  DEFAULT_TEMPLATE,
  ErrorTestComponent,
  TemplateManagerSpecComponent,
} from './fixtures';

const customErrorHandler: ErrorHandler = {
  handleError: jest.fn(),
};

let fixtureComponent: ComponentFixture<TemplateManagerSpecComponent>;
let componentInstance: {
  templateManager: RxTemplateManager<number, any>;
  triggerHandler: ReplaySubject<RxNotificationKind>;
  errorHandler: ErrorHandler;
  templateRef: TemplateRef<any>;
  values$: ReplaySubject<number>;
  latestRenderedValue: any;
};
let componentNativeElement: HTMLElement;
const setupTemplateManagerComponent = (template = DEFAULT_TEMPLATE): void => {
  TestBed.configureTestingModule({
    declarations: [TemplateManagerSpecComponent, ErrorTestComponent],
    providers: [
      { provide: ErrorHandler, useValue: customErrorHandler },
      ViewContainerRef,
      {
        provide: RX_RENDER_STRATEGIES_CONFIG,
        useValue: {
          primaryStrategy: 'test',
          customStrategies: {
            test: {
              name: 'test',
              work: (cdRef) => cdRef.detectChanges(),
              behavior:
                ({ work }) =>
                (o$) =>
                  o$.pipe(tap(() => work())),
            },
          },
        },
      },
    ],
    teardown: { destroyAfterEach: true },
  });

  fixtureComponent = createTestComponent(template);
  componentInstance = fixtureComponent.componentInstance;
  componentNativeElement = fixtureComponent.nativeElement;
};

describe('template-manager', () => {
  beforeAll(() => mockConsole());

  describe('behavior', () => {
    beforeEach(() => setupTemplateManagerComponent());

    it('should be created', () => {
      expect(fixtureComponent).toBeTruthy();
    });

    it('should have customErrorHandler', () => {
      expect(componentInstance.errorHandler).toEqual(customErrorHandler);
    });

    it('should have templateManager', () => {
      fixtureComponent.detectChanges();
      expect(componentInstance.templateManager).toBeTruthy();
    });

    it('should have templateRef', () => {
      fixtureComponent.detectChanges();
      expect(componentInstance.templateRef).toBeTruthy();
    });

    it('should render items', () => {
      fixtureComponent.detectChanges();
      componentInstance.values$.next(1);
      fixtureComponent.detectChanges();
      const componentContent = componentNativeElement.textContent;
      expect(componentContent).toEqual('1');
    });

    describe('exception handling', () => {
      it('should capture errors with errorHandler', () => {
        fixtureComponent.detectChanges();
        componentInstance.values$.next(2);
        try {
          fixtureComponent.detectChanges();
        } catch (e) {}
        expect(customErrorHandler.handleError).toHaveBeenCalled();
      });

      it('should emit error and payload via renderCallback', () => {
        fixtureComponent.detectChanges();
        const items = 2;
        componentInstance.values$.next(items);
        try {
          fixtureComponent.detectChanges();
        } catch (e) {
          expect(componentInstance.latestRenderedValue[0]).toEqual(e);
        }
        expect(customErrorHandler.handleError).toHaveBeenCalled();
      });

      it('should work after an error has been thrown', () => {
        fixtureComponent.detectChanges();
        componentInstance.values$.next(2);
        try {
          fixtureComponent.detectChanges();
        } catch (e) {}
        expect(customErrorHandler.handleError).toHaveBeenCalled();
        componentInstance.values$.next(1);
        fixtureComponent.detectChanges();
        const componentContent = componentNativeElement.textContent;
        expect(componentContent).toEqual('1');
      });
    });
  });

  describe('templates', () => {
    beforeEach(() =>
      setupTemplateManagerComponent(
        `
        <ng-template #tmpl let-v>next</ng-template>
        <ng-template #suspense let-v>suspense</ng-template>
        <ng-template #error let-v>error</ng-template>
        <ng-template #complete let-v>complete</ng-template>
        <span #host></span>
      `
      )
    );

    it('should render suspense template', () => {
      fixtureComponent.detectChanges();
      expect(componentNativeElement.textContent).toBe('suspense');
    });

    it('should render complete template', () => {
      componentInstance.values$ = of(1) as any;
      fixtureComponent.detectChanges();
      expect(componentNativeElement.textContent).toBe('complete');
    });

    it('should render error template', () => {
      componentInstance.values$ = throwError(() => new Error('')) as any;
      fixtureComponent.detectChanges();
      expect(componentNativeElement.textContent).toBe('error');
    });

    describe('triggers', () => {
      it('should render without trigger', () => {
        componentInstance.triggerHandler = undefined;
        fixtureComponent.detectChanges();
        componentInstance.values$.next(1);
        expect(componentNativeElement.textContent).toBe('next');
      });

      it('should render suspense', () => {
        fixtureComponent.detectChanges();
        componentInstance.values$.next(1);
        componentInstance.triggerHandler.next(RxNotificationKind.Suspense);
        expect(componentNativeElement.textContent).toBe('suspense');
      });

      it('should render complete', () => {
        fixtureComponent.detectChanges();
        componentInstance.values$.next(1);
        componentInstance.triggerHandler.next(RxNotificationKind.Complete);
        expect(componentNativeElement.textContent).toBe('complete');
      });

      it('should render error', () => {
        fixtureComponent.detectChanges();
        componentInstance.values$.next(1);
        componentInstance.triggerHandler.next(RxNotificationKind.Error);
        expect(componentNativeElement.textContent).toBe('error');
      });
    });
  });

  describe('context variables', () => {
    beforeEach(() =>
      setupTemplateManagerComponent(
        `
        <ng-template #tmpl
          let-v
          let-suspense="suspense"
          let-error="error"
          let-complete="complete"
          >
          <ng-container *ngIf="v">{{v}}</ng-container>
          <ng-container *ngIf="suspense">suspense</ng-container>
          <ng-container *ngIf="error">error</ng-container>
          <ng-container *ngIf="complete">complete</ng-container>
</ng-template>
        <span #host></span>
      `
      )
    );

    it('should not render initial suspense template', () => {
      fixtureComponent.detectChanges();
      expect(componentNativeElement.textContent).toBe('');
    });

    it('should render suspense template', () => {
      fixtureComponent.detectChanges();
      componentInstance.values$.next(1);
      expect(componentNativeElement.textContent).toBe('1');
      componentInstance.values$.next(undefined);
      expect(componentNativeElement.textContent).toBe('suspense');
    });

    it('should render complete template', () => {
      componentInstance.values$ = of(1) as any;
      fixtureComponent.detectChanges(false);
      expect(componentNativeElement.textContent).toBe('1complete');
    });

    it('should render error template', () => {
      componentInstance.values$ = throwError(() => new Error('')) as any;
      fixtureComponent.detectChanges();
      expect(componentNativeElement.textContent).toBe('error');
    });
  });
});
