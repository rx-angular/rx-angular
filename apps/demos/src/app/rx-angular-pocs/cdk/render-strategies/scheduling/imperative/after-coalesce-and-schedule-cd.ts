/**
 *
 * convenience method to prevent duplicated code. used in strategies after static coalescing
 *
 * @internal
 */
export function afterCoalesceAndScheduleCd<T>(work: () => void, afterCD?: () => T) {
  work();
  if (afterCD) {
    afterCD();
  }
}
