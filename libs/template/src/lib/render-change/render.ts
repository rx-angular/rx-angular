import { of } from 'rxjs';
import { renderChange } from './operator/renderChange';

export function render(strategy): void {
  of(undefined).pipe(renderChange(strategy)).subscribe();
}
