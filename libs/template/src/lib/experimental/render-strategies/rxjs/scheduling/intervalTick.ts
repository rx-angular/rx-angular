import { Observable } from 'rxjs';

export const intervalTick = () =>
  new Observable<number>((subscriber) => {
    const id = (window as any).__zone_symbol__setInterval(() => {
      subscriber.next(0);
      subscriber.complete();
    });

    return () => {
      (window as any).__zone_symbol__clearInterval(id);
    };
  });
