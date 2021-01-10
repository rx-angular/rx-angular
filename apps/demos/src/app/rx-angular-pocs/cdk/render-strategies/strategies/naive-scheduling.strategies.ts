import { RenderBehavior, RenderWork, StrategyCredentials, StrategyCredentialsMap } from '../model/strategy-credentials';
import { mapTo, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { idleCallbackTick, intervalTick, promiseTick, timeoutTick, animationFrameTick } from '../../utils/rxjs/observable';

export function getNaiveSchedulingStrategyCredentialsMap(): StrategyCredentialsMap {
  return {
    promise: createPromiseStrategyCredentials(),
    setTimeout: createSetTimeoutStrategyCredentials(),
    setInterval: createSetIntervalStrategyCredentials(),
    animationFrame: createAnimationFrameStrategyCredentials(),
    idleCallback: createIdleCallbackStrategyCredentials()
  };
}

const work: RenderWork = (cdRef) => cdRef.detectChanges();
const getBehavior: (tick: (w: any) => Observable<number>) => RenderBehavior = (tick) => (_work) => o => o.pipe(switchMap(v => tick(_work).pipe(mapTo(v))));

export function createPromiseStrategyCredentials(): StrategyCredentials {
  return {
    name: 'promise',
    work,
    behavior: getBehavior(promiseTick)
  };
}

export function createSetTimeoutStrategyCredentials(): StrategyCredentials {
  return {
    name: 'setTimeout',
    work,
    behavior: getBehavior(timeoutTick)
  };
}

export function createSetIntervalStrategyCredentials(): StrategyCredentials {
  return {
    name: 'setInterval',
    work,
    behavior: getBehavior(intervalTick)
  };
}

export function createAnimationFrameStrategyCredentials(): StrategyCredentials {
  return {
    name: 'animationFrame',
    work,
    behavior: getBehavior(animationFrameTick)
  };
}

export function createIdleCallbackStrategyCredentials(): StrategyCredentials {
  return {
    name: 'idleCallback',
    work,
    behavior: getBehavior(idleCallbackTick)
  };
}
