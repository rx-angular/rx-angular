import {
  Directive,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { RxStrategyProvider } from '@rx-angular/cdk/render-strategies';
import { NextObserver, Subscription } from 'rxjs';

/**
 * @Directive ChunkDirective
 *
 * @description
 *
 * The `*rxChunk` directive serves as a convenient way for dividing template work into
 * chunks. Applied to an element, it will schedule a task with the given RxRenderStrategy
 * in order to postpone the template creation of this element.
 *
 * ### Features of `*rxChunk`
 *
 * - lightweight alternative to `*rxLet="[]"`
 * - renderCallback
 * - no value binding
 * - no context variables
 * - zone agnostic
 * - suspense template
 *
 * @docsCategory ChunkDirective
 * @docsPage ChunkDirective
 * @publicApi
 */
@Directive({ selector: '[rxChunk]' })
export class ChunkDirective implements OnInit, OnDestroy {
  /**
   * @description
   * The rendering strategy with which the chunk directive should schedule the view
   * creation. If no strategy is defined, `*rxChunk` will use the configured
   * `primaryStrategy` as fallback instead.
   *
   * @example
   * \@Component({
   *   selector: 'app-root',
   *   template: `
   *     <div *rxChunk="strategy">
   *       chunked template
   *     </div>
   *   `
   * })
   * export class AppComponent {
   *   strategy = 'low';
   * }
   *
   * @param { RxStrategyNames<string> } strategy
   */
  @Input('rxChunk') strategy = this.strategyProvider.primaryStrategy;

  /**
   * @description
   * Setting the `patchZone` to a falsy value will cause the `*rxChunk` directive
   * to create the `EmbeddedView` outside of `NgZone`.
   *
   * @example
   * \@Component({
   *   selector: 'app-root',
   *   template: `
   *     <div *rxChunk="patchZone: false">
   *       chunked template out of NgZone
   *     </div>
   *   `
   * })
   * export class AppComponent { }
   *
   * @param { boolean } patchZone
   */
  @Input('rxChunkPatchZone') patchZone = this.strategyProvider.config.patchZone;

  /**
   * @description
   * A template to show while the chunk directive is waiting for scheduled task
   * with the given `RenderStrategy`.
   * This can be useful in order to minimize layout shifts caused by the delayed
   * view creation.
   *
   * @example
   * <app-hero [hero]="hero"
   *  *rxChunk="suspenseTpl: suspenseTemplate"></app-hero>
   * <ng-template #suspenseTemplate>
   *   <progress-spinner></progress-spinner>
   * </ng-template>
   *
   * @param {TemplateRef<unknown>} suspense
   */
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('rxChunkSuspenseTpl') suspense: TemplateRef<unknown>;

  /** @internal */
  private _renderObserver: NextObserver<void>;

  /**
   * @description
   * A callback informing about when the template was actually created. This can
   * be used when you need to know the exact timing when the template was
   * added to the DOM, e.g. for height calculations and such.
   *
   * @example
   * \@Component({
   *   selector: 'app-root',
   *   template: `
   *     <div *rxChunk="renderCallback: renderCallback">
   *       chunked template
   *     </div>
   *   `
   * })
   * export class AppComponent {
   *   renderCallback = new Subject<void>();
   *
   *   constructor() {
   *     this.renderCallback.subscribe(() => {
   *       // the div is now accessible
   *     })
   *   }
   * }
   *
   *
   * @param {NextObserver<void>} renderCallback
   */
  @Input('rxChunkRenderCallback')
  set renderCallback(renderCallback: NextObserver<void>) {
    this._renderObserver = renderCallback;
  }

  /** @internal */
  private subscription?: Subscription;

  constructor(
    private strategyProvider: RxStrategyProvider<string>,
    private templateRef: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.subscription = this.strategyProvider
      .schedule(
        () => {
          this.viewContainer.clear();
          this.createView();
        },
        {
          strategy:
            this.strategyProvider.strategies[this.strategy]?.name || undefined,
          patchZone: this.patchZone ? this.ngZone : false,
        }
      )
      .subscribe(() => this._renderObserver?.next());
    // do not create suspense template when strategy was sync and there already
    // is a template
    if (this.suspense && this.viewContainer.length === 0) {
      this.createView(this.suspense);
    }
  }

  ngOnDestroy() {
    this.viewContainer.clear();
    this.subscription?.unsubscribe();
  }

  private createView(template?: TemplateRef<unknown>): void {
    const tpl = template || this.templateRef;
    const view = this.viewContainer.createEmbeddedView(tpl);
    view.detectChanges();
  }
}
