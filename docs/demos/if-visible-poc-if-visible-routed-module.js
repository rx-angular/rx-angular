(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["if-visible-poc-if-visible-routed-module"],{

/***/ "COOv":
/*!******************************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/experiments/structural-directives/if-visible-poc/if-visible-routed.module.ts ***!
  \******************************************************************************************************************/
/*! exports provided: IfVisibleRoutedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IfVisibleRoutedModule", function() { return IfVisibleRoutedModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _if_visible_routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./if-visible.routes */ "lkUD");
/* harmony import */ var _if_visible_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./if-visible.module */ "bMGi");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");





class IfVisibleRoutedModule {
}
IfVisibleRoutedModule.ɵfac = function IfVisibleRoutedModule_Factory(t) { return new (t || IfVisibleRoutedModule)(); };
IfVisibleRoutedModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: IfVisibleRoutedModule });
IfVisibleRoutedModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[
            _if_visible_module__WEBPACK_IMPORTED_MODULE_2__["IfVisibleModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(_if_visible_routes__WEBPACK_IMPORTED_MODULE_1__["ROUTES"])
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](IfVisibleRoutedModule, { imports: [_if_visible_module__WEBPACK_IMPORTED_MODULE_2__["IfVisibleModule"], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


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

/***/ "UERV":
/*!**************************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/experiments/structural-directives/if-visible-poc/if-visible.component.ts ***!
  \**************************************************************************************************************/
/*! exports provided: IfVisibleComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IfVisibleComponent", function() { return IfVisibleComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");


function IfVisibleComponent_div_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Content Under The Fold ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
class IfVisibleComponent {
    log(n) {
        console.log('render', n);
        return n;
    }
}
IfVisibleComponent.ɵfac = function IfVisibleComponent_Factory(t) { return new (t || IfVisibleComponent)(); };
IfVisibleComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: IfVisibleComponent, selectors: [["rxa-rx-let-poc"]], hostAttrs: [1, "m-1", "p-1", 2, "display", "block"], features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([])], decls: 7, vars: 0, consts: [["visualizerHeader", ""], [1, "mt-5", "row", "w-100", "d-flex"], [1, "col-6", "dh-embedded-view", "p-2", 2, "margin-top", "300px"], [4, "ifVisible"]], template: function IfVisibleComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "*ifVisible and under the fold optimizations");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, IfVisibleComponent_div_6_Template, 2, 0, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_1__["VisualizerComponent"]], encapsulation: 2 });


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

/***/ "bMGi":
/*!***********************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/experiments/structural-directives/if-visible-poc/if-visible.module.ts ***!
  \***********************************************************************************************************/
/*! exports provided: IfVisibleModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IfVisibleModule", function() { return IfVisibleModule; });
/* harmony import */ var _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer */ "cyPU");
/* harmony import */ var _shared_debug_helper_value_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../shared/debug-helper/value-provider */ "DJi3");
/* harmony import */ var _if_visible_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./if-visible.component */ "UERV");
/* harmony import */ var _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../rx-angular-pocs */ "caVP");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");





const DECLARATIONS = [
    _if_visible_component__WEBPACK_IMPORTED_MODULE_2__["IfVisibleComponent"],
];
class IfVisibleModule {
}
IfVisibleModule.ɵfac = function IfVisibleModule_Factory(t) { return new (t || IfVisibleModule)(); };
IfVisibleModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: IfVisibleModule });
IfVisibleModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ providers: [], imports: [[
            _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_0__["VisualizerModule"],
            _shared_debug_helper_value_provider__WEBPACK_IMPORTED_MODULE_1__["ValueProvidersModule"],
            _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_3__["RxLetModule"],
            _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_3__["RxIfModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](IfVisibleModule, { declarations: [_if_visible_component__WEBPACK_IMPORTED_MODULE_2__["IfVisibleComponent"]], imports: [_shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_0__["VisualizerModule"],
        _shared_debug_helper_value_provider__WEBPACK_IMPORTED_MODULE_1__["ValueProvidersModule"],
        _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_3__["RxLetModule"],
        _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_3__["RxIfModule"]], exports: [_if_visible_component__WEBPACK_IMPORTED_MODULE_2__["IfVisibleComponent"]] }); })();


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

/***/ "lkUD":
/*!***********************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/experiments/structural-directives/if-visible-poc/if-visible.routes.ts ***!
  \***********************************************************************************************************/
/*! exports provided: ROUTES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROUTES", function() { return ROUTES; });
/* harmony import */ var _if_visible_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./if-visible.component */ "UERV");

const ROUTES = [
    {
        path: '',
        component: _if_visible_component__WEBPACK_IMPORTED_MODULE_0__["IfVisibleComponent"]
    }
];


/***/ })

}]);
//# sourceMappingURL=if-visible-poc-if-visible-routed-module.js.map