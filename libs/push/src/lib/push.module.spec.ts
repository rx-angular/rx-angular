import { async, TestBed } from '@angular/core/testing';
import { PushModule } from './push.module';

describe('PushModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PushModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PushModule).toBeDefined();
  });
});
