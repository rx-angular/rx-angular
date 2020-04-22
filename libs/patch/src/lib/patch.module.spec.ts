import { async, TestBed } from '@angular/core/testing';
import { PatchModule } from './patch.module';

describe('PatchModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PatchModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PatchModule).toBeDefined();
  });
});
