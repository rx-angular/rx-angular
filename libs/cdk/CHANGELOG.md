# [1.0.0-alpha.10](https://github.com/rx-angular/rx-angular/compare/cdk@1.0.0-alpha.9...cdk@1.0.0-alpha.10) (2021-08-23)

* **cdk:** fix RxJS7 update ([#907](https://github.com/rx-angular/rx-angular/pull/907)) ([674d584]()


# [1.0.0-alpha.9](https://github.com/rx-angular/rx-angular/compare/cdk@1.0.0-alpha.7...cdk@1.0.0-alpha.9) (2021-08-16)


### Bug Fixes

* **cdk:** setup polyfills for non browser environments in scheduler ([#820](https://github.com/rx-angular/rx-angular/issues/820)) ([674d584](https://github.com/rx-angular/rx-angular/commit/674d5847d709380d6e6bee6e5e230ae36b688818))
* **cdk:** skip logging irelevant browser API error ([#741](https://github.com/rx-angular/rx-angular/issues/741)) ([78a624f](https://github.com/rx-angular/rx-angular/commit/78a624f993a63327ffce2fcd4ce032d693deb129))
* **demos:** fix most of the demos ([#640](https://github.com/rx-angular/rx-angular/issues/640)) ([3d443e9](https://github.com/rx-angular/rx-angular/commit/3d443e927ccc90f2bc7919c7364e3f3ab5cb8595))

### Features

* **cdk:** add accumulateObservable creation function ([#582](https://github.com/rx-angular/rx-angular/issues/582)) ([65250ba](https://github.com/rx-angular/rx-angular/commit/65250ba15ab2c6569a00b0d82c57be9ba54787c8))
* **cdk:** improve rendering error handling ([#626](https://github.com/rx-angular/rx-angular/issues/626)) ([0437438](https://github.com/rx-angular/rx-angular/commit/0437438112c42b8f072b219d599d5ea8d68b30bc))
* **cdk:** move scheduler into `internals/scheduler` ([#725](https://github.com/rx-angular/rx-angular/issues/725)) ([26aedbd](https://github.com/rx-angular/rx-angular/commit/26aedbd5c3f78e65d40797e3c310e797f00c426f))
* **cdk:** swap arguments in the `getZoneUnPatchedApi` to benefit from autocomplete ([#707](https://github.com/rx-angular/rx-angular/issues/707)) ([6d5341d](https://github.com/rx-angular/rx-angular/commit/6d5341d22d5e24bf55289654989d3c11dd47c1e8))
* **zone-configuration:** add ts docs to zone configuration ([#667](https://github.com/rx-angular/rx-angular/issues/667)) ([da4eb77](https://github.com/rx-angular/rx-angular/commit/da4eb776747c0e812e2fea1c4eac533db71d04cb))
* **coercing:** add ts docs to coercing 
* **coalescing:** add ts docs to coalescing 


### Performance Improvements

* **cdk:** decouple `notifications` into a lib ([#782](https://github.com/rx-angular/rx-angular/issues/782)) ([3032b69](https://github.com/rx-angular/rx-angular/commit/3032b696a909bd9066572584fd2fbb1a132fb730))
* **cdk:** decouple `zone-configurations` into its own library ([#728](https://github.com/rx-angular/rx-angular/issues/728)) ([4f35bfa](https://github.com/rx-angular/rx-angular/commit/4f35bfaf2a65333b3eff2f74671ad2c443946ca4))
* **cdk:** decouple `zone-less` into its own self-contained library ([#688](https://github.com/rx-angular/rx-angular/issues/688)) ([bf561e8](https://github.com/rx-angular/rx-angular/commit/bf561e837b37c25ae2ce5430eb861f08ec9c0204))
* **cdk:** move `coercing` into lib ([#730](https://github.com/rx-angular/rx-angular/issues/730)) ([803412b](https://github.com/rx-angular/rx-angular/commit/803412b8f00d1e0b31f07ced1a2951e445b48546))
* **cdk:** use existing `rxjs` schedulers ([#700](https://github.com/rx-angular/rx-angular/issues/700)) ([15d0333](https://github.com/rx-angular/rx-angular/commit/15d0333d74b4da56407a7514f2cc50b7db82c93d))


# [1.0.0-alpha.8](https://github.com/rx-angular/rx-angular/compare/cdk@1.0.0-alpha.7...cdk@1.0.0-alpha.8) (2021-04-13)

### Features

- **cdk:** improve rendering error handling ([#626](https://github.com/rx-angular/rx-angular/issues/626)) ([0437438](https://github.com/rx-angular/rx-angular/commit/0437438112c42b8f072b219d599d5ea8d68b30bc))

# [1.0.0-alpha.7](https://github.com/rx-angular/rx-angular/compare/cdk@1.0.0-alpha.6...cdk@1.0.0-alpha.7) (2021-03-27)

### Bug Fixes

- **cdk, template:** remove window object access ([#599](https://github.com/rx-angular/rx-angular/issues/599)) ([47b6dbb](https://github.com/rx-angular/rx-angular/commit/47b6dbb66deac7b44cb7aa0f348bc45cd64541fb)), closes [#579](https://github.com/rx-angular/rx-angular/issues/579)

### Features

- **cdk:** infer `getZoneUnPatchedApi` return type and fix types for existing functions ([#603](https://github.com/rx-angular/rx-angular/issues/603)) ([1692653](https://github.com/rx-angular/rx-angular/commit/1692653c8c6cada97fb37af176ca9a41ef93e35d))
- **zone-config:** update zone-config docs and linking ([#627](https://github.com/rx-angular/rx-angular/issues/627)) ([adb613d](https://github.com/rx-angular/rx-angular/commit/adb613daed5767e184135ddd2efe48fa9522a5dd))

# [1.0.0-alpha.6](https://github.com/rx-angular/rx-angular/compare/cdk@1.0.0-alpha.4...cdk@1.0.0-alpha.6) (2021-03-14)

### Bug Fixes

- **zone-config:** Update zone cfg api ([#598](https://github.com/rx-angular/rx-angular/issues/598)) ([8dadf40](https://github.com/rx-angular/rx-angular/commit/8dadf40007c85c8794d21317a702a743100fc1c2))
- **zone-config:** zone-config tests ([#600](https://github.com/rx-angular/rx-angular/issues/600)) ([517e0cf](https://github.com/rx-angular/rx-angular/commit/517e0cf55e38e068c9127395395d1cc63b7b405b))
- **list-manager:** fix list manager return value when no changes happened but values arrived ([#588](https://github.com/rx-angular/rx-angular/issues/588)) ([220be51](https://github.com/rx-angular/rx-angular/commit/220be517d65fc70f851cc3a24bddcd28251d85dd))

# [1.0.0-alpha.5](https://github.com/rx-angular/rx-angular/compare/cdk@1.0.0-alpha.4...cdk@1.0.0-alpha.5) (2021-03-10)

### Bug Fixes

- Fix change detection not running inside the zone when `patchZone` is truthy https://github.com/rx-angular/rx-angular/pull/590
  This change should fix a lot of cdnage detection issues related to event listeners. Special THX to @arturovt

# [1.0.0-alpha.4](https://github.com/rx-angular/rx-angular/compare/cdk@1.0.0-alpha.2...cdk@1.0.0-alpha.4) (2021-02-27)

### Bug Fixes

- ng-packagr builds ([#553](https://github.com/rx-angular/rx-angular/issues/553)) ([cfd4711](https://github.com/rx-angular/rx-angular/commit/cfd47112c12bf7333e657c2f6b6e79d3d3eccda4))
- update typings, allow values in template slots

### Features

- **cdk:** improve template manager view-context ([#561](https://github.com/rx-angular/rx-angular/issues/561)) ([f58b9a2](https://github.com/rx-angular/rx-angular/commit/f58b9a2f147f3ca3cd89038a4603bd2ea0f2fe25))

# [1.0.0-alpha.3](https://github.com/rx-angular/rx-angular/compare/cdk@1.0.0-alpha.2...cdk@1.0.0-alpha.3) (2021-02-24)

### Bug Fixes

- **cdk:** ng-packagr builds ([#553](https://github.com/rx-angular/rx-angular/issues/553)) ([cfd4711](https://github.com/rx-angular/rx-angular/commit/cfd47112c12bf7333e657c2f6b6e79d3d3eccda4))
  removed imports and dependencies to scheduler

# [1.0.0-alpha.2](https://github.com/rx-angular/rx-angular/compare/cdk@1.0.0-alpha.0...cdk@1.0.0-alpha.2) (2021-02-23)

### Bug Fixes

- **cdk:** add scheduler

# [1.0.0-alpha.1](https://github.com/rx-angular/rx-angular/compare/cdk@1.0.0-alpha.0...cdk@1.0.0-alpha.1) (2021-02-22)

### Bug Fixes

- **cdk:** adopt build ([cbc59d3](https://github.com/rx-angular/rx-angular/commit/cbc59d3b05032154ef7829822a6d5fd59ce82010))
- **cdk:** fix build ([e9b6d2d](https://github.com/rx-angular/rx-angular/commit/e9b6d2d51e85d25335f6ded794450df860badaca))

### Features

- **cdk:** harmonize API ([#548](https://github.com/rx-angular/rx-angular/issues/548)) ([054d3e5](https://github.com/rx-angular/rx-angular/commit/054d3e573fc305f0b51e9f48c8dcb85554bf532f))

# 1.0.0-alpha.0 (2021-02-21)

### Bug Fixes

- **cdk:** adopt build ([cbc59d3](https://github.com/rx-angular/rx-angular/commit/cbc59d3b05032154ef7829822a6d5fd59ce82010))
- **cdk:** fix build ([e9b6d2d](https://github.com/rx-angular/rx-angular/commit/e9b6d2d51e85d25335f6ded794450df860badaca))

### Features

- **cdk:** add zone-config ([#492](https://github.com/rx-angular/rx-angular/issues/492)) ([35f2d9b](https://github.com/rx-angular/rx-angular/commit/35f2d9b703401552318f6be665f3442212e43ae1))
- **cdk:** docs and tests ([ce29d15](https://github.com/rx-angular/rx-angular/commit/ce29d15916c676b29d5159121d35605cbcc96885))
- **cdk:** setup render-strategies and template-management ([#489](https://github.com/rx-angular/rx-angular/issues/489)) ([8cbcdbd](https://github.com/rx-angular/rx-angular/commit/8cbcdbde2283327d3a6b404f564b46751f039d1b))
