import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumRenderComponent } from './num-render.component';

describe('NumRenderComponent', () => {
  let component: NumRenderComponent;
  let fixture: ComponentFixture<NumRenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumRenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
