# RxAngular ![rx-angular CI](https://github.com/rx-angular/rx-angular/workflows/rx-angular%20CI/badge.svg?branch=master)

RxAngular offers a comprehensive toolset for handling fully reactive Angular applications with the main focus on runtime
performance and template rendering.

RxAngular is divided into two initially independent packages:

- [📦@rx-angular/state](https://github.com/rx-angular/rx-angular/tree/master/libs/state/README.md)
- [📦@rx-angular/template](https://github.com/rx-angular/rx-angular/tree/master/libs/template/README.md)

Used together, you get a powerful tool for developing high-performance angular applications with or without NgZone.

This repository holds a set of helpers to create **fully reactive** as well as **fully zone-less** applications.

![rx-angular logo](https://raw.githubusercontent.com/rx-angular/rx-angular/master/apps/template-demo/src/assets/images/rx-angular_logo.png)

## Homepage

https://rx-angular.github.io/rx-angular/#/

## Packages

Find details in the linked readme files below for installation and setup instructions, examples and resources.

- [📦@rx-angular/state](https://github.com/rx-angular/rx-angular/tree/master/libs/state/README.md) - Reactive Component State-Management
  Description:
  RxState is a light-weight, flexible tool to manage component state in efficiently. 
  It ships with a light weight state management, RxJS operators and transformation helpers.
  Setup:
  - `npm install --save @rx-angular/state`  
  - `yarn add @rx-angular/state`  
  Features:
  - Reactive Component-State [RxState<T>]()
    - State as a signal [.$]().pipe(map(s => s.prop))
      - Imperative style 
        - [.set]()('prop', (oldState, value) => oldState.prop + value) 
        - [.get]()('prop') 
      - Reactive style  
        - [.connect]()('prop', prop$) 
        - [.select]()(map(s => s.prop))
      - Reactive Side-Effects [.hold]()()
  - Reactive state management operators
    - o$.pipe([select(map(s => s.prop))]() 
    - o$.pipe([selectSlice(['list'], {list})]() 
    - o$.pipe([stateful()]() 
    - o$.pipe([distinctUntilSomeChanged(['list'], {list})]() 
  - Imperative state transformation helper
    - Array []: [insert]() , [remove]() , [toDictionary](), [update]() 
    - Object {}: [deleteProp]() , [dictionaryToArray](), [patch]() , [setProp]() , [toggle]() 
   
- [📦@rx-angular/template](https://github.com/rx-angular/rx-angular/tree/master/libs/template/README.md) - High-Performance Reactive Rendering

## Install

`npm install --save @rx-angular/state`  
`npm install --save @rx-angular/template`  
or  
`yarn add @rx-angular/state`  
`yarn add @rx-angular/template`
