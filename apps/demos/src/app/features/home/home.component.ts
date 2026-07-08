import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'rxa-home',
  template: `
    <h1>Welcome to RxAngular Demos!</h1>
    <h3>
      Explore various sections that will guide you through features of
      RxAngular.
    </h3>

    <ul>
      <li><h4>🏁 Fundamentals</h4></li>
      Demos presenting fundamental rules and functionalities existing in Angular
      that are good to know before you start your journey with RxAngular.

      <li><h4>🧰 Template</h4></li>
      Playground for different functionalities of the
      <code>&#64;rx-angular/template</code>
      package.

      <li><h4>📋 Tutorials</h4></li>
      Tutorials for features existing in the
      <code>&#64;rx-angular</code>
      packages.

      <li><h4>🧮 Integrations</h4></li>
      <code>&#64;rx-angular/state</code>
      integrated with different libraries and patterns.

      <li><h4>🔬 Experiments</h4></li>
      Experiments with features, that are still under development. ⚠️Warning!
      ⚠️Unstable or broken features may lay ahead!
    </ul>
  `,
  styles: [
    `
      code {
        background: black;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class HomeComponent {}
