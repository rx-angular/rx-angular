import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatRippleModule } from '@angular/material/core';

import { NumRenderComponent } from './num-render.component';

describe('NumRenderComponent', () => {
  let component: NumRenderComponent;
  let fixture: ComponentFixture<NumRenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumRenderComponent ],
      imports: [ CommonModule, MatRippleModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumRenderComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
