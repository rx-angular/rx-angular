# Resources

**Example applications:**  
A demo application is available on [GitHub](https://github.com/BioPhoton/rx-angular-cdk-coercing).

# Motivation

Coercing, or to be more specific type coercion is the process of converting value from one type to another. 
This can be done with any primitive value in JavaScript. e.g. number, string, Symbol, boolean, null, undefined

In practice you can apply this technique in 2 ways:
- explicitly e.g. `Number(string)` coercres a string to a number
- implicitely e.g. `!!string` coerces a string to a boolean

In general when we apply those techniques our code base starts to maintain repetative patterns which either bloten up the codebase or just makes it harder to read.

As a good example let's look at this snippet of code here:

```typescript

```

Furthermore, in version 10 of Angular the team announced strict type checking as opt-in configuration. 
Since then developers where encurraged to match exaclty the types. This especially needs attention when it comes to templates.

For this very reason the team later on shipped a sub package under the Angular CDK to provide some helpers for the important cases.



# Available Approaches

- [@angular/cdk/coercion](https://www.npmjs.com/package/@angular/cdk)
- [@rx-angular/cdk/coercion](https://www.npmjs.com/package/@rx-angular/cdk)

**The Benefits of RxAngular**

- ✅ 

# RxAngular Coercing operators

There are:
- 

In the section usage we will go into more detail.

## Marble Diagram

## Setup

The coalescing features can be used directly from the `cdk` package or indirectly through the `template` package.
To do so, install the `cdk` package and, if needed, the packages depending on it:

1. Install `@rx-angular/cdk`

```bash
npm i @rx-angular/cdk
// or
yarn add @rx-angular/cdk
```

## Usage

As coercing was already explained in the Angular context, apply this knokledge in a more general way.

> **⚠ Notice:**  
> 

# Example usage in RxAngular

