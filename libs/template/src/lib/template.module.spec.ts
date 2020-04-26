import { Component, Type, ViewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { from } from 'rxjs';

import { LetDirective } from './let';
import { TemplateModule } from './template.module';

function createHostComponent<T>(hostComponentType: Type<T>): T {
  TestBed.configureTestingModule({
    declarations: [hostComponentType],
    imports: [TemplateModule]
  });

  TestBed.compileComponents();

  const fixture = TestBed.createComponent(hostComponentType);
  fixture.detectChanges();

  return fixture.componentInstance;
}

@Component({
  template: `
    <p *rxLet="observableNumber$ as n">My number is {{ n }}</p>
  `
})
class TestLetDirectiveHostComponent {
  @ViewChild(LetDirective)
  letDirective: LetDirective<number>;

  observableNumber$ = from([1, 2, 3]);
}

@Component({
  template: `
    <p>My number is {{ observableNumber$ | push }}</p>
  `
})
class TestPushPipeHostComponent {
  observableNumber$ = from([1, 2, 3]);
}

describe('TemplateModule', () => {
  it('exports the let directive', () => {
    let host: TestLetDirectiveHostComponent;

    expect(
      () => (host = createHostComponent(TestLetDirectiveHostComponent))
    ).not.toThrow();

    const letDirective = host.letDirective;
    expect(letDirective).toBeDefined();
  });

  it('exports the push pipe', () => {
    expect(() => createHostComponent(TestPushPipeHostComponent)).not.toThrow();
  });
});
