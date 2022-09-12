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
