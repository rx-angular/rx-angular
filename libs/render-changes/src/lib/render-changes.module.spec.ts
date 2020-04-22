import { async, TestBed } from '@angular/core/testing';
import { RenderChangesModule } from './render-changes.module';

describe('RenderChangesModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RenderChangesModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(RenderChangesModule).toBeDefined();
  });
});
