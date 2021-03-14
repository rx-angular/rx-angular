(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "++yt":
/*!******************************************************!*\
  !*** ./apps/demos/src/app/app-component/app.menu.ts ***!
  \******************************************************/
/*! exports provided: MENU_ITEMS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MENU_ITEMS", function() { return MENU_ITEMS; });
/* harmony import */ var _features_concepts_fundamentals_menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../features/concepts/fundamentals.menu */ "NKKG");
/* harmony import */ var _features_template_template_shell_menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../features/template/template-shell.menu */ "X2kX");
/* harmony import */ var _features_tutorials_tutorials_shell_menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../features/tutorials/tutorials-shell.menu */ "he3/");
/* harmony import */ var _features_integrations_integrations_shell_menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../features/integrations/integrations-shell.menu */ "3pK3");
/* harmony import */ var _features_experiments_experiments_shell_menu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../features/experiments/experiments-shell.menu */ "hlBG");
/* harmony import */ var _features_performance_performance_shell_menu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../features/performance/performance-shell.menu */ "EU3E");






const MENU_ITEMS = [
    {
        label: '🧰 Template',
        link: 'template',
        children: _features_template_template_shell_menu__WEBPACK_IMPORTED_MODULE_1__["TEMPLATE_MENU"]
    },
    {
        label: '🏁 Concepts',
        link: 'concepts',
        children: _features_concepts_fundamentals_menu__WEBPACK_IMPORTED_MODULE_0__["FUNDAMENTALS_MENU"]
    },
    {
        label: '📋 Tutorials',
        link: 'tutorials',
        children: _features_tutorials_tutorials_shell_menu__WEBPACK_IMPORTED_MODULE_2__["TUTORIALS_MENU"]
    },
    {
        label: '🧮 Integrations',
        link: 'integrations',
        children: _features_integrations_integrations_shell_menu__WEBPACK_IMPORTED_MODULE_3__["INTEGRATIONS_MENU_ITEMS"]
    },
    {
        label: '🔬 Experiments',
        link: 'experiments',
        children: _features_experiments_experiments_shell_menu__WEBPACK_IMPORTED_MODULE_4__["EXPERIMENTS_MENU"]
    },
    {
        label: '🏎️ Performance',
        link: 'performance',
        children: _features_performance_performance_shell_menu__WEBPACK_IMPORTED_MODULE_5__["MENU_ITEMS"]
    }
];


/***/ }),

/***/ "+8mr":
/*!************************************************************************************!*\
  !*** ./apps/demos/src/app/shared/debug-helper/dirty-checks/dirty-checks.module.ts ***!
  \************************************************************************************/
/*! exports provided: DirtyChecksModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DirtyChecksModule", function() { return DirtyChecksModule; });
/* harmony import */ var _dirty_checks_work_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dirty-checks-work.component */ "ppGH");
/* harmony import */ var _dirty_checks_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dirty-checks.component */ "qnLR");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/core */ "FKr1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");





const DEPRECATIONS = [_dirty_checks_component__WEBPACK_IMPORTED_MODULE_1__["DirtyChecksComponent"], _dirty_checks_work_component__WEBPACK_IMPORTED_MODULE_0__["DirtyChecksWorkComponent"]];
class DirtyChecksModule {
}
DirtyChecksModule.ɵfac = function DirtyChecksModule_Factory(t) { return new (t || DirtyChecksModule)(); };
DirtyChecksModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: DirtyChecksModule });
DirtyChecksModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_material_core__WEBPACK_IMPORTED_MODULE_3__["MatRippleModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](DirtyChecksModule, { declarations: [_dirty_checks_component__WEBPACK_IMPORTED_MODULE_1__["DirtyChecksComponent"], _dirty_checks_work_component__WEBPACK_IMPORTED_MODULE_0__["DirtyChecksWorkComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
        _angular_material_core__WEBPACK_IMPORTED_MODULE_3__["MatRippleModule"]], exports: [_dirty_checks_component__WEBPACK_IMPORTED_MODULE_1__["DirtyChecksComponent"], _dirty_checks_work_component__WEBPACK_IMPORTED_MODULE_0__["DirtyChecksWorkComponent"]] }); })();


/***/ }),

/***/ "+FjM":
/*!***************************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/zone-agnostic/browser/requestIdleCallback.ts ***!
  \***************************************************************************************************/
/*! exports provided: cancelIdleCallback, requestIdleCallback */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cancelIdleCallback", function() { return cancelIdleCallback; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "requestIdleCallback", function() { return requestIdleCallback; });
/* harmony import */ var _zone_checks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../zone-checks */ "V4xg");

const cancelIdleCallback = typeof window !== 'undefined'
    ? (window.cancelIdleCallback ? Object(_zone_checks__WEBPACK_IMPORTED_MODULE_0__["getZoneUnPatchedApi"])('cancelIdleCallback') : false) ||
        function (idleId) {
            console.warn('cancelIdleCallback not implemented. Use clearTimeout as fallback');
            clearTimeout(idleId);
        }
    : () => {
    };
const requestIdleCallback = typeof window !== 'undefined'
    ? (window.requestIdleCallback ? Object(_zone_checks__WEBPACK_IMPORTED_MODULE_0__["getZoneUnPatchedApi"])('requestIdleCallback') : false) ||
        function (cb) {
            console.warn('requestIdleCallback not implemented. Use setTimeout as fallback');
            const start = Date.now();
            return setTimeout(function () {
                cb({
                    didTimeout: false,
                    timeRemaining() {
                        return Math.max(0, 50 - (Date.now() - start));
                    }
                });
            }, 1);
        }
    : () => {
    };


/***/ }),

/***/ "+Gkt":
/*!*********************************************************!*\
  !*** ./apps/demos/src/app/shared/rx-effects.service.ts ***!
  \*********************************************************/
/*! exports provided: RxEffects */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RxEffects", function() { return RxEffects; });
/* harmony import */ var _rx_angular_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rx-angular/state */ "YYsp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");



class RxEffects {
    constructor() {
        this.effectObservable = Object(_rx_angular_state__WEBPACK_IMPORTED_MODULE_0__["createSideEffectObservable"])();
        this.subscription = this.effectObservable.subscribe();
    }
    /**
     * @description
     * Manages side-effects of your state. Provide an `Observable<any>` **side-effect** and an optional
     * `sideEffectFunction`.
     * Subscription handling is done automatically.
     *
     * @example
     * // Directly pass an observable side-effect
     * const localStorageEffect$ = changes$.pipe(
     *  tap(changes => storeChanges(changes))
     * );
     * state.hold(localStorageEffect$);
     *
     * // Pass an additional `sideEffectFunction`
     *
     * const localStorageEffectFn = changes => storeChanges(changes);
     * state.hold(changes$, localStorageEffectFn);
     *
     * @param {Observable<S>} obsOrObsWithSideEffect
     * @param {function} [sideEffectFn]
     */
    hold(obsOrObsWithSideEffect, sideEffectFn) {
        if (typeof sideEffectFn === 'function') {
            this.effectObservable.nextEffectObservable(obsOrObsWithSideEffect.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(sideEffectFn)));
            return;
        }
        this.effectObservable.nextEffectObservable(obsOrObsWithSideEffect);
    }
    ngOnDestroy() {
        // tslint:disable-next-line:no-unused-expression
        this.subscription && this.subscription.unsubscribe();
    }
}
RxEffects.ɵfac = function RxEffects_Factory(t) { return new (t || RxEffects)(); };
RxEffects.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: RxEffects, factory: RxEffects.ɵfac });


/***/ }),

/***/ "+JX6":
/*!***********************************************************!*\
  !*** ./libs/state/src/lib/cdk/accumulation-observable.ts ***!
  \***********************************************************/
/*! exports provided: createAccumulationObservable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createAccumulationObservable", function() { return createAccumulationObservable; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");


const defaultAccumulator = (st, sl) => {
    return Object.assign(Object.assign({}, st), sl);
};
function createAccumulationObservable(stateObservables = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"](), stateSlices = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"](), accumulatorObservable = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"](defaultAccumulator)) {
    const signal$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["merge"])(stateObservables.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["mergeAll"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["observeOn"])(rxjs__WEBPACK_IMPORTED_MODULE_0__["queueScheduler"])), stateSlices.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["observeOn"])(rxjs__WEBPACK_IMPORTED_MODULE_0__["queueScheduler"]))).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["withLatestFrom"])(accumulatorObservable.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["observeOn"])(rxjs__WEBPACK_IMPORTED_MODULE_0__["queueScheduler"]))), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["scan"])((state, [slice, stateAccumulator]) => stateAccumulator(state, slice), {}), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])((newState) => (compositionObservable.state = newState), (error) => console.error(error)), 
    // @Notice We catch the error here as it get lost in between `publish` and `publishReplay`. We return empty to
    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])((e) => rxjs__WEBPACK_IMPORTED_MODULE_0__["EMPTY"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["publish"])());
    const state$ = signal$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["publishReplay"])(1));
    const compositionObservable = {
        state: {},
        signal$,
        state$,
        nextSlice,
        nextSliceObservable,
        nextAccumulator,
        subscribe
    };
    // ======
    return compositionObservable;
    // ======
    function nextAccumulator(accumulatorFn) {
        accumulatorObservable.next(accumulatorFn);
    }
    function nextSlice(stateSlice) {
        stateSlices.next(stateSlice);
    }
    function nextSliceObservable(stateObservable) {
        stateObservables.next(stateObservable);
    }
    function subscribe() {
        const sub = compositionObservable.signal$.connect();
        sub.add(compositionObservable.state$.connect());
        sub.add(() => {
            accumulatorObservable.complete();
            stateObservables.complete();
            stateSlices.complete();
        });
        return sub;
    }
}


/***/ }),

/***/ "+N1c":
/*!*******************************************************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/zone-agnostic/rxjs/schedulers/animation-frame/AnimationFrameScheduler.ts ***!
  \*******************************************************************************************************************************/
/*! exports provided: AnimationFrameScheduler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnimationFrameScheduler", function() { return AnimationFrameScheduler; });
/* harmony import */ var _async_AsyncScheduler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../async/AsyncScheduler */ "It4N");

class AnimationFrameScheduler extends _async_AsyncScheduler__WEBPACK_IMPORTED_MODULE_0__["AsyncScheduler"] {
    flush(action) {
        this.active = true;
        this.scheduled = undefined;
        const { actions } = this;
        let error;
        let index = -1;
        let count = actions.length;
        action = action || actions.shift();
        do {
            if ((error = action.execute(action.state, action.delay))) {
                break;
            }
        } while (++index < count && (action = actions.shift()));
        this.active = false;
        if (error) {
            while (++index < count && (action = actions.shift())) {
                action.unsubscribe();
            }
            throw error;
        }
    }
}


/***/ }),

/***/ "+T49":
/*!*********************************************************************!*\
  !*** ./apps/demos/src/app/app-shell/side-nav/side-nav.component.ts ***!
  \*********************************************************************/
/*! exports provided: AppShellSideNavComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppShellSideNavComponent", function() { return AppShellSideNavComponent; });
/* harmony import */ var _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/cdk/tree */ "FvrZ");
/* harmony import */ var _angular_material_tree__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/tree */ "8yBR");
/* harmony import */ var _rx_angular_state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @rx-angular/state */ "YYsp");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils */ "ozva");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _side_nav_item_directive__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./side-nav-item.directive */ "jvPn");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");













function AppShellSideNavComponent_cdk_nested_tree_node_1_mat_icon_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "mat-icon", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const navItem_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("svgIcon", navItem_r2.icon.svgIcon);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", navItem_r2.icon.matIcon, " ");
} }
function AppShellSideNavComponent_cdk_nested_tree_node_1_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "cdk-nested-tree-node", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "a", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AppShellSideNavComponent_cdk_nested_tree_node_1_Template_a_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r7); const navItem_r2 = ctx.$implicit; const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r6.navItemSelected.next(navItem_r2); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](2, AppShellSideNavComponent_cdk_nested_tree_node_1_mat_icon_2_Template, 2, 2, "mat-icon", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const navItem_r2 = ctx.$implicit;
    const level_r3 = ctx.level;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("routerLink", navItem_r2.link)("rxaAppShellSideNavItemLevel", level_r3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", navItem_r2.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", navItem_r2.label, " ");
} }
function AppShellSideNavComponent_cdk_nested_tree_node_2_mat_icon_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "mat-icon", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const navItem_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("svgIcon", navItem_r8.icon.svgIcon);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", navItem_r8.icon.matIcon, " ");
} }
function AppShellSideNavComponent_cdk_nested_tree_node_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "cdk-nested-tree-node", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "a", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](2, AppShellSideNavComponent_cdk_nested_tree_node_2_mat_icon_2_Template, 2, 2, "mat-icon", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainer"](6, 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const navItem_r8 = ctx.$implicit;
    const level_r9 = ctx.level;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("rxaAppShellSideNavItemLevel", level_r9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", navItem_r8.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](navItem_r8.label);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("hidden", !ctx_r1.treeControl.isExpanded(navItem_r8));
} }
class AppShellSideNavComponent {
    constructor(state) {
        this.state = state;
        this.navItemDataSource = new _angular_material_tree__WEBPACK_IMPORTED_MODULE_1__["MatTreeNestedDataSource"]();
        this.treeControl = new _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_0__["NestedTreeControl"]((node) => node.children);
        this.navItemSelected = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.viewState$ = this.state.select();
        this.hasChild = (_, node) => !!node.children && node.children.length > 0;
    }
    set navItems(navItems) {
        this.navItemDataSource._data.next(Object(_utils__WEBPACK_IMPORTED_MODULE_4__["generateRoutes"])(navItems) || []);
    }
    trackNavItem(i, navItem) {
        return navItem.link;
    }
}
AppShellSideNavComponent.ɵfac = function AppShellSideNavComponent_Factory(t) { return new (t || AppShellSideNavComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_rx_angular_state__WEBPACK_IMPORTED_MODULE_2__["RxState"])); };
AppShellSideNavComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: AppShellSideNavComponent, selectors: [["rxa-side-nav"]], inputs: { navItems: "navItems" }, outputs: { navItemSelected: "navItemSelected" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵProvidersFeature"]([_rx_angular_state__WEBPACK_IMPORTED_MODULE_2__["RxState"]])], decls: 3, vars: 3, consts: [[1, "rxa-app-shell-tree", 3, "dataSource", "treeControl"], ["class", "app-shell-tree-node app-shell-leaf-node", 4, "cdkTreeNodeDef"], ["class", "app-shell-tree-node app-shell-expandable-node", 4, "cdkTreeNodeDef", "cdkTreeNodeDefWhen"], [1, "app-shell-tree-node", "app-shell-leaf-node"], ["mat-flat-button", "", "routerLinkActive", "active", "rxaAppShellSideNavItem", "", 1, "w-100", "text-left", 3, "routerLink", "rxaAppShellSideNavItemLevel", "click"], ["class", "mr-1", 3, "svgIcon", 4, "ngIf"], [1, "mr-1", 3, "svgIcon"], [1, "app-shell-tree-node", "app-shell-expandable-node"], ["mat-flat-button", "", "rxaAppShellSideNavItem", "", "cdkTreeNodeToggle", "", 1, "w-100", "text-left", 3, "rxaAppShellSideNavItemLevel"], [3, "hidden"], ["cdkTreeNodeOutlet", ""]], template: function AppShellSideNavComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "cdk-tree", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, AppShellSideNavComponent_cdk_nested_tree_node_1_Template, 4, 4, "cdk-nested-tree-node", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](2, AppShellSideNavComponent_cdk_nested_tree_node_2_Template, 7, 4, "cdk-nested-tree-node", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("dataSource", ctx.navItemDataSource)("treeControl", ctx.treeControl);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("cdkTreeNodeDefWhen", ctx.hasChild);
    } }, directives: [_angular_cdk_tree__WEBPACK_IMPORTED_MODULE_0__["CdkTree"], _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_0__["CdkTreeNodeDef"], _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_0__["CdkNestedTreeNode"], _angular_material_button__WEBPACK_IMPORTED_MODULE_6__["MatAnchor"], _angular_router__WEBPACK_IMPORTED_MODULE_7__["RouterLinkWithHref"], _angular_router__WEBPACK_IMPORTED_MODULE_7__["RouterLinkActive"], _side_nav_item_directive__WEBPACK_IMPORTED_MODULE_8__["AppShellSideNavItemDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgIf"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__["MatIcon"], _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_0__["CdkTreeNodeToggle"], _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_0__["CdkTreeNodeOutlet"]], styles: [".app-shell-tree-node[_ngcontent-%COMP%] {\n  display: block;\n}\n\n.app-shell-sidenav-item[_ngcontent-%COMP%] {\n  height: 3rem;\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n}\n\n.app-shell-sidenav-item-level-1[_ngcontent-%COMP%] {\n  padding-left: 2rem;\n}\n\n.app-shell-sidenav-item-level-2[_ngcontent-%COMP%] {\n  padding-left: 3rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NpZGUtbmF2LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsY0FBQTtBQUNGOztBQUVBO0VBQ0UsWUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLDJCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxrQkFBQTtBQUNGOztBQUVBO0VBQ0Usa0JBQUE7QUFDRiIsImZpbGUiOiJzaWRlLW5hdi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5hcHAtc2hlbGwtdHJlZS1ub2RlIHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbi5hcHAtc2hlbGwtc2lkZW5hdi1pdGVtIHtcbiAgaGVpZ2h0OiAzcmVtO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG59XG5cbi5hcHAtc2hlbGwtc2lkZW5hdi1pdGVtLWxldmVsLTEge1xuICBwYWRkaW5nLWxlZnQ6IDJyZW07XG59XG5cbi5hcHAtc2hlbGwtc2lkZW5hdi1pdGVtLWxldmVsLTIge1xuICBwYWRkaW5nLWxlZnQ6IDNyZW07XG59XG4iXX0= */"], changeDetection: 0 });


/***/ }),

/***/ "+iFM":
/*!*************************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/directives/unpatch/unpatch-events.module.ts ***!
  \*************************************************************************************************/
/*! exports provided: UnpatchEventsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnpatchEventsModule", function() { return UnpatchEventsModule; });
/* harmony import */ var _unpatch_events_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./unpatch-events.directive */ "OyBQ");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


const DECLARATIONS = [_unpatch_events_directive__WEBPACK_IMPORTED_MODULE_0__["UnpatchEventsDirective"]];
class UnpatchEventsModule {
}
UnpatchEventsModule.ɵfac = function UnpatchEventsModule_Factory(t) { return new (t || UnpatchEventsModule)(); };
UnpatchEventsModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: UnpatchEventsModule });
UnpatchEventsModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({});
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](UnpatchEventsModule, { declarations: [_unpatch_events_directive__WEBPACK_IMPORTED_MODULE_0__["UnpatchEventsDirective"]], exports: [_unpatch_events_directive__WEBPACK_IMPORTED_MODULE_0__["UnpatchEventsDirective"]] }); })();


/***/ }),

/***/ "/85T":
/*!*****************************************************!*\
  !*** ./libs/cdk/src/lib/utils/coalescingManager.ts ***!
  \*****************************************************/
/*! exports provided: coalescingManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "coalescingManager", function() { return coalescingManager; });
const coalescingManager = createCoalesceManager();
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
        setProps: setProperties,
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
const coalescingContextPropertiesMap = createPropertiesWeakMap((ctx) => ({
    numCoalescingSubscribers: 0,
}));
/**
 * @describe createCoalesceManager
 *
 * returns a
 * Maintains a weak map of component references ans flags
 * them if the coalescing process is already started for them.
 *
 * Used in render aware internally.
 */
function createCoalesceManager() {
    return {
        remove: removeWork,
        add: addWork,
        isCoalescing,
    };
    // Increments the number of subscriptions in a scope e.g. a class instance
    function removeWork(scope) {
        const numCoalescingSubscribers = coalescingContextPropertiesMap.getProps(scope).numCoalescingSubscribers -
            1;
        coalescingContextPropertiesMap.setProps(scope, {
            numCoalescingSubscribers: numCoalescingSubscribers >= 0 ? numCoalescingSubscribers : 0,
        });
    }
    // Decrements the number of subscriptions in a scope e.g. a class instance
    function addWork(scope) {
        const numCoalescingSubscribers = coalescingContextPropertiesMap.getProps(scope).numCoalescingSubscribers +
            1;
        coalescingContextPropertiesMap.setProps(scope, {
            numCoalescingSubscribers,
        });
    }
    // Checks if anybody else is already coalescing atm
    function isCoalescing(scope) {
        return (coalescingContextPropertiesMap.getProps(scope).numCoalescingSubscribers >
            0);
    }
}


/***/ }),

/***/ "/NyO":
/*!****************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/pipes/memo/memo-map.ts ***!
  \****************************************************************************/
/*! exports provided: memoFac, memoFnMap, getMemoizedFn */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "memoFac", function() { return memoFac; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "memoFnMap", function() { return memoFnMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMemoizedFn", function() { return getMemoizedFn; });
/* harmony import */ var _cdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../cdk */ "a7DI");

const memoFac = Object(_cdk__WEBPACK_IMPORTED_MODULE_0__["memo"])(500);
const memoFnMap = new Map();
function getMemoizedFn(fn) {
    if (memoFnMap.has(fn)) {
        return memoFnMap.get(fn);
    }
    else {
        const f = memoFac(fn);
        memoFnMap.set(fn, f);
        return f;
    }
}


/***/ }),

/***/ "/WVI":
/*!***************************************************************************************!*\
  !*** ./apps/demos/src/app/features/template/strategies/concurrent-strategies.menu.ts ***!
  \***************************************************************************************/
/*! exports provided: MENU_ITEMS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MENU_ITEMS", function() { return MENU_ITEMS; });
const MENU_ITEMS = [
    {
        label: 'Comparison',
        link: 'comparison'
    },
    {
        label: 'Pixel Priority',
        link: 'pixel-priority'
    }
];


/***/ }),

/***/ "/fku":
/*!*************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/components/index.ts ***!
  \*************************************************************************/
/*! exports provided: RxContextTemplateNames, RxContext, RxContextContainer, RxContextModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./context */ "iuAr");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxContextTemplateNames", function() { return _context__WEBPACK_IMPORTED_MODULE_0__["RxContextTemplateNames"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxContext", function() { return _context__WEBPACK_IMPORTED_MODULE_0__["RxContext"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxContextContainer", function() { return _context__WEBPACK_IMPORTED_MODULE_0__["RxContextContainer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxContextModule", function() { return _context__WEBPACK_IMPORTED_MODULE_0__["RxContextModule"]; });




/***/ }),

/***/ "/kO0":
/*!**********************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/zone-agnostic/rxjs/index.ts ***!
  \**********************************************************************************/
/*! exports provided: interval, fromEvent, asyncScheduler, asapScheduler, queueScheduler, animationFrameScheduler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./observable */ "Eo3l");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interval", function() { return _observable__WEBPACK_IMPORTED_MODULE_0__["interval"]; });

/* harmony import */ var _operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./operators */ "MqLN");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fromEvent", function() { return _operators__WEBPACK_IMPORTED_MODULE_1__["fromEvent"]; });

/* harmony import */ var _schedulers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./schedulers */ "Lifd");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asyncScheduler", function() { return _schedulers__WEBPACK_IMPORTED_MODULE_2__["asyncScheduler"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asapScheduler", function() { return _schedulers__WEBPACK_IMPORTED_MODULE_2__["asapScheduler"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "queueScheduler", function() { return _schedulers__WEBPACK_IMPORTED_MODULE_2__["queueScheduler"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "animationFrameScheduler", function() { return _schedulers__WEBPACK_IMPORTED_MODULE_2__["animationFrameScheduler"]; });






/***/ }),

/***/ "/raB":
/*!*************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/directives/index.ts ***!
  \*************************************************************************/
/*! exports provided: RxLetTemplateNames, RxLet, RxLetModule, RxIfTemplateNames, RxIf, RxIfModule, RxSwichModule, RxSwitchCase, RxSwitch, RxFor, RxForModule, unpatchEventListener, UnpatchEventsDirective, UnpatchEventsModule, IfVisibleDirective, IfVisibleModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _let__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./let */ "poug");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxLetTemplateNames", function() { return _let__WEBPACK_IMPORTED_MODULE_0__["RxLetTemplateNames"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxLet", function() { return _let__WEBPACK_IMPORTED_MODULE_0__["RxLet"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxLetModule", function() { return _let__WEBPACK_IMPORTED_MODULE_0__["RxLetModule"]; });

/* harmony import */ var _if__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./if */ "3/sx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxIfTemplateNames", function() { return _if__WEBPACK_IMPORTED_MODULE_1__["RxIfTemplateNames"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxIf", function() { return _if__WEBPACK_IMPORTED_MODULE_1__["RxIf"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxIfModule", function() { return _if__WEBPACK_IMPORTED_MODULE_1__["RxIfModule"]; });

/* harmony import */ var _switch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./switch */ "YW9V");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxSwichModule", function() { return _switch__WEBPACK_IMPORTED_MODULE_2__["RxSwichModule"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxSwitchCase", function() { return _switch__WEBPACK_IMPORTED_MODULE_2__["RxSwitchCase"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxSwitch", function() { return _switch__WEBPACK_IMPORTED_MODULE_2__["RxSwitch"]; });

/* harmony import */ var _for__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./for */ "clYq");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxFor", function() { return _for__WEBPACK_IMPORTED_MODULE_3__["RxFor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxForModule", function() { return _for__WEBPACK_IMPORTED_MODULE_3__["RxForModule"]; });

/* harmony import */ var _unpatch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./unpatch */ "B09P");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "unpatchEventListener", function() { return _unpatch__WEBPACK_IMPORTED_MODULE_4__["unpatchEventListener"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UnpatchEventsDirective", function() { return _unpatch__WEBPACK_IMPORTED_MODULE_4__["UnpatchEventsDirective"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UnpatchEventsModule", function() { return _unpatch__WEBPACK_IMPORTED_MODULE_4__["UnpatchEventsModule"]; });

/* harmony import */ var _if_visible__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./if-visible */ "DAZM");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IfVisibleDirective", function() { return _if_visible__WEBPACK_IMPORTED_MODULE_5__["IfVisibleDirective"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IfVisibleModule", function() { return _if_visible__WEBPACK_IMPORTED_MODULE_5__["IfVisibleModule"]; });









/***/ }),

/***/ 0:
/*!**************************************!*\
  !*** multi ./apps/demos/src/main.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/runner/work/rx-angular/rx-angular/apps/demos/src/main.ts */"Wwg6");


/***/ }),

/***/ "0RMi":
/*!*********************************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/zone-agnostic/rxjs/schedulers/queue/QueueAction.ts ***!
  \*********************************************************************************************************/
/*! exports provided: QueueAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueueAction", function() { return QueueAction; });
/* harmony import */ var _async_AsyncAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../async/AsyncAction */ "FXx3");
// tslint:disable

/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class QueueAction extends _async_AsyncAction__WEBPACK_IMPORTED_MODULE_0__["AsyncAction"] {
    constructor(scheduler, work) {
        super(scheduler, work);
        this.scheduler = scheduler;
        this.work = work;
    }
    schedule(state, delay = 0) {
        if (delay > 0) {
            return super.schedule(state, delay);
        }
        this.delay = delay;
        this.state = state;
        // @ts-ignore
        this.scheduler.flush(this);
        return this;
    }
    execute(state, delay) {
        return delay > 0 || this.closed
            ? super.execute(state, delay)
            : this._execute(state, delay);
    }
    requestAsyncId(scheduler, id, delay = 0) {
        // If delay exists and is greater than 0, or if the delay is null (the
        // action wasn't rescheduled) but was originally scheduled as an async
        // action, then recycle as an async action.
        if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
            return super.requestAsyncId(scheduler, id, delay);
        }
        // Otherwise flush the scheduler starting with this action.
        // @ts-ignore
        return scheduler.flush(this);
    }
}


/***/ }),

/***/ "0wRn":
/*!*************************************************************!*\
  !*** ./libs/cdk/src/lib/zone-less/rxjs/observable/timer.ts ***!
  \*************************************************************/
/*! exports provided: timer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timer", function() { return timer; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _scheduler_async_async__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scheduler/async/async */ "Z96z");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "veNg");



/**
 * Creates an Observable that starts emitting after an `dueTime` and
 * emits ever increasing numbers after each `period` of time thereafter.
 *
 * <span class="informal">Its like {@link index/interval}, but you can specify when
 * should the emissions start.</span>
 *
 * ![](timer.png)
 *
 * `timer` returns an Observable that emits an infinite sequence of ascending
 * integers, with a constant interval of time, `period` of your choosing
 * between those emissions. The first emission happens after the specified
 * `dueTime`. The initial delay may be a `Date`. By default, this
 * operator uses the {@link asyncScheduler} {@link SchedulerLike} to provide a notion of time, but you
 * may pass any {@link SchedulerLike} to it. If `period` is not specified, the output
 * Observable emits only one value, `0`. Otherwise, it emits an infinite
 * sequence.
 *
 * ## Examples
 * ### Emits ascending numbers, one every second (1000ms), starting after 3 seconds
 * ```ts
 * import { timer } from 'rxjs';
 *
 * const numbers = timer(3000, 1000);
 * numbers.subscribe(x => console.log(x));
 * ```
 *
 * ### Emits one number after five seconds
 * ```ts
 * import { timer } from 'rxjs';
 *
 * const numbers = timer(5000);
 * numbers.subscribe(x => console.log(x));
 * ```
 * @see {@link index/interval}
 * @see {@link delay}
 *
 * @param {number|Date} [dueTime] The initial delay time specified as a Date object or as an integer denoting
 * milliseconds to wait before emitting the first value of 0`.
 * @param {number|SchedulerLike} [periodOrScheduler] The period of time between emissions of the
 * subsequent numbers.
 * @param {SchedulerLike} [scheduler=async] The {@link SchedulerLike} to use for scheduling
 * the emission of values, and providing a notion of "time".
 * @return {Observable} An Observable that emits a `0` after the
 * `dueTime` and ever increasing numbers after each `period` of time
 * thereafter.
 * @static true
 * @name timer
 * @owner Observable
 */
function timer(dueTime = 0, periodOrScheduler, scheduler) {
    let period = -1;
    if (Object(_utils__WEBPACK_IMPORTED_MODULE_2__["isNumeric"])(periodOrScheduler)) {
        period = (Number(periodOrScheduler) < 1 && 1) || Number(periodOrScheduler);
    }
    else if (Object(_utils__WEBPACK_IMPORTED_MODULE_2__["isScheduler"])(periodOrScheduler)) {
        scheduler = periodOrScheduler;
    }
    if (!Object(_utils__WEBPACK_IMPORTED_MODULE_2__["isScheduler"])(scheduler)) {
        scheduler = _scheduler_async_async__WEBPACK_IMPORTED_MODULE_1__["async"];
    }
    return new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"]((subscriber) => {
        const due = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["isNumeric"])(dueTime)
            ? dueTime
            : +dueTime - scheduler.now();
        return scheduler.schedule(dispatch, due, {
            index: 0,
            period,
            subscriber,
        });
    });
}
function dispatch(state) {
    const { index, period, subscriber } = state;
    subscriber.next(index);
    if (subscriber.closed) {
        return;
    }
    else if (period === -1) {
        return subscriber.complete();
    }
    state.index = index + 1;
    this.schedule(state, period);
}


/***/ }),

/***/ "16Wx":
/*!**********************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/state/rx-effects/index.ts ***!
  \**********************************************************************/
/*! exports provided: RxEffects, untilDestroyed */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _effects_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./effects.service */ "j+MV");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxEffects", function() { return _effects_service__WEBPACK_IMPORTED_MODULE_0__["RxEffects"]; });

/* harmony import */ var _until_destroy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./until-destroy */ "5BDn");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "untilDestroyed", function() { return _until_destroy__WEBPACK_IMPORTED_MODULE_1__["untilDestroyed"]; });





/***/ }),

/***/ "1Eag":
/*!************************************************************************!*\
  !*** ./apps/demos/src/app/features/experiments/state/rx-state.menu.ts ***!
  \************************************************************************/
/*! exports provided: MENU_ITEMS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MENU_ITEMS", function() { return MENU_ITEMS; });
const MENU_ITEMS = [
    {
        link: 'rx-base-state',
        label: 'State Problems',
        children: [
            {
                link: 'subscription',
                label: 'Subscription',
            },
            {
                link: 'composition',
                label: 'Composition',
            },
            {
                link: 'selections',
                label: 'Selections',
            },
            {
                link: 'connect',
                label: 'Connecting',
            },
            {
                link: 'selectslice',
                label: 'SelectSlice',
            },
        ],
    },
];


/***/ }),

/***/ "1EdG":
/*!************************************************************!*\
  !*** ./libs/cdk/src/lib/zone-less/rxjs/operators/index.ts ***!
  \************************************************************/
/*! exports provided: fromEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fromEvent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fromEvent */ "Rc0r");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fromEvent", function() { return _fromEvent__WEBPACK_IMPORTED_MODULE_0__["fromEvent"]; });




/***/ }),

/***/ "1I6V":
/*!********************************************************************!*\
  !*** ./apps/demos/src/app/features/template/rx-for/rx-for.menu.ts ***!
  \********************************************************************/
/*! exports provided: MENU_ITEMS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MENU_ITEMS", function() { return MENU_ITEMS; });
const MENU_ITEMS = [
    {
        label: 'List Actions',
        link: 'list-actions'
    },
    {
        label: 'Nested Lists',
        link: 'nested-lists'
    },
    {
        label: 'Route Change',
        link: 'route-change'
    }
];


/***/ }),

/***/ "1V0p":
/*!***************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/rxjs/operators/ngInputFlatten.ts ***!
  \***************************************************************************************/
/*! exports provided: ngInputFlatten */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ngInputFlatten", function() { return ngInputFlatten; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");


function ngInputFlatten() {
    return o$ => o$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(o => Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["isObservable"])(o) ? o : Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(o)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["switchAll"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["distinctUntilChanged"])());
}


/***/ }),

/***/ "1n3h":
/*!****************************************************************************************!*\
  !*** ./apps/demos/src/app/app-component/app-control-panel/app-control-panel.module.ts ***!
  \****************************************************************************************/
/*! exports provided: AppControlPanelModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppControlPanelModule", function() { return AppControlPanelModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _app_control_panel_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-control-panel.component */ "HXgo");
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/expansion */ "7EHt");
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/chips */ "A5z7");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/select */ "d3UM");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _rx_angular_template__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @rx-angular/template */ "WFkj");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/checkbox */ "bSwM");
/* harmony import */ var _shared_debug_helper_strategy_select__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../shared/debug-helper/strategy-select */ "eakK");
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/slide-toggle */ "1jcm");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/core */ "fXoL");















class AppControlPanelModule {
}
AppControlPanelModule.ɵfac = function AppControlPanelModule_Factory(t) { return new (t || AppControlPanelModule)(); };
AppControlPanelModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdefineNgModule"]({ type: AppControlPanelModule });
AppControlPanelModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _angular_material_expansion__WEBPACK_IMPORTED_MODULE_2__["MatExpansionModule"],
            _angular_material_chips__WEBPACK_IMPORTED_MODULE_3__["MatChipsModule"],
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__["MatIconModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
            _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatFormFieldModule"],
            _angular_material_select__WEBPACK_IMPORTED_MODULE_7__["MatSelectModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_8__["MatButtonModule"],
            _rx_angular_template__WEBPACK_IMPORTED_MODULE_10__["LetModule"],
            _angular_material_list__WEBPACK_IMPORTED_MODULE_9__["MatListModule"],
            _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_11__["MatCheckboxModule"],
            _shared_debug_helper_strategy_select__WEBPACK_IMPORTED_MODULE_12__["StrategySelectModule"],
            _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_13__["MatSlideToggleModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵsetNgModuleScope"](AppControlPanelModule, { declarations: [_app_control_panel_component__WEBPACK_IMPORTED_MODULE_1__["AppControlPanelComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _angular_material_expansion__WEBPACK_IMPORTED_MODULE_2__["MatExpansionModule"],
        _angular_material_chips__WEBPACK_IMPORTED_MODULE_3__["MatChipsModule"],
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__["MatIconModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
        _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatFormFieldModule"],
        _angular_material_select__WEBPACK_IMPORTED_MODULE_7__["MatSelectModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_8__["MatButtonModule"],
        _rx_angular_template__WEBPACK_IMPORTED_MODULE_10__["LetModule"],
        _angular_material_list__WEBPACK_IMPORTED_MODULE_9__["MatListModule"],
        _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_11__["MatCheckboxModule"],
        _shared_debug_helper_strategy_select__WEBPACK_IMPORTED_MODULE_12__["StrategySelectModule"],
        _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_13__["MatSlideToggleModule"]], exports: [_app_control_panel_component__WEBPACK_IMPORTED_MODULE_1__["AppControlPanelComponent"]] }); })();


/***/ }),

/***/ "2AMg":
/*!*******************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/rxjs/operators/select.ts ***!
  \*******************************************************************************/
/*! exports provided: select */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "select", function() { return select; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _guards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../guards */ "lW3W");
/* harmony import */ var _pipe_from_array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../pipe-from-array */ "G3w/");
/* harmony import */ var _stateful__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./stateful */ "6bkt");




/**
 * @internal
 */
function select(...opOrMapFn) {
    return (state$) => {
        if (!opOrMapFn || opOrMapFn.length === 0) {
            return state$.pipe(Object(_stateful__WEBPACK_IMPORTED_MODULE_3__["stateful"])());
        }
        else if (Object(_guards__WEBPACK_IMPORTED_MODULE_1__["isStringArrayGuard"])(opOrMapFn)) {
            return state$.pipe(Object(_stateful__WEBPACK_IMPORTED_MODULE_3__["stateful"])(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["pluck"])(...opOrMapFn)));
        }
        else if (Object(_guards__WEBPACK_IMPORTED_MODULE_1__["isOperateFnArrayGuard"])(opOrMapFn)) {
            return state$.pipe(Object(_stateful__WEBPACK_IMPORTED_MODULE_3__["stateful"])(Object(_pipe_from_array__WEBPACK_IMPORTED_MODULE_2__["pipeFromArray"])(opOrMapFn)));
        }
        else {
            throw new Error('wrong params passed to select');
        }
    };
}


/***/ }),

/***/ "2Cyy":
/*!*******************************************************************!*\
  !*** ./libs/state/src/lib/transformation-helpers/array/remove.ts ***!
  \*******************************************************************/
/*! exports provided: remove */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "remove", function() { return remove; });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core */ "jym9");
/* harmony import */ var _internals_valuesComparer_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_internals/valuesComparer.util */ "SDiw");


/**
 * @description
 * Removes one or multiple items from an array T[].
 * For comparison you can provide a key, an array of keys or a custom comparison function that should return true if items match.
 * If no comparison data is provided, an equality check is used by default.
 * Returns a shallow copy of the updated array T[], and does not mutate the original one.
 *
 * @example
 * // Removing value without comparison data
 *
 * const items = [1,2,3,4,5];
 *
 * const updatedItems = remove(items, [1,2,3]);
 *
 * // updatedItems will be: [4,5];
 *
 * @example
 * // Removing values with comparison function
 *
 * const creatures = [{id: 1, type: 'cat'}, {id: 2, type: 'unicorn'}, {id: 3, type: 'kobold'}];
 *
 * const nonExistingCreatures = [{id: 2, type: 'unicorn'}, {id: 3, type: 'kobold'}];
 *
 * const realCreatures = remove(creatures, nonExistingCreatures, (a, b) => a.id === b.id);
 *
 * // realCreatures will be: [{id: 1, type: 'cat'}];
 *
 * @example
 * // Removing values with key
 *
 * const creatures = [{id: 1, type: 'cat'}, {id: 2, type: 'unicorn'}, {id: 3, type: 'kobold'}];
 *
 * const nonExistingCreatures = [{id: 2, type: 'unicorn'}, {id: 3, type: 'kobold'}];
 *
 * const realCreatures = remove(creatures, nonExistingCreatures, 'id');
 *
 * // realCreatures will be: [{id: 1, type: 'cat'}];
 *
 * @example
 * // Removing values with array of keys
 *
 * const creatures = [{id: 1, type: 'cat'}, {id: 2, type: 'unicorn'}, {id: 3, type: 'kobold'}];
 *
 * const nonExistingCreatures = [{id: 2, type: 'unicorn'}, {id: 3, type: 'kobold'}];
 *
 * const realCreatures = remove(creatures, nonExistingCreatures, ['id', 'type']);
 *
 * // realCreatures will be: [{id: 1, type: 'cat'}];
 *
 * @example
 * // Usage with RxState
 *
 * export class ListComponent {
 *
 *    readonly removeCreature$ = new Subject<Creature>();
 *
 *    constructor(private state: RxState<ComponentState>) {
 *      // Reactive implementation
 *      state.connect(
 *        'creatures',
 *        this.removeCreature$,
 *        ({ creatures }, creatureToRemove) => {
 *            return remove(creatures, creatureToRemove, (a, b) => a.id === b.id);
 *        }
 *      );
 *    }
 *
 *    // Imperative implementation
 *    removeCreature(creatureToRemove: Creature): void {
 *        this.state.set({ creatures: remove(this.state.get().creatures, creatureToRemove, (a, b) => a.id === b.id)});
 *    }
 * }
 *
 * @returns T[]
 *
 * @docsPage remove
 * @docsCategory transformation-helpers
 */
function remove(source, scrap, compare) {
    const scrapAsArray = Object(_core__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(scrap)
        ? Array.isArray(scrap)
            ? scrap
            : [scrap]
        : [];
    const invalidInput = !Array.isArray(source);
    if (invalidInput) {
        console.warn(`Remove: original value (${source}) is not an array`);
        return source;
    }
    return source.filter((existingItem) => {
        return !scrapAsArray.some((item) => Object(_internals_valuesComparer_util__WEBPACK_IMPORTED_MODULE_1__["valuesComparer"])(item, existingItem, compare));
    });
}


/***/ }),

/***/ "2L99":
/*!**********************************************************!*\
  !*** ./libs/state/src/lib/rxjs/operators/selectSlice.ts ***!
  \**********************************************************/
/*! exports provided: selectSlice */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectSlice", function() { return selectSlice; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _distinctUntilSomeChanged__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./distinctUntilSomeChanged */ "xZVK");


/**
 * @description
 *
 * Returns an Observable that emits only the provided `keys` emitted by the source Observable. Each key will get
 * filtered to only emit _defined_ values as well as checked for distinct emissions.
 * Comparison will be done for each set key in the `keys` array.
 *
 * `selectSlice` will only emit _valid_ selections. A selection is _valid_ if every
 * selected key exists and is defined in the source Observable. This ensures that the `selectSlice`
 * operator will always return a complete slice with all values defined.
 *
 * You can fine grain your distinct checks by providing a `KeyCompareMap` with those keys you want to compute
 * explicitly different
 *
 * @example
 *
 * // An example with a custom comparison applied to each key
 * import { of } from 'rxjs';
 * import { selectSlice } from 'rx-angular/state';
 *
 *
 * const state$: Observable<MyState> = of(
 *  { title: 'myTitle', panelOpen: true},
 *  { title: 'myTitle2', panelOpen: true},
 *  { title: 'newTitle', panelOpen: true},
 *  { title: 'newTitle', panelOpen: false}
 * )
 * .pipe(
 *     selectSlice(['title', 'panelOpen']),
 *   )
 *   .subscribe(x => console.log(x));
 *
 * // displays:
 * //  { title: 'myTitle', panelOpen: true },
 * //  { title: 'myTitle2', panelOpen: true },
 * //  { title: 'newTitle', panelOpen: true },
 * //  { title: 'newTitle', panelOpen: false }
 *
 * @example
 *
 * import { of, Observable } from 'rxjs';
 * import { tap } from 'rxjs/operators';
 * import { selectSlice } from 'rx-angular/state';
 *
 * interface MyState {
 *    title: string;
 *    items: string[];
 *    panelOpen: boolean;
 * }
 * // Select items and title.
 * // apply custom compare logic for the items array
 * const customComparison: KeyCompareMap<MyState> = {
 *   items: (oldItems, newItems) => compareItems(oldItems, newItems)
 * };
 * const state$: Observable<MyState> = of(
 * { title: 'myTitle', items: ['foo', 'bar'], panelOpen: true },
 * { title: 'myTitle', items: ['foo', 'bar'], panelOpen: false },
 * { title: 'nextTitle', items: ['foo', 'baR'], panelOpen: true },
 * { title: 'nextTitle', items: ['fooRz', 'boo'], panelOpen: false },
 * );
 * const slice$ = state$.pipe(selectSlice(['title', 'items'], customComparison), tap(console.log)).subscribe();
 *
 * // displays:
 * // { title: 'myTitle', items: ['foo', 'bar'] }
 * // { title: 'nextTitle', items: ['foo', 'baR'] }
 * // { title: 'nextTitle', items: ['fooRz', 'boo'] }
 *
 * @param {(K)[]} keys - the array of keys which should be selected
 * @param {KeyCompareMap<{ [P in K]: T[P] }>} [keyCompareMap] Optional KeyCompareMap to provide custom compare logic
 * for some the keys
 * @docsPage selectSlice
 * @docsCategory operators
 */
function selectSlice(keys, keyCompareMap) {
    return (o$) => o$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["filter"])((state) => state !== undefined), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])((state) => {
        // forward null
        if (state === null) {
            return null;
        }
        // an array of all keys which exist and are _defined_ in the state object
        const definedKeys = keys
            // filter out undefined properties e. g. {}, { str: undefined }
            .filter((k) => state.hasOwnProperty(k) && state[k] !== undefined);
        // we want to ensure to only emit _valid_ selections
        // a selection is _valid_ if every selected key exists and has a value:
        // {} => selectSlice(['foo']) => no emission
        // {str: 'test'} => selectSlice([]) => no emission
        // {str: 'test'} => selectSlice(['notPresent']) => no emission
        // {str: 'test'} => state.select(selectSlice([])) => no emission
        // {str: 'test'} => state.select(selectSlice(['notPresent'])) => no emission
        // {str: undefined} => state.select(selectSlice(['str'])) => no emission
        // {str: 'test', foo: undefined } => state.select(selectSlice(['foo'])) => no emission
        if (definedKeys.length < keys.length) {
            return undefined;
        }
        // create the selected slice
        return definedKeys
            .reduce((vm, key) => {
            vm[key] = state[key];
            return vm;
        }, {});
    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["filter"])((v) => v !== undefined), Object(_distinctUntilSomeChanged__WEBPACK_IMPORTED_MODULE_1__["distinctUntilSomeChanged"])(keys, keyCompareMap));
}


/***/ }),

/***/ "2OPz":
/*!*************************************************************************************!*\
  !*** ./libs/cdk/src/lib/zone-less/rxjs/scheduler/animation-frame/animationFrame.ts ***!
  \*************************************************************************************/
/*! exports provided: animationFrame */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "animationFrame", function() { return animationFrame; });
/* harmony import */ var _AnimationFrameAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AnimationFrameAction */ "ioEk");
/* harmony import */ var _AnimationFrameScheduler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AnimationFrameScheduler */ "BhH/");
// tslint:disable file-name-casing


/**
 *
 * NOTE: This is a zone un-patched version of rxjs animationFrameScheduler
 *
 * Animation Frame Scheduler
 *
 * <span class="informal">Perform task when `window.requestAnimationFrame` would fire</span>
 *
 * When `animationFrame` scheduler is used with delay, it will fall back to {@link asyncScheduler} scheduler
 * behaviour.
 *
 * Without delay, `animationFrame` scheduler can be used to create smooth browser animations.
 * It makes sure scheduled task will happen just before next browser content repaint,
 * thus performing animations as efficiently as possible.
 *
 * ## Example
 * Schedule div height animation
 * ```ts
 * // html: <div style="background: #0ff;"></div>
 * import { animationFrameScheduler } from '@cu/perf-utils';
 *
 * const div = document.querySelector('div');
 *
 * animationFrameScheduler.schedule(function(height) {
 *   div.style.height = height + "px";
 *
 *   this.schedule(height + 1);  // `this` references currently executing Action,
 *                               // which we reschedule with new state
 * }, 0, 0);
 *
 * // You will see a div element growing in height
 * ```
 */
const animationFrame = new _AnimationFrameScheduler__WEBPACK_IMPORTED_MODULE_1__["AnimationFrameScheduler"](_AnimationFrameAction__WEBPACK_IMPORTED_MODULE_0__["AnimationFrameAction"]);


/***/ }),

/***/ "2e5+":
/*!*********************************************!*\
  !*** ./libs/cdk/src/lib/zone-less/index.ts ***!
  \*********************************************/
/*! exports provided: getZoneUnPatchedApi, Promise, requestAnimationFrame, cancelAnimationFrame, setInterval, clearInterval, setTimeout, clearTimeout, unpatchAddEventListener, asyncScheduler, asap, queue, animationFrame, interval, timer, fromEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "FflV");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getZoneUnPatchedApi", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["getZoneUnPatchedApi"]; });

/* harmony import */ var _browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./browser */ "ao4c");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Promise", function() { return _browser__WEBPACK_IMPORTED_MODULE_1__["Promise"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "requestAnimationFrame", function() { return _browser__WEBPACK_IMPORTED_MODULE_1__["requestAnimationFrame"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cancelAnimationFrame", function() { return _browser__WEBPACK_IMPORTED_MODULE_1__["cancelAnimationFrame"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setInterval", function() { return _browser__WEBPACK_IMPORTED_MODULE_1__["setInterval"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "clearInterval", function() { return _browser__WEBPACK_IMPORTED_MODULE_1__["clearInterval"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setTimeout", function() { return _browser__WEBPACK_IMPORTED_MODULE_1__["setTimeout"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "clearTimeout", function() { return _browser__WEBPACK_IMPORTED_MODULE_1__["clearTimeout"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "unpatchAddEventListener", function() { return _browser__WEBPACK_IMPORTED_MODULE_1__["unpatchAddEventListener"]; });

/* harmony import */ var _rxjs_scheduler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rxjs/scheduler */ "zPwp");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asyncScheduler", function() { return _rxjs_scheduler__WEBPACK_IMPORTED_MODULE_2__["asyncScheduler"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asap", function() { return _rxjs_scheduler__WEBPACK_IMPORTED_MODULE_2__["asap"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "queue", function() { return _rxjs_scheduler__WEBPACK_IMPORTED_MODULE_2__["queue"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "animationFrame", function() { return _rxjs_scheduler__WEBPACK_IMPORTED_MODULE_2__["animationFrame"]; });

/* harmony import */ var _rxjs_observable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rxjs/observable */ "C6fF");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interval", function() { return _rxjs_observable__WEBPACK_IMPORTED_MODULE_3__["interval"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timer", function() { return _rxjs_observable__WEBPACK_IMPORTED_MODULE_3__["timer"]; });

/* harmony import */ var _rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./rxjs/operators */ "1EdG");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fromEvent", function() { return _rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["fromEvent"]; });








/***/ }),

/***/ "3/sx":
/*!****************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/directives/if/index.ts ***!
  \****************************************************************************/
/*! exports provided: RxIfTemplateNames, RxIf, RxIfModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model */ "wOjG");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxIfTemplateNames", function() { return _model__WEBPACK_IMPORTED_MODULE_0__["RxIfTemplateNames"]; });

/* harmony import */ var _rx_if_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rx-if.directive */ "Dq9L");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxIf", function() { return _rx_if_directive__WEBPACK_IMPORTED_MODULE_1__["RxIf"]; });

/* harmony import */ var _if_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./if.module */ "FLgN");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxIfModule", function() { return _if_module__WEBPACK_IMPORTED_MODULE_2__["RxIfModule"]; });






/***/ }),

/***/ "3ObM":
/*!*************************************************************************!*\
  !*** ./libs/cdk/src/lib/render-strategies/strategy-provider.service.ts ***!
  \*************************************************************************/
/*! exports provided: RxStrategyProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RxStrategyProvider", function() { return RxStrategyProvider; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _cdk_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../cdk-config */ "ioAo");
/* harmony import */ var _utils_onStrategy__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/onStrategy */ "PbSv");






/**
 *
 *
 * @docsCategory RenderStrategies
 * @docsPage RenderStrategies
 * @publicApi
 */
class RxStrategyProvider {
    constructor(cfg) {
        this._strategies$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](undefined);
        this._primaryStrategy$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](undefined);
        this.primaryStrategy$ = this._primaryStrategy$.asObservable();
        this.strategies$ = this._strategies$.asObservable();
        this.strategyNames$ = this.strategies$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])((strategies) => Object.values(strategies).map((s) => s.name)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["shareReplay"])({ bufferSize: 1, refCount: true }));
        this._cfg = Object(_cdk_config__WEBPACK_IMPORTED_MODULE_3__["mergeDefaultConfig"])(cfg);
        this._strategies$.next(this._cfg.customStrategies);
        this.primaryStrategy = this.config.primaryStrategy;
    }
    get config() {
        return this._cfg;
    }
    get strategies() {
        return this._strategies$.getValue();
    }
    get strategyNames() {
        return Object.values(this.strategies).map((s) => s.name);
    }
    get primaryStrategy() {
        return this._primaryStrategy$.getValue().name;
    }
    set primaryStrategy(strategyName) {
        this._primaryStrategy$.next(this.strategies[strategyName]);
    }
    scheduleWith(work, options) {
        const strategy = this.strategies[(options === null || options === void 0 ? void 0 : options.strategy) || this.primaryStrategy];
        const scope = (options === null || options === void 0 ? void 0 : options.scope) || {};
        const _work = getWork(work, options === null || options === void 0 ? void 0 : options.patchZone);
        return (o$) => o$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])((v) => Object(_utils_onStrategy__WEBPACK_IMPORTED_MODULE_4__["onStrategy"])(v, strategy, (_v) => {
            _work(_v);
        }, { scope })));
    }
    schedule(work, options) {
        const strategy = this.strategies[(options === null || options === void 0 ? void 0 : options.strategy) || this.primaryStrategy];
        const scope = (options === null || options === void 0 ? void 0 : options.scope) || {};
        const _work = getWork(work, options === null || options === void 0 ? void 0 : options.patchZone);
        let returnVal;
        return Object(_utils_onStrategy__WEBPACK_IMPORTED_MODULE_4__["onStrategy"])(null, strategy, () => {
            returnVal = _work();
        }, { scope }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(() => returnVal));
    }
    scheduleCD(cdRef, options) {
        const strategy = this.strategies[(options === null || options === void 0 ? void 0 : options.strategy) || this.primaryStrategy];
        const scope = (options === null || options === void 0 ? void 0 : options.scope) || cdRef;
        const abC = (options === null || options === void 0 ? void 0 : options.abortCtrl) || new AbortController();
        const work = getWork(() => {
            strategy.work(cdRef, scope);
            if (options === null || options === void 0 ? void 0 : options.afterCD) {
                options.afterCD();
            }
        }, options.patchZone);
        Object(_utils_onStrategy__WEBPACK_IMPORTED_MODULE_4__["onStrategy"])(null, strategy, () => {
            work();
        }, { scope })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["takeUntil"])(Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["fromEvent"])(abC.signal, 'abort')))
            .subscribe();
        return abC;
    }
}
RxStrategyProvider.ɵfac = function RxStrategyProvider_Factory(t) { return new (t || RxStrategyProvider)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_cdk_config__WEBPACK_IMPORTED_MODULE_3__["RX_ANGULAR_CONFIG"], 8)); };
RxStrategyProvider.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: RxStrategyProvider, factory: RxStrategyProvider.ɵfac, providedIn: 'root' });
function getWork(work, patchZone) {
    let _work = work;
    if (patchZone) {
        _work = (args) => patchZone.run(() => work(args));
    }
    return _work;
}


/***/ }),

/***/ "3PYK":
/*!***********************************************************!*\
  !*** ./libs/cdk/src/lib/utils/notification-transforms.ts ***!
  \***********************************************************/
/*! exports provided: toRxErrorNotification, toRxSuspenseNotification, toRxCompleteNotification */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toRxErrorNotification", function() { return toRxErrorNotification; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toRxSuspenseNotification", function() { return toRxSuspenseNotification; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toRxCompleteNotification", function() { return toRxCompleteNotification; });
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../model */ "pJB2");

function toRxErrorNotification(error, value) {
    return {
        kind: _model__WEBPACK_IMPORTED_MODULE_0__["RxNotificationKind"].error,
        hasValue: !!value || false,
        value: value,
        complete: false,
        error: error || true,
    };
}
function toRxSuspenseNotification(value) {
    return {
        kind: _model__WEBPACK_IMPORTED_MODULE_0__["RxNotificationKind"].suspense,
        hasValue: !!value || false,
        value,
        complete: false,
        error: false,
    };
}
function toRxCompleteNotification(value) {
    return {
        kind: _model__WEBPACK_IMPORTED_MODULE_0__["RxNotificationKind"].complete,
        hasValue: !!value || false,
        value,
        complete: true,
        error: false,
    };
}


/***/ }),

/***/ "3Skk":
/*!*********************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/memoization.ts ***!
  \*********************************************************************/
/*! exports provided: memo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "memo", function() { return memo; });
// Source https://github.com/thinkloop/memoizerific/blob/master/src/memoizerific.js
// tslint:ignore-file
function memo(limit) {
    const cache = new Map(), lru = [];
    // returns memoize factory
    return (fn) => {
        const memoize = function () {
            const argsLengthMinusOne = arguments.length - 1, lruPath = Array(argsLengthMinusOne + 1);
            let currentCache = cache, newMap, isMemoized = true, fnResult, i;
            // @ts-ignore
            if ((memoize.numArgs || memoize.numArgs === 0) && memoize.numArgs !== argsLengthMinusOne + 1) {
                throw new Error('Memoize functions should always be called with the same number of arguments');
            }
            // loop through each argument to traverse the map tree
            for (i = 0; i < argsLengthMinusOne; i++) {
                lruPath[i] = {
                    cacheItem: currentCache,
                    arg: arguments[i]
                };
                // climb through the hierarchical map tree until the second-last argument has been found, or an argument is missing.
                // if all arguments up to the second-last have been found, this will potentially be a cache hit (determined later)
                if (currentCache.has(arguments[i])) {
                    currentCache = currentCache.get(arguments[i]);
                    continue;
                }
                isMemoized = false;
                // make maps until last value
                newMap = new Map();
                currentCache.set(arguments[i], newMap);
                currentCache = newMap;
            }
            // we are at the last arg, check if it is really memoized
            if (isMemoized) {
                if (currentCache.has(arguments[argsLengthMinusOne])) {
                    fnResult = currentCache.get(arguments[argsLengthMinusOne]);
                }
                else {
                    isMemoized = false;
                }
            }
            // if the result wasn't memoized, compute it and cache it
            if (!isMemoized) {
                fnResult = fn.apply(null, arguments);
                currentCache.set(arguments[argsLengthMinusOne], fnResult);
            }
            // if there is a cache limit, purge any extra results
            if (limit > 0) {
                lruPath[argsLengthMinusOne] = {
                    cacheItem: currentCache,
                    arg: arguments[argsLengthMinusOne]
                };
                if (isMemoized) {
                    moveToMostRecentLru(lru, lruPath);
                }
                else {
                    lru.push(lruPath);
                }
                if (lru.length > limit) {
                    removeCachedResult(lru.shift());
                }
            }
            memoize.wasMemoized = isMemoized;
            // @ts-ignore
            memoize.numArgs = argsLengthMinusOne + 1;
            return fnResult;
        };
        memoize.limit = limit;
        memoize.wasMemoized = false;
        memoize.cache = cache;
        memoize.lru = lru;
        return memoize;
    };
}
;
// move current args to most recent position
function moveToMostRecentLru(lru, lruPath) {
    const lruLen = lru.length, lruPathLen = lruPath.length;
    let isMatch, i, ii;
    for (i = 0; i < lruLen; i++) {
        isMatch = true;
        for (ii = 0; ii < lruPathLen; ii++) {
            if (!isEqual(lru[i][ii].arg, lruPath[ii].arg)) {
                isMatch = false;
                break;
            }
        }
        if (isMatch) {
            break;
        }
    }
    lru.push(lru.splice(i, 1)[0]);
}
// remove least recently used cache item and all dead branches
function removeCachedResult(removedLru) {
    const removedLruLen = removedLru.length;
    let tmp, currentLru = removedLru[removedLruLen - 1], i;
    currentLru.cacheItem.delete(currentLru.arg);
    // walk down the tree removing dead branches (size 0) along the way
    for (i = removedLruLen - 2; i >= 0; i--) {
        currentLru = removedLru[i];
        tmp = currentLru.cacheItem.get(currentLru.arg);
        if (!tmp || !tmp.size) {
            currentLru.cacheItem.delete(currentLru.arg);
        }
        else {
            break;
        }
    }
}
// check if the numbers are equal, or whether they are both precisely NaN (isNaN returns true for all non-numbers)
function isEqual(val1, val2) {
    return val1 === val2 || (val1 !== val1 && val2 !== val2);
}


/***/ }),

/***/ "3c4s":
/*!*******************************************************!*\
  !*** ./libs/cdk/src/lib/template-management/index.ts ***!
  \*******************************************************/
/*! exports provided: templateHandling, RxBaseTemplateNames, createTemplateManager, createListTemplateManager, RxDefaultListViewContext */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "F2kK");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "templateHandling", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["templateHandling"]; });

/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model */ "sBpO");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxBaseTemplateNames", function() { return _model__WEBPACK_IMPORTED_MODULE_1__["RxBaseTemplateNames"]; });

/* harmony import */ var _template_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./template-manager */ "FYMA");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createTemplateManager", function() { return _template_manager__WEBPACK_IMPORTED_MODULE_2__["createTemplateManager"]; });

/* harmony import */ var _list_template_manager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./list-template-manager */ "NwR/");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createListTemplateManager", function() { return _list_template_manager__WEBPACK_IMPORTED_MODULE_3__["createListTemplateManager"]; });

/* harmony import */ var _list_view_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./list-view-context */ "AzUJ");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxDefaultListViewContext", function() { return _list_view_context__WEBPACK_IMPORTED_MODULE_4__["RxDefaultListViewContext"]; });








/***/ }),

/***/ "3cEb":
/*!*****************************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/zone-agnostic/browser/requestAnimationFrame.ts ***!
  \*****************************************************************************************************/
/*! exports provided: requestAnimationFrame, cancelAnimationFrame */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "requestAnimationFrame", function() { return requestAnimationFrame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cancelAnimationFrame", function() { return cancelAnimationFrame; });
/* harmony import */ var _zone_checks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../zone-checks */ "V4xg");

function requestAnimationFrame(cb) {
    return Object(_zone_checks__WEBPACK_IMPORTED_MODULE_0__["getZoneUnPatchedApi"])('requestAnimationFrame')(cb);
}
function cancelAnimationFrame(id) {
    Object(_zone_checks__WEBPACK_IMPORTED_MODULE_0__["getZoneUnPatchedApi"])('cancelAnimationFrame')(id);
}


/***/ }),

/***/ "3cF1":
/*!************************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/zone-agnostic/rxjs/operators/fromEvent.ts ***!
  \************************************************************************************************/
/*! exports provided: fromEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromEvent", function() { return fromEvent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _zone_checks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../zone-checks */ "V4xg");



const isFunction = fn => typeof fn === 'function';
const isArray = Array.isArray;
const toString = (() => Object.prototype.toString)();
/* tslint:enable:max-line-length */
function fromEvent(target, eventName, options, resultSelector) {
    if (isFunction(options)) {
        // DEPRECATED PATH
        // @ts-ignore
        resultSelector = options;
        options = undefined;
    }
    if (resultSelector) {
        // DEPRECATED PATH
        return fromEvent(target, eventName, options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(args => isArray(args) ? resultSelector(...args) : resultSelector(args)));
    }
    return new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"](subscriber => {
        function handler(e) {
            if (arguments.length > 1) {
                subscriber.next(Array.prototype.slice.call(arguments));
            }
            else {
                subscriber.next(e);
            }
        }
        setupSubscription(target, eventName, handler, subscriber, options);
    });
}
function setupSubscription(sourceObj, eventName, handler, subscriber, options) {
    let unsubscribe;
    if (isEventTarget(sourceObj)) {
        const source = sourceObj;
        Object(_zone_checks__WEBPACK_IMPORTED_MODULE_2__["getZoneUnPatchedApi"])('addEventListener', sourceObj)(eventName, handler, options);
        unsubscribe = () => Object(_zone_checks__WEBPACK_IMPORTED_MODULE_2__["getZoneUnPatchedApi"])('removeEventListener', source)(eventName, handler, options);
    }
    else if (isJQueryStyleEventEmitter(sourceObj)) {
        const source = sourceObj;
        sourceObj.on(eventName, handler);
        unsubscribe = () => source.off(eventName, handler);
    }
    else if (isNodeStyleEventEmitter(sourceObj)) {
        const source = sourceObj;
        sourceObj.addListener(eventName, handler);
        unsubscribe = () => source.removeListener(eventName, handler);
    }
    else if (sourceObj && sourceObj.length) {
        for (let i = 0, len = sourceObj.length; i < len; i++) {
            setupSubscription(sourceObj[i], eventName, handler, subscriber, options);
        }
    }
    else {
        throw new TypeError('Invalid event target');
    }
    subscriber.add(unsubscribe);
}
function isNodeStyleEventEmitter(sourceObj) {
    return sourceObj && typeof sourceObj.addListener === 'function' && typeof sourceObj.removeListener === 'function';
}
function isJQueryStyleEventEmitter(sourceObj) {
    return sourceObj && typeof sourceObj.on === 'function' && typeof sourceObj.off === 'function';
}
function isEventTarget(sourceObj) {
    return sourceObj && typeof sourceObj.addEventListener === 'function' && typeof sourceObj.removeEventListener === 'function';
}


/***/ }),

/***/ "3pK3":
/*!*****************************************************************************!*\
  !*** ./apps/demos/src/app/features/integrations/integrations-shell.menu.ts ***!
  \*****************************************************************************/
/*! exports provided: INTEGRATIONS_MENU_ITEMS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INTEGRATIONS_MENU_ITEMS", function() { return INTEGRATIONS_MENU_ITEMS; });
/* harmony import */ var _dynamic_counter_dynamic_counter_menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dynamic-counter/dynamic-counter.menu */ "Vw33");

const INTEGRATIONS_MENU_ITEMS = [
    {
        label: 'Dynamic Counter',
        link: 'dynamic-counter',
        children: _dynamic_counter_dynamic_counter_menu__WEBPACK_IMPORTED_MODULE_0__["MENU_ITEMS"],
    },
    {
        label: 'Pokemon API w/ Pagination',
        link: 'pokemon-pagination',
    },
];


/***/ }),

/***/ "5BDn":
/*!******************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/state/rx-effects/until-destroy.ts ***!
  \******************************************************************************/
/*! exports provided: untilDestroyed */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "untilDestroyed", function() { return untilDestroyed; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "kU1M");

function untilDestroyed(instance) {
    return (source) => source.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["takeUntil"])(instance.onDestroy$));
}


/***/ }),

/***/ "5UEg":
/*!*******************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/rxjs/observable/tick-idleCallback.ts ***!
  \*******************************************************************************************/
/*! exports provided: idleCallbackTick */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "idleCallbackTick", function() { return idleCallbackTick; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _zone_agnostic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../zone-agnostic */ "j2tN");


const idleCallbackTick = (work) => new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"]((subscriber) => {
    const id = Object(_zone_agnostic__WEBPACK_IMPORTED_MODULE_1__["requestIdleCallback"])(() => {
        work();
        subscriber.next(0);
        subscriber.complete();
    });
    return () => Object(_zone_agnostic__WEBPACK_IMPORTED_MODULE_1__["cancelIdleCallback"])(id);
});


/***/ }),

/***/ "6+wS":
/*!*****************************************************!*\
  !*** ./libs/cdk/src/lib/utils/strategy-handling.ts ***!
  \*****************************************************/
/*! exports provided: strategyHandling */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strategyHandling", function() { return strategyHandling; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _hotFlatten__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hotFlatten */ "oIM3");



/**
 * @internal
 *
 * A factory function returning an object to handle the process of turning strategy names into `RxStrategyCredentials`
 * You can next a strategy name as Observable or string and get an Observable of `RxStrategyCredentials`
 *
 * @param defaultStrategyName
 * @param strategies
 */
function strategyHandling(defaultStrategyName, strategies) {
    const hotFlattened = Object(_hotFlatten__WEBPACK_IMPORTED_MODULE_2__["hotFlatten"])(() => new rxjs__WEBPACK_IMPORTED_MODULE_0__["ReplaySubject"](1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchAll"])());
    return {
        strategy$: hotFlattened.values$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["startWith"])(defaultStrategyName), nameToStrategyCredentials(strategies, defaultStrategyName), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["share"])()),
        next(name) {
            hotFlattened.next(name);
        },
    };
}
/**
 * @internal
 */
function nameToStrategyCredentials(strategies, defaultStrategyName) {
    return (o$) => o$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((name) => name && Object.keys(strategies).includes(name)
        ? strategies[name]
        : strategies[defaultStrategyName]));
}


/***/ }),

/***/ "69rr":
/*!**********************************************************!*\
  !*** ./libs/state/src/lib/cdk/side-effect-observable.ts ***!
  \**********************************************************/
/*! exports provided: createSideEffectObservable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSideEffectObservable", function() { return createSideEffectObservable; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");


function createSideEffectObservable(stateObservables = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]()) {
    const effects$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["merge"])(stateObservables.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["mergeAll"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["observeOn"])(rxjs__WEBPACK_IMPORTED_MODULE_0__["queueScheduler"])));
    function nextEffectObservable(effect$) {
        stateObservables.next(effect$);
    }
    function subscribe() {
        return effects$.subscribe();
    }
    return {
        effects$,
        nextEffectObservable,
        subscribe
    };
}


/***/ }),

/***/ "6W6m":
/*!*************************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/rxjs/operators/distinctUntilSomeChanged.ts ***!
  \*************************************************************************************************/
/*! exports provided: distinctUntilSomeChanged */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distinctUntilSomeChanged", function() { return distinctUntilSomeChanged; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _safe_pluck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../safe-pluck */ "7if5");


/**
 * @internal
 */
function defaultCompare(oldVal, newVal) {
    return oldVal === newVal;
}
/**
 * @description
 *
 * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from
 * the previous item. Comparison will be done for each set key in the `keys` array.
 *
 * You can fine grain your distinct checks by providing a `KeyCompareMap` with those keys you want to compute
 * explicitly different
 *
 * The name `distinctUntilSomeChanged` was picked since it internally iterates over the `keys` and utilizes the
 * [some](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/some) method in order to
 * compute if values are distinct or not.
 *
 * @example
 *
 * import { of } from 'rxjs';
 * import { distinctUntilSomeChanged } from 'rx-angular/state';
 *
 * interface Person {
 *    age: number;
 *    name: string;
 * }
 *
 * of(
 *   { age: 4, name: 'Hans'},
 *   { age: 7, name: 'Sophie'},
 *   { age: 5, name: 'Han Solo'},
 *   { age: 5, name: 'HanSophie'},
 * ).pipe(
 *   distinctUntilSomeChanged(['age', 'name']),
 * )
 * .subscribe(x => console.log(x));
 *
 * // displays:
 * // { age: 4, name: 'Hans'}
 * // { age: 7, name: 'Sophie'}
 * // { age: 5, name: 'Han Solo'}
 * // { age: 5, name: 'HanSophie'}
 *
 * @example
 * // An example with `KeyCompareMap`
 * import { of } from 'rxjs';
 * import { distinctUntilSomeChanged } from 'rxjs/operators';
 *
 * interface Person {
 *     age: number;
 *     name: string;
 *  }
 * const customComparison: KeyCompareMap<Person> = {
 *   name: (oldName, newName) => oldName.substring(0, 2) === newName.substring(0, 2)
 * };
 *
 * of(
 *     { age: 4, name: 'Hans'},
 *     { age: 7, name: 'Sophie'},
 *     { age: 5, name: 'Han Solo'},
 *     { age: 5, name: 'HanSophie'},
 *   ).pipe(
 *     distinctUntilSomeChanged(['age', 'name'], customComparison),
 *   )
 *   .subscribe(x => console.log(x));
 *
 * // displays:
 * // { age: 4, name: 'Hans' }
 * // { age: 7, name: 'Sophie' }
 * // { age: 5, name: 'Han Solo' }
 *
 * @param {K[]} keys String key for object property lookup on each item.
 * @param {KeyCompareMap<T>} [compare] Optional KeyCompareMap to explicitly define comparisons for some of the keys
 * @docsPage distinctUntilSomeChanged
 * @docsCategory operators
 */
function distinctUntilSomeChanged(keys, keyCompareMap) {
    // default compare function applying === to every key
    let distinctCompare = (oldState, newState) => keys.some((key) => !defaultCompare(Object(_safe_pluck__WEBPACK_IMPORTED_MODULE_1__["safePluck"])(oldState, [key]), Object(_safe_pluck__WEBPACK_IMPORTED_MODULE_1__["safePluck"])(newState, [key])));
    // generate compare function respecting every case of provided keyCompareMap
    if (keyCompareMap !== undefined) {
        const compare = (key) => {
            return keyCompareMap.hasOwnProperty(key) &&
                keyCompareMap[key] !== undefined
                ? keyCompareMap[key]
                : defaultCompare;
        };
        distinctCompare = (oldState, newState) => {
            return keys.some((key) => !compare(key)(Object(_safe_pluck__WEBPACK_IMPORTED_MODULE_1__["safePluck"])(oldState, [key]), Object(_safe_pluck__WEBPACK_IMPORTED_MODULE_1__["safePluck"])(newState, [key])));
        };
    }
    return Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["distinctUntilChanged"])((oldV, newV) => !distinctCompare(oldV, newV));
}


/***/ }),

/***/ "6bkt":
/*!*********************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/rxjs/operators/stateful.ts ***!
  \*********************************************************************************/
/*! exports provided: stateful */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stateful", function() { return stateful; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _pipe_from_array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../pipe-from-array */ "G3w/");
/* harmony import */ var _guards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../guards */ "lW3W");



/**
 * @description
 *
 * As it acts like the Observables `pipe` method, it accepts one or many RxJS operators as params.
 *
 * @example
 * import { Observable } from 'rxjs';
 * import { map } from 'rxjs/operators';
 * import { stateful } from 'rx-angular/state';
 *
 * const state$: Observable<{ name: string; items: string[] }>;
 * const derivation$ = state$.pipe(
 *   stateful(
 *     map(state => state.list.length),
 *     filter(length => length > 3)
 *   )
 * );
 *
 * @param {OperatorFunction<T, A>} op - one or multiple passed operator comma separated
 *
 * @docsPage stateful
 * @docsCategory operators
 */
function stateful(...optionalDerive) {
    return (s) => {
        return s.pipe(
        // distinct same base-state objects (e.g. a default emission of default switch cases, incorrect mutable handling
        // of data) @TODO evaluate benefits vs. overhead
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["distinctUntilChanged"])(), 
        // CUSTOM LOGIC HERE
        (o) => {
            if (Object(_guards__WEBPACK_IMPORTED_MODULE_2__["isOperateFnArrayGuard"])(optionalDerive)) {
                return o.pipe(Object(_pipe_from_array__WEBPACK_IMPORTED_MODULE_1__["pipeFromArray"])(optionalDerive));
            }
            return o;
        }, 
        // initial emissions, undefined is no base-state, pollution with skip(1)
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["filter"])((v) => v !== undefined), 
        // distinct same derivation value
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["distinctUntilChanged"])(), 
        // reuse custom operations result for multiple subscribers and reemit the last calculated value.
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["shareReplay"])({ bufferSize: 1, refCount: true }));
    };
}


/***/ }),

/***/ "6epE":
/*!************************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/components/context/rx-context.component.ts ***!
  \************************************************************************************************/
/*! exports provided: RxContextContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RxContextContainer", function() { return RxContextContainer; });
/* harmony import */ var _rx_angular_cdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rx-angular/cdk */ "cDIL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _cdk__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../cdk */ "a7DI");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _rx_angular_state__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @rx-angular/state */ "YYsp");
/* harmony import */ var _cdk_utils_rxjs_operators_observable_to_rx_template_name__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../cdk/utils/rxjs/operators/observable-to-rx-template-name */ "zpa+");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _directives_switch_rx_switch_directive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../directives/switch/rx-switch.directive */ "QfxS");
/* harmony import */ var _directives_switch_rx_switch_case_directive__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../directives/switch/rx-switch-case.directive */ "uq4C");











const _c0 = ["rxContextContainer", ""];
function RxContextContainer_ng_content_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵprojection"](0, 2, ["*rxSwitchCase", "rxSuspenseTpl"]);
} }
function RxContextContainer_ng_content_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵprojection"](0, 3, ["*rxSwitchCase", "rxErrorTpl"]);
} }
function RxContextContainer_ng_content_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵprojection"](0, 4, ["*rxSwitchCase", "rxCompleteTpl"]);
} }
const _c1 = ["*", [["", "rxAfterContext", ""]], [["", "rxSuspense", ""]], [["", "rxError", ""]], [["", "rxComplete", ""]]];
const _c2 = ["*", "[rxAfterContext]", "[rxSuspense]", "[rxError]", "[rxComplete]"];
// tslint:disable-next-line:directive-class-suffix
class RxContextContainer extends _cdk__WEBPACK_IMPORTED_MODULE_2__["Hooks"] {
    constructor(strategyProvider, rxState) {
        super();
        this.strategyProvider = strategyProvider;
        this.rxState = rxState;
        this.templateName$ = this.rxState.select('templateName');
        this.strategyName$ = this.rxState.select('strategyName');
        this.rxSuspenseTpl = _cdk__WEBPACK_IMPORTED_MODULE_2__["RxNotificationKind"].suspense;
        this.rxErrorTpl = _cdk__WEBPACK_IMPORTED_MODULE_2__["RxNotificationKind"].error;
        this.rxCompleteTpl = _cdk__WEBPACK_IMPORTED_MODULE_2__["RxNotificationKind"].complete;
    }
    set rxContextContainer(potentialObservable) {
        this.rxState.connect('templateName', potentialObservable.pipe(Object(_cdk_utils_rxjs_operators_observable_to_rx_template_name__WEBPACK_IMPORTED_MODULE_5__["observableToRxTemplateName"])()));
    }
    set strategy(strategyName$) {
        this.rxState.connect('strategyName', Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["isObservable"])(strategyName$) ? strategyName$ : Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(strategyName$));
    }
    set rxCompleteTrigger(complete$) {
        this.rxState.connect('templateName', complete$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["mapTo"])(_cdk__WEBPACK_IMPORTED_MODULE_2__["RxNotificationKind"].complete)));
    }
    set rxErrorTrigger(error$) {
        this.rxState.connect('templateName', error$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["mapTo"])(_cdk__WEBPACK_IMPORTED_MODULE_2__["RxNotificationKind"].error)));
    }
    set rxSuspenseTrigger(suspense$) {
        this.rxState.connect('templateName', suspense$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["mapTo"])(_cdk__WEBPACK_IMPORTED_MODULE_2__["RxNotificationKind"].suspense)));
    }
    ngOnInit() {
        if (!this.rxState.get('templateName')) {
            this.rxState.set({ templateName: _cdk__WEBPACK_IMPORTED_MODULE_2__["RxNotificationKind"].suspense });
        }
    }
}
RxContextContainer.ɵfac = function RxContextContainer_Factory(t) { return new (t || RxContextContainer)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_0__["RxStrategyProvider"]), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_rx_angular_state__WEBPACK_IMPORTED_MODULE_4__["RxState"])); };
RxContextContainer.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({ type: RxContextContainer, selectors: [["", "rxContextContainer", ""]], inputs: { rxContextContainer: "rxContextContainer", strategy: ["rxContextStrategy", "strategy"], rxCompleteTrigger: ["completeTrg", "rxCompleteTrigger"], rxErrorTrigger: ["errorTrg", "rxErrorTrigger"], rxSuspenseTrigger: ["suspenseTrg", "rxSuspenseTrigger"] }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵProvidersFeature"]([_rx_angular_state__WEBPACK_IMPORTED_MODULE_4__["RxState"]]), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵInheritDefinitionFeature"]], attrs: _c0, ngContentSelectors: _c2, decls: 6, vars: 4, consts: [[3, "rxSwitch"], [4, "rxSwitchCase"]], template: function RxContextContainer_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵprojectionDef"](_c1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵprojection"](0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](1, 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, RxContextContainer_ng_content_2_Template, 1, 0, "ng-content", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](3, RxContextContainer_ng_content_3_Template, 1, 0, "ng-content", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](4, RxContextContainer_ng_content_4_Template, 1, 0, "ng-content", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵprojection"](5, 1);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("rxSwitch", ctx.templateName$);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("rxSwitchCase", ctx.rxSuspenseTpl);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("rxSwitchCase", ctx.rxErrorTpl);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("rxSwitchCase", ctx.rxCompleteTpl);
    } }, directives: [_directives_switch_rx_switch_directive__WEBPACK_IMPORTED_MODULE_7__["RxSwitch"], _directives_switch_rx_switch_case_directive__WEBPACK_IMPORTED_MODULE_8__["RxSwitchCase"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "6yIp":
/*!*************************************!*\
  !*** ./libs/state/src/lib/index.ts ***!
  \*************************************/
/*! exports provided: createSideEffectObservable, createAccumulationObservable, RxState, select, stateful, distinctUntilSomeChanged, selectSlice, insert, remove, toDictionary, update, setProp, patch, deleteProp, dictionaryToArray, toggle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cdk */ "V1a+");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createSideEffectObservable", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["createSideEffectObservable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createAccumulationObservable", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["createAccumulationObservable"]; });

/* harmony import */ var _rx_state_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rx-state.service */ "NzIU");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxState", function() { return _rx_state_service__WEBPACK_IMPORTED_MODULE_1__["RxState"]; });

/* harmony import */ var _rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rxjs/operators */ "XLH7");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "select", function() { return _rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["select"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stateful", function() { return _rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["stateful"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "distinctUntilSomeChanged", function() { return _rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["distinctUntilSomeChanged"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "selectSlice", function() { return _rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["selectSlice"]; });

/* harmony import */ var _transformation_helpers_array_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./transformation-helpers/array/index */ "PsZF");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "insert", function() { return _transformation_helpers_array_index__WEBPACK_IMPORTED_MODULE_3__["insert"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "remove", function() { return _transformation_helpers_array_index__WEBPACK_IMPORTED_MODULE_3__["remove"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toDictionary", function() { return _transformation_helpers_array_index__WEBPACK_IMPORTED_MODULE_3__["toDictionary"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "update", function() { return _transformation_helpers_array_index__WEBPACK_IMPORTED_MODULE_3__["update"]; });

/* harmony import */ var _transformation_helpers_object_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./transformation-helpers/object/index */ "uOTR");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setProp", function() { return _transformation_helpers_object_index__WEBPACK_IMPORTED_MODULE_4__["setProp"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "patch", function() { return _transformation_helpers_object_index__WEBPACK_IMPORTED_MODULE_4__["patch"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deleteProp", function() { return _transformation_helpers_object_index__WEBPACK_IMPORTED_MODULE_4__["deleteProp"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dictionaryToArray", function() { return _transformation_helpers_object_index__WEBPACK_IMPORTED_MODULE_4__["dictionaryToArray"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toggle", function() { return _transformation_helpers_object_index__WEBPACK_IMPORTED_MODULE_4__["toggle"]; });








/***/ }),

/***/ "7Tv2":
/*!*****************************************************!*\
  !*** ./libs/cdk/src/lib/render-strategies/index.ts ***!
  \*****************************************************/
/*! exports provided: RxStrategyProvider, RX_CONCURRENT_STRATEGIES, RX_NATIVE_STRATEGIES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _strategy_provider_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./strategy-provider.service */ "3ObM");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxStrategyProvider", function() { return _strategy_provider_service__WEBPACK_IMPORTED_MODULE_0__["RxStrategyProvider"]; });

/* harmony import */ var _concurrent_strategies__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./concurrent-strategies */ "K5y6");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RX_CONCURRENT_STRATEGIES", function() { return _concurrent_strategies__WEBPACK_IMPORTED_MODULE_1__["RX_CONCURRENT_STRATEGIES"]; });

/* harmony import */ var _native_strategies__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./native-strategies */ "NsWS");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RX_NATIVE_STRATEGIES", function() { return _native_strategies__WEBPACK_IMPORTED_MODULE_2__["RX_NATIVE_STRATEGIES"]; });






/***/ }),

/***/ "7if5":
/*!********************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/safe-pluck.ts ***!
  \********************************************************************/
/*! exports provided: safePluck */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "safePluck", function() { return safePluck; });
/* harmony import */ var _guards__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./guards */ "lW3W");

function safePluck(stateObject, keys) {
    // needed to match null and undefined conventions of RxAngular core components
    // safePluck(null) -> return null
    // safePluck(undefined) -> return undefined
    // safePluck(obj, ['wrongKey']) -> return undefined
    // safePluck(obj, ['correctKey']) -> return value of key
    // safePluck(obj, '') -> return undefined
    // safePluck(obj, null) -> return undefined
    if (!Object(_guards__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(stateObject)) {
        return stateObject;
    }
    if (!Object(_guards__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(keys)) {
        return undefined;
    }
    // sanitize keys -> keep only valid keys (string, number, symbol)
    const keysArr = (Array.isArray(keys) ? keys : [keys]).filter(k => Object(_guards__WEBPACK_IMPORTED_MODULE_0__["isKeyOf"])(k));
    if (keysArr.length === 0 ||
        !Object(_guards__WEBPACK_IMPORTED_MODULE_0__["isObjectGuard"])(stateObject) ||
        Object.keys(stateObject).length === 0) {
        return undefined;
    }
    let prop = stateObject[keysArr.shift()];
    keysArr.forEach(key => {
        if (Object(_guards__WEBPACK_IMPORTED_MODULE_0__["isObjectGuard"])(prop) && Object(_guards__WEBPACK_IMPORTED_MODULE_0__["isKeyOf"])(key)) {
            prop = prop[key];
        }
    });
    return prop;
}


/***/ }),

/***/ "7qDQ":
/*!*******************************************************!*\
  !*** ./apps/demos/src/app/shared/viewport.service.ts ***!
  \*******************************************************/
/*! exports provided: Viewport, ViewportService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Viewport", function() { return Viewport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewportService", function() { return ViewportService; });
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/cdk/layout */ "0MNC");
/* harmony import */ var _rx_angular_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @rx-angular/state */ "YYsp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");





var Viewport;
(function (Viewport) {
    Viewport["mobile"] = "mobile";
    Viewport["tablet"] = "tablet";
    Viewport["desktop"] = "desktop";
})(Viewport || (Viewport = {}));
class ViewportService {
    constructor(breakpointObserver) {
        this.breakpointObserver = breakpointObserver;
        this.state = new _rx_angular_state__WEBPACK_IMPORTED_MODULE_1__["RxState"]();
        this.viewport$ = this.state.select('viewport');
        this.isMobile$ = this.state.select('isMobile');
        this.isTablet$ = this.state.select('isTablet');
        this.isDesktop$ = this.state.select('isDesktop');
        this.isHandset$ = this.state.select('isHandset');
        const viewport$ = this.breakpointObserver
            .observe([
            _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_0__["Breakpoints"].XSmall,
            _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_0__["Breakpoints"].Small,
            _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_0__["Breakpoints"].Medium,
            _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_0__["Breakpoints"].Large,
            _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_0__["Breakpoints"].XLarge,
        ])
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])((result) => {
            if (result.breakpoints[_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_0__["Breakpoints"].XSmall]) {
                return Viewport.mobile;
            }
            if (result.breakpoints[_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_0__["Breakpoints"].Small]) {
                return Viewport.tablet;
            }
            return Viewport.desktop;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["distinctUntilChanged"])());
        this.state.connect(viewport$, (oldState, viewportChange) => ({
            viewport: viewportChange,
            isHandset: viewportChange === 'mobile' || viewportChange === 'tablet',
            isMobile: viewportChange === 'mobile',
            isTablet: viewportChange === 'tablet',
            isDesktop: viewportChange === 'desktop',
        }));
    }
    ngOnDestroy() {
        this.state.ngOnDestroy();
    }
}
ViewportService.ɵfac = function ViewportService_Factory(t) { return new (t || ViewportService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_0__["BreakpointObserver"])); };
ViewportService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: ViewportService, factory: ViewportService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "7zi/":
/*!*************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/zone-agnostic/browser/index.ts ***!
  \*************************************************************************************/
/*! exports provided: setTimeout, clearTimeout, setInterval, clearInterval, requestAnimationFrame, cancelAnimationFrame, cancelIdleCallback, requestIdleCallback, Promise, queueMicrotask */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _setTimeout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setTimeout */ "zhOe");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setTimeout", function() { return _setTimeout__WEBPACK_IMPORTED_MODULE_0__["setTimeout"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "clearTimeout", function() { return _setTimeout__WEBPACK_IMPORTED_MODULE_0__["clearTimeout"]; });

/* harmony import */ var _setInterval__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setInterval */ "lqGI");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setInterval", function() { return _setInterval__WEBPACK_IMPORTED_MODULE_1__["setInterval"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "clearInterval", function() { return _setInterval__WEBPACK_IMPORTED_MODULE_1__["clearInterval"]; });

/* harmony import */ var _requestAnimationFrame__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./requestAnimationFrame */ "3cEb");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "requestAnimationFrame", function() { return _requestAnimationFrame__WEBPACK_IMPORTED_MODULE_2__["requestAnimationFrame"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cancelAnimationFrame", function() { return _requestAnimationFrame__WEBPACK_IMPORTED_MODULE_2__["cancelAnimationFrame"]; });

/* harmony import */ var _requestIdleCallback__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./requestIdleCallback */ "+FjM");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cancelIdleCallback", function() { return _requestIdleCallback__WEBPACK_IMPORTED_MODULE_3__["cancelIdleCallback"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "requestIdleCallback", function() { return _requestIdleCallback__WEBPACK_IMPORTED_MODULE_3__["requestIdleCallback"]; });

/* harmony import */ var _Promise__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Promise */ "Vgdy");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Promise", function() { return _Promise__WEBPACK_IMPORTED_MODULE_4__["Promise"]; });

/* harmony import */ var _queueMicrotask__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./queueMicrotask */ "Eg4a");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "queueMicrotask", function() { return _queueMicrotask__WEBPACK_IMPORTED_MODULE_5__["queueMicrotask"]; });









/***/ }),

/***/ "8QCL":
/*!***************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/index.ts ***!
  \***************************************************************/
/*! exports provided: stateful, select, distinctUntilSomeChanged, selectSlice, ngInputFlatten, rxMaterialize, coalesceWith, observableToRxTemplateName, createAccumulationObservable, createSideEffectObservable, intersectionObserver, animationFrameTick, idleCallbackTick, timeoutTick, intervalTick, promiseTick, isSubscription, RxNotificationKind, notificationToRxNotification, toRxErrorNotification, toRxSuspenseNotification, toRxCompleteNotification, notificationKindToRxNotificationKind, setTimeout, clearTimeout, setInterval, clearInterval, requestAnimationFrame, cancelAnimationFrame, cancelIdleCallback, requestIdleCallback, Promise, queueMicrotask, interval, fromEvent, asyncScheduler, asapScheduler, queueScheduler, animationFrameScheduler, getZoneUnPatchedApi, isEnvZonePatched, isApiZonePatched, isNgZone, isNoopNgZone, getResolvedPromise, coalescingManager, getGlobalThis, memo, createPropertiesWeakMap, safePluck, HOST, TVIEW, FLAGS, PARENT, NEXT, TRANSPLANTED_VIEWS_TO_REFRESH, T_HOST, CLEANUP, L_CONTAINER_NATIVE, CONTEXT, INJECTOR, RENDERER_FACTORY, RENDERER, SANITIZER, CHILD_HEAD, CHILD_TAIL, DECLARATION_VIEW, DECLARATION_COMPONENT_VIEW, DECLARATION_LCONTAINER, PREORDER_HOOK_FLAGS, QUERIES, HEADER_OFFSET */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rxjs */ "iUIh");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stateful", function() { return _rxjs__WEBPACK_IMPORTED_MODULE_0__["stateful"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "select", function() { return _rxjs__WEBPACK_IMPORTED_MODULE_0__["select"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "distinctUntilSomeChanged", function() { return _rxjs__WEBPACK_IMPORTED_MODULE_0__["distinctUntilSomeChanged"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "selectSlice", function() { return _rxjs__WEBPACK_IMPORTED_MODULE_0__["selectSlice"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ngInputFlatten", function() { return _rxjs__WEBPACK_IMPORTED_MODULE_0__["ngInputFlatten"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rxMaterialize", function() { return _rxjs__WEBPACK_IMPORTED_MODULE_0__["rxMaterialize"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "coalesceWith", function() { return _rxjs__WEBPACK_IMPORTED_MODULE_0__["coalesceWith"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "observableToRxTemplateName", function() { return _rxjs__WEBPACK_IMPORTED_MODULE_0__["observableToRxTemplateName"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createAccumulationObservable", function() { return _rxjs__WEBPACK_IMPORTED_MODULE_0__["createAccumulationObservable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createSideEffectObservable", function() { return _rxjs__WEBPACK_IMPORTED_MODULE_0__["createSideEffectObservable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "intersectionObserver", function() { return _rxjs__WEBPACK_IMPORTED_MODULE_0__["intersectionObserver"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "animationFrameTick", function() { return _rxjs__WEBPACK_IMPORTED_MODULE_0__["animationFrameTick"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "idleCallbackTick", function() { return _rxjs__WEBPACK_IMPORTED_MODULE_0__["idleCallbackTick"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeoutTick", function() { return _rxjs__WEBPACK_IMPORTED_MODULE_0__["timeoutTick"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "intervalTick", function() { return _rxjs__WEBPACK_IMPORTED_MODULE_0__["intervalTick"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "promiseTick", function() { return _rxjs__WEBPACK_IMPORTED_MODULE_0__["promiseTick"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isSubscription", function() { return _rxjs__WEBPACK_IMPORTED_MODULE_0__["isSubscription"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxNotificationKind", function() { return _rxjs__WEBPACK_IMPORTED_MODULE_0__["RxNotificationKind"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "notificationToRxNotification", function() { return _rxjs__WEBPACK_IMPORTED_MODULE_0__["notificationToRxNotification"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toRxErrorNotification", function() { return _rxjs__WEBPACK_IMPORTED_MODULE_0__["toRxErrorNotification"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toRxSuspenseNotification", function() { return _rxjs__WEBPACK_IMPORTED_MODULE_0__["toRxSuspenseNotification"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toRxCompleteNotification", function() { return _rxjs__WEBPACK_IMPORTED_MODULE_0__["toRxCompleteNotification"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "notificationKindToRxNotificationKind", function() { return _rxjs__WEBPACK_IMPORTED_MODULE_0__["notificationKindToRxNotificationKind"]; });

/* harmony import */ var _zone_agnostic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./zone-agnostic */ "j2tN");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setTimeout", function() { return _zone_agnostic__WEBPACK_IMPORTED_MODULE_1__["setTimeout"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "clearTimeout", function() { return _zone_agnostic__WEBPACK_IMPORTED_MODULE_1__["clearTimeout"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setInterval", function() { return _zone_agnostic__WEBPACK_IMPORTED_MODULE_1__["setInterval"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "clearInterval", function() { return _zone_agnostic__WEBPACK_IMPORTED_MODULE_1__["clearInterval"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "requestAnimationFrame", function() { return _zone_agnostic__WEBPACK_IMPORTED_MODULE_1__["requestAnimationFrame"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cancelAnimationFrame", function() { return _zone_agnostic__WEBPACK_IMPORTED_MODULE_1__["cancelAnimationFrame"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cancelIdleCallback", function() { return _zone_agnostic__WEBPACK_IMPORTED_MODULE_1__["cancelIdleCallback"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "requestIdleCallback", function() { return _zone_agnostic__WEBPACK_IMPORTED_MODULE_1__["requestIdleCallback"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Promise", function() { return _zone_agnostic__WEBPACK_IMPORTED_MODULE_1__["Promise"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "queueMicrotask", function() { return _zone_agnostic__WEBPACK_IMPORTED_MODULE_1__["queueMicrotask"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interval", function() { return _zone_agnostic__WEBPACK_IMPORTED_MODULE_1__["interval"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fromEvent", function() { return _zone_agnostic__WEBPACK_IMPORTED_MODULE_1__["fromEvent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asyncScheduler", function() { return _zone_agnostic__WEBPACK_IMPORTED_MODULE_1__["asyncScheduler"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asapScheduler", function() { return _zone_agnostic__WEBPACK_IMPORTED_MODULE_1__["asapScheduler"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "queueScheduler", function() { return _zone_agnostic__WEBPACK_IMPORTED_MODULE_1__["queueScheduler"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "animationFrameScheduler", function() { return _zone_agnostic__WEBPACK_IMPORTED_MODULE_1__["animationFrameScheduler"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getZoneUnPatchedApi", function() { return _zone_agnostic__WEBPACK_IMPORTED_MODULE_1__["getZoneUnPatchedApi"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isEnvZonePatched", function() { return _zone_agnostic__WEBPACK_IMPORTED_MODULE_1__["isEnvZonePatched"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isApiZonePatched", function() { return _zone_agnostic__WEBPACK_IMPORTED_MODULE_1__["isApiZonePatched"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isNgZone", function() { return _zone_agnostic__WEBPACK_IMPORTED_MODULE_1__["isNgZone"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isNoopNgZone", function() { return _zone_agnostic__WEBPACK_IMPORTED_MODULE_1__["isNoopNgZone"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getResolvedPromise", function() { return _zone_agnostic__WEBPACK_IMPORTED_MODULE_1__["getResolvedPromise"]; });

/* harmony import */ var _coalescing_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./coalescing-manager */ "u+Ph");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "coalescingManager", function() { return _coalescing_manager__WEBPACK_IMPORTED_MODULE_2__["coalescingManager"]; });

/* harmony import */ var _get_global_this__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./get-global-this */ "X8pR");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getGlobalThis", function() { return _get_global_this__WEBPACK_IMPORTED_MODULE_3__["getGlobalThis"]; });

/* harmony import */ var _memoization__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./memoization */ "3Skk");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "memo", function() { return _memoization__WEBPACK_IMPORTED_MODULE_4__["memo"]; });

/* harmony import */ var _properties_weakmap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./properties-weakmap */ "aljK");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createPropertiesWeakMap", function() { return _properties_weakmap__WEBPACK_IMPORTED_MODULE_5__["createPropertiesWeakMap"]; });

/* harmony import */ var _safe_pluck__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./safe-pluck */ "7if5");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "safePluck", function() { return _safe_pluck__WEBPACK_IMPORTED_MODULE_6__["safePluck"]; });

/* harmony import */ var _view_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./view-constants */ "uV5/");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HOST", function() { return _view_constants__WEBPACK_IMPORTED_MODULE_7__["HOST"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TVIEW", function() { return _view_constants__WEBPACK_IMPORTED_MODULE_7__["TVIEW"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FLAGS", function() { return _view_constants__WEBPACK_IMPORTED_MODULE_7__["FLAGS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PARENT", function() { return _view_constants__WEBPACK_IMPORTED_MODULE_7__["PARENT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NEXT", function() { return _view_constants__WEBPACK_IMPORTED_MODULE_7__["NEXT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TRANSPLANTED_VIEWS_TO_REFRESH", function() { return _view_constants__WEBPACK_IMPORTED_MODULE_7__["TRANSPLANTED_VIEWS_TO_REFRESH"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "T_HOST", function() { return _view_constants__WEBPACK_IMPORTED_MODULE_7__["T_HOST"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CLEANUP", function() { return _view_constants__WEBPACK_IMPORTED_MODULE_7__["CLEANUP"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "L_CONTAINER_NATIVE", function() { return _view_constants__WEBPACK_IMPORTED_MODULE_7__["L_CONTAINER_NATIVE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CONTEXT", function() { return _view_constants__WEBPACK_IMPORTED_MODULE_7__["CONTEXT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "INJECTOR", function() { return _view_constants__WEBPACK_IMPORTED_MODULE_7__["INJECTOR"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RENDERER_FACTORY", function() { return _view_constants__WEBPACK_IMPORTED_MODULE_7__["RENDERER_FACTORY"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RENDERER", function() { return _view_constants__WEBPACK_IMPORTED_MODULE_7__["RENDERER"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SANITIZER", function() { return _view_constants__WEBPACK_IMPORTED_MODULE_7__["SANITIZER"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CHILD_HEAD", function() { return _view_constants__WEBPACK_IMPORTED_MODULE_7__["CHILD_HEAD"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CHILD_TAIL", function() { return _view_constants__WEBPACK_IMPORTED_MODULE_7__["CHILD_TAIL"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DECLARATION_VIEW", function() { return _view_constants__WEBPACK_IMPORTED_MODULE_7__["DECLARATION_VIEW"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DECLARATION_COMPONENT_VIEW", function() { return _view_constants__WEBPACK_IMPORTED_MODULE_7__["DECLARATION_COMPONENT_VIEW"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DECLARATION_LCONTAINER", function() { return _view_constants__WEBPACK_IMPORTED_MODULE_7__["DECLARATION_LCONTAINER"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PREORDER_HOOK_FLAGS", function() { return _view_constants__WEBPACK_IMPORTED_MODULE_7__["PREORDER_HOOK_FLAGS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QUERIES", function() { return _view_constants__WEBPACK_IMPORTED_MODULE_7__["QUERIES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HEADER_OFFSET", function() { return _view_constants__WEBPACK_IMPORTED_MODULE_7__["HEADER_OFFSET"]; });











/***/ }),

/***/ "8gNB":
/*!***************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/hooks/utils.ts ***!
  \***************************************************************/
/*! exports provided: toHook */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toHook", function() { return toHook; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "kU1M");

function toHook(name) {
    return (o$) => o$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["pluck"])(name), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["filter"])((init) => !!init), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["shareReplay"])());
}


/***/ }),

/***/ "9EiU":
/*!*****************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/pipes/pipe/pipe.pipe.ts ***!
  \*****************************************************************************/
/*! exports provided: PipePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PipePipe", function() { return PipePipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class PipePipe {
    transform(potentialObservable, operatorFn) {
        return potentialObservable.pipe(operatorFn);
    }
}
PipePipe.ɵfac = function PipePipe_Factory(t) { return new (t || PipePipe)(); };
PipePipe.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "pipe", type: PipePipe, pure: true });


/***/ }),

/***/ "9SxW":
/*!***************************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/zone-agnostic/rxjs/schedulers/async/async.ts ***!
  \***************************************************************************************************/
/*! exports provided: asyncScheduler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "asyncScheduler", function() { return asyncScheduler; });
/* harmony import */ var _AsyncAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AsyncAction */ "FXx3");
/* harmony import */ var _AsyncScheduler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AsyncScheduler */ "It4N");
// tslint:disable file-name-casing


/**
 *
 * NOTE: This is a zone un-patched version of rxjs asyncScheduler
 *
 * Async Scheduler
 *
 * <span class="informal">Schedule task as if you used setTimeout(task, duration)</span>
 *
 * `async` scheduler schedules tasks asynchronously, by putting them on the JavaScript
 * event loop queue. It is best used to delay tasks in time or to schedule tasks repeating
 * in intervals.
 *
 * If you just want to "defer" task, that is to perform it right after currently
 * executing synchronous code ends (commonly achieved by `setTimeout(deferredTask, 0)`),
 * better choice will be the {@link asapScheduler} scheduler.
 *
 * ## Examples
 * Use async scheduler to delay task
 * ```ts
 * import { asyncScheduler } from '@cu/perf-utils';
 *
 * const task = () => console.log('it works!');
 *
 * asyncScheduler.schedule(task, 2000);
 *
 * // After 2 seconds logs:
 * // "it works!"
 * ```
 *
 * Use async scheduler to repeat task in intervals
 * ```ts
 * import { asyncScheduler } from '@cu/perf-utils';
 *
 * function task(state) {
 *   console.log(state);
 *   this.schedule(state + 1, 1000); // `this` references currently executing Action,
 *                                   // which we reschedule with new state and delay
 * }
 *
 * asyncScheduler.schedule(task, 3000, 0);
 *
 * // Logs:
 * // 0 after 3s
 * // 1 after 4s
 * // 2 after 5s
 * // 3 after 6s
 * ```
 */
const asyncScheduler = new _AsyncScheduler__WEBPACK_IMPORTED_MODULE_1__["AsyncScheduler"](_AsyncAction__WEBPACK_IMPORTED_MODULE_0__["AsyncAction"]);


/***/ }),

/***/ "9bN3":
/*!**********************************************************************************!*\
  !*** ./libs/template/src/lib/experimental/viewport-prio/viewport-prio.module.ts ***!
  \**********************************************************************************/
/*! exports provided: ViewportPrioModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewportPrioModule", function() { return ViewportPrioModule; });
/* harmony import */ var _viewport_prio_experimental_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./viewport-prio.experimental.directive */ "GiYN");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


const DECLARATIONS = [_viewport_prio_experimental_directive__WEBPACK_IMPORTED_MODULE_0__["ViewportPrioDirective"]];
class ViewportPrioModule {
}
ViewportPrioModule.ɵfac = function ViewportPrioModule_Factory(t) { return new (t || ViewportPrioModule)(); };
ViewportPrioModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: ViewportPrioModule });
ViewportPrioModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({});
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](ViewportPrioModule, { declarations: [_viewport_prio_experimental_directive__WEBPACK_IMPORTED_MODULE_0__["ViewportPrioDirective"]], exports: [_viewport_prio_experimental_directive__WEBPACK_IMPORTED_MODULE_0__["ViewportPrioDirective"]] }); })();


/***/ }),

/***/ "9oZ2":
/*!******************************************************************************************!*\
  !*** ./apps/demos/src/app/shared/debug-helper/strategy-select/strategy-select.module.ts ***!
  \******************************************************************************************/
/*! exports provided: StrategySelectModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StrategySelectModule", function() { return StrategySelectModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/select */ "d3UM");
/* harmony import */ var _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @rx-angular/template */ "WFkj");
/* harmony import */ var _rx_angular_pocs_template_directives_for_rx_for_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../rx-angular-pocs/template/directives/for/rx-for.module */ "v1iz");
/* harmony import */ var _strategy_select_strategy_select_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./strategy-select/strategy-select.component */ "zFhl");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");







class StrategySelectModule {
}
StrategySelectModule.ɵfac = function StrategySelectModule_Factory(t) { return new (t || StrategySelectModule)(); };
StrategySelectModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({ type: StrategySelectModule });
StrategySelectModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__["UnpatchEventsModule"],
            _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__["PushModule"],
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_1__["MatIconModule"],
            _angular_material_select__WEBPACK_IMPORTED_MODULE_2__["MatSelectModule"],
            _rx_angular_pocs_template_directives_for_rx_for_module__WEBPACK_IMPORTED_MODULE_4__["RxForModule"],
            _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__["LetModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](StrategySelectModule, { declarations: [_strategy_select_strategy_select_component__WEBPACK_IMPORTED_MODULE_5__["StrategySelectComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__["UnpatchEventsModule"],
        _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__["PushModule"],
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_1__["MatIconModule"],
        _angular_material_select__WEBPACK_IMPORTED_MODULE_2__["MatSelectModule"],
        _rx_angular_pocs_template_directives_for_rx_for_module__WEBPACK_IMPORTED_MODULE_4__["RxForModule"],
        _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__["LetModule"]], exports: [_strategy_select_strategy_select_component__WEBPACK_IMPORTED_MODULE_5__["StrategySelectComponent"]] }); })();


/***/ }),

/***/ "9sXm":
/*!***************************************************!*\
  !*** ./libs/template/src/lib/push/push.module.ts ***!
  \***************************************************/
/*! exports provided: PushModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PushModule", function() { return PushModule; });
/* harmony import */ var _push_pipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./push.pipe */ "duzR");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


const DECLARATIONS = [_push_pipe__WEBPACK_IMPORTED_MODULE_0__["PushPipe"]];
/**
 * @description
 * This module exports the PushPipe
 *
 * @example
 *
 * ```typescript
 * @NgModule({
 *  imports: [PushModule],
 *  //...
 * })
 * export class AppModule {}
 * ```
 *
 */
class PushModule {
}
PushModule.ɵfac = function PushModule_Factory(t) { return new (t || PushModule)(); };
PushModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: PushModule });
PushModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](PushModule, { declarations: [_push_pipe__WEBPACK_IMPORTED_MODULE_0__["PushPipe"]], exports: [_push_pipe__WEBPACK_IMPORTED_MODULE_0__["PushPipe"]] }); })();


/***/ }),

/***/ "9uYj":
/*!***********************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/directives/let/model/index.ts ***!
  \***********************************************************************************/
/*! exports provided: RxLetTemplateNames */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _view_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view-context */ "x+ba");
/* empty/unused harmony star reexport *//* harmony import */ var _template_names__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./template-names */ "P+21");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxLetTemplateNames", function() { return _template_names__WEBPACK_IMPORTED_MODULE_1__["RxLetTemplateNames"]; });





/***/ }),

/***/ "AD+d":
/*!*************************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/directives/if-visible/model/view-context.ts ***!
  \*************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "AUbq":
/*!*******************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/pipes/memo/memo.module.ts ***!
  \*******************************************************************************/
/*! exports provided: MemoModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MemoModule", function() { return MemoModule; });
/* harmony import */ var _memo_pipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./memo.pipe */ "DtWl");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


const DECLARATIONS = [
    _memo_pipe__WEBPACK_IMPORTED_MODULE_0__["MemoPipe"]
];
class MemoModule {
}
MemoModule.ɵfac = function MemoModule_Factory(t) { return new (t || MemoModule)(); };
MemoModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: MemoModule });
MemoModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](MemoModule, { declarations: [_memo_pipe__WEBPACK_IMPORTED_MODULE_0__["MemoPipe"]], exports: [_memo_pipe__WEBPACK_IMPORTED_MODULE_0__["MemoPipe"]] }); })();


/***/ }),

/***/ "AqL7":
/*!****************************************************************!*\
  !*** ./libs/cdk/src/lib/utils/coerceDistinctObservableWith.ts ***!
  \****************************************************************/
/*! exports provided: coerceDistinctWith */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "coerceDistinctWith", function() { return coerceDistinctWith; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _coerceObservableWith__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./coerceObservableWith */ "xahO");


/**
 * This operator takes an Observable of values ot Observables aof values and
 * It forwards only distinct values from distinct incoming Observables or values.
 * This comes in handy in any environment where you handle processing of incoming dynamic values and their state.
 *
 * Optionally you can pass a flatten strategy to get find grained control of the flattening process. E.g. mergeAll, switchAll
 *
 * @param flattenOperator - determines the flattening strategy e.g. mergeAll, concatAll, exhaust, switchAll. default is switchAll
 *
 */
function coerceDistinctWith(flattenOperator) {
    flattenOperator = flattenOperator || Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["switchAll"])();
    return (o$) => o$.pipe(Object(_coerceObservableWith__WEBPACK_IMPORTED_MODULE_1__["coerceObservableWith"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["distinctUntilChanged"])(), flattenOperator, Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["distinctUntilChanged"])());
}


/***/ }),

/***/ "ArS7":
/*!******************************************************************!*\
  !*** ./apps/demos/src/app/shared/ripple/rxa-responsive-meter.ts ***!
  \******************************************************************/
/*! exports provided: RippleRef, defaultRippleAnimationConfig, RippleRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RippleRef", function() { return RippleRef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultRippleAnimationConfig", function() { return defaultRippleAnimationConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RippleRenderer", function() { return RippleRenderer; });
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/cdk/platform */ "nLfN");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/a11y */ "u47x");
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/coercion */ "8LU1");
/* harmony import */ var _rx_angular_pocs_cdk_utils_zone_agnostic_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../rx-angular-pocs/cdk/utils/zone-agnostic/browser */ "7zi/");
/* harmony import */ var _rx_angular_pocs_cdk_utils_zone_agnostic__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../rx-angular-pocs/cdk/utils/zone-agnostic */ "j2tN");





// let isTouch: boolean;
/**
 * Reference to a previously launched ripple element.
 */
class RippleRef {
    constructor(_renderer, 
    /** Reference to the ripple HTML element. */
    element, 
    /** Ripple configuration used for the ripple. */
    config) {
        this._renderer = _renderer;
        this.element = element;
        this.config = config;
        /** Current state of the ripple. */
        this.state = 3 /* HIDDEN */;
    }
    /** Fades out the ripple element. */
    fadeOut() {
        this._renderer.fadeOutRipple(this);
    }
}
/**
 * Default ripple animation configuration for ripples without an explicit
 * animation config specified.
 */
const defaultRippleAnimationConfig = {
    enterDuration: 450,
    exitDuration: 400
};
/**
 * Timeout for ignoring mouse events. Mouse events will be temporary ignored after touch
 * events to avoid synthetic mouse events.
 */
const ignoreMouseEventsTimeout = 800;
/** Options that apply to all the event listeners that are bound by the ripple renderer. */
const passiveEventOptions = Object(_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_0__["normalizePassiveListenerOptions"])({ passive: true });
/** Events that signal that the pointer is down. ['mousedown', 'touchstart']*/
let pointerDownEvents;
/** Events that signal that the pointer is up. */
const pointerUpEvents = ['mouseup', 'mouseleave', 'touchend', 'touchcancel'];
/**
 * Helper service that performs DOM manipulations. Not intended to be used outside this module.
 * The constructor takes a reference to the ripple directive's host element and a map of DOM
 * event handlers to be installed on the element that triggers ripple animations.
 * This will eventually become a custom renderer once Angular support exists.
 * @docs-private
 */
class RippleRenderer {
    constructor(elementOrElementRef, platform) {
        /** Whether the pointer is currently down or not. */
        this._isPointerDown = false;
        /** Set of currently active ripple references. */
        this._activeRipples = new Set();
        /** Whether pointer-up event listeners have been registered. */
        this._pointerUpEventsRegistered = false;
        // Only do anything if we're on the browser.
        if (platform.isBrowser) {
            this._containerElement = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__["coerceElement"])(elementOrElementRef);
        }
        // detect touch support
        if (pointerDownEvents === undefined) {
            const s = touchOrMouseSupport(platform);
            if (s === -1) { // mouse only
                pointerDownEvents = ['mousedown'];
            }
            else if (s === 0) { // touch only
                pointerDownEvents = ['touchstart'];
            }
            else { // both (1)
                pointerDownEvents = ['mousedown', 'touchstart'];
            }
        }
    }
    /**
     * Fades in a ripple at the given coordinates.
     * @param x Coordinate within the element, along the X axis at which to start the ripple.
     * @param y Coordinate within the element, along the Y axis at which to start the ripple.
     * @param config Extra ripple options.
     */
    fadeInRipple(x, y, config = {}) {
        const containerRect = this._containerRect =
            this._containerRect || this._containerElement.getBoundingClientRect();
        const animationConfig = Object.assign(Object.assign({}, defaultRippleAnimationConfig), config.animation);
        if (config.centered) {
            x = containerRect.left + containerRect.width / 2;
            y = containerRect.top + containerRect.height / 2;
        }
        const radius = config.radius || distanceToFurthestCorner(x, y, containerRect);
        const offsetX = x - containerRect.left;
        const offsetY = y - containerRect.top;
        const duration = animationConfig.enterDuration;
        const ripple = document.createElement('div');
        ripple.classList.add('mat-ripple-element');
        ripple.style.left = `${offsetX - radius}px`;
        ripple.style.top = `${offsetY - radius}px`;
        ripple.style.height = `${radius * 2}px`;
        ripple.style.width = `${radius * 2}px`;
        // If a custom color has been specified, set it as inline style. If no color is
        // set, the default color will be applied through the ripple theme styles.
        if (config.color != null) {
            ripple.style.backgroundColor = config.color;
        }
        ripple.style.transitionDuration = `${duration}ms`;
        this._containerElement.appendChild(ripple);
        // By default the browser does not recalculate the styles of dynamically created
        // ripple elements. This is critical because then the `scale` would not animate properly.
        enforceStyleRecalculation(ripple);
        ripple.style.transform = 'scale(1)';
        // Exposed reference to the ripple that will be returned.
        const rippleRef = new RippleRef(this, ripple, config);
        rippleRef.state = 0 /* FADING_IN */;
        // Add the ripple reference to the list of all active ripples.
        this._activeRipples.add(rippleRef);
        if (!config.persistent) {
            this._mostRecentTransientRipple = rippleRef;
        }
        // Wait for the ripple element to be completely faded in.
        // Once it's faded in, the ripple can be hidden immediately if the mouse is released.
        Object(_rx_angular_pocs_cdk_utils_zone_agnostic_browser__WEBPACK_IMPORTED_MODULE_3__["setTimeout"])(() => {
            const isMostRecentTransientRipple = rippleRef === this._mostRecentTransientRipple;
            rippleRef.state = 1 /* VISIBLE */;
            // When the timer runs out while the user has kept their pointer down, we want to
            // keep only the persistent ripples and the latest transient ripple. We do this,
            // because we don't want stacked transient ripples to appear after their enter
            // animation has finished.
            if (!config.persistent && (!isMostRecentTransientRipple || !this._isPointerDown)) {
                rippleRef.fadeOut();
            }
        }, duration);
        return rippleRef;
    }
    /** Fades out a ripple reference. */
    fadeOutRipple(rippleRef) {
        const wasActive = this._activeRipples.delete(rippleRef);
        if (rippleRef === this._mostRecentTransientRipple) {
            this._mostRecentTransientRipple = null;
        }
        // Clear out the cached bounding rect if we have no more ripples.
        if (!this._activeRipples.size) {
            this._containerRect = null;
        }
        // For ripples that are not active anymore, don't re-run the fade-out animation.
        if (!wasActive) {
            return;
        }
        const rippleEl = rippleRef.element;
        const animationConfig = Object.assign(Object.assign({}, defaultRippleAnimationConfig), rippleRef.config.animation);
        rippleEl.style.transitionDuration = `${animationConfig.exitDuration}ms`;
        rippleEl.style.opacity = '0';
        rippleRef.state = 2 /* FADING_OUT */;
        // Once the ripple faded out, the ripple can be safely removed from the DOM.
        Object(_rx_angular_pocs_cdk_utils_zone_agnostic_browser__WEBPACK_IMPORTED_MODULE_3__["setTimeout"])(() => {
            rippleRef.state = 3 /* HIDDEN */;
            // tslint:disable-next-line:no-non-null-assertion
            rippleEl.parentNode.removeChild(rippleEl);
        }, animationConfig.exitDuration);
    }
    /** Fades out all currently active ripples. */
    fadeOutAll() {
        this._activeRipples.forEach(ripple => ripple.fadeOut());
    }
    /** Sets up the trigger event listeners */
    setupTriggerEvents(elementOrElementRef) {
        const element = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_2__["coerceElement"])(elementOrElementRef);
        if (!element || element === this._triggerElement) {
            return;
        }
        // Remove all previously registered event listeners from the trigger element.
        this._removeTriggerEvents();
        this._triggerElement = element;
        this._registerEvents(pointerDownEvents);
    }
    /**
     * Handles all registered events.
     * @docs-private
     */
    handleEvent(event) {
        if (event.type === 'mousedown') {
            this._onMousedown(event);
        }
        else if (event.type === 'touchstart') {
            this._onTouchStart(event);
        }
        else {
            this._onPointerUp();
        }
        // If pointer-up events haven't been registered yet, do so now.
        // We do this on-demand in order to reduce the total number of event listeners
        // registered by the ripples, which speeds up the rendering time for large UIs.
        if (!this._pointerUpEventsRegistered) {
            this._registerEvents(pointerUpEvents);
            this._pointerUpEventsRegistered = true;
        }
    }
    /** Function being called whenever the trigger is being pressed using mouse. */
    _onMousedown(event) {
        // Screen readers will fire fake mouse events for space/enter. Skip launching a
        // ripple in this case for consistency with the non-screen-reader experience.
        const isFakeMousedown = Object(_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_1__["isFakeMousedownFromScreenReader"])(event);
        const isSyntheticEvent = this._lastTouchStartEvent &&
            Date.now() < this._lastTouchStartEvent + ignoreMouseEventsTimeout;
        if (!isFakeMousedown && !isSyntheticEvent) {
            this._isPointerDown = true;
            this.fadeInRipple(event.clientX, event.clientY);
        }
    }
    /** Function being called whenever the trigger is being pressed using touch. */
    _onTouchStart(event) {
        // Some browsers fire mouse events after a `touchstart` event. Those synthetic mouse
        // events will launch a second ripple if we don't ignore mouse events for a specific
        // time after a touchstart event.
        this._lastTouchStartEvent = Date.now();
        this._isPointerDown = true;
        // Use `changedTouches` so we skip any touches where the user put
        // their finger down, but used another finger to tap the element again.
        const touches = event.changedTouches;
        for (let i = 0; i < touches.length; i++) {
            this.fadeInRipple(touches[i].clientX, touches[i].clientY);
        }
    }
    /** Function being called whenever the trigger is being released. */
    _onPointerUp() {
        if (!this._isPointerDown) {
            return;
        }
        this._isPointerDown = false;
        // Fade-out all ripples that are visible and not persistent.
        this._activeRipples.forEach(ripple => {
            // By default, only ripples that are completely visible will fade out on pointer release.
            // If the `terminateOnPointerUp` option is set, ripples that still fade in will also fade out.
            const isVisible = ripple.state === 1 /* VISIBLE */ ||
                ripple.config.terminateOnPointerUp && ripple.state === 0 /* FADING_IN */;
            if (!ripple.config.persistent && isVisible) {
                ripple.fadeOut();
            }
        });
    }
    /** Registers event listeners for a given list of events. */
    _registerEvents(eventTypes) {
        eventTypes.forEach((type) => {
            if (this._triggerElement) {
                Object(_rx_angular_pocs_cdk_utils_zone_agnostic__WEBPACK_IMPORTED_MODULE_4__["getZoneUnPatchedApi"])('addEventListener', this._triggerElement)(type, this, passiveEventOptions);
                //this._triggerElement!.addEventListener(type, this, passiveEventOptions);
            }
        });
    }
    /** Removes previously registered event listeners from the trigger element. */
    _removeTriggerEvents() {
        if (this._triggerElement) {
            pointerDownEvents.forEach((type) => {
                Object(_rx_angular_pocs_cdk_utils_zone_agnostic__WEBPACK_IMPORTED_MODULE_4__["getZoneUnPatchedApi"])('removeEventListener', this._triggerElement)(type, this, passiveEventOptions);
                // this._triggerElement!.removeEventListener(type, this, passiveEventOptions);
            });
            if (this._pointerUpEventsRegistered) {
                pointerUpEvents.forEach((type) => {
                    Object(_rx_angular_pocs_cdk_utils_zone_agnostic__WEBPACK_IMPORTED_MODULE_4__["getZoneUnPatchedApi"])('removeEventListener', this._triggerElement)(type, this, passiveEventOptions);
                    // this._triggerElement!.removeEventListener(type, this, passiveEventOptions);
                });
            }
        }
    }
}
/** Enforces a style recalculation of a DOM element by computing its styles. */
function enforceStyleRecalculation(element) {
    // Enforce a style recalculation by calling `getComputedStyle` and accessing any property.
    // Calling `getPropertyValue` is important to let optimizers know that this is not a noop.
    // See: https://gist.github.com/paulirish/5d52fb081b3570c81e3a
    window.getComputedStyle(element).getPropertyValue('opacity');
}
/**
 * Returns the distance from the point (x, y) to the furthest corner of a rectangle.
 */
function distanceToFurthestCorner(x, y, rect) {
    const distX = Math.max(Math.abs(x - rect.left), Math.abs(x - rect.right));
    const distY = Math.max(Math.abs(y - rect.top), Math.abs(y - rect.bottom));
    return Math.sqrt(distX * distX + distY * distY);
}
/**
 * Returns a 3 state value
 * only touch support: -1
 * only mouse support: 0
 * touch and mouse support: 1
 *
 * @param platform
 *
 * @return supported interaction
 */
function touchOrMouseSupport(platform) {
    //if (window.PointerEvent && ('maxTouchPoints' in navigator)) {
    if (platform.BLINK) {
        // if Pointer Events are supported, just check maxTouchPoints
        if (navigator.maxTouchPoints > 0) {
            return 1;
        }
    }
    else {
        // no Pointer Events...
        if (window.matchMedia && window.matchMedia("(any-pointer:coarse)").matches) {
            // check for any-pointer:coarse which mostly means touchscreen
            return 1;
        }
        else if (window.TouchEvent || ('ontouchstart' in window)) {
            // last resort - check for exposed touch events API / event handler
            return 1;
        }
    }
    return 0;
}


/***/ }),

/***/ "AzUJ":
/*!*******************************************************************!*\
  !*** ./libs/cdk/src/lib/template-management/list-view-context.ts ***!
  \*******************************************************************/
/*! exports provided: RxDefaultListViewContext */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RxDefaultListViewContext", function() { return RxDefaultListViewContext; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");


const computeFirst = ({ count, index }) => index === 0;
const computeLast = ({ count, index }) => index === count - 1;
const computeEven = ({ count, index }) => index % 2 === 0;
class RxDefaultListViewContext {
    constructor(item, customProps) {
        this.item = item;
        this._item = new rxjs__WEBPACK_IMPORTED_MODULE_0__["ReplaySubject"](1);
        this.item$ = this._item.asObservable();
        this._context$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"]({
            index: -1,
            count: -1,
        });
        this.select = (props) => {
            return this.item$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["pluck"])(...props));
        };
        // tslint:disable-next-line:no-unused-expression
        this.$implicit = item;
        if (customProps) {
            this.updateContext(customProps);
        }
    }
    set $implicit($implicit) {
        this._$implicit = $implicit;
        this._item.next($implicit);
    }
    get $implicit() {
        return this._$implicit;
    }
    get $complete() {
        return this._$complete;
    }
    get $error() {
        return this._$error;
    }
    get $suspense() {
        return this._$suspense;
    }
    get index() {
        return this._context$.getValue().index;
    }
    get count() {
        return this._context$.getValue().count;
    }
    get first() {
        return computeFirst(this._context$.getValue());
    }
    get last() {
        return computeLast(this._context$.getValue());
    }
    get even() {
        return computeEven(this._context$.getValue());
    }
    get odd() {
        return !this.even;
    }
    get index$() {
        return this._context$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["pluck"])('index'), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["distinctUntilChanged"])());
    }
    get count$() {
        return this._context$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["pluck"])('count'), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["distinctUntilChanged"])());
    }
    get first$() {
        return this._context$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(computeFirst), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["distinctUntilChanged"])());
    }
    get last$() {
        return this._context$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(computeLast), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["distinctUntilChanged"])());
    }
    get even$() {
        return this._context$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(computeEven), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["distinctUntilChanged"])());
    }
    get odd$() {
        return this.even$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((even) => !even));
    }
    updateContext(newProps) {
        this._context$.next(Object.assign(Object.assign({}, this._context$.getValue()), newProps));
    }
}


/***/ }),

/***/ "B09P":
/*!*********************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/directives/unpatch/index.ts ***!
  \*********************************************************************************/
/*! exports provided: unpatchEventListener, UnpatchEventsDirective, UnpatchEventsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _unpatch_events_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./unpatch-events.directive */ "OyBQ");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "unpatchEventListener", function() { return _unpatch_events_directive__WEBPACK_IMPORTED_MODULE_0__["unpatchEventListener"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UnpatchEventsDirective", function() { return _unpatch_events_directive__WEBPACK_IMPORTED_MODULE_0__["UnpatchEventsDirective"]; });

/* harmony import */ var _unpatch_events_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./unpatch-events.module */ "+iFM");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UnpatchEventsModule", function() { return _unpatch_events_module__WEBPACK_IMPORTED_MODULE_1__["UnpatchEventsModule"]; });





/***/ }),

/***/ "B8V6":
/*!******************************************************************!*\
  !*** ./libs/cdk/src/lib/zone-less/rxjs/scheduler/queue/queue.ts ***!
  \******************************************************************/
/*! exports provided: queue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queue", function() { return queue; });
/* harmony import */ var _QueueAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./QueueAction */ "TiBF");
/* harmony import */ var _QueueScheduler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./QueueScheduler */ "GdMm");
// tslint:disable file-name-casing


/**
 *
 * NOTE: This is a zone un-patched version of rxjs queueScheduler
 *
 * Queue Scheduler
 *
 * <span class="informal">Put every next task on a queue, instead of executing it immediately</span>
 *
 * `queue` scheduler, when used with delay, behaves the same as {@link asyncScheduler} scheduler.
 *
 * When used without delay, it schedules given task synchronously - executes it right when
 * it is scheduled. However when called recursively, that is when inside the scheduled task,
 * another task is scheduled with queue scheduler, instead of executing immediately as well,
 * that task will be put on a queue and wait for current one to finish.
 *
 * This means that when you execute task with `queue` scheduler, you are sure it will end
 * before any other task scheduled with that scheduler will start.
 *
 * ## Examples
 * Schedule recursively first, then do something
 * ```ts
 * import { queueScheduler } from '@cu/perf-utils';
 *
 * queueScheduler.schedule(() => {
 *   queueScheduler.schedule(() => console.log('second')); // will not happen now, but will be put on a queue
 *
 *   console.log('first');
 * });
 *
 * // Logs:
 * // "first"
 * // "second"
 * ```
 *
 * Reschedule itself recursively
 * ```ts
 * import { queueScheduler } from '@cu/perf-utils';
 *
 * queueScheduler.schedule(function(state) {
 *   if (state !== 0) {
 *     console.log('before', state);
 *     this.schedule(state - 1); // `this` references currently executing Action,
 *                               // which we reschedule with new state
 *     console.log('after', state);
 *   }
 * }, 0, 3);
 *
 * // In scheduler that runs recursively, you would expect:
 * // "before", 3
 * // "before", 2
 * // "before", 1
 * // "after", 1
 * // "after", 2
 * // "after", 3
 *
 * // But with queue it logs:
 * // "before", 3
 * // "after", 3
 * // "before", 2
 * // "after", 2
 * // "before", 1
 * // "after", 1
 * ```
 */
const queue = new _QueueScheduler__WEBPACK_IMPORTED_MODULE_1__["QueueScheduler"](_QueueAction__WEBPACK_IMPORTED_MODULE_0__["QueueAction"]);


/***/ }),

/***/ "BhH/":
/*!**********************************************************************************************!*\
  !*** ./libs/cdk/src/lib/zone-less/rxjs/scheduler/animation-frame/AnimationFrameScheduler.ts ***!
  \**********************************************************************************************/
/*! exports provided: AnimationFrameScheduler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnimationFrameScheduler", function() { return AnimationFrameScheduler; });
/* harmony import */ var _async_AsyncScheduler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../async/AsyncScheduler */ "QFH2");

class AnimationFrameScheduler extends _async_AsyncScheduler__WEBPACK_IMPORTED_MODULE_0__["AsyncScheduler"] {
    flush(action) {
        this.active = true;
        this.scheduled = undefined;
        const { actions } = this;
        let error;
        let index = -1;
        let count = actions.length;
        action = action || actions.shift();
        do {
            if ((error = action.execute(action.state, action.delay))) {
                break;
            }
        } while (++index < count && (action = actions.shift()));
        this.active = false;
        if (error) {
            while (++index < count && (action = actions.shift())) {
                action.unsubscribe();
            }
            throw error;
        }
    }
}


/***/ }),

/***/ "BipP":
/*!*********************************************************!*\
  !*** ./libs/template/src/lib/core/utils/zone-checks.ts ***!
  \*********************************************************/
/*! exports provided: getZoneUnPatchedApi, isEnvZonePatched, isApiZonePatched, isNgZone, isNoopNgZone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getZoneUnPatchedApi", function() { return getZoneUnPatchedApi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEnvZonePatched", function() { return isEnvZonePatched; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isApiZonePatched", function() { return isApiZonePatched; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNgZone", function() { return isNgZone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNoopNgZone", function() { return isNoopNgZone; });
/* harmony import */ var _get_global_this__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./get-global-this */ "GUy1");

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
    elem = elem || Object(_get_global_this__WEBPACK_IMPORTED_MODULE_0__["getGlobalThis"])();
    return isApiZonePatched(name, elem) ? elem['__zone_symbol__' + name] : elem[name];
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
function isEnvZonePatched() {
    return Object(_get_global_this__WEBPACK_IMPORTED_MODULE_0__["getGlobalThis"])().Zone !== undefined;
}
/**
 * apiZonePatched
 *
 * @description
 *
 * This function checks if a specific Browser API is patched by `zone.js`.
 *
 * @param name - The name of the API to check.
 * @param elem - The name of the API to check.
 * @return {boolean} - true if `zone.js` patched the API in question.
 *
 */
function isApiZonePatched(name, elem) {
    // if symbol is present, zone patched the API
    return elem['__zone_symbol__' + name] !== undefined;
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
    function fn() {
    }
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


/***/ }),

/***/ "Bj6Z":
/*!**********************************************************!*\
  !*** ./apps/demos/src/app/app-shell/app-shell.models.ts ***!
  \**********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "BjHz":
/*!**********************************************************!*\
  !*** ./libs/state/src/lib/core/utils/pipe-from-array.ts ***!
  \**********************************************************/
/*! exports provided: pipeFromArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pipeFromArray", function() { return pipeFromArray; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");

function pipeFromArray(fns) {
    if (!fns) {
        return rxjs__WEBPACK_IMPORTED_MODULE_0__["noop"];
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce((prev, fn) => fn(prev), input);
    };
}


/***/ }),

/***/ "Bq4D":
/*!**********************************************************!*\
  !*** ./libs/template/src/lib/core/render-aware/index.ts ***!
  \**********************************************************/
/*! exports provided: createRenderAware, renderWithLatestStrategy, notificationKindToRxNotificationKind, rxMaterialize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _render_aware_creator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render-aware_creator */ "Pl8O");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createRenderAware", function() { return _render_aware_creator__WEBPACK_IMPORTED_MODULE_0__["createRenderAware"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "renderWithLatestStrategy", function() { return _render_aware_creator__WEBPACK_IMPORTED_MODULE_0__["renderWithLatestStrategy"]; });

/* harmony import */ var _interfaces__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./interfaces */ "lX2z");
/* empty/unused harmony star reexport *//* harmony import */ var _utils_rx_materialize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/rx-materialize */ "SGQy");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "notificationKindToRxNotificationKind", function() { return _utils_rx_materialize__WEBPACK_IMPORTED_MODULE_2__["notificationKindToRxNotificationKind"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rxMaterialize", function() { return _utils_rx_materialize__WEBPACK_IMPORTED_MODULE_2__["rxMaterialize"]; });







/***/ }),

/***/ "C2vq":
/*!************************************************************!*\
  !*** ./libs/cdk/src/lib/zone-configuration/event-names.ts ***!
  \************************************************************/
/*! exports provided: uiEvent, focusEvent, selectionEvent, mouseEvent, wheelEvent, inputEvent, keyboardEvent, compositionEvent, touchEvents, formControlsEvents, globalEvents, xhrEvent, websocketEvents, allEvents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uiEvent", function() { return uiEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "focusEvent", function() { return focusEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectionEvent", function() { return selectionEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mouseEvent", function() { return mouseEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wheelEvent", function() { return wheelEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inputEvent", function() { return inputEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keyboardEvent", function() { return keyboardEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compositionEvent", function() { return compositionEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "touchEvents", function() { return touchEvents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formControlsEvents", function() { return formControlsEvents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "globalEvents", function() { return globalEvents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "xhrEvent", function() { return xhrEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "websocketEvents", function() { return websocketEvents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "allEvents", function() { return allEvents; });
// Standard Events
// User Interface Events
// UIEvent
const uiEvent = ['load', 'unload', 'abort', 'error', 'select'];
// Focus Events
const focusEvent = ['blur', 'focus', 'focusin', 'focusout'];
// Selection Events
const selectionEvent = ['selectionchange'];
// Mouse Events
// (MouseEvent)[https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent]
const mouseEvent = [
    'mousedown',
    'dblclick',
    'mouseenter',
    'mouseleave',
    'mousemove',
    'mouseout',
    'mouseover',
    'mouseup',
    'click',
];
// Wheel Events
const wheelEvent = [
    // (WheelEvent)[https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent]
    'wheel',
];
// Input Events
const inputEvent = [
    // 'beforeinput',
    'input',
];
// Keyboard Events
const keyboardEvent = ['keydown', 'keyup'];
// Composition Events
const compositionEvent = [
    'compositionstart',
    'compositionupdate',
    'compositionend',
];
const touchEvents = [
    // [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent)
    'pointerover',
    'pointerenter',
    'pointerdown',
    'pointermove',
    // 'pointerrawupdate',
    'pointerup',
    'pointercancel',
    'pointerout',
    'pointerleave',
    'gotpointercapture',
    'lostpointercapture',
    'pointerup',
    // [TouchEvent](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent)
    'touchstart',
    'touchend',
    'touchmove',
    'touchcancel',
    'drag',
    'dragend',
    'dragenter',
    'dragleave',
    'dragover',
    'dragstart',
    'drop',
];
const formControlsEvents = [
    'change',
    'blur',
    'focus',
    'contextmenu',
    'input',
];
const globalEvents = [
    // window
    'scroll',
    'load',
    'error',
];
// XHREvent
const xhrEvent = ['XHR'];
const websocketEvents = [
    'close',
    'error',
    'message',
    'open',
];
const allEvents = [
    ...uiEvent,
    ...focusEvent,
    ...selectionEvent,
    ...mouseEvent,
    ...wheelEvent,
    ...inputEvent,
    ...keyboardEvent,
    ...compositionEvent,
    ...touchEvents,
    ...formControlsEvents,
    ...globalEvents,
    ...xhrEvent,
    ...websocketEvents,
];


/***/ }),

/***/ "C6fF":
/*!*************************************************************!*\
  !*** ./libs/cdk/src/lib/zone-less/rxjs/observable/index.ts ***!
  \*************************************************************/
/*! exports provided: interval, timer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _interval__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interval */ "kt3e");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interval", function() { return _interval__WEBPACK_IMPORTED_MODULE_0__["interval"]; });

/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./timer */ "0wRn");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timer", function() { return _timer__WEBPACK_IMPORTED_MODULE_1__["timer"]; });





/***/ }),

/***/ "CQ8T":
/*!*******************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/rxjs/observable/index.ts ***!
  \*******************************************************************************/
/*! exports provided: createAccumulationObservable, createSideEffectObservable, intersectionObserver, animationFrameTick, idleCallbackTick, timeoutTick, intervalTick, promiseTick */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stateful_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stateful-observable */ "w1UF");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createAccumulationObservable", function() { return _stateful_observable__WEBPACK_IMPORTED_MODULE_0__["createAccumulationObservable"]; });

/* harmony import */ var _side_effect_observable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./side-effect-observable */ "zyx5");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createSideEffectObservable", function() { return _side_effect_observable__WEBPACK_IMPORTED_MODULE_1__["createSideEffectObservable"]; });

/* harmony import */ var _intersection_observer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./intersection-observer */ "Q6uP");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "intersectionObserver", function() { return _intersection_observer__WEBPACK_IMPORTED_MODULE_2__["intersectionObserver"]; });

/* harmony import */ var _tick_animationFrame__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tick-animationFrame */ "Yauo");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "animationFrameTick", function() { return _tick_animationFrame__WEBPACK_IMPORTED_MODULE_3__["animationFrameTick"]; });

/* harmony import */ var _tick_idleCallback__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tick-idleCallback */ "5UEg");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "idleCallbackTick", function() { return _tick_idleCallback__WEBPACK_IMPORTED_MODULE_4__["idleCallbackTick"]; });

/* harmony import */ var _tick_setTimeout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tick-setTimeout */ "YqYH");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeoutTick", function() { return _tick_setTimeout__WEBPACK_IMPORTED_MODULE_5__["timeoutTick"]; });

/* harmony import */ var _tick_setInterval__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tick-setInterval */ "PEFc");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "intervalTick", function() { return _tick_setInterval__WEBPACK_IMPORTED_MODULE_6__["intervalTick"]; });

/* harmony import */ var _tick_promise__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./tick-promise */ "jyCk");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "promiseTick", function() { return _tick_promise__WEBPACK_IMPORTED_MODULE_7__["promiseTick"]; });











/***/ }),

/***/ "CapS":
/*!*******************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/pipes/pipe/pipe.module.ts ***!
  \*******************************************************************************/
/*! exports provided: PipeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PipeModule", function() { return PipeModule; });
/* harmony import */ var _pipe_pipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pipe.pipe */ "9EiU");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


const DECLARATIONS = [
    _pipe_pipe__WEBPACK_IMPORTED_MODULE_0__["PipePipe"]
];
class PipeModule {
}
PipeModule.ɵfac = function PipeModule_Factory(t) { return new (t || PipeModule)(); };
PipeModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: PipeModule });
PipeModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](PipeModule, { declarations: [_pipe_pipe__WEBPACK_IMPORTED_MODULE_0__["PipePipe"]], exports: [_pipe_pipe__WEBPACK_IMPORTED_MODULE_0__["PipePipe"]] }); })();


/***/ }),

/***/ "ChVF":
/*!*******************************************************!*\
  !*** ./libs/state/src/lib/rxjs/operators/stateful.ts ***!
  \*******************************************************/
/*! exports provided: stateful */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stateful", function() { return stateful; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils */ "MqKN");


/**
 * @description
 *
 * As it acts like the Observables `pipe` method, it accepts one or many RxJS operators as params.
 *
 * @example
 * import { Observable } from 'rxjs';
 * import { map } from 'rxjs/operators';
 * import { stateful } from 'rx-angular/state';
 *
 * const state$: Observable<{ name: string; items: string[] }>;
 * const derivation$ = state$.pipe(
 *   stateful(
 *     map(state => state.list.length),
 *     filter(length => length > 3)
 *   )
 * );
 *
 * @param {OperatorFunction<T, A>} op - one or multiple passed operator comma separated
 *
 * @docsPage stateful
 * @docsCategory operators
 */
function stateful(...optionalDerive) {
    return (s) => {
        return s.pipe(
        // distinct same base-state objects (e.g. a default emission of default switch cases, incorrect mutable handling
        // of data) @TODO evaluate benefits vs. overhead
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["distinctUntilChanged"])(), 
        // CUSTOM LOGIC HERE
        (o) => {
            if (Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__["isOperateFnArrayGuard"])(optionalDerive)) {
                return o.pipe(Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__["pipeFromArray"])(optionalDerive));
            }
            return o;
        }, 
        // initial emissions, undefined is no base-state, pollution with skip(1)
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["filter"])((v) => v !== undefined), 
        // distinct same derivation value
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["distinctUntilChanged"])(), 
        // reuse custom operations result for multiple subscribers and reemit the last calculated value.
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["shareReplay"])({ bufferSize: 1, refCount: true }));
    };
}


/***/ }),

/***/ "DAZM":
/*!************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/directives/if-visible/index.ts ***!
  \************************************************************************************/
/*! exports provided: IfVisibleDirective, IfVisibleModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _if_visible_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./if-visible.directive */ "eUZg");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IfVisibleDirective", function() { return _if_visible_directive__WEBPACK_IMPORTED_MODULE_0__["IfVisibleDirective"]; });

/* harmony import */ var _if_visible_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./if-visible.module */ "T8ix");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IfVisibleModule", function() { return _if_visible_module__WEBPACK_IMPORTED_MODULE_1__["IfVisibleModule"]; });





/***/ }),

/***/ "DUwo":
/*!********************************************************!*\
  !*** ./apps/demos/src/app/shared/environment.token.ts ***!
  \********************************************************/
/*! exports provided: ENVIRONMENT_SETTINGS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ENVIRONMENT_SETTINGS", function() { return ENVIRONMENT_SETTINGS; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

const ENVIRONMENT_SETTINGS = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('ENVIRONMENT_SETTINGS');


/***/ }),

/***/ "Dq9L":
/*!**************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/directives/if/rx-if.directive.ts ***!
  \**************************************************************************************/
/*! exports provided: RxIf */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RxIf", function() { return RxIf; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./model */ "wOjG");
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/coercion */ "8LU1");
/* harmony import */ var _rx_angular_cdk__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @rx-angular/cdk */ "cDIL");








class RxIf {
    constructor(strategyProvider, cdRef, eRef, ngZone, thenTemplateRef, viewContainerRef) {
        this.strategyProvider = strategyProvider;
        this.cdRef = cdRef;
        this.eRef = eRef;
        this.ngZone = ngZone;
        this.thenTemplateRef = thenTemplateRef;
        this.viewContainerRef = viewContainerRef;
        this.subscription = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subscription"]();
        /** @internal */
        this.observablesHandler = Object(_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_5__["templateNotifier"])();
        this.strategyHandler = Object(_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_5__["hotFlatten"])(() => new rxjs__WEBPACK_IMPORTED_MODULE_1__["ReplaySubject"](1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["mergeAll"])());
        this.rendered$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    }
    set rxIf(potentialObservable) {
        this.observablesHandler.next(Object(_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_5__["coerceObservable"])(potentialObservable));
    }
    set strategy(strategyName) {
        this.strategyHandler.next(strategyName);
    }
    set else(templateRef) {
        if (templateRef) {
            this.templateManager.addTemplateRef(_model__WEBPACK_IMPORTED_MODULE_3__["RxIfTemplateNames"].else, templateRef);
        }
    }
    set renderCallback(callback) {
        this._renderObserver = callback;
    }
    ngOnInit() {
        this.templateManager = Object(_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_5__["createTemplateManager"])({
            templateSettings: {
                viewContainerRef: this.viewContainerRef,
                createViewContext,
                updateViewContext,
                customContext: (rxIf) => ({ rxIf }),
                patchZone: this.patchZone ? this.ngZone : false,
            },
            renderSettings: {
                cdRef: this.cdRef,
                eRef: this.eRef,
                parent: Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_4__["coerceBooleanProperty"])(this.renderParent),
                patchZone: this.patchZone ? this.ngZone : false,
                defaultStrategyName: this.strategyProvider.primaryStrategy,
                strategies: this.strategyProvider.strategies,
            },
            notificationToTemplateName: {
                [_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_5__["RxNotificationKind"].suspense]: () => _model__WEBPACK_IMPORTED_MODULE_3__["RxIfTemplateNames"].suspense,
                [_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_5__["RxNotificationKind"].next]: (value, templates) => {
                    return value ?
                        _model__WEBPACK_IMPORTED_MODULE_3__["RxIfTemplateNames"].then
                        : templates.get(_model__WEBPACK_IMPORTED_MODULE_3__["RxIfTemplateNames"].else) ?
                            _model__WEBPACK_IMPORTED_MODULE_3__["RxIfTemplateNames"].then
                            : undefined;
                },
                [_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_5__["RxNotificationKind"].error]: () => _model__WEBPACK_IMPORTED_MODULE_3__["RxIfTemplateNames"].error,
                [_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_5__["RxNotificationKind"].complete]: () => _model__WEBPACK_IMPORTED_MODULE_3__["RxIfTemplateNames"].complete
            }
        });
        this.templateManager.addTemplateRef(_model__WEBPACK_IMPORTED_MODULE_3__["RxIfTemplateNames"].then, this.thenTemplateRef);
        this.templateManager.nextStrategy(this.strategyHandler.values$);
        this.subscription.add(this.templateManager
            .render(this.observablesHandler.values$)
            .subscribe((n) => {
            var _a;
            this.rendered$.next(n);
            (_a = this._renderObserver) === null || _a === void 0 ? void 0 : _a.next(n);
        }));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
RxIf.ɵfac = function RxIf_Factory(t) { return new (t || RxIf)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_5__["RxStrategyProvider"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"])); };
RxIf.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: RxIf, selectors: [["", "rxIf", ""]], inputs: { rxIf: "rxIf", strategy: ["rxIfStrategy", "strategy"], else: ["rxIfElse", "else"], renderParent: ["rxIfParent", "renderParent"], patchZone: ["rxIfPatchZone", "patchZone"], renderCallback: ["rxIfRenderCallback", "renderCallback"] } });
function createViewContext(value) {
    return {
        rxIf: value,
        rxElse: false,
        $implicit: value,
        $error: false,
        $complete: false,
        $suspense: false,
    };
}
function updateViewContext(value, view, context) {
    Object.keys(context).forEach((k) => {
        view.context[k] = context[k];
    });
}


/***/ }),

/***/ "DsEK":
/*!******************************************************!*\
  !*** ./libs/cdk/src/lib/zone-configuration/index.ts ***!
  \******************************************************/
/*! exports provided: uiEvent, focusEvent, selectionEvent, mouseEvent, wheelEvent, inputEvent, keyboardEvent, compositionEvent, touchEvents, formControlsEvents, globalEvents, xhrEvent, websocketEvents, allEvents, zoneConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _event_names__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./event-names */ "C2vq");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "uiEvent", function() { return _event_names__WEBPACK_IMPORTED_MODULE_0__["uiEvent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "focusEvent", function() { return _event_names__WEBPACK_IMPORTED_MODULE_0__["focusEvent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "selectionEvent", function() { return _event_names__WEBPACK_IMPORTED_MODULE_0__["selectionEvent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mouseEvent", function() { return _event_names__WEBPACK_IMPORTED_MODULE_0__["mouseEvent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "wheelEvent", function() { return _event_names__WEBPACK_IMPORTED_MODULE_0__["wheelEvent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "inputEvent", function() { return _event_names__WEBPACK_IMPORTED_MODULE_0__["inputEvent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "keyboardEvent", function() { return _event_names__WEBPACK_IMPORTED_MODULE_0__["keyboardEvent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "compositionEvent", function() { return _event_names__WEBPACK_IMPORTED_MODULE_0__["compositionEvent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "touchEvents", function() { return _event_names__WEBPACK_IMPORTED_MODULE_0__["touchEvents"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "formControlsEvents", function() { return _event_names__WEBPACK_IMPORTED_MODULE_0__["formControlsEvents"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "globalEvents", function() { return _event_names__WEBPACK_IMPORTED_MODULE_0__["globalEvents"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "xhrEvent", function() { return _event_names__WEBPACK_IMPORTED_MODULE_0__["xhrEvent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "websocketEvents", function() { return _event_names__WEBPACK_IMPORTED_MODULE_0__["websocketEvents"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "allEvents", function() { return _event_names__WEBPACK_IMPORTED_MODULE_0__["allEvents"]; });

/* harmony import */ var _zone_cfg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./zone-cfg */ "kPeq");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "zoneConfig", function() { return _zone_cfg__WEBPACK_IMPORTED_MODULE_1__["zoneConfig"]; });





/***/ }),

/***/ "DtWl":
/*!*****************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/pipes/memo/memo.pipe.ts ***!
  \*****************************************************************************/
/*! exports provided: MemoPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MemoPipe", function() { return MemoPipe; });
/* harmony import */ var _memo_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./memo-map */ "/NyO");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class MemoPipe {
    transform(args, fn) {
        const momoizedFn = Object(_memo_map__WEBPACK_IMPORTED_MODULE_0__["getMemoizedFn"])(fn);
        return momoizedFn(args);
    }
}
MemoPipe.ɵfac = function MemoPipe_Factory(t) { return new (t || MemoPipe)(); };
MemoPipe.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefinePipe"]({ name: "memo", type: MemoPipe, pure: true });


/***/ }),

/***/ "E8rn":
/*!************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/rxjs/operators/selectSlice.ts ***!
  \************************************************************************************/
/*! exports provided: selectSlice */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectSlice", function() { return selectSlice; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _distinctUntilSomeChanged__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./distinctUntilSomeChanged */ "6W6m");


/**
 * @description
 *
 * Returns an Observable that emits only the provided `keys` emitted by the source Observable. Each key will get
 * filtered to only emit _defined_ values as well as checked for distinct emissions.
 * Comparison will be done for each set key in the `keys` array.
 *
 * `selectSlice` will only emit _valid_ selections. A selection is _valid_ if every
 * selected key exists and is defined in the source Observable. This ensures that the `selectSlice`
 * operator will always return a complete slice with all values defined.
 *
 * You can fine grain your distinct checks by providing a `KeyCompareMap` with those keys you want to compute
 * explicitly different
 *
 * @example
 *
 * // An example with a custom comparison applied to each key
 * import { of } from 'rxjs';
 * import { selectSlice } from 'rx-angular/state';
 *
 *
 * const state$: Observable<MyState> = of(
 *  { title: 'myTitle', panelOpen: true},
 *  { title: 'myTitle2', panelOpen: true},
 *  { title: 'newTitle', panelOpen: true},
 *  { title: 'newTitle', panelOpen: false}
 * )
 * .pipe(
 *     selectSlice(['title', 'panelOpen']),
 *   )
 *   .subscribe(x => console.log(x));
 *
 * // displays:
 * //  { title: 'myTitle', panelOpen: true },
 * //  { title: 'myTitle2', panelOpen: true },
 * //  { title: 'newTitle', panelOpen: true },
 * //  { title: 'newTitle', panelOpen: false }
 *
 * @example
 *
 * import { of, Observable } from 'rxjs';
 * import { tap } from 'rxjs/operators';
 * import { selectSlice } from 'rx-angular/state';
 *
 * interface MyState {
 *    title: string;
 *    items: string[];
 *    panelOpen: boolean;
 * }
 * // Select items and title.
 * // apply custom compare logic for the items array
 * const customComparison: KeyCompareMap<MyState> = {
 *   items: (oldItems, newItems) => compareItems(oldItems, newItems)
 * };
 * const state$: Observable<MyState> = of(
 * { title: 'myTitle', items: ['foo', 'bar'], panelOpen: true },
 * { title: 'myTitle', items: ['foo', 'bar'], panelOpen: false },
 * { title: 'nextTitle', items: ['foo', 'baR'], panelOpen: true },
 * { title: 'nextTitle', items: ['fooRz', 'boo'], panelOpen: false },
 * );
 * const slice$ = state$.pipe(selectSlice(['title', 'items'], customComparison), tap(console.log)).subscribe();
 *
 * // displays:
 * // { title: 'myTitle', items: ['foo', 'bar'] }
 * // { title: 'nextTitle', items: ['foo', 'baR'] }
 * // { title: 'nextTitle', items: ['fooRz', 'boo'] }
 *
 * @param {(K)[]} keys - the array of keys which should be selected
 * @param {KeyCompareMap<{ [P in K]: T[P] }>} [keyCompareMap] Optional KeyCompareMap to provide custom compare logic
 * for some the keys
 * @docsPage selectSlice
 * @docsCategory operators
 */
function selectSlice(keys, keyCompareMap) {
    return (o$) => o$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["filter"])((state) => state !== undefined), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])((state) => {
        // forward null
        if (state === null) {
            return null;
        }
        // an array of all keys which exist and are _defined_ in the state object
        const definedKeys = keys
            // filter out undefined properties e. g. {}, { str: undefined }
            .filter((k) => state.hasOwnProperty(k) && state[k] !== undefined);
        // we want to ensure to only emit _valid_ selections
        // a selection is _valid_ if every selected key exists and has a value:
        // {} => selectSlice(['foo']) => no emission
        // {str: 'test'} => selectSlice([]) => no emission
        // {str: 'test'} => selectSlice(['notPresent']) => no emission
        // {str: 'test'} => state.select(selectSlice([])) => no emission
        // {str: 'test'} => state.select(selectSlice(['notPresent'])) => no emission
        // {str: undefined} => state.select(selectSlice(['str'])) => no emission
        // {str: 'test', foo: undefined } => state.select(selectSlice(['foo'])) => no emission
        if (definedKeys.length < keys.length) {
            return undefined;
        }
        // create the selected slice
        return definedKeys
            .reduce((vm, key) => {
            vm[key] = state[key];
            return vm;
        }, {});
    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["filter"])((v) => v !== undefined), Object(_distinctUntilSomeChanged__WEBPACK_IMPORTED_MODULE_1__["distinctUntilSomeChanged"])(keys, keyCompareMap));
}


/***/ }),

/***/ "ETSG":
/*!*************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/rxjs/util/index.ts ***!
  \*************************************************************************/
/*! exports provided: isSubscription */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _isSubscription__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isSubscription */ "jmDS");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isSubscription", function() { return _isSubscription__WEBPACK_IMPORTED_MODULE_0__["isSubscription"]; });




/***/ }),

/***/ "EU3E":
/*!***************************************************************************!*\
  !*** ./apps/demos/src/app/features/performance/performance-shell.menu.ts ***!
  \***************************************************************************/
/*! exports provided: MENU_ITEMS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MENU_ITEMS", function() { return MENU_ITEMS; });
/* harmony import */ var _rx_let_vs_push_rx_let_vs_push_menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rx-let-vs-push/rx-let-vs-push.menu */ "Rcf7");
/* harmony import */ var _alphas_compare_alphas_compare_menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./alphas-compare/alphas-compare.menu */ "g5uj");


const MENU_ITEMS = [
    ..._rx_let_vs_push_rx_let_vs_push_menu__WEBPACK_IMPORTED_MODULE_0__["RXLET_VS_PUSH_MENU_ITEMS"],
    ..._alphas_compare_alphas_compare_menu__WEBPACK_IMPORTED_MODULE_1__["ALPHAS_COMPARE_MENU_ITEMS"],
    {
        label: 'Nested Component Structure',
        link: 'nested-component-structure'
    },
    {
        label: 'Sibling Component Structure',
        link: 'sibling-component-structure'
    }
];


/***/ }),

/***/ "Eaco":
/*!*****************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/render-aware/render-aware.ts ***!
  \*****************************************************************************/
/*! exports provided: createRenderAware */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createRenderAware", function() { return createRenderAware; });
/* harmony import */ var _rx_angular_cdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rx-angular/cdk */ "cDIL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _utils_rxjs_operators_rx_materialize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/rxjs/operators/rx-materialize */ "r2o8");




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
    const strategyName$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["ReplaySubject"](1);
    const strategyHandling$ = Object(_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_0__["strategyHandling"])(cfg.defaultStrategyName, cfg.strategies);
    const templateTriggerSubject = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    const templateTrigger$ = templateTriggerSubject.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["mergeAll"])());
    const observablesFromTemplate$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["ReplaySubject"](1);
    const renderingEffect$ = observablesFromTemplate$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(o => Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["isObservable"])(o) ? o : Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(o)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchAll"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["distinctUntilChanged"])(), Object(_utils_rxjs_operators_rx_materialize__WEBPACK_IMPORTED_MODULE_3__["rxMaterialize"])(), 
    /* tslint:disable */
    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["merge"])(templateTrigger$ || rxjs__WEBPACK_IMPORTED_MODULE_1__["EMPTY"]), 
    /* tslint:enable */
    /*observeTemplateByNotificationKind(cfg.templateObserver),
    applyStrategy(strategy$, cfg.getContext, cfg.getCdRef),*/
    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(e => {
        console.error(e);
        return rxjs__WEBPACK_IMPORTED_MODULE_1__["EMPTY"];
    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["publishReplay"])());
    return {
        strategy$: strategyHandling$.strategy$,
        nextPotentialObservable(value) {
            observablesFromTemplate$.next(value);
        },
        nextStrategy(nextConfig) {
            strategyName$.next(nextConfig);
        },
        nextTemplateTrigger(trigger$) {
            templateTriggerSubject.next(trigger$);
        },
        subscribe: () => {
            return renderingEffect$.connect();
        },
        rendered$: renderingEffect$
    };
}


/***/ }),

/***/ "EbrR":
/*!************************************************************************!*\
  !*** ./libs/template/src/lib/core/utils/unpatched-resolved-promise.ts ***!
  \************************************************************************/
/*! exports provided: getUnpatchedResolvedPromise */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUnpatchedResolvedPromise", function() { return getUnpatchedResolvedPromise; });
/* harmony import */ var _zone_checks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./zone-checks */ "BipP");
/** A shared promise instance to cause a delay of one microtask */

let resolvedPromise = null;
function getUnpatchedResolvedPromise() {
    resolvedPromise = resolvedPromise || Object(_zone_checks__WEBPACK_IMPORTED_MODULE_0__["getZoneUnPatchedApi"])('Promise').resolve();
    return resolvedPromise;
}


/***/ }),

/***/ "Eg4a":
/*!**********************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/zone-agnostic/browser/queueMicrotask.ts ***!
  \**********************************************************************************************/
/*! exports provided: queueMicrotask */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queueMicrotask", function() { return queueMicrotask; });
/* harmony import */ var _zone_checks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../zone-checks */ "V4xg");
/* harmony import */ var _Promise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Promise */ "Vgdy");
/* harmony import */ var _setTimeout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./setTimeout */ "zhOe");



// Source: Feross Aboukhadijeh <https://feross.org/opensource>
let promise;
const _queueMicrotask = typeof queueMicrotask === 'function'
    ? Object(_zone_checks__WEBPACK_IMPORTED_MODULE_0__["getZoneUnPatchedApi"])('queueMicrotask').bind(globalThis)
    // reuse resolved promise, and allocate it lazily
    : cb => (promise || (promise = _Promise__WEBPACK_IMPORTED_MODULE_1__["Promise"].resolve()))
        .then(cb)
        .catch(err => Object(_setTimeout__WEBPACK_IMPORTED_MODULE_2__["setTimeout"])(() => { throw err; }, 0));
function queueMicrotask(cb) {
    return _queueMicrotask(cb);
}


/***/ }),

/***/ "ElDW":
/*!**************************************************************************!*\
  !*** ./libs/cdk/src/lib/render-strategies/scheduler/schedulerMinHeap.ts ***!
  \**************************************************************************/
/*! exports provided: push, peek, pop */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "push", function() { return push; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "peek", function() { return peek; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pop", function() { return pop; });
function push(heap, node) {
    const index = heap.length;
    heap.push(node);
    siftUp(heap, node, index);
}
function peek(heap) {
    const first = heap[0];
    return first === undefined ? null : first;
}
function pop(heap) {
    const first = heap[0];
    if (first !== undefined) {
        const last = heap.pop();
        if (last !== first) {
            heap[0] = last;
            siftDown(heap, last, 0);
        }
        return first;
    }
    else {
        return null;
    }
}
function siftUp(heap, node, i) {
    let index = i;
    while (true) {
        // tslint:disable-next-line:no-bitwise
        const parentIndex = (index - 1) >>> 1;
        const parent = heap[parentIndex];
        if (parent !== undefined && compare(parent, node) > 0) {
            // The parent is larger. Swap positions.
            heap[parentIndex] = node;
            heap[index] = parent;
            index = parentIndex;
        }
        else {
            // The parent is smaller. Exit.
            return;
        }
    }
}
function siftDown(heap, node, i) {
    let index = i;
    const length = heap.length;
    while (index < length) {
        const leftIndex = (index + 1) * 2 - 1;
        const left = heap[leftIndex];
        const rightIndex = leftIndex + 1;
        const right = heap[rightIndex];
        // If the left or right node is smaller, swap with the smaller of those.
        if (left !== undefined && compare(left, node) < 0) {
            if (right !== undefined && compare(right, left) < 0) {
                heap[index] = right;
                heap[rightIndex] = node;
                index = rightIndex;
            }
            else {
                heap[index] = left;
                heap[leftIndex] = node;
                index = leftIndex;
            }
        }
        else if (right !== undefined && compare(right, node) < 0) {
            heap[index] = right;
            heap[rightIndex] = node;
            index = rightIndex;
        }
        else {
            // Neither child is smaller. Exit.
            return;
        }
    }
}
function compare(a, b) {
    // Compare sort index first, then task id.
    const diff = a.sortIndex - b.sortIndex;
    return diff !== 0 ? diff : a.id - b.id;
}


/***/ }),

/***/ "Eo3l":
/*!*********************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/zone-agnostic/rxjs/observable/index.ts ***!
  \*********************************************************************************************/
/*! exports provided: interval */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _interval__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interval */ "yluw");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interval", function() { return _interval__WEBPACK_IMPORTED_MODULE_0__["interval"]; });




/***/ }),

/***/ "ErOQ":
/*!************************************************************************!*\
  !*** ./libs/cdk/src/lib/zone-less/rxjs/scheduler/async/AsyncAction.ts ***!
  \************************************************************************/
/*! exports provided: AsyncAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AsyncAction", function() { return AsyncAction; });
/* harmony import */ var _Action__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Action */ "urvc");
/* harmony import */ var _browser_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../browser/browser */ "rxQk");


/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class AsyncAction extends _Action__WEBPACK_IMPORTED_MODULE_0__["Action"] {
    constructor(scheduler, work) {
        super(scheduler, work);
        this.scheduler = scheduler;
        this.work = work;
        this.pending = false;
    }
    schedule(state, delay = 0) {
        if (this.closed) {
            return this;
        }
        // Always replace the current state with the new state.
        this.state = state;
        const id = this.id;
        const scheduler = this.scheduler;
        //
        // Important implementation note:
        //
        // Actions only execute once by default, unless rescheduled from within the
        // scheduled callback. This allows us to implement single and repeat
        // actions via the same code path, without adding API surface area, as well
        // as mimic traditional recursion but across asynchronous boundaries.
        //
        // However, JS runtimes and timers distinguish between intervals achieved by
        // serial `setTimeout` calls vs. a single `setInterval` call. An interval of
        // serial `setTimeout` calls can be individually delayed, which delays
        // scheduling the next `setTimeout`, and so on. `setInterval` attempts to
        // guarantee the interval callback will be invoked more precisely to the
        // interval period, regardless of load.
        //
        // Therefore, we use `setInterval` to schedule single and repeat actions.
        // If the action reschedules itself with the same delay, the interval is not
        // canceled. If the action doesn't reschedule, or reschedules with a
        // different delay, the interval will be canceled after scheduled callback
        // execution.
        //
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, delay);
        }
        // Set the pending flag indicating that this action has been scheduled, or
        // has recursively rescheduled itself.
        this.pending = true;
        this.delay = delay;
        // If this action has already an async Id, don't request a new one.
        this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
        return this;
    }
    requestAsyncId(scheduler, id, delay = 0) {
        return Object(_browser_browser__WEBPACK_IMPORTED_MODULE_1__["setInterval"])(scheduler.flush.bind(scheduler, this), delay);
    }
    recycleAsyncId(scheduler, id, delay = 0) {
        // If this action is rescheduled with the same delay time, don't clear the interval id.
        if (delay !== null && this.delay === delay && this.pending === false) {
            return id;
        }
        // Otherwise, if the action's delay time is different from the current delay,
        // or the action has been rescheduled before it's executed, clear the interval id
        Object(_browser_browser__WEBPACK_IMPORTED_MODULE_1__["clearInterval"])(id);
        return undefined;
    }
    /**
     * Immediately executes this action and the `work` it contains.
     * @return {any}
     */
    execute(state, delay) {
        if (this.closed) {
            return new Error('executing a cancelled action');
        }
        this.pending = false;
        const error = this._execute(state, delay);
        if (error) {
            return error;
        }
        else if (this.pending === false && this.id != null) {
            // Dequeue if the action didn't reschedule itself. Don't call
            // unsubscribe(), because the action could reschedule later.
            // For example:
            // ```
            // scheduler.schedule(function doWork(counter) {
            //   /* ... I'm a busy worker bee ... */
            //   var originalAction = this;
            //   /* wait 100ms before rescheduling the action */
            //   setTimeout(function () {
            //     originalAction.schedule(counter + 1);
            //   }, 100);
            // }, 1000);
            // ```
            this.id = this.recycleAsyncId(this.scheduler, this.id, null);
        }
    }
    _execute(state, delay) {
        let errored = false;
        let errorValue;
        try {
            this.work(state);
        }
        catch (e) {
            errored = true;
            errorValue = (!!e && e) || new Error(e);
        }
        if (errored) {
            this.unsubscribe();
            return errorValue;
        }
    }
    /** @deprecated This is an internal implementation detail, do not use. */
    _unsubscribe() {
        const id = this.id;
        const scheduler = this.scheduler;
        const actions = scheduler.actions;
        // @ts-ignore
        const index = actions.indexOf(this);
        this.work = null;
        this.state = null;
        this.pending = false;
        this.scheduler = null;
        if (index !== -1) {
            actions.splice(index, 1);
        }
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, null);
        }
        this.delay = null;
    }
}


/***/ }),

/***/ "F2kK":
/*!*******************************************************!*\
  !*** ./libs/cdk/src/lib/template-management/utils.ts ***!
  \*******************************************************/
/*! exports provided: getTNode, extractProjectionParentViewSet, extractProjectionViews, renderProjectionParents, createEmbeddedView, templateHandling, notifyAllParentsIfNeeded, notifyInjectingParentIfNeeded, getVirtualParentNotifications$ */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTNode", function() { return getTNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractProjectionParentViewSet", function() { return extractProjectionParentViewSet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractProjectionViews", function() { return extractProjectionViews; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderProjectionParents", function() { return renderProjectionParents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEmbeddedView", function() { return createEmbeddedView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "templateHandling", function() { return templateHandling; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "notifyAllParentsIfNeeded", function() { return notifyAllParentsIfNeeded; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "notifyInjectingParentIfNeeded", function() { return notifyInjectingParentIfNeeded; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVirtualParentNotifications$", function() { return getVirtualParentNotifications$; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _zone_less_rxjs_scheduler_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../zone-less/rxjs/scheduler/index */ "zPwp");
/* harmony import */ var _utils_onStrategy__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/onStrategy */ "PbSv");





// Below are constants for LView indices to help us look up LView members
// without having to remember the specific indices.
// Uglify will inline these when minifying so there shouldn't be a cost.
const TVIEW = 1;
const T_HOST = 6;
const L_CONTAINER_NATIVE = 7;
const CONTEXT = 8;
const HEADER_OFFSET = 20;
/**
 * @internal
 *
 * Returns the TNode of the passed node form TVIEW of passed cdRef
 *
 * @param cdRef
 * @param native
 */
function getTNode(cdRef, native) {
    const lView = cdRef._cdRefInjectingView;
    if (!lView) {
        return undefined;
    }
    const tView = lView[TVIEW];
    let i = HEADER_OFFSET;
    let lContainer;
    while (!lContainer && i <= tView['bindingStartIndex']) {
        const candidate = lView[i];
        if (candidate && candidate[L_CONTAINER_NATIVE] === native) {
            lContainer = candidate;
        }
        i++;
    }
    return lContainer[T_HOST];
}
/**
 * @internal
 *
 * Returns a set of references to parent views
 *
 *
 * @param cdRef
 * @param tNode
 */
function extractProjectionParentViewSet(cdRef, tNode) {
    const injectingLView = cdRef._cdRefInjectingView;
    const injectingTView = injectingLView[1];
    const components = new Set(injectingTView['components']);
    const parentElements = new Set();
    let parent = tNode['parent'];
    while (parent != null && components.size > 0) {
        const idx = parent['index'];
        if (components.has(idx)) {
            // TODO: we should discuss about this. currently only the first Component will get returned, not a list of
            //  components. Maybe we should make the parent notification configurable regarding the level of `deepness`?
            // components.delete(idx);
            components.clear();
            parentElements.add(injectingLView[idx][CONTEXT]);
        }
        parent = parent['parent'];
    }
    return parentElements;
}
function extractProjectionViews(cdRef, tNode) {
    return Array.from(extractProjectionParentViewSet(cdRef, tNode));
}
/**
 * A side effect operator similar to `tap` but with a static logic
 *
 *
 *
 * @param cdRef
 * @param tNode
 * @param strategy$
 */
function renderProjectionParents(cdRef, tNode, strategy$) {
    return (o$) => o$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["withLatestFrom"])(strategy$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(([_, strategy]) => {
        const parentElements = extractProjectionParentViewSet(cdRef, tNode);
        const behaviors = [];
        for (const el of parentElements.values()) {
            behaviors.push(Object(_utils_onStrategy__WEBPACK_IMPORTED_MODULE_4__["onStrategy"])(el, strategy, (value, work, options) => {
                Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdetectChanges"])(el);
            }, { scope: el }));
        }
        behaviors.push(Object(_utils_onStrategy__WEBPACK_IMPORTED_MODULE_4__["onStrategy"])(null, strategy, (value, work, options) => work(cdRef, options.scope), { scope: cdRef.context || cdRef }));
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["merge"])(...behaviors);
    }));
}
/**
 * @internal
 * creates an embeddedViewRef
 *
 * @param viewContainerRef
 * @param templateRef
 * @param context
 * @param index
 * @return EmbeddedViewRef<C>
 */
function createEmbeddedView(viewContainerRef, templateRef, context, index = 0) {
    const view = viewContainerRef.createEmbeddedView(templateRef, context, index);
    view.detectChanges();
    return view;
}
/**
 * @internal
 *
 * A factory function returning an object to handle `TemplateRef`'s.
 * You can add and get a `TemplateRef`.
 *
 */
function templateHandling(viewContainerRef) {
    const templateCache = new Map();
    const get = (name) => {
        return templateCache.get(name);
    };
    return {
        add(name, templateRef) {
            assertTemplate(name, templateRef);
            if (!templateCache.has(name)) {
                templateCache.set(name, templateRef);
            }
            else {
                throw new Error('Updating an already existing Template is not supported at the moment.');
            }
        },
        get,
        createEmbeddedView: (name, context) => createEmbeddedView(viewContainerRef, get(name), context),
    };
    //
    function assertTemplate(property, templateRef) {
        const isTemplateRefOrNull = !!(!templateRef || templateRef.createEmbeddedView);
        if (!isTemplateRefOrNull) {
            throw new Error(`${property} must be a TemplateRef, but received something else.`);
        }
        return isTemplateRefOrNull;
    }
}
/**
 * @internal
 *
 * A side effect operator similar to `tap` but with a static internal logic.
 * It calls detect changes on the 'VirtualParent' and the injectingViewCdRef.
 *
 * @param tNode
 * @param injectingViewCdRef
 * @param strategy
 * @param notifyNeeded
 */
function notifyAllParentsIfNeeded(tNode, injectingViewCdRef, strategy, notifyNeeded) {
    return (o$) => o$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["delay"])(0, _zone_less_rxjs_scheduler_index__WEBPACK_IMPORTED_MODULE_3__["asyncScheduler"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])((v) => {
        const notifyParent = notifyNeeded();
        if (!notifyParent) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(v);
        }
        const behaviors = tNode
            ? getVirtualParentNotifications$(tNode, injectingViewCdRef, strategy)
            : [];
        // @TODO remove this CD on injectingViewCdRef if possible
        behaviors.push(Object(_utils_onStrategy__WEBPACK_IMPORTED_MODULE_4__["onStrategy"])(null, strategy, (_v, work, options) => work(injectingViewCdRef, options.scope), { scope: injectingViewCdRef.context || injectingViewCdRef }));
        if (behaviors.length === 1) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(v);
        }
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["concat"])(Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(v), Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["combineLatest"])(behaviors).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["ignoreElements"])()));
    }));
}
/**
 * @internal
 *
 * returns an Observable executing a side effects for change detection of parents
 *
 * @param injectingViewCdRef
 * @param strategy
 * @param notify
 */
function notifyInjectingParentIfNeeded(injectingViewCdRef, strategy, notify) {
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["concat"])(Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(null), notify
        ? Object(_utils_onStrategy__WEBPACK_IMPORTED_MODULE_4__["onStrategy"])(null, strategy, (value, work, options) => {
            // console.log('notify injectingView', injectingViewCdRef);
            work(injectingViewCdRef, options.scope);
        }
        //  scopeOnInjectingViewContext
        ).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["ignoreElements"])())
        : []);
}
/**
 * @internal
 *
 * Returns an array of observables triggering `detectChanges` on the __virtual parent__  (parent of the projected view)
 *
 * @param tNode - is a component that was projected into another component (virtual parent)
 * @param injectingViewCdRef - is needed to get the
 * @param strategy - the strategy to run the change detection
 */
function getVirtualParentNotifications$(tNode, injectingViewCdRef, strategy) {
    const parentElements = extractProjectionParentViewSet(injectingViewCdRef, tNode);
    const behaviors = [];
    for (const parentComponent of parentElements.values()) {
        behaviors.push(Object(_utils_onStrategy__WEBPACK_IMPORTED_MODULE_4__["onStrategy"])(parentComponent, strategy, 
        // Here we CD the parent to update their projected views scenarios
        (value, work, options) => {
            // console.log('parentComponent', parentComponent);
            Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdetectChanges"])(parentComponent);
        }, { scope: parentComponent }));
    }
    return behaviors;
}


/***/ }),

/***/ "FLgN":
/*!********************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/directives/if/if.module.ts ***!
  \********************************************************************************/
/*! exports provided: RxIfModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RxIfModule", function() { return RxIfModule; });
/* harmony import */ var _rx_if_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rx-if.directive */ "Dq9L");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


const DECLARATIONS = [_rx_if_directive__WEBPACK_IMPORTED_MODULE_0__["RxIf"]];
class RxIfModule {
}
RxIfModule.ɵfac = function RxIfModule_Factory(t) { return new (t || RxIfModule)(); };
RxIfModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: RxIfModule });
RxIfModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](RxIfModule, { declarations: [_rx_if_directive__WEBPACK_IMPORTED_MODULE_0__["RxIf"]], exports: [_rx_if_directive__WEBPACK_IMPORTED_MODULE_0__["RxIf"]] }); })();


/***/ }),

/***/ "FXx3":
/*!*********************************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/zone-agnostic/rxjs/schedulers/async/AsyncAction.ts ***!
  \*********************************************************************************************************/
/*! exports provided: AsyncAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AsyncAction", function() { return AsyncAction; });
/* harmony import */ var _Action__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Action */ "O+0E");
/* harmony import */ var _browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../browser */ "7zi/");


/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class AsyncAction extends _Action__WEBPACK_IMPORTED_MODULE_0__["Action"] {
    constructor(scheduler, work) {
        super(scheduler, work);
        this.scheduler = scheduler;
        this.work = work;
        this.pending = false;
    }
    schedule(state, delay = 0) {
        if (this.closed) {
            return this;
        }
        // Always replace the current state with the new state.
        this.state = state;
        const id = this.id;
        const scheduler = this.scheduler;
        //
        // Important implementation note:
        //
        // Actions only execute once by default, unless rescheduled from within the
        // scheduled callback. This allows us to implement single and repeat
        // actions via the same code path, without adding API surface area, as well
        // as mimic traditional recursion but across asynchronous boundaries.
        //
        // However, JS runtimes and timers distinguish between intervals achieved by
        // serial `setTimeout` calls vs. a single `setInterval` call. An interval of
        // serial `setTimeout` calls can be individually delayed, which delays
        // scheduling the next `setTimeout`, and so on. `setInterval` attempts to
        // guarantee the interval callback will be invoked more precisely to the
        // interval period, regardless of load.
        //
        // Therefore, we use `setInterval` to schedule single and repeat actions.
        // If the action reschedules itself with the same delay, the interval is not
        // canceled. If the action doesn't reschedule, or reschedules with a
        // different delay, the interval will be canceled after scheduled callback
        // execution.
        //
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, delay);
        }
        // Set the pending flag indicating that this action has been scheduled, or
        // has recursively rescheduled itself.
        this.pending = true;
        this.delay = delay;
        // If this action has already an async Id, don't request a new one.
        this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
        return this;
    }
    requestAsyncId(scheduler, id, delay = 0) {
        return Object(_browser__WEBPACK_IMPORTED_MODULE_1__["setInterval"])(scheduler.flush.bind(scheduler, this), delay);
    }
    recycleAsyncId(scheduler, id, delay = 0) {
        // If this action is rescheduled with the same delay time, don't clear the interval id.
        if (delay !== null && this.delay === delay && this.pending === false) {
            return id;
        }
        // Otherwise, if the action's delay time is different from the current delay,
        // or the action has been rescheduled before it's executed, clear the interval id
        Object(_browser__WEBPACK_IMPORTED_MODULE_1__["clearInterval"])(id);
        return undefined;
    }
    /**
     * Immediately executes this action and the `work` it contains.
     * @return {any}
     */
    execute(state, delay) {
        if (this.closed) {
            return new Error('executing a cancelled action');
        }
        this.pending = false;
        const error = this._execute(state, delay);
        if (error) {
            return error;
        }
        else if (this.pending === false && this.id != null) {
            // Dequeue if the action didn't reschedule itself. Don't call
            // unsubscribe(), because the action could reschedule later.
            // For example:
            // ```
            // scheduler.schedule(function doWork(counter) {
            //   /* ... I'm a busy worker bee ... */
            //   var originalAction = this;
            //   /* wait 100ms before rescheduling the action */
            //   setTimeout(function () {
            //     originalAction.schedule(counter + 1);
            //   }, 100);
            // }, 1000);
            // ```
            this.id = this.recycleAsyncId(this.scheduler, this.id, null);
        }
    }
    _execute(state, delay) {
        let errored = false;
        let errorValue;
        try {
            this.work(state);
        }
        catch (e) {
            errored = true;
            errorValue = (!!e && e) || new Error(e);
        }
        if (errored) {
            this.unsubscribe();
            return errorValue;
        }
    }
    /** @deprecated This is an internal implementation detail, do not use. */
    _unsubscribe() {
        const id = this.id;
        const scheduler = this.scheduler;
        const actions = scheduler.actions;
        // @ts-ignore
        const index = actions.indexOf(this);
        this.work = null;
        this.state = null;
        this.pending = false;
        this.scheduler = null;
        if (index !== -1) {
            actions.splice(index, 1);
        }
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, null);
        }
        this.delay = null;
    }
}


/***/ }),

/***/ "FYMA":
/*!******************************************************************!*\
  !*** ./libs/cdk/src/lib/template-management/template-manager.ts ***!
  \******************************************************************/
/*! exports provided: notificationKindToViewContext, createTemplateManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "notificationKindToViewContext", function() { return notificationKindToViewContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTemplateManager", function() { return createTemplateManager; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _utils_onStrategy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/onStrategy */ "PbSv");
/* harmony import */ var _utils_strategy_handling__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/strategy-handling */ "6+wS");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils */ "F2kK");





/**
 * @internal
 *
 * A factory function that returns a map of projections to turn a notification of a Observable (next, error, complete)
 *
 * @param customNextContext - projection function to provide custom properties as well as override existing
 */
function notificationKindToViewContext(customNextContext) {
    // @TODO rethink overrides
    return {
        suspense: (notification) => {
            const $implicit = notification.value;
            return Object.assign({ $implicit, $suspense: true, $error: false, $complete: false }, customNextContext($implicit));
        },
        next: (notification) => {
            const $implicit = notification.value;
            return Object.assign({ $implicit, $suspense: false, $error: false, $complete: false }, customNextContext($implicit));
        },
        error: (notification) => {
            const $implicit = notification.value;
            return Object.assign({ $implicit, $complete: false, $error: notification.error, $suspense: false }, customNextContext($implicit));
        },
        complete: (notification) => {
            const $implicit = notification.value;
            return Object.assign({ $implicit, $error: false, $complete: true, $suspense: false }, customNextContext($implicit));
        },
    };
}
function createTemplateManager(config) {
    const { renderSettings, notificationToTemplateName, templateSettings, } = config;
    const { defaultStrategyName, strategies, cdRef: injectingViewCdRef, patchZone, parent, eRef, } = renderSettings;
    const tNode = parent
        ? Object(_utils__WEBPACK_IMPORTED_MODULE_4__["getTNode"])(injectingViewCdRef, eRef.nativeElement)
        : false;
    let activeTemplate;
    const strategyHandling$ = Object(_utils_strategy_handling__WEBPACK_IMPORTED_MODULE_3__["strategyHandling"])(defaultStrategyName, strategies);
    const templates = Object(_utils__WEBPACK_IMPORTED_MODULE_4__["templateHandling"])(templateSettings.viewContainerRef);
    const viewContainerRef = templateSettings.viewContainerRef;
    const triggerHandling = config.templateTrigger$ || rxjs__WEBPACK_IMPORTED_MODULE_0__["EMPTY"];
    const getContext = notificationKindToViewContext(templateSettings.customContext);
    const workFactory = patchZone
        ? (work) => patchZone.run(work)
        : (work) => work();
    return {
        addTemplateRef: templates.add,
        // addTrigger: triggerHandling.next,
        nextStrategy: strategyHandling$.next,
        render(values$) {
            return values$.pipe(
            /* tslint:disable */
            // mergeWith(triggerHandling.trigger$ || EMPTY),
            /* tslint:enable */
            Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["withLatestFrom"])(strategyHandling$.strategy$), 
            // Cancel old renders
            Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(([notification, strategy]) => {
                const kind = notification.kind;
                const value = notification.value;
                const templateName = notificationToTemplateName[kind](value, templates);
                const template = templates.get(templateName);
                const isNewTemplate = activeTemplate !== templateName;
                const notifyParent = isNewTemplate && parent;
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["merge"])(Object(_utils_onStrategy__WEBPACK_IMPORTED_MODULE_2__["onStrategy"])(value, strategy, (v, work, options) => {
                    const context = getContext[kind](notification);
                    if (isNewTemplate) {
                        // template has changed (undefined => next; suspense => next; ...)
                        // handle remove & insert
                        // remove current view if there is any
                        if (viewContainerRef.length > 0) {
                            // patch removal if needed
                            workFactory(() => viewContainerRef.clear());
                        }
                        // create new view if any
                        if (template) {
                            // createEmbeddedView is already patched, no need for workFactory
                            workFactory(() => templates.createEmbeddedView(templateName, context));
                        }
                    }
                    else if (template) {
                        // template didn't change, update it
                        // handle update
                        const view = viewContainerRef.get(0);
                        Object.keys(context).forEach((k) => {
                            view.context[k] = context[k];
                        });
                        // update view context, patch if needed
                        workFactory(() => work(view, options.scope, notification));
                    }
                    activeTemplate = templateName;
                }
                // we don't need to specify any scope here. The template manager is the only one
                // who will call `viewRef#detectChanges` on any of the templates it manages.
                // whenever a new value comes in, any pre-scheduled work of this taskManager will
                // be nooped before a new work will be scheduled. This happens because of the implementation
                // of `StrategyCredential#behavior`
                ).pipe(Object(_utils__WEBPACK_IMPORTED_MODULE_4__["notifyAllParentsIfNeeded"])(tNode, injectingViewCdRef, strategy, () => notifyParent)), Object(_utils__WEBPACK_IMPORTED_MODULE_4__["notifyInjectingParentIfNeeded"])(injectingViewCdRef, strategy, isNewTemplate).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["ignoreElements"])()));
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])((e) => {
                console.error(e);
                return rxjs__WEBPACK_IMPORTED_MODULE_0__["EMPTY"];
            }));
        },
    };
}


/***/ }),

/***/ "FflV":
/*!*********************************************!*\
  !*** ./libs/cdk/src/lib/zone-less/utils.ts ***!
  \*********************************************/
/*! exports provided: getZoneUnPatchedApi */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getZoneUnPatchedApi", function() { return getZoneUnPatchedApi; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

/**
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
    elem = elem || _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵglobal"];
    const isPatched = elem['__zone_symbol__' + name] !== undefined;
    return isPatched ? elem['__zone_symbol__' + name] : elem[name];
}


/***/ }),

/***/ "FomE":
/*!*************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/pipes/pipe/index.ts ***!
  \*************************************************************************/
/*! exports provided: PipePipe, PipeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pipe_pipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pipe.pipe */ "9EiU");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PipePipe", function() { return _pipe_pipe__WEBPACK_IMPORTED_MODULE_0__["PipePipe"]; });

/* harmony import */ var _pipe_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pipe.module */ "CapS");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PipeModule", function() { return _pipe_module__WEBPACK_IMPORTED_MODULE_1__["PipeModule"]; });





/***/ }),

/***/ "G3w/":
/*!*************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/pipe-from-array.ts ***!
  \*************************************************************************/
/*! exports provided: pipeFromArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pipeFromArray", function() { return pipeFromArray; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");

function pipeFromArray(fns) {
    if (!fns) {
        return rxjs__WEBPACK_IMPORTED_MODULE_0__["noop"];
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce((prev, fn) => fn(prev), input);
    };
}


/***/ }),

/***/ "GUy1":
/*!*************************************************************!*\
  !*** ./libs/template/src/lib/core/utils/get-global-this.ts ***!
  \*************************************************************/
/*! exports provided: getGlobalThis */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getGlobalThis", function() { return getGlobalThis; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

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
    return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵglobal"];
}


/***/ }),

/***/ "GdMm":
/*!***************************************************************************!*\
  !*** ./libs/cdk/src/lib/zone-less/rxjs/scheduler/queue/QueueScheduler.ts ***!
  \***************************************************************************/
/*! exports provided: QueueScheduler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueueScheduler", function() { return QueueScheduler; });
/* harmony import */ var _async_AsyncScheduler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../async/AsyncScheduler */ "QFH2");
// tslint:disable

class QueueScheduler extends _async_AsyncScheduler__WEBPACK_IMPORTED_MODULE_0__["AsyncScheduler"] {
}


/***/ }),

/***/ "GiYN":
/*!**************************************************************************************************!*\
  !*** ./libs/template/src/lib/experimental/viewport-prio/viewport-prio.experimental.directive.ts ***!
  \**************************************************************************************************/
/*! exports provided: ViewportPrioDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewportPrioDirective", function() { return ViewportPrioDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _rx_angular_cdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @rx-angular/cdk */ "cDIL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core */ "iki6");
/* harmony import */ var _let_let_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../let/let.directive */ "cihl");









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
    const addEventListener = Object(_core__WEBPACK_IMPORTED_MODULE_4__["getZoneUnPatchedApi"])('addEventListener', elem).bind(elem);
    eventListeners.forEach((listener) => {
        // Remove and reapply listeners with patched API
        elem.removeEventListener(event, listener);
        // Reapply listeners with un-patched API
        addEventListener(event, listener);
    });
}
function intersectionObserver(options) {
    const subject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
    const observer = observerSupported()
        ? new IntersectionObserver((entries) => {
            entries.forEach((entry) => subject.next(entry));
        }, options)
        : null;
    const entries$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"]((subscriber) => {
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
        unobserve: observer.unobserve,
    };
}
const observerSupported = () => typeof window !== 'undefined'
    ? !!window.IntersectionObserver
    : false;
class ViewportPrioDirective {
    constructor(el, strategyProvider, letDirective) {
        this.el = el;
        this.strategyProvider = strategyProvider;
        this.letDirective = letDirective;
        // Note that we're picking only the `intersectionRatio` property
        // since this is the only property that we're intersted in.
        this.entriesSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.entries$ = this.entriesSubject.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["mergeAll"])());
        this._viewportPrio = 'noop';
        /* @Input('viewport-prio')
        set viewportPrio(prio) {
          if (prio) {
            this._viewportPrio = prio || 'noop';
          }
        }*/
        this.observer = observerSupported()
            ? new IntersectionObserver((entries) => {
                this.entriesSubject.next(entries);
            }, {
                threshold: 0,
            })
            : null;
        this.visibilityEvents$ = this.entries$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])((entry) => {
            if (entry.intersectionRatio > 0) {
                return 'visible';
            }
            else {
                return 'invisible';
            }
        }));
    }
    ngOnInit() {
        const letStrategyName$ = this.letDirective['strategyHandler'].values$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])((name) => name !== this._viewportPrio));
        this.visibilityEvents$
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["withLatestFrom"])(letStrategyName$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(([visibility, strategyName]) => visibility === 'visible' ? strategyName : this._viewportPrio))
            .subscribe((strategyName) => {
            this.letDirective.strategy = strategyName;
            // render actual state on viewport enter
            // @TODO this doesnt catch unsubscribe (cant be cancelled)
            // @TODO: we need to fetch the current template of the letDirective here
            // this.strategyProvider.scheduleCD()
        });
        // If the browser doesn't support the `IntersectionObserver` or we're inside
        // the Node.js environment, then this will throw an exception that property
        // `observe` doesn't exist on `null`.
        if (this.observer !== null) {
            this.observer.observe(this.el.nativeElement);
        }
        else {
            // If we're inside the Node.js environment then this should be
            // rendered (e.g. for SEO purposes), and when running this code in browser
            // it will decide itself to render it or not.
            this.entriesSubject.next([{ intersectionRatio: 1 }]);
        }
    }
    ngOnDestroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}
ViewportPrioDirective.ɵfac = function ViewportPrioDirective_Factory(t) { return new (t || ViewportPrioDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_1__["RxStrategyProvider"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_let_let_directive__WEBPACK_IMPORTED_MODULE_5__["LetDirective"], 8)); };
ViewportPrioDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: ViewportPrioDirective, selectors: [["", "viewport-prio", ""]] });


/***/ }),

/***/ "GtnG":
/*!********************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/pipes/index.ts ***!
  \********************************************************************/
/*! exports provided: getMemoizedFn, MemoModule, MemoPipe, PipePipe, PipeModule, PushPipe, PushModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _memo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./memo */ "tIiS");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getMemoizedFn", function() { return _memo__WEBPACK_IMPORTED_MODULE_0__["getMemoizedFn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MemoModule", function() { return _memo__WEBPACK_IMPORTED_MODULE_0__["MemoModule"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MemoPipe", function() { return _memo__WEBPACK_IMPORTED_MODULE_0__["MemoPipe"]; });

/* harmony import */ var _pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pipe */ "FomE");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PipePipe", function() { return _pipe__WEBPACK_IMPORTED_MODULE_1__["PipePipe"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PipeModule", function() { return _pipe__WEBPACK_IMPORTED_MODULE_1__["PipeModule"]; });

/* harmony import */ var _push__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./push */ "QMWD");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PushPipe", function() { return _push__WEBPACK_IMPORTED_MODULE_2__["PushPipe"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PushModule", function() { return _push__WEBPACK_IMPORTED_MODULE_2__["PushModule"]; });






/***/ }),

/***/ "Gv0n":
/*!**********************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/directives/let/let.module.ts ***!
  \**********************************************************************************/
/*! exports provided: RxLetModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RxLetModule", function() { return RxLetModule; });
/* harmony import */ var _rx_let_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rx-let.directive */ "XklV");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


const DECLARATIONS = [
    _rx_let_directive__WEBPACK_IMPORTED_MODULE_0__["RxLet"]
];
class RxLetModule {
}
RxLetModule.ɵfac = function RxLetModule_Factory(t) { return new (t || RxLetModule)(); };
RxLetModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: RxLetModule });
RxLetModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](RxLetModule, { declarations: [_rx_let_directive__WEBPACK_IMPORTED_MODULE_0__["RxLet"]], exports: [_rx_let_directive__WEBPACK_IMPORTED_MODULE_0__["RxLet"]] }); })();


/***/ }),

/***/ "HMd7":
/*!***************************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/zone-agnostic/rxjs/schedulers/queue/queue.ts ***!
  \***************************************************************************************************/
/*! exports provided: queueScheduler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queueScheduler", function() { return queueScheduler; });
/* harmony import */ var _QueueAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./QueueAction */ "0RMi");
/* harmony import */ var _QueueScheduler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./QueueScheduler */ "ZtsM");
// tslint:disable file-name-casing


/**
 *
 * NOTE: This is a zone un-patched version of rxjs queueScheduler
 *
 * Queue Scheduler
 *
 * <span class="informal">Put every next task on a queue, instead of executing it immediately</span>
 *
 * `queue` scheduler, when used with delay, behaves the same as {@link asyncScheduler} scheduler.
 *
 * When used without delay, it schedules given task synchronously - executes it right when
 * it is scheduled. However when called recursively, that is when inside the scheduled task,
 * another task is scheduled with queue scheduler, instead of executing immediately as well,
 * that task will be put on a queue and wait for current one to finish.
 *
 * This means that when you execute task with `queue` scheduler, you are sure it will end
 * before any other task scheduled with that scheduler will start.
 *
 * ## Examples
 * Schedule recursively first, then do something
 * ```ts
 * import { queueScheduler } from '@cu/perf-utils';
 *
 * queueScheduler.schedule(() => {
 *   queueScheduler.schedule(() => console.log('second')); // will not happen now, but will be put on a queue
 *
 *   console.log('first');
 * });
 *
 * // Logs:
 * // "first"
 * // "second"
 * ```
 *
 * Reschedule itself recursively
 * ```ts
 * import { queueScheduler } from '@cu/perf-utils';
 *
 * queueScheduler.schedule(function(state) {
 *   if (state !== 0) {
 *     console.log('before', state);
 *     this.schedule(state - 1); // `this` references currently executing Action,
 *                               // which we reschedule with new state
 *     console.log('after', state);
 *   }
 * }, 0, 3);
 *
 * // In scheduler that runs recursively, you would expect:
 * // "before", 3
 * // "before", 2
 * // "before", 1
 * // "after", 1
 * // "after", 2
 * // "after", 3
 *
 * // But with queue it logs:
 * // "before", 3
 * // "after", 3
 * // "before", 2
 * // "after", 2
 * // "before", 1
 * // "after", 1
 * ```
 */
const queueScheduler = new _QueueScheduler__WEBPACK_IMPORTED_MODULE_1__["QueueScheduler"](_QueueAction__WEBPACK_IMPORTED_MODULE_0__["QueueAction"]);


/***/ }),

/***/ "HU3c":
/*!********************************************************************!*\
  !*** ./libs/state/src/lib/transformation-helpers/object/toggle.ts ***!
  \********************************************************************/
/*! exports provided: toggle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggle", function() { return toggle; });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core */ "jym9");

/**
 * @description
 * Toggles a boolean property in the object.
 * Accepts object of type T and key value of which is boolean.
 * Toggles the property and returns a shallow copy of an object, while not mutating the original one.
 *
 * @example
 *
 * const state = {items: [1,2,3], loading: true};
 *
 * const updatedState = toggle(state, 'loading');
 *
 * // updatedState will be:
 * // {items: [1,2,3], loading: false};
 *
 * @example
 * // Usage with RxState
 *
 * export class ListComponent {
 *    readonly loadingChange$ = new Subject();
 *
 *    constructor(
 *      private state: RxState<ComponentState>
 *    ) {
 *      // Reactive implementation
 *      state.connect(
 *        this.api.loadingChange$,
 *        (state, _) => {
 *            return toggle(state, 'isLoading');
 *        }
 *      );
 *    }
 *
 *    // Imperative implementation
 *    toggleLoading(): void {
 *      this.set(toggle(state, 'isLoading'));
 *    }
 * }
 *
 * @returns T
 *
 * @docsPage toggle
 * @docsCategory transformation-helpers
 */
function toggle(object, key) {
    const objectIsObject = Object(_core__WEBPACK_IMPORTED_MODULE_0__["isObjectGuard"])(object);
    const keyIsValid = Object(_core__WEBPACK_IMPORTED_MODULE_0__["isKeyOf"])(key);
    const initialObject = objectIsObject ? object : {};
    if (!objectIsObject) {
        console.warn(`Toggle: original value (${object}) is not an object.`);
    }
    if (!keyIsValid) {
        console.warn(`Toggle: key argument (${key}) is invalid.`);
    }
    if (keyIsValid && typeof initialObject[key] !== 'boolean') {
        console.warn(`Toggle: value of the key (${key}) is not a boolean.`);
    }
    if (!Object(_core__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(object) && !keyIsValid) {
        return object;
    }
    if (keyIsValid &&
        (typeof initialObject[key] === 'boolean' ||
            !initialObject.hasOwnProperty(key))) {
        return Object.assign(Object.assign({}, initialObject), { [key]: !initialObject[key] });
    }
    return Object.assign({}, initialObject);
}


/***/ }),

/***/ "HXgo":
/*!*******************************************************************************************!*\
  !*** ./apps/demos/src/app/app-component/app-control-panel/app-control-panel.component.ts ***!
  \*******************************************************************************************/
/*! exports provided: AppControlPanelComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppControlPanelComponent", function() { return AppControlPanelComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_config_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../app-config.service */ "uloo");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _shared_ripple_rxa_responsive_meter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/ripple/rxa-responsive-meter */ "ArS7");
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/platform */ "nLfN");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../rx-angular-pocs */ "caVP");
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/chips */ "A5z7");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _libs_template_src_lib_let_let_directive__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../../libs/template/src/lib/let/let.directive */ "cihl");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/slide-toggle */ "1jcm");















function AppControlPanelComponent_mat_slide_toggle_10_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-slide-toggle", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function AppControlPanelComponent_mat_slide_toggle_10_Template_mat_slide_toggle_change_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r3.toggleCdRipple$.next($event.checked); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "CD ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const rippleOn_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("checked", rippleOn_r2);
} }
function AppControlPanelComponent_mat_slide_toggle_11_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-slide-toggle", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function AppControlPanelComponent_mat_slide_toggle_11_Template_mat_slide_toggle_change_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r7); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r6.toggleResponsiveRipple$.next($event.checked); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "non-blocking ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const rippleOn_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("checked", rippleOn_r5);
} }
class AppControlPanelComponent {
    constructor(appConfig, elementRef, platform) {
        this.appConfig = appConfig;
        this.elementRef = elementRef;
        this.platform = platform;
        this.toggleCdRipple$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](false);
        this.toggleResponsiveRipple$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](false);
        this.rippleOn$ = this.appConfig.select('rippleOn');
        this.appConfig.connect('rippleOn', this.toggleCdRipple$);
        this.appConfig.connect('rippleResponsiveOn', this.toggleResponsiveRipple$);
        this.appConfig.hold(this.appConfig.select('rippleResponsiveOn').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["switchMap"])((isOn) => (isOn ? Object(_rx_angular_pocs__WEBPACK_IMPORTED_MODULE_6__["interval"])(300) : rxjs__WEBPACK_IMPORTED_MODULE_2__["EMPTY"])), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["filter"])(() => !!this.rp)), (v) => {
            console.log('v', v);
            this.rp.fadeInRipple(0, 0);
        });
    }
    ngAfterViewInit() {
        this.setupRipple();
    }
    tick() {
        this.appConfig.appRef_tick();
    }
    setupRipple() {
        this.rp = new _shared_ripple_rxa_responsive_meter__WEBPACK_IMPORTED_MODULE_3__["RippleRenderer"](this.elementRef, this.platform);
    }
}
AppControlPanelComponent.ɵfac = function AppControlPanelComponent_Factory(t) { return new (t || AppControlPanelComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_app_config_service__WEBPACK_IMPORTED_MODULE_1__["AppConfigService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"])); };
AppControlPanelComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppControlPanelComponent, selectors: [["rxa-config-panel"]], decls: 16, vars: 6, consts: [[1, "d-flex", "align-items-center"], ["color", "primary", 3, "selected"], ["matChipAvatar", ""], [3, "checked", "change", 4, "rxLet"], ["unpatch", "", "mat-button", "", 1, "mx-2", 3, "click"], [3, "checked", "change"]], template: function AppControlPanelComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-chip-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-chip", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-icon", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "snooze");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "mat-chip", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "mat-icon", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "build_circle");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, AppControlPanelComponent_mat_slide_toggle_10_Template, 2, 1, "mat-slide-toggle", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, AppControlPanelComponent_mat_slide_toggle_11_Template, 2, 1, "mat-slide-toggle", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppControlPanelComponent_Template_button_click_12_listener() { return ctx.tick(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "account_tree");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, " ApplicationRef.tick() ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("selected", ctx.appConfig.hasZone);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.appConfig.zoneEnv, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("selected", ctx.appConfig.devMode);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.appConfig.devMode ? "Development" : "Production", "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("rxLet", ctx.rippleOn$);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("rxLet", ctx.rippleOn$);
    } }, directives: [_angular_material_chips__WEBPACK_IMPORTED_MODULE_7__["MatChipList"], _angular_material_chips__WEBPACK_IMPORTED_MODULE_7__["MatChip"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__["MatIcon"], _angular_material_chips__WEBPACK_IMPORTED_MODULE_7__["MatChipAvatar"], _libs_template_src_lib_let_let_directive__WEBPACK_IMPORTED_MODULE_9__["LetDirective"], _angular_material_button__WEBPACK_IMPORTED_MODULE_10__["MatButton"], _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_11__["MatSlideToggle"]], styles: ["rxa-strategy-select[_ngcontent-%COMP%] {\n        font-size: 14px;\n        margin-top: 18px;\n      }"], changeDetection: 0 });


/***/ }),

/***/ "Hr6l":
/*!*****************************************************!*\
  !*** ./libs/state/src/lib/core/utils/safe-pluck.ts ***!
  \*****************************************************/
/*! exports provided: safePluck */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "safePluck", function() { return safePluck; });
/* harmony import */ var _guards__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./guards */ "jPSe");

function safePluck(stateObject, keys) {
    // needed to match null and undefined conventions of RxAngular core components
    // safePluck(null) -> return null
    // safePluck(undefined) -> return undefined
    // safePluck(obj, ['wrongKey']) -> return undefined
    // safePluck(obj, ['correctKey']) -> return value of key
    // safePluck(obj, '') -> return undefined
    // safePluck(obj, null) -> return undefined
    if (!Object(_guards__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(stateObject)) {
        return stateObject;
    }
    if (!Object(_guards__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(keys)) {
        return undefined;
    }
    // sanitize keys -> keep only valid keys (string, number, symbol)
    const keysArr = (Array.isArray(keys) ? keys : [keys]).filter(k => Object(_guards__WEBPACK_IMPORTED_MODULE_0__["isKeyOf"])(k));
    if (keysArr.length === 0 ||
        !Object(_guards__WEBPACK_IMPORTED_MODULE_0__["isObjectGuard"])(stateObject) ||
        Object.keys(stateObject).length === 0) {
        return undefined;
    }
    let prop = stateObject[keysArr.shift()];
    keysArr.forEach(key => {
        if (Object(_guards__WEBPACK_IMPORTED_MODULE_0__["isObjectGuard"])(prop) && Object(_guards__WEBPACK_IMPORTED_MODULE_0__["isKeyOf"])(key)) {
            prop = prop[key];
        }
    });
    return prop;
}


/***/ }),

/***/ "I98Z":
/*!********************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/decorators/index.ts ***!
  \********************************************************************/
/*! exports provided: renderOnChange */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stateful__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stateful */ "yvEk");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "renderOnChange", function() { return _stateful__WEBPACK_IMPORTED_MODULE_0__["renderOnChange"]; });




/***/ }),

/***/ "IFT9":
/*!**************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/index.ts ***!
  \**************************************************************/
/*! exports provided: RxLetTemplateNames, RxLet, RxLetModule, RxIfTemplateNames, RxIf, RxIfModule, RxSwichModule, RxSwitchCase, RxSwitch, RxFor, RxForModule, unpatchEventListener, UnpatchEventsDirective, UnpatchEventsModule, IfVisibleDirective, IfVisibleModule, RxContextTemplateNames, RxContext, RxContextContainer, RxContextModule, getMemoizedFn, MemoModule, MemoPipe, PipePipe, PipeModule, PushPipe, PushModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _directives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./directives */ "/raB");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxLetTemplateNames", function() { return _directives__WEBPACK_IMPORTED_MODULE_0__["RxLetTemplateNames"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxLet", function() { return _directives__WEBPACK_IMPORTED_MODULE_0__["RxLet"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxLetModule", function() { return _directives__WEBPACK_IMPORTED_MODULE_0__["RxLetModule"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxIfTemplateNames", function() { return _directives__WEBPACK_IMPORTED_MODULE_0__["RxIfTemplateNames"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxIf", function() { return _directives__WEBPACK_IMPORTED_MODULE_0__["RxIf"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxIfModule", function() { return _directives__WEBPACK_IMPORTED_MODULE_0__["RxIfModule"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxSwichModule", function() { return _directives__WEBPACK_IMPORTED_MODULE_0__["RxSwichModule"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxSwitchCase", function() { return _directives__WEBPACK_IMPORTED_MODULE_0__["RxSwitchCase"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxSwitch", function() { return _directives__WEBPACK_IMPORTED_MODULE_0__["RxSwitch"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxFor", function() { return _directives__WEBPACK_IMPORTED_MODULE_0__["RxFor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxForModule", function() { return _directives__WEBPACK_IMPORTED_MODULE_0__["RxForModule"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "unpatchEventListener", function() { return _directives__WEBPACK_IMPORTED_MODULE_0__["unpatchEventListener"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UnpatchEventsDirective", function() { return _directives__WEBPACK_IMPORTED_MODULE_0__["UnpatchEventsDirective"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UnpatchEventsModule", function() { return _directives__WEBPACK_IMPORTED_MODULE_0__["UnpatchEventsModule"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IfVisibleDirective", function() { return _directives__WEBPACK_IMPORTED_MODULE_0__["IfVisibleDirective"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IfVisibleModule", function() { return _directives__WEBPACK_IMPORTED_MODULE_0__["IfVisibleModule"]; });

/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components */ "/fku");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxContextTemplateNames", function() { return _components__WEBPACK_IMPORTED_MODULE_1__["RxContextTemplateNames"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxContext", function() { return _components__WEBPACK_IMPORTED_MODULE_1__["RxContext"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxContextContainer", function() { return _components__WEBPACK_IMPORTED_MODULE_1__["RxContextContainer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxContextModule", function() { return _components__WEBPACK_IMPORTED_MODULE_1__["RxContextModule"]; });

/* harmony import */ var _pipes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pipes */ "GtnG");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getMemoizedFn", function() { return _pipes__WEBPACK_IMPORTED_MODULE_2__["getMemoizedFn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MemoModule", function() { return _pipes__WEBPACK_IMPORTED_MODULE_2__["MemoModule"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MemoPipe", function() { return _pipes__WEBPACK_IMPORTED_MODULE_2__["MemoPipe"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PipePipe", function() { return _pipes__WEBPACK_IMPORTED_MODULE_2__["PipePipe"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PipeModule", function() { return _pipes__WEBPACK_IMPORTED_MODULE_2__["PipeModule"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PushPipe", function() { return _pipes__WEBPACK_IMPORTED_MODULE_2__["PushPipe"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PushModule", function() { return _pipes__WEBPACK_IMPORTED_MODULE_2__["PushModule"]; });






/***/ }),

/***/ "IIuQ":
/*!**********************************************************!*\
  !*** ./apps/demos/src/app/app-shell/app-shell.module.ts ***!
  \**********************************************************/
/*! exports provided: AppShellModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppShellModule", function() { return AppShellModule; });
/* harmony import */ var _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/cdk/tree */ "FvrZ");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/select */ "d3UM");
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/sidenav */ "XhcP");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/toolbar */ "/t3+");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _app_shell_content_directives__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./app-shell-content.directives */ "wM/s");
/* harmony import */ var _app_shell_component_app_shell_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./app-shell-component/app-shell.component */ "dp3i");
/* harmony import */ var _side_nav_side_nav_item_directive__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./side-nav/side-nav-item.directive */ "jvPn");
/* harmony import */ var _side_nav_side_nav_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./side-nav/side-nav.component */ "+T49");
/* harmony import */ var _rx_angular_pocs_template_directives_let__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../rx-angular-pocs/template/directives/let */ "poug");
/* harmony import */ var _rx_angular_pocs_template_directives_if__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../rx-angular-pocs/template/directives/if */ "3/sx");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/core */ "fXoL");
















const exportedDeclarations = [
    _app_shell_content_directives__WEBPACK_IMPORTED_MODULE_9__["AppShellHeaderContent"],
    _app_shell_content_directives__WEBPACK_IMPORTED_MODULE_9__["AppShellSidenavContent"],
    _app_shell_component_app_shell_component__WEBPACK_IMPORTED_MODULE_10__["AppShellComponent"],
    _app_shell_content_directives__WEBPACK_IMPORTED_MODULE_9__["AppShellSidenavTitle"],
    _side_nav_side_nav_component__WEBPACK_IMPORTED_MODULE_12__["AppShellSideNavComponent"],
];
class AppShellModule {
}
AppShellModule.ɵfac = function AppShellModule_Factory(t) { return new (t || AppShellModule)(); };
AppShellModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdefineNgModule"]({ type: AppShellModule });
AppShellModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_6__["MatSidenavModule"],
            _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_7__["MatToolbarModule"],
            _angular_material_list__WEBPACK_IMPORTED_MODULE_4__["MatListModule"],
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__["MatIconModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_8__["RouterModule"],
            _angular_material_select__WEBPACK_IMPORTED_MODULE_5__["MatSelectModule"],
            _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_0__["CdkTreeModule"],
            _rx_angular_pocs_template_directives_let__WEBPACK_IMPORTED_MODULE_13__["RxLetModule"],
            _rx_angular_pocs_template_directives_if__WEBPACK_IMPORTED_MODULE_14__["RxIfModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵsetNgModuleScope"](AppShellModule, { declarations: [_app_shell_content_directives__WEBPACK_IMPORTED_MODULE_9__["AppShellHeaderContent"],
        _app_shell_content_directives__WEBPACK_IMPORTED_MODULE_9__["AppShellSidenavContent"],
        _app_shell_component_app_shell_component__WEBPACK_IMPORTED_MODULE_10__["AppShellComponent"],
        _app_shell_content_directives__WEBPACK_IMPORTED_MODULE_9__["AppShellSidenavTitle"],
        _side_nav_side_nav_component__WEBPACK_IMPORTED_MODULE_12__["AppShellSideNavComponent"], _side_nav_side_nav_item_directive__WEBPACK_IMPORTED_MODULE_11__["AppShellSideNavItemDirective"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_6__["MatSidenavModule"],
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_7__["MatToolbarModule"],
        _angular_material_list__WEBPACK_IMPORTED_MODULE_4__["MatListModule"],
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__["MatIconModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"],
        _angular_router__WEBPACK_IMPORTED_MODULE_8__["RouterModule"],
        _angular_material_select__WEBPACK_IMPORTED_MODULE_5__["MatSelectModule"],
        _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_0__["CdkTreeModule"],
        _rx_angular_pocs_template_directives_let__WEBPACK_IMPORTED_MODULE_13__["RxLetModule"],
        _rx_angular_pocs_template_directives_if__WEBPACK_IMPORTED_MODULE_14__["RxIfModule"]], exports: [_app_shell_content_directives__WEBPACK_IMPORTED_MODULE_9__["AppShellHeaderContent"],
        _app_shell_content_directives__WEBPACK_IMPORTED_MODULE_9__["AppShellSidenavContent"],
        _app_shell_component_app_shell_component__WEBPACK_IMPORTED_MODULE_10__["AppShellComponent"],
        _app_shell_content_directives__WEBPACK_IMPORTED_MODULE_9__["AppShellSidenavTitle"],
        _side_nav_side_nav_component__WEBPACK_IMPORTED_MODULE_12__["AppShellSideNavComponent"]] }); })();


/***/ }),

/***/ "It4N":
/*!************************************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/zone-agnostic/rxjs/schedulers/async/AsyncScheduler.ts ***!
  \************************************************************************************************************/
/*! exports provided: AsyncScheduler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AsyncScheduler", function() { return AsyncScheduler; });
/* harmony import */ var _Scheduler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Scheduler */ "ep1A");

class AsyncScheduler extends _Scheduler__WEBPACK_IMPORTED_MODULE_0__["Scheduler"] {
    constructor(SchedulerAction, now = _Scheduler__WEBPACK_IMPORTED_MODULE_0__["Scheduler"].now) {
        super(SchedulerAction, () => {
            if (AsyncScheduler.delegate && AsyncScheduler.delegate !== this) {
                return AsyncScheduler.delegate.now();
            }
            else {
                return now();
            }
        });
        this.actions = [];
        /**
         * A flag to indicate whether the Scheduler is currently executing a batch of
         * queued actions.
         * @type {boolean}
         * @deprecated internal use only
         */
        this.active = false;
        /**
         * An internal ID used to track the latest asynchronous task such as those
         * coming from `setTimeout`, `setInterval`, `requestAnimationFrame`, and
         * others.
         * @type {any}
         * @deprecated internal use only
         */
        this.scheduled = undefined;
    }
    schedule(work, delay = 0, state) {
        if (AsyncScheduler.delegate && AsyncScheduler.delegate !== this) {
            return AsyncScheduler.delegate.schedule(work, delay, state);
        }
        else {
            return super.schedule(work, delay, state);
        }
    }
    flush(action) {
        const { actions } = this;
        if (this.active) {
            actions.push(action);
            return;
        }
        let error;
        this.active = true;
        do {
            if ((error = action.execute(action.state, action.delay))) {
                break;
            }
            // @ts-ignore
        } while ((action = actions.shift())); // exhaust the scheduler queue
        this.active = false;
        if (error) {
            // @ts-ignore
            while ((action = actions.shift())) {
                action.unsubscribe();
            }
            throw error;
        }
    }
}


/***/ }),

/***/ "J+a4":
/*!****************************************************!*\
  !*** ./apps/demos/src/app/shared/utils/measure.ts ***!
  \****************************************************/
/*! exports provided: PREFIX, mark, start, end, measure, getEntries, measure$, promiseMarkerFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PREFIX", function() { return PREFIX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mark", function() { return mark; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "start", function() { return start; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "end", function() { return end; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "measure", function() { return measure; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEntries", function() { return getEntries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "measure$", function() { return measure$; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "promiseMarkerFactory", function() { return promiseMarkerFactory; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
// tslint:disable:no-console

/**
 * @NOTICE GENERAL INFORMATION ON MEASUREMENT NOISE
 * Notes on measurement overhead console.time vs. performance.mark cn be found here:
 * https://gist.github.com/paulirish/2fad3834e2617fb199bc12e17058dde4
 */
const PREFIX = 'RXA-MEASURE';
const POSTFIX_START = 'START';
const POSTFIX_END = 'END';
let i = 0;
const rxaDebug = {
    getEntries,
    measure
};
window.rxaDebug = rxaDebug;
/**
 * Used performance.mark to generate a TimingMark
 * @param label
 */
function mark(label = ++i + '') {
    performance.mark(`${PREFIX}-${label}`);
}
/**
 * Used performance.mark to generate a postfixes TimingMark for a starting mark
 * @param label
 * @return A function that marks the end of the respective measurement
 */
function start(label = ++i + '') {
    const startLabel = `${label}-${POSTFIX_START}`;
    const endLabel = `${label}-${POSTFIX_END}`;
    mark(startLabel);
    return () => {
        end(label);
        return () => {
            measure(startLabel, endLabel);
        };
    };
}
/**
 * Used performance.mark to generate a postfixes TimingMark for a ending mark
 * @param label
 * @return A function that measures the start to end timing
 */
function end(label = ++i + '') {
    mark(`${label}-${POSTFIX_END}`);
}
/**
 * Used performance.measure to generate a measurement for 2 TimingMarks
 */
function measure(startLabel, endLabel, measureName) {
    measureName = measureName ? measureName : `${PREFIX}-${startLabel}--${endLabel}`;
    performance.measure(measureName, `${PREFIX}-${startLabel}`, `${PREFIX}-${endLabel}`);
    const { name, duration } = performance.getEntriesByName(measureName)[0];
    console.log(`${name}: ${duration}`);
}
function getEntries() {
    return performance.getEntries().filter(e => e.name.indexOf(PREFIX) === 0);
}
/**
 * Measures the observable lifecycle based on the generated marks
 *
 * @example
 *
 * @param label
 */
const observableMarkerFactory = (label) => {
    const observableMarks = {
        subscribe: () => label + '$subscribe',
        next: (n) => label + '$next_' + n + '',
        error: (e) => label + '$error_' + e + '',
        complete: () => label + '$complete',
        unsubscribe: () => label + '$unsubscribe',
        teardown: () => label + '$teardown'
    };
    const observableMeasures = {
        total: [label + 'total', observableMarks.subscribe(), observableMarks.teardown()]
    };
    return ({
        subscribe: () => {
            mark(observableMarks.subscribe());
        },
        next: (v) => {
            mark(observableMarks.next(v));
        },
        error: (e) => {
            mark(observableMarks.error(e));
        },
        complete: () => {
            mark(observableMarks.complete());
        },
        unsubscribe: () => {
            mark(observableMarks.unsubscribe());
        },
        teardown: () => {
            mark(observableMarks.teardown());
        },
        eval: () => {
            console.log('eval');
            // @ts-ignore
            measure(...observableMeasures.total);
            const { name, duration } = performance.getEntriesByName(observableMeasures.total[0])[0];
            console.log(`${name}: ${duration}`);
        }
    });
};
/**
 * Marks the observable lifecycle with TimingMarks
 *
 * @param label
 */
function measure$(label = ++i + '') {
    const marker = observableMarkerFactory(label);
    return o$ => new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"]((subscriber) => {
        marker.subscribe();
        const sub = o$.subscribe((n) => {
            marker.next(n);
            subscriber.next(n);
        }, (e) => {
            marker.error(e);
            subscriber.error(e);
        }, () => {
            marker.complete();
            subscriber.complete();
        });
        return () => {
            marker.teardown();
            sub.unsubscribe();
            marker.eval();
        };
    });
}
function promiseMarkerFactory(label) {
    const promiseMarks = {
        start: () => label + '-Pstart',
        then: (r) => label + '-Pthen',
        catch: (e) => label + '-Pcatch',
        finally: () => label + '-Pfinally'
    };
    const promiseMeasures = {
        total: [promiseMarks.start(), promiseMarks.finally(), label + 'total']
    };
    function _then(r) {
        mark(promiseMarks.then(r));
    }
    function _start() {
        mark(promiseMarks.start());
    }
    function _catch(e) {
        mark(promiseMarks.catch(e));
    }
    function _finally() {
        mark(promiseMarks.finally());
    }
    function _eval() {
        // @ts-ignore
        measure(...promiseMeasures.total);
    }
    return {
        wrap: (p) => {
            _start();
            return p
                .then(r => {
                _then(r);
                return Promise.resolve(r);
            })
                .catch(e => {
                _catch(e);
                return Promise.reject(e);
            })
                .finally(() => {
                _finally();
                _eval();
            });
        }
    };
}


/***/ }),

/***/ "JR+X":
/*!*************************************************************************!*\
  !*** ./libs/state/src/lib/transformation-helpers/array/toDictionary.ts ***!
  \*************************************************************************/
/*! exports provided: toDictionary */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toDictionary", function() { return toDictionary; });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core */ "jym9");

/**
 * @description
 * Converts an array of objects to a dictionary {[key: string]: T}.
 * Accepts array T[] and key of type string, number or symbol as inputs.
 *
 *
 * @example
 *
 * const creatures = [{id: 1, type: 'cat'}, {id: 2, type: 'dog'}, {id: 3, type: 'parrot'}];
 *
 * const creaturesDictionary = toDictionary(creatures, 'id');
 *
 * // creaturesDictionary will be:
 * // {
 * //  1: {id: 1, type: 'cat'},
 * //  2: {id: 2, type: 'dog'},
 * //  3: {id: 3, type: 'parrot'}
 * // };
 * @example
 * // Usage with RxState
 *
 * export class ListComponent {
 *
 *    readonly convertToDictionary$ = new Subject();
 *
 *    constructor(private state: RxState<ComponentState>) {
 *      // Reactive implementation
 *      state.connect(
 *        'creaturesDictionary',
 *        this.convertToDictionary$,
 *        ({ creatures }) => {
 *            return toDictionary(creatures, 'id');
 *        }
 *      );
 *    }
 *
 *    // Imperative implementation
 *    convertToDictionary(): void {
 *        this.state.set({ creaturesDictionary: toDictionary(this.state.get().creatures, 'id'});
 *    }
 * }
 *
 * @see {@link OnlyKeysOfSpecificType}
 * @param {OnlyKeysOfSpecificType<T, S>} key
 * @returns { [key: string]: T[] }
 * @docsPage toDictionary
 * @docsCategory transformation-helpers
 */
function toDictionary(source, key) {
    if (!Object(_core__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(source)) {
        return source;
    }
    const sourceEmpty = !source.length;
    if (!Array.isArray(source) || sourceEmpty || !Object(_core__WEBPACK_IMPORTED_MODULE_0__["isKeyOf"])(source[0][key])) {
        if (!sourceEmpty) {
            console.warn('ToDictionary: unexpected input params.');
        }
        return {};
    }
    return source.reduce((acc, entity) => (Object.assign(Object.assign({}, acc), { [entity[key]]: entity })), {});
}


/***/ }),

/***/ "JjNP":
/*!************************************************************************!*\
  !*** ./libs/state/src/lib/transformation-helpers/object/deleteProp.ts ***!
  \************************************************************************/
/*! exports provided: deleteProp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteProp", function() { return deleteProp; });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core */ "jym9");

/**
 * @description
 * Accepts an object of type T and key of type K extends keyof T.
 * Removes property from an object and returns a shallow copy of the updated object without specified property.
 * If property not found returns copy of the original object.
 * Not mutating original object.
 *
 * @example
 *
 * const cat = {id: 1, type: 'cat', name: 'Fluffy'};
 *
 * const anonymusCat = deleteProp(cat, 'name');
 *
 * // anonymusCat will be:
 * // {id: 1, type: 'cat'};
 *
 * @example
 * // Usage with RxState
 *
 * export class ProfileComponent {
 *
 *    readonly removeName$ = new Subject();
 *
 *    constructor(private state: RxState<ComponentState>) {
 *      // Reactive implementation
 *      state.connect(
 *        this.removeName$,
 *        (state) => {
 *            return deleteProp(state, 'name');
 *        }
 *      );
 *    }
 *
 *    // Imperative implementation
 *    removeName(): void {
 *        this.state.set(remove(this.get(), 'name'));
 *    }
 * }
 *
 * @returns Omit<T, K>
 *
 * @docsPage deleteProp
 * @docsCategory transformation-helpers
 */
function deleteProp(object, key) {
    if (!Object(_core__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(object) || !Object(_core__WEBPACK_IMPORTED_MODULE_0__["isObjectGuard"])(object)) {
        console.warn(`DeleteProp: original value ${object} is not an object.`);
        return object;
    }
    if (!Object(_core__WEBPACK_IMPORTED_MODULE_0__["isKeyOf"])(key)) {
        console.warn(`DeleteProp: provided key is not a string, number or symbol.`);
        return Object.assign({}, object);
    }
    const copy = Object.assign({}, object);
    delete copy[key];
    return copy;
}


/***/ }),

/***/ "K5y6":
/*!*********************************************************************!*\
  !*** ./libs/cdk/src/lib/render-strategies/concurrent-strategies.ts ***!
  \*********************************************************************/
/*! exports provided: RX_CONCURRENT_STRATEGIES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RX_CONCURRENT_STRATEGIES", function() { return RX_CONCURRENT_STRATEGIES; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _scheduler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scheduler */ "yqT1");
/* harmony import */ var _utils_coalescingManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/coalescingManager */ "/85T");




Object(_scheduler__WEBPACK_IMPORTED_MODULE_2__["forceFrameRate"])(60);
const noPriorityStrategy = {
    name: 'noPriority',
    work: (cdRef) => cdRef.detectChanges(),
    behavior: (work, scope) => {
        return (o$) => o$.pipe(scheduleOnQueue(work, { priority: _scheduler__WEBPACK_IMPORTED_MODULE_2__["NoPriority"], scope }));
    },
};
const immediateStrategy = {
    name: 'immediate',
    work: (cdRef) => cdRef.detectChanges(),
    behavior: (work, scope) => {
        return (o$) => o$.pipe(scheduleOnQueue(work, {
            priority: _scheduler__WEBPACK_IMPORTED_MODULE_2__["ImmediatePriority"],
            scope,
        }));
    },
};
const userBlockingStrategy = {
    name: 'userBlocking',
    work: (cdRef) => cdRef.detectChanges(),
    behavior: (work, scope) => {
        return (o$) => o$.pipe(scheduleOnQueue(work, {
            priority: _scheduler__WEBPACK_IMPORTED_MODULE_2__["UserBlockingPriority"],
            scope,
        }));
    },
};
const normalStrategy = {
    name: 'normal',
    work: (cdRef) => cdRef.detectChanges(),
    behavior: (work, scope) => {
        return (o$) => o$.pipe(scheduleOnQueue(work, { priority: _scheduler__WEBPACK_IMPORTED_MODULE_2__["NormalPriority"], scope }));
    },
};
const lowStrategy = {
    name: 'low',
    work: (cdRef) => cdRef.detectChanges(),
    behavior: (work, scope) => {
        return (o$) => o$.pipe(scheduleOnQueue(work, { priority: _scheduler__WEBPACK_IMPORTED_MODULE_2__["LowPriority"], scope }));
    },
};
const idleStrategy = {
    name: 'idle',
    work: (cdRef) => cdRef.detectChanges(),
    behavior: (work, scope) => {
        return (o$) => o$.pipe(scheduleOnQueue(work, { priority: _scheduler__WEBPACK_IMPORTED_MODULE_2__["IdlePriority"], scope }));
    },
};
function scheduleOnQueue(work, options) {
    return (o$) => o$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["filter"])(() => !_utils_coalescingManager__WEBPACK_IMPORTED_MODULE_3__["coalescingManager"].isCoalescing(options.scope)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])((v) => new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"]((subscriber) => {
        _utils_coalescingManager__WEBPACK_IMPORTED_MODULE_3__["coalescingManager"].add(options.scope);
        const task = Object(_scheduler__WEBPACK_IMPORTED_MODULE_2__["scheduleCallback"])(options.priority, () => {
            work();
            _utils_coalescingManager__WEBPACK_IMPORTED_MODULE_3__["coalescingManager"].remove(options.scope);
            subscriber.next(v);
        }, { delay: options.delay });
        return () => {
            _utils_coalescingManager__WEBPACK_IMPORTED_MODULE_3__["coalescingManager"].remove(options.scope);
            Object(_scheduler__WEBPACK_IMPORTED_MODULE_2__["cancelCallback"])(task);
        };
    }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["mapTo"])(v))));
}
const RX_CONCURRENT_STRATEGIES = {
    noPriority: noPriorityStrategy,
    immediate: immediateStrategy,
    userBlocking: userBlockingStrategy,
    normal: normalStrategy,
    low: lowStrategy,
    idle: idleStrategy,
};


/***/ }),

/***/ "KyZu":
/*!*******************************************************************!*\
  !*** ./libs/cdk/src/lib/render-strategies/scheduler/scheduler.ts ***!
  \*******************************************************************/
/*! exports provided: ImmediatePriority, UserBlockingPriority, NormalPriority, IdlePriority, LowPriority, runWithPriority, next, scheduleCallback, cancelCallback, wrapCallback, getCurrentPriorityLevel, shouldYield, requestPaint, continueExecution, pauseExecution, getFirstCallbackNode, now, forceFrameRate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "runWithPriority", function() { return runWithPriority; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "next", function() { return next; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scheduleCallback", function() { return scheduleCallback; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cancelCallback", function() { return cancelCallback; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapCallback", function() { return wrapCallback; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentPriorityLevel", function() { return getCurrentPriorityLevel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shouldYield", function() { return shouldYieldToHost; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "requestPaint", function() { return _requestPaint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "continueExecution", function() { return continueExecution; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pauseExecution", function() { return pauseExecution; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFirstCallbackNode", function() { return getFirstCallbackNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "now", function() { return getCurrentTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forceFrameRate", function() { return forceFrameRate; });
/* harmony import */ var _schedulerMinHeap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schedulerMinHeap */ "ElDW");
/* harmony import */ var _schedulerPriorities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./schedulerPriorities */ "i/je");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ImmediatePriority", function() { return _schedulerPriorities__WEBPACK_IMPORTED_MODULE_1__["ImmediatePriority"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UserBlockingPriority", function() { return _schedulerPriorities__WEBPACK_IMPORTED_MODULE_1__["UserBlockingPriority"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NormalPriority", function() { return _schedulerPriorities__WEBPACK_IMPORTED_MODULE_1__["NormalPriority"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IdlePriority", function() { return _schedulerPriorities__WEBPACK_IMPORTED_MODULE_1__["IdlePriority"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LowPriority", function() { return _schedulerPriorities__WEBPACK_IMPORTED_MODULE_1__["LowPriority"]; });

/* harmony import */ var _schedulerFeatureFlags__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./schedulerFeatureFlags */ "Xko7");
// see https://raw.githubusercontent.com/facebook/react/master/packages/scheduler/src/forks/SchedulerDOM.js

// TODO: Use symbols?


let getCurrentTime;
const hasPerformanceNow = typeof performance === 'object' && typeof performance.now === 'function';
if (hasPerformanceNow) {
    const localPerformance = performance;
    getCurrentTime = () => localPerformance.now();
}
else {
    const localDate = Date;
    const initialTime = localDate.now();
    getCurrentTime = () => localDate.now() - initialTime;
}
// Max 31 bit integer. The max integer size in V8 for 32-bit systems.
// Math.pow(2, 30) - 1
// 0b111111111111111111111111111111
const maxSigned31BitInt = 1073741823;
// Times out immediately
const IMMEDIATE_PRIORITY_TIMEOUT = -1;
// Eventually times out
const USER_BLOCKING_PRIORITY_TIMEOUT = 250;
const NORMAL_PRIORITY_TIMEOUT = 5000;
const LOW_PRIORITY_TIMEOUT = 10000;
// Never times out
const IDLE_PRIORITY_TIMEOUT = maxSigned31BitInt;
// Tasks are stored on a min heap
const taskQueue = [];
const timerQueue = [];
// Incrementing id counter. Used to maintain insertion order.
let taskIdCounter = 1;
// Pausing the scheduler is useful for debugging.
let isSchedulerPaused = false;
let currentTask = null;
let currentPriorityLevel = _schedulerPriorities__WEBPACK_IMPORTED_MODULE_1__["NormalPriority"];
// This is set while performing work, to prevent re-entrancy.
let isPerformingWork = false;
let isHostCallbackScheduled = false;
let isHostTimeoutScheduled = false;
// Capture local references to native APIs, in case a polyfill overrides them.
const setTimeout = window.setTimeout;
const clearTimeout = window.clearTimeout;
if (typeof console !== 'undefined') {
    // TODO: Scheduler no longer requires these methods to be polyfilled. But
    // maybe we want to continue warning if they don't exist, to preserve the
    // option to rely on it in the future?
    const requestAnimationFrame = window.requestAnimationFrame;
    const cancelAnimationFrame = window.cancelAnimationFrame;
    if (typeof requestAnimationFrame !== 'function') {
        // Using console['error'] to evade Babel and ESLint
        console['error']("This browser doesn't support requestAnimationFrame. " +
            'Make sure that you load a ' +
            'polyfill in older browsers. https://reactjs.org/link/react-polyfills');
    }
    if (typeof cancelAnimationFrame !== 'function') {
        // Using console['error'] to evade Babel and ESLint
        console['error']("This browser doesn't support cancelAnimationFrame. " +
            'Make sure that you load a ' +
            'polyfill in older browsers. https://reactjs.org/link/react-polyfills');
    }
}
function advanceTimers(currentTime) {
    // Check for tasks that are no longer delayed and add them to the queue.
    let timer = Object(_schedulerMinHeap__WEBPACK_IMPORTED_MODULE_0__["peek"])(timerQueue);
    while (timer !== null) {
        if (timer.callback === null) {
            // Timer was cancelled.
            Object(_schedulerMinHeap__WEBPACK_IMPORTED_MODULE_0__["pop"])(timerQueue);
        }
        else if (timer.startTime <= currentTime) {
            // Timer fired. Transfer to the task queue.
            Object(_schedulerMinHeap__WEBPACK_IMPORTED_MODULE_0__["pop"])(timerQueue);
            timer.sortIndex = timer.expirationTime;
            Object(_schedulerMinHeap__WEBPACK_IMPORTED_MODULE_0__["push"])(taskQueue, timer);
        }
        else {
            // Remaining timers are pending.
            return;
        }
        timer = Object(_schedulerMinHeap__WEBPACK_IMPORTED_MODULE_0__["peek"])(timerQueue);
    }
}
function handleTimeout(currentTime) {
    isHostTimeoutScheduled = false;
    advanceTimers(currentTime);
    if (!isHostCallbackScheduled) {
        if (Object(_schedulerMinHeap__WEBPACK_IMPORTED_MODULE_0__["peek"])(taskQueue) !== null) {
            isHostCallbackScheduled = true;
            requestHostCallback(flushWork);
        }
        else {
            const firstTimer = Object(_schedulerMinHeap__WEBPACK_IMPORTED_MODULE_0__["peek"])(timerQueue);
            if (firstTimer !== null) {
                requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
            }
        }
    }
}
function flushWork(hasTimeRemaining, initialTime) {
    // We'll need a host callback the next time work is scheduled.
    isHostCallbackScheduled = false;
    if (isHostTimeoutScheduled) {
        // We scheduled a timeout but it's no longer needed. Cancel it.
        isHostTimeoutScheduled = false;
        cancelHostTimeout();
    }
    isPerformingWork = true;
    const previousPriorityLevel = currentPriorityLevel;
    try {
        return workLoop(hasTimeRemaining, initialTime);
    }
    finally {
        currentTask = null;
        currentPriorityLevel = previousPriorityLevel;
        isPerformingWork = false;
    }
}
function workLoop(hasTimeRemaining, initialTime) {
    let currentTime = initialTime;
    advanceTimers(currentTime);
    currentTask = Object(_schedulerMinHeap__WEBPACK_IMPORTED_MODULE_0__["peek"])(taskQueue);
    while (currentTask !== null && !isSchedulerPaused) {
        if (currentTask.expirationTime > currentTime &&
            (!hasTimeRemaining || shouldYieldToHost())) {
            // This currentTask hasn't expired, and we've reached the deadline.
            break;
        }
        const callback = currentTask.callback;
        if (typeof callback === 'function') {
            currentTask.callback = null;
            currentPriorityLevel = currentTask.priorityLevel;
            const didUserCallbackTimeout = currentTask.expirationTime <= currentTime;
            const continuationCallback = callback(didUserCallbackTimeout);
            currentTime = getCurrentTime();
            if (typeof continuationCallback === 'function') {
                currentTask.callback = continuationCallback;
            }
            else {
                if (currentTask === Object(_schedulerMinHeap__WEBPACK_IMPORTED_MODULE_0__["peek"])(taskQueue)) {
                    Object(_schedulerMinHeap__WEBPACK_IMPORTED_MODULE_0__["pop"])(taskQueue);
                }
            }
            advanceTimers(currentTime);
        }
        else {
            Object(_schedulerMinHeap__WEBPACK_IMPORTED_MODULE_0__["pop"])(taskQueue);
        }
        currentTask = Object(_schedulerMinHeap__WEBPACK_IMPORTED_MODULE_0__["peek"])(taskQueue);
    }
    // Return whether there's additional work
    if (currentTask !== null) {
        return true;
    }
    else {
        const firstTimer = Object(_schedulerMinHeap__WEBPACK_IMPORTED_MODULE_0__["peek"])(timerQueue);
        if (firstTimer !== null) {
            requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
        }
        return false;
    }
}
function runWithPriority(priorityLevel, eventHandler) {
    switch (priorityLevel) {
        case _schedulerPriorities__WEBPACK_IMPORTED_MODULE_1__["ImmediatePriority"]:
        case _schedulerPriorities__WEBPACK_IMPORTED_MODULE_1__["UserBlockingPriority"]:
        case _schedulerPriorities__WEBPACK_IMPORTED_MODULE_1__["NormalPriority"]:
        case _schedulerPriorities__WEBPACK_IMPORTED_MODULE_1__["LowPriority"]:
        case _schedulerPriorities__WEBPACK_IMPORTED_MODULE_1__["IdlePriority"]:
            break;
        default:
            priorityLevel = _schedulerPriorities__WEBPACK_IMPORTED_MODULE_1__["NormalPriority"];
    }
    const previousPriorityLevel = currentPriorityLevel;
    currentPriorityLevel = priorityLevel;
    try {
        return eventHandler();
    }
    finally {
        currentPriorityLevel = previousPriorityLevel;
    }
}
function next(eventHandler) {
    let priorityLevel;
    switch (currentPriorityLevel) {
        case _schedulerPriorities__WEBPACK_IMPORTED_MODULE_1__["ImmediatePriority"]:
        case _schedulerPriorities__WEBPACK_IMPORTED_MODULE_1__["UserBlockingPriority"]:
        case _schedulerPriorities__WEBPACK_IMPORTED_MODULE_1__["NormalPriority"]:
            // Shift down to normal priority
            priorityLevel = _schedulerPriorities__WEBPACK_IMPORTED_MODULE_1__["NormalPriority"];
            break;
        default:
            // Anything lower than normal priority should remain at the current level.
            priorityLevel = currentPriorityLevel;
            break;
    }
    const previousPriorityLevel = currentPriorityLevel;
    currentPriorityLevel = priorityLevel;
    try {
        return eventHandler();
    }
    finally {
        currentPriorityLevel = previousPriorityLevel;
    }
}
function wrapCallback(callback) {
    const parentPriorityLevel = currentPriorityLevel;
    return () => {
        // This is a fork of runWithPriority, inlined for performance.
        const previousPriorityLevel = currentPriorityLevel;
        currentPriorityLevel = parentPriorityLevel;
        try {
            // @ts-ignore
            return callback.apply(this, arguments);
        }
        finally {
            currentPriorityLevel = previousPriorityLevel;
        }
    };
}
function scheduleCallback(priorityLevel, callback, options) {
    const currentTime = getCurrentTime();
    let startTime;
    if (typeof options === 'object' && options !== null) {
        const delay = options.delay;
        if (typeof delay === 'number' && delay > 0) {
            startTime = currentTime + delay;
        }
        else {
            startTime = currentTime;
        }
    }
    else {
        startTime = currentTime;
    }
    let timeout;
    switch (priorityLevel) {
        case _schedulerPriorities__WEBPACK_IMPORTED_MODULE_1__["ImmediatePriority"]:
            timeout = IMMEDIATE_PRIORITY_TIMEOUT;
            break;
        case _schedulerPriorities__WEBPACK_IMPORTED_MODULE_1__["UserBlockingPriority"]:
            timeout = USER_BLOCKING_PRIORITY_TIMEOUT;
            break;
        case _schedulerPriorities__WEBPACK_IMPORTED_MODULE_1__["IdlePriority"]:
            timeout = IDLE_PRIORITY_TIMEOUT;
            break;
        case _schedulerPriorities__WEBPACK_IMPORTED_MODULE_1__["LowPriority"]:
            timeout = LOW_PRIORITY_TIMEOUT;
            break;
        case _schedulerPriorities__WEBPACK_IMPORTED_MODULE_1__["NormalPriority"]:
        default:
            timeout = NORMAL_PRIORITY_TIMEOUT;
            break;
    }
    const expirationTime = startTime + timeout;
    const newTask = {
        id: taskIdCounter++,
        callback,
        priorityLevel,
        startTime,
        expirationTime,
        sortIndex: -1,
    };
    if (startTime > currentTime) {
        // This is a delayed task.
        newTask.sortIndex = startTime;
        Object(_schedulerMinHeap__WEBPACK_IMPORTED_MODULE_0__["push"])(timerQueue, newTask);
        if (Object(_schedulerMinHeap__WEBPACK_IMPORTED_MODULE_0__["peek"])(taskQueue) === null && newTask === Object(_schedulerMinHeap__WEBPACK_IMPORTED_MODULE_0__["peek"])(timerQueue)) {
            // All tasks are delayed, and this is the task with the earliest delay.
            if (isHostTimeoutScheduled) {
                // Cancel an existing timeout.
                cancelHostTimeout();
            }
            else {
                isHostTimeoutScheduled = true;
            }
            // Schedule a timeout.
            requestHostTimeout(handleTimeout, startTime - currentTime);
        }
    }
    else {
        newTask.sortIndex = expirationTime;
        Object(_schedulerMinHeap__WEBPACK_IMPORTED_MODULE_0__["push"])(taskQueue, newTask);
        // Schedule a host callback, if needed. If we're already performing work,
        // wait until the next time we yield.
        if (!isHostCallbackScheduled && !isPerformingWork) {
            isHostCallbackScheduled = true;
            requestHostCallback(flushWork);
        }
    }
    return newTask;
}
function pauseExecution() {
    isSchedulerPaused = true;
}
function continueExecution() {
    isSchedulerPaused = false;
    if (!isHostCallbackScheduled && !isPerformingWork) {
        isHostCallbackScheduled = true;
        requestHostCallback(flushWork);
    }
}
function getFirstCallbackNode() {
    return Object(_schedulerMinHeap__WEBPACK_IMPORTED_MODULE_0__["peek"])(taskQueue);
}
function cancelCallback(task) {
    // Null out the callback to indicate the task has been canceled. (Can't
    // remove from the queue because you can't remove arbitrary nodes from an
    // array based heap, only the first one.)
    task.callback = null;
}
function getCurrentPriorityLevel() {
    return currentPriorityLevel;
}
let isMessageLoopRunning = false;
let scheduledHostCallback = null;
let taskTimeoutID = -1;
// Scheduler periodically yields in case there is other work on the main
// thread, like user events. By default, it yields multiple times per frame.
// It does not attempt to align with frame boundaries, since most tasks don't
// need to be frame aligned; for those that do, use requestAnimationFrame.
let yieldInterval = 16;
let deadline = 0;
// TODO: Make this configurable
// TODO: Adjust this based on priority?
const maxYieldInterval = 300;
let needsPaint = false;
function shouldYieldToHost() {
    if (_schedulerFeatureFlags__WEBPACK_IMPORTED_MODULE_2__["enableIsInputPending"] &&
        navigator !== undefined &&
        navigator.scheduling !== undefined &&
        navigator.scheduling.isInputPending !== undefined) {
        const scheduling = navigator.scheduling;
        const currentTime = getCurrentTime();
        if (currentTime >= deadline) {
            // There's no time left. We may want to yield control of the main
            // thread, so the browser can perform high priority tasks. The main ones
            // are painting and user input. If there's a pending paint or a pending
            // input, then we should yield. But if there's neither, then we can
            // yield less often while remaining responsive. We'll eventually yield
            // regardless, since there could be a pending paint that wasn't
            // accompanied by a call to `requestPaint`, or other main thread tasks
            // like network events.
            if (needsPaint || scheduling.isInputPending()) {
                // There is either a pending paint or a pending input.
                return true;
            }
            // There's no pending input. Only yield if we've reached the max
            // yield interval.
            return currentTime >= maxYieldInterval;
        }
        else {
            // There's still time left in the frame.
            return false;
        }
    }
    else {
        // `isInputPending` is not available. Since we have no way of knowing if
        // there's pending input, always yield at the end of the frame.
        return getCurrentTime() >= deadline;
    }
}
function requestPaint() {
    if (_schedulerFeatureFlags__WEBPACK_IMPORTED_MODULE_2__["enableIsInputPending"] &&
        navigator !== undefined &&
        navigator.scheduling !== undefined &&
        navigator.scheduling.isInputPending !== undefined) {
        needsPaint = true;
    }
    // Since we yield every frame regardless, `requestPaint` has no effect.
}
function forceFrameRate(fps) {
    if (fps < 0 || fps > 125) {
        // Using console['error'] to evade Babel and ESLint
        console['error']('forceFrameRate takes a positive int between 0 and 125, ' +
            'forcing frame rates higher than 125 fps is not supported');
        return;
    }
    if (fps > 0) {
        yieldInterval = Math.floor(1000 / fps);
    }
    else {
        // reset the framerate
        yieldInterval = 5;
    }
}
const performWorkUntilDeadline = () => {
    if (scheduledHostCallback !== null) {
        const currentTime = getCurrentTime();
        // Yield after `yieldInterval` ms, regardless of where we are in the vsync
        // cycle. This means there's always time remaining at the beginning of
        // the message event.
        deadline = currentTime + yieldInterval;
        const hasTimeRemaining = true;
        // If a scheduler task throws, exit the current browser task so the
        // error can be observed.
        //
        // Intentionally not using a try-catch, since that makes some debugging
        // techniques harder. Instead, if `scheduledHostCallback` errors, then
        // `hasMoreWork` will remain true, and we'll continue the work loop.
        let hasMoreWork = true;
        try {
            hasMoreWork = scheduledHostCallback(hasTimeRemaining, currentTime);
        }
        finally {
            if (hasMoreWork) {
                // If there's more work, schedule the next message event at the end
                // of the preceding one.
                port.postMessage(null);
            }
            else {
                isMessageLoopRunning = false;
                scheduledHostCallback = null;
            }
        }
    }
    else {
        isMessageLoopRunning = false;
    }
    // Yielding to the browser will give it a chance to paint, so we can
    // reset this.
    needsPaint = false;
};
const channel = new MessageChannel();
const port = channel.port2;
channel.port1.onmessage = performWorkUntilDeadline;
function requestHostCallback(callback) {
    scheduledHostCallback = callback;
    if (!isMessageLoopRunning) {
        isMessageLoopRunning = true;
        port.postMessage(null);
    }
}
function requestHostTimeout(callback, ms) {
    taskTimeoutID = setTimeout(() => {
        callback(getCurrentTime());
    }, ms);
}
function cancelHostTimeout() {
    clearTimeout(taskTimeoutID);
    taskTimeoutID = -1;
}
const _requestPaint = requestPaint;



/***/ }),

/***/ "LBpV":
/*!*******************************************************************!*\
  !*** ./libs/state/src/lib/transformation-helpers/array/update.ts ***!
  \*******************************************************************/
/*! exports provided: update */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update", function() { return update; });
/* harmony import */ var _internals_valuesComparer_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_internals/valuesComparer.util */ "SDiw");
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core */ "jym9");


/**
 * @description
 * Updates one or multiple items in an array T[].
 * For comparison you can provide key, array of keys or a custom comparison function that should return true if items match.
 * If no comparison is provided, an equality check is used by default.
 * Returns a shallow copy of the array T[] and updated items, does not mutate the original array.
 *
 * @example
 * // Update with comparison function
 *
 * const creatures = [{id: 1, type: 'cat'}, {id: 2, type: 'dog'}];
 *
 * const newCat = {id: 1, type: 'lion'};
 *
 * const updatedCreatures = update(creatures, newCat, (a, b) => a.id === b.id);
 *
 * // updatedCreatures will be:
 * // [{id: 1, type: 'lion'}, {id: 2, type: 'dog'}];
 *
 * @example
 * // Update with key
 *
 * const creatures = [{id: 1, type: 'cat'}, {id: 2, type: 'dog'}];
 *
 * const newCat = {id: 1, type: 'lion'};
 *
 * const updatedCreatures = update(creatures, newCat, 'id');
 *
 * // updatedCreatures will be:
 * // [{id: 1, type: 'lion'}, {id: 2, type: 'dog'}];
 *
 * @example
 * // Update with array of keys
 *
 * const creatures = [{id: 1, type: 'cat', name: 'Bella'}, {id: 2, type: 'dog', name: 'Sparky'}];
 *
 * const newCat = {id: 1, type: 'lion', name: 'Bella'};
 *
 * const updatedCreatures = update(creatures, newCat, ['id', 'name']);
 *
 * // updatedCreatures will be:
 * // [{id: 1, type: 'lion', name: 'Bella'}, {id: 2, type: 'dog', name: 'Sparky'}];
 *
 * @example
 * // Usage with RxState
 *
 * export class ListComponent {
 *
 *    readonly updateCreature$ = new Subject<Creature>();
 *
 *    constructor(private state: RxState<ComponentState>) {
 *      // Reactive implementation
 *      state.connect(
 *        'creatures',
 *        this.updateCreature$,
 *        ({ creatures }, creatureToUpdate) => {
 *            return update(creatures, creatureToUpdate, (a, b) => a.id === b.id);
 *        }
 *      );
 *    }
 *
 *    // Imperative implementation
 *    updateCreature(creatureToUpdate: Creature): void {
 *        this.state.set({ creatures: update(this.state.get().creatures, creatureToUpdate, (a, b) => a.id === b.id)});
 *    }
 * }
 *
 * @returns T[]
 *
 * @docsPage update
 * @docsCategory transformation-helpers
 */
function update(source, updates, compare) {
    const updatesAsArray = updates
        ? Array.isArray(updates)
            ? updates
            : [updates]
        : [];
    const sourceDefined = Object(_core__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(source);
    const sourceIsArray = Array.isArray(source);
    const invalidInput = !sourceIsArray && !Object(_core__WEBPACK_IMPORTED_MODULE_1__["isDefined"])(updates);
    if (sourceDefined && !sourceIsArray) {
        console.warn(`Update: Original value (${source}) is not an array.`);
    }
    if (invalidInput) {
        return source;
    }
    if (!sourceDefined || !source.length || !sourceIsArray) {
        return [...updatesAsArray];
    }
    return source.map((existingItem) => {
        const match = updatesAsArray.find((item) => Object(_internals_valuesComparer_util__WEBPACK_IMPORTED_MODULE_0__["valuesComparer"])(item, existingItem, compare));
        if (match) {
            return Object.assign(Object.assign({}, existingItem), match);
        }
        return existingItem;
    });
}


/***/ }),

/***/ "Lifd":
/*!*********************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/zone-agnostic/rxjs/schedulers/index.ts ***!
  \*********************************************************************************************/
/*! exports provided: asyncScheduler, asapScheduler, queueScheduler, animationFrameScheduler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _async_async__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./async/async */ "9SxW");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asyncScheduler", function() { return _async_async__WEBPACK_IMPORTED_MODULE_0__["asyncScheduler"]; });

/* harmony import */ var _asap_asap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./asap/asap */ "qAf4");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asapScheduler", function() { return _asap_asap__WEBPACK_IMPORTED_MODULE_1__["asapScheduler"]; });

/* harmony import */ var _queue_queue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./queue/queue */ "HMd7");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "queueScheduler", function() { return _queue_queue__WEBPACK_IMPORTED_MODULE_2__["queueScheduler"]; });

/* harmony import */ var _animation_frame_animationFrame__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./animation-frame/animationFrame */ "i0la");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "animationFrameScheduler", function() { return _animation_frame_animationFrame__WEBPACK_IMPORTED_MODULE_3__["animationFrameScheduler"]; });







/***/ }),

/***/ "LriG":
/*!****************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/directives/for/rx-for.directive.ts ***!
  \****************************************************************************************/
/*! exports provided: RxFor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RxFor", function() { return RxFor; });
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/cdk/coercion */ "8LU1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _rx_angular_cdk__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @rx-angular/cdk */ "cDIL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "kU1M");







/**
 * @Directive RxFor
 *
 * @description
 *
 * The `*rxFor` structural directive provides a convenient and performant way for rendering
 * templates out of a list of items.
 * Input values can be provided either as `Observable`, `Promise` or `static` values. Just as the `*ngFor` directive, the
 * `*rxFor` is placed on an
 * element, which becomes the parent of the cloned templates.
 *
 * The `RxFor` implements `EmbeddedView Rendering`.
 * Compared to the `NgForOf`, `RxFor` treats each child template as single renderable entity. For each
 * change in the provided list of items it will apply and detect changes to only affected views.
 *
 * Under the hood, it leverages the power of the `StrategyCredential`s which in turn take care of scheduling and
 * prioritizing the change detection for each child template (aka item in the list).
 * This way the rendering behavior of each instance of `RxFor` can be configured individually.
 *
 * `RxStrategyCredentials` and `EmbeddedView Rendering` together build the basis for the `concurrent mode`. Based on
 * the configured strategy every template will get processed in an individual task, which enables chunked and
 * cancellable rendering of the list.
 *
 * As further improvement compared to the basic `*ngFor` implementation, `*rxFor` is able to take care of
 * `ChangeDetection` in situations which include `projected views` (aka `@ContentChild` or `@ViewChild`).
 * Learn more about this in the example section.
 *
 *
 * ### Context Variables
 *
 * The following context variables are available for each template:
 *
 * - $implicit: `T` // the default variable accessed by `let val`
 * - item$: `Observable<T>` // the same value as $implicit, but as `Observable`
 * - index: `number` // current index of the item
 * - count: `number` // count of all items in the list
 * - first: `boolean` // true if the item is the first in the list
 * - last: `boolean` // true if the item is the last in the list
 * - even: `boolean` // true if the item has on even index (index % 2 === 0)
 * - odd: `boolean` // the opposite of even
 * - index$: `Observable<number>` // index as `Observable`
 * - count$: `Observable<number>` // count as `Observable`
 * - first$: `Observable<boolean>` // first as `Observable`
 * - last$: `Observable<boolean>` // last as `Observable`
 * - even$: `Observable<boolean>` // even as `Observable`
 * - odd$: `Observable<boolean>` // odd as `Observable`
 * - select: `(keys: (keyof T)[], distinctByMap) => Observable<Partial<T>>` // returns a selection function which
 * accepts an array of properties to pluck out of every list item. The function returns the selected properties of
 * the current list item as distinct `Observable` key-value-pair. See the example below:
 *
 * This example showcases the `select` view-context function used for deeply nested lists.
 *
 *  ```html
 * <ul>
 *   <li *rxFor="let hero of heroes$; trackBy: trackItem; let select = select;">
 *     <div>
 *       <strong>{{ hero.name }}</strong></br>
 *       Defeated enemies:
 *     </div>
 *      <span *rxFor="let enemy of select(['defeatedEnemies']); trackBy: trackEnemy;">
 *        {{ enemy.name }}
 *      </span>
 *   </li>
 * </ul>
 *  ```
 *
 * ### Input properties
 *
 *  - trackBy: `(index: number, item: T) => any`
 *  - trackBy: `keyof T`
 *  - strategy: `string`
 *  - strategy: `Observable<string>`
 *  - parent: `boolean`;
 *  - renderCallback: `Subject<T[]>`
 *
 *
 * ### Features of `*rxFor`
 *
 * Included features for `*rxFor`:
 * - Push based architecture
 * - Immutable as well as mutable data structures (`trackBy`)
 * - Provide a comprehensive set of context variables for each view
 * - Provide a way to fix `ChangeDetection` issues in `Projected Views` scenarios
 * - automatically runs out of `NgZone`, provide an easy way to opt-in (`patchZone`)
 * - Notify about when rendering of child templates is finished (`renderCallback`)
 * - Reactive as well as imperative values in the template (`ngFor` drop-in replacement)
 * - `ListManager`: special logic for differ mechanism to avoid over-rendering; abstracts away low level logic
 * - render every `EmbeddedView` on its own while applying the configured `RxStrategyCredentials#behavior`
 * - cancel any scheduled work if a remove was triggered for a `trackById`
 * - cancel any update if a new update was triggered for the same `trackById`
 *
 *
 * ### Simple example using `*rxFor` with `Observable` values
 * ```html
 * <ul>
 *   <li *rxFor="let item of observableItems$; trackBy: trackItem">
 *      {{ item }}
 *   </li>
 * </ul>
 * ```
 *
 * ### Simple example using `*rxFor` with simple static values
 * ```html
 * <ul>
 *   <li *rxFor="let item of items; trackBy: trackItem">
 *      {{ item }}
 *   </li>
 * </ul>
 * ```
 *
 *
 * ### Using the context variables
 *
 * ```html
 * <ul>
 *   <li
 *     *rxFor="
 *       let item of observableItems$;
 *       let count = count;
 *       let index = index;
 *       let first = first;
 *       let last = last;
 *       let even = even;
 *       let odd = odd;
 *       trackBy: trackItem;
 *     "
 *   >
 *     <div>{{ count }}</div>
 *     <div>{{ index }}</div>
 *     <div>{{ item }}</div>
 *     <div>{{ first }}</div>
 *     <div>{{ last }}</div>
 *     <div>{{ even }}</div>
 *     <div>{{ odd }}</div>
 *   </li>
 * </ul>
 * ```
 *
 * ### Projected Views (`parent`)
 *
 * Imagine the following situation:
 *
 * ```ts
 * \@Component({
 *   selector: 'app-list-component',
 *   template: `
 *     <ng-content select="app-list-item"></ng-content>
 *   `
 * })
 * export class AppListComponent {
 *  \@ContentChildren(AppListItemComponent) appListItems: QueryList<AppListItemComponent>:
 * }
 * ```
 *
 * `AppListComponent` has a `contentOutlet` where it expects `AppListItemComponents` to be inserted into. In this case
 * `AppListComponent`s state is dependent on its `ContentChildren`.
 * This situation leads to the problem that `AppListComponent` needs to get informed about updates of its child views.
 * This is a known issue which has never been solved for `ngFor` (or other structural directives) especially in
 * combination with `CD OnPush` see here: (https://github.com/angular/angular/pull/35428)
 * `RxFor` solves this issue for you by providing a simple input parameter `parent: boolean`.
 * If set to `true`, `*rxFor` will automatically detect every other `Component` where its
 * `EmbeddedView`s were inserted into. Those components will get change detected as well in order to force
 * update their state accordingly.
 *
 * The usage of `AppListComponent` looks like this:
 *
 * ```html
 * <app-list-component>
 *   <app-list-item
 *     *rxFor="
 *       let item of observableItems$;
 *       parent: true;
 *     "
 *   >
 *     <div>{{ item }}</div>
 *   </app-list-item>
 * </app-list-component>
 * ```
 * ### `NgZone` patch
 *
 * By default `*rxFor` will create it's `EmbeddedViews` outside of `NgZone` which drastically speeds up the
 * performance.
 * There are scenarios where you want to opt-in to `NgZone` though. If views are created out of `NgZone`, all
 * `EventListeners` attached to them run out `NgZone` as well.
 *
 * Take a look at the following example:
 *
 * ```ts
 * \@Component({
 *   selector: 'app-root',
 *   template: `
 *     <!-- clickedHeroName won't get updated due to `NgZone` not noticing the click -->
 *     {{ clickedHeroName }}
 *     <ng-container *rxFor="let hero of heroes$; trackBy: trackHero">
 *       <!-- click runs out of `NgZone` -->
 *       <button (click)="heroClicked(hero)">{{ hero.name }}</button>
 *     </ng-container>
 *   `
 * })
 * export class AppComponent {
 *   clickedHeroName = '';
 *
 *   heroClicked(hero: Hero) {
 *     // this will run out of `NgZone` and thus not update the DOM
 *     this.clickedHeroName = hero.name;
 *   }
 * }
 * ```
 *
 * There are several ways to get around this issue.
 * `*rxFor` can be configured to create views inside of `NgZone` with the `patchZone` flag:
 *
 * ```html
 * <ng-container *rxFor="let hero of heroes$; trackBy: trackHero; patchZone: true">
 *   <!-- click now gets detected by `NgZone` -->
 *   <button (click)="heroClicked(hero)">{{ hero.name }}</button>
 * </ng-container>
 * ```
 *
 * However, `patchZone: true` can in some cases have a negative impact on the performance of the `*rxFor` Directive.
 * Since the creation of the `EmbeddedViews` will most likely happen in batches, every batch will result in one
 * `NgZone` cycle resulting in a possible re-rendering of many other `Components`.
 *
 * Another approach would be to manually detect changes coming from `unpatched` EventListeners or wrapping them in
 * `NgZone`.
 *
 * ```ts
 * export class AppComponent {
 *   clickedHeroName = '';
 *
 *   constructor(
 *     private cdRef: ChangeDetectorRef, // option1
 *     private ngZone: NgZone // option 2
 *   ) {}
 *
 *   heroClicked(hero: Hero) {
 *     // this will run out of `NgZone` and thus not update the DOM
 *     this.clickedHeroName = hero.name;
 *     this.cdRef.markForCheck(); // option 1
 *
 *     // option 2
 *     this.ngZone.run(() => this.clickedHeroName = hero.name);
 *   }
 * }
 * ```
 *
 *
 * @docsCategory RxFor
 * @docsPage RxFor
 * @publicApi
 */
class RxFor {
    /** @internal */
    constructor(iterableDiffers, cdRef, ngZone, eRef, templateRef, viewContainerRef, strategyProvider) {
        this.iterableDiffers = iterableDiffers;
        this.cdRef = cdRef;
        this.ngZone = ngZone;
        this.eRef = eRef;
        this.templateRef = templateRef;
        this.viewContainerRef = viewContainerRef;
        this.strategyProvider = strategyProvider;
        /**
         * @description
         *  If `parent` is set to `true` (default to `false`), `*rxFor` will automatically detect every other `Component` where its
         * `EmbeddedView`s were inserted into. Those components will get change detected as well in order to force
         * update their state accordingly. In the given example, `AppListComponent` will get notified about which insert
         * or remove any `AppListItemComponent`.
         *
         * @example
         * \@Component({
         *   selector: 'app-root',
         *   template: `
         *    <app-list-component>
         *      <app-list-item
         *        *rxFor="
         *          let item of items$;
         *          trackBy: trackItem;
         *          parent: true;
         *        "
         *      >
         *        <div>{{ item.name }}</div>
         *      </app-list-item>
         *    </app-list-component>
         *   `
         * })
         * export class AppComponent {
         *   items$ = itemService.getItems();
         * }
         *
         * @param renderParent
         */
        // tslint:disable-next-line:no-input-rename
        this.renderParent = true;
        /**
         * @description
         * A flag to control whether *rxFor templates are created within `NgZone` or not.
         * By default `*rxFor` will create it's `EmbeddedViews` outside of `NgZone` which drastically speeds up the
         * performance.
         * If `patchZone` is set to `true` (defaults to `false`), `*rxFor` will create its EmbeddedViews inside of `NgZone`.
         *
         * @example
         * \@Component({
         *   selector: 'app-root',
         *   template: `
         *    <app-list-component>
         *      <app-list-item
         *        *rxFor="
         *          let item of items$;
         *          trackBy: trackItem;
         *          patchZone: true;
         *        "
         *      >
         *        <div>{{ item.name }}</div>
         *      </app-list-item>
         *    </app-list-component>
         *   `
         * })
         * export class AppComponent {
         *   items$ = itemService.getItems();
         * }
         *
         * @param patchZone
         */
        // tslint:disable-next-line:no-input-rename
        this.patchZone = this.strategyProvider.config.patchZone;
        /** @internal */
        this.strategyInput$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["ReplaySubject"](1);
        /** @internal */
        this.observables$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["ReplaySubject"](1);
        /** @internal */
        this.values$ = this.observables$.pipe(Object(_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_2__["coerceDistinctWith"])());
        /** @internal */
        this.strategy$ = this.strategyInput$.pipe(Object(_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_2__["coerceDistinctWith"])());
        /** @internal */
        this._subscription = rxjs__WEBPACK_IMPORTED_MODULE_3__["Subscription"].EMPTY;
        /** @internal */
        this._trackBy = (i, a) => a;
        /** @internal */
        this._distinctBy = (a, b) => a === b;
    }
    /**
     * @description
     * The iterable input
     *
     * @example
     * <ng-container *rxFor="heroes$; let hero">
     *   <app-hero [hero]="hero"></app-hero>
     * </ng-container>
     *
     * @param potentialObservable
     */
    set rxFor(potentialObservable) {
        this.observables$.next(potentialObservable);
    }
    /** @internal */
    set rxForOf(potentialObservable) {
        this.observables$.next(potentialObservable);
    }
    /**
     * @description
     * The rendering strategy to be used for each template of the list of items.
     * Use it to dynamically manage your rendering strategy. You can switch the strategies
     * imperatively (with a string) or by binding an Observable.
     * The default strategy is `'normal'`.
     *
     * @example
     * \@Component({
     *   selector: 'app-root',
     *   template: `
     *     <ng-container *rxFor="let hero of heroes$; strategy: strategy">
     *       <app-hero [hero]="hero"></app-hero>
     *     </ng-container>
     *   `
     * })
     * export class AppComponent {
     *   strategy = 'low';
     * }
     *
     * // OR
     *
     * \@Component({
     *   selector: 'app-root',
     *   template: `
     *     <ng-container *rxFor="let hero of heroes$; strategy: strategy$">
     *       <app-hero [hero]="hero"></app-hero>
     *     </ng-container>
     *   `
     * })
     * export class AppComponent {
     *   strategy$ = new BehaviorSubject('immediate');
     * }
     *
     * @param strategyName
     * @see {@link strategies}
     */
    set strategy(strategyName) {
        this.strategyInput$.next(strategyName);
    }
    /**
     * @description
     * A function or key that defines how to track changes for items in the iterable.
     *
     * When items are added, moved, or removed in the iterable,
     * the directive must re-render the appropriate DOM nodes.
     * To minimize churn in the DOM, only nodes that have changed
     * are re-rendered.
     *
     * By default, rxFor assumes that the object instance identifies the node in the iterable (equality check `===`).
     * When a function or key is supplied, rxFor uses the result to identify the item node.
     *
     * @example
     * \@Component({
     *   selector: 'app-root',
     *   template: `
     *    <app-list-component>
     *      <app-list-item
     *        *rxFor="
     *          let item of items$;
     *          trackBy: 'id';
     *        "
     *      >
     *        <div>{{ item.name }}</div>
     *      </app-list-item>
     *    </app-list-component>
     *   `
     * })
     * export class AppComponent {
     *   items$ = itemService.getItems();
     * }
     *
     * // OR
     *
     * \@Component({
     *   selector: 'app-root',
     *   template: `
     *    <app-list-component>
     *      <app-list-item
     *        *rxFor="
     *          let item of items$;
     *          trackBy: trackItem;
     *        "
     *      >
     *        <div>{{ item.name }}</div>
     *      </app-list-item>
     *    </app-list-component>
     *   `
     * })
     * export class AppComponent {
     *   items$ = itemService.getItems();
     *   trackItem = (idx, item) => item.id;
     * }
     *
     * @param trackByFnOrKey
     */
    set trackBy(trackByFnOrKey) {
        this._trackBy =
            typeof trackByFnOrKey !== 'function'
                ? (i, a) => a[trackByFnOrKey]
                : trackByFnOrKey;
    }
    /**
     * @internal
     * A function that defines how to track `updates` of items.
     * In addition to track when items are added, moved, or removed you can provide a function that determines if any
     * updates happened to an item. Use this is if you want to have even more control about what changes lead to
     * re-renderings of the DOM.
     *
     * By default, rxFor identifies if an update happens by doing an (equality check `===`).
     * When a function supplied, rxFor uses the result to identify the item node.
     *
     * @internal
     * \@Component({
     *   selector: 'app-root',
     *   template: `
     *    <app-list-component>
     *      <app-list-item
     *        *rxFor="
     *          let item of items$;
     *          trackBy: trackItem;
     *          distinctBy: distinctItem;
     *        "
     *      >
     *        <div>{{ item.name }}</div>
     *      </app-list-item>
     *    </app-list-component>
     *   `
     * })
     * export class AppComponent {
     *   items$ = itemService.getItems();
     *   trackItem = (idx, item) => item.id;
     *   // only changes to the name lead to a re-rendering of a child template
     *   distinctItem = (itemA, itemB) => itemA.name === itemB.name;
     * }
     *
     * @param distinctBy
     */
    /*@Input('rxForDistinctBy')*/
    set distinctBy(distinctBy) {
        this._distinctBy = distinctBy;
    }
    /**
     * @description
     * A `Subject` which emits whenever *rxFor finished rendering a set changes to the view.
     * This enables developers to perform actions when a list has finished rendering.
     * The `renderCallback` is useful in situations where you rely on specific DOM properties like the `height` a
     * table after all items got rendered.
     * It is also possible to use the renderCallback in order to determine if a view should be visible or not. This
     * way developers can hide a list as long as it has not finished rendering.
     *
     * The result of the `renderCallback` will contain the currently rendered set of items in the iterable.
     *
     * @example
     * \@Component({
     *   selector: 'app-root',
     *   template: `
     *    <app-list-component>
     *      <app-list-item
     *        *rxFor="
     *          let item of items$;
     *          trackBy: trackItem;
     *          renderCallback: itemsRendered;
     *        "
     *      >
     *        <div>{{ item.name }}</div>
     *      </app-list-item>
     *    </app-list-component>
     *   `
     * })
     * export class AppComponent {
     *   items$: Observable<Item[]> = itemService.getItems();
     *   trackItem = (idx, item) => item.id;
     *   // only changes to the name lead to a re-rendering of a child template
     *   distinctItem = (itemA, itemB) => itemA.name === itemB.name;
     *   // this emits whenever rxFor finished rendering changes
     *   itemsRendered = new Subject<Item[]>();
     * }
     *
     * @param renderCallback
     */
    set renderCallback(renderCallback) {
        this._renderCallback = renderCallback;
    }
    /** @internal */
    static ngTemplateContextGuard(dir, ctx) {
        return true;
    }
    /** @internal */
    ngOnInit() {
        this.listManager = Object(_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_2__["createListTemplateManager"])({
            iterableDiffers: this.iterableDiffers,
            renderSettings: {
                cdRef: this.cdRef,
                eRef: this.eRef,
                strategies: this.strategyProvider.strategies,
                defaultStrategyName: this.strategyProvider.primaryStrategy,
                parent: Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__["coerceBooleanProperty"])(this.renderParent),
                patchZone: this.patchZone ? this.ngZone : false,
            },
            templateSettings: {
                viewContainerRef: this.viewContainerRef,
                templateRef: this.templateRef,
                createViewContext: this.createViewContext,
                updateViewContext: this.updateViewContext,
            },
            trackBy: this._trackBy
        });
        this.listManager.nextStrategy(this.strategy$);
        this._subscription = this.listManager.render(this.values$)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])((v) => {
            var _a;
            (_a = this._renderCallback) === null || _a === void 0 ? void 0 : _a.next(v);
        })).subscribe();
    }
    /** @internal */
    createViewContext(item, computedContext) {
        return new _rx_angular_cdk__WEBPACK_IMPORTED_MODULE_2__["RxDefaultListViewContext"](item, computedContext);
    }
    /** @internal */
    updateViewContext(item, view, computedContext) {
        view.context.updateContext(computedContext);
        view.context.$implicit = item;
    }
    /** @internal */
    ngOnDestroy() {
        this._subscription.unsubscribe();
        this.viewContainerRef.clear();
    }
}
RxFor.ɵfac = function RxFor_Factory(t) { return new (t || RxFor)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["IterableDiffers"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_2__["RxStrategyProvider"])); };
RxFor.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({ type: RxFor, selectors: [["", "rxFor", ""]], inputs: { rxFor: "rxFor", rxForOf: "rxForOf", strategy: ["rxForStrategy", "strategy"], renderParent: ["rxForParent", "renderParent"], patchZone: ["rxForPatchZone", "patchZone"], trackBy: ["rxForTrackBy", "trackBy"], renderCallback: ["rxForRenderCallback", "renderCallback"] } });


/***/ }),

/***/ "Lzoi":
/*!************************************************************!*\
  !*** ./apps/demos/src/app/features/home/home.component.ts ***!
  \************************************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class HomeComponent {
}
HomeComponent.ɵfac = function HomeComponent_Factory(t) { return new (t || HomeComponent)(); };
HomeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HomeComponent, selectors: [["rxa-home"]], decls: 33, vars: 0, template: function HomeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Welcome to RxAngular Demos!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Explore various sections that will guide you through features of RxAngular.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "h4");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "\uD83C\uDFC1 Fundamentals");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, " Demos presenting fundamental rules and functionalities existing in Angular that are good to know before you start your journey with RxAngular. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "h4");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "\uD83E\uDDF0 Template");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, " Playground for different functionalities of the ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "code");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "@rx-angular/template");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, " package. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "h4");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "\uD83D\uDCCB Tutorials");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, " Tutorials for features existing in the ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "code");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "@rx-angular");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, " packages. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "h4");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, "\uD83E\uDDEE Integrations");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "code");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "@rx-angular/state");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, " integrated with different libraries and patterns. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "h4");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, "\uD83D\uDD2C Experiments");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, " Experiments with features, that are still under development. \u26A0\uFE0FWarning! \u26A0\uFE0FUnstable or broken features may lay ahead! ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["code[_ngcontent-%COMP%] {\n      background: black;\n    }"] });


/***/ }),

/***/ "MqDg":
/*!***************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/render-aware/interfaces.ts ***!
  \***************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "MqKN":
/*!************************************************!*\
  !*** ./libs/state/src/lib/core/utils/index.ts ***!
  \************************************************/
/*! exports provided: pipeFromArray, isIterableGuard, isOperateFnArrayGuard, isPromiseGuard, isStringArrayGuard, isKeyOf, isObjectGuard, isDefined, safePluck */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pipe_from_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pipe-from-array */ "BjHz");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pipeFromArray", function() { return _pipe_from_array__WEBPACK_IMPORTED_MODULE_0__["pipeFromArray"]; });

/* harmony import */ var _guards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./guards */ "jPSe");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isIterableGuard", function() { return _guards__WEBPACK_IMPORTED_MODULE_1__["isIterableGuard"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isOperateFnArrayGuard", function() { return _guards__WEBPACK_IMPORTED_MODULE_1__["isOperateFnArrayGuard"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isPromiseGuard", function() { return _guards__WEBPACK_IMPORTED_MODULE_1__["isPromiseGuard"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isStringArrayGuard", function() { return _guards__WEBPACK_IMPORTED_MODULE_1__["isStringArrayGuard"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isKeyOf", function() { return _guards__WEBPACK_IMPORTED_MODULE_1__["isKeyOf"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isObjectGuard", function() { return _guards__WEBPACK_IMPORTED_MODULE_1__["isObjectGuard"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isDefined", function() { return _guards__WEBPACK_IMPORTED_MODULE_1__["isDefined"]; });

/* harmony import */ var _safe_pluck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./safe-pluck */ "Hr6l");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "safePluck", function() { return _safe_pluck__WEBPACK_IMPORTED_MODULE_2__["safePluck"]; });






/***/ }),

/***/ "MqLN":
/*!********************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/zone-agnostic/rxjs/operators/index.ts ***!
  \********************************************************************************************/
/*! exports provided: fromEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fromEvent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fromEvent */ "3cF1");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fromEvent", function() { return _fromEvent__WEBPACK_IMPORTED_MODULE_0__["fromEvent"]; });




/***/ }),

/***/ "NKKG":
/*!*******************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/fundamentals.menu.ts ***!
  \*******************************************************************/
/*! exports provided: FUNDAMENTALS_MENU */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FUNDAMENTALS_MENU", function() { return FUNDAMENTALS_MENU; });
const FUNDAMENTALS_MENU = [
    {
        link: 'nested-vs-injected',
        label: 'Nested vs Projected'
    },
    {
        link: 'projected-views',
        label: 'Projected Views'
    },
    {
        link: 'passing-values',
        label: 'Passing Values'
    },
    {
        link: 'zone-patched-apis',
        label: 'Zone Patched APIs'
    },
    {
        label: 'Scheduling',
        link: 'scheduling'
    },
    {
        label: 'Coalescing',
        link: 'coalescing'
    },
    {
        label: 'Global Order',
        link: 'global-order'
    },
    {
        link: 'view-vs-embedded-view',
        label: 'Component vs EmbeddedView',
    },
];


/***/ }),

/***/ "NM00":
/*!***************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/hooks/hooks.ts ***!
  \***************************************************************/
/*! exports provided: Hooks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Hooks", function() { return Hooks; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./model */ "efNJ");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "8gNB");





class Hooks {
    constructor() {
        this._hooks$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.onChanges$ = this._hooks$.pipe(Object(_utils__WEBPACK_IMPORTED_MODULE_3__["toHook"])('changes'));
        this.onInit$ = this._hooks$.pipe(Object(_utils__WEBPACK_IMPORTED_MODULE_3__["toHook"])('init'));
        this.onAfterViewInit$ = this._hooks$.pipe(Object(_utils__WEBPACK_IMPORTED_MODULE_3__["toHook"])('afterViewInit'));
        this.onAfterViewChecked$ = this._hooks$.pipe(Object(_utils__WEBPACK_IMPORTED_MODULE_3__["toHook"])('afterViewChecked'));
        this.onAfterContentInit$ = this._hooks$.pipe(Object(_utils__WEBPACK_IMPORTED_MODULE_3__["toHook"])('afterContentInit'));
        this.onAfterContentChecked$ = this._hooks$.pipe(Object(_utils__WEBPACK_IMPORTED_MODULE_3__["toHook"])('afterContentChecked'));
        this.onDestroy$ = this._hooks$.pipe(Object(_utils__WEBPACK_IMPORTED_MODULE_3__["toHook"])('destroy'));
    }
    ngOnChanges(changes) {
        this._hooks$.next({ changes });
    }
    ngOnInit() {
        this._hooks$.next({ init: true });
    }
    ngAfterViewInit() {
        this._hooks$.next({ afterViewInit: true });
    }
    ngAfterViewChecked() {
        this._hooks$.next({ afterViewChecked: true });
    }
    ngAfterContentInit() {
        this._hooks$.next({ afterContentInit: true });
    }
    ngAfterContentChecked() {
        this._hooks$.next({ afterContentChecked: true });
    }
    ngOnDestroy() {
        this._hooks$.next({ destroy: true });
        this._hooks$.complete();
    }
}
Hooks.ɵfac = function Hooks_Factory(t) { return new (t || Hooks)(); };
Hooks.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: Hooks, factory: Hooks.ɵfac });


/***/ }),

/***/ "NsWS":
/*!*****************************************************************!*\
  !*** ./libs/cdk/src/lib/render-strategies/native-strategies.ts ***!
  \*****************************************************************/
/*! exports provided: RX_NATIVE_STRATEGIES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RX_NATIVE_STRATEGIES", function() { return RX_NATIVE_STRATEGIES; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _utils_coalesceWith__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/coalesceWith */ "ol9i");
/* harmony import */ var _zone_less_browser_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../zone-less/browser/browser */ "rxQk");





const animationFrameTick = () => new rxjs__WEBPACK_IMPORTED_MODULE_1__["Observable"]((subscriber) => {
    const id = Object(_zone_less_browser_browser__WEBPACK_IMPORTED_MODULE_4__["requestAnimationFrame"])(() => {
        subscriber.next(0);
        subscriber.complete();
    });
    return () => {
        Object(_zone_less_browser_browser__WEBPACK_IMPORTED_MODULE_4__["cancelAnimationFrame"])(id);
    };
});
const localCredentials = {
    name: 'local',
    work: (cdRef, _, notification) => {
        cdRef.detectChanges();
    },
    behavior: (work, scope) => (o$) => o$.pipe(Object(_utils_coalesceWith__WEBPACK_IMPORTED_MODULE_3__["coalesceWith"])(animationFrameTick(), scope), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(() => work())),
};
const globalCredentials = {
    name: 'global',
    work: (_, context) => Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmarkDirty"])(context),
    behavior: (work) => (o$) => o$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(() => work())),
};
const noopCredentials = {
    name: 'noop',
    work: () => void 0,
    behavior: () => (o$) => o$,
};
const nativeCredentials = {
    name: 'native',
    work: (cdRef) => cdRef.markForCheck(),
    behavior: (work) => (o$) => o$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(() => work())),
};
const RX_NATIVE_STRATEGIES = {
    global: globalCredentials,
    native: nativeCredentials,
    noop: noopCredentials,
    local: localCredentials,
};


/***/ }),

/***/ "NvUZ":
/*!****************************************************************!*\
  !*** ./libs/template/src/lib/core/utils/properties-weakmap.ts ***!
  \****************************************************************/
/*! exports provided: createPropertiesWeakMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPropertiesWeakMap", function() { return createPropertiesWeakMap; });
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


/***/ }),

/***/ "NwR/":
/*!***********************************************************************!*\
  !*** ./libs/cdk/src/lib/template-management/list-template-manager.ts ***!
  \***********************************************************************/
/*! exports provided: createListTemplateManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createListTemplateManager", function() { return createListTemplateManager; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "F2kK");
/* harmony import */ var _utils_onStrategy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/onStrategy */ "PbSv");
/* harmony import */ var _utils_strategy_handling__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/strategy-handling */ "6+wS");
/* harmony import */ var _list_view_handler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./list-view-handler */ "enTY");






function createListTemplateManager(config) {
    const { templateSettings, renderSettings, trackBy, iterableDiffers } = config;
    const { defaultStrategyName, strategies, cdRef: injectingViewCdRef, patchZone, parent, eRef, } = renderSettings;
    const strategyHandling$ = Object(_utils_strategy_handling__WEBPACK_IMPORTED_MODULE_4__["strategyHandling"])(defaultStrategyName, strategies);
    const differ = iterableDiffers.find([]).create(trackBy);
    //               type,  payload
    const tNode = parent
        ? Object(_utils__WEBPACK_IMPORTED_MODULE_2__["getTNode"])(injectingViewCdRef, eRef.nativeElement)
        : false;
    /* TODO (regarding createView): this is currently not in use. for the list-manager this would mean to provide
     functions for not only create. developers than should have to provide create, move, remove,... the whole thing.
     i don't know if this is the right decision for a first RC */
    const listViewHandler = Object(_list_view_handler__WEBPACK_IMPORTED_MODULE_5__["getTemplateHandler"])(Object.assign(Object.assign({}, templateSettings), { initialTemplateRef: templateSettings.templateRef, patchZone }));
    const viewContainerRef = templateSettings.viewContainerRef;
    let notifyParent = false;
    let changesArr;
    let partiallyFinished = false;
    return {
        nextStrategy(nextConfig) {
            strategyHandling$.next(nextConfig);
        },
        render(values$) {
            return values$.pipe(render());
        },
    };
    function render() {
        let count = 0;
        return (o$) => o$.pipe(
        // map iterable to latest diff
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((iterable) => {
            if (partiallyFinished) {
                const currentIterable = [];
                for (let i = 0, ilen = viewContainerRef.length; i < ilen; i++) {
                    const viewRef = viewContainerRef.get(i);
                    currentIterable[i] = viewRef.context.$implicit;
                }
                differ.diff(currentIterable);
            }
            return {
                changes: differ.diff(iterable),
                items: iterable != null && Array.isArray(iterable) ? iterable : [],
            };
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["withLatestFrom"])(strategyHandling$.strategy$), 
        // Cancel old renders
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(([{ changes, items }, strategy]) => {
            if (!changes) {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])([]);
            }
            const listChanges = listViewHandler.getListChanges(changes, items);
            changesArr = listChanges[0];
            const insertedOrRemoved = listChanges[1];
            const applyChanges$ = getObservablesFromChangesArray(changesArr, strategy, count);
            partiallyFinished = true;
            // @TODO we need to know if we need to notifyParent on move aswell
            notifyParent = insertedOrRemoved && parent;
            count = items.length;
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["merge"])(Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["combineLatest"])(
            // emit after all changes are rendered
            applyChanges$.length > 0 ? [...applyChanges$] : [Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(items)]).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(() => (partiallyFinished = false)), 
            // somehow this makes the strategySelect work
            Object(_utils__WEBPACK_IMPORTED_MODULE_2__["notifyAllParentsIfNeeded"])(tNode, injectingViewCdRef, strategy, () => notifyParent)), 
            // emit injectingParent if needed
            Object(_utils__WEBPACK_IMPORTED_MODULE_2__["notifyInjectingParentIfNeeded"])(injectingViewCdRef, strategy, insertedOrRemoved).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["ignoreElements"])()));
        }));
    }
    function getObservablesFromChangesArray(changes, strategy, count) {
        return changes.length > 0
            ? changes.map((change) => {
                return Object(_utils_onStrategy__WEBPACK_IMPORTED_MODULE_3__["onStrategy"])(change, strategy, (_change) => {
                    const type = _change[0];
                    const payload = _change[1];
                    switch (type) {
                        case 0 /* insert */:
                            listViewHandler.insertView(payload[0], payload[1], count);
                            break;
                        case 2 /* move */:
                            listViewHandler.moveView(payload[2], payload[0], payload[1], count);
                            break;
                        case 1 /* remove */:
                            listViewHandler.removeView(payload);
                            break;
                        case 3 /* update */:
                            listViewHandler.updateView(payload[0], payload[1], count);
                            break;
                        case 4 /* context */:
                            listViewHandler.updateUnchangedContext(payload[1], count);
                            break;
                    }
                }, {});
            })
            : [];
    }
}


/***/ }),

/***/ "NzIU":
/*!************************************************!*\
  !*** ./libs/state/src/lib/rx-state.service.ts ***!
  \************************************************/
/*! exports provided: RxState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RxState", function() { return RxState; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core */ "jym9");
/* harmony import */ var _cdk__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cdk */ "V1a+");
/* harmony import */ var _rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./rxjs/operators */ "XLH7");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");






/**
 * @description
 * RxState is a light-weight reactive state management service for managing local state in angular.
 *
 * @example
 * Component({
 *   selector: 'app-stateful',
 *   template: `<div>{{ state$ | async | json }}</div>`,
 *   providers: [RxState]
 * })
 * export class StatefulComponent {
 *   readonly state$ = this.state.select();
 *
 *   constructor(private state: RxState<{ foo: string }>) {}
 * }
 *
 * @docsCategory RxState
 * @docsPage RxState
 */
class RxState {
    /**
     * @internal
     */
    constructor() {
        this.subscription = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subscription"]();
        this.accumulator = Object(_cdk__WEBPACK_IMPORTED_MODULE_3__["createAccumulationObservable"])();
        this.effectObservable = Object(_cdk__WEBPACK_IMPORTED_MODULE_3__["createSideEffectObservable"])();
        /**
         * @description
         * The unmodified state exposed as `Observable<T>`. It is not shared, distinct or gets replayed.
         * Use the `$` property if you want to read the state without having applied {@link stateful} to it.
         */
        this.$ = this.accumulator.signal$;
        this.subscription.add(this.subscribe());
    }
    /**
     * @internal
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    /**
     * @description
     *
     * Allows to customize state accumulation function.
     * This can be helpful to implement deep updates and tackle other immutability problems in a custom way.
     * @example
     *
     * ```typescript
     * const myAccumulator = (state: MyState, slice: Partial<MyState>) => deepCopy(state, slice);
     *
     * this.state.setAccumulator(myAccumulator);
     * ```
     */
    setAccumulator(accumulatorFn) {
        this.accumulator.nextAccumulator(accumulatorFn);
    }
    /** @internal **/
    get(...keys) {
        const hasStateAnyKeys = Object.keys(this.accumulator.state).length > 0;
        if (!!keys && keys.length) {
            return Object(_core__WEBPACK_IMPORTED_MODULE_2__["safePluck"])(this.accumulator.state, keys);
        }
        else {
            return hasStateAnyKeys ?
                this.accumulator.state :
                undefined;
        }
    }
    /**
     * @internal
     */
    set(keyOrStateOrProjectState, stateOrSliceProjectFn) {
        if (typeof keyOrStateOrProjectState === 'object' &&
            stateOrSliceProjectFn === undefined) {
            this.accumulator.nextSlice(keyOrStateOrProjectState);
            return;
        }
        if (typeof keyOrStateOrProjectState === 'function' &&
            stateOrSliceProjectFn === undefined) {
            this.accumulator.nextSlice(keyOrStateOrProjectState(this.accumulator.state));
            return;
        }
        if (Object(_core__WEBPACK_IMPORTED_MODULE_2__["isKeyOf"])(keyOrStateOrProjectState) &&
            typeof stateOrSliceProjectFn === 'function') {
            const state = {};
            state[keyOrStateOrProjectState] = stateOrSliceProjectFn(this.accumulator.state);
            this.accumulator.nextSlice(state);
            return;
        }
        throw new Error('wrong params passed to set');
    }
    /**
     * @internal
     */
    connect(keyOrInputOrSlice$, projectOrSlices$, projectValueFn) {
        if (Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["isObservable"])(keyOrInputOrSlice$) &&
            projectOrSlices$ === undefined &&
            projectValueFn === undefined) {
            this.accumulator.nextSliceObservable(keyOrInputOrSlice$);
            return;
        }
        if (Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["isObservable"])(keyOrInputOrSlice$) &&
            typeof projectOrSlices$ === 'function' &&
            !Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["isObservable"])(projectOrSlices$) &&
            projectValueFn === undefined) {
            const project = projectOrSlices$;
            const slice$ = keyOrInputOrSlice$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((v) => project(this.get(), v)));
            this.accumulator.nextSliceObservable(slice$);
            return;
        }
        if (Object(_core__WEBPACK_IMPORTED_MODULE_2__["isKeyOf"])(keyOrInputOrSlice$) &&
            Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["isObservable"])(projectOrSlices$) &&
            projectValueFn === undefined) {
            const key = keyOrInputOrSlice$;
            const slice$ = projectOrSlices$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((value) => (Object.assign({}, { [key]: value }))));
            this.accumulator.nextSliceObservable(slice$);
            return;
        }
        if (Object(_core__WEBPACK_IMPORTED_MODULE_2__["isKeyOf"])(keyOrInputOrSlice$) &&
            Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["isObservable"])(projectOrSlices$) &&
            typeof projectValueFn === 'function') {
            const key = keyOrInputOrSlice$;
            const slice$ = projectOrSlices$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((value) => (Object.assign({}, { [key]: projectValueFn(this.get(), value) }))));
            this.accumulator.nextSliceObservable(slice$);
            return;
        }
        throw new Error('wrong params passed to connect');
    }
    /**
     * @internal
     */
    select(...opOrMapFn) {
        if (!opOrMapFn || opOrMapFn.length === 0) {
            return this.accumulator.state$.pipe(Object(_rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["stateful"])());
        }
        else if (Object(_core__WEBPACK_IMPORTED_MODULE_2__["isStringArrayGuard"])(opOrMapFn)) {
            return this.accumulator.state$.pipe(Object(_rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["stateful"])(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["pluck"])(...opOrMapFn)));
        }
        else if (Object(_core__WEBPACK_IMPORTED_MODULE_2__["isOperateFnArrayGuard"])(opOrMapFn)) {
            return this.accumulator.state$.pipe(Object(_rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["stateful"])(Object(_core__WEBPACK_IMPORTED_MODULE_2__["pipeFromArray"])(opOrMapFn)));
        }
        throw new Error('wrong params passed to select');
    }
    /**
     * @description
     * Manages side-effects of your state. Provide an `Observable<any>` **side-effect** and an optional
     * `sideEffectFunction`.
     * Subscription handling is done automatically.
     *
     * @example
     * // Directly pass an observable side-effect
     * const localStorageEffect$ = changes$.pipe(
     *  tap(changes => storeChanges(changes))
     * );
     * state.hold(localStorageEffect$);
     *
     * // Pass an additional `sideEffectFunction`
     *
     * const localStorageEffectFn = changes => storeChanges(changes);
     * state.hold(changes$, localStorageEffectFn);
     *
     * @param {Observable<S>} obsOrObsWithSideEffect
     * @param {function} [sideEffectFn]
     */
    hold(obsOrObsWithSideEffect, sideEffectFn) {
        const sideEffect = obsOrObsWithSideEffect.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(e => rxjs__WEBPACK_IMPORTED_MODULE_0__["EMPTY"]));
        if (typeof sideEffectFn === 'function') {
            this.effectObservable.nextEffectObservable(sideEffect.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(sideEffectFn)));
            return;
        }
        this.effectObservable.nextEffectObservable(sideEffect);
    }
    /**
     * @internal
     */
    subscribe() {
        const subscription = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subscription"]();
        subscription.add(this.accumulator.subscribe());
        subscription.add(this.effectObservable.subscribe());
        return subscription;
    }
}
RxState.ɵfac = function RxState_Factory(t) { return new (t || RxState)(); };
RxState.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({ token: RxState, factory: RxState.ɵfac });


/***/ }),

/***/ "O+0E":
/*!**********************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/zone-agnostic/rxjs/schedulers/Action.ts ***!
  \**********************************************************************************************/
/*! exports provided: Action */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Action", function() { return Action; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
// tslint:disable

/**
 * A unit of work to be executed in a `scheduler`. An action is typically
 * created from within a {@link SchedulerLike} and an RxJS user does not need to concern
 * themselves about creating and manipulating an Action.
 *
 * ```ts
 * class Action<T> extends Subscription {
 *   new (scheduler: Scheduler, work: (state?: T) => void);
 *   schedule(state?: T, delay: number = 0): Subscription;
 * }
 * ```
 *
 * @class Action<T>
 */
class Action extends rxjs__WEBPACK_IMPORTED_MODULE_0__["Subscription"] {
    constructor(scheduler, work) {
        super();
    }
    /**
     * Schedules this action on its parent {@link SchedulerLike} for execution. May be passed
     * some context object, `state`. May happen at some point in the future,
     * according to the `delay` parameter, if specified.
     * @param {T} [state] Some contextual data that the `work` function uses when
     * called by the Scheduler.
     * @param {number} [delay] Time to wait before executing the work, where the
     * time unit is implicit and defined by the Scheduler.
     * @return {void}
     */
    schedule(state, delay = 0) {
        return this;
    }
}


/***/ }),

/***/ "OEnZ":
/*!***************************************************!*\
  !*** ./apps/demos/src/app/app-component/index.ts ***!
  \***************************************************/
/*! exports provided: AppComponent, AppComponentModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component */ "eaOR");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return _app_component__WEBPACK_IMPORTED_MODULE_0__["AppComponent"]; });

/* harmony import */ var _app_component_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-component.module */ "db7/");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppComponentModule", function() { return _app_component_module__WEBPACK_IMPORTED_MODULE_1__["AppComponentModule"]; });





/***/ }),

/***/ "Ol8k":
/*!**********************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/render-aware/index.ts ***!
  \**********************************************************************/
/*! exports provided: createRenderAware */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _interfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interfaces */ "MqDg");
/* empty/unused harmony star reexport *//* harmony import */ var _render_aware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render-aware */ "Eaco");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createRenderAware", function() { return _render_aware__WEBPACK_IMPORTED_MODULE_1__["createRenderAware"]; });





/***/ }),

/***/ "OyBQ":
/*!****************************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/directives/unpatch/unpatch-events.directive.ts ***!
  \****************************************************************************************************/
/*! exports provided: unpatchEventListener, UnpatchEventsDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unpatchEventListener", function() { return unpatchEventListener; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnpatchEventsDirective", function() { return UnpatchEventsDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _rx_angular_cdk__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @rx-angular/cdk */ "cDIL");





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
    eventListeners.forEach((listener) => {
        // Remove and reapply listeners with patched API
        elem.removeEventListener(event, listener);
        // Reapply listeners with un-patched API
        Object(_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_3__["unpatchAddEventListener"])(event).addEventListener(listener);
    });
}
const eventsToUnpatch = [
    ..._rx_angular_cdk__WEBPACK_IMPORTED_MODULE_3__["mouseEvent"], ..._rx_angular_cdk__WEBPACK_IMPORTED_MODULE_3__["inputEvent"], ..._rx_angular_cdk__WEBPACK_IMPORTED_MODULE_3__["focusEvent"], ..._rx_angular_cdk__WEBPACK_IMPORTED_MODULE_3__["formControlsEvents"]
];
/**
 * @Directive UnpatchEventsDirective
 *
 * @description
 *
 * The `unpatch` directive helps in partially migrating to zone-less apps as well as getting rid
 * of unnecessary renderings through zones `addEventListener` patches.
 * It can be used on any element you apply event bindings.
 *
 * The current way of binding unpatch to the DOM is to use output bindings:
 *  ```html
 * <button (click)="doStuff($event)">click me</button>
 * ```
 *
 * The problem is that every event registered over `()` syntax, e.g. `(click)`
 * marks the component and all its ancestors as dirty and re-renders the whole component tree.
 * This is because zone.js patches the native browser API and whenever one of the patched APIs is used it re-renders.
 *
 * So even if your button is not related to a change that needs a re-render the app will re-render completely.
 * This leads to bad performance. This is especially helpful if you work with frequently fired unpatch like 'mousemove'
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
        this.subscription = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subscription"]();
        this.events$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](eventsToUnpatch);
    }
    /**
     * @description
     * List of unpatch that the element should be unpatched from. When input is empty or undefined,
     * the element is unpatched from all zone-patched unpatch.
     *
     * Full list of zone-patched browser unpatch can be found in
     * [this document](https://github.com/angular/angular/blob/master/packages/zone.js/STANDARD-APIS.md#browser).
     *
     */
    set events(events) {
        if (events && Array.isArray(events)) {
            this.events$.next(events);
        }
        else {
            this.events$.next(eventsToUnpatch);
        }
    }
    reapplyEventListenersZoneUnPatched(events) {
        events.forEach((ev) => {
            unpatchEventListener(this.el.nativeElement, ev);
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    ngAfterViewInit() {
        this.subscription = this.events$
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])((eventList) => this.reapplyEventListenersZoneUnPatched(eventList)))
            .subscribe();
    }
}
UnpatchEventsDirective.ɵfac = function UnpatchEventsDirective_Factory(t) { return new (t || UnpatchEventsDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])); };
UnpatchEventsDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: UnpatchEventsDirective, selectors: [["", "unpatch", ""]], inputs: { events: ["unpatch", "events"] } });


/***/ }),

/***/ "P+21":
/*!********************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/directives/let/model/template-names.ts ***!
  \********************************************************************************************/
/*! exports provided: RxLetTemplateNames */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RxLetTemplateNames", function() { return RxLetTemplateNames; });
/* harmony import */ var _rx_angular_cdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rx-angular/cdk */ "cDIL");

const RxLetTemplateNames = Object.assign(Object.assign({}, _rx_angular_cdk__WEBPACK_IMPORTED_MODULE_0__["RxBaseTemplateNames"]), { next: 'nextTpl' });


/***/ }),

/***/ "PEFc":
/*!******************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/rxjs/observable/tick-setInterval.ts ***!
  \******************************************************************************************/
/*! exports provided: intervalTick */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "intervalTick", function() { return intervalTick; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");

const intervalTick = () => new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"]((subscriber) => {
    const id = window.__zone_symbol__setInterval(() => {
        subscriber.next(0);
        subscriber.complete();
    });
    return () => {
        window.__zone_symbol__clearInterval(id);
    };
});


/***/ }),

/***/ "PbSv":
/*!**********************************************!*\
  !*** ./libs/cdk/src/lib/utils/onStrategy.ts ***!
  \**********************************************/
/*! exports provided: onStrategy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onStrategy", function() { return onStrategy; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");

/**
 * @internal
 *
 * @param value
 * @param strategy
 * @param workFactory
 * @param options
 */
function onStrategy(value, strategy, workFactory, options = {}) {
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(value).pipe(strategy.behavior(() => workFactory(value, strategy.work, options), options.scope || {}));
}


/***/ }),

/***/ "Pl8O":
/*!*************************************************************************!*\
  !*** ./libs/template/src/lib/core/render-aware/render-aware_creator.ts ***!
  \*************************************************************************/
/*! exports provided: createRenderAware, renderWithLatestStrategy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createRenderAware", function() { return createRenderAware; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderWithLatestStrategy", function() { return renderWithLatestStrategy; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _utils_rx_materialize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/rx-materialize */ "SGQy");



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
    const strategy$ = strategyName$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])((stringOrObservable) => typeof stringOrObservable === 'string'
        ? Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(stringOrObservable)
        : stringOrObservable), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((strategy) => {
        const s = cfg.strategies[strategy];
        if (!!s) {
            return s;
        }
        throw new Error(`Strategy ${strategy} does not exist.`);
    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])((s) => (currentStrategy = s)), 
    // do not repeat the steps before for each subscriber
    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["shareReplay"])({ bufferSize: 1, refCount: true }));
    const observablesFromTemplate$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["ReplaySubject"](1);
    const valuesFromTemplate$ = observablesFromTemplate$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["distinctUntilChanged"])());
    let firstTemplateObservableChange = true;
    const renderingEffect$ = valuesFromTemplate$.pipe(
    // handle null | undefined assignment and new Observable reset
    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((observable$) => {
        if (observable$ === null) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(null);
        }
        if (!firstTemplateObservableChange) {
            cfg.templateObserver.suspense();
            if (observable$ === undefined) {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(undefined);
            }
        }
        firstTemplateObservableChange = false;
        return observable$;
    }), 
    // forward only observable values
    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["filter"])((o$) => o$ !== undefined), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])((o$) => o$
        // Added behavior will get applied to the observable in `renderWithLatestStrategy`
        .pipe(
    // Forward only distinct values
    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["distinctUntilChanged"])(), 
    // Update completion, error and next
    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(cfg.templateObserver), renderWithLatestStrategy(strategy$))), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["publish"])());
    return {
        nextPotentialObservable(value) {
            observablesFromTemplate$.next(value);
        },
        nextStrategy(nextConfig) {
            strategyName$.next(nextConfig);
        },
        rendered$: renderingEffect$,
        activeStrategy$: strategy$,
        subscribe() {
            return new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subscription"]().add(renderingEffect$.connect());
        }
    };
}
function renderWithLatestStrategy(strategyChanges$) {
    const suspenseNotification = {
        kind: 'rxSuspense',
        value: undefined,
        hasValue: false,
        error: undefined,
    };
    return (o$) => {
        return o$.pipe(Object(_utils_rx_materialize__WEBPACK_IMPORTED_MODULE_2__["rxMaterialize"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["withLatestFrom"])(strategyChanges$), 
        // always use latest strategy on value change
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(([renderValue, strategy]) => Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["concat"])(Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(renderValue), rxjs__WEBPACK_IMPORTED_MODULE_0__["NEVER"]).pipe(strategy.rxScheduleCD)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["startWith"])(suspenseNotification));
    };
}


/***/ }),

/***/ "PsZF":
/*!******************************************************************!*\
  !*** ./libs/state/src/lib/transformation-helpers/array/index.ts ***!
  \******************************************************************/
/*! exports provided: insert, remove, toDictionary, update */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _insert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./insert */ "tJkR");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "insert", function() { return _insert__WEBPACK_IMPORTED_MODULE_0__["insert"]; });

/* harmony import */ var _remove__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./remove */ "2Cyy");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "remove", function() { return _remove__WEBPACK_IMPORTED_MODULE_1__["remove"]; });

/* harmony import */ var _toDictionary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./toDictionary */ "JR+X");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toDictionary", function() { return _toDictionary__WEBPACK_IMPORTED_MODULE_2__["toDictionary"]; });

/* harmony import */ var _update__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./update */ "LBpV");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "update", function() { return _update__WEBPACK_IMPORTED_MODULE_3__["update"]; });







/***/ }),

/***/ "Q6uP":
/*!***********************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/rxjs/observable/intersection-observer.ts ***!
  \***********************************************************************************************/
/*! exports provided: intersectionObserver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "intersectionObserver", function() { return intersectionObserver; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");

const observerSupported = () => typeof window !== 'undefined'
    ? !!window.IntersectionObserver
    : false;
function intersectionObserver(options) {
    const subject = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
    const observer = observerSupported()
        ? new IntersectionObserver((entries) => {
            entries.forEach((entry) => subject.next(entry));
        }, options)
        : null;
    const entries$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"]((subscriber) => {
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
        unobserve: observer.unobserve,
    };
}


/***/ }),

/***/ "QFH2":
/*!***************************************************************************!*\
  !*** ./libs/cdk/src/lib/zone-less/rxjs/scheduler/async/AsyncScheduler.ts ***!
  \***************************************************************************/
/*! exports provided: AsyncScheduler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AsyncScheduler", function() { return AsyncScheduler; });
/* harmony import */ var _Scheduler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Scheduler */ "x8G/");

class AsyncScheduler extends _Scheduler__WEBPACK_IMPORTED_MODULE_0__["Scheduler"] {
    constructor(SchedulerAction, now = _Scheduler__WEBPACK_IMPORTED_MODULE_0__["Scheduler"].now) {
        super(SchedulerAction, () => {
            if (AsyncScheduler.delegate && AsyncScheduler.delegate !== this) {
                return AsyncScheduler.delegate.now();
            }
            else {
                return now();
            }
        });
        this.actions = [];
        /**
         * A flag to indicate whether the Scheduler is currently executing a batch of
         * queued actions.
         * @type {boolean}
         * @deprecated internal use only
         */
        this.active = false;
        /**
         * An internal ID used to track the latest asynchronous task such as those
         * coming from `setTimeout`, `setInterval`, `requestAnimationFrame`, and
         * others.
         * @type {any}
         * @deprecated internal use only
         */
        this.scheduled = undefined;
    }
    schedule(work, delay = 0, state) {
        if (AsyncScheduler.delegate && AsyncScheduler.delegate !== this) {
            return AsyncScheduler.delegate.schedule(work, delay, state);
        }
        else {
            return super.schedule(work, delay, state);
        }
    }
    flush(action) {
        const { actions } = this;
        if (this.active) {
            actions.push(action);
            return;
        }
        let error;
        this.active = true;
        do {
            if ((error = action.execute(action.state, action.delay))) {
                break;
            }
            // @ts-ignore
        } while ((action = actions.shift())); // exhaust the scheduler queue
        this.active = false;
        if (error) {
            // @ts-ignore
            while ((action = actions.shift())) {
                action.unsubscribe();
            }
            throw error;
        }
    }
}
AsyncScheduler.delegate = null;


/***/ }),

/***/ "QMWD":
/*!*************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/pipes/push/index.ts ***!
  \*************************************************************************/
/*! exports provided: PushPipe, PushModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _push_pipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./push.pipe */ "eYr4");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PushPipe", function() { return _push_pipe__WEBPACK_IMPORTED_MODULE_0__["PushPipe"]; });

/* harmony import */ var _push_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./push.module */ "kFmr");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PushModule", function() { return _push_module__WEBPACK_IMPORTED_MODULE_1__["PushModule"]; });





/***/ }),

/***/ "QZMm":
/*!****************************************************************************************************!*\
  !*** ./libs/template/src/lib/experimental/unpatch/events/unpatch-events.experimental.directive.ts ***!
  \****************************************************************************************************/
/*! exports provided: unpatchEventListener, UnpatchEventsDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unpatchEventListener", function() { return unpatchEventListener; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnpatchEventsDirective", function() { return UnpatchEventsDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _unpatch_event_list_experimental__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unpatch-event-list.experimental */ "hsT0");
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../core/utils */ "Wzuy");





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
function unpatchEventListener(element, event) {
    // `EventTarget` is patched only in the browser environment, thus
    // running this code on the server-side will throw an exception:
    // `TypeError: element.eventListeners is not a function`.
    if (typeof element.eventListeners !== 'function') {
        return;
    }
    const eventListeners = element.eventListeners(event);
    // Return if no event listeners are present
    if (!eventListeners) {
        return;
    }
    const addEventListener = Object(_core_utils__WEBPACK_IMPORTED_MODULE_3__["getZoneUnPatchedApi"])('addEventListener', element).bind(element);
    eventListeners.forEach((listener) => {
        // Remove and reapply listeners with patched API
        // @TODO use (elem as any).removeAllListeners?(eventName?: string): void;
        element.removeEventListener(event, listener);
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
 * <button [unpatch] (click)="triggerSomeMethod($event)">click me</button>
 * <button [unpatch]="['mousemove']" (mousemove)="doStuff2($event)" (click)="doStuff($event)">click me</button>
 * ```
 *
 * @publicApi
 */
// tslint:disable-next-line:directive-selector
class UnpatchEventsDirective {
    constructor(el) {
        this.el = el;
        this.subscription = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subscription"]();
        this.events$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](_unpatch_event_list_experimental__WEBPACK_IMPORTED_MODULE_2__["zonePatchedEvents"]);
    }
    reapplyEventListenersZoneUnPatched(events) {
        events.forEach((ev) => {
            unpatchEventListener(this.el.nativeElement, ev);
        });
    }
    ngOnChanges({ events }) {
        if (events && Array.isArray(this.events)) {
            this.events$.next(this.events);
        }
    }
    ngAfterViewInit() {
        this.subscription = this.events$.subscribe((eventList) => {
            this.reapplyEventListenersZoneUnPatched(eventList);
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
UnpatchEventsDirective.ɵfac = function UnpatchEventsDirective_Factory(t) { return new (t || UnpatchEventsDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])); };
UnpatchEventsDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: UnpatchEventsDirective, selectors: [["", "unpatch", ""]], inputs: { events: ["unpatch", "events"] }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]] });


/***/ }),

/***/ "QcBo":
/*!******************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/rxjs/operators/index.ts ***!
  \******************************************************************************/
/*! exports provided: stateful, select, distinctUntilSomeChanged, selectSlice, ngInputFlatten, rxMaterialize, coalesceWith, observableToRxTemplateName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stateful__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stateful */ "6bkt");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stateful", function() { return _stateful__WEBPACK_IMPORTED_MODULE_0__["stateful"]; });

/* harmony import */ var _select__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./select */ "2AMg");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "select", function() { return _select__WEBPACK_IMPORTED_MODULE_1__["select"]; });

/* harmony import */ var _distinctUntilSomeChanged__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./distinctUntilSomeChanged */ "6W6m");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "distinctUntilSomeChanged", function() { return _distinctUntilSomeChanged__WEBPACK_IMPORTED_MODULE_2__["distinctUntilSomeChanged"]; });

/* harmony import */ var _selectSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./selectSlice */ "E8rn");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "selectSlice", function() { return _selectSlice__WEBPACK_IMPORTED_MODULE_3__["selectSlice"]; });

/* harmony import */ var _ngInputFlatten__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ngInputFlatten */ "1V0p");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ngInputFlatten", function() { return _ngInputFlatten__WEBPACK_IMPORTED_MODULE_4__["ngInputFlatten"]; });

/* harmony import */ var _rx_materialize__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./rx-materialize */ "r2o8");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rxMaterialize", function() { return _rx_materialize__WEBPACK_IMPORTED_MODULE_5__["rxMaterialize"]; });

/* harmony import */ var _coalesceWith__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./coalesceWith */ "WgaG");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "coalesceWith", function() { return _coalesceWith__WEBPACK_IMPORTED_MODULE_6__["coalesceWith"]; });

/* harmony import */ var _observable_to_rx_template_name__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./observable-to-rx-template-name */ "zpa+");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "observableToRxTemplateName", function() { return _observable_to_rx_template_name__WEBPACK_IMPORTED_MODULE_7__["observableToRxTemplateName"]; });











/***/ }),

/***/ "QfxS":
/*!**********************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/directives/switch/rx-switch.directive.ts ***!
  \**********************************************************************************************/
/*! exports provided: RxSwitch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RxSwitch", function() { return RxSwitch; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _rx_angular_cdk__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @rx-angular/cdk */ "cDIL");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");




class RxSwitch {
    constructor() {
        this.strategyHandler = Object(_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_2__["hotFlatten"])(undefined, Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["mergeAll"])());
        this.observables$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["ReplaySubject"](1);
        this.viewContext = { $implicit: undefined };
        this.values$ = this.observables$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchAll"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["distinctUntilChanged"])());
    }
    set rxSwitch(potentialObservable) {
        this.observables$.next(potentialObservable);
    }
    set strategy(strategyName) {
        this.strategyHandler.next(strategyName);
    }
}
RxSwitch.ɵfac = function RxSwitch_Factory(t) { return new (t || RxSwitch)(); };
RxSwitch.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineDirective"]({ type: RxSwitch, selectors: [["", "rxSwitch", ""]], inputs: { rxSwitch: "rxSwitch", strategy: ["rxLetStrategy", "strategy"] } });


/***/ }),

/***/ "QmdT":
/*!***************************************************************************!*\
  !*** ./libs/cdk/src/lib/zone-configuration/model/configurations.types.ts ***!
  \***************************************************************************/
/*! exports provided: zoneGlobalDisableConfigurationsKeys, zoneGlobalEventsConfigurationsKeys, zoneGlobalSettingsConfigurationsKeys, zoneRuntimeConfigurationsKeys, zoneTestDisableConfigurationsKeys, zoneTestSettingsConfigurationsKeys */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zoneGlobalDisableConfigurationsKeys", function() { return zoneGlobalDisableConfigurationsKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zoneGlobalEventsConfigurationsKeys", function() { return zoneGlobalEventsConfigurationsKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zoneGlobalSettingsConfigurationsKeys", function() { return zoneGlobalSettingsConfigurationsKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zoneRuntimeConfigurationsKeys", function() { return zoneRuntimeConfigurationsKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zoneTestDisableConfigurationsKeys", function() { return zoneTestDisableConfigurationsKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zoneTestSettingsConfigurationsKeys", function() { return zoneTestSettingsConfigurationsKeys; });
// prefix: __Zone_disable_
const zoneGlobalDisableConfigurationsKeys = [
    'EventEmitter',
    'fs',
    'node_timers',
    'nextTick',
    'crypto',
    'defineProperty',
    'registerElement',
    'EventTargetLegacy',
    'timers',
    'requestAnimationFrame',
    'blocking',
    'EventTarget',
    'FileReader',
    'MutationObserver',
    'IntersectionObserver',
    'on_property',
    'customElements',
    'XHR',
    'geolocation',
    'canvas',
    'ZoneAwarePromise',
];
// prefix: __zone_symbol__
const zoneGlobalEventsConfigurationsKeys = [
    'UNPATCHED_EVENTS',
    'PASSIVE_EVENTS',
];
// prefix: __zone_symbol__
const zoneGlobalSettingsConfigurationsKeys = [
    'DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION',
];
// prefix: __zone_symbol__
const zoneRuntimeConfigurationsKeys = [
    'ignoreConsoleErrorUncaughtError',
];
// prefix: __Zone_disable_
const zoneTestDisableConfigurationsKeys = [
    'jasmine',
    'mocha',
    'jest',
];
// prefix: __zone_symbol__
const zoneTestSettingsConfigurationsKeys = [
    'fakeAsyncDisablePatchingClock',
    'fakeAsyncAutoFakeAsyncWhenClockPatched',
    'supportWaitUnResolvedChainedPromise',
];


/***/ }),

/***/ "Qn8Q":
/*!*******************************************************************************!*\
  !*** ./libs/state/src/lib/transformation-helpers/object/dictionaryToArray.ts ***!
  \*******************************************************************************/
/*! exports provided: dictionaryToArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dictionaryToArray", function() { return dictionaryToArray; });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core */ "jym9");

/**
 * @description
 * Converts a dictionary of type {[key: string]: T} to array T[].
 *
 * @example
 *
 * const creaturesDictionary = {
 *   '1': {id: 1, type: 'cat'},
 *   '2': {id: 2, type: 'dog'},
 *   '3': {id: 3, type: 'parrot'}
 * };
 *
 * const creaturesArray = dictionaryToArray(creaturesDictionary);
 *
 * // creaturesArray will be:
 * // [{id: 1, type: 'cat'}, {id: 2, type: 'dog'}, {id: 3, type: 'parrot'}];
 *
 * @example
 * // Usage with RxState
 *
 * export class ListComponent {
 *    readonly removeName$ = new Subject();
 *
 *    constructor(
 *      private state: RxState<ComponentState>,
 *      private api: ApiService
 *    ) {
 *      // Reactive implementation
 *      state.connect(
 *        'creatures',
 *        this.api.creaturesDictionary$,
 *        (_, creatures) => {
 *            return dictionaryToArray(creatures);
 *        }
 *      );
 *    }
 *
 *    // Imperative implementation
 *    removeName(): void {
 *      this.api.creaturesDictionary$.pipe(
 *        // subscription handling logic
 *      ).subscribe(
 *        dictionary => this.set({creatures: dictionaryToArray(dictionary)})
 *      );
 *    }
 * }
 *
 * @returns T[];
 *
 * @docsPage dictionaryToArray
 * @docsCategory transformation-helpers
 */
function dictionaryToArray(dictionary) {
    if (!Object(_core__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(dictionary)) {
        return dictionary;
    }
    if (!Object(_core__WEBPACK_IMPORTED_MODULE_0__["isObjectGuard"])(dictionary)) {
        console.warn(`DictionaryToArray: unexpected input.`);
        return [];
    }
    return Object.values(dictionary);
}


/***/ }),

/***/ "RWYI":
/*!******************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/components/context/context.module.ts ***!
  \******************************************************************************************/
/*! exports provided: RxContextModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RxContextModule", function() { return RxContextModule; });
/* harmony import */ var _directives_switch_rx_swich_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../directives/switch/rx-swich.module */ "XE0J");
/* harmony import */ var _rx_context_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rx-context.directive */ "U97y");
/* harmony import */ var _rx_context_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rx-context.component */ "6epE");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
// @TODO dependency to other tool is something we should avoid




const DECLARATIONS = [
    _rx_context_directive__WEBPACK_IMPORTED_MODULE_1__["RxContext"], _rx_context_component__WEBPACK_IMPORTED_MODULE_2__["RxContextContainer"]
];
class RxContextModule {
}
RxContextModule.ɵfac = function RxContextModule_Factory(t) { return new (t || RxContextModule)(); };
RxContextModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: RxContextModule });
RxContextModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[_directives_switch_rx_swich_module__WEBPACK_IMPORTED_MODULE_0__["RxSwichModule"]]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](RxContextModule, { declarations: [_rx_context_directive__WEBPACK_IMPORTED_MODULE_1__["RxContext"], _rx_context_component__WEBPACK_IMPORTED_MODULE_2__["RxContextContainer"]], imports: [_directives_switch_rx_swich_module__WEBPACK_IMPORTED_MODULE_0__["RxSwichModule"]], exports: [_rx_context_directive__WEBPACK_IMPORTED_MODULE_1__["RxContext"], _rx_context_component__WEBPACK_IMPORTED_MODULE_2__["RxContextContainer"]] }); })();


/***/ }),

/***/ "Rc0r":
/*!****************************************************************!*\
  !*** ./libs/cdk/src/lib/zone-less/rxjs/operators/fromEvent.ts ***!
  \****************************************************************/
/*! exports provided: fromEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromEvent", function() { return fromEvent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils */ "FflV");
// tslint:disable



// @ts-ignore
const isFunction = (fn) => typeof fn === 'function';
const isArray = Array.isArray;
const toString = (() => Object.prototype.toString)();
/* tslint:enable:max-line-length */
function fromEvent(target, eventName, options, resultSelector) {
    if (isFunction(options)) {
        // DEPRECATED PATH
        // @ts-ignore
        resultSelector = options;
        options = undefined;
    }
    if (resultSelector) {
        // DEPRECATED PATH
        return fromEvent(target, eventName, options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((args) => isArray(args) ? resultSelector(...args) : resultSelector(args)));
    }
    return new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"]((subscriber) => {
        function handler(e) {
            if (arguments.length > 1) {
                subscriber.next(Array.prototype.slice.call(arguments));
            }
            else {
                subscriber.next(e);
            }
        }
        setupSubscription(target, eventName, handler, subscriber, options);
    });
}
function setupSubscription(sourceObj, eventName, handler, subscriber, options) {
    let unsubscribe;
    if (isEventTarget(sourceObj)) {
        const source = sourceObj;
        Object(_utils__WEBPACK_IMPORTED_MODULE_2__["getZoneUnPatchedApi"])('addEventListener', sourceObj)(eventName, handler, options);
        unsubscribe = () => Object(_utils__WEBPACK_IMPORTED_MODULE_2__["getZoneUnPatchedApi"])('removeEventListener', source)(eventName, handler, options);
    }
    else if (isJQueryStyleEventEmitter(sourceObj)) {
        const source = sourceObj;
        sourceObj.on(eventName, handler);
        unsubscribe = () => source.off(eventName, handler);
    }
    else if (isNodeStyleEventEmitter(sourceObj)) {
        const source = sourceObj;
        sourceObj.addListener(eventName, handler);
        unsubscribe = () => source.removeListener(eventName, handler);
    }
    else if (sourceObj && sourceObj.length) {
        for (let i = 0, len = sourceObj.length; i < len; i++) {
            setupSubscription(sourceObj[i], eventName, handler, subscriber, options);
        }
    }
    else {
        throw new TypeError('Invalid event target');
    }
    subscriber.add(unsubscribe);
}
function isNodeStyleEventEmitter(sourceObj) {
    return (sourceObj &&
        typeof sourceObj.addListener === 'function' &&
        typeof sourceObj.removeListener === 'function');
}
function isJQueryStyleEventEmitter(sourceObj) {
    return (sourceObj &&
        typeof sourceObj.on === 'function' &&
        typeof sourceObj.off === 'function');
}
function isEventTarget(sourceObj) {
    return (sourceObj &&
        typeof sourceObj.addEventListener === 'function' &&
        typeof sourceObj.removeEventListener === 'function');
}


/***/ }),

/***/ "Rcf7":
/*!***************************************************************************************!*\
  !*** ./apps/demos/src/app/features/performance/rx-let-vs-push/rx-let-vs-push.menu.ts ***!
  \***************************************************************************************/
/*! exports provided: RXLET_VS_PUSH_MENU_ITEMS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RXLET_VS_PUSH_MENU_ITEMS", function() { return RXLET_VS_PUSH_MENU_ITEMS; });
const RXLET_VS_PUSH_MENU_ITEMS = [
    {
        link: 'rx-let-vs-push',
        label: 'RxLet vs Push',
        children: [
            {
                link: 'list-toggle',
                label: 'List toggle',
            },
        ],
    },
];


/***/ }),

/***/ "RrN1":
/*!********************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/zone-agnostic/get-resolved-promise.ts ***!
  \********************************************************************************************/
/*! exports provided: getResolvedPromise */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getResolvedPromise", function() { return getResolvedPromise; });
/* harmony import */ var _zone_agnostic_browser_Promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../zone-agnostic/browser/Promise */ "Vgdy");
/** A shared promise instance to cause a delay of one microtask */

let resolvedPromise = null;
function getResolvedPromise() {
    resolvedPromise = resolvedPromise || _zone_agnostic_browser_Promise__WEBPACK_IMPORTED_MODULE_0__["Promise"].resolve();
    return resolvedPromise;
}


/***/ }),

/***/ "SDiw":
/*!*************************************************************************************!*\
  !*** ./libs/state/src/lib/transformation-helpers/_internals/valuesComparer.util.ts ***!
  \*************************************************************************************/
/*! exports provided: valuesComparer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "valuesComparer", function() { return valuesComparer; });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core */ "jym9");

function valuesComparer(original, incoming, compare) {
    const defaultCompare = (a, b) => a === b;
    if (Object(_core__WEBPACK_IMPORTED_MODULE_0__["isKeyOf"])(compare)) {
        return original[compare] === incoming[compare];
    }
    if (Array.isArray(compare)) {
        const sanitizedKeys = compare.filter((k) => Object(_core__WEBPACK_IMPORTED_MODULE_0__["isKeyOf"])(k));
        return !!sanitizedKeys.length
            ? sanitizedKeys.every((k) => original[k] === incoming[k])
            : defaultCompare(original, incoming);
    }
    return (compare || defaultCompare)(original, incoming);
}


/***/ }),

/***/ "SEs6":
/*!*****************************************************!*\
  !*** ./libs/state/src/lib/rxjs/operators/select.ts ***!
  \*****************************************************/
/*! exports provided: select */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "select", function() { return select; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _core_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils */ "MqKN");
/* harmony import */ var _stateful__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stateful */ "ChVF");



/**
 * @internal
 */
function select(...opOrMapFn) {
    return (state$) => {
        if (!opOrMapFn || opOrMapFn.length === 0) {
            return state$.pipe(Object(_stateful__WEBPACK_IMPORTED_MODULE_2__["stateful"])());
        }
        else if (Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__["isStringArrayGuard"])(opOrMapFn)) {
            return state$.pipe(Object(_stateful__WEBPACK_IMPORTED_MODULE_2__["stateful"])(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["pluck"])(...opOrMapFn)));
        }
        else if (Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__["isOperateFnArrayGuard"])(opOrMapFn)) {
            return state$.pipe(Object(_stateful__WEBPACK_IMPORTED_MODULE_2__["stateful"])(Object(_core_utils__WEBPACK_IMPORTED_MODULE_1__["pipeFromArray"])(opOrMapFn)));
        }
        else {
            throw new Error('wrong params passed to select');
        }
    };
}


/***/ }),

/***/ "SGQy":
/*!************************************************************!*\
  !*** ./libs/template/src/lib/core/utils/rx-materialize.ts ***!
  \************************************************************/
/*! exports provided: rxMaterialize, notificationKindToRxNotificationKind */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rxMaterialize", function() { return rxMaterialize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "notificationKindToRxNotificationKind", function() { return notificationKindToRxNotificationKind; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "kU1M");

function rxMaterialize() {
    return o$ => o$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["materialize"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["tap"])(({ kind, error }) => {
        if (kind === 'E') {
            console.error(error);
        }
    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(({ value, hasValue, error, kind }) => ({
        value,
        hasValue,
        error,
        kind: notificationKindToRxNotificationKind(kind)
    })));
}
function notificationKindToRxNotificationKind(kind) {
    switch (kind) {
        case 'C':
            return 'rxComplete';
        case 'E':
            return 'rxError';
        case 'N':
        default:
            return 'rxNext';
    }
}


/***/ }),

/***/ "T1Ye":
/*!*************************************************!*\
  !*** ./libs/cdk/src/lib/utils/rxMaterialize.ts ***!
  \*************************************************/
/*! exports provided: rxMaterialize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rxMaterialize", function() { return rxMaterialize; });
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../model */ "pJB2");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _notification_transforms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./notification-transforms */ "3PYK");



const notificationToRxNotification = (notification) => {
    const kind = rxJsToRxA[notification.kind];
    if (kind === _model__WEBPACK_IMPORTED_MODULE_0__["RxNotificationKind"].error) {
        return Object(_notification_transforms__WEBPACK_IMPORTED_MODULE_2__["toRxErrorNotification"])(notification.error);
    }
    if (kind === _model__WEBPACK_IMPORTED_MODULE_0__["RxNotificationKind"].complete) {
        return Object(_notification_transforms__WEBPACK_IMPORTED_MODULE_2__["toRxCompleteNotification"])(notification.value);
    }
    return Object.assign(Object.assign({}, notification), { error: false, complete: false, kind });
};
const rxJsToRxA = {
    C: _model__WEBPACK_IMPORTED_MODULE_0__["RxNotificationKind"].complete,
    E: _model__WEBPACK_IMPORTED_MODULE_0__["RxNotificationKind"].error,
    N: _model__WEBPACK_IMPORTED_MODULE_0__["RxNotificationKind"].next,
};
function rxMaterialize() {
    return (o$) => o$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["materialize"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(({ kind, error }) => {
        if (kind === 'E') {
            console.error(error);
        }
    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(notificationToRxNotification));
}


/***/ }),

/***/ "T8ix":
/*!************************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/directives/if-visible/if-visible.module.ts ***!
  \************************************************************************************************/
/*! exports provided: IfVisibleModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IfVisibleModule", function() { return IfVisibleModule; });
/* harmony import */ var _if_visible_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./if-visible.directive */ "eUZg");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");



const DECLARATIONS = [
    _if_visible_directive__WEBPACK_IMPORTED_MODULE_0__["IfVisibleDirective"]
];
class IfVisibleModule {
}
IfVisibleModule.ɵfac = function IfVisibleModule_Factory(t) { return new (t || IfVisibleModule)(); };
IfVisibleModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: IfVisibleModule });
IfVisibleModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ providers: [], imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](IfVisibleModule, { declarations: [_if_visible_directive__WEBPACK_IMPORTED_MODULE_0__["IfVisibleDirective"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]], exports: [_if_visible_directive__WEBPACK_IMPORTED_MODULE_0__["IfVisibleDirective"]] }); })();


/***/ }),

/***/ "TiBF":
/*!************************************************************************!*\
  !*** ./libs/cdk/src/lib/zone-less/rxjs/scheduler/queue/QueueAction.ts ***!
  \************************************************************************/
/*! exports provided: QueueAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueueAction", function() { return QueueAction; });
/* harmony import */ var _async_AsyncAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../async/AsyncAction */ "ErOQ");
// tslint:disable

/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class QueueAction extends _async_AsyncAction__WEBPACK_IMPORTED_MODULE_0__["AsyncAction"] {
    constructor(scheduler, work) {
        super(scheduler, work);
        this.scheduler = scheduler;
        this.work = work;
    }
    schedule(state, delay = 0) {
        if (delay > 0) {
            return super.schedule(state, delay);
        }
        this.delay = delay;
        this.state = state;
        // @ts-ignore
        this.scheduler.flush(this);
        return this;
    }
    execute(state, delay) {
        return delay > 0 || this.closed
            ? super.execute(state, delay)
            : this._execute(state, delay);
    }
    requestAsyncId(scheduler, id, delay = 0) {
        // If delay exists and is greater than 0, or if the delay is null (the
        // action wasn't rescheduled) but was originally scheduled as an async
        // action, then recycle as an async action.
        if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
            return super.requestAsyncId(scheduler, id, delay);
        }
        // Otherwise flush the scheduler starting with this action.
        // @ts-ignore
        return scheduler.flush(this);
    }
}


/***/ }),

/***/ "TqA6":
/*!*******************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/directives/if/model/template-names.ts ***!
  \*******************************************************************************************/
/*! exports provided: RxIfTemplateNames */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RxIfTemplateNames", function() { return RxIfTemplateNames; });
/* harmony import */ var _rx_angular_cdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rx-angular/cdk */ "cDIL");

const RxIfTemplateNames = Object.assign(Object.assign({}, _rx_angular_cdk__WEBPACK_IMPORTED_MODULE_0__["RxBaseTemplateNames"]), { then: 'rxThen', else: 'rxElse' });


/***/ }),

/***/ "U97y":
/*!************************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/components/context/rx-context.directive.ts ***!
  \************************************************************************************************/
/*! exports provided: RxContext */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RxContext", function() { return RxContext; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _rx_angular_cdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @rx-angular/cdk */ "cDIL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _cdk_hooks_hooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../cdk/hooks/hooks */ "NM00");
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./model */ "s7gA");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _rx_angular_state__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @rx-angular/state */ "YYsp");











// tslint:disable-next-line:directive-class-suffix
class RxContext extends _cdk_hooks_hooks__WEBPACK_IMPORTED_MODULE_3__["Hooks"] {
    constructor(strategyProvider, cdRef, nextTemplateRef, viewContainerRef, rxState) {
        super();
        this.strategyProvider = strategyProvider;
        this.cdRef = cdRef;
        this.nextTemplateRef = nextTemplateRef;
        this.viewContainerRef = viewContainerRef;
        this.rxState = rxState;
        this.strategy$ = this.rxState.select(
        // ngInputFlatten(),
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["startWith"])(this.strategyProvider.primaryStrategy));
        this.observablesFromTemplate$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["ReplaySubject"](1);
        this.valuesFromTemplate$ = this.observablesFromTemplate$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["distinctUntilChanged"])());
        this.subscription = rxjs__WEBPACK_IMPORTED_MODULE_2__["Subscription"].EMPTY;
        this.initialViewContext = {
            $implicit: undefined,
            $error: false,
            $complete: false,
            $suspense: false
        };
        /* this.templateManager = createTemplateManager(
           this.viewContainerRef,
           this.initialViewContext
         );*/
    }
    set rxContext(potentialObservable) {
        // this.rxState.connect('templateName', potentialObservable.pipe(toTemplateName()));
    }
    set strategy(strategyName$) {
        this.rxState.connect('strategyName', Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["isObservable"])(strategyName$) ? strategyName$ : Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(strategyName$));
    }
    set rxComplete(templateRef) {
        this.templateManager.addTemplateRef(_model__WEBPACK_IMPORTED_MODULE_4__["RxContextTemplateNames"].complete, templateRef);
    }
    set rxError(templateRef) {
        this.templateManager.addTemplateRef(_model__WEBPACK_IMPORTED_MODULE_4__["RxContextTemplateNames"].error, templateRef);
    }
    set rxSuspense(templateRef) {
        this.templateManager.addTemplateRef(_model__WEBPACK_IMPORTED_MODULE_4__["RxContextTemplateNames"].suspense, templateRef);
    }
    set rxCompleteTrigger(complete$) {
        this.rxState.connect('templateName', complete$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["mapTo"])(_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_1__["RxNotificationKind"].complete)));
    }
    set rxErrorTrigger(error$) {
        this.rxState.connect('templateName', error$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["mapTo"])(_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_1__["RxNotificationKind"].error)));
    }
    set rxSuspenseTrigger(suspense$) {
        this.rxState.connect('templateName', suspense$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["mapTo"])(_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_1__["RxNotificationKind"].suspense)));
    }
    /** @internal */
    static ngTemplateContextGuard(dir, ctx) {
        return true;
    }
    ngOnInit() {
        this.templateManager.addTemplateRef(_model__WEBPACK_IMPORTED_MODULE_4__["RxContextTemplateNames"].content, this.nextTemplateRef);
        // this.templateManager.displayView(RxContextTemplateNames.content);
        if (!this.rxState.get('templateName')) {
            this.rxState.set({ templateName: _rx_angular_cdk__WEBPACK_IMPORTED_MODULE_1__["RxNotificationKind"].suspense });
        }
        /*this.rxState.hold(this.rxState.select(
          map(s => s.templateName),
          distinctUntilChanged(),
          withLatestFrom(this.strategy$),
          switchMap(([templateName, strategy]) => {
            return of(templateName).pipe(
              strategy.behavior(() => {
               /!* const name = this.templateManager.getTemplateName(templateName as any, RxContextTemplateNames.content);
                // this.templateManager.displayContextView(name);
                const view = this.templateManager.getEmbeddedView(name);*!/
               /!* if (view) {
                  strategy.work(view, view);
                }*!/
                strategy.work(this.cdRef, (this.cdRef as any)?.context || this.cdRef);
              }, this)
            );
          })
          )
        );*/
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        // this.templateManager.destroy();
    }
}
RxContext.ɵfac = function RxContext_Factory(t) { return new (t || RxContext)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_1__["RxStrategyProvider"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_rx_angular_state__WEBPACK_IMPORTED_MODULE_6__["RxState"])); };
RxContext.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: RxContext, selectors: [["", "rxContext", ""]], inputs: { rxContext: "rxContext", strategy: ["rxContextStrategy", "strategy"], rxComplete: ["rxContextCompleteTpl", "rxComplete"], rxError: ["rxContextErrorTpl", "rxError"], rxSuspense: ["rxContextSuspenseTpl", "rxSuspense"], rxCompleteTrigger: ["rxContextCompleteTrg", "rxCompleteTrigger"], rxErrorTrigger: ["rxContextErrorTrg", "rxErrorTrigger"], rxSuspenseTrigger: ["rxContextSuspenseTrg", "rxSuspenseTrigger"] }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_rx_angular_state__WEBPACK_IMPORTED_MODULE_6__["RxState"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]] });
function toTemplateName() {
    /*return (o$: Observable<T>): Observable<RxNotificationKind> => o$.pipe(
      rxMaterialize(),
      filter(notification => notification.kind === RxNotificationKind.next),
      map(n => n.kind)
    );*/
}


/***/ }),

/***/ "US9D":
/*!*******************************************************************!*\
  !*** ./libs/state/src/lib/transformation-helpers/object/patch.ts ***!
  \*******************************************************************/
/*! exports provided: patch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "patch", function() { return patch; });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core */ "jym9");

/**
 * @description
 * Merges an object of type T with updates of type Partial<T>.
 * Returns a new object where updates override original values while not mutating the original one.

 * @example
 * interface Creature {
 *  id: number,
 *  type: string,
 *  name: string
 * }
 *
 * const cat = {id: 1, type: 'cat'};
 *
 * const catWithname = patch(cat, {name: 'Fluffy'});
 *
 * // catWithname will be:
 * // {id: 1, type: 'cat', name: 'Fluffy'};
 *
 * @example
 * // Usage with RxState
 *
 * export class ProfileComponent {
 *
 *    readonly changeName$ = new Subject<string>();
 *
 *    constructor(private state: RxState<ComponentState>) {
 *      // Reactive implementation
 *      state.connect(
 *        this.changeName$,
 *        (state, name) => {
 *            return patch(state, { name });
 *        }
 *      );
 *    }
 *
 *    // Imperative implementation
 *    changeName(name: string): void {
 *        this.state.set(patch(this.get(), { name }));
 *    }
 * }
 *
 * @returns T
 *
 * @docsPage patch
 * @docsCategory transformation-helpers
 */
function patch(object, upd) {
    const update = Object(_core__WEBPACK_IMPORTED_MODULE_0__["isObjectGuard"])(upd) ? upd : {};
    if (!Object(_core__WEBPACK_IMPORTED_MODULE_0__["isObjectGuard"])(object) && Object(_core__WEBPACK_IMPORTED_MODULE_0__["isObjectGuard"])(upd)) {
        console.warn(`Patch: original value ${object} is not an object.`);
        return Object.assign({}, update);
    }
    if (!Object(_core__WEBPACK_IMPORTED_MODULE_0__["isObjectGuard"])(object) && !Object(_core__WEBPACK_IMPORTED_MODULE_0__["isObjectGuard"])(upd)) {
        console.warn(`Patch: original value ${object} and updates ${upd} are not objects.`);
        return object;
    }
    return Object.assign(Object.assign({}, object), update);
}


/***/ }),

/***/ "V1a+":
/*!*****************************************!*\
  !*** ./libs/state/src/lib/cdk/index.ts ***!
  \*****************************************/
/*! exports provided: createAccumulationObservable, createSideEffectObservable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _accumulation_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./accumulation-observable */ "+JX6");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createAccumulationObservable", function() { return _accumulation_observable__WEBPACK_IMPORTED_MODULE_0__["createAccumulationObservable"]; });

/* harmony import */ var _side_effect_observable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./side-effect-observable */ "69rr");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createSideEffectObservable", function() { return _side_effect_observable__WEBPACK_IMPORTED_MODULE_1__["createSideEffectObservable"]; });





/***/ }),

/***/ "V4xg":
/*!***********************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/zone-agnostic/zone-checks.ts ***!
  \***********************************************************************************/
/*! exports provided: getZoneUnPatchedApi, isEnvZonePatched, isApiZonePatched, isNgZone, isNoopNgZone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getZoneUnPatchedApi", function() { return getZoneUnPatchedApi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEnvZonePatched", function() { return isEnvZonePatched; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isApiZonePatched", function() { return isApiZonePatched; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNgZone", function() { return isNgZone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNoopNgZone", function() { return isNoopNgZone; });
/* harmony import */ var _get_global_this__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../get-global-this */ "X8pR");

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
    elem = elem || Object(_get_global_this__WEBPACK_IMPORTED_MODULE_0__["getGlobalThis"])();
    return isApiZonePatched(name, elem) ? elem['__zone_symbol__' + name] : elem[name];
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
function isEnvZonePatched() {
    return Object(_get_global_this__WEBPACK_IMPORTED_MODULE_0__["getGlobalThis"])().Zone !== undefined;
}
/**
 * apiZonePatched
 *
 * @description
 *
 * This function checks if a specific Browser API is patched by `zone.js`.
 *
 * @param name - The name of the API to check.
 * @param elem - The name of the API to check.
 * @return {boolean} - true if `zone.js` patched the API in question.
 *
 */
function isApiZonePatched(name, elem) {
    // if symbol is present, zone patched the API
    return elem['__zone_symbol__' + name] !== undefined;
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
    function fn() {
    }
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


/***/ }),

/***/ "VEB6":
/*!*******************************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/zone-agnostic/rxjs/schedulers/asap/AsapAction.ts ***!
  \*******************************************************************************************************/
/*! exports provided: AsapAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AsapAction", function() { return AsapAction; });
/* harmony import */ var _async_AsyncAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../async/AsyncAction */ "FXx3");
/* harmony import */ var _browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../browser */ "7zi/");
// tslint:disable

// tslint:disable

let nextHandle = 1;
// The promise needs to be created lazily otherwise it won't be patched by Zones
let resolved;
const activeHandles = {};
/**
 * Helper functions to schedule and unschedule microtasks.
 */
const Immediate = {
    setImmediate(cb) {
        const handle = nextHandle++;
        activeHandles[handle] = true;
        if (!resolved) {
            resolved = _browser__WEBPACK_IMPORTED_MODULE_1__["Promise"].resolve();
        }
        resolved.then(() => findAndClearHandle(handle) && cb());
        return handle;
    },
    clearImmediate(handle) {
        findAndClearHandle(handle);
    },
};
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class AsapAction extends _async_AsyncAction__WEBPACK_IMPORTED_MODULE_0__["AsyncAction"] {
    constructor(scheduler, work) {
        super(scheduler, work);
        this.scheduler = scheduler;
        this.work = work;
    }
    requestAsyncId(scheduler, id, delay = 0) {
        // If delay is greater than 0, request as an async action.
        if (delay !== null && delay > 0) {
            return super.requestAsyncId(scheduler, id, delay);
        }
        // Push the action to the end of the scheduler queue.
        scheduler.actions.push(this);
        // If a microtask has already been scheduled, don't schedule another
        // one. If a microtask hasn't been scheduled yet, schedule one now. Return
        // the current scheduled microtask id.
        return (scheduler.scheduled ||
            (scheduler.scheduled = Immediate.setImmediate(scheduler.flush.bind(scheduler, undefined))));
    }
    recycleAsyncId(scheduler, id, delay = 0) {
        // If delay exists and is greater than 0, or if the delay is null (the
        // action wasn't rescheduled) but was originally scheduled as an async
        // action, then recycle as an async action.
        if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
            return super.recycleAsyncId(scheduler, id, delay);
        }
        // If the scheduler queue is empty, cancel the requested microtask and
        // set the scheduled flag to undefined so the next AsapAction will schedule
        // its own.
        if (scheduler.actions.length === 0) {
            Immediate.clearImmediate(id);
            scheduler.scheduled = undefined;
        }
        // Return undefined so the action knows to request a new async id if it's rescheduled.
        return undefined;
    }
}
/**
 * Finds the handle in the list of active handles, and removes it.
 * Returns `true` if found, `false` otherwise. Used both to clear
 * Immediate scheduled tasks, and to identify if a task should be scheduled.
 */
function findAndClearHandle(handle) {
    if (handle in activeHandles) {
        delete activeHandles[handle];
        return true;
    }
    return false;
}


/***/ }),

/***/ "VIYf":
/*!***********************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/state/index.ts ***!
  \***********************************************************/
/*! exports provided: RxEffects, untilDestroyed */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rx_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rx-effects */ "16Wx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxEffects", function() { return _rx_effects__WEBPACK_IMPORTED_MODULE_0__["RxEffects"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "untilDestroyed", function() { return _rx_effects__WEBPACK_IMPORTED_MODULE_0__["untilDestroyed"]; });




/***/ }),

/***/ "Vgdy":
/*!***************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/zone-agnostic/browser/Promise.ts ***!
  \***************************************************************************************/
/*! exports provided: Promise */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Promise", function() { return Promise; });
/* harmony import */ var _zone_checks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../zone-checks */ "V4xg");

const Promise = Object(_zone_checks__WEBPACK_IMPORTED_MODULE_0__["getZoneUnPatchedApi"])('Promise');


/***/ }),

/***/ "Vw33":
/*!******************************************************************************************!*\
  !*** ./apps/demos/src/app/features/integrations/dynamic-counter/dynamic-counter.menu.ts ***!
  \******************************************************************************************/
/*! exports provided: MENU_ITEMS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MENU_ITEMS", function() { return MENU_ITEMS; });
const MENU_ITEMS = [
    {
        label: 'RxState and reactive forms',
        link: 'rx-state-and-reactive-forms'
    },
    {
        label: 'RxState as presenter',
        link: 'rx-state-as-presenter'
    },
    {
        label: 'RxState in the view',
        link: 'rx-state-in-the-view'
    },
    {
        label: 'RxState and subjects',
        link: 'rx-state-and-subjects'
    },
    {
        label: 'Starter',
        link: 'starter'
    }
];


/***/ }),

/***/ "W0l3":
/*!***************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/hooks/index.ts ***!
  \***************************************************************/
/*! exports provided: toHook, Hooks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model */ "efNJ");
/* empty/unused harmony star reexport *//* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "8gNB");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toHook", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["toHook"]; });

/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hooks */ "NM00");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Hooks", function() { return _hooks__WEBPACK_IMPORTED_MODULE_2__["Hooks"]; });






/***/ }),

/***/ "WFkj":
/*!************************************!*\
  !*** ./libs/template/src/index.ts ***!
  \************************************/
/*! exports provided: UnpatchEventsModule, UnpatchEventsDirective, ViewportPrioModule, ViewportPrioDirective, PushPipe, PushModule, LetModule, LetDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_experimental_unpatch_events_unpatch_events_experimental_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/experimental/unpatch/events/unpatch-events.experimental.module */ "nix1");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UnpatchEventsModule", function() { return _lib_experimental_unpatch_events_unpatch_events_experimental_module__WEBPACK_IMPORTED_MODULE_0__["UnpatchEventsModule"]; });

/* harmony import */ var _lib_experimental_unpatch_events_unpatch_events_experimental_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/experimental/unpatch/events/unpatch-events.experimental.directive */ "QZMm");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UnpatchEventsDirective", function() { return _lib_experimental_unpatch_events_unpatch_events_experimental_directive__WEBPACK_IMPORTED_MODULE_1__["UnpatchEventsDirective"]; });

/* harmony import */ var _lib_experimental_viewport_prio_viewport_prio_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/experimental/viewport-prio/viewport-prio.module */ "9bN3");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ViewportPrioModule", function() { return _lib_experimental_viewport_prio_viewport_prio_module__WEBPACK_IMPORTED_MODULE_2__["ViewportPrioModule"]; });

/* harmony import */ var _lib_experimental_viewport_prio_viewport_prio_experimental_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/experimental/viewport-prio/viewport-prio.experimental.directive */ "GiYN");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ViewportPrioDirective", function() { return _lib_experimental_viewport_prio_viewport_prio_experimental_directive__WEBPACK_IMPORTED_MODULE_3__["ViewportPrioDirective"]; });

/* harmony import */ var _lib_push_push_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/push/push.pipe */ "duzR");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PushPipe", function() { return _lib_push_push_pipe__WEBPACK_IMPORTED_MODULE_4__["PushPipe"]; });

/* harmony import */ var _lib_push_push_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/push/push.module */ "9sXm");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PushModule", function() { return _lib_push_push_module__WEBPACK_IMPORTED_MODULE_5__["PushModule"]; });

/* harmony import */ var _lib_let_let_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/let/let.module */ "qsZ0");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LetModule", function() { return _lib_let_let_module__WEBPACK_IMPORTED_MODULE_6__["LetModule"]; });

/* harmony import */ var _lib_let_let_directive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/let/let.directive */ "cihl");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LetDirective", function() { return _lib_let_let_directive__WEBPACK_IMPORTED_MODULE_7__["LetDirective"]; });

// EXPERIMENTAL




// STABLE






/***/ }),

/***/ "WgaG":
/*!*************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/rxjs/operators/coalesceWith.ts ***!
  \*************************************************************************************/
/*! exports provided: coalesceWith */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "coalesceWith", function() { return coalesceWith; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _utils_coalescing_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/coalescing-manager */ "u+Ph");


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
 * ```typescript
 * import { fromEvent, animationFrames } from 'rxjs';
 * import { coalesce } from 'ngRx/component';
 *
 * const clicks = fromEvent(document, 'click');
 * const result = clicks.pipe(coalesce(ev => animationFrames));
 * result.subscribe(x => console.log(x));
 * ```
 */
function coalesceWith(durationSelector, scope) {
    // tslint:disable-next-line:variable-name
    const _scope = scope || {};
    return (source) => {
        const o$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"]((observer) => {
            const rootSubscription = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subscription"]();
            rootSubscription.add(source.subscribe(createInnerObserver(observer, rootSubscription)));
            return rootSubscription;
        });
        return o$;
        function createInnerObserver(outerObserver, rootSubscription) {
            let actionSubscription;
            let latestValue;
            const tryEmitLatestValue = () => {
                if (actionSubscription) {
                    // We only decrement the number if it is greater than 0 (isCoalescing)
                    _utils_coalescing_manager__WEBPACK_IMPORTED_MODULE_1__["coalescingManager"].decrement(_scope);
                    if (!_utils_coalescing_manager__WEBPACK_IMPORTED_MODULE_1__["coalescingManager"].isCoalescing(_scope)) {
                        outerObserver.next(latestValue);
                    }
                }
            };
            return {
                complete: () => {
                    tryEmitLatestValue();
                    outerObserver.complete();
                },
                error: (error) => outerObserver.error(error),
                next: (value) => {
                    latestValue = value;
                    if (!actionSubscription) {
                        // tslint:disable-next-line:no-unused-expression
                        _utils_coalescing_manager__WEBPACK_IMPORTED_MODULE_1__["coalescingManager"].increment(_scope);
                        actionSubscription = durationSelector.subscribe({
                            error: (error) => outerObserver.error(error),
                            next: () => {
                                tryEmitLatestValue();
                                actionSubscription.unsubscribe();
                                actionSubscription = undefined;
                            },
                            complete: () => {
                                tryEmitLatestValue();
                                actionSubscription = undefined;
                            }
                        });
                        rootSubscription.add(new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subscription"](() => {
                            tryEmitLatestValue();
                            if (actionSubscription) {
                                actionSubscription.unsubscribe();
                                actionSubscription = undefined;
                            }
                        }));
                    }
                }
            };
        }
    };
}


/***/ }),

/***/ "Wp0T":
/*!*************************************************************!*\
  !*** ./libs/cdk/src/lib/utils/template-trigger-handling.ts ***!
  \*************************************************************/
/*! exports provided: templateTriggerHandling */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "templateTriggerHandling", function() { return templateTriggerHandling; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _hotFlatten__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hotFlatten */ "oIM3");



/**
 * @internal
 *
 * A factory function returning an object to handle the process of switching templates by Notification channel.
 * You can next a Observable of `RxNotification` multiple times and merge them into the Observable exposed under `trigger$`
 *
 */
function templateTriggerHandling() {
    const hotFlattened = Object(_hotFlatten__WEBPACK_IMPORTED_MODULE_2__["hotFlatten"])(() => new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"](), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["mergeAll"])());
    return {
        next(templateName) {
            hotFlattened.next(templateName);
        },
        trigger$: hotFlattened.values$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["share"])()),
    };
}


/***/ }),

/***/ "Wwg6":
/*!********************************!*\
  !*** ./apps/demos/src/main.ts ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "rPqH");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "aLPm");
/* harmony import */ var _app_shared_utils_measure__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app/shared/utils/measure */ "J+a4");





// if (environment.production) {
Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
// }
const compilerOptions = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].zoneless
    ? { ngZone: 'noop' }
    : undefined;
const mP = Object(_app_shared_utils_measure__WEBPACK_IMPORTED_MODULE_4__["promiseMarkerFactory"])('Bootstrap');
mP.wrap(_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])).catch((err) => console.error(err));


/***/ }),

/***/ "Wzuy":
/*!***************************************************!*\
  !*** ./libs/template/src/lib/core/utils/index.ts ***!
  \***************************************************/
/*! exports provided: getGlobalThis, createPropertiesWeakMap, getUnpatchedResolvedPromise, getZoneUnPatchedApi, isEnvZonePatched, isApiZonePatched, isNgZone, isNoopNgZone, coalescingManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _get_global_this__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./get-global-this */ "GUy1");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getGlobalThis", function() { return _get_global_this__WEBPACK_IMPORTED_MODULE_0__["getGlobalThis"]; });

/* harmony import */ var _properties_weakmap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./properties-weakmap */ "NvUZ");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createPropertiesWeakMap", function() { return _properties_weakmap__WEBPACK_IMPORTED_MODULE_1__["createPropertiesWeakMap"]; });

/* harmony import */ var _unpatched_resolved_promise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unpatched-resolved-promise */ "EbrR");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getUnpatchedResolvedPromise", function() { return _unpatched_resolved_promise__WEBPACK_IMPORTED_MODULE_2__["getUnpatchedResolvedPromise"]; });

/* harmony import */ var _zone_checks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./zone-checks */ "BipP");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getZoneUnPatchedApi", function() { return _zone_checks__WEBPACK_IMPORTED_MODULE_3__["getZoneUnPatchedApi"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isEnvZonePatched", function() { return _zone_checks__WEBPACK_IMPORTED_MODULE_3__["isEnvZonePatched"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isApiZonePatched", function() { return _zone_checks__WEBPACK_IMPORTED_MODULE_3__["isApiZonePatched"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isNgZone", function() { return _zone_checks__WEBPACK_IMPORTED_MODULE_3__["isNgZone"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isNoopNgZone", function() { return _zone_checks__WEBPACK_IMPORTED_MODULE_3__["isNoopNgZone"]; });

/* harmony import */ var _coalescing_manager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./coalescing-manager */ "xuXX");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "coalescingManager", function() { return _coalescing_manager__WEBPACK_IMPORTED_MODULE_4__["coalescingManager"]; });








/***/ }),

/***/ "X2kX":
/*!*********************************************************************!*\
  !*** ./apps/demos/src/app/features/template/template-shell.menu.ts ***!
  \*********************************************************************/
/*! exports provided: TEMPLATE_MENU */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TEMPLATE_MENU", function() { return TEMPLATE_MENU; });
/* harmony import */ var _rx_let_rx_let_menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rx-let/rx-let.menu */ "vX4F");
/* harmony import */ var _rx_if_rx_if_menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rx-if/rx-if.menu */ "yLET");
/* harmony import */ var _rx_context_rx_context_menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rx-context/rx-context.menu */ "vvAe");
/* harmony import */ var _rx_for_rx_for_menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rx-for/rx-for.menu */ "1I6V");
/* harmony import */ var _viewport_prio_viewport_prio_menu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./viewport-prio/viewport-prio.menu */ "aJ7t");
/* harmony import */ var _strategies_concurrent_strategies_menu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./strategies/concurrent-strategies.menu */ "/WVI");
/* harmony import */ var _pipes_pipes_menu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pipes/pipes.menu */ "tqvG");







const TEMPLATE_MENU = [
    {
        label: 'Pipes',
        link: 'pipes',
        children: _pipes_pipes_menu__WEBPACK_IMPORTED_MODULE_6__["MENU_ITEMS"],
    },
    {
        label: 'rxContext',
        link: 'rx-context',
        children: _rx_context_rx_context_menu__WEBPACK_IMPORTED_MODULE_2__["MENU_ITEMS"],
    },
    {
        label: '*rxLet',
        link: 'rx-let',
        children: _rx_let_rx_let_menu__WEBPACK_IMPORTED_MODULE_0__["MENU_ITEMS"],
    },
    {
        label: '*rxIf',
        link: 'rx-if',
        children: _rx_if_rx_if_menu__WEBPACK_IMPORTED_MODULE_1__["MENU_ITEMS"],
    },
    {
        label: '*rxFor',
        link: 'rx-for',
        children: _rx_for_rx_for_menu__WEBPACK_IMPORTED_MODULE_3__["MENU_ITEMS"],
    },
    {
        link: 'render-callback',
        label: 'Render Callback'
    },
    {
        label: 'Unpatch',
        link: 'unpatch'
    },
    {
        label: 'Strategies',
        link: 'strategies',
        children: _strategies_concurrent_strategies_menu__WEBPACK_IMPORTED_MODULE_5__["MENU_ITEMS"],
    },
    {
        label: 'ViewPort Prio',
        link: 'view-port-prio',
        children: _viewport_prio_viewport_prio_menu__WEBPACK_IMPORTED_MODULE_4__["MENU_ITEMS"],
    }
];


/***/ }),

/***/ "X8pR":
/*!*************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/get-global-this.ts ***!
  \*************************************************************************/
/*! exports provided: getGlobalThis */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getGlobalThis", function() { return getGlobalThis; });
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
    // tslint:disable-next-line:no-unused-expression triple-equals
    return 'undefined' != typeof globalThis
        ? globalThis
        // tslint:disable-next-line:no-unused-expression triple-equals
        : 'undefined' != typeof window
            ? window
            // tslint:disable-next-line:no-unused-expression triple-equals
            : 'undefined' != typeof self
                ? self
                : {};
}


/***/ }),

/***/ "XE0J":
/*!******************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/directives/switch/rx-swich.module.ts ***!
  \******************************************************************************************/
/*! exports provided: RxSwichModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RxSwichModule", function() { return RxSwichModule; });
/* harmony import */ var _rx_switch_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rx-switch.directive */ "QfxS");
/* harmony import */ var _rx_switch_case_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rx-switch-case.directive */ "uq4C");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");



class RxSwichModule {
}
RxSwichModule.ɵfac = function RxSwichModule_Factory(t) { return new (t || RxSwichModule)(); };
RxSwichModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: RxSwichModule });
RxSwichModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](RxSwichModule, { declarations: [_rx_switch_directive__WEBPACK_IMPORTED_MODULE_0__["RxSwitch"], _rx_switch_case_directive__WEBPACK_IMPORTED_MODULE_1__["RxSwitchCase"]], exports: [_rx_switch_directive__WEBPACK_IMPORTED_MODULE_0__["RxSwitch"], _rx_switch_case_directive__WEBPACK_IMPORTED_MODULE_1__["RxSwitchCase"]] }); })();


/***/ }),

/***/ "XLH7":
/*!****************************************************!*\
  !*** ./libs/state/src/lib/rxjs/operators/index.ts ***!
  \****************************************************/
/*! exports provided: stateful, select, distinctUntilSomeChanged, selectSlice */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stateful__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stateful */ "ChVF");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stateful", function() { return _stateful__WEBPACK_IMPORTED_MODULE_0__["stateful"]; });

/* harmony import */ var _select__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./select */ "SEs6");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "select", function() { return _select__WEBPACK_IMPORTED_MODULE_1__["select"]; });

/* harmony import */ var _distinctUntilSomeChanged__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./distinctUntilSomeChanged */ "xZVK");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "distinctUntilSomeChanged", function() { return _distinctUntilSomeChanged__WEBPACK_IMPORTED_MODULE_2__["distinctUntilSomeChanged"]; });

/* harmony import */ var _selectSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./selectSlice */ "2L99");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "selectSlice", function() { return _selectSlice__WEBPACK_IMPORTED_MODULE_3__["selectSlice"]; });







/***/ }),

/***/ "XklV":
/*!****************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/directives/let/rx-let.directive.ts ***!
  \****************************************************************************************/
/*! exports provided: RxLet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RxLet", function() { return RxLet; });
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/cdk/coercion */ "8LU1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _rx_angular_cdk__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @rx-angular/cdk */ "cDIL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./model */ "9uYj");








/**
 * @Directive LetDirective
 *
 * @description
 *
 * The `*rxLet` directive serves a convenient way of binding observables to a view context. Furthermore, it helps
 * you structure view-related models into view context scope (DOM element's scope).
 *
 * Under the hood, it leverages a `RenderStrategy` which in turn takes care of optimizing the change detection
 * of your component or embedded view. The `LetDirective` will render its template and manage change detection after it
 *   got an initial value. So if the incoming `Observable` emits its value lazily (e.g. data coming from `Http`), your
 *   template will be rendered lazily as well. This can very positively impact the initial render performance of your
 *   application.
 *
 *
 * ### Problems with `async` and `*ngIf`
 *
 * In Angular, a way of binding an observable to the view could look like that:
 * ```html
 * <ng-container *ngIf="observableNumber$ | async as n">
 *   <app-number [number]="n"></app-number>
 *   <app-number-special [number]="n"></app-number-special>
 * </ng-container>
 * ```
 *
 * The problem is that `*ngIf` interferes with rendering and in case of a `0` (a falsy value) the component
 * would be hidden. This issue doesn't concern the `LetDirective`.
 *
 * The `AsyncPipe` relies on the Zone to be present - it doesn't really trigger change detection by itself.
 * It marks the component and its children as dirty waiting for the Zone to trigger change detection. So, in case
 * you want to create a zone-less application, the `AsyncPipe` won't work as desired. `LetDirective` comes
 * with its own strategies to manage change detection every time a new notification is sent from
 * the bound Observable.
 *
 *
 * ### Features of `*rxLet`
 *
 * Included features for `*rxLet`:
 * - binding is always present. (see "Problems with `async` and `*ngIf`" section below)
 * - it takes away the multiple usages of the `async` or `push` pipe
 * - a unified/structured way of handling null and undefined
 * - triggers change-detection differently if `zone.js` is present or not (`ChangeDetectorRef.detectChanges` or
 *   `ChangeDetectorRef.markForCheck`)
 * - triggers change-detection differently if ViewEngine or Ivy is present (`ChangeDetectorRef.detectChanges` or
 *   `ɵdetectChanges`)
 * - distinct same values in a row (`distinctUntilChanged` operator),
 * - display custom templates for different observable notifications (rxSuspense, rxNext, rxError, rxComplete)
 * - notify about after changes got rendered to the template (RenderCallback)
 *
 *
 * ### Binding an Observable and using the view context
 *
 * The `*rxLet` directive takes over several things and makes it more convenient and save to work with streams in the
 * template:
 *
 * ```html
 * <ng-container *rxLet="observableNumber$; let n">
 *   <app-number [number]="n"></app-number>
 * </ng-container>
 *
 * <ng-container *rxLet="observableNumber$ as n">
 *   <app-number [number]="n"></app-number>
 * </ng-container>
 * ```
 *
 * In addition to that it provides us information from the whole observable context.
 * We can track the observables:
 * - next value
 * - error occurrence
 * - complete occurrence
 *
 * ```html
 * <ng-container *rxLet="observableNumber$; let n; let e = $rxError, let c = $rxComplete">
 *   <app-number [number]="n" *ngIf="!e && !c"></app-number>
 *   <ng-container *ngIf="e">
 *     There is an error: {{ e }}
 *   </ng-container>
 *   <ng-container *ngIf="c">
 *     Observable completed: {{ c }}
 *   </ng-container>
 * </ng-container>
 * ```
 *
 *
 * ### Using the template-binding
 *
 * You can also use template anchors and display template's content for different observable states:
 * - on complete
 * - on error
 * - on suspense - before the first value is emitted
 *
 * ```html
 * <ng-container
 *   *rxLet="
 *     observableNumber$;
 *     let n;
 *     rxError: error;
 *     rxComplete: complete;
 *     rxSuspense: suspense;
 *   "
 * >
 *   <app-number [number]="n"></app-number>
 * </ng-container>
 * <ng-template #error>ERROR</ng-template>
 * <ng-template #complete>COMPLETE</ng-template>
 * <ng-template #suspense>SUSPENSE</ng-template>
 * ```
 *
 * Internally, `*rxLet` is using a simple "view memoization" - it caches all anchored template references and re-uses
 * them whenever the observable notification (next/error/complete) is sent. Then, it only updates the context
 * (e.g. a value from the observable) in the view.
 *
 *
 * @docsCategory LetDirective
 * @docsPage LetDirective
 * @publicApi
 */
class RxLet {
    constructor(strategyProvider, cdRef, eRef, ngZone, nextTemplateRef, viewContainerRef) {
        this.strategyProvider = strategyProvider;
        this.cdRef = cdRef;
        this.eRef = eRef;
        this.ngZone = ngZone;
        this.nextTemplateRef = nextTemplateRef;
        this.viewContainerRef = viewContainerRef;
        this.renderParent = true;
        this.patchZone = true;
        /** @internal */
        this.observablesHandler = Object(_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_2__["templateNotifier"])();
        this.strategyHandler = Object(_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_2__["hotFlatten"])(() => new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"](), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["mergeAll"])());
        this.triggerHandler = Object(_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_2__["hotFlatten"])(() => new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"](), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["mergeAll"])());
        this.subscription = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subscription"]();
        this.rendered$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.rendered = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["defer"])(() => this.rendered$.pipe());
    }
    /**
     * @description
     * The Observable to be bound to the context of a template.
     *
     * @example
     * <ng-container *rxLet="hero$; let hero">
     *   <app-hero [hero]="hero"></app-hero>
     * </ng-container>
     *
     * @param potentialObservable
     */
    set rxLet(potentialObservable) {
        this.observablesHandler.next(potentialObservable);
    }
    /**
     * @description
     * The rendering strategy to be used when rendering with the reactive context within a template.
     * Use it to dynamically manage your rendering strategy. You can switch the strategies
     * imperatively (with a string) or by bounding an Observable.
     * The default strategy is `'local'`.
     *
     * @example
     * \@Component({
     *   selector: 'app-root',
     *   template: `
     *     <ng-container *rxLet="hero$; let hero; strategy: strategy">
     *       <app-hero [hero]="hero"></app-hero>
     *     </ng-container>
     *   `
     * })
     * export class AppComponent {
     *   strategy = 'local';
     * }
     *
     * // OR
     *
     * \@Component({
     *   selector: 'app-root',
     *   template: `
     *     <ng-container *rxLet="hero$; let hero; strategy: strategy$">
     *       <app-hero [hero]="hero"></app-hero>
     *     </ng-container>
     *   `
     * })
     * export class AppComponent {
     *   strategy$ = new BehaviorSubject('local');
     * }
     *
     * @param strategy
     * @see {@link strategies}
     */
    set strategy(strategyName) {
        this.strategyHandler.next(strategyName);
    }
    /**
     * @description
     * A template to show if the bound Observable is in "complete" state.
     *
     * @example
     * <ng-container *rxLet="hero$; let hero; rxComplete: completeTemplate">
     *   <app-hero [hero]="hero"></app-hero>
     * </ng-container>
     * <ng-template #completeTemplate>
     *   <mat-icon>thumb_up</mat-icon>
     * </ng-template>
     *
     * @param templateRef
     */
    set rxComplete(templateRef) {
        this.templateManager.addTemplateRef(_model__WEBPACK_IMPORTED_MODULE_5__["RxLetTemplateNames"].complete, templateRef);
    }
    /**
     * @description
     * A template to show if the bound Observable is in "error" state.
     *
     * @example
     * <ng-container *rxLet="hero$; let hero; rxError: errorTemplate">
     *   <app-hero [hero]="hero"></app-hero>
     * </ng-container>
     * <ng-template #errorTemplate>
     *   <mat-icon>thumb_down</mat-icon>
     * </ng-template>
     *
     * @param templateRef
     */
    set rxError(templateRef) {
        this.templateManager.addTemplateRef(_model__WEBPACK_IMPORTED_MODULE_5__["RxLetTemplateNames"].error, templateRef);
    }
    /**
     * @description
     * A template to show before the first value is emitted from the bound Observable.
     *
     * @example
     * <ng-container *rxLet="hero$; let hero; rxSuspense: suspenseTemplate">
     *   <app-hero [hero]="hero"></app-hero>
     * </ng-container>
     * <ng-template #suspenseTemplate>
     *   <mat-progress-spinner></mat-progress-spinner>
     * </ng-template>
     *
     * @param templateRef
     */
    set rxSuspense(templateRef) {
        this.templateManager.addTemplateRef(_model__WEBPACK_IMPORTED_MODULE_5__["RxLetTemplateNames"].suspense, templateRef);
    }
    set rxCompleteTrigger(trigger$) {
        this.triggerHandler.next(trigger$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["mapTo"])(Object(_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_2__["toRxCompleteNotification"])())));
    }
    set rxErrorTrigger(error$) {
        this.triggerHandler.next(error$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_2__["toRxErrorNotification"])));
    }
    set rxSuspenseTrigger(trigger$) {
        this.triggerHandler.next(trigger$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_2__["toRxSuspenseNotification"])));
    }
    set renderCallback(callback) {
        this._renderObserver = callback;
    }
    /** @internal */
    static ngTemplateContextGuard(dir, ctx) {
        return true;
    }
    ngOnInit() {
        this.templateManager = Object(_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_2__["createTemplateManager"])({
            templateSettings: {
                viewContainerRef: this.viewContainerRef,
                createViewContext,
                updateViewContext,
                customContext: (rxLet) => ({ rxLet }),
                patchZone: this.patchZone ? this.ngZone : false,
            },
            renderSettings: {
                cdRef: this.cdRef,
                eRef: this.eRef,
                parent: Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__["coerceBooleanProperty"])(this.renderParent),
                patchZone: this.patchZone ? this.ngZone : false,
                defaultStrategyName: this.strategyProvider.primaryStrategy,
                strategies: this.strategyProvider.strategies,
            },
            notificationToTemplateName: {
                [_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_2__["RxNotificationKind"].suspense]: () => _model__WEBPACK_IMPORTED_MODULE_5__["RxLetTemplateNames"].suspense,
                [_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_2__["RxNotificationKind"].next]: () => _model__WEBPACK_IMPORTED_MODULE_5__["RxLetTemplateNames"].next,
                [_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_2__["RxNotificationKind"].error]: () => _model__WEBPACK_IMPORTED_MODULE_5__["RxLetTemplateNames"].error,
                [_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_2__["RxNotificationKind"].complete]: () => _model__WEBPACK_IMPORTED_MODULE_5__["RxLetTemplateNames"].complete,
            },
            templateTrigger$: this.triggerHandler.values$,
        });
        this.templateManager.addTemplateRef(_model__WEBPACK_IMPORTED_MODULE_5__["RxLetTemplateNames"].next, this.nextTemplateRef);
        this.templateManager.nextStrategy(this.strategyHandler.values$);
        this.subscription.add(this.templateManager
            .render(this.observablesHandler.values$)
            .subscribe((n) => {
            var _a;
            this.rendered$.next(n);
            (_a = this._renderObserver) === null || _a === void 0 ? void 0 : _a.next(n);
        }));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
RxLet.ɵfac = function RxLet_Factory(t) { return new (t || RxLet)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_2__["RxStrategyProvider"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"])); };
RxLet.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({ type: RxLet, selectors: [["", "rxLet", ""]], inputs: { rxLet: "rxLet", strategy: ["rxLetStrategy", "strategy"], rxComplete: ["rxLetCompleteTpl", "rxComplete"], rxError: ["rxLetErrorTpl", "rxError"], rxSuspense: ["rxLetSuspenseTpl", "rxSuspense"], rxCompleteTrigger: ["rxLetCompleteTrg", "rxCompleteTrigger"], rxErrorTrigger: ["rxLetErrorTrg", "rxErrorTrigger"], rxSuspenseTrigger: ["rxLetSuspenseTrg", "rxSuspenseTrigger"], renderCallback: ["rxLetRenderCallback", "renderCallback"], renderParent: ["rxLetParent", "renderParent"], patchZone: ["rxLetPatchZone", "patchZone"] }, outputs: { rendered: "rendered" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([])] });
function createViewContext(value) {
    return {
        rxLet: value,
        $implicit: value,
        $error: false,
        $complete: false,
        $suspense: false,
    };
}
function updateViewContext(value, view, context) {
    Object.keys(context).forEach((k) => {
        view.context[k] = context[k];
    });
}


/***/ }),

/***/ "Xko7":
/*!*******************************************************************************!*\
  !*** ./libs/cdk/src/lib/render-strategies/scheduler/schedulerFeatureFlags.ts ***!
  \*******************************************************************************/
/*! exports provided: enableIsInputPending */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enableIsInputPending", function() { return enableIsInputPending; });
const enableIsInputPending = false;


/***/ }),

/***/ "XoRM":
/*!*********************************************************!*\
  !*** ./apps/demos/src/app/shared/debug-helper/hooks.ts ***!
  \*********************************************************/
/*! exports provided: Hooks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Hooks", function() { return Hooks; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");



class Hooks {
    constructor() {
        this.afterViewInit$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["ReplaySubject"](1);
        this.onChanges$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.onDestroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["ReplaySubject"](1);
    }
    ngOnChanges(changes) {
        this.onChanges$.next();
    }
    ngAfterViewInit() {
        this.afterViewInit$.next();
        this.afterViewInit$.complete();
    }
    ngOnDestroy() {
        this.onDestroy$.next();
        this.onChanges$.complete();
        this.afterViewInit$.complete();
        this.onDestroy$.complete();
    }
}
Hooks.ɵfac = function Hooks_Factory(t) { return new (t || Hooks)(); };
Hooks.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: Hooks, factory: Hooks.ɵfac });


/***/ }),

/***/ "YR/O":
/*!***************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/rxjs/Notification.ts ***!
  \***************************************************************************/
/*! exports provided: RxNotificationKind, notificationToRxNotification, toRxErrorNotification, toRxSuspenseNotification, toRxCompleteNotification, notificationKindToRxNotificationKind */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RxNotificationKind", function() { return RxNotificationKind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "notificationToRxNotification", function() { return notificationToRxNotification; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toRxErrorNotification", function() { return toRxErrorNotification; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toRxSuspenseNotification", function() { return toRxSuspenseNotification; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toRxCompleteNotification", function() { return toRxCompleteNotification; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "notificationKindToRxNotificationKind", function() { return notificationKindToRxNotificationKind; });
var RxNotificationKind;
(function (RxNotificationKind) {
    RxNotificationKind["suspense"] = "suspense";
    RxNotificationKind["next"] = "next";
    RxNotificationKind["error"] = "error";
    RxNotificationKind["complete"] = "complete";
})(RxNotificationKind || (RxNotificationKind = {}));
const notificationToRxNotification = (notification) => {
    const kind = rxJsToRxA[notification.kind];
    if (kind === RxNotificationKind.error) {
        return toRxErrorNotification(notification.error);
    }
    if (kind === RxNotificationKind.complete) {
        return toRxCompleteNotification(notification.value);
    }
    return Object.assign(Object.assign({}, notification), { error: false, complete: false, kind });
};
const toRxErrorNotification = (error, value) => ({ kind: RxNotificationKind.error, hasValue: value || false, value: value || undefined, complete: false, error: error || true });
const toRxSuspenseNotification = (value) => ({ kind: RxNotificationKind.suspense, hasValue: value || false, value, complete: false, error: false });
const toRxCompleteNotification = (value) => ({ kind: RxNotificationKind.complete, hasValue: value || false, value, complete: true, error: false });
const rxJsToRxA = {
    'C': RxNotificationKind.complete,
    'E': RxNotificationKind.error,
    'N': RxNotificationKind.next,
};
function notificationKindToRxNotificationKind(kind) {
    return rxJsToRxA[kind] || RxNotificationKind.next;
}


/***/ }),

/***/ "YW9V":
/*!********************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/directives/switch/index.ts ***!
  \********************************************************************************/
/*! exports provided: RxSwichModule, RxSwitchCase, RxSwitch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rx_swich_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rx-swich.module */ "XE0J");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxSwichModule", function() { return _rx_swich_module__WEBPACK_IMPORTED_MODULE_0__["RxSwichModule"]; });

/* harmony import */ var _rx_switch_case_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rx-switch-case.directive */ "uq4C");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxSwitchCase", function() { return _rx_switch_case_directive__WEBPACK_IMPORTED_MODULE_1__["RxSwitchCase"]; });

/* harmony import */ var _rx_switch_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rx-switch.directive */ "QfxS");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxSwitch", function() { return _rx_switch_directive__WEBPACK_IMPORTED_MODULE_2__["RxSwitch"]; });






/***/ }),

/***/ "YYsp":
/*!*********************************!*\
  !*** ./libs/state/src/index.ts ***!
  \*********************************/
/*! exports provided: createSideEffectObservable, createAccumulationObservable, RxState, select, stateful, distinctUntilSomeChanged, selectSlice, insert, remove, toDictionary, update, setProp, patch, deleteProp, dictionaryToArray, toggle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/index */ "6yIp");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createSideEffectObservable", function() { return _lib_index__WEBPACK_IMPORTED_MODULE_0__["createSideEffectObservable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createAccumulationObservable", function() { return _lib_index__WEBPACK_IMPORTED_MODULE_0__["createAccumulationObservable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxState", function() { return _lib_index__WEBPACK_IMPORTED_MODULE_0__["RxState"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "select", function() { return _lib_index__WEBPACK_IMPORTED_MODULE_0__["select"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stateful", function() { return _lib_index__WEBPACK_IMPORTED_MODULE_0__["stateful"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "distinctUntilSomeChanged", function() { return _lib_index__WEBPACK_IMPORTED_MODULE_0__["distinctUntilSomeChanged"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "selectSlice", function() { return _lib_index__WEBPACK_IMPORTED_MODULE_0__["selectSlice"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "insert", function() { return _lib_index__WEBPACK_IMPORTED_MODULE_0__["insert"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "remove", function() { return _lib_index__WEBPACK_IMPORTED_MODULE_0__["remove"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toDictionary", function() { return _lib_index__WEBPACK_IMPORTED_MODULE_0__["toDictionary"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "update", function() { return _lib_index__WEBPACK_IMPORTED_MODULE_0__["update"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setProp", function() { return _lib_index__WEBPACK_IMPORTED_MODULE_0__["setProp"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "patch", function() { return _lib_index__WEBPACK_IMPORTED_MODULE_0__["patch"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deleteProp", function() { return _lib_index__WEBPACK_IMPORTED_MODULE_0__["deleteProp"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dictionaryToArray", function() { return _lib_index__WEBPACK_IMPORTED_MODULE_0__["dictionaryToArray"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toggle", function() { return _lib_index__WEBPACK_IMPORTED_MODULE_0__["toggle"]; });




/***/ }),

/***/ "Yauo":
/*!*********************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/rxjs/observable/tick-animationFrame.ts ***!
  \*********************************************************************************************/
/*! exports provided: animationFrameTick */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "animationFrameTick", function() { return animationFrameTick; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _zone_agnostic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../zone-agnostic */ "j2tN");


const animationFrameTick = () => new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"]((subscriber) => {
    const id = Object(_zone_agnostic__WEBPACK_IMPORTED_MODULE_1__["requestAnimationFrame"])(() => {
        subscriber.next(0);
        subscriber.complete();
    });
    return () => {
        Object(_zone_agnostic__WEBPACK_IMPORTED_MODULE_1__["cancelAnimationFrame"])(id);
    };
});


/***/ }),

/***/ "YgUy":
/*!**********************************************************************!*\
  !*** ./libs/cdk/src/lib/zone-less/rxjs/scheduler/asap/AsapAction.ts ***!
  \**********************************************************************/
/*! exports provided: AsapAction, TestTools */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AsapAction", function() { return AsapAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TestTools", function() { return TestTools; });
/* harmony import */ var _async_AsyncAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../async/AsyncAction */ "ErOQ");
/* harmony import */ var _browser_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../browser/browser */ "rxQk");
// tslint:disable


/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class AsapAction extends _async_AsyncAction__WEBPACK_IMPORTED_MODULE_0__["AsyncAction"] {
    constructor(scheduler, work) {
        super(scheduler, work);
        this.scheduler = scheduler;
        this.work = work;
    }
    requestAsyncId(scheduler, id, delay = 0) {
        // If delay is greater than 0, request as an async action.
        if (delay !== null && delay > 0) {
            return super.requestAsyncId(scheduler, id, delay);
        }
        // Push the action to the end of the scheduler queue.
        scheduler.actions.push(this);
        // If a microtask has already been scheduled, don't schedule another
        // one. If a microtask hasn't been scheduled yet, schedule one now. Return
        // the current scheduled microtask id.
        return (scheduler.scheduled ||
            (scheduler.scheduled = Immediate.setImmediate(scheduler.flush.bind(scheduler, undefined))));
    }
    recycleAsyncId(scheduler, id, delay = 0) {
        // If delay exists and is greater than 0, or if the delay is null (the
        // action wasn't rescheduled) but was originally scheduled as an async
        // action, then recycle as an async action.
        if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
            return super.recycleAsyncId(scheduler, id, delay);
        }
        // If the scheduler queue is empty, cancel the requested microtask and
        // set the scheduled flag to undefined so the next AsapAction will schedule
        // its own.
        if (scheduler.actions.length === 0) {
            Immediate.clearImmediate(id);
            scheduler.scheduled = undefined;
        }
        // Return undefined so the action knows to request a new async id if it's rescheduled.
        return undefined;
    }
}
let nextHandle = 1;
// The promise needs to be created lazily otherwise it won't be patched by Zones
let resolved;
const activeHandles = {};
/**
 * Finds the handle in the list of active handles, and removes it.
 * Returns `true` if found, `false` otherwise. Used both to clear
 * Immediate scheduled tasks, and to identify if a task should be scheduled.
 */
function findAndClearHandle(handle) {
    if (handle in activeHandles) {
        delete activeHandles[handle];
        return true;
    }
    return false;
}
/**
 * Helper functions to schedule and unschedule microtasks.
 */
const Immediate = {
    setImmediate(cb) {
        const handle = nextHandle++;
        activeHandles[handle] = true;
        if (!resolved) {
            resolved = _browser_browser__WEBPACK_IMPORTED_MODULE_1__["Promise"].resolve();
        }
        resolved.then(() => findAndClearHandle(handle) && cb());
        return handle;
    },
    clearImmediate(handle) {
        findAndClearHandle(handle);
    },
};
/**
 * Used for internal testing purposes only. Do not export from library.
 */
const TestTools = {
    pending() {
        return Object.keys(activeHandles).length;
    },
};


/***/ }),

/***/ "YkIx":
/*!******************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/directives/if-visible/model/index.ts ***!
  \******************************************************************************************/
/*! exports provided: RxIfVisibleTemplateNames */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _view_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view-context */ "AD+d");
/* empty/unused harmony star reexport *//* harmony import */ var _template_names__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./template-names */ "nxAE");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxIfVisibleTemplateNames", function() { return _template_names__WEBPACK_IMPORTED_MODULE_1__["RxIfVisibleTemplateNames"]; });





/***/ }),

/***/ "YqYH":
/*!*****************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/rxjs/observable/tick-setTimeout.ts ***!
  \*****************************************************************************************/
/*! exports provided: timeoutTick */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timeoutTick", function() { return timeoutTick; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");

const timeoutTick = () => new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"]((subscriber) => {
    const id = window.__zone_symbol__setTimeout(() => {
        subscriber.next(0);
        subscriber.complete();
    });
    return () => {
        window.__zone_symbol__clearTimeout(id);
    };
});


/***/ }),

/***/ "Z96z":
/*!******************************************************************!*\
  !*** ./libs/cdk/src/lib/zone-less/rxjs/scheduler/async/async.ts ***!
  \******************************************************************/
/*! exports provided: async */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "async", function() { return async; });
/* harmony import */ var _AsyncAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AsyncAction */ "ErOQ");
/* harmony import */ var _AsyncScheduler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AsyncScheduler */ "QFH2");
// tslint:disable file-name-casing


/**
 *
 * NOTE: This is a zone un-patched version of rxjs asyncScheduler
 *
 * Async Scheduler
 *
 * <span class="informal">Schedule task as if you used setTimeout(task, duration)</span>
 *
 * `async` scheduler schedules tasks asynchronously, by putting them on the JavaScript
 * event loop queue. It is best used to delay tasks in time or to schedule tasks repeating
 * in intervals.
 *
 * If you just want to "defer" task, that is to perform it right after currently
 * executing synchronous code ends (commonly achieved by `setTimeout(deferredTask, 0)`),
 * better choice will be the {@link asapScheduler} scheduler.
 *
 * ## Examples
 * Use async scheduler to delay task
 * ```ts
 * import { asyncScheduler } from '@cu/perf-utils';
 *
 * const task = () => console.log('it works!');
 *
 * asyncScheduler.schedule(task, 2000);
 *
 * // After 2 seconds logs:
 * // "it works!"
 * ```
 *
 * Use async scheduler to repeat task in intervals
 * ```ts
 * import { asyncScheduler } from '@cu/perf-utils';
 *
 * function task(state) {
 *   console.log(state);
 *   this.schedule(state + 1, 1000); // `this` references currently executing Action,
 *                                   // which we reschedule with new state and delay
 * }
 *
 * asyncScheduler.schedule(task, 3000, 0);
 *
 * // Logs:
 * // 0 after 3s
 * // 1 after 4s
 * // 2 after 5s
 * // 3 after 6s
 * ```
 */
const async = new _AsyncScheduler__WEBPACK_IMPORTED_MODULE_1__["AsyncScheduler"](_AsyncAction__WEBPACK_IMPORTED_MODULE_0__["AsyncAction"]);


/***/ }),

/***/ "ZGLQ":
/*!******************************************************************************!*\
  !*** ./apps/demos/src/app/features/tutorials/basics/tutorial-basics.menu.ts ***!
  \******************************************************************************/
/*! exports provided: TUTORIAL_BASICS_MENU */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TUTORIAL_BASICS_MENU", function() { return TUTORIAL_BASICS_MENU; });
const TUTORIAL_BASICS_MENU = [
    {
        label: 'Setup',
        link: 'setup'
    },
    {
        label: 'Input Bindings',
        link: 'input-bindings'
    },
    {
        label: 'Output Bindings',
        link: 'output-bindings'
    },
    {
        label: 'Global State',
        link: 'global-state'
    },
    {
        label: 'Side Effects',
        link: 'side-effects'
    },
    {
        label: 'Presenter Pattern',
        link: 'presenter-pattern'
    },
    {
        label: 'Demo Basics Completed',
        link: 'solution'
    }
];


/***/ }),

/***/ "ZTDl":
/*!****************************************************!*\
  !*** ./libs/cdk/src/lib/utils/templateNotifier.ts ***!
  \****************************************************/
/*! exports provided: templateNotifier */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "templateNotifier", function() { return templateNotifier; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../model */ "pJB2");
/* harmony import */ var _notification_transforms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./notification-transforms */ "3PYK");
/* harmony import */ var _rxMaterialize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./rxMaterialize */ "T1Ye");





/**
 * @internal
 */
function templateNotifier(withSuspense) {
    const observablesSubject = new rxjs__WEBPACK_IMPORTED_MODULE_0__["ReplaySubject"](1);
    let firstRun = true;
    let latestNextValue;
    const wSuspense = () => withSuspense && withSuspense();
    const values$ = observablesSubject.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["distinctUntilChanged"])(), 
    // handle null | undefined assignment and new Observable reset
    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((observable$) => {
        const isObs = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["isObservable"])(observable$);
        // only pass through initial undefined value to filter out
        if (firstRun && (observable$ === undefined || observable$ === rxjs__WEBPACK_IMPORTED_MODULE_0__["NEVER"])) {
            return wSuspense() ? rxjs__WEBPACK_IMPORTED_MODULE_0__["NEVER"].pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["startWith"])(undefined)) : undefined;
        }
        const isNull = observable$ == null;
        if (isNull) {
            return rxjs__WEBPACK_IMPORTED_MODULE_0__["NEVER"].pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["startWith"])(observable$));
        }
        return (isObs ? observable$ : Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["from"])(observable$)).pipe((o$) => {
            if (!firstRun || (withSuspense && withSuspense())) {
                return o$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["startWith"])(undefined));
            }
            return o$;
        });
    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(() => (firstRun = false)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["filter"])((v) => v !== undefined), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])((o) => {
        return o.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["distinctUntilChanged"])(), Object(_rxMaterialize__WEBPACK_IMPORTED_MODULE_4__["rxMaterialize"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((notification) => {
            latestNextValue =
                notification.kind === _model__WEBPACK_IMPORTED_MODULE_2__["RxNotificationKind"].next
                    ? notification.value
                    : latestNextValue;
            if (notification.kind === _model__WEBPACK_IMPORTED_MODULE_2__["RxNotificationKind"].next &&
                latestNextValue === undefined) {
                return Object(_notification_transforms__WEBPACK_IMPORTED_MODULE_3__["toRxSuspenseNotification"])(latestNextValue);
            }
            return Object.assign(Object.assign({}, notification), { value: latestNextValue });
        }));
    }));
    return {
        next(observable) {
            observablesSubject.next(observable);
        },
        values$,
    };
}


/***/ }),

/***/ "ZmhG":
/*!*****************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/directives/if/model/view-context.ts ***!
  \*****************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "ZtsM":
/*!************************************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/zone-agnostic/rxjs/schedulers/queue/QueueScheduler.ts ***!
  \************************************************************************************************************/
/*! exports provided: QueueScheduler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueueScheduler", function() { return QueueScheduler; });
/* harmony import */ var _async_AsyncScheduler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../async/AsyncScheduler */ "It4N");
// tslint:disable

class QueueScheduler extends _async_AsyncScheduler__WEBPACK_IMPORTED_MODULE_0__["AsyncScheduler"] {
}


/***/ }),

/***/ "a7DI":
/*!*********************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/index.ts ***!
  \*********************************************************/
/*! exports provided: createRenderAware, stateful, select, distinctUntilSomeChanged, selectSlice, ngInputFlatten, rxMaterialize, coalesceWith, observableToRxTemplateName, createAccumulationObservable, createSideEffectObservable, intersectionObserver, animationFrameTick, idleCallbackTick, timeoutTick, intervalTick, promiseTick, isSubscription, RxNotificationKind, notificationToRxNotification, toRxErrorNotification, toRxSuspenseNotification, toRxCompleteNotification, notificationKindToRxNotificationKind, setTimeout, clearTimeout, setInterval, clearInterval, requestAnimationFrame, cancelAnimationFrame, cancelIdleCallback, requestIdleCallback, Promise, queueMicrotask, interval, fromEvent, asyncScheduler, asapScheduler, queueScheduler, animationFrameScheduler, getZoneUnPatchedApi, isEnvZonePatched, isApiZonePatched, isNgZone, isNoopNgZone, getResolvedPromise, coalescingManager, getGlobalThis, memo, createPropertiesWeakMap, safePluck, HOST, TVIEW, FLAGS, PARENT, NEXT, TRANSPLANTED_VIEWS_TO_REFRESH, T_HOST, CLEANUP, L_CONTAINER_NATIVE, CONTEXT, INJECTOR, RENDERER_FACTORY, RENDERER, SANITIZER, CHILD_HEAD, CHILD_TAIL, DECLARATION_VIEW, DECLARATION_COMPONENT_VIEW, DECLARATION_LCONTAINER, PREORDER_HOOK_FLAGS, QUERIES, HEADER_OFFSET, toHook, Hooks, renderOnChange */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _render_aware__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render-aware */ "Ol8k");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createRenderAware", function() { return _render_aware__WEBPACK_IMPORTED_MODULE_0__["createRenderAware"]; });

/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "8QCL");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stateful", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["stateful"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "select", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["select"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "distinctUntilSomeChanged", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["distinctUntilSomeChanged"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "selectSlice", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["selectSlice"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ngInputFlatten", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["ngInputFlatten"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rxMaterialize", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["rxMaterialize"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "coalesceWith", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["coalesceWith"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "observableToRxTemplateName", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["observableToRxTemplateName"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createAccumulationObservable", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["createAccumulationObservable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createSideEffectObservable", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["createSideEffectObservable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "intersectionObserver", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["intersectionObserver"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "animationFrameTick", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["animationFrameTick"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "idleCallbackTick", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["idleCallbackTick"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeoutTick", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["timeoutTick"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "intervalTick", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["intervalTick"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "promiseTick", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["promiseTick"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isSubscription", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["isSubscription"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxNotificationKind", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["RxNotificationKind"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "notificationToRxNotification", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["notificationToRxNotification"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toRxErrorNotification", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["toRxErrorNotification"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toRxSuspenseNotification", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["toRxSuspenseNotification"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toRxCompleteNotification", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["toRxCompleteNotification"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "notificationKindToRxNotificationKind", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["notificationKindToRxNotificationKind"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setTimeout", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["setTimeout"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "clearTimeout", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["clearTimeout"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setInterval", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["setInterval"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "clearInterval", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["clearInterval"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "requestAnimationFrame", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["requestAnimationFrame"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cancelAnimationFrame", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["cancelAnimationFrame"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cancelIdleCallback", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["cancelIdleCallback"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "requestIdleCallback", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["requestIdleCallback"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Promise", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["Promise"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "queueMicrotask", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["queueMicrotask"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interval", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["interval"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fromEvent", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["fromEvent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asyncScheduler", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["asyncScheduler"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asapScheduler", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["asapScheduler"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "queueScheduler", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["queueScheduler"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "animationFrameScheduler", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["animationFrameScheduler"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getZoneUnPatchedApi", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["getZoneUnPatchedApi"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isEnvZonePatched", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["isEnvZonePatched"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isApiZonePatched", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["isApiZonePatched"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isNgZone", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["isNgZone"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isNoopNgZone", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["isNoopNgZone"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getResolvedPromise", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["getResolvedPromise"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "coalescingManager", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["coalescingManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getGlobalThis", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["getGlobalThis"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "memo", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["memo"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createPropertiesWeakMap", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["createPropertiesWeakMap"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "safePluck", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["safePluck"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HOST", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["HOST"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TVIEW", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["TVIEW"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FLAGS", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["FLAGS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PARENT", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["PARENT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NEXT", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["NEXT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TRANSPLANTED_VIEWS_TO_REFRESH", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["TRANSPLANTED_VIEWS_TO_REFRESH"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "T_HOST", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["T_HOST"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CLEANUP", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["CLEANUP"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "L_CONTAINER_NATIVE", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["L_CONTAINER_NATIVE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CONTEXT", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["CONTEXT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "INJECTOR", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["INJECTOR"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RENDERER_FACTORY", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["RENDERER_FACTORY"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RENDERER", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["RENDERER"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SANITIZER", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["SANITIZER"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CHILD_HEAD", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["CHILD_HEAD"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CHILD_TAIL", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["CHILD_TAIL"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DECLARATION_VIEW", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["DECLARATION_VIEW"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DECLARATION_COMPONENT_VIEW", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["DECLARATION_COMPONENT_VIEW"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DECLARATION_LCONTAINER", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["DECLARATION_LCONTAINER"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PREORDER_HOOK_FLAGS", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["PREORDER_HOOK_FLAGS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QUERIES", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["QUERIES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HEADER_OFFSET", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["HEADER_OFFSET"]; });

/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hooks */ "W0l3");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toHook", function() { return _hooks__WEBPACK_IMPORTED_MODULE_2__["toHook"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Hooks", function() { return _hooks__WEBPACK_IMPORTED_MODULE_2__["Hooks"]; });

/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./decorators */ "I98Z");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "renderOnChange", function() { return _decorators__WEBPACK_IMPORTED_MODULE_3__["renderOnChange"]; });







/***/ }),

/***/ "aJ7t":
/*!**********************************************************************************!*\
  !*** ./apps/demos/src/app/features/template/viewport-prio/viewport-prio.menu.ts ***!
  \**********************************************************************************/
/*! exports provided: MENU_ITEMS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MENU_ITEMS", function() { return MENU_ITEMS; });
const MENU_ITEMS = [
    {
        label: 'Basic Example',
        link: 'basic-example'
    }
];


/***/ }),

/***/ "aLPm":
/*!****************************************************!*\
  !*** ./apps/demos/src/environments/environment.ts ***!
  \****************************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const environment = {
    production: false,
    zoneless: false,
    changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].Default
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "abvE":
/*!************************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/components/context/model/template-names.ts ***!
  \************************************************************************************************/
/*! exports provided: RxContextTemplateNames */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RxContextTemplateNames", function() { return RxContextTemplateNames; });
/* harmony import */ var _rx_angular_cdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rx-angular/cdk */ "cDIL");

const RxContextTemplateNames = Object.assign(Object.assign({}, _rx_angular_cdk__WEBPACK_IMPORTED_MODULE_0__["RxBaseTemplateNames"]), { content: 'rxContent' });


/***/ }),

/***/ "aljK":
/*!****************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/properties-weakmap.ts ***!
  \****************************************************************************/
/*! exports provided: createPropertiesWeakMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPropertiesWeakMap", function() { return createPropertiesWeakMap; });
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


/***/ }),

/***/ "ao4c":
/*!*****************************************************!*\
  !*** ./libs/cdk/src/lib/zone-less/browser/index.ts ***!
  \*****************************************************/
/*! exports provided: Promise, requestAnimationFrame, cancelAnimationFrame, setInterval, clearInterval, setTimeout, clearTimeout, unpatchAddEventListener */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./browser */ "rxQk");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Promise", function() { return _browser__WEBPACK_IMPORTED_MODULE_0__["Promise"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "requestAnimationFrame", function() { return _browser__WEBPACK_IMPORTED_MODULE_0__["requestAnimationFrame"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cancelAnimationFrame", function() { return _browser__WEBPACK_IMPORTED_MODULE_0__["cancelAnimationFrame"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setInterval", function() { return _browser__WEBPACK_IMPORTED_MODULE_0__["setInterval"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "clearInterval", function() { return _browser__WEBPACK_IMPORTED_MODULE_0__["clearInterval"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setTimeout", function() { return _browser__WEBPACK_IMPORTED_MODULE_0__["setTimeout"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "clearTimeout", function() { return _browser__WEBPACK_IMPORTED_MODULE_0__["clearTimeout"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "unpatchAddEventListener", function() { return _browser__WEBPACK_IMPORTED_MODULE_0__["unpatchAddEventListener"]; });




/***/ }),

/***/ "cDIL":
/*!*******************************!*\
  !*** ./libs/cdk/src/index.ts ***!
  \*******************************/
/*! exports provided: RxNotificationKind, coerceDistinctObservable, coerceDistinctWith, coerceObservable, coerceObservableWith, hotFlatten, templateNotifier, onStrategy, rxMaterialize, strategyHandling, templateTriggerHandling, coalesceWith, toRxCompleteNotification, toRxErrorNotification, toRxSuspenseNotification, RxStrategyProvider, RX_CONCURRENT_STRATEGIES, RX_NATIVE_STRATEGIES, templateHandling, RxBaseTemplateNames, createTemplateManager, createListTemplateManager, RxDefaultListViewContext, getZoneUnPatchedApi, Promise, requestAnimationFrame, cancelAnimationFrame, setInterval, clearInterval, setTimeout, clearTimeout, unpatchAddEventListener, asyncScheduler, asap, queue, animationFrame, interval, timer, fromEvent, uiEvent, focusEvent, selectionEvent, mouseEvent, wheelEvent, inputEvent, keyboardEvent, compositionEvent, touchEvents, formControlsEvents, globalEvents, xhrEvent, websocketEvents, allEvents, zoneConfig, RX_ANGULAR_CONFIG, RX_ANGULAR_DEFAULTS, mergeDefaultConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/model */ "pJB2");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxNotificationKind", function() { return _lib_model__WEBPACK_IMPORTED_MODULE_0__["RxNotificationKind"]; });

/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/utils */ "rD3y");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "coerceDistinctObservable", function() { return _lib_utils__WEBPACK_IMPORTED_MODULE_1__["coerceDistinctObservable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "coerceDistinctWith", function() { return _lib_utils__WEBPACK_IMPORTED_MODULE_1__["coerceDistinctWith"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "coerceObservable", function() { return _lib_utils__WEBPACK_IMPORTED_MODULE_1__["coerceObservable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "coerceObservableWith", function() { return _lib_utils__WEBPACK_IMPORTED_MODULE_1__["coerceObservableWith"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hotFlatten", function() { return _lib_utils__WEBPACK_IMPORTED_MODULE_1__["hotFlatten"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "templateNotifier", function() { return _lib_utils__WEBPACK_IMPORTED_MODULE_1__["templateNotifier"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "onStrategy", function() { return _lib_utils__WEBPACK_IMPORTED_MODULE_1__["onStrategy"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rxMaterialize", function() { return _lib_utils__WEBPACK_IMPORTED_MODULE_1__["rxMaterialize"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "strategyHandling", function() { return _lib_utils__WEBPACK_IMPORTED_MODULE_1__["strategyHandling"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "templateTriggerHandling", function() { return _lib_utils__WEBPACK_IMPORTED_MODULE_1__["templateTriggerHandling"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "coalesceWith", function() { return _lib_utils__WEBPACK_IMPORTED_MODULE_1__["coalesceWith"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toRxCompleteNotification", function() { return _lib_utils__WEBPACK_IMPORTED_MODULE_1__["toRxCompleteNotification"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toRxErrorNotification", function() { return _lib_utils__WEBPACK_IMPORTED_MODULE_1__["toRxErrorNotification"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toRxSuspenseNotification", function() { return _lib_utils__WEBPACK_IMPORTED_MODULE_1__["toRxSuspenseNotification"]; });

/* harmony import */ var _lib_render_strategies__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/render-strategies */ "7Tv2");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxStrategyProvider", function() { return _lib_render_strategies__WEBPACK_IMPORTED_MODULE_2__["RxStrategyProvider"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RX_CONCURRENT_STRATEGIES", function() { return _lib_render_strategies__WEBPACK_IMPORTED_MODULE_2__["RX_CONCURRENT_STRATEGIES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RX_NATIVE_STRATEGIES", function() { return _lib_render_strategies__WEBPACK_IMPORTED_MODULE_2__["RX_NATIVE_STRATEGIES"]; });

/* harmony import */ var _lib_template_management__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/template-management */ "3c4s");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "templateHandling", function() { return _lib_template_management__WEBPACK_IMPORTED_MODULE_3__["templateHandling"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxBaseTemplateNames", function() { return _lib_template_management__WEBPACK_IMPORTED_MODULE_3__["RxBaseTemplateNames"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createTemplateManager", function() { return _lib_template_management__WEBPACK_IMPORTED_MODULE_3__["createTemplateManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createListTemplateManager", function() { return _lib_template_management__WEBPACK_IMPORTED_MODULE_3__["createListTemplateManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxDefaultListViewContext", function() { return _lib_template_management__WEBPACK_IMPORTED_MODULE_3__["RxDefaultListViewContext"]; });

/* harmony import */ var _lib_zone_less__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/zone-less */ "2e5+");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getZoneUnPatchedApi", function() { return _lib_zone_less__WEBPACK_IMPORTED_MODULE_4__["getZoneUnPatchedApi"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Promise", function() { return _lib_zone_less__WEBPACK_IMPORTED_MODULE_4__["Promise"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "requestAnimationFrame", function() { return _lib_zone_less__WEBPACK_IMPORTED_MODULE_4__["requestAnimationFrame"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cancelAnimationFrame", function() { return _lib_zone_less__WEBPACK_IMPORTED_MODULE_4__["cancelAnimationFrame"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setInterval", function() { return _lib_zone_less__WEBPACK_IMPORTED_MODULE_4__["setInterval"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "clearInterval", function() { return _lib_zone_less__WEBPACK_IMPORTED_MODULE_4__["clearInterval"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setTimeout", function() { return _lib_zone_less__WEBPACK_IMPORTED_MODULE_4__["setTimeout"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "clearTimeout", function() { return _lib_zone_less__WEBPACK_IMPORTED_MODULE_4__["clearTimeout"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "unpatchAddEventListener", function() { return _lib_zone_less__WEBPACK_IMPORTED_MODULE_4__["unpatchAddEventListener"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asyncScheduler", function() { return _lib_zone_less__WEBPACK_IMPORTED_MODULE_4__["asyncScheduler"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asap", function() { return _lib_zone_less__WEBPACK_IMPORTED_MODULE_4__["asap"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "queue", function() { return _lib_zone_less__WEBPACK_IMPORTED_MODULE_4__["queue"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "animationFrame", function() { return _lib_zone_less__WEBPACK_IMPORTED_MODULE_4__["animationFrame"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interval", function() { return _lib_zone_less__WEBPACK_IMPORTED_MODULE_4__["interval"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timer", function() { return _lib_zone_less__WEBPACK_IMPORTED_MODULE_4__["timer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fromEvent", function() { return _lib_zone_less__WEBPACK_IMPORTED_MODULE_4__["fromEvent"]; });

/* harmony import */ var _lib_zone_configuration__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/zone-configuration */ "DsEK");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "uiEvent", function() { return _lib_zone_configuration__WEBPACK_IMPORTED_MODULE_5__["uiEvent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "focusEvent", function() { return _lib_zone_configuration__WEBPACK_IMPORTED_MODULE_5__["focusEvent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "selectionEvent", function() { return _lib_zone_configuration__WEBPACK_IMPORTED_MODULE_5__["selectionEvent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mouseEvent", function() { return _lib_zone_configuration__WEBPACK_IMPORTED_MODULE_5__["mouseEvent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "wheelEvent", function() { return _lib_zone_configuration__WEBPACK_IMPORTED_MODULE_5__["wheelEvent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "inputEvent", function() { return _lib_zone_configuration__WEBPACK_IMPORTED_MODULE_5__["inputEvent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "keyboardEvent", function() { return _lib_zone_configuration__WEBPACK_IMPORTED_MODULE_5__["keyboardEvent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "compositionEvent", function() { return _lib_zone_configuration__WEBPACK_IMPORTED_MODULE_5__["compositionEvent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "touchEvents", function() { return _lib_zone_configuration__WEBPACK_IMPORTED_MODULE_5__["touchEvents"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "formControlsEvents", function() { return _lib_zone_configuration__WEBPACK_IMPORTED_MODULE_5__["formControlsEvents"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "globalEvents", function() { return _lib_zone_configuration__WEBPACK_IMPORTED_MODULE_5__["globalEvents"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "xhrEvent", function() { return _lib_zone_configuration__WEBPACK_IMPORTED_MODULE_5__["xhrEvent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "websocketEvents", function() { return _lib_zone_configuration__WEBPACK_IMPORTED_MODULE_5__["websocketEvents"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "allEvents", function() { return _lib_zone_configuration__WEBPACK_IMPORTED_MODULE_5__["allEvents"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "zoneConfig", function() { return _lib_zone_configuration__WEBPACK_IMPORTED_MODULE_5__["zoneConfig"]; });

/* harmony import */ var _lib_cdk_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/cdk-config */ "ioAo");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RX_ANGULAR_CONFIG", function() { return _lib_cdk_config__WEBPACK_IMPORTED_MODULE_6__["RX_ANGULAR_CONFIG"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RX_ANGULAR_DEFAULTS", function() { return _lib_cdk_config__WEBPACK_IMPORTED_MODULE_6__["RX_ANGULAR_DEFAULTS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeDefaultConfig", function() { return _lib_cdk_config__WEBPACK_IMPORTED_MODULE_6__["mergeDefaultConfig"]; });










/***/ }),

/***/ "caVP":
/*!*****************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/index.ts ***!
  \*****************************************************/
/*! exports provided: createRenderAware, stateful, select, distinctUntilSomeChanged, selectSlice, ngInputFlatten, rxMaterialize, coalesceWith, observableToRxTemplateName, createAccumulationObservable, createSideEffectObservable, intersectionObserver, animationFrameTick, idleCallbackTick, timeoutTick, intervalTick, promiseTick, isSubscription, RxNotificationKind, notificationToRxNotification, toRxErrorNotification, toRxSuspenseNotification, toRxCompleteNotification, notificationKindToRxNotificationKind, setTimeout, clearTimeout, setInterval, clearInterval, requestAnimationFrame, cancelAnimationFrame, cancelIdleCallback, requestIdleCallback, Promise, queueMicrotask, interval, fromEvent, asyncScheduler, asapScheduler, queueScheduler, animationFrameScheduler, getZoneUnPatchedApi, isEnvZonePatched, isApiZonePatched, isNgZone, isNoopNgZone, getResolvedPromise, coalescingManager, getGlobalThis, memo, createPropertiesWeakMap, safePluck, HOST, TVIEW, FLAGS, PARENT, NEXT, TRANSPLANTED_VIEWS_TO_REFRESH, T_HOST, CLEANUP, L_CONTAINER_NATIVE, CONTEXT, INJECTOR, RENDERER_FACTORY, RENDERER, SANITIZER, CHILD_HEAD, CHILD_TAIL, DECLARATION_VIEW, DECLARATION_COMPONENT_VIEW, DECLARATION_LCONTAINER, PREORDER_HOOK_FLAGS, QUERIES, HEADER_OFFSET, toHook, Hooks, renderOnChange, RxLetTemplateNames, RxLet, RxLetModule, RxIfTemplateNames, RxIf, RxIfModule, RxSwichModule, RxSwitchCase, RxSwitch, RxFor, RxForModule, unpatchEventListener, UnpatchEventsDirective, UnpatchEventsModule, IfVisibleDirective, IfVisibleModule, RxContextTemplateNames, RxContext, RxContextContainer, RxContextModule, getMemoizedFn, MemoModule, MemoPipe, PipePipe, PipeModule, PushPipe, PushModule, RxEffects, untilDestroyed */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cdk */ "a7DI");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createRenderAware", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["createRenderAware"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stateful", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["stateful"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "select", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["select"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "distinctUntilSomeChanged", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["distinctUntilSomeChanged"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "selectSlice", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["selectSlice"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ngInputFlatten", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["ngInputFlatten"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rxMaterialize", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["rxMaterialize"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "coalesceWith", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["coalesceWith"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "observableToRxTemplateName", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["observableToRxTemplateName"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createAccumulationObservable", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["createAccumulationObservable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createSideEffectObservable", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["createSideEffectObservable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "intersectionObserver", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["intersectionObserver"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "animationFrameTick", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["animationFrameTick"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "idleCallbackTick", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["idleCallbackTick"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeoutTick", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["timeoutTick"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "intervalTick", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["intervalTick"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "promiseTick", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["promiseTick"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isSubscription", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["isSubscription"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxNotificationKind", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["RxNotificationKind"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "notificationToRxNotification", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["notificationToRxNotification"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toRxErrorNotification", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["toRxErrorNotification"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toRxSuspenseNotification", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["toRxSuspenseNotification"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toRxCompleteNotification", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["toRxCompleteNotification"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "notificationKindToRxNotificationKind", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["notificationKindToRxNotificationKind"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setTimeout", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["setTimeout"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "clearTimeout", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["clearTimeout"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setInterval", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["setInterval"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "clearInterval", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["clearInterval"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "requestAnimationFrame", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["requestAnimationFrame"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cancelAnimationFrame", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["cancelAnimationFrame"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cancelIdleCallback", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["cancelIdleCallback"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "requestIdleCallback", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["requestIdleCallback"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Promise", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["Promise"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "queueMicrotask", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["queueMicrotask"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interval", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["interval"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fromEvent", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["fromEvent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asyncScheduler", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["asyncScheduler"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asapScheduler", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["asapScheduler"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "queueScheduler", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["queueScheduler"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "animationFrameScheduler", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["animationFrameScheduler"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getZoneUnPatchedApi", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["getZoneUnPatchedApi"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isEnvZonePatched", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["isEnvZonePatched"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isApiZonePatched", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["isApiZonePatched"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isNgZone", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["isNgZone"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isNoopNgZone", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["isNoopNgZone"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getResolvedPromise", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["getResolvedPromise"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "coalescingManager", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["coalescingManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getGlobalThis", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["getGlobalThis"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "memo", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["memo"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createPropertiesWeakMap", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["createPropertiesWeakMap"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "safePluck", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["safePluck"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HOST", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["HOST"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TVIEW", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["TVIEW"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FLAGS", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["FLAGS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PARENT", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["PARENT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NEXT", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["NEXT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TRANSPLANTED_VIEWS_TO_REFRESH", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["TRANSPLANTED_VIEWS_TO_REFRESH"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "T_HOST", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["T_HOST"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CLEANUP", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["CLEANUP"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "L_CONTAINER_NATIVE", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["L_CONTAINER_NATIVE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CONTEXT", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["CONTEXT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "INJECTOR", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["INJECTOR"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RENDERER_FACTORY", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["RENDERER_FACTORY"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RENDERER", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["RENDERER"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SANITIZER", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["SANITIZER"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CHILD_HEAD", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["CHILD_HEAD"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CHILD_TAIL", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["CHILD_TAIL"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DECLARATION_VIEW", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["DECLARATION_VIEW"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DECLARATION_COMPONENT_VIEW", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["DECLARATION_COMPONENT_VIEW"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DECLARATION_LCONTAINER", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["DECLARATION_LCONTAINER"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PREORDER_HOOK_FLAGS", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["PREORDER_HOOK_FLAGS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QUERIES", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["QUERIES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HEADER_OFFSET", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["HEADER_OFFSET"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toHook", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["toHook"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Hooks", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["Hooks"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "renderOnChange", function() { return _cdk__WEBPACK_IMPORTED_MODULE_0__["renderOnChange"]; });

/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./template */ "IFT9");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxLetTemplateNames", function() { return _template__WEBPACK_IMPORTED_MODULE_1__["RxLetTemplateNames"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxLet", function() { return _template__WEBPACK_IMPORTED_MODULE_1__["RxLet"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxLetModule", function() { return _template__WEBPACK_IMPORTED_MODULE_1__["RxLetModule"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxIfTemplateNames", function() { return _template__WEBPACK_IMPORTED_MODULE_1__["RxIfTemplateNames"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxIf", function() { return _template__WEBPACK_IMPORTED_MODULE_1__["RxIf"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxIfModule", function() { return _template__WEBPACK_IMPORTED_MODULE_1__["RxIfModule"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxSwichModule", function() { return _template__WEBPACK_IMPORTED_MODULE_1__["RxSwichModule"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxSwitchCase", function() { return _template__WEBPACK_IMPORTED_MODULE_1__["RxSwitchCase"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxSwitch", function() { return _template__WEBPACK_IMPORTED_MODULE_1__["RxSwitch"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxFor", function() { return _template__WEBPACK_IMPORTED_MODULE_1__["RxFor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxForModule", function() { return _template__WEBPACK_IMPORTED_MODULE_1__["RxForModule"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "unpatchEventListener", function() { return _template__WEBPACK_IMPORTED_MODULE_1__["unpatchEventListener"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UnpatchEventsDirective", function() { return _template__WEBPACK_IMPORTED_MODULE_1__["UnpatchEventsDirective"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UnpatchEventsModule", function() { return _template__WEBPACK_IMPORTED_MODULE_1__["UnpatchEventsModule"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IfVisibleDirective", function() { return _template__WEBPACK_IMPORTED_MODULE_1__["IfVisibleDirective"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IfVisibleModule", function() { return _template__WEBPACK_IMPORTED_MODULE_1__["IfVisibleModule"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxContextTemplateNames", function() { return _template__WEBPACK_IMPORTED_MODULE_1__["RxContextTemplateNames"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxContext", function() { return _template__WEBPACK_IMPORTED_MODULE_1__["RxContext"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxContextContainer", function() { return _template__WEBPACK_IMPORTED_MODULE_1__["RxContextContainer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxContextModule", function() { return _template__WEBPACK_IMPORTED_MODULE_1__["RxContextModule"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getMemoizedFn", function() { return _template__WEBPACK_IMPORTED_MODULE_1__["getMemoizedFn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MemoModule", function() { return _template__WEBPACK_IMPORTED_MODULE_1__["MemoModule"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MemoPipe", function() { return _template__WEBPACK_IMPORTED_MODULE_1__["MemoPipe"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PipePipe", function() { return _template__WEBPACK_IMPORTED_MODULE_1__["PipePipe"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PipeModule", function() { return _template__WEBPACK_IMPORTED_MODULE_1__["PipeModule"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PushPipe", function() { return _template__WEBPACK_IMPORTED_MODULE_1__["PushPipe"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PushModule", function() { return _template__WEBPACK_IMPORTED_MODULE_1__["PushModule"]; });

/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./state */ "VIYf");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxEffects", function() { return _state__WEBPACK_IMPORTED_MODULE_2__["RxEffects"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "untilDestroyed", function() { return _state__WEBPACK_IMPORTED_MODULE_2__["untilDestroyed"]; });






/***/ }),

/***/ "cihl":
/*!****************************************************!*\
  !*** ./libs/template/src/lib/let/let.directive.ts ***!
  \****************************************************/
/*! exports provided: LetDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LetDirective", function() { return LetDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _rx_angular_cdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @rx-angular/cdk */ "cDIL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "kU1M");






/** @internal */
const RxLetTemplateNames = Object.assign(Object.assign({}, _rx_angular_cdk__WEBPACK_IMPORTED_MODULE_1__["RxBaseTemplateNames"]), { next: 'nextTpl' });
/**
 * @Directive LetDirective
 *
 * @description
 *
 * The `*rxLet` directive serves a convenient way of binding observables to a view context. Furthermore, it helps
 * you structure view-related models into view context scope (DOM element's scope).
 *
 * Under the hood, it leverages a `RenderStrategy` which in turn takes care of optimizing the change detection
 * of your component or embedded view. The `LetDirective` will render its template and manage change detection after it
 *   got an initial value. So if the incoming `Observable` emits its value lazily (e.g. data coming from `Http`), your
 *   template will be rendered lazily as well. This can very positively impact the initial render performance of your
 *   application.
 *
 *
 * ### Problems with `async` and `*ngIf`
 *
 * In Angular, a way of binding an observable to the view could look like that:
 * ```html
 * <ng-container *ngIf="observableNumber$ | async as n">
 *   <app-number [number]="n"></app-number>
 *   <app-number-special [number]="n"></app-number-special>
 * </ng-container>
 * ```
 *
 * The problem is that `*ngIf` interferes with rendering and in case of a `0` (a falsy value) the component
 * would be hidden. This issue doesn't concern the `LetDirective`.
 *
 * The `AsyncPipe` relies on the Zone to be present - it doesn't really trigger change detection by itself.
 * It marks the component and its children as dirty waiting for the Zone to trigger change detection. So, in case
 * you want to create a zone-less application, the `AsyncPipe` won't work as desired. `LetDirective` comes
 * with its own strategies to manage change detection every time a new notification is sent from
 * the bound Observable.
 *
 *
 * ### Features of `*rxLet`
 *
 * Included features for `*rxLet`:
 * - binding is always present. (see "Problems with `async` and `*ngIf`" section below)
 * - it takes away the multiple usages of the `async` or `push` pipe
 * - a unified/structured way of handling null and undefined
 * - triggers change-detection differently if `zone.js` is present or not (`ChangeDetectorRef.detectChanges` or
 *   `ChangeDetectorRef.markForCheck`)
 * - triggers change-detection differently if ViewEngine or Ivy is present (`ChangeDetectorRef.detectChanges` or
 *   `ɵdetectChanges`)
 * - distinct same values in a row (`distinctUntilChanged` operator),
 * - display custom templates for different observable notifications (rxSuspense, rxNext, rxError, rxComplete)
 * - notify about after changes got rendered to the template (RenderCallback)
 *
 *
 * ### Binding an Observable and using the view context
 *
 * The `*rxLet` directive takes over several things and makes it more convenient and save to work with streams in the
 * template:
 *
 * ```html
 * <ng-container *rxLet="observableNumber$; let n">
 *   <app-number [number]="n"></app-number>
 * </ng-container>
 *
 * <ng-container *rxLet="observableNumber$ as n">
 *   <app-number [number]="n"></app-number>
 * </ng-container>
 * ```
 *
 * In addition to that it provides us information from the whole observable context.
 * We can track the observables:
 * - next value
 * - error occurrence
 * - complete occurrence
 *
 * ```html
 * <ng-container *rxLet="observableNumber$; let n; let e = $rxError, let c = $rxComplete">
 *   <app-number [number]="n" *ngIf="!e && !c"></app-number>
 *   <ng-container *ngIf="e">
 *     There is an error: {{ e }}
 *   </ng-container>
 *   <ng-container *ngIf="c">
 *     Observable completed: {{ c }}
 *   </ng-container>
 * </ng-container>
 * ```
 *
 *
 * ### Using the template-binding
 *
 * You can also use template anchors and display template's content for different observable states:
 * - on complete
 * - on error
 * - on suspense - before the first value is emitted
 *
 * ```html
 * <ng-container
 *   *rxLet="
 *     observableNumber$;
 *     let n;
 *     rxError: error;
 *     rxComplete: complete;
 *     rxSuspense: suspense;
 *   "
 * >
 *   <app-number [number]="n"></app-number>
 * </ng-container>
 * <ng-template #error>ERROR</ng-template>
 * <ng-template #complete>COMPLETE</ng-template>
 * <ng-template #suspense>SUSPENSE</ng-template>
 * ```
 *
 * Internally, `*rxLet` is using a simple "view memoization" - it caches all anchored template references and re-uses
 * them whenever the observable notification (next/error/complete) is sent. Then, it only updates the context
 * (e.g. a value from the observable) in the view.
 *
 *
 * @docsCategory LetDirective
 * @docsPage LetDirective
 * @publicApi
 */
class LetDirective {
    // TODO: enable when tested and documented properly
    /* @Input('rxLetShowComplete')
     set showComplete(trigger$: Observable<any>) {
     this.triggerHandler.next(
     trigger$.pipe(mapTo(toRxCompleteNotification() as any))
     );
     }
  
     @Input('rxLetShowError')
     set showError(error$: Observable<any>) {
     this.triggerHandler.next(error$.pipe(map(toRxErrorNotification as any)));
     }
  
     @Input('rxLetShowSuspense')
     set showSuspense(trigger$: Observable<any>) {
     this.triggerHandler.next(
     trigger$.pipe(map(toRxSuspenseNotification as any))
     );
     }*/
    constructor(strategyProvider, cdRef, eRef, ngZone, nextTemplateRef, viewContainerRef) {
        this.strategyProvider = strategyProvider;
        this.cdRef = cdRef;
        this.eRef = eRef;
        this.ngZone = ngZone;
        this.nextTemplateRef = nextTemplateRef;
        this.viewContainerRef = viewContainerRef;
        this.renderParent = true;
        this.patchZone = this.strategyProvider.config.patchZone;
        /** @internal */
        this.observablesHandler = Object(_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_1__["templateNotifier"])(() => !!this.rxSuspense);
        /** @internal */
        this.strategyHandler = Object(_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_1__["hotFlatten"])(() => new rxjs__WEBPACK_IMPORTED_MODULE_2__["ReplaySubject"](1));
        /** @internal */
        this.triggerHandler = Object(_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_1__["hotFlatten"])(() => new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"](), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["mergeAll"])());
        /** @internal */
        this.subscription = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subscription"]();
        /** @internal */
        this.rendered$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.rendered = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["defer"])(() => this.rendered$.pipe());
    }
    /**
     * @description
     * The Observable to be bound to the context of a template.
     *
     * @example
     * <ng-container *rxLet="hero$; let hero">
     *   <app-hero [hero]="hero"></app-hero>
     * </ng-container>
     *
     * @param potentialObservable
     */
    set rxLet(potentialObservable) {
        this.observablesHandler.next(potentialObservable);
    }
    /**
     * @description
     * The rendering strategy to be used when rendering with the reactive context within a template.
     * Use it to dynamically manage your rendering strategy. You can switch the strategies
     * imperatively (with a string) or by bounding an Observable.
     * The default strategy is `'local'`.
     *
     * @example
     * \@Component({
     *   selector: 'app-root',
     *   template: `
     *     <ng-container *rxLet="hero$; let hero; strategy: strategy">
     *       <app-hero [hero]="hero"></app-hero>
     *     </ng-container>
     *   `
     * })
     * export class AppComponent {
     *   strategy = 'local';
     * }
     *
     * // OR
     *
     * \@Component({
     *   selector: 'app-root',
     *   template: `
     *     <ng-container *rxLet="hero$; let hero; strategy: strategy$">
     *       <app-hero [hero]="hero"></app-hero>
     *     </ng-container>
     *   `
     * })
     * export class AppComponent {
     *   strategy$ = new BehaviorSubject('local');
     * }
     *
     * @param strategy
     * @see {@link strategies}
     */
    set strategy(strategyName) {
        this.strategyHandler.next(strategyName);
    }
    set renderCallback(callback) {
        this._renderObserver = callback;
    }
    /** @internal */
    static ngTemplateContextGuard(dir, ctx) {
        return true;
    }
    /** @internal */
    ngOnInit() {
        this.subscription.add(this.templateManager
            .render(this.observablesHandler.values$)
            .subscribe((n) => {
            var _a;
            this.rendered$.next(n);
            (_a = this._renderObserver) === null || _a === void 0 ? void 0 : _a.next(n);
        }));
    }
    /** @internal */
    ngOnChanges(changes) {
        if (!this.templateManager) {
            this._createTemplateManager();
        }
        if (changes.rxComplete) {
            this.templateManager.addTemplateRef(RxLetTemplateNames.complete, this.rxComplete);
        }
        if (changes.rxSuspense) {
            this.templateManager.addTemplateRef(RxLetTemplateNames.suspense, this.rxSuspense);
        }
        if (changes.rxError) {
            this.templateManager.addTemplateRef(RxLetTemplateNames.error, this.rxError);
        }
    }
    /** @internal */
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    /** @internal */
    _createTemplateManager() {
        this.templateManager = Object(_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_1__["createTemplateManager"])({
            templateSettings: {
                viewContainerRef: this.viewContainerRef,
                createViewContext,
                updateViewContext,
                customContext: (rxLet) => ({ rxLet }),
                patchZone: this.patchZone ? this.ngZone : false,
            },
            renderSettings: {
                cdRef: this.cdRef,
                eRef: this.eRef,
                parent: !!this.renderParent,
                patchZone: this.patchZone ? this.ngZone : false,
                defaultStrategyName: this.strategyProvider.primaryStrategy,
                strategies: this.strategyProvider.strategies,
            },
            notificationToTemplateName: {
                [_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_1__["RxNotificationKind"].suspense]: () => this.rxSuspense
                    ? RxLetTemplateNames.suspense
                    : RxLetTemplateNames.next,
                [_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_1__["RxNotificationKind"].next]: () => RxLetTemplateNames.next,
                [_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_1__["RxNotificationKind"].error]: () => this.rxError ? RxLetTemplateNames.error : RxLetTemplateNames.next,
                [_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_1__["RxNotificationKind"].complete]: () => this.rxComplete
                    ? RxLetTemplateNames.complete
                    : RxLetTemplateNames.next,
            },
            templateTrigger$: this.triggerHandler.values$,
        });
        this.templateManager.addTemplateRef(RxLetTemplateNames.next, this.nextTemplateRef);
        this.templateManager.nextStrategy(this.strategyHandler.values$);
    }
}
LetDirective.ɵfac = function LetDirective_Factory(t) { return new (t || LetDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_1__["RxStrategyProvider"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"])); };
LetDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: LetDirective, selectors: [["", "rxLet", ""]], inputs: { rxLet: "rxLet", strategy: ["rxLetStrategy", "strategy"], rxComplete: ["rxLetRxComplete", "rxComplete"], rxError: ["rxLetRxError", "rxError"], rxSuspense: ["rxLetRxSuspense", "rxSuspense"], renderCallback: ["rxLetRenderCallback", "renderCallback"], renderParent: ["rxLetParent", "renderParent"], patchZone: ["rxLetPatchZone", "patchZone"] }, outputs: { rendered: "rendered" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]] });
/** @internal */
function createViewContext(value) {
    return {
        rxLet: value,
        $implicit: value,
        $error: false,
        $complete: false,
        $suspense: false,
    };
}
/** @internal */
function updateViewContext(value, view, context) {
    Object.keys(context).forEach((k) => {
        view.context[k] = context[k];
    });
}


/***/ }),

/***/ "cjDm":
/*!********************************************************!*\
  !*** ./apps/demos/src/app/app-component/app.routes.ts ***!
  \********************************************************/
/*! exports provided: ROUTES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROUTES", function() { return ROUTES; });
/* harmony import */ var _features_home_home_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../features/home/home.component */ "Lzoi");

const ROUTES = [
    {
        path: '',
        component: _features_home_home_component__WEBPACK_IMPORTED_MODULE_0__["HomeComponent"]
    },
    {
        path: 'concepts',
        loadChildren: () => __webpack_require__.e(/*! import() | features-concepts-fundamentals-module */ "features-concepts-fundamentals-module").then(__webpack_require__.bind(null, /*! ../features/concepts/fundamentals.module */ "QZgs")).then((m) => m.FundamentalsModule)
    },
    {
        path: 'template',
        loadChildren: () => __webpack_require__.e(/*! import() | features-template-template-shell-module */ "features-template-template-shell-module").then(__webpack_require__.bind(null, /*! ../features/template/template-shell.module */ "//Fd")).then((m) => m.TemplateShellModule)
    },
    {
        path: 'tutorials',
        loadChildren: () => __webpack_require__.e(/*! import() | features-tutorials-tutorials-shell-module */ "features-tutorials-tutorials-shell-module").then(__webpack_require__.bind(null, /*! ../features/tutorials/tutorials-shell.module */ "cVoX")).then((m) => m.TutorialsShellModule)
    },
    {
        path: 'integrations',
        loadChildren: () => __webpack_require__.e(/*! import() | features-integrations-integrations-shell-module */ "features-integrations-integrations-shell-module").then(__webpack_require__.bind(null, /*! ../features/integrations/integrations-shell.module */ "B3fT")).then((m) => m.IntegrationsShellModule)
    },
    {
        path: 'experiments',
        loadChildren: () => __webpack_require__.e(/*! import() | features-experiments-experiments-shell-module */ "features-experiments-experiments-shell-module").then(__webpack_require__.bind(null, /*! ../features/experiments/experiments-shell.module */ "jB7U")).then((m) => m.ExperimentsShellModule)
    },
    {
        path: 'performance',
        loadChildren: () => __webpack_require__.e(/*! import() | features-performance-performance-shell-module */ "features-performance-performance-shell-module").then(__webpack_require__.bind(null, /*! ../features/performance/performance-shell.module */ "dK8a")).then((m) => m.PerformanceShellModule)
    }
];


/***/ }),

/***/ "clYq":
/*!*****************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/directives/for/index.ts ***!
  \*****************************************************************************/
/*! exports provided: RxFor, RxForModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rx_for_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rx-for.directive */ "LriG");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxFor", function() { return _rx_for_directive__WEBPACK_IMPORTED_MODULE_0__["RxFor"]; });

/* harmony import */ var _rx_for_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rx-for.module */ "v1iz");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxForModule", function() { return _rx_for_module__WEBPACK_IMPORTED_MODULE_1__["RxForModule"]; });





/***/ }),

/***/ "d5lX":
/*!*******************************************************************************!*\
  !*** ./apps/demos/src/app/features/experiments/strategies/strategies.menu.ts ***!
  \*******************************************************************************/
/*! exports provided: MENU_ITEMS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MENU_ITEMS", function() { return MENU_ITEMS; });
const MENU_ITEMS = [
    {
        link: 'inherit',
        label: 'Inherit',
    },
    {
        link: 'provide',
        label: 'Provide',
    }
];


/***/ }),

/***/ "db7/":
/*!******************************************************************!*\
  !*** ./apps/demos/src/app/app-component/app-component.module.ts ***!
  \******************************************************************/
/*! exports provided: AppComponentModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponentModule", function() { return AppComponentModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component */ "eaOR");
/* harmony import */ var _app_shell__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../app-shell */ "uBKf");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/sidenav */ "XhcP");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/toolbar */ "/t3+");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _app_routes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./app.routes */ "cjDm");
/* harmony import */ var _shared_debug_helper_dirty_checks__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../shared/debug-helper/dirty-checks */ "v95w");
/* harmony import */ var _app_control_panel___WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./app-control-panel/ */ "vjt/");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ "fXoL");














class AppComponentModule {
}
AppComponentModule.ɵfac = function AppComponentModule_Factory(t) { return new (t || AppComponentModule)(); };
AppComponentModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineNgModule"]({ type: AppComponentModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__["AppComponent"]] });
AppComponentModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineInjector"]({ imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__["BrowserAnimationsModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_8__["RouterModule"],
            _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_4__["MatSidenavModule"],
            _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_5__["MatToolbarModule"],
            _angular_material_list__WEBPACK_IMPORTED_MODULE_6__["MatListModule"],
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__["MatIconModule"],
            _app_shell__WEBPACK_IMPORTED_MODULE_2__["AppShellModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_8__["RouterModule"].forRoot(_app_routes__WEBPACK_IMPORTED_MODULE_9__["ROUTES"], { relativeLinkResolution: 'legacy' }),
            _shared_debug_helper_dirty_checks__WEBPACK_IMPORTED_MODULE_10__["DirtyChecksModule"],
            _app_control_panel___WEBPACK_IMPORTED_MODULE_11__["AppControlPanelModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵsetNgModuleScope"](AppComponentModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__["AppComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__["BrowserAnimationsModule"],
        _angular_router__WEBPACK_IMPORTED_MODULE_8__["RouterModule"],
        _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_4__["MatSidenavModule"],
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_5__["MatToolbarModule"],
        _angular_material_list__WEBPACK_IMPORTED_MODULE_6__["MatListModule"],
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__["MatIconModule"],
        _app_shell__WEBPACK_IMPORTED_MODULE_2__["AppShellModule"], _angular_router__WEBPACK_IMPORTED_MODULE_8__["RouterModule"], _shared_debug_helper_dirty_checks__WEBPACK_IMPORTED_MODULE_10__["DirtyChecksModule"],
        _app_control_panel___WEBPACK_IMPORTED_MODULE_11__["AppControlPanelModule"]] }); })();


/***/ }),

/***/ "dp3i":
/*!*********************************************************************************!*\
  !*** ./apps/demos/src/app/app-shell/app-shell-component/app-shell.component.ts ***!
  \*********************************************************************************/
/*! exports provided: AppShellComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppShellComponent", function() { return AppShellComponent; });
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/cdk/overlay */ "rDax");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _rx_angular_state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @rx-angular/state */ "YYsp");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _shared_viewport_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/viewport.service */ "7qDQ");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/sidenav */ "XhcP");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/toolbar */ "/t3+");
/* harmony import */ var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/cdk/scrolling */ "vxfF");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
















function AppShellComponent_mat_sidenav_container_0_button_8_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AppShellComponent_mat_sidenav_container_0_button_8_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r6); _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](2); return _r2.toggle(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "mat-icon", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, "menu");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} }
function AppShellComponent_mat_sidenav_container_0_button_9_Template(rf, ctx) { if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function AppShellComponent_mat_sidenav_container_0_button_9_Template_button_click_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r8); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2); return ctx_r7.onBackButtonClick.next($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "mat-icon", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, "keyboard_backspace");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} }
function AppShellComponent_mat_sidenav_container_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "mat-sidenav-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "mat-sidenav", 2, 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "mat-toolbar", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵprojection"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵprojection"](5, 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "mat-sidenav-content", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "mat-toolbar", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](8, AppShellComponent_mat_sidenav_container_0_button_8_Template, 3, 0, "button", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](9, AppShellComponent_mat_sidenav_container_0_button_9_Template, 3, 0, "button", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵprojection"](10, 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵprojection"](12, 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const state_r1 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("mode", state_r1.isHandset ? "over" : "side")("opened", state_r1.isHandset === false);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵattribute"]("role", state_r1.isHandset ? "dialog" : "navigation");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", state_r1.isHandset && !state_r1.showBackButton);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", state_r1.showBackButton);
} }
const _c0 = [[["", "rxaAppShellSidenavTitle", ""]], [["rxa-side-nav"]], [["", "rxaAppShellHeaderContent", ""]], "*"];
const _c1 = ["[rxaAppShellSidenavTitle]", "rxa-side-nav", "[rxaAppShellHeaderContent]", "*"];
class AppShellComponent {
    constructor(viewport, state, router) {
        this.viewport = viewport;
        this.state = state;
        this.router = router;
        this.viewState$ = this.state.select();
        this.onBackButtonClick = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.connectViewport();
        this.connectBackButtonState();
        this.handleBackButtonClick();
    }
    ngAfterViewInit() {
        this.handleScrollPositionAfterNavigationEnd();
    }
    handleBackButtonClick() {
        this.state.hold(this.onBackButtonClick.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["withLatestFrom"])(this.state.select('backButtonNavigation'))), ([event, backButtonNavigation]) => {
            if (backButtonNavigation) {
                this.router.navigate(backButtonNavigation);
            }
            else {
                history.back();
            }
        });
    }
    handleScrollPositionAfterNavigationEnd() {
        // this effect makes sure the scrollable body gets reset to top: 0 after a route got changed
        this.state.hold(this.router.events.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])((e) => e instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__["NavigationEnd"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(() => this.bodyScrollElement.scrollTo({ top: 0 }))));
    }
    connectBackButtonState() {
        this.state.connect(this.router.events.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])((event) => event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__["NavigationEnd"])), () => {
            var _a, _b;
            let root = this.router.routerState.snapshot.root;
            while (root.children && root.children.length) {
                root = root.children[0];
            }
            return {
                showBackButton: ((_a = root.data) === null || _a === void 0 ? void 0 : _a.showBackButton) || false,
                backButtonNavigation: ((_b = root.data) === null || _b === void 0 ? void 0 : _b.backButtonNavigation) || null,
            };
        });
    }
    connectViewport() {
        this.state.connect('isHandset', this.viewport.isHandset$);
    }
}
AppShellComponent.ɵfac = function AppShellComponent_Factory(t) { return new (t || AppShellComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_shared_viewport_service__WEBPACK_IMPORTED_MODULE_5__["ViewportService"]), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_rx_angular_state__WEBPACK_IMPORTED_MODULE_2__["RxState"]), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"])); };
AppShellComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({ type: AppShellComponent, selectors: [["rxa-app-shell"]], viewQuery: function AppShellComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_0__["CdkScrollable"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.bodyScrollElement = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵProvidersFeature"]([_rx_angular_state__WEBPACK_IMPORTED_MODULE_2__["RxState"]])], ngContentSelectors: _c1, decls: 2, vars: 3, consts: [["class", "app-shell-container", 4, "ngIf"], [1, "app-shell-container"], ["fixedInViewport", "", 1, "app-shell-sidenav", 3, "mode", "opened"], ["drawer", ""], ["color", "primary"], [1, "app-shell-content"], ["color", "primary", 1, "app-shell-header"], ["type", "button", "aria-label", "Toggle sidenav", "mat-icon-button", "", 3, "click", 4, "ngIf"], ["cdkScrollable", "", 1, "container-fluid", "app-shell-content-container"], ["type", "button", "aria-label", "Toggle sidenav", "mat-icon-button", "", 3, "click"], ["aria-label", "Side nav toggle icon"], ["aria-label", "navigate back"]], template: function AppShellComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵprojectionDef"](_c0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](0, AppShellComponent_mat_sidenav_container_0_Template, 13, 5, "mat-sidenav-container", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](1, "async");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](1, 1, ctx.viewState$));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_7__["NgIf"], _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_8__["MatSidenavContainer"], _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_8__["MatSidenav"], _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_9__["MatToolbar"], _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_8__["MatSidenavContent"], _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_10__["CdkScrollable"], _angular_material_button__WEBPACK_IMPORTED_MODULE_11__["MatButton"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__["MatIcon"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_7__["AsyncPipe"]], styles: [".app-shell-container[_ngcontent-%COMP%] {\n  height: 100%;\n}\n\n.app-shell-content[_ngcontent-%COMP%] {\n  overflow: hidden;\n}\n\n.app-shell-sidenav[_ngcontent-%COMP%] {\n  width: 250px;\n}\n\n.app-shell-header[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  z-index: 1;\n}\n\n.app-shell-content-container[_ngcontent-%COMP%] {\n  height: calc(100vh - 64px);\n  overflow-y: auto;\n  overflow-x: hidden;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2FwcC1zaGVsbC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQUE7QUFDRjs7QUFFQTtFQUNFLGdCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxZQUFBO0FBQ0Y7O0FBRUE7RUFDRSxnQkFBQTtFQUNBLE1BQUE7RUFDQSxVQUFBO0FBQ0Y7O0FBRUE7RUFDRSwwQkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUFDRiIsImZpbGUiOiJhcHAtc2hlbGwuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYXBwLXNoZWxsLWNvbnRhaW5lciB7XG4gIGhlaWdodDogMTAwJTtcbn1cblxuLmFwcC1zaGVsbC1jb250ZW50IHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuLmFwcC1zaGVsbC1zaWRlbmF2IHtcbiAgd2lkdGg6IDI1MHB4O1xufVxuXG4uYXBwLXNoZWxsLWhlYWRlciB7XG4gIHBvc2l0aW9uOiBzdGlja3k7XG4gIHRvcDogMDtcbiAgei1pbmRleDogMTtcbn1cblxuLmFwcC1zaGVsbC1jb250ZW50LWNvbnRhaW5lciB7XG4gIGhlaWdodDogY2FsYygxMDB2aCAtIDY0cHgpO1xuICBvdmVyZmxvdy15OiBhdXRvO1xuICBvdmVyZmxvdy14OiBoaWRkZW47XG59XG4iXX0= */"], changeDetection: 0 });


/***/ }),

/***/ "duzR":
/*!*************************************************!*\
  !*** ./libs/template/src/lib/push/push.pipe.ts ***!
  \*************************************************/
/*! exports provided: PushPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PushPipe", function() { return PushPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _rx_angular_cdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @rx-angular/cdk */ "cDIL");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");





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
    constructor(strategyProvider, cdRef) {
        this.strategyProvider = strategyProvider;
        this.cdRef = cdRef;
        /** @internal */
        this.templateObserver = Object(_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_1__["templateNotifier"])();
        /** @internal */
        this.strategyHandler = Object(_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_1__["strategyHandling"])(this.strategyProvider.primaryStrategy, this.strategyProvider.strategies);
        const scope = cdRef.context;
        this.subscription = this.templateObserver.values$
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])((n) => n.kind === _rx_angular_cdk__WEBPACK_IMPORTED_MODULE_1__["RxNotificationKind"].suspense ||
            n.kind === _rx_angular_cdk__WEBPACK_IMPORTED_MODULE_1__["RxNotificationKind"].next), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])((notification) => {
            this.renderedValue = notification.value;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["withLatestFrom"])(this.strategyHandler.strategy$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(([v, strategy]) => this.strategyProvider.schedule(() => {
            strategy.work(cdRef, scope);
        }, {
            scope,
            strategy: strategy.name,
            patchZone: this.strategyProvider.config.patchZone ? null : false,
        })))
            .subscribe();
    }
    transform(potentialObservable, config, renderCallback) {
        if (config) {
            this.strategyHandler.next(config);
        }
        this.templateObserver.next(potentialObservable);
        return this.renderedValue;
    }
    /** @internal */
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
PushPipe.ɵfac = function PushPipe_Factory(t) { return new (t || PushPipe)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_1__["RxStrategyProvider"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinjectPipeChangeDetectorRef"]()); };
PushPipe.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "push", type: PushPipe, pure: false });


/***/ }),

/***/ "eUZg":
/*!***************************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/directives/if-visible/if-visible.directive.ts ***!
  \***************************************************************************************************/
/*! exports provided: IfVisibleDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IfVisibleDirective", function() { return IfVisibleDirective; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/coercion */ "8LU1");
/* harmony import */ var _cdk__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../cdk */ "a7DI");
/* harmony import */ var _rx_angular_cdk__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @rx-angular/cdk */ "cDIL");
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./model */ "YkIx");
/* harmony import */ var _state_rx_effects__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../state/rx-effects */ "16Wx");











class IfVisibleDirective extends _cdk__WEBPACK_IMPORTED_MODULE_4__["Hooks"] {
    constructor(rxEf, templateRef, strategyProvider, cdRef, eRef, ngZone, viewTemplateRef, viewContainerRef) {
        super();
        this.rxEf = rxEf;
        this.templateRef = templateRef;
        this.strategyProvider = strategyProvider;
        this.cdRef = cdRef;
        this.eRef = eRef;
        this.ngZone = ngZone;
        this.viewTemplateRef = viewTemplateRef;
        this.viewContainerRef = viewContainerRef;
        this.displayed = false;
        this.observer = Object(_cdk__WEBPACK_IMPORTED_MODULE_4__["intersectionObserver"])();
        this.subscription = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subscription"]();
        this.strategyHandler = Object(_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_5__["hotFlatten"])(undefined, Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["mergeAll"])());
    }
    ngOnInit() {
        this.templateManager = Object(_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_5__["createTemplateManager"])({
            templateSettings: {
                viewContainerRef: this.viewContainerRef,
                createViewContext,
                updateViewContext,
                customContext: (rxIf) => ({ rxIf }),
                patchZone: this.patchZone ? this.ngZone : false,
            },
            renderSettings: {
                cdRef: this.cdRef,
                eRef: this.eRef,
                parent: Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__["coerceBooleanProperty"])(this.renderParent),
                patchZone: this.patchZone ? this.ngZone : false,
                defaultStrategyName: this.strategyProvider.primaryStrategy,
                strategies: this.strategyProvider.strategies,
            },
            notificationToTemplateName: {
                [_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_5__["RxNotificationKind"].suspense]: () => _model__WEBPACK_IMPORTED_MODULE_6__["RxIfVisibleTemplateNames"].suspense,
                [_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_5__["RxNotificationKind"].next]: () => _model__WEBPACK_IMPORTED_MODULE_6__["RxIfVisibleTemplateNames"].view,
                [_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_5__["RxNotificationKind"].error]: () => _model__WEBPACK_IMPORTED_MODULE_6__["RxIfVisibleTemplateNames"].error,
                [_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_5__["RxNotificationKind"].complete]: () => _model__WEBPACK_IMPORTED_MODULE_6__["RxIfVisibleTemplateNames"].complete,
            },
        });
        this.templateManager.addTemplateRef(_model__WEBPACK_IMPORTED_MODULE_6__["RxIfVisibleTemplateNames"].view, this.viewTemplateRef);
        this.templateManager.nextStrategy(this.strategyHandler.values$);
        this.subscription.add(this.templateManager
            .render(this.observer.entries$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["filter"])((entry) => entry.isIntersecting && !this.displayed), this.rxEf.untilDestroy()))
            .subscribe(() => {
            this.displayed = true;
            this.observer.unobserve(this.eRef.nativeElement.parentElement);
        }));
        this.onAfterViewInit$.subscribe(() => {
            this.observer.observe(this.eRef.nativeElement.parentElement);
        });
    }
}
IfVisibleDirective.ɵfac = function IfVisibleDirective_Factory(t) { return new (t || IfVisibleDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_state_rx_effects__WEBPACK_IMPORTED_MODULE_7__["RxEffects"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["TemplateRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_5__["RxStrategyProvider"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgZone"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["TemplateRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewContainerRef"])); };
IfVisibleDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineDirective"]({ type: IfVisibleDirective, selectors: [["", "ifVisible", ""]], inputs: { renderParent: ["rxIfParent", "renderParent"], patchZone: ["rxIfPatchZone", "patchZone"] }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵProvidersFeature"]([_state_rx_effects__WEBPACK_IMPORTED_MODULE_7__["RxEffects"]]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵInheritDefinitionFeature"]] });
function createViewContext(value) {
    return {
        rxIfVisible: value,
        $implicit: value,
        $error: false,
        $complete: false,
        $suspense: false,
    };
}
function updateViewContext(value, view, context) {
    Object.keys(context).forEach((k) => {
        view.context[k] = context[k];
    });
}


/***/ }),

/***/ "eYr4":
/*!*****************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/pipes/push/push.pipe.ts ***!
  \*****************************************************************************/
/*! exports provided: PushPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PushPipe", function() { return PushPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _rx_angular_cdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @rx-angular/cdk */ "cDIL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _cdk_render_aware_render_aware__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../cdk/render-aware/render-aware */ "Eaco");







class PushPipe {
    constructor(cdRef, strategyProvider) {
        this.cdRef = cdRef;
        this.renderCallbackSubscription = rxjs__WEBPACK_IMPORTED_MODULE_2__["Subscription"].EMPTY;
        this.templateObserver = {
            suspense: () => (this.renderedValue = undefined),
            next: (value) => {
                this.renderedValue = value;
            },
        };
        this.renderAware = Object(_cdk_render_aware_render_aware__WEBPACK_IMPORTED_MODULE_4__["createRenderAware"])({
            strategies: strategyProvider.strategies,
            defaultStrategyName: strategyProvider.primaryStrategy,
            templateObserver: this.templateObserver,
            getContext: () => this.cdRef.context,
            getCdRef: () => this.cdRef,
        });
        this.renderAware.subscribe();
    }
    transform(potentialObservable, strategyName, renderCallback) {
        this.renderAware.nextStrategy(strategyName);
        this.renderAware.nextPotentialObservable(potentialObservable);
        this.subscribeRenderCallback(renderCallback);
        return this.renderedValue;
    }
    ngOnDestroy() {
        var _a;
        this.renderCallbackSubscription.unsubscribe();
        (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
    subscribeRenderCallback(renderCallback) {
        if (renderCallback) {
            this.renderCallbackSubscription.unsubscribe();
            this.renderCallbackSubscription = this.renderAware.rendered$
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(({ value }) => value))
                .subscribe(renderCallback);
        }
    }
    ngOnInit() {
        this.subscription = this.renderAware.rendered$.subscribe();
    }
}
PushPipe.ɵfac = function PushPipe_Factory(t) { return new (t || PushPipe)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinjectPipeChangeDetectorRef"](), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_1__["RxStrategyProvider"])); };
PushPipe.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "push", type: PushPipe, pure: false });


/***/ }),

/***/ "eaOR":
/*!***********************************************************!*\
  !*** ./apps/demos/src/app/app-component/app.component.ts ***!
  \***********************************************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _app_presenter_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-presenter.service */ "lo2A");
/* harmony import */ var _app_menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.menu */ "++yt");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_shell_app_shell_component_app_shell_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../app-shell/app-shell-component/app-shell.component */ "dp3i");
/* harmony import */ var _app_shell_side_nav_side_nav_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../app-shell/side-nav/side-nav.component */ "+T49");
/* harmony import */ var _app_shell_app_shell_content_directives__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../app-shell/app-shell-content.directives */ "wM/s");










class AppComponent {
    constructor(vm, router) {
        this.vm = vm;
        this.menuItems = _app_menu__WEBPACK_IMPORTED_MODULE_1__["MENU_ITEMS"];
        performance.mark('startRouting');
        router.events.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])(e => e instanceof _angular_router__WEBPACK_IMPORTED_MODULE_2__["NavigationEnd"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(() => console.log('endRouting')), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(() => performance.mark('endRouting')), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1)).subscribe();
    }
    ngAfterViewInit() {
        if (window.performance) {
            const performance = window.performance.toJSON();
            console.log(performance);
            const result = {};
            Object.entries(performance.timing).map(([name, startTime]) => {
                result[name] = startTime;
            });
            for (const [key, val] of Object.entries(result)) {
                console.log(`${key}: ${Math.round(val)}ms`);
            }
            console.log('domContentLoadedEventEnd :' + `${Math.round(performance.timing.domContentLoadedEventEnd) - Math.round(performance.timeOrigin)}ms`);
            console.log('domComplete :' + `${Math.round(performance.timing.domComplete) - Math.round(performance.timeOrigin)}ms`);
            console.log('loadEventEnd :' + `${Math.round(performance.timing.loadEventEnd) - Math.round(performance.timeOrigin)}ms`);
        }
        else {
            console.log('Performance timing isn\'t supported.');
        }
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_app_presenter_service__WEBPACK_IMPORTED_MODULE_0__["AppPresenter"]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["rxa-root"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵProvidersFeature"]([_app_presenter_service__WEBPACK_IMPORTED_MODULE_0__["AppPresenter"]])], decls: 7, vars: 1, consts: [[3, "navItems"], ["rxaAppShellSidenavTitle", ""], ["routerLink", "/", 2, "color", "inherit", "text-decoration", "none"], ["rxaAppShellHeaderContent", ""]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "rxa-app-shell");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "rxa-side-nav", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](2, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "a", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, "RxAngular Demos");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainer"](5, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](6, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("navItems", ctx.menuItems);
    } }, directives: [_app_shell_app_shell_component_app_shell_component__WEBPACK_IMPORTED_MODULE_5__["AppShellComponent"], _app_shell_side_nav_side_nav_component__WEBPACK_IMPORTED_MODULE_6__["AppShellSideNavComponent"], _app_shell_app_shell_content_directives__WEBPACK_IMPORTED_MODULE_7__["AppShellSidenavTitle"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"], _app_shell_app_shell_content_directives__WEBPACK_IMPORTED_MODULE_7__["AppShellHeaderContent"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterOutlet"]], styles: [".container[_ngcontent-%COMP%] {\n  padding: 0 15px;\n}\n\n.sidenav-container[_ngcontent-%COMP%] {\n  height: 100%;\n}\n\n.sidenav[_ngcontent-%COMP%] {\n  width: 250px;\n}\n\n.sidenav[_ngcontent-%COMP%]   .mat-toolbar[_ngcontent-%COMP%] {\n  background: inherit;\n}\n\n.mat-toolbar.mat-primary[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  z-index: 1;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2FwcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGVBQUE7QUFDRjs7QUFDQTtFQUNFLFlBQUE7QUFFRjs7QUFDQTtFQUNFLFlBQUE7QUFFRjs7QUFDQTtFQUNFLG1CQUFBO0FBRUY7O0FBQ0E7RUFDRSxnQkFBQTtFQUNBLE1BQUE7RUFDQSxVQUFBO0FBRUYiLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbnRhaW5lciB7XG4gIHBhZGRpbmc6IDAgMTVweDtcbn1cbi5zaWRlbmF2LWNvbnRhaW5lciB7XG4gIGhlaWdodDogMTAwJTtcbn1cblxuLnNpZGVuYXYge1xuICB3aWR0aDogMjUwcHg7XG59XG5cbi5zaWRlbmF2IC5tYXQtdG9vbGJhciB7XG4gIGJhY2tncm91bmQ6IGluaGVyaXQ7XG59XG5cbi5tYXQtdG9vbGJhci5tYXQtcHJpbWFyeSB7XG4gIHBvc2l0aW9uOiBzdGlja3k7XG4gIHRvcDogMDtcbiAgei1pbmRleDogMTtcbn1cbiJdfQ== */"] });


/***/ }),

/***/ "eakK":
/*!*************************************************************************!*\
  !*** ./apps/demos/src/app/shared/debug-helper/strategy-select/index.ts ***!
  \*************************************************************************/
/*! exports provided: StrategySelectModule, StrategySelectComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _strategy_select_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./strategy-select.module */ "9oZ2");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StrategySelectModule", function() { return _strategy_select_module__WEBPACK_IMPORTED_MODULE_0__["StrategySelectModule"]; });

/* harmony import */ var _strategy_select_strategy_select_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./strategy-select/strategy-select.component */ "zFhl");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StrategySelectComponent", function() { return _strategy_select_strategy_select_component__WEBPACK_IMPORTED_MODULE_1__["StrategySelectComponent"]; });





/***/ }),

/***/ "efNJ":
/*!***************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/hooks/model.ts ***!
  \***************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "enTY":
/*!*******************************************************************!*\
  !*** ./libs/cdk/src/lib/template-management/list-view-handler.ts ***!
  \*******************************************************************/
/*! exports provided: getTemplateHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTemplateHandler", function() { return getTemplateHandler; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "F2kK");

/**
 * @internal
 *
 * Factory that returns a `ListTemplateManager` for the passed params.
 *
 * @param templateSettings
 */
function getTemplateHandler(templateSettings) {
    const { viewContainerRef, initialTemplateRef, createViewContext, updateViewContext, patchZone, } = templateSettings;
    const workFactory = patchZone
        ? (work) => patchZone.run(work)
        : (work) => work();
    return {
        updateUnchangedContext,
        insertView,
        moveView,
        removeView,
        getListChanges,
        updateView,
    };
    // =====
    function updateUnchangedContext(index, count) {
        const view = viewContainerRef.get(index);
        workFactory(() => {
            view.context.updateContext({
                count,
                index,
            });
            view.detectChanges();
        });
    }
    function moveView(oldIndex, item, index, count) {
        const oldView = viewContainerRef.get(oldIndex);
        const view = viewContainerRef.move(oldView, index);
        workFactory(() => {
            updateViewContext(item, view, {
                count,
                index,
            });
            view.detectChanges();
        });
    }
    function updateView(item, index, count) {
        const view = viewContainerRef.get(index);
        workFactory(() => {
            updateViewContext(item, view, {
                count,
                index,
            });
            view.detectChanges();
        });
    }
    function removeView(index) {
        return workFactory(() => viewContainerRef.remove(index));
    }
    function insertView(item, index, count) {
        workFactory(() => {
            Object(_utils__WEBPACK_IMPORTED_MODULE_0__["createEmbeddedView"])(viewContainerRef, initialTemplateRef, createViewContext(item, {
                count,
                index,
            }), index);
        });
    }
}
/**
 * @internal
 *
 * @param changes
 * @param items
 */
function getListChanges(changes, items) {
    const changedIdxs = new Set();
    const changesArr = [];
    let notifyParent = false;
    changes.forEachOperation((record, adjustedPreviousIndex, currentIndex) => {
        const item = record.item;
        if (record.previousIndex == null) {
            // insert
            changesArr.push(getInsertChange(item, currentIndex));
            changedIdxs.add(item);
            notifyParent = true;
        }
        else if (currentIndex == null) {
            // remove
            changesArr.push(getRemoveChange(item, adjustedPreviousIndex));
            changedIdxs.add(item);
            notifyParent = true;
        }
        else if (adjustedPreviousIndex !== null) {
            // move
            changesArr.push(getMoveChange(item, currentIndex, adjustedPreviousIndex));
            changedIdxs.add(item);
            notifyParent = true;
        }
    });
    changes.forEachIdentityChange((record) => {
        const item = record.item;
        changesArr.push(getUpdateChange(item, record.currentIndex));
        changedIdxs.add(item);
    });
    items.forEach((item, index) => {
        if (!changedIdxs.has(item)) {
            changesArr.push(getUnchangedChange(item, index));
        }
    });
    return [changesArr, notifyParent];
    // ==========
    function getMoveChange(item, currentIndex, adjustedPreviousIndex) {
        return [
            2 /* move */,
            [item, currentIndex, adjustedPreviousIndex],
        ];
    }
    function getUpdateChange(item, currentIndex) {
        return [3 /* update */, [item, currentIndex]];
    }
    function getUnchangedChange(item, index) {
        return [4 /* context */, [item, index]];
    }
    function getInsertChange(item, currentIndex) {
        return [
            0 /* insert */,
            [item, currentIndex === null ? undefined : currentIndex],
        ];
    }
    function getRemoveChange(item, adjustedPreviousIndex) {
        return [
            1 /* remove */,
            adjustedPreviousIndex === null ? undefined : adjustedPreviousIndex,
        ];
    }
}


/***/ }),

/***/ "ep1A":
/*!*************************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/zone-agnostic/rxjs/schedulers/Scheduler.ts ***!
  \*************************************************************************************************/
/*! exports provided: Scheduler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Scheduler", function() { return Scheduler; });
/**
 * An execution context and a data structure to order tasks and schedule their
 * execution. Provides a notion of (potentially virtual) time, through the
 * `now()` getter method.
 *
 * Each unit of work in a Scheduler is called an `Action`.
 *
 * ```ts
 * class Scheduler {
 *   now(): number;
 *   schedule(work, delay?, state?): Subscription;
 * }
 * ```
 *
 * @class Scheduler
 * @deprecated Scheduler is an internal implementation detail of RxJS, and
 * should not be used directly. Rather, create your own class and implement
 * {@link SchedulerLike}
 */
class Scheduler {
    constructor(SchedulerAction, now = Scheduler.now) {
        this.SchedulerAction = SchedulerAction;
        this.now = now;
    }
    /**
     * Schedules a function, `work`, for execution. May happen at some point in
     * the future, according to the `delay` parameter, if specified. May be passed
     * some context object, `state`, which will be passed to the `work` function.
     *
     * The given arguments will be processed an stored as an Action object in a
     * queue of actions.
     *
     * @param {function(state: ?T): ?Subscription} work A function representing a
     * task, or some unit of work to be executed by the Scheduler.
     * @param {number} [delay] Time to wait before executing the work, where the
     * time unit is implicit and defined by the Scheduler itself.
     * @param {T} [state] Some contextual data that the `work` function uses when
     * called by the Scheduler.
     * @return {Subscription} A subscription in order to be able to unsubscribe
     * the scheduled work.
     */
    schedule(work, delay = 0, state) {
        return new this.SchedulerAction(this, work).schedule(state, delay);
    }
}
/**
 * Note: the extra arrow function wrapper is to make testing by overriding
 * Date.now easier.
 * @nocollapse
 */
Scheduler.now = () => Date.now();


/***/ }),

/***/ "fVh8":
/*!*********************************************************************!*\
  !*** ./libs/state/src/lib/transformation-helpers/object/setProp.ts ***!
  \*********************************************************************/
/*! exports provided: setProp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setProp", function() { return setProp; });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core */ "jym9");

/**
 * @description
 * Accepts an object of type T, key of type K extends keyof T, and value of type T[K].
 * Sets the property and returns a newly updated shallow copy of an object while not mutating the original one.
 *
 * @example
 *
 * const cat = {id: 1, type: 'cat', name: 'Fluffy'};
 *
 * const renamedCat = setProp(cat, 'name', 'Bella');
 *
 * // renamedCat will be:
 * // {id: 1, type: 'cat', name: 'Bella'};
 *
 * @example
 * // Usage with RxState
 *
 * export class ProfileComponent {
 *
 *    readonly changeName$ = new Subject<string>();
 *
 *    constructor(private state: RxState<ComponentState>) {
 *      // Reactive implementation
 *      state.connect(
 *        this.changeName$,
 *        (state, name) => {
 *            return setProp(state, 'name', name);
 *        }
 *      );
 *    }
 *
 *    // Imperative implementation
 *    changeName(name: string): void {
 *        this.state.set(setProp(this.get(), 'name', name));
 *    }
 * }
 *
 * @returns T
 *
 * @docsPage setProp
 * @docsCategory transformation-helpers
 */
function setProp(object, key, value) {
    const objectIsObject = Object(_core__WEBPACK_IMPORTED_MODULE_0__["isObjectGuard"])(object);
    const keyIsValid = Object(_core__WEBPACK_IMPORTED_MODULE_0__["isKeyOf"])(key);
    const initialObject = objectIsObject ? object : {};
    if (!objectIsObject) {
        console.warn(`SetProp: original value (${object}) is not an object.`);
    }
    if (!keyIsValid) {
        console.warn(`SetProp: key argument (${key}) is invalid.`);
    }
    if (!Object(_core__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(object) && !keyIsValid) {
        return object;
    }
    if (keyIsValid) {
        return Object.assign(Object.assign({}, initialObject), { [key]: value });
    }
    return Object.assign({}, initialObject);
}


/***/ }),

/***/ "g5uj":
/*!***************************************************************************************!*\
  !*** ./apps/demos/src/app/features/performance/alphas-compare/alphas-compare.menu.ts ***!
  \***************************************************************************************/
/*! exports provided: ALPHAS_COMPARE_MENU_ITEMS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALPHAS_COMPARE_MENU_ITEMS", function() { return ALPHAS_COMPARE_MENU_ITEMS; });
const ALPHAS_COMPARE_MENU_ITEMS = [
    {
        link: 'alphas-compare',
        label: 'Alpha 0 vs Alpha 1',
        children: [
            {
                link: 'list-toggle',
                label: 'List toggle',
            },
        ],
    },
];


/***/ }),

/***/ "he3/":
/*!***********************************************************************!*\
  !*** ./apps/demos/src/app/features/tutorials/tutorials-shell.menu.ts ***!
  \***********************************************************************/
/*! exports provided: TUTORIALS_MENU */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TUTORIALS_MENU", function() { return TUTORIALS_MENU; });
/* harmony import */ var _basics_tutorial_basics_menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./basics/tutorial-basics.menu */ "ZGLQ");

const TUTORIALS_MENU = [
    {
        label: 'Basics',
        link: 'basics',
        children: _basics_tutorial_basics_menu__WEBPACK_IMPORTED_MODULE_0__["TUTORIAL_BASICS_MENU"],
    }
];


/***/ }),

/***/ "hlBG":
/*!***************************************************************************!*\
  !*** ./apps/demos/src/app/features/experiments/experiments-shell.menu.ts ***!
  \***************************************************************************/
/*! exports provided: EXPERIMENTS_MENU */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EXPERIMENTS_MENU", function() { return EXPERIMENTS_MENU; });
/* harmony import */ var _decorators_decorators_menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./decorators/decorators.menu */ "v5z+");
/* harmony import */ var _state_rx_state_menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state/rx-state.menu */ "1Eag");
/* harmony import */ var _structural_directives_structural_directives_menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./structural-directives/structural-directives.menu */ "iw6y");
/* harmony import */ var _strategies_strategies_menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./strategies/strategies.menu */ "d5lX");
/* harmony import */ var _input_bindings_input_bindings_menu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./input-bindings/input-bindings.menu */ "rh42");





const EXPERIMENTS_MENU = [
    {
        label: 'Strategies',
        link: 'strategies',
        children: _strategies_strategies_menu__WEBPACK_IMPORTED_MODULE_3__["MENU_ITEMS"],
    },
    {
        link: 'structural-directives',
        label: 'Structural Directives',
        children: _structural_directives_structural_directives_menu__WEBPACK_IMPORTED_MODULE_2__["MENU_ITEMS"],
    },
    ..._state_rx_state_menu__WEBPACK_IMPORTED_MODULE_1__["MENU_ITEMS"],
    ..._input_bindings_input_bindings_menu__WEBPACK_IMPORTED_MODULE_4__["MENU_ITEMS"],
    {
        link: 'decorators',
        label: 'decorators',
        children: _decorators_decorators_menu__WEBPACK_IMPORTED_MODULE_0__["DECORATORS_MENU_ITEMS"],
    },
];


/***/ }),

/***/ "hsT0":
/*!**********************************************************************************************!*\
  !*** ./libs/template/src/lib/experimental/unpatch/events/unpatch-event-list.experimental.ts ***!
  \**********************************************************************************************/
/*! exports provided: zonePatchedEvents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zonePatchedEvents", function() { return zonePatchedEvents; });
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


/***/ }),

/***/ "i/je":
/*!*****************************************************************************!*\
  !*** ./libs/cdk/src/lib/render-strategies/scheduler/schedulerPriorities.ts ***!
  \*****************************************************************************/
/*! exports provided: NoPriority, ImmediatePriority, UserBlockingPriority, NormalPriority, LowPriority, IdlePriority */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoPriority", function() { return NoPriority; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImmediatePriority", function() { return ImmediatePriority; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserBlockingPriority", function() { return UserBlockingPriority; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NormalPriority", function() { return NormalPriority; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LowPriority", function() { return LowPriority; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IdlePriority", function() { return IdlePriority; });
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
// TODO: Use symbols?
const NoPriority = 0;
const ImmediatePriority = 1;
const UserBlockingPriority = 2;
const NormalPriority = 3;
const LowPriority = 4;
const IdlePriority = 5;


/***/ }),

/***/ "i0la":
/*!**********************************************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/zone-agnostic/rxjs/schedulers/animation-frame/animationFrame.ts ***!
  \**********************************************************************************************************************/
/*! exports provided: animationFrameScheduler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "animationFrameScheduler", function() { return animationFrameScheduler; });
/* harmony import */ var _AnimationFrameAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AnimationFrameAction */ "mymj");
/* harmony import */ var _AnimationFrameScheduler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AnimationFrameScheduler */ "+N1c");
// tslint:disable file-name-casing


/**
 *
 * NOTE: This is a zone un-patched version of rxjs animationFrameScheduler
 *
 * Animation Frame Scheduler
 *
 * <span class="informal">Perform task when `window.requestAnimationFrame` would fire</span>
 *
 * When `animationFrame` scheduler is used with delay, it will fall back to {@link asyncScheduler} scheduler
 * behaviour.
 *
 * Without delay, `animationFrame` scheduler can be used to create smooth browser animations.
 * It makes sure scheduled task will happen just before next browser content repaint,
 * thus performing animations as efficiently as possible.
 *
 * ## Example
 * Schedule div height animation
 * ```ts
 * // html: <div style="background: #0ff;"></div>
 * import { animationFrameScheduler } from '@cu/perf-utils';
 *
 * const div = document.querySelector('div');
 *
 * animationFrameScheduler.schedule(function(height) {
 *   div.style.height = height + "px";
 *
 *   this.schedule(height + 1);  // `this` references currently executing Action,
 *                               // which we reschedule with new state
 * }, 0, 0);
 *
 * // You will see a div element growing in height
 * ```
 */
const animationFrameScheduler = new _AnimationFrameScheduler__WEBPACK_IMPORTED_MODULE_1__["AnimationFrameScheduler"](_AnimationFrameAction__WEBPACK_IMPORTED_MODULE_0__["AnimationFrameAction"]);


/***/ }),

/***/ "iUIh":
/*!********************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/rxjs/index.ts ***!
  \********************************************************************/
/*! exports provided: stateful, select, distinctUntilSomeChanged, selectSlice, ngInputFlatten, rxMaterialize, coalesceWith, observableToRxTemplateName, createAccumulationObservable, createSideEffectObservable, intersectionObserver, animationFrameTick, idleCallbackTick, timeoutTick, intervalTick, promiseTick, isSubscription, RxNotificationKind, notificationToRxNotification, toRxErrorNotification, toRxSuspenseNotification, toRxCompleteNotification, notificationKindToRxNotificationKind */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./operators */ "QcBo");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stateful", function() { return _operators__WEBPACK_IMPORTED_MODULE_0__["stateful"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "select", function() { return _operators__WEBPACK_IMPORTED_MODULE_0__["select"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "distinctUntilSomeChanged", function() { return _operators__WEBPACK_IMPORTED_MODULE_0__["distinctUntilSomeChanged"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "selectSlice", function() { return _operators__WEBPACK_IMPORTED_MODULE_0__["selectSlice"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ngInputFlatten", function() { return _operators__WEBPACK_IMPORTED_MODULE_0__["ngInputFlatten"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rxMaterialize", function() { return _operators__WEBPACK_IMPORTED_MODULE_0__["rxMaterialize"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "coalesceWith", function() { return _operators__WEBPACK_IMPORTED_MODULE_0__["coalesceWith"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "observableToRxTemplateName", function() { return _operators__WEBPACK_IMPORTED_MODULE_0__["observableToRxTemplateName"]; });

/* harmony import */ var _observable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./observable */ "CQ8T");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createAccumulationObservable", function() { return _observable__WEBPACK_IMPORTED_MODULE_1__["createAccumulationObservable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createSideEffectObservable", function() { return _observable__WEBPACK_IMPORTED_MODULE_1__["createSideEffectObservable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "intersectionObserver", function() { return _observable__WEBPACK_IMPORTED_MODULE_1__["intersectionObserver"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "animationFrameTick", function() { return _observable__WEBPACK_IMPORTED_MODULE_1__["animationFrameTick"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "idleCallbackTick", function() { return _observable__WEBPACK_IMPORTED_MODULE_1__["idleCallbackTick"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timeoutTick", function() { return _observable__WEBPACK_IMPORTED_MODULE_1__["timeoutTick"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "intervalTick", function() { return _observable__WEBPACK_IMPORTED_MODULE_1__["intervalTick"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "promiseTick", function() { return _observable__WEBPACK_IMPORTED_MODULE_1__["promiseTick"]; });

/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ "ETSG");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isSubscription", function() { return _util__WEBPACK_IMPORTED_MODULE_2__["isSubscription"]; });

/* harmony import */ var _Notification__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Notification */ "YR/O");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxNotificationKind", function() { return _Notification__WEBPACK_IMPORTED_MODULE_3__["RxNotificationKind"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "notificationToRxNotification", function() { return _Notification__WEBPACK_IMPORTED_MODULE_3__["notificationToRxNotification"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toRxErrorNotification", function() { return _Notification__WEBPACK_IMPORTED_MODULE_3__["toRxErrorNotification"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toRxSuspenseNotification", function() { return _Notification__WEBPACK_IMPORTED_MODULE_3__["toRxSuspenseNotification"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toRxCompleteNotification", function() { return _Notification__WEBPACK_IMPORTED_MODULE_3__["toRxCompleteNotification"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "notificationKindToRxNotificationKind", function() { return _Notification__WEBPACK_IMPORTED_MODULE_3__["notificationKindToRxNotificationKind"]; });







/***/ }),

/***/ "iki6":
/*!*********************************************!*\
  !*** ./libs/template/src/lib/core/index.ts ***!
  \*********************************************/
/*! exports provided: createRenderAware, renderWithLatestStrategy, notificationKindToRxNotificationKind, rxMaterialize, getGlobalThis, createPropertiesWeakMap, getUnpatchedResolvedPromise, getZoneUnPatchedApi, isEnvZonePatched, isApiZonePatched, isNgZone, isNoopNgZone, coalescingManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _render_aware__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render-aware */ "Bq4D");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createRenderAware", function() { return _render_aware__WEBPACK_IMPORTED_MODULE_0__["createRenderAware"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "renderWithLatestStrategy", function() { return _render_aware__WEBPACK_IMPORTED_MODULE_0__["renderWithLatestStrategy"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "notificationKindToRxNotificationKind", function() { return _render_aware__WEBPACK_IMPORTED_MODULE_0__["notificationKindToRxNotificationKind"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rxMaterialize", function() { return _render_aware__WEBPACK_IMPORTED_MODULE_0__["rxMaterialize"]; });

/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "Wzuy");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getGlobalThis", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["getGlobalThis"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createPropertiesWeakMap", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["createPropertiesWeakMap"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getUnpatchedResolvedPromise", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["getUnpatchedResolvedPromise"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getZoneUnPatchedApi", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["getZoneUnPatchedApi"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isEnvZonePatched", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["isEnvZonePatched"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isApiZonePatched", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["isApiZonePatched"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isNgZone", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["isNgZone"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isNoopNgZone", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["isNoopNgZone"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "coalescingManager", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["coalescingManager"]; });





/***/ }),

/***/ "ioAo":
/*!****************************************!*\
  !*** ./libs/cdk/src/lib/cdk-config.ts ***!
  \****************************************/
/*! exports provided: RX_ANGULAR_CONFIG, RX_ANGULAR_DEFAULTS, mergeDefaultConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RX_ANGULAR_CONFIG", function() { return RX_ANGULAR_CONFIG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RX_ANGULAR_DEFAULTS", function() { return RX_ANGULAR_DEFAULTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeDefaultConfig", function() { return mergeDefaultConfig; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _render_strategies_concurrent_strategies__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render-strategies/concurrent-strategies */ "K5y6");
/* harmony import */ var _render_strategies_native_strategies__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render-strategies/native-strategies */ "NsWS");



const RX_ANGULAR_CONFIG = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('rx-angular-config');
const RX_ANGULAR_DEFAULTS = {
    primaryStrategy: 'normal',
    customStrategies: Object.assign(Object.assign(Object.assign({}, _render_strategies_native_strategies__WEBPACK_IMPORTED_MODULE_2__["RX_NATIVE_STRATEGIES"]), { local: _render_strategies_concurrent_strategies__WEBPACK_IMPORTED_MODULE_1__["RX_CONCURRENT_STRATEGIES"].immediate }), _render_strategies_concurrent_strategies__WEBPACK_IMPORTED_MODULE_1__["RX_CONCURRENT_STRATEGIES"]),
    patchZone: true,
};
function mergeDefaultConfig(cfg) {
    const custom = cfg
        ? cfg
        : {
            customStrategies: {},
        };
    return Object.assign(Object.assign(Object.assign({}, RX_ANGULAR_DEFAULTS), custom), { customStrategies: Object.assign(Object.assign({}, custom.customStrategies), RX_ANGULAR_DEFAULTS.customStrategies) });
}


/***/ }),

/***/ "ioEk":
/*!*******************************************************************************************!*\
  !*** ./libs/cdk/src/lib/zone-less/rxjs/scheduler/animation-frame/AnimationFrameAction.ts ***!
  \*******************************************************************************************/
/*! exports provided: AnimationFrameAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnimationFrameAction", function() { return AnimationFrameAction; });
/* harmony import */ var _async_AsyncAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../async/AsyncAction */ "ErOQ");
/* harmony import */ var _browser_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../browser/browser */ "rxQk");
// tslint:disable


/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class AnimationFrameAction extends _async_AsyncAction__WEBPACK_IMPORTED_MODULE_0__["AsyncAction"] {
    constructor(scheduler, work) {
        super(scheduler, work);
        this.scheduler = scheduler;
        this.work = work;
    }
    requestAsyncId(scheduler, id, delay = 0) {
        // If delay is greater than 0, request as an async action.
        if (delay !== null && delay > 0) {
            return super.requestAsyncId(scheduler, id, delay);
        }
        // Push the action to the end of the scheduler queue.
        // @ts-ignore
        scheduler.actions.push(this);
        // If an animation frame has already been requested, don't request another
        // one. If an animation frame hasn't been requested yet, request one. Return
        // the current animation frame request id.
        return (scheduler.scheduled ||
            (scheduler.scheduled = Object(_browser_browser__WEBPACK_IMPORTED_MODULE_1__["requestAnimationFrame"])(() => scheduler.flush(undefined))));
    }
    recycleAsyncId(scheduler, id, delay = 0) {
        // If delay exists and is greater than 0, or if the delay is null (the
        // action wasn't rescheduled) but was originally scheduled as an async
        // action, then recycle as an async action.
        if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
            return super.recycleAsyncId(scheduler, id, delay);
        }
        // If the scheduler queue is empty, cancel the requested animation frame and
        // set the scheduled flag to undefined so the next AnimationFrameAction will
        // request its own.
        if (scheduler.actions.length === 0) {
            Object(_browser_browser__WEBPACK_IMPORTED_MODULE_1__["cancelAnimationFrame"])(id);
            scheduler.scheduled = undefined;
        }
        // Return undefined so the action knows to request a new async id if it's rescheduled.
        return undefined;
    }
}


/***/ }),

/***/ "iuAr":
/*!*********************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/components/context/index.ts ***!
  \*********************************************************************************/
/*! exports provided: RxContextTemplateNames, RxContext, RxContextContainer, RxContextModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model */ "s7gA");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxContextTemplateNames", function() { return _model__WEBPACK_IMPORTED_MODULE_0__["RxContextTemplateNames"]; });

/* harmony import */ var _rx_context_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rx-context.directive */ "U97y");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxContext", function() { return _rx_context_directive__WEBPACK_IMPORTED_MODULE_1__["RxContext"]; });

/* harmony import */ var _rx_context_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rx-context.component */ "6epE");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxContextContainer", function() { return _rx_context_component__WEBPACK_IMPORTED_MODULE_2__["RxContextContainer"]; });

/* harmony import */ var _context_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./context.module */ "RWYI");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxContextModule", function() { return _context_module__WEBPACK_IMPORTED_MODULE_3__["RxContextModule"]; });







/***/ }),

/***/ "iw6y":
/*!*****************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/experiments/structural-directives/structural-directives.menu.ts ***!
  \*****************************************************************************************************/
/*! exports provided: MENU_ITEMS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MENU_ITEMS", function() { return MENU_ITEMS; });
const MENU_ITEMS = [
    {
        link: 'rx-let-poc',
        label: 'RxLet',
    },
    {
        link: 'rx-let-poc/rx-query-children',
        label: 'RxLet ViewChildren',
    },
    {
        link: 'rx-switch-poc',
        label: 'RxSwitch',
    },
    {
        link: 'if-visible',
        label: 'ifVisible POC',
    }
];


/***/ }),

/***/ "j+MV":
/*!********************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/state/rx-effects/effects.service.ts ***!
  \********************************************************************************/
/*! exports provided: RxEffects */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RxEffects", function() { return RxEffects; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _until_destroy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./until-destroy */ "5BDn");
/* harmony import */ var _cdk_hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../cdk/hooks */ "W0l3");






/**
 * Reduces subscription boilerplate for performing observable-based side-effects in components.
 *
 * Before:
 * ```ts
 * @Component({
 *   // ...
 * })
 * export class FooComponent implements OnDestroy {
 *   private readonly destroy$ = new Subject<void>();
 *
 *   constructor() {
 *     obs$.pipe(takeUntil(this.destroy$)).subscribe(doSideEffect);
 *   }
 *
 *   ngOnDestroy(): void {
 *     this.destroy$.next();
 *     this.destroy$.complete();
 *   }
 * }
 * ```
 *
 * After:
 * ```ts
 * @Component({
 *   // ...
 *   providers: [RxEffects],
 * })
 * export class FooComponent {
 *   constructor(effects: RxEffects) {
 *     effects.register(obs$, doSideEffect);
 *     // OR
 *     effects.register(obs$.pipe(tap(doSideEffect)));
 *     // OR
 *     effects.register(obs$.subscribe(doSideEffect));
 *   }
 * }
 * ```
 *
 * NOTE: Avoid calling register/unregister/subscribe inside the side-effect function.
 */
class RxEffects {
    constructor(errorHandler) {
        this.errorHandler = errorHandler;
        this.destroyers = {};
        this._hooks$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.observables$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.effects$ = this.observables$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["mergeAll"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["share"])());
        this.onDestroy$ = this._hooks$.pipe(Object(_cdk_hooks__WEBPACK_IMPORTED_MODULE_4__["toHook"])('destroy'));
        this.subscription = this.effects$.subscribe();
    }
    register(obsOrSub, fnOrObj) {
        if (obsOrSub instanceof rxjs__WEBPACK_IMPORTED_MODULE_1__["Subscription"]) {
            this.subscription.add(obsOrSub);
            return;
        }
        const effectId = RxEffects.nextId++;
        const destroy$ = (this.destroyers[effectId] = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]());
        const applyBehavior = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["pipe"])(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["mapTo"])(effectId), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["takeUntil"])(destroy$));
        if (fnOrObj != null) {
            this.observables$.next(Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["from"])(obsOrSub).pipe(
            // ternary expression is to help Typescript infer overloads
            typeof fnOrObj === 'function' ? Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(fnOrObj) : Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(fnOrObj), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])((err) => {
                var _a;
                (_a = this.errorHandler) === null || _a === void 0 ? void 0 : _a.handleError(err);
                return rxjs__WEBPACK_IMPORTED_MODULE_1__["EMPTY"];
            }), applyBehavior));
        }
        else {
            this.observables$.next(Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["from"])(obsOrSub).pipe(applyBehavior));
        }
        return effectId;
    }
    /**
     * Imperatively cancel a side-effect while the component is still running.
     *
     * Note that all effects are automatically cancelled when a component is destroyed,
     * so you most often won't need to call this method.
     * @param effectId Effect ID (returned by register method)
     */
    unregister(effectId) {
        var _a;
        (_a = this.destroyers[effectId]) === null || _a === void 0 ? void 0 : _a.next();
    }
    /**
     * Fires a sideEffect when the instances `OnDestroy` hook is fired.
     *
     * @example
     * effects.registerOnDestroy(mode => localStorage.setItem('colorMode', mode));
     *
     * @param sideEffect
     */
    registerOnDestroy(sideEffect) {
        return this.register(this.onDestroy$, sideEffect);
    }
    /**
     * Operator that unsubscribes based on emission of an registered effect.
     *
     * @example
     * const effectId1 = effects.register(
     *   colorMode$.subscribe(mode => localStorage.setItem('colorMode', mode))
     * );
     *
     * someValue$.pipe(
     *    effect.untilEffect(effectId1)
     * )
     *
     */
    untilEffect(effectId) {
        return (source) => source.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["takeUntil"])(this.effects$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])((eId) => eId === effectId))));
    }
    /**
     * Operator that unsubscribes based on the `OnDestroy` lifecycle hook of this instance.
     *
     * @NOTICE
     * This operator has to be placed always at the end of the operator chain (before the subscription).
     * Otherwise we may leak as a subsequent operator could instantiate new ongoing Observables which will not get unsubscribed.
     *
     * @example
     * someValue$.pipe(
     *    effect.untilDestroy()
     * )
     *
     */
    untilDestroy() {
        return (source) => source.pipe(Object(_until_destroy__WEBPACK_IMPORTED_MODULE_3__["untilDestroyed"])(this));
    }
    /**
     * @internal
     */
    ngOnDestroy() {
        this._hooks$.next({ destroy: undefined });
        this._hooks$.complete();
        this.subscription.unsubscribe();
    }
}
RxEffects.nextId = 0;
RxEffects.ɵfac = function RxEffects_Factory(t) { return new (t || RxEffects)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ErrorHandler"], 8)); };
RxEffects.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: RxEffects, factory: RxEffects.ɵfac });


/***/ }),

/***/ "j2tN":
/*!*****************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/zone-agnostic/index.ts ***!
  \*****************************************************************************/
/*! exports provided: setTimeout, clearTimeout, setInterval, clearInterval, requestAnimationFrame, cancelAnimationFrame, cancelIdleCallback, requestIdleCallback, Promise, queueMicrotask, interval, fromEvent, asyncScheduler, asapScheduler, queueScheduler, animationFrameScheduler, getZoneUnPatchedApi, isEnvZonePatched, isApiZonePatched, isNgZone, isNoopNgZone, getResolvedPromise */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./browser */ "7zi/");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setTimeout", function() { return _browser__WEBPACK_IMPORTED_MODULE_0__["setTimeout"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "clearTimeout", function() { return _browser__WEBPACK_IMPORTED_MODULE_0__["clearTimeout"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setInterval", function() { return _browser__WEBPACK_IMPORTED_MODULE_0__["setInterval"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "clearInterval", function() { return _browser__WEBPACK_IMPORTED_MODULE_0__["clearInterval"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "requestAnimationFrame", function() { return _browser__WEBPACK_IMPORTED_MODULE_0__["requestAnimationFrame"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cancelAnimationFrame", function() { return _browser__WEBPACK_IMPORTED_MODULE_0__["cancelAnimationFrame"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cancelIdleCallback", function() { return _browser__WEBPACK_IMPORTED_MODULE_0__["cancelIdleCallback"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "requestIdleCallback", function() { return _browser__WEBPACK_IMPORTED_MODULE_0__["requestIdleCallback"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Promise", function() { return _browser__WEBPACK_IMPORTED_MODULE_0__["Promise"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "queueMicrotask", function() { return _browser__WEBPACK_IMPORTED_MODULE_0__["queueMicrotask"]; });

/* harmony import */ var _rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rxjs */ "/kO0");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "interval", function() { return _rxjs__WEBPACK_IMPORTED_MODULE_1__["interval"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fromEvent", function() { return _rxjs__WEBPACK_IMPORTED_MODULE_1__["fromEvent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asyncScheduler", function() { return _rxjs__WEBPACK_IMPORTED_MODULE_1__["asyncScheduler"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asapScheduler", function() { return _rxjs__WEBPACK_IMPORTED_MODULE_1__["asapScheduler"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "queueScheduler", function() { return _rxjs__WEBPACK_IMPORTED_MODULE_1__["queueScheduler"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "animationFrameScheduler", function() { return _rxjs__WEBPACK_IMPORTED_MODULE_1__["animationFrameScheduler"]; });

/* harmony import */ var _zone_checks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./zone-checks */ "V4xg");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getZoneUnPatchedApi", function() { return _zone_checks__WEBPACK_IMPORTED_MODULE_2__["getZoneUnPatchedApi"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isEnvZonePatched", function() { return _zone_checks__WEBPACK_IMPORTED_MODULE_2__["isEnvZonePatched"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isApiZonePatched", function() { return _zone_checks__WEBPACK_IMPORTED_MODULE_2__["isApiZonePatched"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isNgZone", function() { return _zone_checks__WEBPACK_IMPORTED_MODULE_2__["isNgZone"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isNoopNgZone", function() { return _zone_checks__WEBPACK_IMPORTED_MODULE_2__["isNoopNgZone"]; });

/* harmony import */ var _get_resolved_promise__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./get-resolved-promise */ "RrN1");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getResolvedPromise", function() { return _get_resolved_promise__WEBPACK_IMPORTED_MODULE_3__["getResolvedPromise"]; });







/***/ }),

/***/ "jPSe":
/*!*************************************************!*\
  !*** ./libs/state/src/lib/core/utils/guards.ts ***!
  \*************************************************/
/*! exports provided: isPromiseGuard, isOperateFnArrayGuard, isStringArrayGuard, isIterableGuard, isKeyOf, isObjectGuard, isDefined */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPromiseGuard", function() { return isPromiseGuard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isOperateFnArrayGuard", function() { return isOperateFnArrayGuard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isStringArrayGuard", function() { return isStringArrayGuard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isIterableGuard", function() { return isIterableGuard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isKeyOf", function() { return isKeyOf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObjectGuard", function() { return isObjectGuard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDefined", function() { return isDefined; });
function isPromiseGuard(value) {
    return (!!value &&
        typeof value.subscribe !== 'function' &&
        typeof value.then === 'function');
}
function isOperateFnArrayGuard(op) {
    if (!Array.isArray(op)) {
        return false;
    }
    return op.length > 0 && op.every((i) => typeof i === 'function');
}
function isStringArrayGuard(op) {
    if (!Array.isArray(op)) {
        return false;
    }
    return op.length > 0 && op.every((i) => typeof i === 'string');
}
function isIterableGuard(obj) {
    if (obj === null || obj === undefined) {
        return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
}
function isKeyOf(k) {
    return (!!k &&
        (typeof k === 'string' || typeof k === 'symbol' || typeof k === 'number'));
}
function isObjectGuard(obj) {
    return !!obj && typeof obj === 'object' && !Array.isArray(obj);
}
function isDefined(val) {
    return val !== null && val !== undefined;
}


/***/ }),

/***/ "jmDS":
/*!**********************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/rxjs/util/isSubscription.ts ***!
  \**********************************************************************************/
/*! exports provided: isSubscription */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSubscription", function() { return isSubscription; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/**
 * Tests to see if the object is an RxJS {@link Observable}
 * @param obj the object to test
 */

function isSubscription(obj) {
    // The !! is to ensure that this publicly exposed function returns
    // `false` if something like `null` or `0` is passed.
    return !!obj && (obj instanceof rxjs__WEBPACK_IMPORTED_MODULE_0__["Subscription"]);
}


/***/ }),

/***/ "jvPn":
/*!**************************************************************************!*\
  !*** ./apps/demos/src/app/app-shell/side-nav/side-nav-item.directive.ts ***!
  \**************************************************************************/
/*! exports provided: AppShellSideNavItemDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppShellSideNavItemDirective", function() { return AppShellSideNavItemDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class AppShellSideNavItemDirective {
    constructor() {
        this.level = 0;
    }
    get level1() { return this.level === 1; }
    ;
    get level2() { return this.level === 2; }
    ;
    get level3() { return this.level === 3; }
    ;
}
AppShellSideNavItemDirective.ɵfac = function AppShellSideNavItemDirective_Factory(t) { return new (t || AppShellSideNavItemDirective)(); };
AppShellSideNavItemDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: AppShellSideNavItemDirective, selectors: [["", "rxaAppShellSideNavItem", ""]], hostAttrs: [1, "app-shell-sidenav-item"], hostVars: 6, hostBindings: function AppShellSideNavItemDirective_HostBindings(rf, ctx) { if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("app-shell-sidenav-item-level-1", ctx.level1)("app-shell-sidenav-item-level-2", ctx.level2)("app-shell-sidenav-item-level-3", ctx.level3);
    } }, inputs: { level: ["rxaAppShellSideNavItemLevel", "level"] } });


/***/ }),

/***/ "jyCk":
/*!**************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/rxjs/observable/tick-promise.ts ***!
  \**************************************************************************************/
/*! exports provided: promiseTick */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "promiseTick", function() { return promiseTick; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _zone_agnostic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../zone-agnostic */ "j2tN");


// @NOTICE replace logic with 7v handling of promises in RxJS
const promiseTick = () => new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"]((subscriber) => {
    let cancelled = false;
    Object(_zone_agnostic__WEBPACK_IMPORTED_MODULE_1__["getResolvedPromise"])()
        .then(() => {
        if (!cancelled) {
            subscriber.next(0);
            subscriber.complete();
        }
    })
        .catch((e) => {
        subscriber.error(e);
    });
    return () => {
        cancelled = true;
        subscriber.complete();
    };
});


/***/ }),

/***/ "jym9":
/*!******************************************!*\
  !*** ./libs/state/src/lib/core/index.ts ***!
  \******************************************/
/*! exports provided: pipeFromArray, isIterableGuard, isOperateFnArrayGuard, isPromiseGuard, isStringArrayGuard, isKeyOf, isObjectGuard, isDefined, safePluck */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "MqKN");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pipeFromArray", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["pipeFromArray"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isIterableGuard", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["isIterableGuard"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isOperateFnArrayGuard", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["isOperateFnArrayGuard"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isPromiseGuard", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["isPromiseGuard"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isStringArrayGuard", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["isStringArrayGuard"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isKeyOf", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["isKeyOf"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isObjectGuard", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["isObjectGuard"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isDefined", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["isDefined"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "safePluck", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["safePluck"]; });




/***/ }),

/***/ "kF+w":
/*!**********************************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/zone-agnostic/rxjs/schedulers/asap/AsapScheduler.ts ***!
  \**********************************************************************************************************/
/*! exports provided: AsapScheduler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AsapScheduler", function() { return AsapScheduler; });
/* harmony import */ var _async_AsyncScheduler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../async/AsyncScheduler */ "It4N");

class AsapScheduler extends _async_AsyncScheduler__WEBPACK_IMPORTED_MODULE_0__["AsyncScheduler"] {
    flush(action) {
        this.active = true;
        this.scheduled = undefined;
        const { actions } = this;
        let error;
        let index = -1;
        let count = actions.length;
        action = action || actions.shift();
        do {
            if ((error = action.execute(action.state, action.delay))) {
                break;
            }
        } while (++index < count && (action = actions.shift()));
        this.active = false;
        if (error) {
            while (++index < count && (action = actions.shift())) {
                action.unsubscribe();
            }
            throw error;
        }
    }
}


/***/ }),

/***/ "kFmr":
/*!*******************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/pipes/push/push.module.ts ***!
  \*******************************************************************************/
/*! exports provided: PushModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PushModule", function() { return PushModule; });
/* harmony import */ var _push_pipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./push.pipe */ "eYr4");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


const DECLARATIONS = [
    _push_pipe__WEBPACK_IMPORTED_MODULE_0__["PushPipe"]
];
class PushModule {
}
PushModule.ɵfac = function PushModule_Factory(t) { return new (t || PushModule)(); };
PushModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: PushModule });
PushModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](PushModule, { declarations: [_push_pipe__WEBPACK_IMPORTED_MODULE_0__["PushPipe"]], exports: [_push_pipe__WEBPACK_IMPORTED_MODULE_0__["PushPipe"]] }); })();


/***/ }),

/***/ "kPeq":
/*!*********************************************************!*\
  !*** ./libs/cdk/src/lib/zone-configuration/zone-cfg.ts ***!
  \*********************************************************/
/*! exports provided: zoneConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zoneConfig", function() { return zoneConfig; });
/* harmony import */ var _model_configurations_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model/configurations.types */ "QmdT");

const zoneDisable = '__Zone_disable_';
const zoneSymbol = '__zone_symbol__';
function assertZoneConfig() {
    if (window.Zone !== undefined) {
        // @TODO link to docs
        console.error('zone-flags file needs to get imported before zone.js');
    }
}
/**
 * factory function to create a `ZoneConfig` object.
 *
 * @Example
 * import { globalEvents,xhrEvent, zoneConfig} from '@rx-angular/cdk/zone-flags';
 *
 * const zoneConfig = createZoneFlagsConfigurator();
 *
 * zoneConfig.global.disable.requestAnimationFrame();
 * zoneConfig.global.disable.timers();
 * zoneConfig.events.disable.UNPATCHED_EVENTS([...globalEvents, ...xhrEvent]);
 *
 */
function createZoneFlagsConfigurator() {
    const cfg = window;
    const configProps = [
        ...[
            ..._model_configurations_types__WEBPACK_IMPORTED_MODULE_0__["zoneGlobalDisableConfigurationsKeys"],
            ..._model_configurations_types__WEBPACK_IMPORTED_MODULE_0__["zoneTestDisableConfigurationsKeys"],
        ].map((prop) => zoneDisable + prop),
        ...[
            ..._model_configurations_types__WEBPACK_IMPORTED_MODULE_0__["zoneGlobalSettingsConfigurationsKeys"],
            ..._model_configurations_types__WEBPACK_IMPORTED_MODULE_0__["zoneTestSettingsConfigurationsKeys"],
            ..._model_configurations_types__WEBPACK_IMPORTED_MODULE_0__["zoneGlobalEventsConfigurationsKeys"],
            ..._model_configurations_types__WEBPACK_IMPORTED_MODULE_0__["zoneRuntimeConfigurationsKeys"],
        ].map((prop) => zoneSymbol + prop),
    ];
    // append as global method for easy debugging
    cfg.__rxa_zone_config__log = () => {
        configProps.forEach((flag) => {
            // tslint:disable-next-line:no-unused-expression
            cfg[flag] && console.log(flag, cfg[flag]);
        });
    };
    return {
        global: {
            disable: _model_configurations_types__WEBPACK_IMPORTED_MODULE_0__["zoneGlobalDisableConfigurationsKeys"]
                .map((prop) => ({
                [prop]: () => {
                    assertZoneConfig();
                    return (cfg[zoneDisable + prop] = true);
                },
            }))
                .concat(_model_configurations_types__WEBPACK_IMPORTED_MODULE_0__["zoneGlobalSettingsConfigurationsKeys"].map((prop) => ({
                [prop]: () => {
                    assertZoneConfig();
                    return (cfg[zoneSymbol + prop] = true);
                },
            })))
                .reduce((map, item) => (Object.assign(Object.assign({}, map), item)), {}),
        },
        test: {
            disable: _model_configurations_types__WEBPACK_IMPORTED_MODULE_0__["zoneTestDisableConfigurationsKeys"]
                .map((prop) => ({
                [prop]: () => {
                    assertZoneConfig();
                    return (cfg[zoneDisable + prop] = true);
                },
            }))
                .concat(_model_configurations_types__WEBPACK_IMPORTED_MODULE_0__["zoneTestSettingsConfigurationsKeys"].map((prop) => ({
                [prop]: () => {
                    assertZoneConfig();
                    return (cfg[zoneSymbol + prop] = true);
                },
            })))
                .reduce((map, item) => (Object.assign(Object.assign({}, map), item)), {}),
        },
        events: {
            disable: _model_configurations_types__WEBPACK_IMPORTED_MODULE_0__["zoneGlobalEventsConfigurationsKeys"]
                .map((prop) => ({
                [prop]: (eventNames) => {
                    assertZoneConfig();
                    return (cfg[zoneSymbol + prop] = [
                        ...(Array.isArray(cfg[zoneSymbol + prop])
                            ? cfg[zoneSymbol + prop]
                            : []),
                        ...eventNames,
                    ]);
                },
            }))
                .reduce((map, item) => (Object.assign(Object.assign({}, map), item)), {}),
        },
        runtime: {
            disable: _model_configurations_types__WEBPACK_IMPORTED_MODULE_0__["zoneRuntimeConfigurationsKeys"].reduce((map, prop) => (Object.assign(Object.assign({}, map), { [prop]: () => {
                    assertZoneConfig();
                    return (cfg[zoneSymbol + prop] = true);
                } })), {}),
        },
    };
}
const zoneConfig = createZoneFlagsConfigurator();


/***/ }),

/***/ "kt3e":
/*!****************************************************************!*\
  !*** ./libs/cdk/src/lib/zone-less/rxjs/observable/interval.ts ***!
  \****************************************************************/
/*! exports provided: interval */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "interval", function() { return interval; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _scheduler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scheduler */ "zPwp");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "veNg");



/**
 * Creates an Observable that emits sequential numbers every specified
 * interval of time, on a specified {@link SchedulerLike}.
 *
 * <span class="informal">Emits incremental numbers periodically in time.
 * </span>
 *
 * ![](interval.png)
 *
 * `interval` returns an Observable that emits an infinite sequence of
 * ascending integers, with a constant interval of time of your choosing
 * between those emissions. The first emission is not sent immediately, but
 * only after the first period has passed. By default, this operator uses the
 * `async` {@link SchedulerLike} to provide a notion of time, but you may pass any
 * {@link SchedulerLike} to it.
 *
 * ## Example
 * Emits ascending numbers, one every second (1000ms) up to the number 3
 * ```ts
 * import { interval } from 'rxjs';
 * import { take } from 'rxjs/operators';
 *
 * const numbers = interval(1000);
 *
 * const takeFourNumbers = numbers.pipe(take(4));
 *
 * takeFourNumbers.subscribe(x => console.log('Next: ', x));
 *
 * // Logs:
 * // Next: 0
 * // Next: 1
 * // Next: 2
 * // Next: 3
 * ```
 *
 * @see {@link timer}
 * @see {@link delay}
 *
 * @param {number} [period=0] The interval size in milliseconds (by default)
 * or the time unit determined by the scheduler's clock.
 * @param {SchedulerLike} [scheduler=async] The {@link SchedulerLike} to use for scheduling
 * the emission of values, and providing a notion of "time".
 * @return {Observable} An Observable that emits a sequential number each time
 * interval.
 * @static true
 * @name interval
 * @owner Observable
 */
function interval(period = 0, scheduler = _scheduler__WEBPACK_IMPORTED_MODULE_1__["asyncScheduler"]) {
    if (!Object(_utils__WEBPACK_IMPORTED_MODULE_2__["isNumeric"])(period) || period < 0) {
        period = 0;
    }
    if (!scheduler || typeof scheduler.schedule !== 'function') {
        scheduler = _scheduler__WEBPACK_IMPORTED_MODULE_1__["asyncScheduler"];
    }
    return new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"]((subscriber) => {
        subscriber.add(scheduler.schedule(dispatch, period, { subscriber, counter: 0, period }));
        return subscriber;
    });
}
function dispatch(state) {
    const { subscriber, counter, period } = state;
    subscriber.next(counter);
    this.schedule({ subscriber, counter: counter + 1, period }, period);
}


/***/ }),

/***/ "lW3W":
/*!****************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/guards.ts ***!
  \****************************************************************/
/*! exports provided: isPromiseGuard, isOperateFnArrayGuard, isStringArrayGuard, isIterableGuard, isKeyOf, isObjectGuard, isDefined */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPromiseGuard", function() { return isPromiseGuard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isOperateFnArrayGuard", function() { return isOperateFnArrayGuard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isStringArrayGuard", function() { return isStringArrayGuard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isIterableGuard", function() { return isIterableGuard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isKeyOf", function() { return isKeyOf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObjectGuard", function() { return isObjectGuard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDefined", function() { return isDefined; });
function isPromiseGuard(value) {
    return (!!value &&
        typeof value.subscribe !== 'function' &&
        typeof value.then === 'function');
}
function isOperateFnArrayGuard(op) {
    if (!Array.isArray(op)) {
        return false;
    }
    return op.length > 0 && op.every((i) => typeof i === 'function');
}
function isStringArrayGuard(op) {
    if (!Array.isArray(op)) {
        return false;
    }
    return op.length > 0 && op.every((i) => typeof i === 'string');
}
function isIterableGuard(obj) {
    if (obj === null || obj === undefined) {
        return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
}
function isKeyOf(k) {
    return (!!k &&
        (typeof k === 'string' || typeof k === 'symbol' || typeof k === 'number'));
}
function isObjectGuard(obj) {
    return obj && typeof obj === 'object' && !Array.isArray(obj);
}
function isDefined(val) {
    return val !== null && val !== undefined;
}


/***/ }),

/***/ "lX2z":
/*!***************************************************************!*\
  !*** ./libs/template/src/lib/core/render-aware/interfaces.ts ***!
  \***************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "lo2A":
/*!*******************************************************************!*\
  !*** ./apps/demos/src/app/app-component/app-presenter.service.ts ***!
  \*******************************************************************/
/*! exports provided: AppPresenter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppPresenter", function() { return AppPresenter; });
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/cdk/layout */ "0MNC");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");




class AppPresenter {
    constructor(breakpointObserver) {
        this.breakpointObserver = breakpointObserver;
        this.isHandset$ = this.breakpointObserver
            .observe(_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_0__["Breakpoints"].Handset)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((result) => result.matches), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["shareReplay"])());
    }
}
AppPresenter.ɵfac = function AppPresenter_Factory(t) { return new (t || AppPresenter)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_0__["BreakpointObserver"])); };
AppPresenter.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: AppPresenter, factory: AppPresenter.ɵfac });


/***/ }),

/***/ "lqGI":
/*!*******************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/zone-agnostic/browser/setInterval.ts ***!
  \*******************************************************************************************/
/*! exports provided: setInterval, clearInterval */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setInterval", function() { return setInterval; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearInterval", function() { return clearInterval; });
/* harmony import */ var _zone_checks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../zone-checks */ "V4xg");

function setInterval(cb, ms = 0) {
    return Object(_zone_checks__WEBPACK_IMPORTED_MODULE_0__["getZoneUnPatchedApi"])('setInterval')(cb, ms);
}
function clearInterval(id) {
    return Object(_zone_checks__WEBPACK_IMPORTED_MODULE_0__["getZoneUnPatchedApi"])('clearInterval')(id);
}


/***/ }),

/***/ "mymj":
/*!****************************************************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/zone-agnostic/rxjs/schedulers/animation-frame/AnimationFrameAction.ts ***!
  \****************************************************************************************************************************/
/*! exports provided: AnimationFrameAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnimationFrameAction", function() { return AnimationFrameAction; });
/* harmony import */ var _async_AsyncAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../async/AsyncAction */ "FXx3");
/* harmony import */ var _browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../browser */ "7zi/");
// tslint:disable


/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class AnimationFrameAction extends _async_AsyncAction__WEBPACK_IMPORTED_MODULE_0__["AsyncAction"] {
    constructor(scheduler, work) {
        super(scheduler, work);
        this.scheduler = scheduler;
        this.work = work;
    }
    requestAsyncId(scheduler, id, delay = 0) {
        // If delay is greater than 0, request as an async action.
        if (delay !== null && delay > 0) {
            return super.requestAsyncId(scheduler, id, delay);
        }
        // Push the action to the end of the scheduler queue.
        // @ts-ignore
        scheduler.actions.push(this);
        // If an animation frame has already been requested, don't request another
        // one. If an animation frame hasn't been requested yet, request one. Return
        // the current animation frame request id.
        return (scheduler.scheduled ||
            (scheduler.scheduled = Object(_browser__WEBPACK_IMPORTED_MODULE_1__["requestAnimationFrame"])(() => scheduler.flush(undefined))));
    }
    recycleAsyncId(scheduler, id, delay = 0) {
        // If delay exists and is greater than 0, or if the delay is null (the
        // action wasn't rescheduled) but was originally scheduled as an async
        // action, then recycle as an async action.
        if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
            return super.recycleAsyncId(scheduler, id, delay);
        }
        // If the scheduler queue is empty, cancel the requested animation frame and
        // set the scheduled flag to undefined so the next AnimationFrameAction will
        // request its own.
        if (scheduler.actions.length === 0) {
            Object(_browser__WEBPACK_IMPORTED_MODULE_1__["cancelAnimationFrame"])(id);
            scheduler.scheduled = undefined;
        }
        // Return undefined so the action knows to request a new async id if it's rescheduled.
        return undefined;
    }
}


/***/ }),

/***/ "nix1":
/*!*************************************************************************************************!*\
  !*** ./libs/template/src/lib/experimental/unpatch/events/unpatch-events.experimental.module.ts ***!
  \*************************************************************************************************/
/*! exports provided: UnpatchEventsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnpatchEventsModule", function() { return UnpatchEventsModule; });
/* harmony import */ var _unpatch_events_experimental_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./unpatch-events.experimental.directive */ "QZMm");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


const DECLARATIONS = [_unpatch_events_experimental_directive__WEBPACK_IMPORTED_MODULE_0__["UnpatchEventsDirective"]];
class UnpatchEventsModule {
}
UnpatchEventsModule.ɵfac = function UnpatchEventsModule_Factory(t) { return new (t || UnpatchEventsModule)(); };
UnpatchEventsModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: UnpatchEventsModule });
UnpatchEventsModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({});
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](UnpatchEventsModule, { declarations: [_unpatch_events_experimental_directive__WEBPACK_IMPORTED_MODULE_0__["UnpatchEventsDirective"]], exports: [_unpatch_events_experimental_directive__WEBPACK_IMPORTED_MODULE_0__["UnpatchEventsDirective"]] }); })();


/***/ }),

/***/ "nxAE":
/*!***************************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/directives/if-visible/model/template-names.ts ***!
  \***************************************************************************************************/
/*! exports provided: RxIfVisibleTemplateNames */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RxIfVisibleTemplateNames", function() { return RxIfVisibleTemplateNames; });
/* harmony import */ var _rx_angular_cdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rx-angular/cdk */ "cDIL");

const RxIfVisibleTemplateNames = Object.assign(Object.assign({}, _rx_angular_cdk__WEBPACK_IMPORTED_MODULE_0__["RxBaseTemplateNames"]), { view: 'viewTpl' });


/***/ }),

/***/ "oIM3":
/*!**********************************************!*\
  !*** ./libs/cdk/src/lib/utils/hotFlatten.ts ***!
  \**********************************************/
/*! exports provided: hotFlatten */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hotFlatten", function() { return hotFlatten; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _coerceDistinctObservableWith__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./coerceDistinctObservableWith */ "AqL7");



/**
 * @internal
 *
 * A factory function returning an object to handle the process of merging Observable next notifications into one
 *   Observable. This API takes away the clumsy handling of static values and Observable, reduces the number of
 *   emissions by:
 * - only merging distinct Observables
 * - only emit distingt values of the merged result
 *
 * You can next a Observable of `U` multiple times and merge them into the Observable exposed under one optimized
 *   `values$`
 *
 */
function hotFlatten(subjectFactory, flattenOperator) {
    const observablesSubject = subjectFactory ? subjectFactory() : new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
    flattenOperator = flattenOperator || Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchAll"])();
    const values$ = observablesSubject.pipe(Object(_coerceDistinctObservableWith__WEBPACK_IMPORTED_MODULE_2__["coerceDistinctWith"])(flattenOperator));
    return {
        next(observable) {
            observablesSubject.next(observable);
        },
        values$,
    };
}


/***/ }),

/***/ "ol9i":
/*!************************************************!*\
  !*** ./libs/cdk/src/lib/utils/coalesceWith.ts ***!
  \************************************************/
/*! exports provided: coalesceWith */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "coalesceWith", function() { return coalesceWith; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _coalescingManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./coalescingManager */ "/85T");


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
 * ```typescript
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
    return (source) => {
        const o$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"]((observer) => {
            const rootSubscription = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subscription"]();
            rootSubscription.add(source.subscribe(createInnerObserver(observer, rootSubscription)));
            return rootSubscription;
        });
        return o$;
        function createInnerObserver(outerObserver, rootSubscription) {
            let actionSubscription;
            let latestValue;
            const tryEmitLatestValue = () => {
                if (actionSubscription) {
                    // We only decrement the number if it is greater than 0 (isCoalescing)
                    _coalescingManager__WEBPACK_IMPORTED_MODULE_1__["coalescingManager"].remove(_scope);
                    if (!_coalescingManager__WEBPACK_IMPORTED_MODULE_1__["coalescingManager"].isCoalescing(_scope)) {
                        outerObserver.next(latestValue);
                    }
                }
            };
            return {
                complete: () => {
                    tryEmitLatestValue();
                    outerObserver.complete();
                },
                error: (error) => outerObserver.error(error),
                next: (value) => {
                    latestValue = value;
                    if (!actionSubscription) {
                        // tslint:disable-next-line:no-unused-expression
                        _coalescingManager__WEBPACK_IMPORTED_MODULE_1__["coalescingManager"].add(_scope);
                        actionSubscription = durationSelector.subscribe({
                            error: (error) => outerObserver.error(error),
                            next: () => {
                                tryEmitLatestValue();
                                actionSubscription.unsubscribe();
                                actionSubscription = undefined;
                            },
                            complete: () => {
                                tryEmitLatestValue();
                                actionSubscription = undefined;
                            },
                        });
                        rootSubscription.add(new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subscription"](() => {
                            tryEmitLatestValue();
                            if (actionSubscription) {
                                actionSubscription.unsubscribe();
                                actionSubscription = undefined;
                            }
                        }));
                    }
                },
            };
        }
    };
}


/***/ }),

/***/ "ozva":
/*!********************************************************!*\
  !*** ./apps/demos/src/app/app-shell/side-nav/utils.ts ***!
  \********************************************************/
/*! exports provided: generateRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateRoutes", function() { return generateRoutes; });
function generateRoutes(navigationItems, link = '') {
    return navigationItems.reduce((items, item) => {
        item.link = link ? link + '/' + item.link : item.link;
        if (item.children && item.children.length) {
            item.children = generateRoutes(item.children, item.link);
        }
        return items.concat([item]);
    }, []);
}


/***/ }),

/***/ "pJB2":
/*!***********************************!*\
  !*** ./libs/cdk/src/lib/model.ts ***!
  \***********************************/
/*! exports provided: RxNotificationKind */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RxNotificationKind", function() { return RxNotificationKind; });
var RxNotificationKind;
(function (RxNotificationKind) {
    RxNotificationKind["suspense"] = "suspense";
    RxNotificationKind["next"] = "next";
    RxNotificationKind["error"] = "error";
    RxNotificationKind["complete"] = "complete";
})(RxNotificationKind || (RxNotificationKind = {}));


/***/ }),

/***/ "po7g":
/*!**********************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/components/context/model/view-context.ts ***!
  \**********************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "poug":
/*!*****************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/directives/let/index.ts ***!
  \*****************************************************************************/
/*! exports provided: RxLetTemplateNames, RxLet, RxLetModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model */ "9uYj");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxLetTemplateNames", function() { return _model__WEBPACK_IMPORTED_MODULE_0__["RxLetTemplateNames"]; });

/* harmony import */ var _rx_let_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rx-let.directive */ "XklV");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxLet", function() { return _rx_let_directive__WEBPACK_IMPORTED_MODULE_1__["RxLet"]; });

/* harmony import */ var _let_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./let.module */ "Gv0n");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxLetModule", function() { return _let_module__WEBPACK_IMPORTED_MODULE_2__["RxLetModule"]; });






/***/ }),

/***/ "ppGH":
/*!********************************************************************************************!*\
  !*** ./apps/demos/src/app/shared/debug-helper/dirty-checks/dirty-checks-work.component.ts ***!
  \********************************************************************************************/
/*! exports provided: DirtyChecksWorkComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DirtyChecksWorkComponent", function() { return DirtyChecksWorkComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/core */ "FKr1");
/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../hooks */ "XoRM");
/* harmony import */ var _rx_angular_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @rx-angular/state */ "YYsp");
/* harmony import */ var _rx_effects_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../rx-effects.service */ "+Gkt");
/* harmony import */ var _app_config_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../app-config.service */ "uloo");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");











const _c0 = function (a0, a1) { return { width: a0, height: a1 }; };
class DirtyChecksWorkComponent extends _hooks__WEBPACK_IMPORTED_MODULE_2__["Hooks"] {
    constructor(elementRef, renderer, configService, rxEf) {
        super();
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.configService = configService;
        this.rxEf = rxEf;
        this.dirtyChecks = 0;
        this.rippleOn = true;
        this.radius = 20;
        this.color = 'rgba(253,255,0,0.24)';
        this.rippleEffect = { centered: true };
        this.work = 10;
        this.rxEf.hold(this.configService.$.pipe(Object(_rx_angular_state__WEBPACK_IMPORTED_MODULE_3__["select"])('rippleOn')), (r) => {
            this.rippleOn = r;
        });
        this.rxEf.hold(this.afterViewInit$, () => {
            this.displayElem = this.elementRef.nativeElement.children[0].children[0];
            this.numDirtyChecks();
        });
    }
    doWork() {
        for (let i = 0; i <= this.work * 100; i++) {
            console.log('performing work');
        }
        return '';
    }
    numDirtyChecks() {
        if (this.rippleOn) {
            // tslint:disable-next-line:no-unused-expression
            this.rippleOn && this.ripple && this.ripple.launch(this.rippleEffect);
        }
        // tslint:disable-next-line:no-unused-expression
        this.displayElem && this.renderer.setProperty(this.displayElem, 'innerHTML', ++this.dirtyChecks + '');
    }
}
DirtyChecksWorkComponent.ɵfac = function DirtyChecksWorkComponent_Factory(t) { return new (t || DirtyChecksWorkComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_app_config_service__WEBPACK_IMPORTED_MODULE_5__["AppConfigService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_rx_effects_service__WEBPACK_IMPORTED_MODULE_4__["RxEffects"])); };
DirtyChecksWorkComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DirtyChecksWorkComponent, selectors: [["rxa-dirty-check-work"]], viewQuery: function DirtyChecksWorkComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MatRipple"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.ripple = _t.first);
    } }, inputs: { rippleOn: "rippleOn", radius: "radius", color: "color", rippleEffect: "rippleEffect", work: "work" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_rx_effects_service__WEBPACK_IMPORTED_MODULE_4__["RxEffects"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]], decls: 10, vars: 8, consts: [[1, "d-inline-flex", "align-items-center"], ["matRipple", "", 1, "indicator-ripple", 3, "ngStyle", "matRippleColor", "matRippleRadius"]], template: function DirtyChecksWorkComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Performed work ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "span", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, " times");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](5, _c0, ctx.radius + "px", ctx.radius + "px"))("matRippleColor", ctx.color)("matRippleRadius", ctx.radius);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.numDirtyChecks());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.doWork());
    } }, directives: [_angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MatRipple"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgStyle"]], styles: ["[_nghost-%COMP%]   .indicator-ripple[_ngcontent-%COMP%] {\n      border: 1px solid #ffff005f;\n    }"] });


/***/ }),

/***/ "qAf4":
/*!*************************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/zone-agnostic/rxjs/schedulers/asap/asap.ts ***!
  \*************************************************************************************************/
/*! exports provided: asapScheduler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "asapScheduler", function() { return asapScheduler; });
/* harmony import */ var _AsapAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AsapAction */ "VEB6");
/* harmony import */ var _AsapScheduler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AsapScheduler */ "kF+w");
// tslint:disable file-name-casing


/**
 *
 * NOTE: This is a zone un-patched version of rxjs asapScheduler
 *
 * Asap Scheduler
 *
 * <span class="informal">Perform task as fast as it can be performed asynchronously</span>
 *
 * `asap` scheduler behaves the same as {@link asyncScheduler} scheduler when you use it to delay task
 * in time. If however you set delay to `0`, `asap` will wait for current synchronously executing
 * code to end and then it will try to execute given task as fast as possible.
 *
 * `asap` scheduler will do its best to minimize time between end of currently executing code
 * and start of scheduled task. This makes it best candidate for performing so called "deferring".
 * Traditionally this was achieved by calling `setTimeout(deferredTask, 0)`, but that technique involves
 * some (although minimal) unwanted delay.
 *
 * Note that using `asap` scheduler does not necessarily mean that your task will be first to process
 * after currently executing code. In particular, if some task was also scheduled with `asap` before,
 * that task will execute first. That being said, if you need to schedule task asynchronously, but
 * as soon as possible, `asap` scheduler is your best bet.
 *
 * ## Example
 * Compare async and asap scheduler<
 * ```ts
 * import { asapScheduler, asyncScheduler } from '@cu/perf-utils';
 *
 * asyncScheduler.schedule(() => console.log('async')); // scheduling 'async' first...
 * asapScheduler.schedule(() => console.log('asap'));
 *
 * // Logs:
 * // "asap"
 * // "async"
 * // ... but 'asap' goes first!
 * ```
 */
const asapScheduler = new _AsapScheduler__WEBPACK_IMPORTED_MODULE_1__["AsapScheduler"](_AsapAction__WEBPACK_IMPORTED_MODULE_0__["AsapAction"]);


/***/ }),

/***/ "qnLR":
/*!***************************************************************************************!*\
  !*** ./apps/demos/src/app/shared/debug-helper/dirty-checks/dirty-checks.component.ts ***!
  \***************************************************************************************/
/*! exports provided: DirtyChecksComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DirtyChecksComponent", function() { return DirtyChecksComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/core */ "FKr1");
/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../hooks */ "XoRM");
/* harmony import */ var _rx_angular_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @rx-angular/state */ "YYsp");
/* harmony import */ var _rx_effects_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../rx-effects.service */ "+Gkt");
/* harmony import */ var _app_config_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../app-config.service */ "uloo");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");











const _c0 = function (a0, a1) { return { width: a0, height: a1 }; };
class DirtyChecksComponent extends _hooks__WEBPACK_IMPORTED_MODULE_2__["Hooks"] {
    constructor(elementRef, renderer, configService, rxEf) {
        super();
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.configService = configService;
        this.rxEf = rxEf;
        this.dirtyChecks = 0;
        this.rippleOn = true;
        this.radius = 20;
        this.color = 'rgba(253,255,0,0.24)';
        this.rippleEffect = { centered: true };
        this.rxEf.hold(this.configService.$.pipe(Object(_rx_angular_state__WEBPACK_IMPORTED_MODULE_3__["select"])('rippleOn')), (r) => {
            this.rippleOn = r;
        });
        this.rxEf.hold(this.afterViewInit$, () => {
            this.displayElem = this.elementRef.nativeElement.children[0].children[0];
            this.numDirtyChecks();
        });
    }
    numDirtyChecks() {
        if (this.rippleOn) {
            // tslint:disable-next-line:no-unused-expression
            this.rippleOn && this.ripple && this.ripple.launch(this.rippleEffect);
        }
        // tslint:disable-next-line:no-unused-expression
        this.displayElem && this.renderer.setProperty(this.displayElem, 'innerHTML', ++this.dirtyChecks + '');
    }
}
DirtyChecksComponent.ɵfac = function DirtyChecksComponent_Factory(t) { return new (t || DirtyChecksComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_app_config_service__WEBPACK_IMPORTED_MODULE_5__["AppConfigService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_rx_effects_service__WEBPACK_IMPORTED_MODULE_4__["RxEffects"])); };
DirtyChecksComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DirtyChecksComponent, selectors: [["rxa-dirty-check"]], viewQuery: function DirtyChecksComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MatRipple"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.ripple = _t.first);
    } }, inputs: { rippleOn: "rippleOn", radius: "radius", color: "color", rippleEffect: "rippleEffect" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_rx_effects_service__WEBPACK_IMPORTED_MODULE_4__["RxEffects"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]], decls: 3, vars: 8, consts: [["matRipple", "", 1, "indicator-ripple", 3, "ngStyle", "matRippleColor", "matRippleRadius"]], template: function DirtyChecksComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](5, _c0, ctx.radius + "px", ctx.radius + "px"))("matRippleColor", ctx.color)("matRippleRadius", ctx.radius);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"]("", ctx.numDirtyChecks(), "", ctx.radius, "");
    } }, directives: [_angular_material_core__WEBPACK_IMPORTED_MODULE_1__["MatRipple"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgStyle"]], styles: ["[_nghost-%COMP%]   .indicator-ripple[_ngcontent-%COMP%] {\n      border: 1px solid #ffff005f;\n    }"] });


/***/ }),

/***/ "qoB/":
/*!************************************************************!*\
  !*** ./libs/cdk/src/lib/utils/coerceDistinctObservable.ts ***!
  \************************************************************/
/*! exports provided: coerceDistinctObservable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "coerceDistinctObservable", function() { return coerceDistinctObservable; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _coerceObservable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./coerceObservable */ "rTNW");


/**
 * This Observable factory creates an Observable out of a static value or ObservableInput.
 * It forwards only distinct values from distinct incoming Observables or values.
 * This comes in handy in any environment where you handle processing of incoming dynamic values and their state.
 *
 * Optionally you can pass a flatten strategy to get find grained control of the flattening process. E.g. mergeAll, switchAll
 *
 * @param o$ - The Observable to coerce and map to a Observable with distinct values
 * @param flattenOperator - determines the flattening strategy e.g. mergeAll, concatAll, exhaust, switchAll. default is switchAll
 */
function coerceDistinctObservable(o$, flattenOperator) {
    flattenOperator = flattenOperator || Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["switchAll"])();
    return Object(_coerceObservable__WEBPACK_IMPORTED_MODULE_1__["coerceObservable"])(o$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["distinctUntilChanged"])(), flattenOperator, Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["distinctUntilChanged"])());
}


/***/ }),

/***/ "qsZ0":
/*!*************************************************!*\
  !*** ./libs/template/src/lib/let/let.module.ts ***!
  \*************************************************/
/*! exports provided: LetModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LetModule", function() { return LetModule; });
/* harmony import */ var _let_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./let.directive */ "cihl");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


const EXPORTED_DECLARATIONS = [_let_directive__WEBPACK_IMPORTED_MODULE_0__["LetDirective"]];
class LetModule {
}
LetModule.ɵfac = function LetModule_Factory(t) { return new (t || LetModule)(); };
LetModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: LetModule });
LetModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({});
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](LetModule, { declarations: [_let_directive__WEBPACK_IMPORTED_MODULE_0__["LetDirective"]], exports: [_let_directive__WEBPACK_IMPORTED_MODULE_0__["LetDirective"]] }); })();


/***/ }),

/***/ "r2o8":
/*!***************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/rxjs/operators/rx-materialize.ts ***!
  \***************************************************************************************/
/*! exports provided: rxMaterialize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rxMaterialize", function() { return rxMaterialize; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _Notification__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Notification */ "YR/O");


function rxMaterialize() {
    return (o$) => o$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["materialize"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["tap"])(({ kind, error }) => {
        if (kind === 'E') {
            console.error(error);
        }
    }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(_Notification__WEBPACK_IMPORTED_MODULE_1__["notificationToRxNotification"]));
}


/***/ }),

/***/ "rD3y":
/*!*****************************************!*\
  !*** ./libs/cdk/src/lib/utils/index.ts ***!
  \*****************************************/
/*! exports provided: coerceDistinctObservable, coerceDistinctWith, coerceObservable, coerceObservableWith, hotFlatten, templateNotifier, onStrategy, rxMaterialize, strategyHandling, templateTriggerHandling, coalesceWith, toRxCompleteNotification, toRxErrorNotification, toRxSuspenseNotification */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _coerceDistinctObservable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./coerceDistinctObservable */ "qoB/");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "coerceDistinctObservable", function() { return _coerceDistinctObservable__WEBPACK_IMPORTED_MODULE_0__["coerceDistinctObservable"]; });

/* harmony import */ var _coerceDistinctObservableWith__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./coerceDistinctObservableWith */ "AqL7");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "coerceDistinctWith", function() { return _coerceDistinctObservableWith__WEBPACK_IMPORTED_MODULE_1__["coerceDistinctWith"]; });

/* harmony import */ var _coerceObservable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./coerceObservable */ "rTNW");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "coerceObservable", function() { return _coerceObservable__WEBPACK_IMPORTED_MODULE_2__["coerceObservable"]; });

/* harmony import */ var _coerceObservableWith__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./coerceObservableWith */ "xahO");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "coerceObservableWith", function() { return _coerceObservableWith__WEBPACK_IMPORTED_MODULE_3__["coerceObservableWith"]; });

/* harmony import */ var _hotFlatten__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./hotFlatten */ "oIM3");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hotFlatten", function() { return _hotFlatten__WEBPACK_IMPORTED_MODULE_4__["hotFlatten"]; });

/* harmony import */ var _templateNotifier__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./templateNotifier */ "ZTDl");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "templateNotifier", function() { return _templateNotifier__WEBPACK_IMPORTED_MODULE_5__["templateNotifier"]; });

/* harmony import */ var _onStrategy__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./onStrategy */ "PbSv");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "onStrategy", function() { return _onStrategy__WEBPACK_IMPORTED_MODULE_6__["onStrategy"]; });

/* harmony import */ var _rxMaterialize__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./rxMaterialize */ "T1Ye");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rxMaterialize", function() { return _rxMaterialize__WEBPACK_IMPORTED_MODULE_7__["rxMaterialize"]; });

/* harmony import */ var _strategy_handling__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./strategy-handling */ "6+wS");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "strategyHandling", function() { return _strategy_handling__WEBPACK_IMPORTED_MODULE_8__["strategyHandling"]; });

/* harmony import */ var _template_trigger_handling__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./template-trigger-handling */ "Wp0T");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "templateTriggerHandling", function() { return _template_trigger_handling__WEBPACK_IMPORTED_MODULE_9__["templateTriggerHandling"]; });

/* harmony import */ var _coalesceWith__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./coalesceWith */ "ol9i");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "coalesceWith", function() { return _coalesceWith__WEBPACK_IMPORTED_MODULE_10__["coalesceWith"]; });

/* harmony import */ var _notification_transforms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./notification-transforms */ "3PYK");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toRxCompleteNotification", function() { return _notification_transforms__WEBPACK_IMPORTED_MODULE_11__["toRxCompleteNotification"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toRxErrorNotification", function() { return _notification_transforms__WEBPACK_IMPORTED_MODULE_11__["toRxErrorNotification"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toRxSuspenseNotification", function() { return _notification_transforms__WEBPACK_IMPORTED_MODULE_11__["toRxSuspenseNotification"]; });















/***/ }),

/***/ "rPqH":
/*!******************************************!*\
  !*** ./apps/demos/src/app/app.module.ts ***!
  \******************************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _rx_angular_cdk__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @rx-angular/cdk */ "cDIL");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-component */ "OEnZ");
/* harmony import */ var _shared_environment_token__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./shared/environment.token */ "DUwo");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../environments/environment */ "aLPm");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _features_home_home_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./features/home/home.component */ "Lzoi");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ "fXoL");









class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({ providers: [
        {
            provide: _shared_environment_token__WEBPACK_IMPORTED_MODULE_4__["ENVIRONMENT_SETTINGS"],
            useValue: _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"],
        },
        {
            provide: _rx_angular_cdk__WEBPACK_IMPORTED_MODULE_2__["RX_ANGULAR_CONFIG"],
            useValue: {
                primaryStrategy: 'normal',
                patchZone: true
            }
        }
    ], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_1__["BrowserAnimationsModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"],
            _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponentModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_features_home_home_component__WEBPACK_IMPORTED_MODULE_7__["HomeComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_1__["BrowserAnimationsModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"],
        _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponentModule"]] }); })();


/***/ }),

/***/ "rTNW":
/*!****************************************************!*\
  !*** ./libs/cdk/src/lib/utils/coerceObservable.ts ***!
  \****************************************************/
/*! exports provided: coerceObservable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "coerceObservable", function() { return coerceObservable; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");

/**
 * This Observable factory creates an Observable out of a static value or ObservableInput.
 *
 * @param o - the value to coerce
 */
function coerceObservable(o) {
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["isObservable"])(o) ? o : Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(o);
}


/***/ }),

/***/ "rh42":
/*!***************************************************************************************!*\
  !*** ./apps/demos/src/app/features/experiments/input-bindings/input-bindings.menu.ts ***!
  \***************************************************************************************/
/*! exports provided: MENU_ITEMS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MENU_ITEMS", function() { return MENU_ITEMS; });
const MENU_ITEMS = [
    {
        link: 'input-bindings',
        label: 'Input Bindings',
    }
];


/***/ }),

/***/ "rxQk":
/*!*******************************************************!*\
  !*** ./libs/cdk/src/lib/zone-less/browser/browser.ts ***!
  \*******************************************************/
/*! exports provided: queueMicrotask, Promise, requestAnimationFrame, cancelAnimationFrame, setInterval, clearInterval, setTimeout, clearTimeout, unpatchAddEventListener */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queueMicrotask", function() { return queueMicrotask; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Promise", function() { return Promise; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "requestAnimationFrame", function() { return requestAnimationFrame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cancelAnimationFrame", function() { return cancelAnimationFrame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setInterval", function() { return setInterval; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearInterval", function() { return clearInterval; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setTimeout", function() { return setTimeout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearTimeout", function() { return clearTimeout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unpatchAddEventListener", function() { return unpatchAddEventListener; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "FflV");

/**
 * This file provides unpatched versions of APIs patched in the following file: https://github.com/angular/angular/blob/master/packages/zone.js/lib/browser/browser.ts
 */
/**
 * This function is a zone un-patched implementation of Window#queueMicrotask() method.
 * It is which is exposed on the Window or Worker interface,
 * queues a microtask to be executed at a safe time prior to control returning to the browser's event loop.
 * The microtask is a short function which will run after the current task has completed its
 * work and when there is no other code waiting to be run before control of the execution context is returned to the browser's event loop.
 */
function queueMicrotask() {
    return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getZoneUnPatchedApi"])('queueMicrotask');
}
const Promise = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getZoneUnPatchedApi"])('Promise');
/**
 * requestAnimationFrame
 *
 * @description
 *
 * This function is a zone un-patched implementation of Window#requestAnimationFrame() method
 *
 * The requestAnimationFrame() method calls a function or evaluates an expression on the next animationFrame.
 * The requestAnimationFrame() method will not continue calling the function after executed once.
 * The ID value returned by requestAnimationFrame() is used as the parameter for the cancelAnimationFrame() method.
 *
 * requestAnimationFrame(cb, ms);
 *
 * @param cb {Function} - Required. The function that will be executed
 *
 */
function requestAnimationFrame(cb) {
    return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getZoneUnPatchedApi"])('requestAnimationFrame')(cb);
}
/**
 * cancelAnimationFrame
 *
 * @description
 *
 * This function is a zone un-patched implementation of Window cancelAnimationFrame() method
 *
 * The cancelAnimationFrame() method clears a timer set with the requestAnimationFrame() method.
 * The ID value returned by requestAnimationFrame() is used as the parameter for the cancelAnimationFrame() method.
 *
 * To be able to use the cancelAnimationFrame() method, you must use a variable when creating the requestAnimationFrame method:
 *
 * const id = requestAnimationFrame("javascript function");
 * Then you will be able to stop the execution by calling the cancelAnimationFrame() method.
 *
 * cancelAnimationFrame(id);
 *
 * @param id {number} - Required. The ID value of the timer returned by the requestAnimationFrame() method
 *
 */
function cancelAnimationFrame(id) {
    Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getZoneUnPatchedApi"])('cancelAnimationFrame')(id);
}
/**
 * setInterval
 *
 * @description
 *
 * This function is a zone un-patched implementation of Window setInterval() method
 *
 * The setInterval() method calls a function or evaluates an expression at specified intervals (in milliseconds).
 * The setInterval() method will continue calling the function until clearInterval() is called, or the window is closed.
 * The ID value returned by setInterval() is used as the parameter for the clearInterval() method.
 *
 * setInterval(cb, ms);
 *
 * @param cb {Function} - Required. The function that will be executed
 * @param ms {number} - Required. The intervals (in milliseconds) on how often to execute the code. If the value is less than 10, the value 10 is used
 *
 */
function setInterval(cb, ms = 0) {
    return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getZoneUnPatchedApi"])('setInterval')(cb, ms);
}
/**
 * clearInterval
 *
 * @description
 *
 * This function is a zone un-patched implementation of Window clearInterval() method
 *
 * The clearInterval() method clears a timer set with the setInterval() method.
 * The ID value returned by setInterval() is used as the parameter for the clearInterval() method.
 *
 * To be able to use the clearInterval() method, you must use a variable when creating the interval method:
 *
 * const id = setInterval("javascript function", milliseconds);
 * Then you will be able to stop the execution by calling the clearInterval() method.
 *
 * clearInterval(id);
 *
 * @param id {number} - Required. The ID value of the timer returned by the setInterval() method
 *
 */
function clearInterval(id) {
    return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getZoneUnPatchedApi"])('clearInterval')(id);
}
/**
 * setTimeout
 *
 * @description
 *
 * This function is a zone un-patched implementation of Window setTimeout() method
 *
 * The setTimeout() method calls a function or evaluates an expression after a specified number of milliseconds.
 * The function is only executed once. If you need to repeat execution, use the setInterval() method.
 * Use the clearTimeout() method to prevent the function from running.
 *
 * setTimeout(cb, ms);
 *
 * @param cb {Function} - Required. The function that will be executed
 * @param ms {number} - Optional. The number of milliseconds to wait before executing the code. If omitted, the value 0 is used
 *
 */
function setTimeout(cb, ms = 0) {
    return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getZoneUnPatchedApi"])('setTimeout')(cb, ms);
}
/**
 * clearTimeout
 *
 * @description
 *
 * This function is a zone un-patched implementation of Window#clearTimeout() method
 *
 * The clearTimeout() method clears a timer set with the setTimeout() method.
 * The ID value returned by setTimeout() is used as the parameter for the clearTimeout() method.
 *
 * const id = setTimeout("javascript function", milliseconds);
 * Then, if the function has not already been executed, you will be able to stop the execution by calling the clearTimeout() method.
 *
 * clearTimeout(id);
 *
 * @param id {number} -	Required. The ID value of the timer returned by the setTimeout() method
 *
 */
function clearTimeout(id) {
    return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getZoneUnPatchedApi"])('clearTimeout')(id);
}
/**
 * This function is a zone un-patched implementation of Element#addEventListener() method.
 * @param elem
 */
function unpatchAddEventListener(elem) {
    elem.addEventListener = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getZoneUnPatchedApi"])('addEventListener', elem).bind(elem);
    return elem;
}


/***/ }),

/***/ "s7gA":
/*!***************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/components/context/model/index.ts ***!
  \***************************************************************************************/
/*! exports provided: RxContextTemplateNames */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _view_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view-context */ "po7g");
/* empty/unused harmony star reexport *//* harmony import */ var _template_names__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./template-names */ "abvE");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxContextTemplateNames", function() { return _template_names__WEBPACK_IMPORTED_MODULE_1__["RxContextTemplateNames"]; });





/***/ }),

/***/ "sBpO":
/*!*******************************************************!*\
  !*** ./libs/cdk/src/lib/template-management/model.ts ***!
  \*******************************************************/
/*! exports provided: RxBaseTemplateNames */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RxBaseTemplateNames", function() { return RxBaseTemplateNames; });
var RxBaseTemplateNames;
(function (RxBaseTemplateNames) {
    RxBaseTemplateNames["error"] = "errorTpl";
    RxBaseTemplateNames["complete"] = "completeTpl";
    RxBaseTemplateNames["suspense"] = "suspenseTpl";
})(RxBaseTemplateNames || (RxBaseTemplateNames = {}));


/***/ }),

/***/ "sTai":
/*!****************************************************************!*\
  !*** ./libs/cdk/src/lib/zone-less/rxjs/scheduler/asap/asap.ts ***!
  \****************************************************************/
/*! exports provided: asap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "asap", function() { return asap; });
/* harmony import */ var _AsapAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AsapAction */ "YgUy");
/* harmony import */ var _AsapScheduler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AsapScheduler */ "tdHs");
// tslint:disable file-name-casing


/**
 *
 * NOTE: This is a zone un-patched version of rxjs asapScheduler
 *
 * Asap Scheduler
 *
 * <span class="informal">Perform task as fast as it can be performed asynchronously</span>
 *
 * `asap` scheduler behaves the same as {@link asyncScheduler} scheduler when you use it to delay task
 * in time. If however you set delay to `0`, `asap` will wait for current synchronously executing
 * code to end and then it will try to execute given task as fast as possible.
 *
 * `asap` scheduler will do its best to minimize time between end of currently executing code
 * and start of scheduled task. This makes it best candidate for performing so called "deferring".
 * Traditionally this was achieved by calling `setTimeout(deferredTask, 0)`, but that technique involves
 * some (although minimal) unwanted delay.
 *
 * Note that using `asap` scheduler does not necessarily mean that your task will be first to process
 * after currently executing code. In particular, if some task was also scheduled with `asap` before,
 * that task will execute first. That being said, if you need to schedule task asynchronously, but
 * as soon as possible, `asap` scheduler is your best bet.
 *
 * ## Example
 * Compare async and asap scheduler<
 * ```ts
 * import { asapScheduler, asyncScheduler } from '@cu/perf-utils';
 *
 * asyncScheduler.schedule(() => console.log('async')); // scheduling 'async' first...
 * asapScheduler.schedule(() => console.log('asap'));
 *
 * // Logs:
 * // "asap"
 * // "async"
 * // ... but 'asap' goes first!
 * ```
 */
const asap = new _AsapScheduler__WEBPACK_IMPORTED_MODULE_1__["AsapScheduler"](_AsapAction__WEBPACK_IMPORTED_MODULE_0__["AsapAction"]);


/***/ }),

/***/ "tIiS":
/*!*************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/pipes/memo/index.ts ***!
  \*************************************************************************/
/*! exports provided: getMemoizedFn, MemoModule, MemoPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _memo_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./memo-map */ "/NyO");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getMemoizedFn", function() { return _memo_map__WEBPACK_IMPORTED_MODULE_0__["getMemoizedFn"]; });

/* harmony import */ var _memo_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./memo.module */ "AUbq");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MemoModule", function() { return _memo_module__WEBPACK_IMPORTED_MODULE_1__["MemoModule"]; });

/* harmony import */ var _memo_pipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./memo.pipe */ "DtWl");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MemoPipe", function() { return _memo_pipe__WEBPACK_IMPORTED_MODULE_2__["MemoPipe"]; });






/***/ }),

/***/ "tJkR":
/*!*******************************************************************!*\
  !*** ./libs/state/src/lib/transformation-helpers/array/insert.ts ***!
  \*******************************************************************/
/*! exports provided: insert */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "insert", function() { return insert; });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core */ "jym9");

/**
 * @description
 * Inserts one or multiple items to an array T[].
 * Returns a shallow copy of the updated array T[], and does not mutate the original one.
 *
 * @example
 * // Inserting single value
 *
 * const creatures = [{id: 1, type: 'cat'}, {id: 2, type: 'dog'}];
 *
 * const updatedCreatures = insert(creatures, {id: 3, type: 'parrot'});
 *
 * // updatedCreatures will be:
 * //  [{id: 1, type: 'cat'}, {id: 2, type: 'dog}, {id: 3, type: 'parrot}];
 *
 * @example
 * // Inserting multiple values
 *
 * const creatures = [{id: 1, type: 'cat'}, {id: 2, type: 'dog'}];
 *
 * const updatedCreatures = insert(creatures, [{id: 3, type: 'parrot'}, {id: 4, type: 'hamster'}]);
 *
 * // updatedCreatures will be:
 * // [{id: 1, type: 'cat'}, {id: 2, type: 'dog'}, {id: 3, type: 'parrot'}, {id: 4, type: 'hamster'}];
 *
 * @example
 * // Usage with RxState
 *
 * export class ListComponent {
 *
 *    readonly insertCreature$ = new Subject<void>();
 *
 *    constructor(private state: RxState<ComponentState>) {
 *      // Reactive implementation
 *      state.connect(
 *        'creatures',
 *        this.insertCreature$,
 *        ({ creatures }) => {
 *            const creatureToAdd = {id: generateId(), name: 'newCreature', type: 'dinosaur' };
 *            return insert(creatures, creatureToAdd);
 *        }
 *      );
 *    }
 *
 *    // Imperative implementation
 *    insertCeature(): void {
 *        const creatureToAdd = {id: generateId(), name: 'newCreature', type: 'dinosaur' };
 *        this.state.set({ creatures: insert(this.state.get().creatures, creatureToAdd)});
 *    }
 * }
 *
 *
 * @returns T[]
 *
 * @docsPage insert
 * @docsCategory transformation-helpers
 */
function insert(source, updates) {
    const updatesDefined = Object(_core__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(updates);
    const sourceIsArray = Array.isArray(source);
    const invalidInput = !sourceIsArray && !updatesDefined;
    if (!sourceIsArray && Object(_core__WEBPACK_IMPORTED_MODULE_0__["isDefined"])(source)) {
        console.warn(`Insert: Original value (${source}) is not an array.`);
    }
    if (invalidInput) {
        return source;
    }
    return [
        ...(sourceIsArray ? source : []),
        ...(updatesDefined ? (Array.isArray(updates) ? updates : [updates]) : [])
    ];
}


/***/ }),

/***/ "tdHs":
/*!*************************************************************************!*\
  !*** ./libs/cdk/src/lib/zone-less/rxjs/scheduler/asap/AsapScheduler.ts ***!
  \*************************************************************************/
/*! exports provided: AsapScheduler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AsapScheduler", function() { return AsapScheduler; });
/* harmony import */ var _async_AsyncScheduler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../async/AsyncScheduler */ "QFH2");

class AsapScheduler extends _async_AsyncScheduler__WEBPACK_IMPORTED_MODULE_0__["AsyncScheduler"] {
    flush(action) {
        this.active = true;
        this.scheduled = undefined;
        const { actions } = this;
        let error;
        let index = -1;
        let count = actions.length;
        action = action || actions.shift();
        do {
            if ((error = action.execute(action.state, action.delay))) {
                break;
            }
        } while (++index < count && (action = actions.shift()));
        this.active = false;
        if (error) {
            while (++index < count && (action = actions.shift())) {
                action.unsubscribe();
            }
            throw error;
        }
    }
}


/***/ }),

/***/ "tqvG":
/*!******************************************************************!*\
  !*** ./apps/demos/src/app/features/template/pipes/pipes.menu.ts ***!
  \******************************************************************/
/*! exports provided: MENU_ITEMS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MENU_ITEMS", function() { return MENU_ITEMS; });
const MENU_ITEMS = [
    {
        label: 'Push Pipe Poc',
        link: 'push'
    },
    {
        label: 'Memo Pipe Poc',
        link: 'memo'
    },
    {
        label: 'Pipe Pipe Poc',
        link: 'pipe'
    }
];


/***/ }),

/***/ "u+Ph":
/*!****************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/coalescing-manager.ts ***!
  \****************************************************************************/
/*! exports provided: coalescingManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "coalescingManager", function() { return coalescingManager; });
/* harmony import */ var _properties_weakmap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./properties-weakmap */ "aljK");

const coalescingManager = createCoalesceManager();
const coalescingContextPropertiesMap = Object(_properties_weakmap__WEBPACK_IMPORTED_MODULE_0__["createPropertiesWeakMap"])((ctx) => ({
    numCoalescingSubscribers: 0
}));
/**
 * @describe createCoalesceManager
 *
 * returns a
 * Maintains a weak map of component references ans flags
 * them if the coalescing process is already started for them.
 *
 * Used in render aware internally.
 */
function createCoalesceManager() {
    return {
        decrement,
        increment,
        isCoalescing
    };
    // Decrements the number of subscriptions in a scope e.g. a class instance
    function decrement(scope) {
        const numCoalescingSubscribers = coalescingContextPropertiesMap
            .getProps(scope).numCoalescingSubscribers - 1;
        coalescingContextPropertiesMap
            .setProps(scope, { numCoalescingSubscribers: numCoalescingSubscribers >= 0 ? numCoalescingSubscribers : 0 });
    }
    // Increments the number of subscriptions in a scope e.g. a class instance
    function increment(scope) {
        const numCoalescingSubscribers = coalescingContextPropertiesMap
            .getProps(scope).numCoalescingSubscribers + 1;
        coalescingContextPropertiesMap
            .setProps(scope, { numCoalescingSubscribers });
    }
    // Checks if anybody else is already coalescing atm (number > 0)
    function isCoalescing(scope) {
        return (coalescingContextPropertiesMap
            .getProps(scope).numCoalescingSubscribers > 0);
    }
}


/***/ }),

/***/ "uBKf":
/*!***********************************************!*\
  !*** ./apps/demos/src/app/app-shell/index.ts ***!
  \***********************************************/
/*! exports provided: AppShellModule, AppShellSidenavContent, AppShellHeaderContent, AppShellSidenavTitle, AppShellComponent, AppShellSideNavComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_shell_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-shell.module */ "IIuQ");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppShellModule", function() { return _app_shell_module__WEBPACK_IMPORTED_MODULE_0__["AppShellModule"]; });

/* harmony import */ var _app_shell_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-shell.models */ "Bj6Z");
/* empty/unused harmony star reexport *//* harmony import */ var _app_shell_content_directives__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-shell-content.directives */ "wM/s");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppShellSidenavContent", function() { return _app_shell_content_directives__WEBPACK_IMPORTED_MODULE_2__["AppShellSidenavContent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppShellHeaderContent", function() { return _app_shell_content_directives__WEBPACK_IMPORTED_MODULE_2__["AppShellHeaderContent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppShellSidenavTitle", function() { return _app_shell_content_directives__WEBPACK_IMPORTED_MODULE_2__["AppShellSidenavTitle"]; });

/* harmony import */ var _app_shell_component_app_shell_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-shell-component/app-shell.component */ "dp3i");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppShellComponent", function() { return _app_shell_component_app_shell_component__WEBPACK_IMPORTED_MODULE_3__["AppShellComponent"]; });

/* harmony import */ var _side_nav_side_nav_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./side-nav/side-nav.component */ "+T49");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppShellSideNavComponent", function() { return _side_nav_side_nav_component__WEBPACK_IMPORTED_MODULE_4__["AppShellSideNavComponent"]; });








/***/ }),

/***/ "uOTR":
/*!*******************************************************************!*\
  !*** ./libs/state/src/lib/transformation-helpers/object/index.ts ***!
  \*******************************************************************/
/*! exports provided: deleteProp, dictionaryToArray, patch, setProp, toggle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _deleteProp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./deleteProp */ "JjNP");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deleteProp", function() { return _deleteProp__WEBPACK_IMPORTED_MODULE_0__["deleteProp"]; });

/* harmony import */ var _dictionaryToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dictionaryToArray */ "Qn8Q");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dictionaryToArray", function() { return _dictionaryToArray__WEBPACK_IMPORTED_MODULE_1__["dictionaryToArray"]; });

/* harmony import */ var _patch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./patch */ "US9D");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "patch", function() { return _patch__WEBPACK_IMPORTED_MODULE_2__["patch"]; });

/* harmony import */ var _setProp__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./setProp */ "fVh8");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setProp", function() { return _setProp__WEBPACK_IMPORTED_MODULE_3__["setProp"]; });

/* harmony import */ var _toggle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./toggle */ "HU3c");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toggle", function() { return _toggle__WEBPACK_IMPORTED_MODULE_4__["toggle"]; });








/***/ }),

/***/ "uV5/":
/*!************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/view-constants.ts ***!
  \************************************************************************/
/*! exports provided: HOST, TVIEW, FLAGS, PARENT, NEXT, TRANSPLANTED_VIEWS_TO_REFRESH, T_HOST, CLEANUP, L_CONTAINER_NATIVE, CONTEXT, INJECTOR, RENDERER_FACTORY, RENDERER, SANITIZER, CHILD_HEAD, CHILD_TAIL, DECLARATION_VIEW, DECLARATION_COMPONENT_VIEW, DECLARATION_LCONTAINER, PREORDER_HOOK_FLAGS, QUERIES, HEADER_OFFSET */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HOST", function() { return HOST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TVIEW", function() { return TVIEW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FLAGS", function() { return FLAGS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PARENT", function() { return PARENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NEXT", function() { return NEXT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TRANSPLANTED_VIEWS_TO_REFRESH", function() { return TRANSPLANTED_VIEWS_TO_REFRESH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "T_HOST", function() { return T_HOST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLEANUP", function() { return CLEANUP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "L_CONTAINER_NATIVE", function() { return L_CONTAINER_NATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONTEXT", function() { return CONTEXT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INJECTOR", function() { return INJECTOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RENDERER_FACTORY", function() { return RENDERER_FACTORY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RENDERER", function() { return RENDERER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SANITIZER", function() { return SANITIZER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHILD_HEAD", function() { return CHILD_HEAD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHILD_TAIL", function() { return CHILD_TAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DECLARATION_VIEW", function() { return DECLARATION_VIEW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DECLARATION_COMPONENT_VIEW", function() { return DECLARATION_COMPONENT_VIEW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DECLARATION_LCONTAINER", function() { return DECLARATION_LCONTAINER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PREORDER_HOOK_FLAGS", function() { return PREORDER_HOOK_FLAGS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QUERIES", function() { return QUERIES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HEADER_OFFSET", function() { return HEADER_OFFSET; });
// Below are constants for LView indices to help us look up LView members
// without having to remember the specific indices.
// Uglify will inline these when minifying so there shouldn't be a cost.
const HOST = 0;
const TVIEW = 1;
const FLAGS = 2;
const PARENT = 3;
const NEXT = 4;
const TRANSPLANTED_VIEWS_TO_REFRESH = 5;
const T_HOST = 6;
const CLEANUP = 7;
const L_CONTAINER_NATIVE = 7;
const CONTEXT = 8;
const INJECTOR = 9;
const RENDERER_FACTORY = 10;
const RENDERER = 11;
const SANITIZER = 12;
const CHILD_HEAD = 13;
const CHILD_TAIL = 14;
// FIXME(misko): Investigate if the three declarations aren't all same thing.
const DECLARATION_VIEW = 15;
const DECLARATION_COMPONENT_VIEW = 16;
const DECLARATION_LCONTAINER = 17;
const PREORDER_HOOK_FLAGS = 18;
const QUERIES = 19;
/**
 * Size of LView's header. Necessary to adjust for it when setting slots.
 *
 * IMPORTANT: `HEADER_OFFSET` should only be referred to the in the `ɵɵ*` instructions to translate
 * instruction index into `LView` index. All other indexes should be in the `LView` index space and
 * there should be no need to refer to `HEADER_OFFSET` anywhere else.
 */
const HEADER_OFFSET = 20;


/***/ }),

/***/ "uloo":
/*!**************************************************!*\
  !*** ./apps/demos/src/app/app-config.service.ts ***!
  \**************************************************/
/*! exports provided: AppConfigService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppConfigService", function() { return AppConfigService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _rx_angular_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @rx-angular/state */ "YYsp");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../environments/environment */ "aLPm");
/* harmony import */ var _rx_angular_pocs_cdk_utils_zone_agnostic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rx-angular-pocs/cdk/utils/zone-agnostic */ "j2tN");





class AppConfigService extends _rx_angular_state__WEBPACK_IMPORTED_MODULE_1__["RxState"] {
    constructor(appRef, ngZone) {
        super();
        this.appRef = appRef;
        this.ngZone = ngZone;
        this.$ = this.select();
        this.expanded = !Object(_rx_angular_pocs_cdk_utils_zone_agnostic__WEBPACK_IMPORTED_MODULE_3__["isNgZone"])(this.ngZone);
        this.env = _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"];
        this.hasZone = Object(_rx_angular_pocs_cdk_utils_zone_agnostic__WEBPACK_IMPORTED_MODULE_3__["isNgZone"])(this.ngZone);
        this.devMode = !_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].production;
        this.zoneEnv = this.hasZone ? 'NgZone' : 'NgNoopZone';
        this.set({
            rippleOn: false,
            strategy: 'local'
        });
    }
    appRef_tick() {
        this.appRef.tick();
    }
}
AppConfigService.ɵfac = function AppConfigService_Factory(t) { return new (t || AppConfigService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ApplicationRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"])); };
AppConfigService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: AppConfigService, factory: AppConfigService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "uq4C":
/*!***************************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/directives/switch/rx-switch-case.directive.ts ***!
  \***************************************************************************************************/
/*! exports provided: RxSwitchCase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RxSwitchCase", function() { return RxSwitchCase; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _rx_switch_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rx-switch.directive */ "QfxS");






// tslint:disable-next-line:directive-selector
class RxSwitchCase {
    constructor(viewContainer, templateRef, cdRef, rxSwitch) {
        this.viewContainer = viewContainer;
        this.templateRef = templateRef;
        this.cdRef = cdRef;
        this.rxSwitch = rxSwitch;
        this.subscription = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subscription"]();
        this.inserted = false;
        this.rxSwitchCaseWorkFactory = (value, work) => {
            var _a;
            if (value) {
                if (!this.inserted) {
                    this.viewContainer.insert(this._view, 0);
                    this.inserted = true;
                }
            }
            else {
                if (this._view && this.inserted) {
                    this.viewContainer.detach(0);
                    this.inserted = false;
                }
            }
            this._view.context.$implicit = this.caseValue;
            work(this._view, this._view);
            work(this.cdRef, ((_a = this.cdRef) === null || _a === void 0 ? void 0 : _a.context) || this.cdRef);
        };
    }
    set rxSwitchCaseValue(v) {
        this.caseValue = v;
    }
    set rxSwitchCase(v) {
        this.caseValue = v;
    }
    ngOnInit() {
        this.createView();
        this.subscription = this.rxSwitch.values$
            .pipe(
        // tslint:disable-next-line:triple-equals
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])((switchValue) => this.caseValue === switchValue), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["distinctUntilChanged"])())
            .subscribe({ error: console.log });
    }
    ngOnDestroy() {
        this.viewContainer.clear();
        this.subscription.unsubscribe();
    }
    createView() {
        this._view = this.viewContainer.createEmbeddedView(this.templateRef, { $implicit: this.caseValue }, 0);
        this.viewContainer.detach(0);
    }
}
RxSwitchCase.ɵfac = function RxSwitchCase_Factory(t) { return new (t || RxSwitchCase)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_rx_switch_directive__WEBPACK_IMPORTED_MODULE_3__["RxSwitch"], 1)); };
RxSwitchCase.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: RxSwitchCase, selectors: [["", "rxSwitchCase", ""]], inputs: { rxSwitchCaseValue: "rxSwitchCaseValue", rxSwitchCase: "rxSwitchCase" } });


/***/ }),

/***/ "urvc":
/*!*************************************************************!*\
  !*** ./libs/cdk/src/lib/zone-less/rxjs/scheduler/Action.ts ***!
  \*************************************************************/
/*! exports provided: Action */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Action", function() { return Action; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
// tslint:disable

/**
 * A unit of work to be executed in a `scheduler`. An action is typically
 * created from within a {@link SchedulerLike} and an RxJS user does not need to concern
 * themselves about creating and manipulating an Action.
 *
 * ```ts
 * class Action<T> extends Subscription {
 *   new (scheduler: Scheduler, work: (state?: T) => void);
 *   schedule(state?: T, delay: number = 0): Subscription;
 * }
 * ```
 *
 * @class Action<T>
 */
class Action extends rxjs__WEBPACK_IMPORTED_MODULE_0__["Subscription"] {
    constructor(scheduler, work) {
        super();
    }
    /**
     * Schedules this action on its parent {@link SchedulerLike} for execution. May be passed
     * some context object, `state`. May happen at some point in the future,
     * according to the `delay` parameter, if specified.
     * @param {T} [state] Some contextual data that the `work` function uses when
     * called by the Scheduler.
     * @param {number} [delay] Time to wait before executing the work, where the
     * time unit is implicit and defined by the Scheduler.
     * @return {void}
     */
    schedule(state, delay = 0) {
        return this;
    }
}


/***/ }),

/***/ "v1iz":
/*!*************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/directives/for/rx-for.module.ts ***!
  \*************************************************************************************/
/*! exports provided: RxForModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RxForModule", function() { return RxForModule; });
/* harmony import */ var _rx_for_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rx-for.directive */ "LriG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


const DECLARATIONS = [
    _rx_for_directive__WEBPACK_IMPORTED_MODULE_0__["RxFor"]
];
class RxForModule {
}
RxForModule.ɵfac = function RxForModule_Factory(t) { return new (t || RxForModule)(); };
RxForModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: RxForModule });
RxForModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](RxForModule, { declarations: [_rx_for_directive__WEBPACK_IMPORTED_MODULE_0__["RxFor"]], exports: [_rx_for_directive__WEBPACK_IMPORTED_MODULE_0__["RxFor"]] }); })();


/***/ }),

/***/ "v5z+":
/*!*******************************************************************************!*\
  !*** ./apps/demos/src/app/features/experiments/decorators/decorators.menu.ts ***!
  \*******************************************************************************/
/*! exports provided: DECORATORS_MENU_ITEMS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DECORATORS_MENU_ITEMS", function() { return DECORATORS_MENU_ITEMS; });
const DECORATORS_MENU_ITEMS = [
    {
        link: 'stateful',
        label: 'RxStateful',
    },
];


/***/ }),

/***/ "v95w":
/*!**********************************************************************!*\
  !*** ./apps/demos/src/app/shared/debug-helper/dirty-checks/index.ts ***!
  \**********************************************************************/
/*! exports provided: DirtyChecksModule, DirtyChecksComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dirty_checks_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dirty-checks.module */ "+8mr");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DirtyChecksModule", function() { return _dirty_checks_module__WEBPACK_IMPORTED_MODULE_0__["DirtyChecksModule"]; });

/* harmony import */ var _dirty_checks_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dirty-checks.component */ "qnLR");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DirtyChecksComponent", function() { return _dirty_checks_component__WEBPACK_IMPORTED_MODULE_1__["DirtyChecksComponent"]; });





/***/ }),

/***/ "vX4F":
/*!********************************************************************!*\
  !*** ./apps/demos/src/app/features/template/rx-let/rx-let.menu.ts ***!
  \********************************************************************/
/*! exports provided: MENU_ITEMS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MENU_ITEMS", function() { return MENU_ITEMS; });
const MENU_ITEMS = [
    {
        label: 'Basic',
        link: 'basic'
    },
    {
        label: 'Error Handling',
        link: 'error-handling'
    },
    {
        label: 'Http Errors',
        link: 'http-errors'
    },
    {
        label: '*ngif hack',
        link: 'ng-if-hack'
    },
    {
        label: 'Template Bindings',
        link: 'template-bindings'
    },
    {
        label: 'Preloading Techniques',
        link: 'preloading-images'
    },
    {
        label: 'Lazy Components',
        link: 'lazy-components'
    }
];


/***/ }),

/***/ "veNg":
/*!*************************************************************!*\
  !*** ./libs/cdk/src/lib/zone-less/rxjs/observable/utils.ts ***!
  \*************************************************************/
/*! exports provided: isNumeric, isScheduler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNumeric", function() { return isNumeric; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isScheduler", function() { return isScheduler; });
function isNumeric(val) {
    // parseFloat NaNs numeric-cast false positives (null|true|false|"")
    // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
    // subtraction forces infinities to NaN
    // adding 1 corrects loss of precision from parseFloat (#15100)
    return !Array.isArray(val) && val - parseFloat(val) + 1 >= 0;
}
function isScheduler(value) {
    return value && typeof value.schedule === 'function';
}


/***/ }),

/***/ "vjt/":
/*!*********************************************************************!*\
  !*** ./apps/demos/src/app/app-component/app-control-panel/index.ts ***!
  \*********************************************************************/
/*! exports provided: AppControlPanelComponent, AppControlPanelModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_control_panel_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-control-panel.component */ "HXgo");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppControlPanelComponent", function() { return _app_control_panel_component__WEBPACK_IMPORTED_MODULE_0__["AppControlPanelComponent"]; });

/* harmony import */ var _app_control_panel_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-control-panel.module */ "1n3h");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppControlPanelModule", function() { return _app_control_panel_module__WEBPACK_IMPORTED_MODULE_1__["AppControlPanelModule"]; });





/***/ }),

/***/ "vvAe":
/*!****************************************************************************!*\
  !*** ./apps/demos/src/app/features/template/rx-context/rx-context.menu.ts ***!
  \****************************************************************************/
/*! exports provided: MENU_ITEMS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MENU_ITEMS", function() { return MENU_ITEMS; });
const MENU_ITEMS = [
    {
        label: 'rxContext',
        link: ''
    }
];


/***/ }),

/***/ "w1UF":
/*!*********************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/rxjs/observable/stateful-observable.ts ***!
  \*********************************************************************************************/
/*! exports provided: createAccumulationObservable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createAccumulationObservable", function() { return createAccumulationObservable; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");


const defaultAccumulator = (st, sl) => {
    return Object.assign(Object.assign({}, st), sl);
};
function createAccumulationObservable(stateObservables = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"](), stateSlices = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"](), accumulatorObservable = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"](defaultAccumulator)) {
    const signal$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["merge"])(stateObservables.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["mergeAll"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["observeOn"])(rxjs__WEBPACK_IMPORTED_MODULE_0__["queueScheduler"])), stateSlices.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["observeOn"])(rxjs__WEBPACK_IMPORTED_MODULE_0__["queueScheduler"]))).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["withLatestFrom"])(accumulatorObservable.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["observeOn"])(rxjs__WEBPACK_IMPORTED_MODULE_0__["queueScheduler"]))), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["scan"])((state, [slice, stateAccumulator]) => stateAccumulator(state, slice), {}), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])((newState) => (compositionObservable.state = newState), (error) => console.error(error)), 
    // @Notice We catch the error here as it get lost in between `publish` and `publishReplay`. We return empty to
    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])((e) => rxjs__WEBPACK_IMPORTED_MODULE_0__["EMPTY"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["publish"])());
    const state$ = signal$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["publishReplay"])(1));
    const compositionObservable = {
        state: {},
        signal$,
        state$,
        nextSlice,
        nextSliceObservable,
        nextAccumulator,
        subscribe,
    };
    // ======
    return compositionObservable;
    // ======
    function nextAccumulator(accumulatorFn) {
        accumulatorObservable.next(accumulatorFn);
    }
    function nextSlice(stateSlice) {
        stateSlices.next(stateSlice);
    }
    function nextSliceObservable(stateObservable) {
        stateObservables.next(stateObservable);
    }
    function subscribe() {
        const sub = compositionObservable.signal$.connect();
        sub.add(compositionObservable.state$.connect());
        sub.add(() => {
            accumulatorObservable.complete();
            stateObservables.complete();
            stateSlices.complete();
        });
        return sub;
    }
}


/***/ }),

/***/ "wM/s":
/*!**********************************************************************!*\
  !*** ./apps/demos/src/app/app-shell/app-shell-content.directives.ts ***!
  \**********************************************************************/
/*! exports provided: AppShellSidenavContent, AppShellHeaderContent, AppShellSidenavTitle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppShellSidenavContent", function() { return AppShellSidenavContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppShellHeaderContent", function() { return AppShellHeaderContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppShellSidenavTitle", function() { return AppShellSidenavTitle; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class AppShellSidenavContent {
}
AppShellSidenavContent.ɵfac = function AppShellSidenavContent_Factory(t) { return new (t || AppShellSidenavContent)(); };
AppShellSidenavContent.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: AppShellSidenavContent, selectors: [["", "rxaAppShellSidenavContent", ""]] });
class AppShellHeaderContent {
}
AppShellHeaderContent.ɵfac = function AppShellHeaderContent_Factory(t) { return new (t || AppShellHeaderContent)(); };
AppShellHeaderContent.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: AppShellHeaderContent, selectors: [["", "rxaAppShellHeaderContent", ""]] });
class AppShellSidenavTitle {
}
AppShellSidenavTitle.ɵfac = function AppShellSidenavTitle_Factory(t) { return new (t || AppShellSidenavTitle)(); };
AppShellSidenavTitle.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: AppShellSidenavTitle, selectors: [["", "rxaAppShellSidenavTitle", ""]] });


/***/ }),

/***/ "wOjG":
/*!**********************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/directives/if/model/index.ts ***!
  \**********************************************************************************/
/*! exports provided: RxIfTemplateNames */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _view_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view-context */ "ZmhG");
/* empty/unused harmony star reexport *//* harmony import */ var _template_names__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./template-names */ "TqA6");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RxIfTemplateNames", function() { return _template_names__WEBPACK_IMPORTED_MODULE_1__["RxIfTemplateNames"]; });





/***/ }),

/***/ "x+ba":
/*!******************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/template/directives/let/model/view-context.ts ***!
  \******************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "x8G/":
/*!****************************************************************!*\
  !*** ./libs/cdk/src/lib/zone-less/rxjs/scheduler/Scheduler.ts ***!
  \****************************************************************/
/*! exports provided: nowFn, Scheduler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nowFn", function() { return nowFn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Scheduler", function() { return Scheduler; });
function nowFn() {
    const fn = () => Date.now();
    return fn;
}
/**
 * An execution context and a data structure to order tasks and schedule their
 * execution. Provides a notion of (potentially virtual) time, through the
 * `now()` getter method.
 *
 * Each unit of work in a Scheduler is called an `Action`.
 *
 * ```ts
 * class Scheduler {
 *   now(): number;
 *   schedule(work, delay?, state?): Subscription;
 * }
 * ```
 *
 * @class Scheduler
 * @deprecated Scheduler is an internal implementation detail of RxJS, and
 * should not be used directly. Rather, create your own class and implement
 * {@link SchedulerLike}
 */
class Scheduler {
    constructor(SchedulerAction, now = Scheduler.now) {
        this.SchedulerAction = SchedulerAction;
        this.now = now;
    }
    /**
     * Schedules a function, `work`, for execution. May happen at some point in
     * the future, according to the `delay` parameter, if specified. May be passed
     * some context object, `state`, which will be passed to the `work` function.
     *
     * The given arguments will be processed an stored as an Action object in a
     * queue of actions.
     *
     * @param {function(state: ?T): ?Subscription} work A function representing a
     * task, or some unit of work to be executed by the Scheduler.
     * @param {number} [delay] Time to wait before executing the work, where the
     * time unit is implicit and defined by the Scheduler itself.
     * @param {T} [state] Some contextual data that the `work` function uses when
     * called by the Scheduler.
     * @return {Subscription} A subscription in order to be able to unsubscribe
     * the scheduled work.
     */
    schedule(work, delay = 0, state) {
        return new this.SchedulerAction(this, work).schedule(state, delay);
    }
}
/**
 * Note: the extra arrow function wrapper is to make testing by overriding
 * Date.now easier.
 * @nocollapse
 */
Scheduler.now = nowFn();


/***/ }),

/***/ "xZVK":
/*!***********************************************************************!*\
  !*** ./libs/state/src/lib/rxjs/operators/distinctUntilSomeChanged.ts ***!
  \***********************************************************************/
/*! exports provided: distinctUntilSomeChanged */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distinctUntilSomeChanged", function() { return distinctUntilSomeChanged; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _core_utils_safe_pluck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/utils/safe-pluck */ "Hr6l");


/**
 * @internal
 */
function defaultCompare(oldVal, newVal) {
    return oldVal === newVal;
}
/**
 * @description
 *
 * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from
 * the previous item. Comparison will be done for each set key in the `keys` array.
 *
 * You can fine grain your distinct checks by providing a `KeyCompareMap` with those keys you want to compute
 * explicitly different
 *
 * The name `distinctUntilSomeChanged` was picked since it internally iterates over the `keys` and utilizes the
 * [some](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/some) method in order to
 * compute if values are distinct or not.
 *
 * @example
 *
 * import { of } from 'rxjs';
 * import { distinctUntilSomeChanged } from 'rx-angular/state';
 *
 * interface Person {
 *    age: number;
 *    name: string;
 * }
 *
 * of(
 *   { age: 4, name: 'Hans'},
 *   { age: 7, name: 'Sophie'},
 *   { age: 5, name: 'Han Solo'},
 *   { age: 5, name: 'HanSophie'},
 * ).pipe(
 *   distinctUntilSomeChanged(['age', 'name']),
 * )
 * .subscribe(x => console.log(x));
 *
 * // displays:
 * // { age: 4, name: 'Hans'}
 * // { age: 7, name: 'Sophie'}
 * // { age: 5, name: 'Han Solo'}
 * // { age: 5, name: 'HanSophie'}
 *
 * @example
 * // An example with `KeyCompareMap`
 * import { of } from 'rxjs';
 * import { distinctUntilSomeChanged } from 'rxjs/operators';
 *
 * interface Person {
 *     age: number;
 *     name: string;
 *  }
 * const customComparison: KeyCompareMap<Person> = {
 *   name: (oldName, newName) => oldName.substring(0, 2) === newName.substring(0, 2)
 * };
 *
 * of(
 *     { age: 4, name: 'Hans'},
 *     { age: 7, name: 'Sophie'},
 *     { age: 5, name: 'Han Solo'},
 *     { age: 5, name: 'HanSophie'},
 *   ).pipe(
 *     distinctUntilSomeChanged(['age', 'name'], customComparison),
 *   )
 *   .subscribe(x => console.log(x));
 *
 * // displays:
 * // { age: 4, name: 'Hans' }
 * // { age: 7, name: 'Sophie' }
 * // { age: 5, name: 'Han Solo' }
 *
 * @param {K[]} keys String key for object property lookup on each item.
 * @param {KeyCompareMap<T>} [compare] Optional KeyCompareMap to explicitly define comparisons for some of the keys
 * @docsPage distinctUntilSomeChanged
 * @docsCategory operators
 */
function distinctUntilSomeChanged(keys, keyCompareMap) {
    // default compare function applying === to every key
    let distinctCompare = (oldState, newState) => keys.some((key) => !defaultCompare(Object(_core_utils_safe_pluck__WEBPACK_IMPORTED_MODULE_1__["safePluck"])(oldState, [key]), Object(_core_utils_safe_pluck__WEBPACK_IMPORTED_MODULE_1__["safePluck"])(newState, [key])));
    // generate compare function respecting every case of provided keyCompareMap
    if (keyCompareMap !== undefined) {
        const compare = (key) => {
            return keyCompareMap.hasOwnProperty(key) &&
                keyCompareMap[key] !== undefined
                ? keyCompareMap[key]
                : defaultCompare;
        };
        distinctCompare = (oldState, newState) => {
            return keys.some((key) => !compare(key)(Object(_core_utils_safe_pluck__WEBPACK_IMPORTED_MODULE_1__["safePluck"])(oldState, [key]), Object(_core_utils_safe_pluck__WEBPACK_IMPORTED_MODULE_1__["safePluck"])(newState, [key])));
        };
    }
    return Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["distinctUntilChanged"])((oldV, newV) => !distinctCompare(oldV, newV));
}


/***/ }),

/***/ "xahO":
/*!********************************************************!*\
  !*** ./libs/cdk/src/lib/utils/coerceObservableWith.ts ***!
  \********************************************************/
/*! exports provided: coerceObservableWith */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "coerceObservableWith", function() { return coerceObservableWith; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _coerceObservable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./coerceObservable */ "rTNW");


/**
 * This operator maps an Observable out of a static value or ObservableInput.
 *
 */
function coerceObservableWith() {
    return (o$) => Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(_coerceObservable__WEBPACK_IMPORTED_MODULE_1__["coerceObservable"])(o$);
}


/***/ }),

/***/ "xuXX":
/*!****************************************************************!*\
  !*** ./libs/template/src/lib/core/utils/coalescing-manager.ts ***!
  \****************************************************************/
/*! exports provided: coalescingManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "coalescingManager", function() { return coalescingManager; });
/* harmony import */ var _properties_weakmap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./properties-weakmap */ "NvUZ");

const coalescingManager = createCoalesceManager();
const coalescingContextPropertiesMap = Object(_properties_weakmap__WEBPACK_IMPORTED_MODULE_0__["createPropertiesWeakMap"])((ctx) => ({
    numCoalescingSubscribers: 0
}));
/**
 * @describe createCoalesceManager
 *
 * returns a
 * Maintains a weak map of component references ans flags
 * them if the coalescing process is already started for them.
 *
 * Used in render aware internally.
 */
function createCoalesceManager() {
    return {
        remove: removeWork,
        add: addWork,
        isCoalescing
    };
    // Increments the number of subscriptions in a scope e.g. a class instance
    function removeWork(scope) {
        const numCoalescingSubscribers = coalescingContextPropertiesMap.getProps(scope).numCoalescingSubscribers - 1;
        coalescingContextPropertiesMap.setProps(scope, {
            numCoalescingSubscribers: numCoalescingSubscribers >= 0 ? numCoalescingSubscribers : 0
        });
    }
    // Decrements the number of subscriptions in a scope e.g. a class instance
    function addWork(scope) {
        const numCoalescingSubscribers = coalescingContextPropertiesMap.getProps(scope).numCoalescingSubscribers +
            1;
        coalescingContextPropertiesMap.setProps(scope, {
            numCoalescingSubscribers
        });
    }
    // Checks if anybody else is already coalescing atm
    function isCoalescing(scope) {
        return (coalescingContextPropertiesMap.getProps(scope).numCoalescingSubscribers >
            0);
    }
}


/***/ }),

/***/ "yLET":
/*!******************************************************************!*\
  !*** ./apps/demos/src/app/features/template/rx-if/rx-if.menu.ts ***!
  \******************************************************************/
/*! exports provided: MENU_ITEMS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MENU_ITEMS", function() { return MENU_ITEMS; });
const MENU_ITEMS = [
    {
        label: 'If Basic',
        link: ''
    }
];


/***/ }),

/***/ "yluw":
/*!************************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/zone-agnostic/rxjs/observable/interval.ts ***!
  \************************************************************************************************/
/*! exports provided: interval, isArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "interval", function() { return interval; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArray", function() { return isArray; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _schedulers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../schedulers */ "Lifd");


/**
 * Creates an Observable that emits sequential numbers every specified
 * interval of time, on a specified {@link SchedulerLike}.
 *
 * <span class="informal">Emits incremental numbers periodically in time.
 * </span>
 *
 * ![](interval.png)
 *
 * `interval` returns an Observable that emits an infinite sequence of
 * ascending integers, with a constant interval of time of your choosing
 * between those emissions. The first emission is not sent immediately, but
 * only after the first period has passed. By default, this operator uses the
 * `async` {@link SchedulerLike} to provide a notion of time, but you may pass any
 * {@link SchedulerLike} to it.
 *
 * ## Example
 * Emits ascending numbers, one every second (1000ms) up to the number 3
 * ```ts
 * import { interval } from 'rxjs';
 * import { take } from 'rxjs/operators';
 *
 * const numbers = interval(1000);
 *
 * const takeFourNumbers = numbers.pipe(take(4));
 *
 * takeFourNumbers.subscribe(x => console.log('Next: ', x));
 *
 * // Logs:
 * // Next: 0
 * // Next: 1
 * // Next: 2
 * // Next: 3
 * ```
 *
 * @see {@link timer}
 * @see {@link delay}
 *
 * @param {number} [period=0] The interval size in milliseconds (by default)
 * or the time unit determined by the scheduler's clock.
 * @param {SchedulerLike} [scheduler=async] The {@link SchedulerLike} to use for scheduling
 * the emission of values, and providing a notion of "time".
 * @return {Observable} An Observable that emits a sequential number each time
 * interval.
 * @static true
 * @name interval
 * @owner Observable
 */
function interval(period = 0, scheduler = _schedulers__WEBPACK_IMPORTED_MODULE_1__["asyncScheduler"]) {
    if (!isNumeric(period) || period < 0) {
        period = 0;
    }
    if (!scheduler || typeof scheduler.schedule !== 'function') {
        scheduler = _schedulers__WEBPACK_IMPORTED_MODULE_1__["asyncScheduler"];
    }
    return new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"](subscriber => {
        subscriber.add(scheduler.schedule(dispatch, period, { subscriber, counter: 0, period }));
        return subscriber;
    });
}
function dispatch(state) {
    const { subscriber, counter, period } = state;
    subscriber.next(counter);
    this.schedule({ subscriber, counter: counter + 1, period }, period);
}
function isNumeric(val) {
    // parseFloat NaNs numeric-cast false positives (null|true|false|"")
    // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
    // subtraction forces infinities to NaN
    // adding 1 corrects loss of precision from parseFloat (#15100)
    return !isArray(val) && (val - parseFloat(val) + 1) >= 0;
}
const isArray = (() => Array.isArray || ((x) => x && typeof x.length === 'number'))();


/***/ }),

/***/ "yqT1":
/*!***************************************************************!*\
  !*** ./libs/cdk/src/lib/render-strategies/scheduler/index.ts ***!
  \***************************************************************/
/*! exports provided: cancelCallback, scheduleCallback, forceFrameRate, NoPriority, ImmediatePriority, UserBlockingPriority, NormalPriority, LowPriority, IdlePriority */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scheduler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scheduler */ "KyZu");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cancelCallback", function() { return _scheduler__WEBPACK_IMPORTED_MODULE_0__["cancelCallback"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scheduleCallback", function() { return _scheduler__WEBPACK_IMPORTED_MODULE_0__["scheduleCallback"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "forceFrameRate", function() { return _scheduler__WEBPACK_IMPORTED_MODULE_0__["forceFrameRate"]; });

/* harmony import */ var _schedulerPriorities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./schedulerPriorities */ "i/je");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NoPriority", function() { return _schedulerPriorities__WEBPACK_IMPORTED_MODULE_1__["NoPriority"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ImmediatePriority", function() { return _schedulerPriorities__WEBPACK_IMPORTED_MODULE_1__["ImmediatePriority"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UserBlockingPriority", function() { return _schedulerPriorities__WEBPACK_IMPORTED_MODULE_1__["UserBlockingPriority"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NormalPriority", function() { return _schedulerPriorities__WEBPACK_IMPORTED_MODULE_1__["NormalPriority"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LowPriority", function() { return _schedulerPriorities__WEBPACK_IMPORTED_MODULE_1__["LowPriority"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IdlePriority", function() { return _schedulerPriorities__WEBPACK_IMPORTED_MODULE_1__["IdlePriority"]; });





/***/ }),

/***/ "yvEk":
/*!***********************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/decorators/stateful.ts ***!
  \***********************************************************************/
/*! exports provided: renderOnChange */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderOnChange", function() { return renderOnChange; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _rx_angular_cdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @rx-angular/cdk */ "cDIL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "kU1M");




function renderOnChange(component, keys, config) {
    const strategyProvider = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"])(_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_1__["RxStrategyProvider"]);
    const strategyName = (config === null || config === void 0 ? void 0 : config.strategyName) || strategyProvider.primaryStrategy;
    const strategy = strategyProvider.strategies[strategyName];
    function scheduleCD(s, work) {
        const abC = new AbortController();
        Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(null).pipe(s.behavior(work, component), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["fromEvent"])(abC.signal, 'abort'))).subscribe();
        return abC;
    }
    let workScheduled;
    const values = new Map();
    keys.forEach(key => {
        Object.defineProperty(component, key, {
            get: function () {
                return values.get(key);
            },
            set: function (newVal) {
                values.set(key, newVal);
                if (workScheduled) {
                    workScheduled.abort();
                }
                const work = () => {
                    strategy.work(config.cdRef, component);
                };
                workScheduled = scheduleCD(strategy, work);
            },
            enumerable: true,
            configurable: true
        });
    });
}


/***/ }),

/***/ "zFhl":
/*!*************************************************************************************************************!*\
  !*** ./apps/demos/src/app/shared/debug-helper/strategy-select/strategy-select/strategy-select.component.ts ***!
  \*************************************************************************************************************/
/*! exports provided: StrategySelectComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StrategySelectComponent", function() { return StrategySelectComponent; });
/* harmony import */ var _rx_angular_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rx-angular/state */ "YYsp");
/* harmony import */ var _rx_angular_cdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @rx-angular/cdk */ "cDIL");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/select */ "d3UM");
/* harmony import */ var _rx_angular_pocs_template_directives_for_rx_for_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../rx-angular-pocs/template/directives/for/rx-for.directive */ "LriG");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/core */ "FKr1");










function StrategySelectComponent_mat_option_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-option", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "mat-icon", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const s_r2 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", s_r2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r1.strategiesUiConfig[s_r2] == null ? null : ctx_r1.strategiesUiConfig[s_r2].icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", s_r2, " ");
} }
const strategiesUiConfig = {
    local: { name: 'local', icon: 'call_split' },
    global: { name: 'global', icon: 'vertical_align_bottom' },
    detach: { name: 'detach', icon: 'play_for_work' },
    noop: { name: 'noop', icon: 'block' },
    postTask: { name: 'postTask', icon: 'science' },
    chunk: { name: 'chunk', icon: 'link' },
    native: { name: 'native', icon: 'find_replace' }
};
class StrategySelectComponent {
    constructor(strategyProvider) {
        this.strategyProvider = strategyProvider;
        this.strategiesUiConfig = strategiesUiConfig;
        this.stratNames$ = this.strategyProvider.strategyNames$;
        this.strategyChange = this.strategyProvider.primaryStrategy$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(s => s.name));
    }
}
StrategySelectComponent.ɵfac = function StrategySelectComponent_Factory(t) { return new (t || StrategySelectComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_1__["RxStrategyProvider"])); };
StrategySelectComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: StrategySelectComponent, selectors: [["rxa-strategy-select"]], outputs: { strategyChange: "strategyChange" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵProvidersFeature"]([_rx_angular_state__WEBPACK_IMPORTED_MODULE_0__["RxState"]])], decls: 10, vars: 5, consts: [["appearance", "fill"], [3, "value", "valueChange"], ["i", ""], [3, "value", 4, "rxFor", "rxForOf", "rxForParent"], ["matPrefix", "", 1, "mr-2"], [3, "value"], [1, "mr-2"]], template: function StrategySelectComponent_Template(rf, ctx) { if (rf & 1) {
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-form-field", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "mat-select", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("valueChange", function StrategySelectComponent_Template_mat_select_valueChange_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r3); const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](2); return ctx.strategyProvider.primaryStrategy = _r0.value; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "mat-select-trigger");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](5, StrategySelectComponent_mat_option_5_Template, 4, 3, "mat-option", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "mat-icon", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9, "Strategy");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", ctx.strategyProvider.primaryStrategy);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx.strategyProvider.primaryStrategy, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("rxForOf", ctx.stratNames$)("rxForParent", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx.strategiesUiConfig[ctx.strategyProvider.primaryStrategy] == null ? null : ctx.strategiesUiConfig[ctx.strategyProvider.primaryStrategy].icon, " ");
    } }, directives: [_angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__["MatFormField"], _angular_material_select__WEBPACK_IMPORTED_MODULE_5__["MatSelect"], _angular_material_select__WEBPACK_IMPORTED_MODULE_5__["MatSelectTrigger"], _rx_angular_pocs_template_directives_for_rx_for_directive__WEBPACK_IMPORTED_MODULE_6__["RxFor"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__["MatIcon"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__["MatPrefix"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__["MatLabel"], _angular_material_core__WEBPACK_IMPORTED_MODULE_8__["MatOption"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "zPwp":
/*!************************************************************!*\
  !*** ./libs/cdk/src/lib/zone-less/rxjs/scheduler/index.ts ***!
  \************************************************************/
/*! exports provided: asyncScheduler, asap, queue, animationFrame */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _async_async__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./async/async */ "Z96z");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asyncScheduler", function() { return _async_async__WEBPACK_IMPORTED_MODULE_0__["async"]; });

/* harmony import */ var _asap_asap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./asap/asap */ "sTai");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asap", function() { return _asap_asap__WEBPACK_IMPORTED_MODULE_1__["asap"]; });

/* harmony import */ var _queue_queue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./queue/queue */ "B8V6");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "queue", function() { return _queue_queue__WEBPACK_IMPORTED_MODULE_2__["queue"]; });

/* harmony import */ var _animation_frame_animationFrame__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./animation-frame/animationFrame */ "2OPz");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "animationFrame", function() { return _animation_frame_animationFrame__WEBPACK_IMPORTED_MODULE_3__["animationFrame"]; });







/***/ }),

/***/ "zhOe":
/*!******************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/zone-agnostic/browser/setTimeout.ts ***!
  \******************************************************************************************/
/*! exports provided: setTimeout, clearTimeout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setTimeout", function() { return setTimeout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearTimeout", function() { return clearTimeout; });
/* harmony import */ var _zone_checks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../zone-checks */ "V4xg");

function setTimeout(cb, ms = 0) {
    return Object(_zone_checks__WEBPACK_IMPORTED_MODULE_0__["getZoneUnPatchedApi"])('setTimeout')(cb, ms);
}
function clearTimeout(id) {
    return Object(_zone_checks__WEBPACK_IMPORTED_MODULE_0__["getZoneUnPatchedApi"])('clearTimeout')(id);
}


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ }),

/***/ "zpa+":
/*!*******************************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/rxjs/operators/observable-to-rx-template-name.ts ***!
  \*******************************************************************************************************/
/*! exports provided: observableToRxTemplateName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "observableToRxTemplateName", function() { return observableToRxTemplateName; });
/* harmony import */ var _rx_materialize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rx-materialize */ "r2o8");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");


function observableToRxTemplateName() {
    return (o$) => o$.pipe(Object(_rx_materialize__WEBPACK_IMPORTED_MODULE_0__["rxMaterialize"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((n) => n.kind));
}


/***/ }),

/***/ "zyx5":
/*!************************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/utils/rxjs/observable/side-effect-observable.ts ***!
  \************************************************************************************************/
/*! exports provided: createSideEffectObservable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSideEffectObservable", function() { return createSideEffectObservable; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");


function createSideEffectObservable(stateObservables = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]()) {
    const effects$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["merge"])(stateObservables.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["mergeAll"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["observeOn"])(rxjs__WEBPACK_IMPORTED_MODULE_0__["queueScheduler"])));
    function nextEffectObservable(effect$) {
        stateObservables.next(effect$);
    }
    function subscribe() {
        return effects$.subscribe();
    }
    return {
        effects$,
        nextEffectObservable,
        subscribe,
    };
}


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map