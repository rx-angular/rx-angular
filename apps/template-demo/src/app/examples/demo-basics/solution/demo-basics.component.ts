import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'demo-basics',
  template: `
    render{{ render() }}
    <button [unpatch] (click)="log($event)" (mouseover)="log($event)">
      test
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoBasicsComponent {
  rerenders = 0;
  render = () => ++this.rerenders;

  log = event =>
    console.log(`${event.type} in zone ${(window as any).Zone.current.name}`);
}
