(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["strategies-strategies-module"],{

/***/ "/1EC":
/*!******************************************************************************!*\
  !*** ./apps/demos/src/app/features/template/strategies/strategies.module.ts ***!
  \******************************************************************************/
/*! exports provided: StrategiesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StrategiesModule", function() { return StrategiesModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _concurrent_strategies_routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./concurrent-strategies.routes */ "hLzX");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");




class StrategiesModule {
}
StrategiesModule.ɵfac = function StrategiesModule_Factory(t) { return new (t || StrategiesModule)(); };
StrategiesModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: StrategiesModule });
StrategiesModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[
            _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(_concurrent_strategies_routes__WEBPACK_IMPORTED_MODULE_1__["ROUTES"])
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](StrategiesModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "DJi3":
/*!************************************************************************!*\
  !*** ./apps/demos/src/app/shared/debug-helper/value-provider/index.ts ***!
  \************************************************************************/
/*! exports provided: compareIdFn, withCompleteAndError, toTick, toInt, toRandom, toBoolean, toImgUrl, toRandomItems, toNewItems, getRandomItems, getRandomRecords, getItems, updateItemMutable, updateItemImmutable, addItemMutable, addItemImmutable, moveItemMutable, moveItemImmutable, moveItemsImmutable, shuffleItemsImmutable, removeItemsMutable, removeItemsImmutable, GliphyApi, placeholderImg, SchedulingPriority, PrimitivesProviderService, ArrayProviderService, ValueProviderComponent, ValueProvidersModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "eXvN");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "compareIdFn", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["compareIdFn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withCompleteAndError", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["withCompleteAndError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toTick", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["toTick"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toInt", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["toInt"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toRandom", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["toRandom"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toBoolean", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["toBoolean"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toImgUrl", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["toImgUrl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toRandomItems", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["toRandomItems"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toNewItems", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["toNewItems"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getRandomItems", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["getRandomItems"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getRandomRecords", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["getRandomRecords"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getItems", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["getItems"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "updateItemMutable", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["updateItemMutable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "updateItemImmutable", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["updateItemImmutable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "addItemMutable", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["addItemMutable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "addItemImmutable", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["addItemImmutable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "moveItemMutable", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["moveItemMutable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "moveItemImmutable", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["moveItemImmutable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "moveItemsImmutable", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["moveItemsImmutable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "shuffleItemsImmutable", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["shuffleItemsImmutable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "removeItemsMutable", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["removeItemsMutable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "removeItemsImmutable", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["removeItemsImmutable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GliphyApi", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["GliphyApi"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "placeholderImg", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["placeholderImg"]; });

/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model */ "V6pN");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SchedulingPriority", function() { return _model__WEBPACK_IMPORTED_MODULE_1__["SchedulingPriority"]; });

/* harmony import */ var _primitives_provider_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./primitives-provider.service */ "pvtS");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PrimitivesProviderService", function() { return _primitives_provider_service__WEBPACK_IMPORTED_MODULE_2__["PrimitivesProviderService"]; });

/* harmony import */ var _array_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./array-provider.service */ "AjVs");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ArrayProviderService", function() { return _array_provider_service__WEBPACK_IMPORTED_MODULE_3__["ArrayProviderService"]; });

/* harmony import */ var _value_provider_value_provider_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./value-provider/value-provider.component */ "eHQV");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ValueProviderComponent", function() { return _value_provider_value_provider_component__WEBPACK_IMPORTED_MODULE_4__["ValueProviderComponent"]; });

/* harmony import */ var _value_providers_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./value-providers.module */ "aUMF");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ValueProvidersModule", function() { return _value_providers_module__WEBPACK_IMPORTED_MODULE_5__["ValueProvidersModule"]; });









/***/ }),

/***/ "TxyS":
/*!*********************************************************************************!*\
  !*** ./apps/demos/src/app/features/experiments/strategies/strategies.routes.ts ***!
  \*********************************************************************************/
/*! exports provided: ROUTES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROUTES", function() { return ROUTES; });
/* harmony import */ var _strategy_tokens_strategy_tokens_root_inherit_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./strategy-tokens/strategy-tokens-root-inherit.component */ "veAB");
/* harmony import */ var _strategy_tokens_strategy_tokens_provide_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./strategy-tokens/strategy-tokens-provide.component */ "hsfA");


const ROUTES = [
    {
        path: '',
        redirectTo: 'inherit'
    },
    {
        path: 'inherit',
        component: _strategy_tokens_strategy_tokens_root_inherit_component__WEBPACK_IMPORTED_MODULE_0__["StrategyTokensRootInheritComponent"]
    },
    {
        path: 'provide',
        component: _strategy_tokens_strategy_tokens_provide_component__WEBPACK_IMPORTED_MODULE_1__["StrategyTokensProvideComponent"]
    }
];


/***/ }),

/***/ "V6pN":
/*!************************************************************************!*\
  !*** ./apps/demos/src/app/shared/debug-helper/value-provider/model.ts ***!
  \************************************************************************/
/*! exports provided: SchedulingPriority */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SchedulingPriority", function() { return SchedulingPriority; });
var SchedulingPriority;
(function (SchedulingPriority) {
    SchedulingPriority[SchedulingPriority["sync"] = 0] = "sync";
    SchedulingPriority[SchedulingPriority["animationFrame"] = 1] = "animationFrame";
    SchedulingPriority[SchedulingPriority["Promise"] = 2] = "Promise";
    SchedulingPriority[SchedulingPriority["setTimeout"] = 3] = "setTimeout";
    SchedulingPriority[SchedulingPriority["setInterval"] = 4] = "setInterval";
    SchedulingPriority[SchedulingPriority["postMessage"] = 5] = "postMessage";
    SchedulingPriority[SchedulingPriority["idleCallback"] = 6] = "idleCallback";
    SchedulingPriority[SchedulingPriority["userBlocking"] = 7] = "userBlocking";
    SchedulingPriority[SchedulingPriority["userVisible"] = 8] = "userVisible";
    SchedulingPriority[SchedulingPriority["background"] = 9] = "background";
})(SchedulingPriority || (SchedulingPriority = {}));


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

/***/ "hLzX":
/*!*****************************************************************************************!*\
  !*** ./apps/demos/src/app/features/template/strategies/concurrent-strategies.routes.ts ***!
  \*****************************************************************************************/
/*! exports provided: ROUTES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROUTES", function() { return ROUTES; });
const ROUTES = [
    {
        path: '',
        redirectTo: 'comparison'
    },
    {
        path: 'comparison',
        loadChildren: () => Promise.all(/*! import() | comparison-comparison-module */[__webpack_require__.e("default~basics-tutorial-basics-module~comparison-comparison-module~error-handling-error-handing-modu~ae155b61"), __webpack_require__.e("default~basics-tutorial-basics-module~comparison-comparison-module~error-handling-error-handing-modu~1004e347"), __webpack_require__.e("default~basics-tutorial-basics-module~comparison-comparison-module~pixel-priority-pixel-priority-mod~a5e67073"), __webpack_require__.e("default~comparison-comparison-module~pixel-priority-pixel-priority-module~sibling-component-structur~48c58d88"), __webpack_require__.e("comparison-comparison-module")]).then(__webpack_require__.bind(null, /*! ./comparison/comparison.module */ "WASh"))
            .then(m => m.ComparisonModule)
    },
    {
        path: 'pixel-priority',
        loadChildren: () => Promise.all(/*! import() | pixel-priority-pixel-priority-module */[__webpack_require__.e("default~basics-tutorial-basics-module~comparison-comparison-module~error-handling-error-handing-modu~ae155b61"), __webpack_require__.e("default~basics-tutorial-basics-module~comparison-comparison-module~error-handling-error-handing-modu~1004e347"), __webpack_require__.e("default~basics-tutorial-basics-module~comparison-comparison-module~pixel-priority-pixel-priority-mod~a5e67073"), __webpack_require__.e("default~alphas-compare-alphas-compare-module~lazy-loading-components-lazy-loading-components-module~~53140884"), __webpack_require__.e("default~comparison-comparison-module~pixel-priority-pixel-priority-module~sibling-component-structur~48c58d88"), __webpack_require__.e("default~alphas-compare-alphas-compare-module~pixel-priority-pixel-priority-module"), __webpack_require__.e("pixel-priority-pixel-priority-module")]).then(__webpack_require__.bind(null, /*! ./pixel-priority/pixel-priority.module */ "NRzE"))
            .then(m => m.PixelPriorityModule)
    }
];


/***/ }),

/***/ "hsfA":
/*!*****************************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/experiments/strategies/strategy-tokens/strategy-tokens-provide.component.ts ***!
  \*****************************************************************************************************************/
/*! exports provided: StrategyTokensProvideComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StrategyTokensProvideComponent", function() { return StrategyTokensProvideComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _shared_debug_helper_value_provider_value_provider_value_provider_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/debug-helper/value-provider/value-provider/value-provider.component */ "eHQV");



function StrategyTokensProvideComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const counter_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", counter_r2, " ");
} }
class StrategyTokensProvideComponent {
}
StrategyTokensProvideComponent.ɵfac = function StrategyTokensProvideComponent_Factory(t) { return new (t || StrategyTokensProvideComponent)(); };
StrategyTokensProvideComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: StrategyTokensProvideComponent, selectors: [["rxa-strategy-tokens-provide"]], hostAttrs: [1, "m-1", "p-1", 2, "display", "block"], decls: 10, vars: 1, consts: [["visualizerHeader", ""], ["buttons", "true"], ["vP", "rxaValueProvider"], [1, "row", "w-100"], [1, "col"], [4, "rxLet"]], template: function StrategyTokensProvideComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Strategy controlled by this component");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "rxa-value-provider", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, StrategyTokensProvideComponent_div_9_Template, 2, 1, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("rxLet", _r0.incremental$);
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_1__["VisualizerComponent"], _shared_debug_helper_value_provider_value_provider_value_provider_component__WEBPACK_IMPORTED_MODULE_2__["ValueProviderComponent"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "iwHF":
/*!*********************************************************************************!*\
  !*** ./apps/demos/src/app/features/experiments/strategies/strategies.module.ts ***!
  \*********************************************************************************/
/*! exports provided: StrategiesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StrategiesModule", function() { return StrategiesModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _strategies_routes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./strategies.routes */ "TxyS");
/* harmony import */ var _strategy_tokens_strategy_tokens_root_inherit_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./strategy-tokens/strategy-tokens-root-inherit.component */ "veAB");
/* harmony import */ var _strategy_tokens_strategy_tokens_provide_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./strategy-tokens/strategy-tokens-provide.component */ "hsfA");
/* harmony import */ var _shared_debug_helper_value_provider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../shared/debug-helper/value-provider */ "DJi3");
/* harmony import */ var _shared_debug_helper_strategy_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../shared/debug-helper/strategy-select */ "eakK");
/* harmony import */ var _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../shared/debug-helper/visualizer */ "cyPU");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ "fXoL");










class StrategiesModule {
}
StrategiesModule.ɵfac = function StrategiesModule_Factory(t) { return new (t || StrategiesModule)(); };
StrategiesModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({ type: StrategiesModule });
StrategiesModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(_strategies_routes__WEBPACK_IMPORTED_MODULE_2__["ROUTES"]),
            _shared_debug_helper_value_provider__WEBPACK_IMPORTED_MODULE_5__["ValueProvidersModule"],
            _shared_debug_helper_strategy_select__WEBPACK_IMPORTED_MODULE_6__["StrategySelectModule"],
            _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_7__["VisualizerModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](StrategiesModule, { declarations: [_strategy_tokens_strategy_tokens_root_inherit_component__WEBPACK_IMPORTED_MODULE_3__["StrategyTokensRootInheritComponent"], _strategy_tokens_strategy_tokens_provide_component__WEBPACK_IMPORTED_MODULE_4__["StrategyTokensProvideComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"], _shared_debug_helper_value_provider__WEBPACK_IMPORTED_MODULE_5__["ValueProvidersModule"],
        _shared_debug_helper_strategy_select__WEBPACK_IMPORTED_MODULE_6__["StrategySelectModule"],
        _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_7__["VisualizerModule"]], exports: [_strategy_tokens_strategy_tokens_root_inherit_component__WEBPACK_IMPORTED_MODULE_3__["StrategyTokensRootInheritComponent"]] }); })();


/***/ }),

/***/ "veAB":
/*!**********************************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/experiments/strategies/strategy-tokens/strategy-tokens-root-inherit.component.ts ***!
  \**********************************************************************************************************************/
/*! exports provided: StrategyTokensRootInheritComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StrategyTokensRootInheritComponent", function() { return StrategyTokensRootInheritComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _shared_debug_helper_value_provider_value_provider_value_provider_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/debug-helper/value-provider/value-provider/value-provider.component */ "eHQV");



function StrategyTokensRootInheritComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const counter_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", counter_r2, " ");
} }
class StrategyTokensRootInheritComponent {
}
StrategyTokensRootInheritComponent.ɵfac = function StrategyTokensRootInheritComponent_Factory(t) { return new (t || StrategyTokensRootInheritComponent)(); };
StrategyTokensRootInheritComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: StrategyTokensRootInheritComponent, selectors: [["rxa-strategy-tokens-root-inherit"]], hostAttrs: [1, "m-1", "p-1", 2, "display", "block"], decls: 10, vars: 1, consts: [["visualizerHeader", ""], ["buttons", "true"], ["vP", "rxaValueProvider"], [1, "row", "w-100"], [1, "col"], [4, "rxLet"]], template: function StrategyTokensRootInheritComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Strategy inherited from app module");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "rxa-value-provider", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, StrategyTokensRootInheritComponent_div_9_Template, 2, 1, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("rxLet", _r0.incremental$);
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_1__["VisualizerComponent"], _shared_debug_helper_value_provider_value_provider_value_provider_component__WEBPACK_IMPORTED_MODULE_2__["ValueProviderComponent"]], encapsulation: 2, changeDetection: 0 });


/***/ })

}]);
//# sourceMappingURL=strategies-strategies-module.js.map