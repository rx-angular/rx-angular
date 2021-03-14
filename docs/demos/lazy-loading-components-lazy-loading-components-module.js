(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["lazy-loading-components-lazy-loading-components-module"],{

/***/ "8Jbu":
/*!***************************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/template/rx-let/lazy-loading-components/lazy-loading-components.routes.ts ***!
  \***************************************************************************************************************/
/*! exports provided: ROUTES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROUTES", function() { return ROUTES; });
/* harmony import */ var _lazy_loading_components_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lazy-loading-components.component */ "jZPp");

const ROUTES = [
    {
        path: '',
        component: _lazy_loading_components_component__WEBPACK_IMPORTED_MODULE_0__["LazyLoadingComponentsComponent"]
    }
];


/***/ }),

/***/ "IYd9":
/*!******************************************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/template/rx-let/lazy-loading-components/lazy-loading-components-async-await.component.ts ***!
  \******************************************************************************************************************************/
/*! exports provided: LazyLoadingComponentsAsyncAwaitComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LazyLoadingComponentsAsyncAwaitComponent", function() { return LazyLoadingComponentsAsyncAwaitComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_utils_cd_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/utils/cd-helper */ "h33e");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _shared_ghost_elements_list_item_ghost_list_item_ghost_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../shared/ghost-elements/list-item-ghost/list-item-ghost.component */ "nKlp");








function LazyLoadingComponentsAsyncAwaitComponent_ng_template_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "rxa-list-item-ghost");
} }
function LazyLoadingComponentsAsyncAwaitComponent_ng_container_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainer"](0, 4);
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngComponentOutlet", ctx_r2.componentAwait);
} }
class LazyLoadingComponentsAsyncAwaitComponent {
    constructor(cdRef) {
        this.cdRef = cdRef;
        this._shouldLoadA = false;
        this.cA = () => __webpack_require__.e(/*! import() | lazy-components-lazy-component-a-component */ "lazy-components-lazy-component-a-component").then(__webpack_require__.bind(null, /*! ./lazy-components/lazy-component-a.component */ "0PPO")).then(c => c.component);
        this.cB = () => __webpack_require__.e(/*! import() | lazy-components-lazy-component-b-component */ "lazy-components-lazy-component-b-component").then(__webpack_require__.bind(null, /*! ./lazy-components/lazy-component-b.component */ "NyUf")).then(c => c.component);
    }
    toggle() {
        this._shouldLoadA = !this._shouldLoadA;
        this.awaiting(this._shouldLoadA);
    }
    awaiting(b) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.componentAwait = yield (b ? this.cA() : this.cB());
            this.cdRef.detectChanges();
        });
    }
}
LazyLoadingComponentsAsyncAwaitComponent.ɵfac = function LazyLoadingComponentsAsyncAwaitComponent_Factory(t) { return new (t || LazyLoadingComponentsAsyncAwaitComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"])); };
LazyLoadingComponentsAsyncAwaitComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: LazyLoadingComponentsAsyncAwaitComponent, selectors: [["rxa-lazy-loading-components-async-await"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([_shared_utils_cd_helper__WEBPACK_IMPORTED_MODULE_2__["CdHelper"]])], decls: 9, vars: 2, consts: [["visualizerHeader", ""], ["mat-raised-button", "", 3, "click"], ["suspenseView", ""], [3, "ngComponentOutlet", 4, "ngIf", "ngIfElse"], [3, "ngComponentOutlet"]], template: function LazyLoadingComponentsAsyncAwaitComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Resolving over async/await");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function LazyLoadingComponentsAsyncAwaitComponent_Template_button_click_4_listener() { return ctx.toggle(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Toggle");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, LazyLoadingComponentsAsyncAwaitComponent_ng_template_6_Template, 1, 0, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, LazyLoadingComponentsAsyncAwaitComponent_ng_container_8_Template, 1, 1, "ng-container", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.componentAwait)("ngIfElse", _r0);
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_3__["VisualizerComponent"], _angular_material_button__WEBPACK_IMPORTED_MODULE_4__["MatButton"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _shared_ghost_elements_list_item_ghost_list_item_ghost_component__WEBPACK_IMPORTED_MODULE_6__["ListItemGhostComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgComponentOutlet"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "MXgO":
/*!*****************************************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/template/rx-let/lazy-loading-components/lazy-loading-components-observable.component.ts ***!
  \*****************************************************************************************************************************/
/*! exports provided: LazyLoadingComponentsObservableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LazyLoadingComponentsObservableComponent", function() { return LazyLoadingComponentsObservableComponent; });
/* harmony import */ var _shared_utils_cd_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../shared/utils/cd-helper */ "h33e");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _libs_template_src_lib_experimental_unpatch_events_unpatch_events_experimental_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../../../../libs/template/src/lib/experimental/unpatch/events/unpatch-events.experimental.directive */ "QZMm");
/* harmony import */ var _libs_template_src_lib_let_let_directive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../../../../libs/template/src/lib/let/let.directive */ "cihl");
/* harmony import */ var _shared_ghost_elements_list_item_ghost_list_item_ghost_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../shared/ghost-elements/list-item-ghost/list-item-ghost.component */ "nKlp");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "ofXK");










function LazyLoadingComponentsObservableComponent_ng_template_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "rxa-list-item-ghost");
} }
function LazyLoadingComponentsObservableComponent_ng_container_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainer"](0, 4);
} if (rf & 2) {
    const c_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngComponentOutlet", c_r3);
} }
class LazyLoadingComponentsObservableComponent {
    constructor() {
        this.toggleSubject = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.toggle$ = this.toggleSubject.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["scan"])(b => !b, false), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["delay"])(1000));
        this.component$ = this.toggle$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(b => b ? this.cA() : this.cB()), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["shareReplay"])(1));
        this.cA = () => __webpack_require__.e(/*! import() | lazy-components-lazy-component-a-component */ "lazy-components-lazy-component-a-component").then(__webpack_require__.bind(null, /*! ./lazy-components/lazy-component-a.component */ "0PPO")).then(c => c.component);
        this.cB = () => __webpack_require__.e(/*! import() | lazy-components-lazy-component-b-component */ "lazy-components-lazy-component-b-component").then(__webpack_require__.bind(null, /*! ./lazy-components/lazy-component-b.component */ "NyUf")).then(c => c.component);
    }
}
LazyLoadingComponentsObservableComponent.ɵfac = function LazyLoadingComponentsObservableComponent_Factory(t) { return new (t || LazyLoadingComponentsObservableComponent)(); };
LazyLoadingComponentsObservableComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: LazyLoadingComponentsObservableComponent, selectors: [["rxa-lazy-loading-components-observable"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵProvidersFeature"]([_shared_utils_cd_helper__WEBPACK_IMPORTED_MODULE_0__["CdHelper"]])], decls: 9, vars: 2, consts: [["visualizerHeader", ""], ["mat-raised-button", "", 3, "unpatch", "click"], ["suspenseView", ""], [3, "ngComponentOutlet", 4, "rxLet", "rxLetRxSuspense"], [3, "ngComponentOutlet"]], template: function LazyLoadingComponentsObservableComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "Resolving over Observable");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function LazyLoadingComponentsObservableComponent_Template_button_click_4_listener() { return ctx.toggleSubject.next(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "Toggle");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](6, LazyLoadingComponentsObservableComponent_ng_template_6_Template, 1, 0, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](8, LazyLoadingComponentsObservableComponent_ng_container_8_Template, 1, 1, "ng-container", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("rxLet", ctx.component$)("rxLetRxSuspense", _r0);
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_4__["VisualizerComponent"], _angular_material_button__WEBPACK_IMPORTED_MODULE_5__["MatButton"], _libs_template_src_lib_experimental_unpatch_events_unpatch_events_experimental_directive__WEBPACK_IMPORTED_MODULE_6__["UnpatchEventsDirective"], _libs_template_src_lib_let_let_directive__WEBPACK_IMPORTED_MODULE_7__["LetDirective"], _shared_ghost_elements_list_item_ghost_list_item_ghost_component__WEBPACK_IMPORTED_MODULE_8__["ListItemGhostComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgComponentOutlet"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "cyPU":
/*!********************************************************************!*\
  !*** ./apps/demos/src/app/shared/debug-helper/visualizer/index.ts ***!
  \********************************************************************/
/*! exports provided: VisualizerModule, VisualizerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _visualizer_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./visualizer.module */ "RtHe");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VisualizerModule", function() { return _visualizer_module__WEBPACK_IMPORTED_MODULE_0__["VisualizerModule"]; });

/* harmony import */ var _visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./visualizer/visualizer.component */ "cIVi");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VisualizerComponent", function() { return _visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_1__["VisualizerComponent"]; });





/***/ }),

/***/ "hdix":
/*!**************************************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/template/rx-let/lazy-loading-components/lazy-loading-components-promise.component.ts ***!
  \**************************************************************************************************************************/
/*! exports provided: LazyLoadingComponentsPromiseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LazyLoadingComponentsPromiseComponent", function() { return LazyLoadingComponentsPromiseComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _libs_template_src_lib_let_let_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../../../libs/template/src/lib/let/let.directive */ "cihl");
/* harmony import */ var _shared_ghost_elements_list_item_ghost_list_item_ghost_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/ghost-elements/list-item-ghost/list-item-ghost.component */ "nKlp");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");








function LazyLoadingComponentsPromiseComponent_ng_template_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "rxa-list-item-ghost");
} }
function LazyLoadingComponentsPromiseComponent_ng_container_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0, 4);
} if (rf & 2) {
    const c_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngComponentOutlet", c_r3);
} }
class LazyLoadingComponentsPromiseComponent {
    constructor(cdRef) {
        this.cdRef = cdRef;
        this._isComponentA = false;
        this.cA = () => __webpack_require__.e(/*! import() | lazy-components-lazy-component-a-component */ "lazy-components-lazy-component-a-component").then(__webpack_require__.bind(null, /*! ./lazy-components/lazy-component-a.component */ "0PPO")).then(c => c.component);
        this.cB = () => __webpack_require__.e(/*! import() | lazy-components-lazy-component-b-component */ "lazy-components-lazy-component-b-component").then(__webpack_require__.bind(null, /*! ./lazy-components/lazy-component-b.component */ "NyUf")).then(c => c.component);
    }
    toggle() {
        this._isComponentA = !this._isComponentA;
        this.componentPromise = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["from"])((this._isComponentA ? this.cA() : this.cB()));
    }
}
LazyLoadingComponentsPromiseComponent.ɵfac = function LazyLoadingComponentsPromiseComponent_Factory(t) { return new (t || LazyLoadingComponentsPromiseComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"])); };
LazyLoadingComponentsPromiseComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: LazyLoadingComponentsPromiseComponent, selectors: [["rxa-lazy-loading-components-promise"]], decls: 9, vars: 2, consts: [["visualizerHeader", ""], ["mat-raised-button", "", 3, "click"], ["suspenseView", ""], [3, "ngComponentOutlet", 4, "rxLet", "rxLetRxSuspense"], [3, "ngComponentOutlet"]], template: function LazyLoadingComponentsPromiseComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Resolving over Promise");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function LazyLoadingComponentsPromiseComponent_Template_button_click_4_listener() { return ctx.toggle(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Toggle");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, LazyLoadingComponentsPromiseComponent_ng_template_6_Template, 1, 0, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, LazyLoadingComponentsPromiseComponent_ng_container_8_Template, 1, 1, "ng-container", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("rxLet", ctx.componentPromise)("rxLetRxSuspense", _r0);
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__["VisualizerComponent"], _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButton"], _libs_template_src_lib_let_let_directive__WEBPACK_IMPORTED_MODULE_4__["LetDirective"], _shared_ghost_elements_list_item_ghost_list_item_ghost_component__WEBPACK_IMPORTED_MODULE_5__["ListItemGhostComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgComponentOutlet"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "jZPp":
/*!******************************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/template/rx-let/lazy-loading-components/lazy-loading-components.component.ts ***!
  \******************************************************************************************************************/
/*! exports provided: LazyLoadingComponentsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LazyLoadingComponentsComponent", function() { return LazyLoadingComponentsComponent; });
/* harmony import */ var _shared_rx_effects_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../shared/rx-effects.service */ "+Gkt");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button-toggle */ "jaxi");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _lazy_loading_components_async_await_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lazy-loading-components-async-await.component */ "IYd9");
/* harmony import */ var _lazy_loading_components_promise_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lazy-loading-components-promise.component */ "hdix");
/* harmony import */ var _lazy_loading_components_observable_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lazy-loading-components-observable.component */ "MXgO");








function LazyLoadingComponentsComponent_div_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "rxa-lazy-loading-components-async-await");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function LazyLoadingComponentsComponent_div_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "rxa-lazy-loading-components-promise");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function LazyLoadingComponentsComponent_div_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "rxa-lazy-loading-components-observable");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
class LazyLoadingComponentsComponent extends _shared_rx_effects_service__WEBPACK_IMPORTED_MODULE_0__["RxEffects"] {
    constructor() {
        super(...arguments);
        this.displayStates = {
            none: 0,
            all: 1,
            await: 2,
            promise: 3,
            observable: 4
        };
    }
}
LazyLoadingComponentsComponent.ɵfac = function LazyLoadingComponentsComponent_Factory(t) { return ɵLazyLoadingComponentsComponent_BaseFactory(t || LazyLoadingComponentsComponent); };
LazyLoadingComponentsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: LazyLoadingComponentsComponent, selectors: [["rxa-lazy-loading-components"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]], decls: 19, vars: 8, consts: [["visualizerHeader", ""], ["name", "visibleExamples", "aria-label", "Visible Examples", 3, "value"], ["group", "matButtonToggleGroup"], [3, "value"], [1, "w-100", "row"], ["class", "col", 4, "ngIf"], [1, "col"]], template: function LazyLoadingComponentsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Lazy Loading Components");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "mat-button-toggle-group", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "mat-button-toggle", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Async Await");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "mat-button-toggle", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "Promise");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "mat-button-toggle", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "Observable");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "mat-button-toggle", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "All");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](14, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](16, LazyLoadingComponentsComponent_div_16_Template, 2, 0, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](17, LazyLoadingComponentsComponent_div_17_Template, 2, 0, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](18, LazyLoadingComponentsComponent_div_18_Template, 2, 0, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", ctx.displayStates.all);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", ctx.displayStates.await);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", ctx.displayStates.promise);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", ctx.displayStates.observable);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", ctx.displayStates.all);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", _r0.value === ctx.displayStates.await || _r0.value === ctx.displayStates.all);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", _r0.value === ctx.displayStates.promise || _r0.value === ctx.displayStates.all);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", _r0.value === ctx.displayStates.observable || _r0.value === ctx.displayStates.all);
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__["VisualizerComponent"], _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_3__["MatButtonToggleGroup"], _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_3__["MatButtonToggle"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _lazy_loading_components_async_await_component__WEBPACK_IMPORTED_MODULE_5__["LazyLoadingComponentsAsyncAwaitComponent"], _lazy_loading_components_promise_component__WEBPACK_IMPORTED_MODULE_6__["LazyLoadingComponentsPromiseComponent"], _lazy_loading_components_observable_component__WEBPACK_IMPORTED_MODULE_7__["LazyLoadingComponentsObservableComponent"]], encapsulation: 2, changeDetection: 0 });
const ɵLazyLoadingComponentsComponent_BaseFactory = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetInheritedFactory"](LazyLoadingComponentsComponent);


/***/ }),

/***/ "q2mZ":
/*!***************************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/template/rx-let/lazy-loading-components/lazy-loading-components.module.ts ***!
  \***************************************************************************************************************/
/*! exports provided: LazyLoadingComponentsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LazyLoadingComponentsModule", function() { return LazyLoadingComponentsModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _lazy_loading_components_routes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lazy-loading-components.routes */ "8Jbu");
/* harmony import */ var _lazy_loading_components_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lazy-loading-components.component */ "jZPp");
/* harmony import */ var _rx_angular_template__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @rx-angular/template */ "WFkj");
/* harmony import */ var _shared_ghost_elements__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/ghost-elements */ "K9NQ");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer */ "cyPU");
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/button-toggle */ "jaxi");
/* harmony import */ var _lazy_loading_components_observable_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./lazy-loading-components-observable.component */ "MXgO");
/* harmony import */ var _lazy_loading_components_promise_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./lazy-loading-components-promise.component */ "hdix");
/* harmony import */ var _lazy_loading_components_async_await_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./lazy-loading-components-async-await.component */ "IYd9");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ "fXoL");














const DECLARATIONS = [
    _lazy_loading_components_observable_component__WEBPACK_IMPORTED_MODULE_9__["LazyLoadingComponentsObservableComponent"],
    _lazy_loading_components_promise_component__WEBPACK_IMPORTED_MODULE_10__["LazyLoadingComponentsPromiseComponent"],
    _lazy_loading_components_async_await_component__WEBPACK_IMPORTED_MODULE_11__["LazyLoadingComponentsAsyncAwaitComponent"],
    _lazy_loading_components_component__WEBPACK_IMPORTED_MODULE_3__["LazyLoadingComponentsComponent"]
];
class LazyLoadingComponentsModule {
}
LazyLoadingComponentsModule.ɵfac = function LazyLoadingComponentsModule_Factory(t) { return new (t || LazyLoadingComponentsModule)(); };
LazyLoadingComponentsModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineNgModule"]({ type: LazyLoadingComponentsModule });
LazyLoadingComponentsModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(_lazy_loading_components_routes__WEBPACK_IMPORTED_MODULE_2__["ROUTES"]),
            _rx_angular_template__WEBPACK_IMPORTED_MODULE_4__["LetModule"],
            _rx_angular_template__WEBPACK_IMPORTED_MODULE_4__["UnpatchEventsModule"],
            _shared_ghost_elements__WEBPACK_IMPORTED_MODULE_5__["GhostElementsModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_6__["MatButtonModule"],
            _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_7__["VisualizerModule"],
            _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_8__["MatButtonToggleModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵsetNgModuleScope"](LazyLoadingComponentsModule, { declarations: [_lazy_loading_components_observable_component__WEBPACK_IMPORTED_MODULE_9__["LazyLoadingComponentsObservableComponent"],
        _lazy_loading_components_promise_component__WEBPACK_IMPORTED_MODULE_10__["LazyLoadingComponentsPromiseComponent"],
        _lazy_loading_components_async_await_component__WEBPACK_IMPORTED_MODULE_11__["LazyLoadingComponentsAsyncAwaitComponent"],
        _lazy_loading_components_component__WEBPACK_IMPORTED_MODULE_3__["LazyLoadingComponentsComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"], _rx_angular_template__WEBPACK_IMPORTED_MODULE_4__["LetModule"],
        _rx_angular_template__WEBPACK_IMPORTED_MODULE_4__["UnpatchEventsModule"],
        _shared_ghost_elements__WEBPACK_IMPORTED_MODULE_5__["GhostElementsModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_6__["MatButtonModule"],
        _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_7__["VisualizerModule"],
        _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_8__["MatButtonToggleModule"]] }); })();


/***/ })

}]);
//# sourceMappingURL=lazy-loading-components-lazy-loading-components-module.js.map