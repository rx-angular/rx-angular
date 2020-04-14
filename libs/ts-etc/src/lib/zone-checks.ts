interface Constructor<T> {
  new (...args: any[]): T;
  prototype: T;
}

interface Instance {
  constructor: Constructor<this>;
}

export function envZonePatched(): boolean {
  return (window as any).Zone === 'undefined';
}

export function isNgZone(z: Instance): boolean {
  return z.constructor.name === 'NgZone';
}

export function isNgNoopZone(z: Instance): boolean {
  return z.constructor.name === 'NoopNgZone';
}

