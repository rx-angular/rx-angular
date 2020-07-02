import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import { RxState } from '@rx-angular/state';
import { getStrategies } from '@rx-angular/template';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Renderable } from '../interfaces';
import { ChildComponent } from './child.component';

@Component({
  selector: 'rx-angular-render-queue',
  templateUrl: './render-queue.component.html',
  styleUrls: ['./render-queue.component.css']
})
export class RenderQueueComponent
  extends RxState<Renderable<RenderQueueComponent>>
  implements OnInit, AfterViewInit {
  /*@ViewChild(ChildComponent, { read: ComponentRef}) child1Ref: ComponentRef<ChildComponent>;
   @ViewChild(ChildComponent) child1: ChildComponent;
   @ViewChild(Child2Component, { read: ComponentRef}) child2Ref: ComponentRef<Child2Component>;
   @ViewChild(Child2Component) child2: Child2Component;*/

  @ViewChildren(ChildComponent) childComponents: QueryList<ChildComponent>;

  toggle = true;

  doRender = new Subject();

  items = Array.from(Array(100).keys());

  constructor(private cdRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    const strategy = getStrategies({ cdRef: this.cdRef }).localBlocking;
    this.hold(
      this.doRender.pipe(
        tap(
          () =>
            (this.items = Array.from(Array(1000).keys()).map(() =>
              Math.random()
            ))
        ),
        strategy.behavior
      ),
      () => {
        console.log('rendered', this);
      }
    );
  }

  ngAfterViewInit() {}

  updateChildren() {
    this.childComponents.forEach(child => child.doRender.next());
  }

  doToggle() {
    this.toggle = !this.toggle;
  }

  renderSelf(): void {
    this.doRender.next();
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
    //this.child2.doRender.next();
    //this.child2.doRender.next();
  }

  renderChild1(): void {
    //this.child1.doRender.next();
    //this.child1.doRender.next();
  }
}
