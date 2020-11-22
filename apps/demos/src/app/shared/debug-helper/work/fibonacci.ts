// @ts-ignore


export function fibonacci(n: number): number {
  if (n < 1) {
    throw new Error('fibonacci: First argument must be a number greater than zero.');
  }

  if (n === 1 || n === 2) {
    return 1;
  } else {
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
}
