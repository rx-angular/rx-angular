import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import { RxState } from '@rx-angular/state';

import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { getGlobalRenderingStrategies } from '../core/global-render.strategy';
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

  @ViewChildren(ChildComponent) childComponents: QueryList<ChildComponent>;

  toggle = true;
  numChildren = 10;

  doRender = new Subject();

  items = Array.from(Array(this.numChildren).keys());

  constructor(private cdRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    const strategy = getGlobalRenderingStrategies({ cdRef: this.cdRef })
      .chunk;
    this.hold(
      this.doRender.pipe(
        tap(
          () =>
            (this.items = Array.from(Array(this.numChildren).keys()).map(() =>
              Math.random()
            ))
        ),
        strategy.rxScheduleCD
      ),
      () => {
        console.log('rendered', this);
      }
    );
  }

  ngAfterViewInit() {}

  updateChildrenBlocking() {
    this.childComponents.forEach(child => child.doRenderBlocking.next());
  }

  updateChildrenStaticBlocking() {
    this.childComponents.forEach(child => child.renderStatic('blocking'));
  }

  updateChildrenChunked() {
    this.childComponents.forEach(child => child.doRenderChunked.next());
  }

  updateChildrenStaticChunked() {
    this.childComponents.forEach(child => child.renderStatic('chunk'));
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
