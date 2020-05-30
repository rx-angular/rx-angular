import { of } from 'rxjs';
import { renderChangeWith } from './operator/renderChangeWith';

export function renderChange(strategy): void {
  of(undefined).pipe(renderChangeWith(strategy)).subscribe();
}
