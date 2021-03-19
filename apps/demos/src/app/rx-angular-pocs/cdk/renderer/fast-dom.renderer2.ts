import {
  Renderer2,
  RendererFactory2,
  RendererStyleFlags2,
  RendererType2,
} from '@angular/core';

import * as fastDom from 'fastdom';

export class FastDomRenderer2 implements Renderer2 {
  readonly data: { [key: string]: any };

  constructor(private delegate: Renderer2) {
    console.log('CTOR FastDomRenderer2');
    this.data = this.delegate.data;
  }

  destroyNode(node: any) {
    if (this.delegate.destroyNode) {
      this.delegate.destroyNode(node);
    }
  }

  destroy() {
    this.delegate.destroy();
  }

  createElement(name: string, namespace?: string): any {
    return this.delegate.createElement(name, namespace);
  }

  createComment(value: string): any {
    return this.delegate.createComment(value);
  }

  createText(value: string): any {
    return this.delegate.createText(value);
  }

  appendChild(parent: any, newChild: any): void {
    this.delegate.appendChild(parent, newChild);
  }

  insertBefore(parent: any, newChild: any, refChild: any): void {
    this.delegate.insertBefore(parent, newChild, refChild);
  }

  removeChild(parent: any, oldChild: any): void {
    this.delegate.removeChild(parent, oldChild);
  }

  selectRootElement(selectorOrNode: string | any): any {
    return this.delegate.selectRootElement(selectorOrNode);
  }

  setAttribute(el: any, name: string, value: string, namespace?: string): void {
    fastDom.mutate(() => {
      this.delegate.setAttribute(el, name, value, namespace);
    })
  }

  removeAttribute(el: any, name: string, namespace?: string): void {
    this.delegate.removeAttribute(el, name, namespace);
  }

  addClass(el: any, name: string): void {
    fastDom.mutate(() => {
      this.delegate.addClass(el, name);
    })
  }

  removeClass(el: any, name: string): void {
    fastDom.mutate(() => {
      this.delegate.removeClass(el, name);
    })
  }

  setStyle(
    el: any,
    style: string,
    value: any,
    flags?: RendererStyleFlags2
  ): void {
    fastDom.mutate(() => {
      console.log('fastDom')
      this.delegate.setStyle(el, style, value, flags);
    }, this);
  }

  removeStyle(el: any, style: string, flags: RendererStyleFlags2): void {
    this.delegate.removeStyle(el, style, flags);
  }

  setProperty(el: any, name: string, value: any): void {
    this.delegate.setProperty(el, name, value);
  }

  listen(
    target: 'document' | 'windows' | 'body' | any,
    eventName: string,
    callback: (event: any) => boolean
  ): () => void {
    return this.delegate.listen(target, eventName, callback);
  }

  parentNode(node: any): any {
    return this.delegate.parentNode(node);
  }

  nextSibling(node: any): any {
    return this.delegate.nextSibling(node);
  }

  setValue(node: any, value: string): void {
    return this.delegate.setValue(node, value);
  }
}

export class FastDomRendererRendererFactory implements RendererFactory2 {
  constructor(private delegate: RendererFactory2) {}

  createRenderer(element: any, renderData: RendererType2 | null): Renderer2 {
    return new FastDomRenderer2(
      this.delegate.createRenderer(element, renderData)
    );
  }
}
