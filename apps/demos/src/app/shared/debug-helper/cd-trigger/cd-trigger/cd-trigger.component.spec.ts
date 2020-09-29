import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdTriggerComponent } from './cd-trigger.component';

describe('CdTriggerComponent', () => {
  let component: CdTriggerComponent;
  let fixture: ComponentFixture<CdTriggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CdTriggerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CdTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
