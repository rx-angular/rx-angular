(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["alphas-compare-alphas-compare-module"],{

/***/ "38Rf":
/*!**********************************************************************************!*\
  !*** ./node_modules/templateAlpha1/__ivy_ngcc__/fesm2015/rx-angular-template.js ***!
  \**********************************************************************************/
/*! exports provided: LetDirective, LetModule, PushModule, PushPipe, SchedulingPriority, TemplateModule, UnpatchEventsDirective, UnpatchEventsModule, ViewportPrioDirective, ViewportPrioModule, getStrategies, getZoneUnPatchedApi, isNgZone, isViewEngineIvy, priorityTickMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LetDirective", function() { return LetDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LetModule", function() { return LetModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PushModule", function() { return PushModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PushPipe", function() { return PushPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SchedulingPriority", function() { return SchedulingPriority; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TemplateModule", function() { return TemplateModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnpatchEventsDirective", function() { return UnpatchEventsDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnpatchEventsModule", function() { return UnpatchEventsModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewportPrioDirective", function() { return ViewportPrioDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewportPrioModule", function() { return ViewportPrioModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStrategies", function() { return getStrategies; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getZoneUnPatchedApi", function() { return getZoneUnPatchedApi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNgZone", function() { return isNgZone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isViewEngineIvy", function() { return isViewEngineIvy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "priorityTickMap", function() { return priorityTickMap; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");




/**
 * @description
 *
 * A fallback for the new `globalThis` reference.
 *
 *  It should be used to replace `window` due to different environments in:
 *  - SSR (Server Side Rendering)
 *  - Tests
 *  - Browser
 *
 *  @return {globalThis} - A reference to globalThis. `window` in the Browser.
 */

function getGlobalThis() {
    return (window || self || globalThis);
}

/*
 * createPropertiesWeakMap
 *
 * @param getDefaults: (o: O) => P
 * Example:
 *
 * export interface Properties {
 *   isCoalescing: boolean;
 * }
 *
 * const obj: object = {
 *   foo: 'bar',
 *   isCoalescing: 'weakMap version'
 * };
 *
 * const getDefaults = (ctx: object): Properties => ({isCoalescing: false});
 * const propsMap = createPropertiesWeakMap<object, Properties>(getDefaults);
 *
 * console.log('obj before:', obj);
 * // {foo: "bar", isCoalescing: "weakMap version"}
 * console.log('props before:', propsMap.getProps(obj));
 * // {isCoalescing: "weakMap version"}
 *
 * propsMap.setProps(obj, {isCoalescing: true});
 * console.log('obj after:', obj);
 * // {foo: "bar", isCoalescing: "weakMap version"}
 * console.log('props after:', propsMap.getProps(obj));
 * // {isCoalescing: "true"}
 * */
function createPropertiesWeakMap(getDefaults) {
    const propertyMap = new WeakMap();
    return {
        getProps: getProperties,
        setProps: setProperties
    };
    function getProperties(ctx) {
        const defaults = getDefaults(ctx);
        const propertiesPresent = propertyMap.get(ctx);
        let properties;
        if (propertiesPresent !== undefined) {
            properties = propertiesPresent;
        }
        else {
            properties = {};
            Object.entries(defaults).forEach(([prop, value]) => {
                properties[prop] = hasKey(ctx, prop) ? ctx[prop] : value;
            });
            propertyMap.set(ctx, properties);
        }
        return properties;
    }
    function setProperties(ctx, props) {
        const properties = getProperties(ctx);
        Object.entries(props).forEach(([prop, value]) => {
            properties[prop] = value;
        });
        propertyMap.set(ctx, properties);
        return properties;
    }
    function hasKey(ctx, property) {
        return ctx[property] != null;
    }
}

/**
 * envZonePatched
 *
 * @description
 *
 * This function checks the window object `zone.js` was instantiated.
 * If so, the `window` object maintains a property named `Zone`.
 *
 * Here how Angular checks it: https://github.com/angular/angular/blob/master/packages/core/src/zone/ng_zone.ts#L123
 *
 * @return {boolean} - true if `zone.js` patched global APIs.
 *
 */
function envZonePatched() {
    return getGlobalThis().Zone !== undefined;
}
/**
 * apiZonePatched
 *
 * @description
 *
 * This function checks if a specific Browser API is patched by `zone.js`.
 *
 * @param name {string} - The name of the API to check.
 * @return {boolean} - true if `zone.js` patched the API in question.
 *
 */
function apiZonePatched(name) {
    // if symbol is present, zone patched the API
    return getGlobalThis()['__zone_symbol__' + name] !== undefined;
}
const zoneDetectionCache = new WeakMap();
/**
 * isNgZone
 *
 * @description
 *
 * This function takes an instance of a class which implements the NgZone interface and checks if
 * its `runOutsideAngular()` function calls `apply()` on the function passed as parameter. This
 * means the Angular application that instantiated this service assumes it runs in a ZoneLess
 * environment, and therefore it's change detection will not be triggered by zone related logic.
 *
 * However, keep in mind this does not mean `zone.js` is not present.
 * The environment could still run in ZoneFull mode even if Angular turned it off.
 * Consider the situation of a Angular element configured for ZoneLess
 * environments is used in an Angular application relining on the zone mechanism.
 *
 * @param instance {Class Instance} - The instance to check for constructor name of `NgZone`.
 * @return {boolean} - true if instance is of type `NgZone`.
 *
 */
function isNgZone(instance) {
    const cachedValue = zoneDetectionCache.get(instance);
    if (cachedValue !== undefined) {
        return cachedValue;
    }
    let calledApply = false;
    function fn() { }
    fn.apply = () => (calledApply = true);
    instance.runOutsideAngular(fn);
    zoneDetectionCache.set(instance, calledApply);
    return calledApply;
}
/**
 * isNoopNgZone
 *
 *@description
 *
 * This function takes any instance of a class and checks
 * if the constructor name is equal to `NoopNgZone`.
 *
 * For more detailed information read the description of [isNgZone](#isngzone).
 *
 * @param instance {Class Instance} - The instance to check for constructor name of `NoopNgZone`.
 * @return {boolean} - true if instance is of type `NoopNgZone`.
 *
 */
function isNoopNgZone(instance) {
    return !isNgZone(instance);
}

/** A shared promise instance to cause a delay of one microtask */
let resolvedPromise = null;
function getUnpatchedResolvedPromise() {
    resolvedPromise =
        resolvedPromise ||
            (apiZonePatched('Promise')
                ? getGlobalThis().__zone_symbol__Promise.resolve()
                : Promise.resolve());
    return resolvedPromise;
}

/**
 * envRunsIvy
 *
 * @description
 * Determines the used view engine of an Angular project is Ivy or not.
 * The check is done based on following table:
 * | render       | ViewEngine | ViewEngine | Ivy         | Ivy         |
 * | ------------ | ---------- | ---------- | ----------- | ----------- |
 * | **mode**     | prod       | dev        | prod        | dev         |
 * | **ng**       | present    | present    | `undefined` | present     |
 * | **ng.probe** | present    | present    | `undefined` | `undefined` |
 *
 *  So for Ivy we need to make sure that ng is undefined or,
 *  in case of dev environment, ng.probe is undefined.
 *
 * @return {boolean} - true if the used view engine is Ivy.
 *
 */
function isViewEngineIvy() {
    const ng = getGlobalThis().ng;
    // Is the global ng object is unavailable?
    // ng === undefined in Ivy production mode
    // View Engine has the ng object both in development mode and production mode.
    return (ng === undefined ||
        // in case we are in dev mode in ivy
        // `probe` property is available on ng object we use View Engine.
        ng.probe === undefined);
}

/**
 * getZoneUnPatchedApi
 *
 * @description
 *
 * This function returns the zone un-patched API for the a specific Browser API.
 * If no element is passed the window is used instead
 *
 * @param name {string} - The name of the API to check.
 * @param elem {any} - The elem to get un-patched API from.
 * @return {Function} - The zone un-patched API in question.
 *
 */
function getZoneUnPatchedApi(name, elem) {
    elem = elem || getGlobalThis();
    return apiZonePatched(name) ? elem['__zone_symbol__' + name] : elem[name];
}

const coalescingManager = createCoalesceManager();
const ɵ0 = ctx => ({
    numCoalescingSubscribers: 0
});
const coalescingContextPropertiesMap = createPropertiesWeakMap(ɵ0);
function createCoalesceManager() {
    return {
        remove: removeWork,
        add: addWork,
        isCoalescing
    };
    // Increments the number of subscriptions in a scope e.g. a class instance
    function removeWork(scope = {}) {
        const numCoalescingSubscribers = coalescingContextPropertiesMap.getProps(scope).numCoalescingSubscribers -
            1;
        coalescingContextPropertiesMap.setProps(scope, {
            numCoalescingSubscribers
        });
    }
    // Decrements the number of subscriptions in a scope e.g. a class instance
    function addWork(scope = {}) {
        const numCoalescingSubscribers = coalescingContextPropertiesMap.getProps(scope).numCoalescingSubscribers +
            1;
        coalescingContextPropertiesMap.setProps(scope, {
            numCoalescingSubscribers
        });
    }
    // Checks if anybody else is already coalescing atm
    function isCoalescing(scope = {}) {
        return (coalescingContextPropertiesMap.getProps(scope).numCoalescingSubscribers >
            0);
    }
}

/**
 * @description
 * Limits the number of synchronous emitted a value from the source Observable to
 * one emitted value per
 *   [`AnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame), then repeats
 *   this process for every tick of the browsers event loop.
 *
 * The coalesce operator is based on the [throttle](https://rxjs-dev.firebaseapp.com/api/operators/throttle) operator.
 * In addition to that is provides emitted values for the trailing end only, as well as maintaining a context to scope
 *   coalescing.
 *
 * @param {function(value: T): SubscribableOrPromise} durationSelector - A function
 * that receives a value from the source Observable, for computing the silencing
 * duration for each source value, returned as an Observable or a Promise.
 * It defaults to `requestAnimationFrame` as durationSelector.
 * @param {Object} config - A configuration object to define `leading` and `trailing` behavior and the context object.
 * Defaults to `{ leading: false, trailing: true }`. The default scoping is per subscriber.
 * @return {Observable<T>} An Observable that performs the coalesce operation to
 * limit the rate of emissions from the source.
 *
 * @usageNotes
 * Emit clicks at a rate of at most one click per second
 * ```ts
 * import { fromEvent, animationFrames } from 'rxjs';
 * import { coalesce } from 'ngRx/component';
 *
 * const clicks = fromEvent(document, 'click');
 * const result = clicks.pipe(coalesce(ev => animationFrames));
 * result.subscribe(x => console.log(x));
 * ```
 */
function coalesceWith(durationSelector, scope) {
    const _scope = scope || {};
    return source => {
        const o$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"](observer => {
            const rootSubscription = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subscription"]();
            rootSubscription.add(source.subscribe(createInnerObserver(observer, rootSubscription)));
            return rootSubscription;
        });
        return o$;
        function createInnerObserver(outerObserver, rootSubscription) {
            let actionSubscription;
            let latestValue;
            const tryEmitLatestValue = () => {
                coalescingManager.remove(_scope);
                if (!coalescingManager.isCoalescing(_scope)) {
                    outerObserver.next(latestValue);
                }
            };
            return {
                complete: () => {
                    if (actionSubscription) {
                        tryEmitLatestValue();
                    }
                    outerObserver.complete();
                },
                error: error => outerObserver.error(error),
                next: value => {
                    latestValue = value;
                    if (!actionSubscription) {
                        coalescingManager.add(_scope);
                        actionSubscription = durationSelector.subscribe({
                            next: () => {
                                tryEmitLatestValue();
                                actionSubscription = undefined;
                            },
                            complete: () => {
                                if (actionSubscription) {
                                    tryEmitLatestValue();
                                    actionSubscription = undefined;
                                }
                            }
                        });
                        rootSubscription.add(actionSubscription);
                    }
                }
            };
        }
    };
}

/**
 * Noop Strategy
 *
 * This strategy is does nothing. It serves for debugging only
 *
 * | Name        | ZoneLess | Render Method | ScopedCoalescing | Scheduling | Chunked |
 * |-------------| ---------| --------------| ---------------- | ---------- |-------- |
 * | `noop`      | ❌       | ❌             | ❌                | ❌         | ❌      |
 *
 * @param config { RenderStrategyFactoryConfig } - The values this strategy needs to get calculated.
 * @return {RenderStrategy} - The calculated strategy
 *
 */
function createNoopStrategy() {
    return {
        name: 'noop',
        detectChanges: () => { },
        rxScheduleCD: o => o,
        scheduleCD: () => new AbortController()
    };
}

/**
 * Native Strategy
 * @description
 *
 * - mFC - `cdRef.markForCheck`
 *
 * This strategy mirrors Angular's built-in `async` pipe.
 * This means for every emitted value `ChangeDetectorRef#markForCheck` is called.
 *
 * | Name        | ZoneLess | Render Method | ScopedCoalescing | Scheduling | Chunked |
 * |-------------| ---------| --------------| ---------------- | ---------- |-------- |
 * | `native`    | ❌       | mFC           | ❌                | ❌         | ❌      |
 *
 * @param config { RenderStrategyFactoryConfig } - The values this strategy needs to get calculated.
 * @return {RenderStrategy} - The calculated strategy
 *
 */
function createNativeStrategy(config) {
    const component = config.cdRef.context;
    return {
        name: 'native',
        detectChanges: () => config.cdRef.markForCheck(),
        rxScheduleCD: o => o.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(() => Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵmarkDirty"])(component))),
        scheduleCD: () => {
            Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵmarkDirty"])(component);
            return new AbortController();
        }
    };
}

function nameToStrategy(strategies) {
    return (o$) => {
        return o$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((strategy) => {
            const s = strategies[strategy];
            if (!!s) {
                return s;
            }
            throw new Error(`Strategy ${strategy} does not exist.`);
        }));
    };
}

/**
 * RenderAware
 *
 * @description
 * This function returns an object that holds all the shared logic for the push pipe and the let directive
 * responsible for change detection
 * If you extend this class you need to implement how the update of the rendered value happens.
 * Also custom behaviour is something you need to implement in the extending class
 */
function createRenderAware(cfg) {
    const strategyName$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["ReplaySubject"](1);
    let currentStrategy;
    const strategy$ = strategyName$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(stringOrObservable => typeof stringOrObservable === 'string'
        ? Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(stringOrObservable)
        : stringOrObservable), nameToStrategy(cfg.strategies), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(s => (currentStrategy = s)));
    const observablesFromTemplate$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["ReplaySubject"](1);
    const valuesFromTemplate$ = observablesFromTemplate$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["distinctUntilChanged"])());
    let firstTemplateObservableChange = true;
    const renderingEffect$ = valuesFromTemplate$.pipe(
    // handle null | undefined assignment and new Observable reset
    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(observable$ => {
        if (observable$ === null) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(null);
        }
        if (!firstTemplateObservableChange) {
            cfg.resetObserver.next();
            if (observable$ === undefined) {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(undefined);
            }
        }
        firstTemplateObservableChange = false;
        return observable$;
    }), 
    // forward only observable values
    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["filter"])(o$ => o$ !== undefined), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(o$ => o$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(cfg.updateObserver), currentStrategy.rxScheduleCD, Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["finalize"])(() => currentStrategy.scheduleCD()))), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(e => {
        console.error(e);
        return rxjs__WEBPACK_IMPORTED_MODULE_0__["EMPTY"];
    }));
    return {
        nextPotentialObservable(value) {
            observablesFromTemplate$.next(value);
        },
        nextStrategy(nextConfig) {
            strategyName$.next(nextConfig);
        },
        activeStrategy$: strategy$,
        subscribe() {
            return new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subscription"]()
                .add(strategy$.subscribe())
                .add(renderingEffect$.subscribe());
        }
    };
}

function staticCoalesce(work, durationSelector, scope = {}, abC = new AbortController()) {
    let sub;
    if (!coalescingManager.isCoalescing(scope)) {
        coalescingManager.add(scope);
        sub = durationSelector.subscribe(() => {
            tryExecuteWork();
        });
        const abortHandler = function () {
            sub.unsubscribe();
            abC.signal.removeEventListener('abort', abortHandler, false);
        };
        abC.signal.addEventListener('abort', abortHandler, false);
    }
    return abC;
    // =====
    function tryExecuteWork() {
        coalescingManager.remove(scope);
        if (!coalescingManager.isCoalescing(scope)) {
            return work();
        }
    }
}

var PostTaskSchedulerPriority;
(function (PostTaskSchedulerPriority) {
    PostTaskSchedulerPriority["background"] = "background";
    PostTaskSchedulerPriority["userBlocking"] = "user-blocking";
    PostTaskSchedulerPriority["userVisible"] = "user-visible";
})(PostTaskSchedulerPriority || (PostTaskSchedulerPriority = {}));
const postTaskScheduler = typeof window !== 'undefined'
    ? window.scheduler || {
        postTask(options) {
            const start = Date.now();
            return new Promise(resolve => {
                setTimeout(function () {
                    console.error('postTask not implemented. Use setTimeout as fallback');
                    resolve();
                }, 1);
            });
        }
    }
    : () => { };

const animationFrameTick = () => new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"](subscriber => {
    const id = getZoneUnPatchedApi('requestAnimationFrame')(() => {
        subscriber.next(0);
        subscriber.complete();
    });
    return () => {
        getZoneUnPatchedApi('cancelAnimationFrame')(id);
    };
});

// @NOTICE replace logic with 7v handling of promises in RxJS
const promiseTick = () => new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"](subscriber => {
    let cancelled = false;
    getUnpatchedResolvedPromise()
        .then(() => {
        if (!cancelled) {
            subscriber.next(0);
            subscriber.complete();
        }
    })
        .catch(e => {
        subscriber.error(e);
    });
    return () => {
        cancelled = true;
        subscriber.complete();
    };
});

const timeoutTick = () => new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"](subscriber => {
    const id = window.__zone_symbol__setTimeout(() => {
        subscriber.next(0);
        subscriber.complete();
    });
    return () => {
        window.__zone_symbol__clearTimeout(id);
    };
});

const cancelIdleCallback = typeof window !== 'undefined'
    ? window.cancelIdleCallback ||
        function (idleId) {
            console.warn('Fake cancelIdleCallback used');
            clearTimeout(idleId);
        }
    : () => { };
const requestIdleCallback = typeof window !== 'undefined'
    ? window.requestIdleCallback ||
        function (cb) {
            console.warn('Fake requestIdleCallback used');
            const start = Date.now();
            return setTimeout(function () {
                cb({
                    didTimeout: false,
                    timeRemaining: function () {
                        return Math.max(0, 50 - (Date.now() - start));
                    }
                });
            }, 1);
        }
    : () => { };

const idleCallbackTick = () => new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"](subscriber => {
    const id = requestIdleCallback(() => {
        subscriber.next(0);
        subscriber.complete();
    });
    return () => cancelIdleCallback(id);
});

const postTaskTick = (options) => new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"](subscription => {
    postTaskScheduler
        .postTask(() => { }, options)
        .then(() => {
        subscription.next(0);
        subscription.complete();
    });
    return () => { };
});

const priorityTickMap = {
    animationFrame: animationFrameTick(),
    Promise: promiseTick(),
    setInterval: timeoutTick(),
    idleCallback: idleCallbackTick(),
    userBlocking: postTaskTick({
        priority: PostTaskSchedulerPriority.userBlocking
    }),
    userVisible: postTaskTick({
        priority: PostTaskSchedulerPriority.userVisible
    }),
    background: postTaskTick({ priority: PostTaskSchedulerPriority.background })
};

function staticSchedule(work, priority, abC = new AbortController()) {
    // immediately execute work
    if (priority === false) {
        tryExecuteWork();
        return abC;
    }
    // schedule work
    const sub = priorityTickMap[priority].subscribe(() => tryExecuteWork(), error => console.error(error), 
    // on complete abort further executions
    () => abC.abort());
    const abortHandler = function () {
        sub.unsubscribe();
        abC.signal.removeEventListener('abort', abortHandler, false);
    };
    abC.signal.addEventListener('abort', abortHandler, false);
    return abC;
    // execute work and abort further executions
    function tryExecuteWork() {
        if (!abC.signal.aborted) {
            work();
            abC.abort();
        }
    }
}

function coalesceAndSchedule(work, priority, scope = {}, abC = new AbortController()) {
    const durationSelector = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["from"])(getUnpatchedResolvedPromise());
    const scheduledWork = () => staticSchedule(work, priority, abC);
    const coalesceAbC = staticCoalesce(scheduledWork, durationSelector, scope, abC);
    const abortHandler = function () {
        coalesceAbC.abort();
        abC.signal.removeEventListener('abort', abortHandler, false);
    };
    abC.signal.addEventListener('abort', abortHandler, false);
    return abC;
}

var SchedulingPriority;
(function (SchedulingPriority) {
    SchedulingPriority["animationFrame"] = "animationFrame";
    SchedulingPriority["Promise"] = "Promise";
    SchedulingPriority["idleCallback"] = "idleCallback";
    SchedulingPriority["userBlocking"] = "userBlocking";
    SchedulingPriority["userVisible"] = "userVisible";
    SchedulingPriority["background"] = "background";
    SchedulingPriority["setInterval"] = "setInterval";
})(SchedulingPriority || (SchedulingPriority = {}));

const promiseDurationSelector = promiseTick();
/**
 * Experimental Local Strategies
 *
 * - ɵDC - `ɵdetectChanges`
 * - C - `Component`
 * - det - `cdRef.detach`
 * - ret - `cdRef.reattach`
 * - Pr - `Promise`
 * - aF - `requestAnimationFrame`
 *
 * | Name        | ZoneLess | Render Method | ScopedCoalescing | Scheduling | Chunked |
 * |-------------| ---------| --------------| ---------------- | ---------- |-------- |
 * | `local`     | ✔        | ɵDC           | C + Pr           | aF         | ❌      |
 * | `detach`    | ✔ ️     | ret,ɵDC, det  | C + Pr           | aF         | ❌      |
 *
 */
function getLocalStrategies(config) {
    return {
        local: createLocalStrategy(config),
        detach: createDetachStrategy(config)
    };
}
/**
 *  Local Strategy
 *
 * This strategy is rendering the actual component and
 * all it's children that are on a path
 * that is marked as dirty or has components with `ChangeDetectionStrategy.Default`.
 *
 * As detectChanges has no coalescing of render calls
 * like `ChangeDetectorRef#markForCheck` or `ɵmarkDirty` has, so we have to apply our own coalescing, 'scoped' on
 * component level.
 *
 * Coalescing, in this very manner,
 * means **collecting all events** in the same
 * [EventLoop](https://developer.mozilla.org/de/docs/Web/JavaScript/EventLoop) tick, that would cause a re-render and
 * execute **re-rendering only once**.
 *
 * 'Scoped' coalescing, in addition, means **grouping the collected events by** a specific context.
 * E. g. the **component** from which the re-rendering was initiated.
 *
 * | Name        | ZoneLess | Render Method | ScopedCoalescing | Scheduling | Chunked |
 * |-------------| ---------| --------------| ---------------- | ---------- |-------- |
 * | `local`     | ✔        | ɵDC           | C + Pr           | aF         | ❌      |
 *
 * @param config { RenderStrategyFactoryConfig } - The values this strategy needs to get calculated.
 * @return {RenderStrategy} - The calculated strategy
 *
 */
function createLocalStrategy(config) {
    const component = config.cdRef.context;
    const priority = SchedulingPriority.animationFrame;
    const tick = priorityTickMap[priority];
    const renderMethod = () => {
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵdetectChanges"])(component);
    };
    const behavior = o => o.pipe(coalesceWith(promiseDurationSelector, component), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(v => tick.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(() => v))), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(renderMethod));
    const scheduleCD = () => coalesceAndSchedule(renderMethod, priority, component);
    return {
        name: 'local',
        detectChanges: renderMethod,
        rxScheduleCD: behavior,
        scheduleCD
    };
}
/**
 *  Detach Strategy
 *
 * This strategy is rendering the actual component and
 * all it's children that are on a path
 * that is marked as dirty or has components with `ChangeDetectionStrategy.Default`.
 *
 * As detectChanges has no coalescing of render calls
 * like `ChangeDetectorRef#markForCheck` or `ɵmarkDirty` has, so we have to apply our own coalescing, 'scoped' on
 * component level.
 *
 * Coalescing, in this very manner,
 * means **collecting all events** in the same
 * [EventLoop](https://developer.mozilla.org/de/docs/Web/JavaScript/EventLoop) tick, that would cause a re-render and
 * execute **re-rendering only once**.
 *
 * 'Scoped' coalescing, in addition, means **grouping the collected events by** a specific context.
 * E. g. the **component** from which the re-rendering was initiated.
 *
 * | Name        | ZoneLess | Render Method | ScopedCoalescing | Scheduling | Chunked |
 * |-------------| ---------| --------------| ---------------- | ---------- |-------- |
 * | `detach`    | ✔ ️     | ret,ɵDC, det  | C + Pr           | aF         | ❌      |
 *
 * @param config { RenderStrategyFactoryConfig } - The values this strategy needs to get calculated.
 * @return {RenderStrategy} - The calculated strategy
 *
 */
function createDetachStrategy(config) {
    const component = config.cdRef.context;
    const priority = SchedulingPriority.animationFrame;
    const tick = priorityTickMap[priority];
    const renderMethod = () => {
        config.cdRef.reattach();
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵdetectChanges"])(component);
        config.cdRef.detach();
    };
    const behavior = o => o.pipe(coalesceWith(promiseDurationSelector, component), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(v => tick.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(() => v))), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(renderMethod));
    const scheduleCD = () => coalesceAndSchedule(renderMethod, priority, component);
    return {
        name: 'detach',
        detectChanges: renderMethod,
        rxScheduleCD: behavior,
        scheduleCD
    };
}

function getGlobalStrategies(config) {
    return {
        global: createGlobalStrategy(config)
    };
}
/**
 * Global Strategies
 *
 * - ɵMD - `ɵmarkDirty`
 * - C - `Component`
 *
 * | Name        | ZoneLess | Render Method | ScopedCoalescing | Scheduling | Chunked |
 * |-------------| ---------| --------------| ---------------- | ---------- |-------- |
 * | `global`     | ✔        | ɵMD           | C + Pr          | ❌         | ❌      |
 *
 */
/**
 *
 * Global Strategy
 *
 * This strategy is rendering the application root and
 * all it's children that are on a path
 * that is marked as dirty or has components with `ChangeDetectionStrategy.Default`.
 *
 * | Name        | ZoneLess | Render Method | ScopedCoalescing | Scheduling | Chunked |
 * |-------------| ---------| --------------| ---------------- | ---------- |-------- |
 * | `global`     | ✔        | ɵMD           | C + Pr          | ❌         | ❌      |
 *
 * @param config { RenderStrategyFactoryConfig } - The values this strategy needs to get calculated.
 * @return {RenderStrategy<T>} - The calculated strategy
 *
 */
function createGlobalStrategy(config) {
    const renderMethod = () => Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵmarkDirty"])(config.cdRef.context);
    return {
        name: 'global',
        detectChanges: renderMethod,
        rxScheduleCD: o => o,
        scheduleCD: () => {
            renderMethod();
            return new AbortController();
        }
    };
}

const DEFAULT_STRATEGY_NAME = 'local';
function getStrategies(config) {
    return Object.assign(Object.assign({ noop: createNoopStrategy(), native: createNativeStrategy(config) }, getGlobalStrategies(config)), getLocalStrategies(config));
}
/**
 * Strategies
 *
 * - mFC - `cdRef.markForCheck`
 * - dC - `cdRef.detectChanges`
 * - ɵMD - `ɵmarkDirty`
 * - ɵDC - `ɵdetectChanges`
 * - C - `Component`
 * - det - `cdRef.detach`
 * - ret - `cdRef.reattach`
 * - Pr - `Promise`
 * - aF - `requestAnimationFrame`
 *
 * | Name        | ZoneLess | Render Method | ScopedCoalescing | Scheduling | Chunked |
 * |-------------| ---------| --------------| ---------------- | ---------- |-------- |
 * | `noop`      | ❌       | ❌             | ❌               | ❌         | ❌       |
 * | `native`    | ❌       | mFC           | ❌                | ❌         | ❌      |
 * | `global`    | ✔        | ɵMD           | C + Pr           | ❌         | ❌      |
 * | `local`     | ✔        | ɵDC           | C + Pr           | aF         | ❌      |
 * | `detach`    | ✔ ️     | ret,ɵDC, det  | C + Pr           | aF         | ❌      |
 */

function renderChange(cdRef, strategyName) {
    const strategies = getStrategies({ cdRef });
    const strategy = strategies[strategyName];
    return o => o.pipe(strategy.rxScheduleCD);
}

/**
 * @Pipe PushPipe
 *
 * @description
 *
 * The `push` pipe serves as a drop-in replacement for the `async` pipe.
 * It contains intelligent handling of change detection to enable us
 * running in zone-full as well as zone-less mode without any changes to the code.
 *
 * The current way of binding an observable to the view looks like that:
 *  ```html
 *  {{observable$ | async}}
 * <ng-container *ngIf="observable$ | async as o">{{o}}</ng-container>
 * <component [value]="observable$ | async"></component>
 * ```
 *
 * The problem is `async` pipe just marks the component and all its ancestors as dirty.
 * It needs zone.js microtask queue to exhaust until `ApplicationRef.tick` is called to render all dirty marked
 *     components.
 *
 * Heavy dynamic and interactive UIs suffer from zones change detection a lot and can
 * lean to bad performance or even unusable applications, but the `async` pipe does not work in zone-less mode.
 *
 * `push` pipe solves that problem.
 *
 * Included Features:
 *  - Take observables or promises, retrieve their values and render the value to the template
 *  - Handling null and undefined values in a clean unified/structured way
 *  - Triggers change-detection differently if `zone.js` is present or not (`detectChanges` or `markForCheck`)
 *  - Distinct same values in a row to increase performance
 *  - Coalescing of change detection calls to boost performance
 *
 * @usageNotes
 *
 * `push` pipe solves that problem. It can be used like shown here:
 * ```html
 * {{observable$ | push}}
 * <ng-container *ngIf="observable$ | push as o">{{o}}</ng-container>
 * <component [value]="observable$ | push"></component>
 * ```
 *
 * @publicApi
 */
class PushPipe {
    constructor(cdRef) {
        this.resetObserver = {
            next: () => {
                this.renderedValue = undefined;
            }
        };
        this.updateObserver = {
            next: (value) => (this.renderedValue = value)
        };
        this.RenderAware = createRenderAware({
            strategies: getStrategies({
                cdRef
            }),
            updateObserver: this.updateObserver,
            resetObserver: this.resetObserver
        });
        this.subscription = this.RenderAware.subscribe();
    }
    transform(potentialObservable, config) {
        const strategy = config || DEFAULT_STRATEGY_NAME;
        this.RenderAware.nextStrategy(strategy);
        this.RenderAware.nextPotentialObservable(potentialObservable);
        return this.renderedValue;
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
PushPipe.ɵfac = function PushPipe_Factory(t) { return new (t || PushPipe)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinjectPipeChangeDetectorRef"]()); };
PushPipe.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefinePipe"]({ name: "push", type: PushPipe, pure: false });
PushPipe.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ChangeDetectorRef"] }
];
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵsetClassMetadata"](PushPipe, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Pipe"],
        args: [{ name: 'push', pure: false }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ChangeDetectorRef"] }]; }, null); })();
PushPipe.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ChangeDetectorRef"] }
];

const DECLARATIONS = [PushPipe];
class PushModule {
}
PushModule.ɵfac = function PushModule_Factory(t) { return new (t || PushModule)(); };
PushModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: PushModule });
PushModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](PushModule, { declarations: [PushPipe], exports: [PushPipe] }); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵsetClassMetadata"](PushModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"],
        args: [{
                declarations: DECLARATIONS,
                imports: [],
                exports: DECLARATIONS
            }]
    }], null, null); })();

class TemplateManager {
    constructor(viewContainerRef, initialViewContext) {
        this.viewContainerRef = viewContainerRef;
        this.templateCache = new Map();
        this.viewCache = new Map();
        this.viewContext = Object.assign({}, initialViewContext);
    }
    updateViewContext(viewContextSlice) {
        Object.entries(viewContextSlice).forEach(([key, value]) => {
            this.viewContext[key] = value;
        });
    }
    addTemplateRef(name, templateRef) {
        assertTemplate(name, templateRef);
        this.templateCache.set(name, templateRef);
    }
    insertEmbeddedView(name) {
        if (this.templateCache.has(name)) {
            this.viewContainerRef.detach();
            if (this.viewCache.has(name)) {
                this.viewContainerRef.insert(this.viewCache.get(name));
            }
            else {
                const newView = this.viewContainerRef.createEmbeddedView(this.templateCache.get(name), this.viewContext);
                this.viewCache.set(name, newView);
            }
        }
    }
    destroy() {
        this.viewCache.forEach(embeddedView => embeddedView === null || embeddedView === void 0 ? void 0 : embeddedView.destroy());
        this.viewContainerRef.clear();
    }
}
function assertTemplate(property, templateRef) {
    const isTemplateRefOrNull = !!(!templateRef || templateRef.createEmbeddedView);
    if (!isTemplateRefOrNull) {
        throw new Error(`${property} must be a TemplateRef, but received something else.`);
    }
    return isTemplateRefOrNull;
}

/**
 * @Directive LetDirective
 *
 * @description
 *
 * The `*rxLet` directive serves a convenient way of binding observables to a view context (a dom element scope).
 * It also helps with several internal processing under the hood.
 *
 * The current way of binding an observable to the view looks like that:
 * ```html
 * <ng-container *ngIf="observableNumber$ as n">
 * <app-number [number]="n">
 * </app-number>
 * <app-number-special [number]="n">
 * </app-number-special>
 * </ng-container>
 *  ```
 *
 *  The problem is `*ngIf` is also interfering with rendering and in case of a `0` the component would be hidden
 *
 * Included Features:
 * - binding is always present. (`*ngIf="truthy$"`)
 * - it takes away the multiple usages of the `async` or `push` pipe
 * - a unified/structured way of handling null and undefined
 * - triggers change-detection differently if `zone.js` is present or not (`ChangeDetectorRef.detectChanges` or
 *   `ChangeDetectorRef.markForCheck`)
 * - triggers change-detection differently if ViewEngine or Ivy is present (`ChangeDetectorRef.detectChanges` or
 *   `ɵdetectChanges`)
 * - distinct same values in a row (distinctUntilChanged operator),
 *
 * @usageNotes
 *
 * The `*rxLet` directive take over several things and makes it more convenient and save to work with streams in the
 *   template
 * `<ng-container *rxLet="observableNumber$ as c"></ng-container>`
 *
 * ```html
 * <ng-container *rxLet="observableNumber$ as n">
 * <app-number [number]="n">
 * </app-number>
 * </ng-container>
 *
 * <ng-container *rxLet="observableNumber$; let n">
 * <app-number [number]="n">
 * </app-number>
 * </ng-container>
 * ```
 *
 * In addition to that it provides us information from the whole observable context.
 * We can track the observables:
 * - next value
 * - error value
 * - complete base-state
 *
 * ```html
 * <ng-container *rxLet="observableNumber$; let n; let e = $error, let c = $complete">
 * <app-number [number]="n"  *ngIf="!e && !c">
 * </app-number>
 * <ng-container *ngIf="e">
 * There is an error: {{e}}
 * </ng-container>
 * <ng-container *ngIf="c">
 * Observable completed: {{c}}
 * </ng-container>
 * </ng-container>
 * ```
 *
 * @publicApi
 */
class LetDirective {
    constructor(cdRef, nextTemplateRef, viewContainerRef) {
        this.nextTemplateRef = nextTemplateRef;
        this.viewContainerRef = viewContainerRef;
        this.resetObserver = {
            next: () => {
                this.templateManager.updateViewContext({
                    $implicit: undefined,
                    rxLet: undefined,
                    $error: false,
                    $complete: false
                });
            }
        };
        this.updateObserver = {
            next: (value) => {
                this.templateManager.insertEmbeddedView('rxNext');
                this.templateManager.updateViewContext({
                    $implicit: value,
                    rxLet: value
                });
            },
            error: (error) => {
                // fallback to rxNext when there's no template for rxError
                this.templateManager.insertEmbeddedView('rxNext');
                this.templateManager.insertEmbeddedView('rxError');
                this.templateManager.updateViewContext({
                    $error: true
                });
            },
            complete: () => {
                // fallback to rxNext when there's no template for rxComplete
                this.templateManager.insertEmbeddedView('rxNext');
                this.templateManager.insertEmbeddedView('rxComplete');
                this.templateManager.updateViewContext({
                    $complete: true
                });
            }
        };
        this.strategies = getStrategies({ cdRef });
        this.templateManager = new TemplateManager(this.viewContainerRef, {
            $implicit: undefined,
            rxLet: undefined,
            $error: false,
            $complete: false
        });
        this.renderAware = createRenderAware({
            strategies: this.strategies,
            resetObserver: this.resetObserver,
            updateObserver: this.updateObserver
        });
        this.renderAware.nextStrategy(DEFAULT_STRATEGY_NAME);
    }
    set rxLet(potentialObservable) {
        this.renderAware.nextPotentialObservable(potentialObservable);
    }
    set strategy(strategy) {
        this.renderAware.nextStrategy(strategy || DEFAULT_STRATEGY_NAME);
    }
    set rxLetComplete(templateRef) {
        this.templateManager.addTemplateRef('rxComplete', templateRef);
    }
    set rxLetError(templateRef) {
        this.templateManager.addTemplateRef('rxError', templateRef);
    }
    set rxLetSuspense(templateRef) {
        this.templateManager.addTemplateRef('rxSuspense', templateRef);
    }
    static ngTemplateContextGuard(dir, ctx) {
        return true;
    }
    ngOnInit() {
        this.templateManager.insertEmbeddedView('rxSuspense');
        this.templateManager.addTemplateRef('rxNext', this.nextTemplateRef);
        this.subscription = this.renderAware.subscribe();
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.templateManager.destroy();
    }
}
LetDirective.ɵfac = function LetDirective_Factory(t) { return new (t || LetDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["TemplateRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewContainerRef"])); };
LetDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineDirective"]({ type: LetDirective, selectors: [["", "rxLet", ""]], inputs: { rxLet: "rxLet", strategy: ["rxLetStrategy", "strategy"], rxLetComplete: "rxLetComplete", rxLetError: "rxLetError", rxLetSuspense: "rxLetSuspense" }, exportAs: ["renderNotifier"] });
LetDirective.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ChangeDetectorRef"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["TemplateRef"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewContainerRef"] }
];
LetDirective.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ChangeDetectorRef"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["TemplateRef"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewContainerRef"] }
];
LetDirective.propDecorators = {
    rxLet: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
    strategy: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"], args: ['rxLetStrategy',] }],
    rxLetComplete: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
    rxLetError: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
    rxLetSuspense: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵsetClassMetadata"](LetDirective, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Directive"],
        args: [{
                selector: '[rxLet]',
                exportAs: 'renderNotifier'
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ChangeDetectorRef"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["TemplateRef"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewContainerRef"] }]; }, { rxLet: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }], strategy: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"],
            args: ['rxLetStrategy']
        }], rxLetComplete: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }], rxLetError: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }], rxLetSuspense: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }] }); })();

const EXPORTED_DECLARATIONS = [LetDirective];
class LetModule {
}
LetModule.ɵfac = function LetModule_Factory(t) { return new (t || LetModule)(); };
LetModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: LetModule });
LetModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({});
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](LetModule, { declarations: [LetDirective], exports: [LetDirective] }); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵsetClassMetadata"](LetModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"],
        args: [{
                declarations: EXPORTED_DECLARATIONS,
                exports: [EXPORTED_DECLARATIONS]
            }]
    }], null, null); })();

const zonePatchedEvents = [
    'scroll',
    'mousedown',
    'mouseenter',
    'mouseleave',
    'mousemove',
    'mouseout',
    'mouseover',
    'mouseup',
    'load',
    'pointerup',
    'change',
    'blur',
    'focus',
    'click',
    'contextmenu',
    'drag',
    'dragend',
    'dragenter',
    'dragleave',
    'dragover',
    'dragstart',
    'drop',
    'input'
];

/**
 *
 * @description
 *
 * This function takes an elem and event and re-applies the listeners from the passed event to the
 * passed element with the zone un-patched version of it.
 *
 * @param elem {HTMLElement} - The elem to re-apply the listeners to.
 * @param event {string} - The name of the event from which to re-apply the listeners.
 *
 * @returns void
 */
function unpatchEventListener(elem, event) {
    const eventListeners = elem.eventListeners(event);
    // Return if no event listeners are present
    if (!eventListeners) {
        return;
    }
    const addEventListener = getZoneUnPatchedApi('addEventListener', elem).bind(elem);
    eventListeners.forEach(listener => {
        // Remove and reapply listeners with patched API
        elem.removeEventListener(event, listener);
        // Reapply listeners with un-patched API
        addEventListener(event, listener);
    });
}
/**
 * @Directive UnpatchEventsDirective
 *
 * @description
 *
 * The `unpatch` directive helps in partially migrating to zone-less apps as well as getting rid
 * of unnecessary renderings through zones `addEventListener` patches.
 * It can be used on any element you apply event bindings.
 *
 * The current way of binding events to the DOM is to use output bindings:
 *  ```html
 * <button (click)="doStuff($event)">click me</button>
 * ```
 *
 * The problem is that every event registered over `()` syntax, e.g. `(click)`
 * marks the component and all its ancestors as dirty and re-renders the whole component tree.
 * This is because zone.js patches the native browser API and whenever one of the patched APIs is used it re-renders.
 *
 * So even if your button is not related to a change that needs a re-render the app will re-render completely.
 * This leads to bad performance. This is especially helpful if you work with frequently fired events like 'mousemove'
 *
 * `unpatch` directive solves that problem.
 *
 * Included Features:
 *  - by default un-patch all registered listeners of the host it is applied on
 *  - un-patch only a specified set of registered event listeners
 *  - works zone independent (it directly checks the widow for patched APIs and un-patches them without the use of `runOutsideZone` which brings more performance)
 *  - Not interfering with any logic executed by the registered callback
 *
 * @usageNotes
 *
 * The `unpatch` directive can be used like shown here:
 * ```html
 * <button [unoatch] (click)="triggerSomeMethod($event)">click me</button>
 * <button [unoatch]="['mousemove']" (mousemove)="doStuff2($event)" (click)="doStuff($event)">click me</button>
 * ```
 *
 * @publicApi
 */
// tslint:disable-next-line:directive-selector
class UnpatchEventsDirective {
    constructor(el) {
        this.el = el;
        this.subscription = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subscription"]();
        this.events$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"](zonePatchedEvents);
    }
    set events(value) {
        if (value && value.length > 0) {
            this.events$.next(value);
        }
        else {
            this.events$.next(zonePatchedEvents);
        }
    }
    reapplyEventListenersZoneUnPatched(events) {
        events.forEach(ev => {
            unpatchEventListener(this.el.nativeElement, ev);
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    ngAfterViewInit() {
        this.subscription = this.events$
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(eventList => this.reapplyEventListenersZoneUnPatched(eventList)))
            .subscribe();
    }
}
UnpatchEventsDirective.ɵfac = function UnpatchEventsDirective_Factory(t) { return new (t || UnpatchEventsDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"])); };
UnpatchEventsDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineDirective"]({ type: UnpatchEventsDirective, selectors: [["", "unpatch", ""]], inputs: { events: ["unpatch", "events"] } });
UnpatchEventsDirective.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"] }
];
UnpatchEventsDirective.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"] }
];
UnpatchEventsDirective.propDecorators = {
    events: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"], args: ['unpatch',] }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵsetClassMetadata"](UnpatchEventsDirective, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Directive"],
        args: [{ selector: '[unpatch]' }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"] }]; }, { events: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"],
            args: ['unpatch']
        }] }); })();

const DECLARATIONS$1 = [UnpatchEventsDirective];
class UnpatchEventsModule {
}
UnpatchEventsModule.ɵfac = function UnpatchEventsModule_Factory(t) { return new (t || UnpatchEventsModule)(); };
UnpatchEventsModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: UnpatchEventsModule });
UnpatchEventsModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({});
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](UnpatchEventsModule, { declarations: [UnpatchEventsDirective], exports: [UnpatchEventsDirective] }); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵsetClassMetadata"](UnpatchEventsModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"],
        args: [{
                declarations: DECLARATIONS$1,
                exports: DECLARATIONS$1
            }]
    }], null, null); })();

/**
 *
 * @description
 *
 * This function takes an elem and event and re-applies the listeners from the passed event to the
 * passed element with the zone un-patched version of it.
 *
 * @param elem {HTMLElement} - The elem to re-apply the listeners to.
 * @param event {string} - The name of the event from which to re-apply the listeners.
 *
 * @returns void
 */
function unpatchEventListener$1(elem, event) {
    const eventListeners = elem.eventListeners(event);
    // Return if no event listeners are present
    if (!eventListeners) {
        return;
    }
    const addEventListener = getZoneUnPatchedApi('addEventListener', elem).bind(elem);
    eventListeners.forEach(listener => {
        // Remove and reapply listeners with patched API
        elem.removeEventListener(event, listener);
        // Reapply listeners with un-patched API
        addEventListener(event, listener);
    });
}
function intersectionObserver(options) {
    const subject = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
    const observer = observerSupported()
        ? new IntersectionObserver(entries => {
            entries.forEach(entry => subject.next(entry));
        }, options)
        : null;
    const entries$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"](subscriber => {
        subject.subscribe(subscriber);
        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    });
    return {
        entries$,
        observe: observer.observe,
        unobserve: observer.unobserve
    };
}
const observerSupported = () => typeof window !== 'undefined'
    ? !!window.IntersectionObserver
    : false;
const ɵ0$1 = observerSupported;
class ViewportPrioDirective {
    constructor(el, letDirective) {
        this.el = el;
        this.letDirective = letDirective;
        this.entriesSubject = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.entries$ = this.entriesSubject.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["mergeAll"])());
        this._viewportPrio = 'noop';
        this.observer = observerSupported()
            ? new IntersectionObserver(entries => this.entriesSubject.next(entries), {
                threshold: 0
            })
            : null;
        this.visibilityEvents$ = this.entries$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(entry => {
            if (entry.intersectionRatio > 0) {
                return 'visible';
            }
            else {
                return 'invisible';
            }
        }));
    }
    set viewportPrio(prio) {
        if (prio) {
            this._viewportPrio = prio || 'noop';
        }
    }
    ngOnInit() {
        const letStrategyName$ = this.letDirective.renderAware.activeStrategy$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(s => s.name), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["filter"])(name => name !== this._viewportPrio));
        this.observer.observe(this.el.nativeElement);
        this.visibilityEvents$
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["withLatestFrom"])(letStrategyName$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(([visibility, strategyName]) => visibility === 'visible' ? strategyName : this._viewportPrio))
            .subscribe(strategyName => {
            this.letDirective.strategy = strategyName;
            // render actual state on viewport enter
            this.letDirective.strategies[strategyName].scheduleCD();
            //
            this.el.nativeElement.classList.add(strategyName);
        });
    }
}
ViewportPrioDirective.ɵfac = function ViewportPrioDirective_Factory(t) { return new (t || ViewportPrioDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](LetDirective, 8)); };
ViewportPrioDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineDirective"]({ type: ViewportPrioDirective, selectors: [["", "viewport-prio", ""]], inputs: { viewportPrio: ["viewport-prio", "viewportPrio"] } });
ViewportPrioDirective.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"] },
    { type: LetDirective, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Optional"] }] }
];
ViewportPrioDirective.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"] },
    { type: LetDirective, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Optional"] }] }
];
ViewportPrioDirective.propDecorators = {
    viewportPrio: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"], args: ['viewport-prio',] }]
};
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵsetClassMetadata"](ViewportPrioDirective, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Directive"],
        args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[viewport-prio]'
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"] }, { type: LetDirective, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Optional"]
            }] }]; }, { viewportPrio: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"],
            args: ['viewport-prio']
        }] }); })();

const DECLARATIONS$2 = [ViewportPrioDirective];
class ViewportPrioModule {
}
ViewportPrioModule.ɵfac = function ViewportPrioModule_Factory(t) { return new (t || ViewportPrioModule)(); };
ViewportPrioModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: ViewportPrioModule });
ViewportPrioModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({});
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](ViewportPrioModule, { declarations: [ViewportPrioDirective], exports: [ViewportPrioDirective] }); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵsetClassMetadata"](ViewportPrioModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"],
        args: [{
                declarations: DECLARATIONS$2,
                exports: DECLARATIONS$2
            }]
    }], null, null); })();

class TemplateModule {
}
TemplateModule.ɵfac = function TemplateModule_Factory(t) { return new (t || TemplateModule)(); };
TemplateModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: TemplateModule });
TemplateModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [LetModule, PushModule, UnpatchEventsModule, ViewportPrioModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](TemplateModule, { exports: [LetModule, PushModule, UnpatchEventsModule, ViewportPrioModule] }); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵsetClassMetadata"](TemplateModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"],
        args: [{
                exports: [LetModule, PushModule, UnpatchEventsModule, ViewportPrioModule]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */



//# sourceMappingURL=rx-angular-template.js.map

/***/ }),

/***/ "Ffo2":
/*!***********************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/performance/alphas-compare/alpha-1-toggle/alpha-1-toggle.component.ts ***!
  \***********************************************************************************************************/
/*! exports provided: Alpha1ToggleComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Alpha1ToggleComponent", function() { return Alpha1ToggleComponent; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _shared_debug_helper_rendering_work_rendering_work_rendering_work_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../shared/debug-helper/rendering-work/rendering-work/rendering-work.component */ "J0zV");
/* harmony import */ var templateAlpha1__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! templateAlpha1 */ "38Rf");






function Alpha1ToggleComponent_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "List of 2000 elements will be toggled 10 times");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
} }
function Alpha1ToggleComponent_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "button", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function Alpha1ToggleComponent_ng_container_2_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r6); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r5.toggleList(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Reset");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
} }
function Alpha1ToggleComponent_ng_container_3_p_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Loading...");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function Alpha1ToggleComponent_ng_container_3_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "rxa-rendering-work", 5);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("factor", 20);
} }
function Alpha1ToggleComponent_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, Alpha1ToggleComponent_ng_container_3_p_1_Template, 2, 0, "p", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](2, "push");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, Alpha1ToggleComponent_ng_container_3_ng_template_3_Template, 1, 1, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](4);
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](2, 2, ctx_r2.pushLoading$))("ngIfElse", _r8);
} }
function Alpha1ToggleComponent_ng_container_4_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "rxa-rendering-work", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("factor", 20);
} }
function Alpha1ToggleComponent_ng_container_4_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Loading...");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function Alpha1ToggleComponent_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, Alpha1ToggleComponent_ng_container_4_ng_container_1_Template, 2, 1, "ng-container", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, Alpha1ToggleComponent_ng_container_4_ng_template_2_Template, 2, 0, "ng-template", null, 7, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](3);
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("rxLet", ctx_r3.letLoading$)("rxLetSuspense", _r11);
} }
function Alpha1ToggleComponent_p_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Done");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
class Alpha1ToggleComponent {
    constructor() {
        this.letEmitted = false;
        this.pushLoading$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](true);
        this.letLoading$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.done$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](false);
        this.process$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["timer"])(800, 800);
    }
    ngAfterViewInit() {
        if (this.auto) {
            this.process$
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["tap"])(() => this.type === 'push' ? this.togglePush() : this.toggleLet()), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["take"])(10), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["finalize"])(() => {
                this.done$.next(true);
            }))
                .subscribe();
        }
    }
    toggleList() {
        this.type === 'push' ? this.togglePush() : this.toggleLet();
    }
    togglePush() {
        this.pushLoading$.next(!this.pushLoading$.getValue());
    }
    toggleLet() {
        if (!this.letEmitted) {
            this.letEmitted = true;
            return this.letLoading$.next(true);
        }
        this.letLoading$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.letEmitted = false;
    }
}
Alpha1ToggleComponent.ɵfac = function Alpha1ToggleComponent_Factory(t) { return new (t || Alpha1ToggleComponent)(); };
Alpha1ToggleComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: Alpha1ToggleComponent, selectors: [["rxa-alpha1"]], inputs: { type: "type", auto: "auto" }, decls: 7, vars: 7, consts: [[1, "col-sm-12", "col-md-6"], [4, "ngIf"], ["color", "secondary", 3, "click"], [4, "ngIf", "ngIfElse"], ["pushContent", ""], [3, "factor"], [4, "rxLet", "rxLetSuspense"], ["suspenseTpl", ""]], template: function Alpha1ToggleComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, Alpha1ToggleComponent_ng_container_1_Template, 3, 0, "ng-container", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, Alpha1ToggleComponent_ng_container_2_Template, 3, 0, "ng-container", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, Alpha1ToggleComponent_ng_container_3_Template, 5, 4, "ng-container", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, Alpha1ToggleComponent_ng_container_4_Template, 4, 2, "ng-container", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, Alpha1ToggleComponent_p_5_Template, 2, 0, "p", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](6, "push");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.auto);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.auto);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.type === "push");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.type === "rxLet");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](6, 5, ctx.done$));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], _shared_debug_helper_rendering_work_rendering_work_rendering_work_component__WEBPACK_IMPORTED_MODULE_4__["RenderingWorkComponent"], templateAlpha1__WEBPACK_IMPORTED_MODULE_5__["LetDirective"]], pipes: [templateAlpha1__WEBPACK_IMPORTED_MODULE_5__["PushPipe"]], encapsulation: 2 });


/***/ }),

/***/ "KRYV":
/*!***********************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/performance/alphas-compare/alpha-0-toggle/alpha-0-toggle.component.ts ***!
  \***********************************************************************************************************/
/*! exports provided: Alpha0ToggleComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Alpha0ToggleComponent", function() { return Alpha0ToggleComponent; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var templateAlpha0__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! templateAlpha0 */ "1tvP");
/* harmony import */ var _shared_debug_helper_rendering_work_rendering_work_rendering_work_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/debug-helper/rendering-work/rendering-work/rendering-work.component */ "J0zV");






function Alpha0ToggleComponent_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "List of 2000 elements will be toggled 10 times");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
} }
function Alpha0ToggleComponent_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "button", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function Alpha0ToggleComponent_ng_container_2_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r6); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r5.toggleList(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Toggle");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
} }
function Alpha0ToggleComponent_ng_container_3_p_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Loading...");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function Alpha0ToggleComponent_ng_container_3_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "rxa-rendering-work", 5);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("factor", 20);
} }
function Alpha0ToggleComponent_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, Alpha0ToggleComponent_ng_container_3_p_1_Template, 2, 0, "p", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](2, "push");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, Alpha0ToggleComponent_ng_container_3_ng_template_3_Template, 1, 1, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](4);
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](2, 2, ctx_r2.pushLoading$))("ngIfElse", _r8);
} }
function Alpha0ToggleComponent_ng_container_4_ng_container_1_rxa_rendering_work_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "rxa-rendering-work", 5);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("factor", 20);
} }
function Alpha0ToggleComponent_ng_container_4_ng_container_1_p_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Loading...");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function Alpha0ToggleComponent_ng_container_4_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, Alpha0ToggleComponent_ng_container_4_ng_container_1_rxa_rendering_work_1_Template, 1, 1, "rxa-rendering-work", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, Alpha0ToggleComponent_ng_container_4_ng_container_1_p_2_Template, 2, 0, "p", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const letLoading_r11 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !letLoading_r11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", letLoading_r11);
} }
function Alpha0ToggleComponent_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, Alpha0ToggleComponent_ng_container_4_ng_container_1_Template, 3, 2, "ng-container", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("rxLet", ctx_r3.letLoading$);
} }
function Alpha0ToggleComponent_p_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Done");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
class Alpha0ToggleComponent {
    constructor() {
        this.pushLoading$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](true);
        this.letLoading$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](true);
        this.done$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](false);
        this.process$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["timer"])(800, 1000);
    }
    ngAfterViewInit() {
        if (this.auto) {
            this.process$
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["tap"])(() => this.type === 'push' ? this.togglePush() : this.toggleLet()), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["take"])(10), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["finalize"])(() => {
                this.done$.next(true);
            }))
                .subscribe();
        }
    }
    toggleList() {
        this.type === 'push' ? this.togglePush() : this.toggleLet();
    }
    togglePush() {
        this.pushLoading$.next(!this.pushLoading$.getValue());
    }
    toggleLet() {
        this.letLoading$.next(!this.letLoading$.getValue());
    }
}
Alpha0ToggleComponent.ɵfac = function Alpha0ToggleComponent_Factory(t) { return new (t || Alpha0ToggleComponent)(); };
Alpha0ToggleComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: Alpha0ToggleComponent, selectors: [["rxa-alpha0"]], inputs: { type: "type", auto: "auto" }, decls: 7, vars: 7, consts: [[1, "col-sm-12", "col-md-6"], [4, "ngIf"], ["color", "secondary", 3, "unpatch", "click"], [4, "ngIf", "ngIfElse"], ["pushContent", ""], [3, "factor"], [4, "rxLet"], [3, "factor", 4, "ngIf"]], template: function Alpha0ToggleComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, Alpha0ToggleComponent_ng_container_1_Template, 3, 0, "ng-container", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, Alpha0ToggleComponent_ng_container_2_Template, 3, 0, "ng-container", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, Alpha0ToggleComponent_ng_container_3_Template, 5, 4, "ng-container", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, Alpha0ToggleComponent_ng_container_4_Template, 2, 1, "ng-container", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, Alpha0ToggleComponent_p_5_Template, 2, 0, "p", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](6, "push");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.auto);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.auto);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.type === "push");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.type === "rxLet");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](6, 5, ctx.done$));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], templateAlpha0__WEBPACK_IMPORTED_MODULE_4__["UnpatchEventsDirective"], _shared_debug_helper_rendering_work_rendering_work_rendering_work_component__WEBPACK_IMPORTED_MODULE_5__["RenderingWorkComponent"], templateAlpha0__WEBPACK_IMPORTED_MODULE_4__["LetDirective"]], pipes: [templateAlpha0__WEBPACK_IMPORTED_MODULE_4__["PushPipe"]], encapsulation: 2 });


/***/ }),

/***/ "MV6e":
/*!*****************************************************************************************!*\
  !*** ./apps/demos/src/app/features/performance/alphas-compare/alphas-compare.routes.ts ***!
  \*****************************************************************************************/
/*! exports provided: ROUTES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROUTES", function() { return ROUTES; });
/* harmony import */ var _alphas_compare_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./alphas-compare.component */ "iRm4");

const ROUTES = [
    {
        path: '',
        redirectTo: 'alphas-compare',
    },
    {
        path: 'list-toggle',
        component: _alphas_compare_component__WEBPACK_IMPORTED_MODULE_0__["AlphasCompareComponent"],
    },
];


/***/ }),

/***/ "RAzU":
/*!********************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/performance/alphas-compare/alpha-0-toggle/alpha-0-toggle.module.ts ***!
  \********************************************************************************************************/
/*! exports provided: Alpha0ToggleModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Alpha0ToggleModule", function() { return Alpha0ToggleModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var templateAlpha0__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! templateAlpha0 */ "1tvP");
/* harmony import */ var _alpha_0_toggle_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./alpha-0-toggle.component */ "KRYV");
/* harmony import */ var _shared_debug_helper_rendering_work_rendering_work_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/debug-helper/rendering-work/rendering-work.module */ "wVZC");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");





class Alpha0ToggleModule {
}
Alpha0ToggleModule.ɵfac = function Alpha0ToggleModule_Factory(t) { return new (t || Alpha0ToggleModule)(); };
Alpha0ToggleModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: Alpha0ToggleModule });
Alpha0ToggleModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], templateAlpha0__WEBPACK_IMPORTED_MODULE_1__["TemplateModule"], _shared_debug_helper_rendering_work_rendering_work_module__WEBPACK_IMPORTED_MODULE_3__["RenderingWorkModule"]]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](Alpha0ToggleModule, { declarations: [_alpha_0_toggle_component__WEBPACK_IMPORTED_MODULE_2__["Alpha0ToggleComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], templateAlpha0__WEBPACK_IMPORTED_MODULE_1__["TemplateModule"], _shared_debug_helper_rendering_work_rendering_work_module__WEBPACK_IMPORTED_MODULE_3__["RenderingWorkModule"]], exports: [_alpha_0_toggle_component__WEBPACK_IMPORTED_MODULE_2__["Alpha0ToggleComponent"]] }); })();


/***/ }),

/***/ "YlJS":
/*!********************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/performance/alphas-compare/alpha-1-toggle/alpha-1-toggle.module.ts ***!
  \********************************************************************************************************/
/*! exports provided: Alpha1ToggleModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Alpha1ToggleModule", function() { return Alpha1ToggleModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var templateAlpha1__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! templateAlpha1 */ "38Rf");
/* harmony import */ var _alpha_1_toggle_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./alpha-1-toggle.component */ "Ffo2");
/* harmony import */ var _shared_debug_helper_rendering_work_rendering_work_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/debug-helper/rendering-work/rendering-work.module */ "wVZC");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");





class Alpha1ToggleModule {
}
Alpha1ToggleModule.ɵfac = function Alpha1ToggleModule_Factory(t) { return new (t || Alpha1ToggleModule)(); };
Alpha1ToggleModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: Alpha1ToggleModule });
Alpha1ToggleModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], templateAlpha1__WEBPACK_IMPORTED_MODULE_1__["LetModule"], templateAlpha1__WEBPACK_IMPORTED_MODULE_1__["PushModule"], _shared_debug_helper_rendering_work_rendering_work_module__WEBPACK_IMPORTED_MODULE_3__["RenderingWorkModule"]]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](Alpha1ToggleModule, { declarations: [_alpha_1_toggle_component__WEBPACK_IMPORTED_MODULE_2__["Alpha1ToggleComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], templateAlpha1__WEBPACK_IMPORTED_MODULE_1__["LetModule"], templateAlpha1__WEBPACK_IMPORTED_MODULE_1__["PushModule"], _shared_debug_helper_rendering_work_rendering_work_module__WEBPACK_IMPORTED_MODULE_3__["RenderingWorkModule"]], exports: [_alpha_1_toggle_component__WEBPACK_IMPORTED_MODULE_2__["Alpha1ToggleComponent"]] }); })();


/***/ }),

/***/ "e/mK":
/*!*****************************************************************************************!*\
  !*** ./apps/demos/src/app/features/performance/alphas-compare/alphas-compare.module.ts ***!
  \*****************************************************************************************/
/*! exports provided: AlphasCompareModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlphasCompareModule", function() { return AlphasCompareModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _shared_debug_helper_rendering_work_rendering_work_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/debug-helper/rendering-work/rendering-work.module */ "wVZC");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _alphas_compare_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./alphas-compare.component */ "iRm4");
/* harmony import */ var _alphas_compare_routes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./alphas-compare.routes */ "MV6e");
/* harmony import */ var _alpha_0_toggle_alpha_0_toggle_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./alpha-0-toggle/alpha-0-toggle.module */ "RAzU");
/* harmony import */ var _alpha_1_toggle_alpha_1_toggle_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./alpha-1-toggle/alpha-1-toggle.module */ "YlJS");
/* harmony import */ var templateAlpha1__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! templateAlpha1 */ "38Rf");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ "fXoL");











class AlphasCompareModule {
}
AlphasCompareModule.ɵfac = function AlphasCompareModule_Factory(t) { return new (t || AlphasCompareModule)(); };
AlphasCompareModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineNgModule"]({ type: AlphasCompareModule });
AlphasCompareModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _shared_debug_helper_rendering_work_rendering_work_module__WEBPACK_IMPORTED_MODULE_1__["RenderingWorkModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButtonModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(_alphas_compare_routes__WEBPACK_IMPORTED_MODULE_5__["ROUTES"]),
            _alpha_0_toggle_alpha_0_toggle_module__WEBPACK_IMPORTED_MODULE_6__["Alpha0ToggleModule"],
            _alpha_1_toggle_alpha_1_toggle_module__WEBPACK_IMPORTED_MODULE_7__["Alpha1ToggleModule"],
            templateAlpha1__WEBPACK_IMPORTED_MODULE_8__["UnpatchEventsModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵsetNgModuleScope"](AlphasCompareModule, { declarations: [_alphas_compare_component__WEBPACK_IMPORTED_MODULE_4__["AlphasCompareComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _shared_debug_helper_rendering_work_rendering_work_module__WEBPACK_IMPORTED_MODULE_1__["RenderingWorkModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButtonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"], _alpha_0_toggle_alpha_0_toggle_module__WEBPACK_IMPORTED_MODULE_6__["Alpha0ToggleModule"],
        _alpha_1_toggle_alpha_1_toggle_module__WEBPACK_IMPORTED_MODULE_7__["Alpha1ToggleModule"],
        templateAlpha1__WEBPACK_IMPORTED_MODULE_8__["UnpatchEventsModule"]] }); })();


/***/ }),

/***/ "iRm4":
/*!********************************************************************************************!*\
  !*** ./apps/demos/src/app/features/performance/alphas-compare/alphas-compare.component.ts ***!
  \********************************************************************************************/
/*! exports provided: AlphasCompareComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlphasCompareComponent", function() { return AlphasCompareComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var templateAlpha1__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! templateAlpha1 */ "38Rf");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _alpha_0_toggle_alpha_0_toggle_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./alpha-0-toggle/alpha-0-toggle.component */ "KRYV");
/* harmony import */ var _alpha_1_toggle_alpha_1_toggle_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./alpha-1-toggle/alpha-1-toggle.component */ "Ffo2");






function AlphasCompareComponent_rxa_alpha0_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "rxa-alpha0", 7);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("auto", true)("type", "push");
} }
function AlphasCompareComponent_rxa_alpha0_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "rxa-alpha0", 7);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("auto", false)("type", "push");
} }
function AlphasCompareComponent_rxa_alpha0_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "rxa-alpha0", 7);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("auto", true)("type", "rxLet");
} }
function AlphasCompareComponent_rxa_alpha0_20_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "rxa-alpha0", 7);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("auto", false)("type", "rxLet");
} }
function AlphasCompareComponent_rxa_alpha1_28_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "rxa-alpha1", 7);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("auto", true)("type", "push");
} }
function AlphasCompareComponent_rxa_alpha1_29_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "rxa-alpha1", 7);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("auto", false)("type", "push");
} }
function AlphasCompareComponent_rxa_alpha1_37_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "rxa-alpha1", 7);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("auto", true)("type", "rxLet");
} }
function AlphasCompareComponent_rxa_alpha1_38_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "rxa-alpha1", 7);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("auto", false)("type", "rxLet");
} }
class AlphasCompareComponent {
    constructor() {
        this.show0PushAutoTest = false;
        this.show0Push = false;
        this.show0LetAutoTest = false;
        this.show0Let = false;
        this.show1PushAutoTest = false;
        this.show1Push = false;
        this.show1LetAutoTest = false;
        this.show1Let = false;
    }
    toggle0Push() {
        this.show0Push = !this.show0Push;
    }
    toggle0PushAutoTest() {
        this.show0PushAutoTest = !this.show0PushAutoTest;
    }
    toggle0Let() {
        this.show0Let = !this.show0Let;
    }
    toggle0LetAutoTest() {
        this.show0LetAutoTest = !this.show0LetAutoTest;
    }
    toggle1Push() {
        this.show1Push = !this.show1Push;
    }
    toggle1PushAutoTest() {
        this.show1PushAutoTest = !this.show1PushAutoTest;
    }
    toggle1Let() {
        this.show1Let = !this.show1Let;
    }
    toggle1LetAutoTest() {
        this.show1LetAutoTest = !this.show1LetAutoTest;
    }
}
AlphasCompareComponent.ɵfac = function AlphasCompareComponent_Factory(t) { return new (t || AlphasCompareComponent)(); };
AlphasCompareComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AlphasCompareComponent, selectors: [["rxa-alphas-compare"]], decls: 39, vars: 8, consts: [[1, "row", "w-100"], [1, "col-sm-12", "col-md-3"], [2, "margin-bottom", "16px"], ["mat-raised-button", "", "color", "primary", 3, "click"], ["mat-raised-button", "", "color", "secondary", 3, "unpatch", "click"], [3, "auto", "type", 4, "ngIf"], ["mat-raised-button", "", "color", "secondary", 3, "click"], [3, "auto", "type"]], template: function AlphasCompareComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Alpha 0 vs Beta 0 (To enable Alpha 1 check alpha-1-toggle.module)");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AlphasCompareComponent_Template_button_click_5_listener() { return ctx.toggle0PushAutoTest(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, " Run Auto test for Push pipe in Alpha 0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AlphasCompareComponent_Template_button_click_8_listener() { return ctx.toggle0Push(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, " Open Manual test for Push pipe in Alpha 0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, AlphasCompareComponent_rxa_alpha0_10_Template, 1, 2, "rxa-alpha0", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, AlphasCompareComponent_rxa_alpha0_11_Template, 1, 2, "rxa-alpha0", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AlphasCompareComponent_Template_button_click_14_listener() { return ctx.toggle0LetAutoTest(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, " Run Auto test for Let in Alpha 0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AlphasCompareComponent_Template_button_click_17_listener() { return ctx.toggle0Let(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, " Open Manual test for Let in Alpha 0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](19, AlphasCompareComponent_rxa_alpha0_19_Template, 1, 2, "rxa-alpha0", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](20, AlphasCompareComponent_rxa_alpha0_20_Template, 1, 2, "rxa-alpha0", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AlphasCompareComponent_Template_button_click_23_listener() { return ctx.toggle1PushAutoTest(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, " Run Auto test for Push in Alpha 1 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AlphasCompareComponent_Template_button_click_26_listener() { return ctx.toggle1Push(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, " Open Manual test for Push pipe in Alpha 1 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](28, AlphasCompareComponent_rxa_alpha1_28_Template, 1, 2, "rxa-alpha1", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](29, AlphasCompareComponent_rxa_alpha1_29_Template, 1, 2, "rxa-alpha1", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AlphasCompareComponent_Template_button_click_32_listener() { return ctx.toggle1LetAutoTest(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, " Run Auto test for Let in Alpha 1 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AlphasCompareComponent_Template_button_click_35_listener() { return ctx.toggle1Let(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36, " Open Manual test for Let in Alpha 1 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](37, AlphasCompareComponent_rxa_alpha1_37_Template, 1, 2, "rxa-alpha1", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](38, AlphasCompareComponent_rxa_alpha1_38_Template, 1, 2, "rxa-alpha1", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.show0PushAutoTest);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.show0Push);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.show0LetAutoTest);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.show0Let);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.show1PushAutoTest);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.show1Push);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.show1LetAutoTest);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.show1Let);
    } }, directives: [_angular_material_button__WEBPACK_IMPORTED_MODULE_1__["MatButton"], templateAlpha1__WEBPACK_IMPORTED_MODULE_2__["UnpatchEventsDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], _alpha_0_toggle_alpha_0_toggle_component__WEBPACK_IMPORTED_MODULE_4__["Alpha0ToggleComponent"], _alpha_1_toggle_alpha_1_toggle_component__WEBPACK_IMPORTED_MODULE_5__["Alpha1ToggleComponent"]], encapsulation: 2 });


/***/ })

}]);
//# sourceMappingURL=alphas-compare-alphas-compare-module.js.map