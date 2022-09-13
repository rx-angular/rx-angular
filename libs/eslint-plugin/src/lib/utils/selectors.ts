import { namesToRegex } from './regex';

export function rxstateMethodCallExpression(
  methods: ('connect' | 'get' | 'hold' | 'select' | 'set')[]
): string {
  const methodsRegex = namesToRegex(methods);
  return `:matches(CallExpression[callee.object.object.type=ThisExpression][callee.object.property.name=state][callee.property.name=${methodsRegex}], CallExpression[callee.object.name=state][callee.property.name=${methodsRegex}])`;
}
