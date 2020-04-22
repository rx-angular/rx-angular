import { async, TestBed } from '@angular/core/testing';
import { LetModule } from './let.module';

describe('LetModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LetModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(LetModule).toBeDefined();
  });
});
