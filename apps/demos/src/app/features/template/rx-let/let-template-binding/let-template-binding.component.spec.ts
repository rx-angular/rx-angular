import { StaticProvider } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { RX_RENDER_STRATEGIES_CONFIG } from '@rx-angular/cdk/render-strategies';
import { RxState } from '@rx-angular/state';

import { LetTemplateBindingComponent } from './let-template-binding.component';
import { LetTemplateBindingModule } from './let-template-binding.module';

const RX_ANGULAR_TEST_PROVIDER: StaticProvider = {
  provide: RX_RENDER_STRATEGIES_CONFIG,
  useValue: {
    primaryStrategy: 'native',
  },
};

describe(LetTemplateBindingComponent.name, () => {
  let fixture: ComponentFixture<LetTemplateBindingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        LetTemplateBindingModule,
        RouterTestingModule,
        NoopAnimationsModule,
      ],
      providers: [RxState, RX_ANGULAR_TEST_PROVIDER],
    }).compileComponents();

    fixture = TestBed.createComponent(LetTemplateBindingComponent);
  });

  it('should render asynchronously', () => {
    const contentElement = fixture.debugElement.query(
      By.css('mat-card-content')
    ).nativeElement as HTMLElement;

    /* In devMode the compiler renders HTML comments. */
    expect(contentElement.innerHTML).toBe('<!--container-->');
  });

  it('should render the suspense template', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    const loaderElement = fixture.debugElement.query(
      By.css('mat-progress-spinner')
    ).nativeElement;

    expect(loaderElement).toBeDefined();
  });

  it('should render the value template', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    fixture.debugElement
      .query(By.css('.next'))
      .triggerEventHandler('click', {});

    fixture.detectChanges();
    await fixture.whenStable();

    const contentElement = fixture.debugElement.query(
      By.css('mat-card-content')
    ).nativeElement as HTMLElement;
    const valueElement = fixture.debugElement.query(By.css('h2'))
      .nativeElement as HTMLElement;

    expect(contentElement.innerHTML).toContain('value emitted');
    expect(valueElement.textContent).toEqual(expect.any(String));
  });

  it('should render the complete template', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    fixture.debugElement
      .query(By.css('.complete'))
      .triggerEventHandler('click', {});

    fixture.detectChanges();
    await fixture.whenStable();

    const contentElement = fixture.debugElement.query(
      By.css('mat-card-content')
    ).nativeElement as HTMLElement;

    expect(contentElement.innerHTML).toContain('Completed!');
  });

  it('should render the error template', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    fixture.debugElement
      .query(By.css('.error'))
      .triggerEventHandler('click', {});

    fixture.detectChanges();
    await fixture.whenStable();

    const contentElement = fixture.debugElement.query(
      By.css('mat-card-content')
    ).nativeElement as HTMLElement;

    expect(contentElement.innerHTML).toContain('Template observable error!');
  });
});
