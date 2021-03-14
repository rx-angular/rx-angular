(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["rx-context-rx-context-routed-module"],{

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

/***/ "K2f6":
/*!*********************************************************************************!*\
  !*** ./apps/demos/src/app/features/template/rx-context/rx-context.component.ts ***!
  \*********************************************************************************/
/*! exports provided: RxContextComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RxContextComponent", function() { return RxContextComponent; });
/* harmony import */ var _rx_angular_cdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rx-angular/cdk */ "cDIL");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _shared_debug_helper_strategy_select_strategy_select_strategy_select_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../shared/debug-helper/strategy-select/strategy-select/strategy-select.component */ "zFhl");
/* harmony import */ var _shared_debug_helper_trigger_provider_trigger_provider_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../shared/debug-helper/trigger-provider/trigger-provider.component */ "jSfE");
/* harmony import */ var _shared_debug_helper_value_provider_array_provider_array_provider_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../shared/debug-helper/value-provider/array-provider/array-provider.component */ "vvYH");
/* harmony import */ var _rx_angular_pocs_template_components_context_rx_context_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../rx-angular-pocs/template/components/context/rx-context.component */ "6epE");
/* harmony import */ var _rx_angular_pocs_template_directives_for_rx_for_directive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../rx-angular-pocs/template/directives/for/rx-for.directive */ "LriG");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/progress-spinner */ "Xa2L");











function RxContextComponent_ul_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ul", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"]("", item_r5.id, " - ", item_r5.value, "");
} }
function RxContextComponent_ul_33_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"]("", item_r7.id, " - ", item_r7.value, "");
} }
function RxContextComponent_ul_46_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r9 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"]("", item_r9.id, " - ", item_r9.value, "");
} }
class RxContextComponent {
    constructor(strategyProvider) {
        this.strategyProvider = strategyProvider;
    }
}
RxContextComponent.ɵfac = function RxContextComponent_Factory(t) { return new (t || RxContextComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_0__["RxStrategyProvider"])); };
RxContextComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: RxContextComponent, selectors: [["rxa-rx-context"]], hostAttrs: [1, "m-1", "p-1", 2, "display", "block"], features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_0__["RxStrategyProvider"]])], decls: 62, vars: 19, consts: [["visualizerHeader", ""], [3, "strategyChange"], ["triggers", "rxaTriggerProvider"], [3, "buttons"], ["a", "rxaArrayProvider"], [1, "mt-5", "row", "w-100", "d-flex"], [1, "col", "dh-embedded-view", "p-2"], [1, "ctx", "before", 3, "rxContextContainer", "suspenseTrg", "errorTrg", "completeTrg"], ["rxAfterContext", "", 4, "rxFor", "rxForOf"], ["rxSuspense", "", 1, "tpl", "rx-suspense-tpl", "d-flex", "justify-content-start", "align-items-center", "w-100"], [1, "ml-1", "flex-grow-1"], ["rxComplete", "", 1, "tpl", "rx-complete-tpl", "d-flex", "justify-content-start", "align-items-center", "w-100"], ["rxError", "", 1, "tpl", "rx-error-tpl", "d-flex", "justify-content-start", "align-items-center", "w-100"], [1, "ctx", "custom", 3, "rxContextContainer", "suspenseTrg", "errorTrg", "completeTrg"], [4, "rxFor", "rxForOf"], ["rxSuspense", "", 1, "tpl", "rx-suspense-tpl", "d-flex", "justify-content-center", "align-items-center"], [3, "diameter", "color", "mode"], ["rxComplete", "", 1, "tpl", "rx-complete-tpl", "d-flex", "justify-content-center", "align-items-center"], ["rxError", "", 1, "tpl", "rx-error-tpl", "d-flex", "justify-content-center", "align-items-center"], [1, "tpl", "ctx", "after", 3, "rxContextContainer", "suspenseTrg", "errorTrg", "completeTrg"], ["rxAfterContext", ""]], template: function RxContextComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "rxa-strategy-select", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("strategyChange", function RxContextComponent_Template_rxa_strategy_select_strategyChange_2_listener($event) { return ctx.strategyProvider.primaryStrategy = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "rxa-trigger-provider", null, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "rxa-array-provider", 3, 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "Placed before");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](13, RxContextComponent_ul_13_Template, 3, 2, "ul", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16, "refresh");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "span", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, "Loading...");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](21, "thumb_up");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "span", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](23, "Congrats!");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](25, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](26, "thumb_down");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](27, "span", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](28, "Ups.");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](29, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](30, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](31, "Placed custom");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](32, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](33, RxContextComponent_ul_33_Template, 3, 2, "ul", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](34, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](35, "mat-progress-spinner", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](36, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](37, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](38, "thumb_up");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](39, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](40, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](41, "thumb_down");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](42, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](43, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](44, "Placed after");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](45, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](46, RxContextComponent_ul_46_Template, 3, 2, "ul", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](47, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](48, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](49, "refresh");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](50, "span", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](51, "Loading...");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](52, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](53, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](54, "thumb_up");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](55, "span", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](56, "Congrats!");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](57, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](58, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](59, "thumb_down");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](60, "span", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](61, "Ups.");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](4);
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("buttons", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("rxContextContainer", _r1.array$)("suspenseTrg", _r0.suspense$)("errorTrg", _r0.error$)("completeTrg", _r0.complete$);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("rxForOf", _r1.array$);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](19);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("rxContextContainer", _r1.array$)("suspenseTrg", _r0.suspense$)("errorTrg", _r0.error$)("completeTrg", _r0.complete$);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("rxForOf", _r1.array$);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("diameter", 80)("color", "accent")("mode", "indeterminate");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("rxContextContainer", _r1.array$)("suspenseTrg", _r0.suspense$)("errorTrg", _r0.error$)("completeTrg", _r0.complete$);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("rxForOf", _r1.array$);
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__["VisualizerComponent"], _shared_debug_helper_strategy_select_strategy_select_strategy_select_component__WEBPACK_IMPORTED_MODULE_3__["StrategySelectComponent"], _shared_debug_helper_trigger_provider_trigger_provider_component__WEBPACK_IMPORTED_MODULE_4__["TriggerProviderComponent"], _shared_debug_helper_value_provider_array_provider_array_provider_component__WEBPACK_IMPORTED_MODULE_5__["ArrayProviderComponent"], _rx_angular_pocs_template_components_context_rx_context_component__WEBPACK_IMPORTED_MODULE_6__["RxContextContainer"], _rx_angular_pocs_template_directives_for_rx_for_directive__WEBPACK_IMPORTED_MODULE_7__["RxFor"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__["MatIcon"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_9__["MatProgressSpinner"]], styles: [".ctx[_ngcontent-%COMP%] {\n        border: 1px dashed hotpink;\n        padding: 15px;\n      }\n\n      .ctx.before[_ngcontent-%COMP%]   .tpl[_ngcontent-%COMP%], .ctx.after[_ngcontent-%COMP%]   .rx-suspense-tpl[_ngcontent-%COMP%], .ctx.after[_ngcontent-%COMP%]   .rx-error-tpl[_ngcontent-%COMP%], .ctx.after[_ngcontent-%COMP%]   .rx-complete-tpl[_ngcontent-%COMP%] {\n        border: 2px solid;\n      }\n\n      .ctx.before[_ngcontent-%COMP%]   .rx-suspense-tpl[_ngcontent-%COMP%], .ctx.after[_ngcontent-%COMP%]   .rx-suspense-tpl[_ngcontent-%COMP%] {\n        border-color: #536dfe;\n        color: #536dfe;\n      }\n\n      .ctx.before[_ngcontent-%COMP%]   .rx-error-tpl[_ngcontent-%COMP%], .ctx.after[_ngcontent-%COMP%]   .rx-error-tpl[_ngcontent-%COMP%] {\n        border-color: #dc0030;\n        color: #dc0030;\n      }\n\n      .ctx.before[_ngcontent-%COMP%]   .rx-complete-tpl[_ngcontent-%COMP%], .ctx.after[_ngcontent-%COMP%]   .rx-complete-tpl[_ngcontent-%COMP%] {\n        border-color: #008800;\n        color: #008800;\n      }\n\n      .ctx.custom[_ngcontent-%COMP%] {\n        position: relative;\n        min-height: 100px;\n      }\n      .ctx.custom[_ngcontent-%COMP%]   .rx-error-tpl[_ngcontent-%COMP%], .ctx.custom[_ngcontent-%COMP%]   .rx-complete-tpl[_ngcontent-%COMP%], .ctx.custom[_ngcontent-%COMP%]   .rx-suspense-tpl[_ngcontent-%COMP%] {\n        background-color: rgba(0,0,0,0.75);\n        position: absolute;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n      }\n\n      .ctx.custom[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%], .ctx.custom[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%], .ctx.custom[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%] {\n        margin: 20px auto;\n        font-size: 5rem;\n        height: initial;\n        width: initial;\n      }\n      .ctx.custom[_ngcontent-%COMP%]   .rx-suspense-tpl[_ngcontent-%COMP%]   .mat-progress-spinner[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%], .ctx.custom[_ngcontent-%COMP%]   .rx-suspense-tpl[_ngcontent-%COMP%]    > .mat-spinner[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%], .ctx.custom[_ngcontent-%COMP%]   .rx-suspense-tpl[_ngcontent-%COMP%] {\n        color: #536dfe;\n        stroke: #536dfe !important;\n      }\n\n      .ctx.custom[_ngcontent-%COMP%]   .rx-error-tpl[_ngcontent-%COMP%]{\n        color: #dc0030;\n      }\n\n      .ctx.custom[_ngcontent-%COMP%]   .rx-complete-tpl[_ngcontent-%COMP%]{\n        color: #008800;\n      }"] });


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

/***/ "ZqPf":
/*!*************************************************************************************!*\
  !*** ./apps/demos/src/app/features/template/rx-context/rx-context.routed.module.ts ***!
  \*************************************************************************************/
/*! exports provided: RxContextRoutedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RxContextRoutedModule", function() { return RxContextRoutedModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _rx_context_routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rx-context.routes */ "jnnS");
/* harmony import */ var _rx_context_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rx-context.module */ "wGdE");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");





class RxContextRoutedModule {
}
RxContextRoutedModule.ɵfac = function RxContextRoutedModule_Factory(t) { return new (t || RxContextRoutedModule)(); };
RxContextRoutedModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: RxContextRoutedModule });
RxContextRoutedModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[_rx_context_module__WEBPACK_IMPORTED_MODULE_2__["RxContextDemoModule"], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(_rx_context_routes__WEBPACK_IMPORTED_MODULE_1__["ROUTES"])]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](RxContextRoutedModule, { imports: [_rx_context_module__WEBPACK_IMPORTED_MODULE_2__["RxContextDemoModule"], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


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

/***/ "jSfE":
/*!***********************************************************************************************!*\
  !*** ./apps/demos/src/app/shared/debug-helper/trigger-provider/trigger-provider.component.ts ***!
  \***********************************************************************************************/
/*! exports provided: TriggerProviderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TriggerProviderComponent", function() { return TriggerProviderComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _zone_patched_icon_zone_patched_icon_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../zone-patched-icon/zone-patched-icon.component */ "Lj2X");
/* harmony import */ var _libs_template_src_lib_experimental_unpatch_events_unpatch_events_experimental_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../../libs/template/src/lib/experimental/unpatch/events/unpatch-events.experimental.directive */ "QZMm");






const _c0 = ["*"];
class TriggerProviderComponent {
    constructor() {
        this.suspense$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.error$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.complete$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.error = 'Custom error value';
    }
    getZoneState() {
        var _a;
        return ((_a = this.unpatched) === null || _a === void 0 ? void 0 : _a.length) === 0 ? 'patched' : 'unpatched';
    }
}
TriggerProviderComponent.ɵfac = function TriggerProviderComponent_Factory(t) { return new (t || TriggerProviderComponent)(); };
TriggerProviderComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: TriggerProviderComponent, selectors: [["rxa-trigger-provider"]], inputs: { unpatched: "unpatched", error: "error" }, exportAs: ["rxaTriggerProvider"], ngContentSelectors: _c0, decls: 11, vars: 5, consts: [["mat-raised-button", "", 3, "click"], [1, "mat-icon", 3, "zoneState"], ["mat-raised-button", "", 3, "unpatch", "click"]], template: function TriggerProviderComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function TriggerProviderComponent_Template_button_click_0_listener() { return ctx.suspense$.next(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Suspense ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "rxa-zone-patched-icon", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function TriggerProviderComponent_Template_button_click_4_listener() { return ctx.error$.next(ctx.error); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, " Error ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "rxa-zone-patched-icon", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function TriggerProviderComponent_Template_button_click_7_listener() { return ctx.complete$.next(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, " Complete ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](9, "rxa-zone-patched-icon", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](10);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("zoneState", ctx.getZoneState());
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("unpatch", ctx.unpatched);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("zoneState", ctx.getZoneState());
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("unpatch", ctx.unpatched);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("zoneState", ctx.getZoneState());
    } }, directives: [_angular_material_button__WEBPACK_IMPORTED_MODULE_2__["MatButton"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__["MatIcon"], _zone_patched_icon_zone_patched_icon_component__WEBPACK_IMPORTED_MODULE_4__["ZonePatchedIconComponent"], _libs_template_src_lib_experimental_unpatch_events_unpatch_events_experimental_directive__WEBPACK_IMPORTED_MODULE_5__["UnpatchEventsDirective"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "jnnS":
/*!******************************************************************************!*\
  !*** ./apps/demos/src/app/features/template/rx-context/rx-context.routes.ts ***!
  \******************************************************************************/
/*! exports provided: ROUTES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROUTES", function() { return ROUTES; });
/* harmony import */ var _rx_context_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rx-context.component */ "K2f6");

const ROUTES = [
    {
        path: '',
        component: _rx_context_component__WEBPACK_IMPORTED_MODULE_0__["RxContextComponent"],
    }
];


/***/ }),

/***/ "mU7m":
/*!********************************************************************************************!*\
  !*** ./apps/demos/src/app/shared/debug-helper/trigger-provider/trigger-provider.module.ts ***!
  \********************************************************************************************/
/*! exports provided: TriggerProviderModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TriggerProviderModule", function() { return TriggerProviderModule; });
/* harmony import */ var _trigger_provider_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./trigger-provider.component */ "jSfE");
/* harmony import */ var _zone_patched_icon_zone_patched_icon_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../zone-patched-icon/zone-patched-icon.module */ "xXlh");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @rx-angular/template */ "WFkj");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");






class TriggerProviderModule {
}
TriggerProviderModule.ɵfac = function TriggerProviderModule_Factory(t) { return new (t || TriggerProviderModule)(); };
TriggerProviderModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({ type: TriggerProviderModule });
TriggerProviderModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({ imports: [[
            _zone_patched_icon_zone_patched_icon_module__WEBPACK_IMPORTED_MODULE_1__["ZonePatchedIconModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"],
            _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__["LetModule"],
            _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__["PushModule"],
            _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__["UnpatchEventsModule"],
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__["MatIconModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](TriggerProviderModule, { declarations: [_trigger_provider_component__WEBPACK_IMPORTED_MODULE_0__["TriggerProviderComponent"]], imports: [_zone_patched_icon_zone_patched_icon_module__WEBPACK_IMPORTED_MODULE_1__["ZonePatchedIconModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"],
        _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__["LetModule"],
        _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__["PushModule"],
        _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__["UnpatchEventsModule"],
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__["MatIconModule"]], exports: [_trigger_provider_component__WEBPACK_IMPORTED_MODULE_0__["TriggerProviderComponent"]] }); })();


/***/ }),

/***/ "wGdE":
/*!******************************************************************************!*\
  !*** ./apps/demos/src/app/features/template/rx-context/rx-context.module.ts ***!
  \******************************************************************************/
/*! exports provided: RxContextDemoModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RxContextDemoModule", function() { return RxContextDemoModule; });
/* harmony import */ var _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../shared/debug-helper/visualizer */ "cyPU");
/* harmony import */ var _shared_debug_helper_strategy_select__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/debug-helper/strategy-select */ "eakK");
/* harmony import */ var _shared_debug_helper_value_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared/debug-helper/value-provider */ "DJi3");
/* harmony import */ var _rx_context_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rx-context.component */ "K2f6");
/* harmony import */ var _shared_ghost_elements__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../shared/ghost-elements */ "K9NQ");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/progress-bar */ "bv9b");
/* harmony import */ var _shared_debug_helper_trigger_provider_trigger_provider_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../shared/debug-helper/trigger-provider/trigger-provider.module */ "mU7m");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");
/* harmony import */ var _shared_debug_helper_dirty_checks__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../shared/debug-helper/dirty-checks */ "v95w");
/* harmony import */ var _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../rx-angular-pocs */ "caVP");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/progress-spinner */ "Xa2L");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/core */ "fXoL");
















const DECLARATIONS = [
    _rx_context_component__WEBPACK_IMPORTED_MODULE_3__["RxContextComponent"]
];
class RxContextDemoModule {
}
RxContextDemoModule.ɵfac = function RxContextDemoModule_Factory(t) { return new (t || RxContextDemoModule)(); };
RxContextDemoModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdefineNgModule"]({ type: RxContextDemoModule });
RxContextDemoModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdefineInjector"]({ providers: [], imports: [[
            _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_12__["RxLetModule"],
            _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_0__["VisualizerModule"],
            _shared_debug_helper_value_provider__WEBPACK_IMPORTED_MODULE_2__["ValueProvidersModule"],
            _shared_debug_helper_strategy_select__WEBPACK_IMPORTED_MODULE_1__["StrategySelectModule"],
            _shared_ghost_elements__WEBPACK_IMPORTED_MODULE_4__["GhostElementsModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_5__["MatButtonModule"],
            _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_6__["MatProgressBarModule"],
            _shared_debug_helper_trigger_provider_trigger_provider_module__WEBPACK_IMPORTED_MODULE_7__["TriggerProviderModule"],
            _angular_material_input__WEBPACK_IMPORTED_MODULE_8__["MatInputModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_9__["RouterModule"],
            _angular_material_card__WEBPACK_IMPORTED_MODULE_10__["MatCardModule"],
            _shared_debug_helper_dirty_checks__WEBPACK_IMPORTED_MODULE_11__["DirtyChecksModule"],
            _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_12__["RxForModule"],
            _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_12__["RxContextModule"],
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__["MatIconModule"],
            _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_14__["MatProgressSpinnerModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵsetNgModuleScope"](RxContextDemoModule, { declarations: [_rx_context_component__WEBPACK_IMPORTED_MODULE_3__["RxContextComponent"]], imports: [_rx_angular_pocs__WEBPACK_IMPORTED_MODULE_12__["RxLetModule"],
        _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_0__["VisualizerModule"],
        _shared_debug_helper_value_provider__WEBPACK_IMPORTED_MODULE_2__["ValueProvidersModule"],
        _shared_debug_helper_strategy_select__WEBPACK_IMPORTED_MODULE_1__["StrategySelectModule"],
        _shared_ghost_elements__WEBPACK_IMPORTED_MODULE_4__["GhostElementsModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_5__["MatButtonModule"],
        _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_6__["MatProgressBarModule"],
        _shared_debug_helper_trigger_provider_trigger_provider_module__WEBPACK_IMPORTED_MODULE_7__["TriggerProviderModule"],
        _angular_material_input__WEBPACK_IMPORTED_MODULE_8__["MatInputModule"],
        _angular_router__WEBPACK_IMPORTED_MODULE_9__["RouterModule"],
        _angular_material_card__WEBPACK_IMPORTED_MODULE_10__["MatCardModule"],
        _shared_debug_helper_dirty_checks__WEBPACK_IMPORTED_MODULE_11__["DirtyChecksModule"],
        _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_12__["RxForModule"],
        _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_12__["RxContextModule"],
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__["MatIconModule"],
        _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_14__["MatProgressSpinnerModule"]], exports: [_rx_context_component__WEBPACK_IMPORTED_MODULE_3__["RxContextComponent"]] }); })();


/***/ })

}]);
//# sourceMappingURL=rx-context-rx-context-routed-module.js.map