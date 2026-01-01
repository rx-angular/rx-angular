import { InjectionToken, Provider } from '@angular/core';
import { forceFrameRate, setInputPending } from './scheduler';

export type RX_ANGULAR_SCHEDULER_CONFIGS = 'Framerate' | 'InputPending';

interface RxSchedulerConfigFn {
  kind: RX_ANGULAR_SCHEDULER_CONFIGS;
  providers: Provider[];
}

const RX_SCHEDULER_DEFAULT_FPS = 60;

// set default to 60fps
forceFrameRate(RX_SCHEDULER_DEFAULT_FPS);

export const RX_SCHEDULER_FPS = new InjectionToken<number>(
  'RX_SCHEDULER_FRAMERATE',
  {
    providedIn: 'root',
    factory: () => RX_SCHEDULER_DEFAULT_FPS,
  },
);

/**
 * Provider function to specify a scheduler for `RxState` to perform state updates & emit new values.
 * @param fps
 */
export function withFramerate(fps: number): unknown {
  return {
    kind: 'Framerate',
    providers: [
      {
        provide: RX_SCHEDULER_FPS,
        useFactory: () => {
          forceFrameRate(fps);
          return fps;
        },
      },
    ],
  };
}

interface RxSchedulerInputPendingConfig {
  enabled: boolean;
  includeContinuous: boolean;
}

export const RX_SCHEDULER_INPUT_PENDING =
  new InjectionToken<RxSchedulerInputPendingConfig>(
    'RX_SCHEDULER_INPUT_PENDING',
  );

/**

 */
export function withInputPending(
  config: RxSchedulerInputPendingConfig = {
    enabled: false,
    includeContinuous: false,
  },
): RxSchedulerConfigFn {
  return {
    kind: 'InputPending',
    providers: [
      {
        provide: RX_SCHEDULER_INPUT_PENDING,
        useFactory: () => {
          // initialization logic here
          setInputPending(config.enabled, config.includeContinuous);
          return config;
        },
      },
    ],
  };
}

/**
 *
 */
export function provideConcurrentSchedulerConfig(
  ...configs: RxSchedulerConfigFn[]
): Provider[] {
  return flatten(configs.map((c) => c.providers));
}

function flatten<T>(arr: T[][]): T[] {
  return arr.reduce((acc, val) => acc.concat(val), []);
}
