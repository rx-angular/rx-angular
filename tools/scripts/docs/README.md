# Configuration

BIG SHOUTOUT to @michaelbromley for the [scripts!](https://github.com/vendure-ecommerce/vendure/tree/master/docs)

The configuration docs are generated from the TypeScript source files by running the "generate-typescript-docs" script:

```bash
yarn generate-typescript-docs [-w]
```

**Currently only the [state library](./libs/state/src) will get imported**

This script uses the TypeScript compiler API to traverse the server source code and extract data about the types as well as other information such as descriptions and default values.

Currently, any `interface`, `class` or `type` which includes the JSDoc `@docCategory` tag will be extracted into a markdown file in 
the [apps/docs/generated](./apps/docs/generated) directory. Those files then will be rendered by the *upcoming* `docs app`.

## Docs-specific JSDoc tags

### `@docsCategory`

This is required as its presence determines whether the declaration is extracted into the docs. Its value should be a string corresponding to the API sub-section that this declaration belongs to, e.g. "payment", "shipping" etc.

### `@docsPage`

This optional tag can be used to group declarations together onto a single page. This is useful e.g. in the case of utility functions or
type aliases, which may be considered too trivial to get an entire page to themselves.

### `@description`

This tag specifies the text description of the declaration. It supports markdown, but should not be used for code blocks, which should be tagged with `@example` (see below). Links to other declarations can be made with the `{@link SomeOtherDeclaration}` syntax. Also applies to class/interface members.

### `@example`

This tag should be used to include any code blocks. Remember to specify the language after the opening delimiter for correct highlighting. Also applies to class/interface members.

### `@default`

This is used to specify the default value of a property, e.g. when documenting an optional configuration option.

### `@internal`

This is used to exlude members from appearing in the docs. For example, a class may need a particular
public method for internal use, but this method is not intended to be used by external consumers of that
class.

### Example

````ts
/**
 * @description
 * Greets people with a friendly message. 
 * Used by the {@link AppInitializer} during the start-up process.
 *
 * @example
 * ```ts
 * const greeter = new Greeter();
 * console.log(greeter.greet('mike'));
 * // -> 'Hi, mike, good to see you!'
 * ```
 *
 * @docsCategory helpers
 */
export class Greeter {

    /**
     * @description
     * Greets the person by name
     */
    greet(name: string): string {
      return `Hi, ${name}, good to see you!`;
    }
    
    /**
     * Required as a work-around for issue #1234
     * @internal
     */
    someMethodUsedOnlyByVendureCore() {
        // ...
    }
}
````
