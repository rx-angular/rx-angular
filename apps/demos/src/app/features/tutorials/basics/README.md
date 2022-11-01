# Refactoring to a Reactive Component Setup

In this tutorial, we will learn how to refactor a component written in the imperative style to a fully reactive implementation.

To set up the project locally, complete the following steps:

- `git clone https://github.com/rx-angular/rx-angular.git rx-angular`
- `cd rx-angular`
- `npm install` or `yarn install`
- `npm start demos` or `yarn nx serve demos`

You can find the working application at `http://localhost:4200/rx-angular/demos`.

The source can be found under `apps/demos/src/app/features/tutorials`.

The example shows a simple component setup of a parent container and a child component displaying the data.

In the child component, an expansion-panel is used to display the data. This panel can be opened and closed by clicking on the title.
The open/close state of the expansion-panel is forwarded to the parent component as an output binding.

As an input binding, the parent container maintains a number over an input box. Every change of the number gets forwarded to the child component over an input binding.

There is a background process running in the child component. The input value from the parent is used to start an interval and refresh the list data every [n] milliseconds.
Furthermore, there is a refresh button. A click on it also refreshes the list data.

The topics we will discuss in this tutorial include:

- [Setting up a reactive state, selections, and UI interactions][1-setup]
- [Handling @Inputs reactively][2-input-bindings]
- [Handling @Output reactively][3-output-bindings]
- [Creating a global state and attach it to components][4-global-state]
- [Handling Side Effects reactively][5-side-effects]
<!-- - [Presenter Pattern][6-presenter-pattern] -->

You can also check out the full solution after applying all the above steps [here](https://github.com/rx-angular/rx-angular/tree/main/apps/demos/src/app/features/tutorials/basics/solution).

# How to use this tutorial

Each chapter contains three files:

- `.start.component.ts` showing the initial state of the file
- `.solution.component.ts` demonstrating the state of the file after applying all the changes discussed in that chapter
- `.container.component.ts`, a container where you can check the result of the solution; by default, it uses the `.start.component.ts` in the template, so change it by using the `.solution.component.ts` to see the difference

> You can compare the `.start.component.ts` and `.solution.component.ts` against each other to see what changes have been made.

> To compare two files against each other in VSCode, you have to: <br> <br>
> 1- open the first file (in our case, the `.start.component.ts`) <br>
> 2- press Ctrl(Cmd)+Shift+P and choose `File: Compare Active file with ...` <br>
> 3- choose the second file (in our case, the `.solution.component.ts`)

[1-setup]: https://github.com/rx-angular/rx-angular/tree/main/apps/demos/src/app/features/tutorials/basics/1-setup
[2-input-bindings]: https://github.com/rx-angular/rx-angular/tree/main/apps/demos/src/app/features/tutorials/basics/2-input-bindings
[3-output-bindings]: https://github.com/rx-angular/rx-angular/tree/main/apps/demos/src/app/features/tutorials/basics/3-output-bindings
[4-global-state]: https://github.com/rx-angular/rx-angular/tree/main/apps/demos/src/app/features/tutorials/basics/4-global-state
[5-side-effects]: https://github.com/rx-angular/rx-angular/tree/main/apps/demos/src/app/features/tutorials/basics/5-side-effects
