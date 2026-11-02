## 1.0.2 (2026-11-02)

### 🚀 Features

- ⚠️  **cdk,state,template,isr:** support angular 22 ([#1905](https://github.com/rx-angular/rx-angular/issues/1905))

### Documentation Changes

- **rebundle:** move inline docs into docs app ([#1928](https://github.com/rx-angular/rx-angular/pull/1928), [#1927](https://github.com/rx-angular/rx-angular/issues/1927))

### ⚠️  Breaking Changes

- **cdk,state,template,isr:** support angular 22  ([#1905](https://github.com/rx-angular/rx-angular/issues/1905))
  @rx-angular/cdk now requires @angular/core >=22.0.0.
  * feat(state)!: support angular 22
   BREAKING CHANGE: @rx-angular/state now requires @angular/core >=22.0.0 and @rx-angular/cdk ^22.0.0.
  * feat(template)!: support angular 22
   BREAKING CHANGE: @rx-angular/template now requires @angular/core >=22.0.0 and @rx-angular/cdk ^22.0.0.
  * feat(isr)!: support angular 22
   BREAKING CHANGE: @rx-angular/isr now requires @angular/common, @angular/core and @angular/ssr >=22.0.0.
  * feat(eslint-plugin): support typescript-eslint 8
  * fix(rebundle): allow @nx/devkit 23
  * docs: update start-here package table for v22

### ❤️ Thank You

- ChristopherPHolder
- Julian Jandl @hoebbelsB

## 1.0.1 (2026-07-21)

### 🩹 Fixes

- **rebundle:** improve generator and build output ([4ff36b49](https://github.com/rx-angular/rx-angular/commit/4ff36b49))

### ❤️ Thank You

- ChristopherPHolder

# 1.0.0 (2026-07-03)

### 🚀 Features

- **rebundle:** add rebundle build optimizer ([#1916](https://github.com/rx-angular/rx-angular/pull/1916))

### ❤️ Thank You

- Christopher Holder @ChristopherPHolder
- Julian Jandl @hoebbelsB
- Michael Hladky @rx-angular