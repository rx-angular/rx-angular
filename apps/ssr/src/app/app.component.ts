import { isPlatformServer } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'rx-angular-root',
  template: `
    <div id="let" *rxLet="color$ as color; strategy: 'native'">{{ color }}</div>
    <div id="push">{{ color$ | push: 'native' }}</div>`,
})
export class AppComponent implements OnInit {
  color$ = new BehaviorSubject('red');

  // eslint-disable-next-line @typescript-eslint/ban-types
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformServer(this.platformId)) {
      this.color$.next('green');
    }
  }
}
