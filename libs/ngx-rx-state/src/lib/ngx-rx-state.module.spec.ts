import { async, TestBed } from '@angular/core/testing';
import { NgxRxStateModule } from './ngx-rx-state.module';

describe('NgxRxStateModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxRxStateModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgxRxStateModule).toBeDefined();
  });
});
