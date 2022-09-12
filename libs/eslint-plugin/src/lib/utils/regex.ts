export function namesToRegex(values: string[]): RegExp {
  return new RegExp(`^(${values.join('|')})$`);
}
