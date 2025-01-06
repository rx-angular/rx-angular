import { BenchmarkSuite } from '../../utils';

export const oneOfSuite: BenchmarkSuite = {
  testSet: {
    'Array#includes': arrayIncludes,
    'Object#prop': objectProperty,
    expression: expression,
    'Array#includes2': arrayIncludes2,
    'Object#prop2': objectProperty2,
    expression2: expression2,
  },
};

function arrayIncludes() {
  ['string', 'symbol', 'number'].includes(typeof 'test');
}

function objectProperty() {
  const obj: any = {
    string: true,
    symbol: true,
    number: true,
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  obj[typeof 'test'];
}

function expression() {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions,no-constant-binary-expression
  typeof 'test' === 'string' ||
    typeof 'test' === 'symbol' ||
    typeof 'test' === 'number';
}

const arr = ['string', 'symbol', 'number'];

function arrayIncludes2() {
  arr.includes(typeof 'test');
}

const obj: any = {
  string: true,
  symbol: true,
  number: true,
};

function objectProperty2() {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  obj[typeof 'test'];
}

const typeOf = typeof 'test';

function expression2() {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  typeOf === 'string' || typeOf === 'symbol' || typeOf === 'number';
}
