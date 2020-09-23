import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatRipple } from '@angular/material/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'renders',
  templateUrl: './num-render.component.html',
  styleUrls: ['./num-render.component.scss'],
})
export class NumRenderComponent implements AfterViewInit {
  @ViewChild(MatRipple) ripple: MatRipple;

  renders = 0;

  @Input()
  radius = 40
  @Input()
  color = 'rgba(253,255,0,0.24)'

  constructor() {}

  ngAfterViewInit(): void {
    this.ripple.launch({ centered: true });
  }

  render() {
    if (this.ripple) {
      this.ripple.launch({ centered: true });
    }
    return ++this.renders;
  }
}
