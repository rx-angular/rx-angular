import { Component, OnInit } from '@angular/core';
// tslint:disable-next-line: nx-enforce-module-boundaries
import { environment } from 'apps/demos/src/environments/environment';

@Component({
  selector: 'rxa-rx-let-poc',
  templateUrl: './rx-let-poc.component.html',
  changeDetection: environment.changeDetection,
  host: {
    class: 'm-1 p-1',
    style: 'display: block;',
  },
})
export class RxLetPocComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
