import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListToggleTestComponentComponent } from './list-toggle-test-component.component';

describe('ListToggleTestComponentComponent', () => {
  let component: ListToggleTestComponentComponent;
  let fixture: ComponentFixture<ListToggleTestComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListToggleTestComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListToggleTestComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
