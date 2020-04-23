import { async, TestBed } from '@angular/core/testing';
import { TemplateModule } from './template.module';

describe('TemplateModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TemplateModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(TemplateModule).toBeDefined();
  });
});
