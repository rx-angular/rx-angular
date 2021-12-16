
// class vs instance
export type InstanceOrTypeOf<T> = T extends abstract new (...args: unknown[]) => infer R ? R : T;

export type ExtractString<T extends object> = Extract<keyof T, string>

// type FunctionFirstParamTypeOrType = FunctionFirstParamTypeOrTypeOf<(i: number, ii: boolean) => string>; // number
// type FunctionFirstParamTypeOrType2 = FunctionFirstParamTypeOrTypeOf<boolean>; // boolean
export type FunctionFirstParamTypeOrTypeOf<T> = FirstParamOf<T>;


// type Keys = KeysOf<{ a: string, b: number }>; // "a" | "b"
export type KeysOf<O> = keyof O;

type ValueTypes = ValuesOf<{ a: string, b: number }>; // string | number
export type ValuesOf<O> = O[keyof O];

export type AnyFn = (...args: any[]) => any;
// type ReturnValueTypes = ReturnValuesOf<{ a: () => string, b: () => void }>; // string | void
export type ReturnTypesOf<O extends {[K in keyof O]: AnyFn}> = ReturnType<O[keyof O]>;
// type ParamValues = ParamsOf<{ a: (i: string) => any, b: (i: number) => any }>; // string | void
export type ParamsOf<O extends {[K in keyof O]: AnyFn}> = Parameters<O[keyof O]>;

type FirstParam = FirstParamOf<boolean>; // boolean
// type FirstParam = FirstParamOf<(i: string, ii: boolean) => any>; // string
export type FirstParamOf<T, F = T> = T extends (...args: infer P) => any ? P[0] : F;

// type FirstParams = FirstParamsOf<{ a: (i: string, ii: boolean) => any, b: (i: number, ii: boolean) => any }>; // string | number
export type FirstParamsOf<O extends {[K in keyof O]: AnyFn}> = FirstParamOf<O[keyof O]>;
