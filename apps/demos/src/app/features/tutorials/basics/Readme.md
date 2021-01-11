# Refactoring to a reactive component setup

In this tutorial we will learn how to refactor a component written in imperative style to a fully reactive implementation.

To setup the project locally run following steps:

- `git clone https://github.com/rx-angular/rx-angular.git rx-angular`
- `cd rx-angular`
- `npm install` or `yarn install`
- `npm start demos` or `yarn nx serve demos`

The source can be found under `apps/demos/src/app/features/tutorials`

The example shows a simple component setup od a parent container and a child component displaying the data.

In the child component an expansion-panel is used to display the data. this panel can be opened and closed by clicking on the title.
The open/close state of the expansion-panel is forwarded to the parent component as output binding.

As input binding the parent container maintains a number over an input box. Every change of the number gets forwarded to the child component over an input binding.

In the child component there is a background process running. the input value from the parent gets used to start an interval and refresh the list data every [n] milliseconds.
Furthermore, there is a refresh button. A click on it also refreshes the list data.

Topics we will discuss are:

- [Setup a reactive state, selections and, UI interactions](./1-setup)
- [handle @Inputs reactively](./2-input-bindings)
- [handle @Output reactively](./3-output-bindings)
- [Create a global state and attach it to components](4-global-state)
- [Handing Side Effects reactively](./5-side-effects)
- [Presenter Pattern](./6-presenter-pattern)

you can also visit the full solution after applying all of the above steps in [here] (https://github.com/rx-angular/rx-angular/tree/master/apps/demos/src/app/features/tutorials/basics/solution)

# How to use this tutorial

each chapter has two files. one with `.start.ts` (showing the initial state) and `.solution.ts` (after applying all the changes). You can compare them against each other to see what changes is made.
