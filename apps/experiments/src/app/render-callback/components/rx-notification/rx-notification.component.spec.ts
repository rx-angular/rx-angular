import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxNotificationComponent } from './rx-notification.component';

describe('RxNotificationComponent', () => {
  let component: RxNotificationComponent;
  let fixture: ComponentFixture<RxNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RxNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RxNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
