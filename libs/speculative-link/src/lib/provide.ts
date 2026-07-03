import { withPreloading } from '@angular/router';
import { SpeculativeLinkPreloader } from './speculative-link-preloader.service';

export function withSpeculativeLinkPreloading() {
  return withPreloading(SpeculativeLinkPreloader);
}
