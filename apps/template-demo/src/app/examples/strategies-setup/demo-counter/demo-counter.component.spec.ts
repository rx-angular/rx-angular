import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoCounterComponent } from './demo-counter.component';

describe('DemoCounterComponent', () => {
  let component: DemoCounterComponent;
  let fixture: ComponentFixture<DemoCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoCounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
