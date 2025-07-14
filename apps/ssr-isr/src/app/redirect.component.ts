import { isPlatformServer } from '@angular/common';
import {
  Component,
  Inject,
  InjectionToken,
  Optional,
  PLATFORM_ID,
} from '@angular/core';
import { Router } from '@angular/router';
import { Response } from 'express';

export const RESPONSE = new InjectionToken<Response>('RESPONSE');

@Component({
  selector: 'app-redirect',
  imports: [],
  template: ``,
  styles: ``,
})
export class RedirectComponent {
  constructor(
    private readonly router: Router,
    @Inject(PLATFORM_ID) private platformId: object,
    @Optional() @Inject(RESPONSE) private response: Response,
  ) {
    if (isPlatformServer(this.platformId) && this.response) {
      this.response.redirect(301, '/');
      this.response.end();
    } else {
      this.router.navigate(['/']);
    }
  }
}
