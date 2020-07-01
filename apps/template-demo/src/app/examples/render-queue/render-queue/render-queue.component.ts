import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { pluck } from 'rxjs/operators';
import { Renderable } from '../interfaces';
import { RxRenderer } from '../rx-renderer.service';
import { ChildComponent } from './child.component';
import { Child2Component } from './child2.component';

@Component({
  selector: 'rx-angular-render-queue',
  templateUrl: './render-queue.component.html',
  styleUrls: ['./render-queue.component.css']
})
export class RenderQueueComponent
  extends RxState<Renderable<RenderQueueComponent>>
  implements AfterViewInit {
  @ViewChild(ChildComponent) child1: ChildComponent;
  @ViewChild(Child2Component) child2: Child2Component;

  toggle = true;

  constructor(private renderer: RxRenderer) {
    super();
    this.renderer.connect('ref', this.$.pipe(pluck('self')));
    this.renderer.myConnect(this.$.pipe(pluck('self')));

    this.renderer.removeMe(this);
  }

  ngAfterViewInit() {
    this.renderer.connect('ref', this.child1.$.pipe(pluck('self')));
    this.renderer.myConnect(this.child1.destroyed);
    this.renderer.connect('ref', this.child2.$.pipe(pluck('self')));
    this.renderer.myConnect(this.child2.destroyed);
  }

  doToggle() {
    this.toggle = !this.toggle;
  }

  renderSelf(): void {
    this.set({ self: this });
  }

  renderMixed(): void {
    this.renderChild2();
    this.renderChild2();
    this.renderChild2();
    this.renderChild1();
    this.renderChild1();
    this.renderChild1();
  }

  renderChild2(): void {
    this.renderer.set({ ref: this.child2 });
    this.renderer.set({ ref: this.child2 });
  }

  renderChild1(): void {
    this.renderer.set({ ref: this.child1 });
    this.renderer.set({ ref: this.child1 });
  }
}
