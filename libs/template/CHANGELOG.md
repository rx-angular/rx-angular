# Changelog

This file was generated using [@jscutlery/semver](https://github.com/jscutlery/semver).

# [1.0.0-rc.5](https://github.com/rx-angular/rx-angular/compare/template@1.0.0-rc.4...template@1.0.0-rc.5) (2022-12-24)


### Code Refactoring

* **template:** harmonize LetDirective triggers ([62f5d1f](https://github.com/rx-angular/rx-angular/commit/62f5d1fc4f9f02402e7ddde8a79b8e81cecc4f67))
* **template:** harmonize RxIf triggers ([f9f6aba](https://github.com/rx-angular/rx-angular/commit/f9f6abad6a3ad7b2091f5523a7ef4ef0c42efa32))
* **template:** remove root barrel exports ([fdb620e](https://github.com/rx-angular/rx-angular/commit/fdb620e3ee7ee98a104a23e3e72b385c5bb4c676))


### Features

* **template:** implement template triggers for rxIf ([f008aaf](https://github.com/rx-angular/rx-angular/commit/f008aaf4da39d0e97ffb45d1d2911d8d33e3531a))
* **template:** introduce stable rxIf ([4a88e7d](https://github.com/rx-angular/rx-angular/commit/4a88e7d276e2b9dcb200464c1833f1c743c6fd2a))
* **template:** rxIf: adjust API to be in line with ngIf ([8601598](https://github.com/rx-angular/rx-angular/commit/860159841acf786e610399331803503295b0d4de))
* **template:** rxIf: implement reactive context variables. react to template switches ([35e1d41](https://github.com/rx-angular/rx-angular/commit/35e1d41b9ce05b23d5df918c948c1ba75ce03750))
* **template:** rxIfs viewContext should only allow boolean values ([768ebea](https://github.com/rx-angular/rx-angular/commit/768ebea79d4b5885ca121329fba2b27ed74d6983))


### BREAKING CHANGES

* **template:** Some LetDirective inputs were renamed to harmonize the template API.

- `templateTrg` becomes `contextTrigger`
- `nextTrg` becomes `nextTrigger`
- `errorTrg` becomes `errorTrigger`
- `completeTrg` becomes `completeTrigger`
- `suspenseTrg` becomes `suspenseTrigger`
* **template:** Modules and directives are now removed from the root entrypoint `'@rx-angular/template'`.

Instead, use secondary entrypoint to import the symbol, for instance: `import { LetModule } from '@rx-angular/template/let';`.
* **template:** Some RxIf inputs were renamed to harmonize the template API.

- `templateTrg` becomes `contextTrigger`
- `nextTrg` becomes `nextTrigger`
- `errorTrg` becomes `errorTrigger`
- `completeTrg` becomes `completeTrigger`
- `suspenseTrg` becomes `suspenseTrigger`
* **template:** move rxIf directive from template/experimental to template



# [1.0.0-rc.4](https://github.com/rx-angular/rx-angular/compare/template@1.0.0-rc.3...template@1.0.0-rc.4) (2022-11-15)

### Bug Fixes

- **template:** rxFor: only subscribe once to value input ([3219492](https://github.com/rx-angular/rx-angular/commit/3219492c8d2f6cb7e7faa29d4f9226723cc9f391))

### Features

- **template:** letDirective: handle initial suspense for observables emitting undefined values ([66cbb80](https://github.com/rx-angular/rx-angular/commit/66cbb80bdf1438acd727ca263ad124e73c81e958))

# [1.0.0-rc.3](https://github.com/rx-angular/rx-angular/compare/template@1.0.0-rc.2...template@1.0.0-rc.3) (2022-09-23)

### Bug Fixes

- turn off updating deps in dist package.json ([faec3d4](https://github.com/rx-angular/rx-angular/commit/faec3d492a513d13cf78c4d2248a0dfbf18e5a52)), closes [#1405](https://github.com/rx-angular/rx-angular/issues/1405)

# [1.0.0-rc.2](https://github.com/rx-angular/rx-angular/compare/template@1.0.0-rc.1...template@1.0.0-rc.2) (2022-09-13)

### Bug Fixes

- **template:** use rxjs version 6 compatible imports ([9d1d23d](https://github.com/rx-angular/rx-angular/commit/9d1d23de2e7f064783c2103380fe9c00356bb7b8))

# [1.0.0-rc.1](https://github.com/rx-angular/rx-angular/compare/template@1.0.0-rc.0...template@1.0.0-rc.1) (2022-08-28)

### Features

- **template:** harmonize LetDirective inputs ([1c8377d](https://github.com/rx-angular/rx-angular/commit/1c8377dbd45779b1395945303fd57948a53808b5))
- **template:** implement rxLet template-triggers ([fa3b820](https://github.com/rx-angular/rx-angular/commit/fa3b8207bc717cc92a75e059a991450fc75c69e7))
- **template:** introduce rxFor stable version ([3bdb702](https://github.com/rx-angular/rx-angular/commit/3bdb702d7b4bd66e5fb9965d6fd70f7d27492067))
- **template:** make rxFor behave as drop-in replacement for ngFor ([49e7763](https://github.com/rx-angular/rx-angular/commit/49e77638befabf4568c8fe04acabcff7541acf30))
- **template:** remove leading $ on RxViewContext properties ([16aab61](https://github.com/rx-angular/rx-angular/commit/16aab61ceb16216ed36defe066e4f40804140afa))

### Performance Improvements

- **template:** fix push pipe over-rendering on initialization ([6900f86](https://github.com/rx-angular/rx-angular/commit/6900f86b26c5d1e25cd29fd2203c0085b57bbb89))

### BREAKING CHANGES

- **template:** context variables for error, suspense and complete were renamed, refer to #431
- **template:** Template binding inputs changed, please refer to #431.

# [1.0.0-beta.33](https://github.com/rx-angular/rx-angular/compare/template@1.0.0-beta.32...template@1.0.0-beta.33) (2022-06-07)

### Bug Fixes

- add missing peerDependencies ([223b751](https://github.com/rx-angular/rx-angular/commit/223b751b9c14f67fe803d84872ffe56b005373c6)), closes [#1261](https://github.com/rx-angular/rx-angular/issues/1261)
- **template:** drop @angular/cdk dep for rxIf ([0ce6abc](https://github.com/rx-angular/rx-angular/commit/0ce6abc9a18dff11e9da8c1c939e5e5586cc3ef8))

### Features

- **template:** introduce experimental rx-if directive ([#1251](https://github.com/rx-angular/rx-angular/issues/1251)) ([4f8c4ac](https://github.com/rx-angular/rx-angular/commit/4f8c4ac991ba8a6fad032ba461c31a17e3573c82))

### Performance Improvements

- **cdk:** coalesce and optimize parent notification ([#1262](https://github.com/rx-angular/rx-angular/issues/1262)) ([9d1d099](https://github.com/rx-angular/rx-angular/commit/9d1d099608ffe848af207475a51f3788b94ca8bc))

## [0.0.0-beta.32](/compare/template@1.0.0-beta.1...template@1.0.0-beta.32) (2022-02-27)

### Bug Fixes

- **template:** compat for jest and Angular 12

# [1.0.0-beta.31](/compare/template@1.0.0-beta.30...template@1.0.0-beta.31) (2022-02-08)

### Bug Fixes

- drop `@nrwl/tao` deep import 6eeae5e
- migrate `@rx-angular/zone-less` as well 78c1ec6
- **template:** Rxfor template typings (#1198) 5830f38, closes #1198
- **template:** rxLet: don't override primary strategy (#1197) 5c9d2a3, closes #1197

### Performance Improvements

- improve migrations perf 44eccda

# [1.0.0-beta.30](/compare/template@1.0.0-beta.29...template@1.0.0-beta.30) (2022-02-02)

### Features

- enable Ivy with partial compilation mode (#1186) eddaf20, closes #1186
- introduce viewport-prio and rx-for as experimental (#887) d5d026c, closes #887

### Performance Improvements

- move getUnpatchedApi into sun-package and avoid zone-less package (#1035) 170ab7a, closes #1035
- reduce bundle size by removing unused code (#1039) 0c6c089, closes #1039
- zone less sub modules f765336

# [1.0.0-beta.29](/compare/template@1.0.0-beta.28...template@1.0.0-beta.29) (2021-11-16)

### Bug Fixes

- **schematics:** fix template migration (#848) 718eb36, closes #848
- **schematics:** remove `@nrwl/workspace` dependency (#968) 0bdcd16, closes #968

### Features

- add ability to rxLet and push to take static values (#1033) 42d7a81, closes #1033

# [1.0.0-beta.28](https://github.com/rx-angular/rx-angular/compare/template@1.0.0-beta.27...template@1.0.0-beta.28) (2021-08-23)

- **template:** remove RxJS dependency

# [1.0.0-beta.27](https://github.com/rx-angular/rx-angular/compare/template@1.0.0-beta.26...template@1.0.0-beta.27) (2021-08-23)

- **template:** fix RxJS7 update ([#907](https://github.com/rx-angular/rx-angular/pull/907)) ([674d584]()

# [1.0.0-beta.26](https://github.com/rx-angular/rx-angular/compare/template@1.0.0-beta.21...template@1.0.0-beta.26) (2021-08-16)

### Bug Fixes

- **template:** remove window object access ([#599](https://github.com/rx-angular/rx-angular/issues/599)) ([47b6dbb](https://github.com/rx-angular/rx-angular/commit/47b6dbb66deac7b44cb7aa0f348bc45cd64541fb)), closes [#579](https://github.com/rx-angular/rx-angular/issues/579)
- **docs:** Documentation for template overview ([#687](https://github.com/rx-angular/rx-angular/issues/687)) ([9374906](https://github.com/rx-angular/rx-angular/commit/93749060ba59ba197816848d5869d17976ca29be))
- ng-packagr builds ([#553](https://github.com/rx-angular/rx-angular/issues/553)) ([cfd4711](https://github.com/rx-angular/rx-angular/commit/cfd47112c12bf7333e657c2f6b6e79d3d3eccda4))
- **schematics:** use `"$id"` for schema ID ([1510339](https://github.com/rx-angular/rx-angular/commit/15103393fa0700d2fd795703f529fe2a7c15b7c4))
- **state-docs:** Fix typo in concepts ([#614](https://github.com/rx-angular/rx-angular/issues/614)) ([3bdf93c](https://github.com/rx-angular/rx-angular/commit/3bdf93c17ad660fd4e5699ded40ee28e6b69a6e1))
- **state-docs:** Polish basics tutorial ([#645](https://github.com/rx-angular/rx-angular/issues/645)) ([91419a1](https://github.com/rx-angular/rx-angular/commit/91419a1ebcb64f91cd6fa0277b9cad8fd93cd3a7))
- **tempalte:** Fix broken image url ([#615](https://github.com/rx-angular/rx-angular/issues/615)) ([4f3d12b](https://github.com/rx-angular/rx-angular/commit/4f3d12bb7954728c6e9f8b9017e7f5c3e0cb2505))
- **template:** import from another lib ([#693](https://github.com/rx-angular/rx-angular/issues/693)) ([6888a7c](https://github.com/rx-angular/rx-angular/commit/6888a7ce4ec0a893942a497b42375f8c2ed21ff3))
- **template:** update readme install ([a51a9a9](https://github.com/rx-angular/rx-angular/commit/a51a9a976399d2522d119f6b5af0dbcc47d39955))
- **template:** update template schematics ([546f80c](https://github.com/rx-angular/rx-angular/commit/546f80cc2dca95537c8cd699499e2c3ef5e6a79b))

### Features

- **push:** implement proper patchZone flag ([#575](https://github.com/rx-angular/rx-angular/issues/575)) ([595d4a5](https://github.com/rx-angular/rx-angular/commit/595d4a54b36bc1d8c582c7925e1be0712a8d6e10))
- **push:** support template typing ([78b4816](https://github.com/rx-angular/rx-angular/commit/78b4816a52c7da7f583e7a614c97ec6fb8b885fc)), closes [#634](https://github.com/rx-angular/rx-angular/issues/634)
- **schematics:** add template@1.0.0 migration schematic ([#806](https://github.com/rx-angular/rx-angular/issues/806)) ([7806063](https://github.com/rx-angular/rx-angular/commit/78060633c0ef00db6140af383ef750fc0b642697))
- **template:** decouple `let` into a library ([#732](https://github.com/rx-angular/rx-angular/issues/732)) ([8529cb6](https://github.com/rx-angular/rx-angular/commit/8529cb68e3963a7fd6f0db12a41908281b733fe9))
- **template:** decouple `push` into a lib ([#753](https://github.com/rx-angular/rx-angular/issues/753)) ([ee370be](https://github.com/rx-angular/rx-angular/commit/ee370be2ea2b6b097b5dc6a24b05afda53e95f1c))
- **template:** decouple `unpatch` into a lib ([#752](https://github.com/rx-angular/rx-angular/issues/752)) ([f78ba33](https://github.com/rx-angular/rx-angular/commit/f78ba33ffad083d9ba38a3f530d497ceab5c0518))

# [1.0.0-beta.25](https://github.com/rx-angular/rx-angular/compare/template@1.0.0-beta.21...template@1.0.0-beta.25) (2021-04-13)

### Bug Fixes

- **cdk, template:** remove window object access ([#599](https://github.com/rx-angular/rx-angular/issues/599)) ([47b6dbb](https://github.com/rx-angular/rx-angular/commit/47b6dbb66deac7b44cb7aa0f348bc45cd64541fb)), closes [#579](https://github.com/rx-angular/rx-angular/issues/579)
- **state-docs:** Fix typo in concepts ([#614](https://github.com/rx-angular/rx-angular/issues/614)) ([3bdf93c](https://github.com/rx-angular/rx-angular/commit/3bdf93c17ad660fd4e5699ded40ee28e6b69a6e1))
- **state-docs:** Polish basics tutorial ([#645](https://github.com/rx-angular/rx-angular/issues/645)) ([91419a1](https://github.com/rx-angular/rx-angular/commit/91419a1ebcb64f91cd6fa0277b9cad8fd93cd3a7))
- **tempalte:** Fix broken image url ([#615](https://github.com/rx-angular/rx-angular/issues/615)) ([4f3d12b](https://github.com/rx-angular/rx-angular/commit/4f3d12bb7954728c6e9f8b9017e7f5c3e0cb2505))
- **template:** update readme install ([a51a9a9](https://github.com/rx-angular/rx-angular/commit/a51a9a976399d2522d119f6b5af0dbcc47d39955))

### Features

- **cdk:** improve rendering error handling ([#626](https://github.com/rx-angular/rx-angular/issues/626)) ([0437438](https://github.com/rx-angular/rx-angular/commit/0437438112c42b8f072b219d599d5ea8d68b30bc))
- **cdk:** improve template manager view-context ([#561](https://github.com/rx-angular/rx-angular/issues/561)) ([f58b9a2](https://github.com/rx-angular/rx-angular/commit/f58b9a2f147f3ca3cd89038a4603bd2ea0f2fe25))

# [1.0.0-beta.24](https://github.com/rx-angular/rx-angular/compare/template@1.0.0-beta.21...template@1.0.0-beta.24) (2021-02-27)

### Bug Fixes

- **template:** update readme install ([a51a9a9](https://github.com/rx-angular/rx-angular/commit/a51a9a976399d2522d119f6b5af0dbcc47d39955))
- **chore:** ng-packagr builds ([#553](https://github.com/rx-angular/rx-angular/issues/553)) ([cfd4711](https://github.com/rx-angular/rx-angular/commit/cfd47112c12bf7333e657c2f6b6e79d3d3eccda4))

### Features

- **cdk:** improve template manager view-context ([#561](https://github.com/rx-angular/rx-angular/issues/561)) ([f58b9a2](https://github.com/rx-angular/rx-angular/commit/f58b9a2f147f3ca3cd89038a4603bd2ea0f2fe25))

# [1.0.0-beta.23](https://github.com/rx-angular/rx-angular/compare/template@1.0.0-beta.21...template@1.0.0-beta.23) (2021-02-24)

### Bug Fixes

- **template:** fix VSCode language service errors ([#553](https://github.com/rx-angular/rx-angular/issues/553)) ([cfd4711](https://github.com/rx-angular/rx-angular/commit/cfd47112c12bf7333e657c2f6b6e79d3d3eccda4))

# [1.0.0-beta.22](https://github.com/rx-angular/rx-angular/compare/template@1.0.0-beta.21...template@1.0.0-beta.22) (2021-02-23)

### Features

- **template:** add add peer dependencies `@rx-angular/cdk` to template

# [1.0.0-beta.21](https://github.com/rx-angular/rx-angular/compare/template@1.0.0-beta-12...template@1.0.0-beta.21) (2021-02-23)

### Features

- **template:** add add peer dependencies to template ([7872458](https://github.com/rx-angular/rx-angular/commit/7872458c76dca3a04b471c0737f39f5d04a5d754))
- **template:** add cdk dependency ([#545](https://github.com/rx-angular/rx-angular/issues/545)) ([6a0e814](https://github.com/rx-angular/rx-angular/commit/6a0e8148ea38ec28d5e3882c7b7a1789ffbd5a84))

# [1.0.0-beta.20](https://github.com/rx-angular/rx-angular/compare/template@1.0.0-beta-12...template@1.0.0-beta.20) (2021-02-23)

### Features

- **template:** add add peer dependencies to template ([7872458](https://github.com/rx-angular/rx-angular/commit/7872458c76dca3a04b471c0737f39f5d04a5d754))
- **template:** add cdk dependency ([#545](https://github.com/rx-angular/rx-angular/issues/545)) ([6a0e814](https://github.com/rx-angular/rx-angular/commit/6a0e8148ea38ec28d5e3882c7b7a1789ffbd5a84))

# [1.0.0-beta.19](https://github.com/rx-angular/rx-angular/compare/template@1.0.0-beta-12...template@1.0.0-beta.19) (2021-02-23)

### Features

- **template:** add add peer dependencies to template ([7872458](https://github.com/rx-angular/rx-angular/commit/7872458c76dca3a04b471c0737f39f5d04a5d754))
- **template:** add cdk dependency ([#545](https://github.com/rx-angular/rx-angular/issues/545)) ([6a0e814](https://github.com/rx-angular/rx-angular/commit/6a0e8148ea38ec28d5e3882c7b7a1789ffbd5a84))

# [1.0.0-beta.18](https://github.com/rx-angular/rx-angular/compare/template@1.0.0-beta-12...template@1.0.0-beta.18) (2021-02-22)

### Features

- **template:** add add peer dependencies to template ([7872458](https://github.com/rx-angular/rx-angular/commit/7872458c76dca3a04b471c0737f39f5d04a5d754))
- **template:** add cdk dependency ([#545](https://github.com/rx-angular/rx-angular/issues/545)) ([6a0e814](https://github.com/rx-angular/rx-angular/commit/6a0e8148ea38ec28d5e3882c7b7a1789ffbd5a84))

# [1.0.0-beta.17](https://github.com/rx-angular/rx-angular/compare/template@1.0.0-beta-12...template@1.0.0-beta.17) (2021-02-22)

### Features

- **template:** add cdk dependency ([#545](https://github.com/rx-angular/rx-angular/issues/545)) ([6a0e814](https://github.com/rx-angular/rx-angular/commit/6a0e8148ea38ec28d5e3882c7b7a1789ffbd5a84))

# [1.0.0-beta.15](https://github.com/rx-angular/rx-angular/compare/template@1.0.0-beta-12...template@1.0.0-beta.15) (2021-02-22)

### Features

- **template:** adopt schematics paths

# [1.0.0-beta.14](https://github.com/rx-angular/rx-angular/compare/template@1.0.0-beta-12...template@1.0.0-beta.14) (2021-02-22)

### Features

- **template:** add schematics ([#545](https://github.com/rx-angular/rx-angular/issues/545)) ([6a0e814](https://github.com/rx-angular/rx-angular/commit/6a0e8148ea38ec28d5e3882c7b7a1789ffbd5a84))

# [1.0.0-beta.13](https://github.com/rx-angular/rx-angular/compare/template@1.0.0-beta-12...template@1.0.0-beta.13) (2021-02-22)

### Features

- **template:** add cdk dependency ([#545](https://github.com/rx-angular/rx-angular/issues/545)) ([6a0e814](https://github.com/rx-angular/rx-angular/commit/6a0e8148ea38ec28d5e3882c7b7a1789ffbd5a84))

# [1.0.0-beta.12](https://github.com/rx-angular/rx-angular/compare/template@1.0.0-beta.10...template@1.0.0-beta.12) (2021-02-21)

### Bug Fixes

- **template:** reduce public API ([#533](https://github.com/rx-angular/rx-angular/issues/533)) ([2dd6e05](https://github.com/rx-angular/rx-angular/commit/2dd6e05def6408475f1e5c2083af39587cfad737)), closes [#532](https://github.com/rx-angular/rx-angular/issues/532) [#534](https://github.com/rx-angular/rx-angular/issues/534)

# [1.0.0-beta.11](https://github.com/rx-angular/rx-angular/compare/template@1.0.0-beta.10...template@1.0.0-beta.11) (2021-02-21)

# [1.0.0-beta.10](https://github.com/rx-angular/rx-angular/compare/template@1.0.0-beta...template@1.0.0-beta.10) (2021-02-21)

### Bug Fixes

- ng-add for rx-tempalte ([#535](https://github.com/rx-angular/rx-angular/issues/535)) ([307c36e](https://github.com/rx-angular/rx-angular/commit/307c36e01b7fd97be3020af1728bcecf0ba4bfdc))

# [1.0.0-beta.9](https://github.com/rx-angular/rx-angular/compare/template@1.0.0-beta...template@1.0.0-beta.9) (2021-02-21)

### Bug Fixes

- **schematics:** ng-add for rx-tempalte ([#535](https://github.com/rx-angular/rx-angular/issues/535)) ([307c36e](https://github.com/rx-angular/rx-angular/commit/307c36e01b7fd97be3020af1728bcecf0ba4bfdc))

# [1.0.0-beta.8](https://github.com/rx-angular/rx-angular/compare/template@1.0.0-beta...template@1.0.0-beta.8) (2021-02-21)

# [1.0.0-beta.7](https://github.com/rx-angular/rx-angular/compare/template@1.0.0-beta.6...template@1.0.0-beta.7) (2021-02-21)

### Features

- **template:** add ng-add, setup sub packages ([#532](https://github.com/rx-angular/rx-angular/issues/532)) ([11b888b](https://github.com/rx-angular/rx-angular/commit/11b888b37979273e95568a37e82f4967eca65c5f)), closes [#534](https://github.com/rx-angular/rx-angular/issues/534)

# [1.0.0-beta.6](https://github.com/rx-angular/rx-angular/compare/template@1.0.0-beta.5...template@1.0.0-beta.5) (2021-02-19)

### Bug Fixes

- **template:** remove schematics from package.json ([2844d21](https://github.com/rx-angular/rx-angular/commit/2844d21d74c0cfa1d0d9058e348ea68602c9c93c))

# [1.0.0-beta.5](https://github.com/rx-angular/rx-angular/compare/template@1.0.0-beta.5...template@1.0.0-beta.5) (2021-02-19)

### Bug Fixes

- **template:** remove schematics from package.json ([2844d21](https://github.com/rx-angular/rx-angular/commit/2844d21d74c0cfa1d0d9058e348ea68602c9c93c))

# [1.0.0-beta.5](https://github.com/rx-angular/rx-angular/compare/template@1.0.0-beta.4...template@1.0.0-beta.5) (2021-02-19)

### Bug Fixes

- **template:** use Angular variable to get the `globalThis` ([#473](https://github.com/rx-angular/rx-angular/issues/473)) ([5bed095](https://github.com/rx-angular/rx-angular/commit/5bed0957971c3f104f6265940ffdd94d29fc0596))
- **template:** allow empty `[unpatch]` input ([#468](https://github.com/rx-angular/rx-angular/issues/468)) ([9139be8](https://github.com/rx-angular/rx-angular/commit/9139be8be30c40cc9658a522d729ec742e3a520b))
- **template:** support server-side rendering for the `unpatch` directive ([#469](https://github.com/rx-angular/rx-angular/issues/469)) ([d2cce57](https://github.com/rx-angular/rx-angular/commit/d2cce5719245700b04142a69b7bb8ad536b7036e))
- **viewport-prio:** disconnect the observer to allow the directive to be GCed ([#467](https://github.com/rx-angular/rx-angular/issues/467)) ([c9dc0ed](https://github.com/rx-angular/rx-angular/commit/c9dc0edebf38af57f04889f9747e09d669a727c0))
- **viewport-prio:** support server-side rendering for the `viewport-prio` directive ([#472](https://github.com/rx-angular/rx-angular/issues/472)) ([c0e0c2d](https://github.com/rx-angular/rx-angular/commit/c0e0c2dd5a8e844913303a8801a4ab1e02912699))

# [1.0.0-beta.4](https://github.com/rx-angular/rx-angular/compare/template@1.0.0-beta.3...template@1.0.0-beta.4) (2020-12-26)

### Bug Fixes

- **public-api:** remove TemplateModule from public API ([b462c3d](https://github.com/rx-angular/rx-angular/commit/b462c3d585ac3c8facc8ffa96e1476fcdb3bb444))

# [1.0.0-beta.3](https://github.com/rx-angular/rx-angular/compare/template@1.0.0-beta.2...template@1.0.0-beta.3) (2020-12-26)

### Bug Fixes

- **public-api:** removed template manager from public api ([32c58f5](https://github.com/rx-angular/rx-angular/commit/32c58f5bfbd5883c79b40a883cb9ca487319fd54))

# [1.0.0-beta.2](https://github.com/rx-angular/rx-angular/compare/template@1.0.0-beta.1...template@1.0.0-beta.2) (2020-12-26)

### Bug Fixes

- **template:** adjust coalescing logic and tests ([6f2d966](https://github.com/rx-angular/rx-angular/commit/6f2d966782f7b1a36a3b7fd95d002cda0a377bbb))

# [1.0.0-beta.1](https://github.com/rx-angular/rx-angular/compare/template@1.0.0-beta.0...template@1.0.0-beta.1) (2020-12-26)

### Features

- **template-manager:** Add optional id to embeddedView name ([#384](https://github.com/rx-angular/rx-angular/issues/384)) ([a3cba73](https://github.com/rx-angular/rx-angular/commit/a3cba7309288a65b88bc2f52651f11180e57b400))
- **templateManager:** add getEmbeddedView tests, fix selector ([#369](https://github.com/rx-angular/rx-angular/issues/369)) ([f33ba6b](https://github.com/rx-angular/rx-angular/commit/f33ba6b9dee2243d4facb4cb0feb16be26529f72))
- **typing:** harmonize channel naming ([a7285f9](https://github.com/rx-angular/rx-angular/commit/a7285f9723fd7be3cc1ee7b0901f0422849694e1))

# [1.0.0-beta.0](https://github.com/rx-angular/rx-angular/compare/template@1.0.0-beta.0...template@1.0.0-beta.0) (2020-12-26)

### Features

- **template-manager:** Add optional id to embeddedView name ([#384](https://github.com/rx-angular/rx-angular/issues/384)) ([a3cba73](https://github.com/rx-angular/rx-angular/commit/a3cba7309288a65b88bc2f52651f11180e57b400))
- **templateManager:** add getEmbeddedView tests, fix selector ([#369](https://github.com/rx-angular/rx-angular/issues/369)) ([f33ba6b](https://github.com/rx-angular/rx-angular/commit/f33ba6b9dee2243d4facb4cb0feb16be26529f72))
- **typing:** harmonize channel naming ([a7285f9](https://github.com/rx-angular/rx-angular/commit/a7285f9723fd7be3cc1ee7b0901f0422849694e1))

# [1.0.0-alpha.4](https://github.com/rx-angular/rx-angular/compare/template@1.0.0-alpha.2...template@1.0.0-alpha.4) (2020-08-25)

### Bug Fixes

- **envZonePatched:** add tests for envZonePatched ([#240](https://github.com/rx-angular/rx-angular/issues/240)) ([b90f204](https://github.com/rx-angular/rx-angular/commit/b90f2044f79ec48f89a6445df0f176606f072604))
- **export-experimental:** export interfaces for custom strategies ([#259](https://github.com/rx-angular/rx-angular/issues/259)) ([e457235](https://github.com/rx-angular/rx-angular/commit/e457235141603692de0ec51595fe13268450535e))

# [1.0.0-alpha.3](https://github.com/rx-angular/rx-angular/compare/template@1.0.0-alpha.2...template@1.0.0-alpha.3) (2020-08-25)

### Bug Fixes

- **coverage:** exclude index files from coverage, adopted state config ([#242](https://github.com/rx-angular/rx-angular/issues/242)) ([3bb60da](https://github.com/rx-angular/rx-angular/commit/3bb60dad76af807ef7dde45dbce3081b23916db9))
- **rxLet:** fixed let directive initial rendering ([#254](https://github.com/rx-angular/rx-angular/issues/254)) ([2d20574](https://github.com/rx-angular/rx-angular/commit/2d20574d99b184cfbbcef93ff964bd6c76d276d4))

### Features

- **template:** embedding rxSuspense template on observable reset for LetDirective ([#221](https://github.com/rx-angular/rx-angular/issues/221)) ([6f56043](https://github.com/rx-angular/rx-angular/commit/6f560432d1f5bef49805bbd297866dc104cf0f0e))

# [1.0.0-alpha.2](https://github.com/rx-angular/rx-angular/compare/template@1.0.0-alpha.2...template@1.0.0-alpha.2) (2020-08-22)

### Features

- **template:** embedding rxSuspense template on observable reset for LetDirective ([#221](https://github.com/rx-angular/rx-angular/issues/221)) ([6f56043](https://github.com/rx-angular/rx-angular/commit/6f560432d1f5bef49805bbd297866dc104cf0f0e))

# [1.0.0-alpha.1](https://github.com/rx-angular/rx-angular/compare/template@1.0.0-alpha.0...template@1.0.0-alpha.1) (2020-07-26)

### Bug Fixes

- **rx-angular:** ignore nx boundaries in tests ([#190](https://github.com/rx-angular/rx-angular/issues/190)) ([8062980](https://github.com/rx-angular/rx-angular/commit/8062980928bc5959b486958c35c2833a5a4f0544))

# [1.0.0-alpha.0](https://github.com/rx-angular/rx-angular/compare/615c4e37654d97e90d301bfdeacef4cb86c9426b...template@1.0.0-alpha.0) (2020-06-24)

### Bug Fixes

- **render-aware:** fixed strategy behavior in render-aware ([#143](https://github.com/rx-angular/rx-angular/issues/143)) ([da0e38e](https://github.com/rx-angular/rx-angular/commit/da0e38e29479f730c88d2096ad28847b1dd78c5b))
- **template:** render aware strategy handling stable on resubscribe ([#141](https://github.com/rx-angular/rx-angular/issues/141)) ([e3516e3](https://github.com/rx-angular/rx-angular/commit/e3516e39836cc1cf44b7fd75a5781fd293999aa3))
- detect zone.js by using runOutsideAngular() ([#126](https://github.com/rx-angular/rx-angular/issues/126)) ([717ffb3](https://github.com/rx-angular/rx-angular/commit/717ffb3800d3647dca3e7544b4e0e58e17668b45))
- **template:** fixed broken exports in barrel files ([0e3e476](https://github.com/rx-angular/rx-angular/commit/0e3e47695efb51d6714109610f8a51829049f966))
- **template:** rename property to lowercase in let ([c168535](https://github.com/rx-angular/rx-angular/commit/c1685359a5f16a87aa50ffc253120e1d014da826))
- **zone-checks:** fixed apiZonePatched condition ([#115](https://github.com/rx-angular/rx-angular/issues/115)) ([797e2b1](https://github.com/rx-angular/rx-angular/commit/797e2b18552a060dfd212b3549f8d21b1fe3eb33))

### Features

- **state:** removed deprecated API ([5db77e7](https://github.com/rx-angular/rx-angular/commit/5db77e70f9505e0e0064517260ed59b7841b15ed))
- **template:** Cache zone.js detection per instance ([#128](https://github.com/rx-angular/rx-angular/issues/128)) ([1bb2ec4](https://github.com/rx-angular/rx-angular/commit/1bb2ec47d6cb7907aeeb7be3b455758519c51123))
- add back tslib dependency ([615c4e3](https://github.com/rx-angular/rx-angular/commit/615c4e37654d97e90d301bfdeacef4cb86c9426b))
