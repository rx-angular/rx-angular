import { isPlatformServer } from '@angular/common';
import { Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import { rxState } from '@rx-angular/state';
import { RxFor } from '@rx-angular/template/for';
import { RxLet } from '@rx-angular/template/let';
import { RxPush } from '@rx-angular/template/push';
import { RxUnpatch } from '@rx-angular/template/unpatch';
import { of } from 'rxjs';

@Component({
  selector: 'rx-angular-root',
  template: `
    <div id="let" *rxLet="color$; let color">{{ color }}</div>
    <div id="push">{{ color$ | push }}</div>
    <div id="unpatch" [unpatch]="['click']" (click)="onClick()"></div>
    <div class="for" *rxFor="let color of colors$">{{ color }}</div>
  `,
  imports: [RxPush, RxLet, RxUnpatch, RxFor],
})
export class AppComponent implements OnInit {
  private readonly state = rxState<{ color: string; colors: string[] }>(
    ({ set, connect }) => {
      set('color', () => 'red');
      connect('colors', of(['red']));
    },
  );

  readonly color$ = this.state.select('color');
  readonly colors$ = this.state.select('colors');

  constructor(@Inject(PLATFORM_ID) private platformId: string) {}

  ngOnInit() {
    if (isPlatformServer(this.platformId)) {
      this.state.set('color', () => 'green');
      this.state.set('colors', () => ['green', 'purple']);
    }
  }

  // Just a dummy method to ensure that the `unpatch` directive is instantiated w/o exceptions
  // on the server side.
  onClick(): void {
    console.log(NgZone.isInAngularZone());
  }
}
