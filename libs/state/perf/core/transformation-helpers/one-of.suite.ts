// tslint:disable
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
  obj[typeof 'test'];
}

function expression() {
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
  obj[typeof 'test'];
}

const typeOf = typeof 'test';
function expression2() {
  typeOf === 'string' || typeOf === 'symbol' || typeOf === 'number';
}
