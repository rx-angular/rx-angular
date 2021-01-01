import { Observable } from 'rxjs';

export const timeoutTick = () =>
  new Observable<number>((subscriber) => {
    const id = (window as any).__zone_symbol__setTimeout(() => {
      subscriber.next(0);
      subscriber.complete();
    });

    return () => {
      (window as any).__zone_symbol__clearTimeout(id);
    };
  });
