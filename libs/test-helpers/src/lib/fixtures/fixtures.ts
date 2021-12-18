export interface PrimitiveState {
  bol: boolean;
  str: string;
  num: number;
}

export interface NestedState {
  obj: {
    key1: {
      key11: {
        key111: string;
      };
    };
  };
}

export const initialNestedState: NestedState = {
  obj: {
    key1: {
      key11: {
        key111: 'test'
      }
    }
  }
};

export const initialPrimitiveState: PrimitiveState = {
  str: 'str',
  num: 42,
  bol: true
};

