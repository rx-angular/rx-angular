# 🧪 Virtual Scrolling

The `@rx-angular/template/experimental/virtual-scrolling` package can be seen as a
high performant implementation of its counterpart from the official `@angular/cdk`.
The API is heavily inspired by `@angular/cdk` and is divided into multiple
core components which have to be glued together:

* `RxVirtualViewRepeater`, implemented by `RxVirtualFor`
* `RxVirtualScrollViewport`, implemented by `RxVirtualScrollViewportComponent`
* `RxVirtualScrollStrategy`, implemented by `AutosizeVirtualScrollStrategy` and `FixedSizeVirtualScrollStrategy`


## RxVirtualFor

The `*rxVirtualFor` structural directive provides a convenient and performant
way for rendering huge lists of items. It brings all the benefits `rxFor` does, and additionally provides virtual scrolling.
Instead of rendering every item provided, rxVirtualFor only renders what is currently visible to the user, thus providing
excellent runtime performance for huge sets of data. The technique to render items is comparable to the one used by twitter and 
explained in very much detail by @DasSurma in his blog post about the
[complexities of infinite scrollers](https://developer.chrome.com/blog/infinite-scroller/).   

"Each recycling of a DOM element would normally relayout the entire runway which would bring us well below our target
of 60 frames per second. To avoid this, we are taking the burden of layout onto ourselves and use absolutely positioned
elements with transforms." (@DasSurma)

### API
The API is a combination of `@rx-angular/template/for` &
`@angular/cdk` `*cdkVirtualFor`.
* trackBy: `(index: number, item: T) => any` | `keyof T`
* strategy: `string` | `Observable<string>`
* parent: `boolean`;
* renderCallback: `Subject<T[]>`
* viewCache: `number`
* (Injected) scrollStrategy: `RxVirtualScrollStrategy<T, U>`
* provides itself as RxVirtualViewRepeater for RxVirtualViewPortComponent to operate

### Features
* Push based architecture
* Comprehensive set of context variables
* Opt-out of `NgZone` with `patchZone`
* Notify when rendering of child templates is finished (`renderCallback`)
* Super efficient layouting with css transformations
* Define a viewCache in order to re-use views instead of re-creating them
* Configurable RxVirtualScrollStrategy<T, U> providing the core logic to calculate the viewRange and position DOM
  Nodes

### Context Variables

The following context variables are available for each template:

- $implicit: `T` // the default variable accessed by `let val`
- item$: `Observable<T>` // the same value as $implicit, but as `Observable`
- index: `number` // current index of the item
- count: `number` // count of all items in the list
- first: `boolean` // true if the item is the first in the list
- last: `boolean` // true if the item is the last in the list
- even: `boolean` // true if the item has on even index (index % 2 === 0)
- odd: `boolean` // the opposite of even
- index$: `Observable<number>` // index as `Observable`
- count$: `Observable<number>` // count as `Observable`
- first$: `Observable<boolean>` // first as `Observable`
- last$: `Observable<boolean>` // last as `Observable`
- even$: `Observable<boolean>` // even as `Observable`
- odd$: `Observable<boolean>` // odd as `Observable`
- select: `(keys: (keyof T)[], distinctByMap) => Observable<Partial<T>>`
  // returns a selection function which
  // accepts an array of properties to pluck out of every list item. The function returns the selected properties of
  // the current list item as distinct `Observable` key-value-pair. See the example below:

This example showcases the `select` view-context function used for deeply nested lists.

 ```html
<rx-virtual-scroll-viewport>
  <div
   autosized
   *rxVirtualFor="let hero of heroes$; trackBy: trackItem; let select = select;">
    <div>
      <strong>{{ hero.name }}</strong></br>
      Defeated enemies:
    </div>
     <span *rxFor="let enemy of select(['defeatedEnemies']); trackBy: trackEnemy;">
       {{ enemy.name }}
     </span>
  </div>
</rx-virtual-scroll-viewport>
 ```

### Using the context variables

```html
<rx-virtual-scroll-viewport>
 <div
    *rxVirtualFor="
      let item of observableItems$;
      let count = count;
      let index = index;
      let first = first;
      let last = last;
      let even = even;
      let odd = odd;
      trackBy: trackItem;
    "
  >
    <div>{{ count }}</div>
    <div>{{ index }}</div>
    <div>{{ item }}</div>
    <div>{{ first }}</div>
    <div>{{ last }}</div>
    <div>{{ even }}</div>
    <div>{{ odd }}</div>
  </div>
</rx-virtual-scroll-viewport>
```

## RxVirtualScrollViewportComponent

Container component comparable to CdkVirtualScrollViewport acting as viewport for `*rxVirtualFor` to operate on. 
Its main purpose is to implement the `RxVirtualScrollViewport` interface as well as maintaining the scroll runways'
height in order to give the provided `RxVirtualScrollStrategy` room to position items. Furthermore, it will gather and forward
all events to the consumer of `rxVirtualFor`.

## AutosizeVirtualScrollStrategy

The `AutosizeVirtualScrollStrategy` provides a twitter-like virtual-scrolling implementation. It is able to render and position
items based on their individual size. It is comparable to `@angular/cdk/experimental` `AutosizeVirtualScrollStrategy`, but with
a high performant layouting technique and more features. On top of this the `AutosizeVirtualScrollStrategy` is leveraging the
native `ResizeObserver` in order to detect size changes for each individual view rendered to the DOM and properly re-position
accordingly. In order to provide top-notch runtime performance the `AutosizeVirtualScrollStrategy` builds up caches that
prevent DOM interactions whenever possible. Once a view was visited, its properties will be stored instead of re-read from the DOM
again as this can potentially lead to unwanted forced reflows.

## FixedSizeVirtualScrollStrategy

The `FixedSizeVirtualScrollStrategy` provides a  way of rendering items of
a given size. It is comparable to `@angular/cdk` `FixedSizeVirtualScrollStrategy`,
but with a high performant layouting technique.
