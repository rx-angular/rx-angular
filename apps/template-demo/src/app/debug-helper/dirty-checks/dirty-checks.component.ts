import { Component, OnInit, ViewChild } from '@angular/core';
import { MatRipple } from '@angular/material/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'renders',
  template: `
    <div class="num-dirty-checks" matRipple [matRippleColor]="'rgba(68,68,200,0.24)'">
      {{ render() }}
    </div>
    <div class="rx-num-render" matRipple [matRippleColor]="'rgba(68,68,200,0.24)'">
      {{ render() }}
    </div>
  `,
  styleUrls: ['./dirty-checks.component.scss']
})
export class DirtyChecksComponent implements OnInit {
  @ViewChild(MatRipple) ripple: MatRipple;

  renders = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

  render() {
    if (this.ripple) {
      this.ripple.launch({ centered: true });
    }
    return ++this.renders;
  }
}
