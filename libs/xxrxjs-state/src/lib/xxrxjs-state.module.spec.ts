import { async, TestBed } from '@angular/core/testing';
import { XxrxjsStateModule } from './xxrxjs-state.module';

describe('XxrxjsStateModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [XxrxjsStateModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(XxrxjsStateModule).toBeDefined();
  });
});
