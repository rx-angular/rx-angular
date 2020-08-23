import { Component, OnInit, ViewChild } from '@angular/core';
import { MatRipple } from '@angular/material/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'renders',
  templateUrl: './num-render.component.html',
  styleUrls: ['./num-render.component.scss'],
})
export class NumRenderComponent implements OnInit {
  @ViewChild(MatRipple) ripple: MatRipple;

  renders = 0;

  constructor() {}

  ngOnInit(): void {}

  render() {
    if (this.ripple) {
      this.ripple.launch({ centered: true });
    }
    return ++this.renders;
  }
}
