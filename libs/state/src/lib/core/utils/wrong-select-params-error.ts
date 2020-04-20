// tslint:disable-next-line:no-empty-interface
export interface WrongSelectParamsErrorError extends Error {}

export type WrongSelectParamsErrorCtor = new () => WrongSelectParamsErrorError;

function WrongSelectParamsErrorImpl(this: any) {
  Error.call(this);
  this.message = 'wrong select argument';
  this.name = 'WrongSelectParamsError';
  return this;
}

WrongSelectParamsErrorImpl.prototype = Object.create(Error.prototype);

/**
 * An error thrown when the select operator get passed
 * something that is valid for selection.
 *
 * WrongSelectParamsError
 */
export const WrongSelectParamsError: WrongSelectParamsErrorCtor = WrongSelectParamsErrorImpl as any;
