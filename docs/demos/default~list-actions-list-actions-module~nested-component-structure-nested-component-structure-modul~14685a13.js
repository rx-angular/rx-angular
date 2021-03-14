(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~list-actions-list-actions-module~nested-component-structure-nested-component-structure-modul~14685a13"],{

/***/ "3KF3":
/*!***********************************************************************************************!*\
  !*** ./apps/demos/src/app/shared/template-structures/recursive/recursive-static.component.ts ***!
  \***********************************************************************************************/
/*! exports provided: RecursiveStaticComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecursiveStaticComponent", function() { return RecursiveStaticComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _debug_helper_renderings_renderings_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../debug-helper/renderings/renderings.component */ "y3ji");




function RecursiveStaticComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "rxa-visualizer");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "p", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "rxa-renders", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Level ", ctx_r0.total - ctx_r0.level, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value$", ctx_r0.value);
} }
function RecursiveStaticComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "rxa-visualizer");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "rxa-recursive-static", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Level ", ctx_r2.total - ctx_r2.level, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("total", ctx_r2.total)("level", ctx_r2.level - 1)("value", ctx_r2.value);
} }
class RecursiveStaticComponent {
    constructor() {
        this.total = 0;
        this.level = 0;
    }
    set depth(d) {
        this.total = d;
        this.level = this.total - 1;
    }
}
RecursiveStaticComponent.ɵfac = function RecursiveStaticComponent_Factory(t) { return new (t || RecursiveStaticComponent)(); };
RecursiveStaticComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: RecursiveStaticComponent, selectors: [["rxa-recursive-static"]], hostAttrs: [1, "d-flex", "w-100"], inputs: { depth: "depth", total: "total", level: "level", value: "value" }, decls: 3, vars: 2, consts: [[4, "ngIf", "ngIfElse"], ["branch", ""], ["visualizerHeader", ""], [3, "value$"], [3, "total", "level", "value"]], template: function RecursiveStaticComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, RecursiveStaticComponent_ng_container_0_Template, 5, 2, "ng-container", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, RecursiveStaticComponent_ng_template_1_Template, 4, 4, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.level === 0)("ngIfElse", _r1);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["NgIf"], _debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__["VisualizerComponent"], _debug_helper_renderings_renderings_component__WEBPACK_IMPORTED_MODULE_3__["RenderingsComponent"], RecursiveStaticComponent], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "5in/":
/*!**********************************************************************************************************!*\
  !*** ./apps/demos/src/app/shared/template-structures/recursive/recursive-embedded-view-let.component.ts ***!
  \**********************************************************************************************************/
/*! exports provided: RecursiveEmbeddedViewLetComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecursiveEmbeddedViewLetComponent", function() { return RecursiveEmbeddedViewLetComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _debug_helper_renderings_renderings_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../debug-helper/renderings/renderings.component */ "y3ji");





function RecursiveEmbeddedViewLetComponent_ng_container_0_rxa_renders_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "rxa-renders", 4);
} if (rf & 2) {
    const v_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value$", v_r4);
} }
function RecursiveEmbeddedViewLetComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "rxa-visualizer");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "p", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, RecursiveEmbeddedViewLetComponent_ng_container_0_rxa_renders_4_Template, 1, 1, "rxa-renders", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Level ", ctx_r0.total - ctx_r0.level, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("poc1Let", ctx_r0.value$);
} }
function RecursiveEmbeddedViewLetComponent_ng_template_1_rxa_recursive_embedded_view_let_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "rxa-recursive-embedded-view-let", 6);
} if (rf & 2) {
    const v_r6 = ctx.$implicit;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("total", ctx_r5.total)("level", ctx_r5.level - 1)("value", v_r6);
} }
function RecursiveEmbeddedViewLetComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "rxa-visualizer");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "p", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, RecursiveEmbeddedViewLetComponent_ng_template_1_rxa_recursive_embedded_view_let_3_Template, 1, 3, "rxa-recursive-embedded-view-let", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Level ", ctx_r2.total - ctx_r2.level, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("poc1Let", ctx_r2.value$);
} }
class RecursiveEmbeddedViewLetComponent {
    constructor() {
        this.total = 0;
        this.level = 0;
        this.value$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["ReplaySubject"](1);
    }
    set depth(d) {
        this.total = d;
        this.level = this.total - 1;
    }
    set value(v) {
        this.value$.next(v);
    }
    ;
}
RecursiveEmbeddedViewLetComponent.ɵfac = function RecursiveEmbeddedViewLetComponent_Factory(t) { return new (t || RecursiveEmbeddedViewLetComponent)(); };
RecursiveEmbeddedViewLetComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: RecursiveEmbeddedViewLetComponent, selectors: [["rxa-recursive-embedded-view-let"]], hostAttrs: [1, "d-flex", "w-100"], inputs: { depth: "depth", total: "total", level: "level", value: "value" }, decls: 3, vars: 2, consts: [[4, "ngIf", "ngIfElse"], ["branch", ""], ["visualizerHeader", ""], [3, "value$", 4, "poc1Let"], [3, "value$"], [3, "total", "level", "value", 4, "poc1Let"], [3, "total", "level", "value"]], template: function RecursiveEmbeddedViewLetComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, RecursiveEmbeddedViewLetComponent_ng_container_0_Template, 5, 2, "ng-container", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, RecursiveEmbeddedViewLetComponent_ng_template_1_Template, 4, 2, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.level === 0)("ngIfElse", _r1);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], _debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_3__["VisualizerComponent"], _debug_helper_renderings_renderings_component__WEBPACK_IMPORTED_MODULE_4__["RenderingsComponent"], RecursiveEmbeddedViewLetComponent], encapsulation: 2, changeDetection: 0 });


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

/***/ "IRaS":
/*!**********************************************************************************************!*\
  !*** ./apps/demos/src/app/shared/template-structures/recursive/recursive-async.component.ts ***!
  \**********************************************************************************************/
/*! exports provided: RecursiveAsyncComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecursiveAsyncComponent", function() { return RecursiveAsyncComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _debug_helper_renderings_renderings_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../debug-helper/renderings/renderings.component */ "y3ji");





function RecursiveAsyncComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "rxa-visualizer");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "p", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "rxa-renders", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](5, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Level ", ctx_r0.total - ctx_r0.level, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value$", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](5, 2, ctx_r0.value$));
} }
function RecursiveAsyncComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "rxa-visualizer");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "p", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "rxa-recursive-async", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](4, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Level ", ctx_r2.total - ctx_r2.level, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("total", ctx_r2.total)("level", ctx_r2.level - 1)("value", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](4, 4, ctx_r2.value$));
} }
class RecursiveAsyncComponent {
    constructor() {
        this.total = 0;
        this.level = 0;
        this.value$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["ReplaySubject"](1);
    }
    set depth(d) {
        this.total = d;
        this.level = this.total - 1;
    }
    set value(v) {
        this.value$.next(v);
    }
    ;
}
RecursiveAsyncComponent.ɵfac = function RecursiveAsyncComponent_Factory(t) { return new (t || RecursiveAsyncComponent)(); };
RecursiveAsyncComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: RecursiveAsyncComponent, selectors: [["rxa-recursive-async"]], hostAttrs: [1, "d-flex", "w-100"], inputs: { depth: "depth", total: "total", level: "level", value: "value" }, decls: 3, vars: 2, consts: [[4, "ngIf", "ngIfElse"], ["branch", ""], ["visualizerHeader", ""], [3, "value$"], [3, "total", "level", "value"]], template: function RecursiveAsyncComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, RecursiveAsyncComponent_ng_container_0_Template, 6, 4, "ng-container", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, RecursiveAsyncComponent_ng_template_1_Template, 5, 6, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.level === 0)("ngIfElse", _r1);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], _debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_3__["VisualizerComponent"], _debug_helper_renderings_renderings_component__WEBPACK_IMPORTED_MODULE_4__["RenderingsComponent"], RecursiveAsyncComponent], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["AsyncPipe"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "J2SZ":
/*!*************************************************************************************!*\
  !*** ./apps/demos/src/app/shared/template-structures/recursive/recursive.module.ts ***!
  \*************************************************************************************/
/*! exports provided: RecursiveModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecursiveModule", function() { return RecursiveModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _rx_angular_template__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @rx-angular/template */ "WFkj");
/* harmony import */ var _debug_helper_dirty_checks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../debug-helper/dirty-checks */ "v95w");
/* harmony import */ var _debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../debug-helper/visualizer */ "cyPU");
/* harmony import */ var _recursive_observable_work_async_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./recursive-observable-work-async.component */ "kU1c");
/* harmony import */ var _recursive_observable_work_push_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./recursive-observable-work-push.component */ "ewnK");
/* harmony import */ var _recursive_observable_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./recursive-observable.component */ "yxJE");
/* harmony import */ var _recursive_static_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./recursive-static.component */ "3KF3");
/* harmony import */ var _debug_helper_value_provider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../debug-helper/value-provider */ "DJi3");
/* harmony import */ var _debug_helper_renderings__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../debug-helper/renderings */ "J4DI");
/* harmony import */ var _recursive_async_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./recursive-async.component */ "IRaS");
/* harmony import */ var _recursive_push_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./recursive-push.component */ "JYoI");
/* harmony import */ var _recursive_embedded_view_let_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./recursive-embedded-view-let.component */ "5in/");
/* harmony import */ var _recursive_component_let_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./recursive-component-let.component */ "ind8");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/core */ "fXoL");
















const DECLARATIONS = [
    _recursive_static_component__WEBPACK_IMPORTED_MODULE_8__["RecursiveStaticComponent"],
    _recursive_observable_component__WEBPACK_IMPORTED_MODULE_7__["RecursiveObservableComponent"],
    _recursive_async_component__WEBPACK_IMPORTED_MODULE_11__["RecursiveAsyncComponent"],
    _recursive_push_component__WEBPACK_IMPORTED_MODULE_12__["RecursivePushComponent"],
    _recursive_component_let_component__WEBPACK_IMPORTED_MODULE_14__["RecursiveComponentLetComponent"],
    _recursive_embedded_view_let_component__WEBPACK_IMPORTED_MODULE_13__["RecursiveEmbeddedViewLetComponent"],
    _recursive_observable_work_push_component__WEBPACK_IMPORTED_MODULE_6__["RecursiveObservableWorkPushComponent"],
    _recursive_observable_work_async_component__WEBPACK_IMPORTED_MODULE_5__["RecursiveObservableWorkAsyncComponent"]
];
class RecursiveModule {
}
RecursiveModule.ɵfac = function RecursiveModule_Factory(t) { return new (t || RecursiveModule)(); };
RecursiveModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdefineNgModule"]({ type: RecursiveModule });
RecursiveModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_1__["MatButtonModule"],
            _debug_helper_dirty_checks__WEBPACK_IMPORTED_MODULE_3__["DirtyChecksModule"],
            _rx_angular_template__WEBPACK_IMPORTED_MODULE_2__["UnpatchEventsModule"],
            _rx_angular_template__WEBPACK_IMPORTED_MODULE_2__["PushModule"],
            _debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_4__["VisualizerModule"],
            _debug_helper_value_provider__WEBPACK_IMPORTED_MODULE_9__["ValueProvidersModule"],
            _debug_helper_renderings__WEBPACK_IMPORTED_MODULE_10__["RenderingsModule"],
            _rx_angular_template__WEBPACK_IMPORTED_MODULE_2__["LetModule"], _rx_angular_template__WEBPACK_IMPORTED_MODULE_2__["PushModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵsetNgModuleScope"](RecursiveModule, { declarations: [_recursive_static_component__WEBPACK_IMPORTED_MODULE_8__["RecursiveStaticComponent"],
        _recursive_observable_component__WEBPACK_IMPORTED_MODULE_7__["RecursiveObservableComponent"],
        _recursive_async_component__WEBPACK_IMPORTED_MODULE_11__["RecursiveAsyncComponent"],
        _recursive_push_component__WEBPACK_IMPORTED_MODULE_12__["RecursivePushComponent"],
        _recursive_component_let_component__WEBPACK_IMPORTED_MODULE_14__["RecursiveComponentLetComponent"],
        _recursive_embedded_view_let_component__WEBPACK_IMPORTED_MODULE_13__["RecursiveEmbeddedViewLetComponent"],
        _recursive_observable_work_push_component__WEBPACK_IMPORTED_MODULE_6__["RecursiveObservableWorkPushComponent"],
        _recursive_observable_work_async_component__WEBPACK_IMPORTED_MODULE_5__["RecursiveObservableWorkAsyncComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_1__["MatButtonModule"],
        _debug_helper_dirty_checks__WEBPACK_IMPORTED_MODULE_3__["DirtyChecksModule"],
        _rx_angular_template__WEBPACK_IMPORTED_MODULE_2__["UnpatchEventsModule"],
        _rx_angular_template__WEBPACK_IMPORTED_MODULE_2__["PushModule"],
        _debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_4__["VisualizerModule"],
        _debug_helper_value_provider__WEBPACK_IMPORTED_MODULE_9__["ValueProvidersModule"],
        _debug_helper_renderings__WEBPACK_IMPORTED_MODULE_10__["RenderingsModule"],
        _rx_angular_template__WEBPACK_IMPORTED_MODULE_2__["LetModule"], _rx_angular_template__WEBPACK_IMPORTED_MODULE_2__["PushModule"]], exports: [_recursive_static_component__WEBPACK_IMPORTED_MODULE_8__["RecursiveStaticComponent"],
        _recursive_observable_component__WEBPACK_IMPORTED_MODULE_7__["RecursiveObservableComponent"],
        _recursive_async_component__WEBPACK_IMPORTED_MODULE_11__["RecursiveAsyncComponent"],
        _recursive_push_component__WEBPACK_IMPORTED_MODULE_12__["RecursivePushComponent"],
        _recursive_component_let_component__WEBPACK_IMPORTED_MODULE_14__["RecursiveComponentLetComponent"],
        _recursive_embedded_view_let_component__WEBPACK_IMPORTED_MODULE_13__["RecursiveEmbeddedViewLetComponent"],
        _recursive_observable_work_push_component__WEBPACK_IMPORTED_MODULE_6__["RecursiveObservableWorkPushComponent"],
        _recursive_observable_work_async_component__WEBPACK_IMPORTED_MODULE_5__["RecursiveObservableWorkAsyncComponent"]] }); })();


/***/ }),

/***/ "JYoI":
/*!*********************************************************************************************!*\
  !*** ./apps/demos/src/app/shared/template-structures/recursive/recursive-push.component.ts ***!
  \*********************************************************************************************/
/*! exports provided: RecursivePushComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecursivePushComponent", function() { return RecursivePushComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _debug_helper_renderings_renderings_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../debug-helper/renderings/renderings.component */ "y3ji");
/* harmony import */ var _libs_template_src_lib_push_push_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../../libs/template/src/lib/push/push.pipe */ "duzR");






function RecursivePushComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "rxa-visualizer");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "p", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "rxa-renders", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](5, "push");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Level ", ctx_r0.total - ctx_r0.level, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value$", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](5, 2, ctx_r0.value$));
} }
function RecursivePushComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "rxa-visualizer");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "p", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "rxa-recursive-push", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](4, "push");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Level ", ctx_r2.total - ctx_r2.level, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("total", ctx_r2.total)("level", ctx_r2.level - 1)("value", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](4, 4, ctx_r2.value$));
} }
class RecursivePushComponent {
    constructor() {
        this.total = 0;
        this.level = 0;
        this.value$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["ReplaySubject"](1);
    }
    set depth(d) {
        this.total = d;
        this.level = this.total - 1;
    }
    set value(v) {
        this.value$.next(v);
    }
    ;
}
RecursivePushComponent.ɵfac = function RecursivePushComponent_Factory(t) { return new (t || RecursivePushComponent)(); };
RecursivePushComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: RecursivePushComponent, selectors: [["rxa-recursive-push"]], hostAttrs: [1, "d-flex", "w-100"], inputs: { depth: "depth", total: "total", level: "level", value: "value" }, decls: 3, vars: 2, consts: [[4, "ngIf", "ngIfElse"], ["branch", ""], ["visualizerHeader", ""], [3, "value$"], [3, "total", "level", "value"]], template: function RecursivePushComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, RecursivePushComponent_ng_container_0_Template, 6, 4, "ng-container", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, RecursivePushComponent_ng_template_1_Template, 5, 6, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.level === 0)("ngIfElse", _r1);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], _debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_3__["VisualizerComponent"], _debug_helper_renderings_renderings_component__WEBPACK_IMPORTED_MODULE_4__["RenderingsComponent"], RecursivePushComponent], pipes: [_libs_template_src_lib_push_push_pipe__WEBPACK_IMPORTED_MODULE_5__["PushPipe"]], encapsulation: 2, changeDetection: 0 });


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

/***/ "ewnK":
/*!*************************************************************************************************************!*\
  !*** ./apps/demos/src/app/shared/template-structures/recursive/recursive-observable-work-push.component.ts ***!
  \*************************************************************************************************************/
/*! exports provided: RecursiveObservableWorkPushComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecursiveObservableWorkPushComponent", function() { return RecursiveObservableWorkPushComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _debug_helper_visualizer_visualizer_work_visualizer_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../debug-helper/visualizer/visualizer/work-visualizer.component */ "Sbge");
/* harmony import */ var _libs_template_src_lib_push_push_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../../libs/template/src/lib/push/push.pipe */ "duzR");





function RecursiveObservableWorkPushComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "rxa-work-visualizer", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "p", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](5, "push");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("work", ctx_r0.work);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Level ", ctx_r0.total - ctx_r0.level, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](5, 3, ctx_r0.value$), " ");
} }
function RecursiveObservableWorkPushComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "rxa-work-visualizer", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "p", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "rxa-recursive-observable-work-push", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("work", ctx_r2.work);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Level ", ctx_r2.total - ctx_r2.level, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("work", ctx_r2.work)("total", ctx_r2.total)("level", ctx_r2.level - 1)("value$", ctx_r2.value$);
} }
class RecursiveObservableWorkPushComponent {
    constructor() {
        this.work = 10;
        this.total = 0;
        this.level = 0;
    }
    set depth(d) {
        this.total = d;
        this.level = this.total - 1;
    }
}
RecursiveObservableWorkPushComponent.ɵfac = function RecursiveObservableWorkPushComponent_Factory(t) { return new (t || RecursiveObservableWorkPushComponent)(); };
RecursiveObservableWorkPushComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: RecursiveObservableWorkPushComponent, selectors: [["rxa-recursive-observable-work-push"]], hostAttrs: [1, "d-flex", "w-100"], inputs: { depth: "depth", work: "work", total: "total", level: "level", value$: "value$" }, decls: 3, vars: 2, consts: [[4, "ngIf", "ngIfElse"], ["branch", ""], [3, "work"], ["visualizerHeader", ""], [3, "work", "total", "level", "value$"]], template: function RecursiveObservableWorkPushComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, RecursiveObservableWorkPushComponent_ng_container_0_Template, 6, 5, "ng-container", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, RecursiveObservableWorkPushComponent_ng_template_1_Template, 4, 6, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.level === 0)("ngIfElse", _r1);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], _debug_helper_visualizer_visualizer_work_visualizer_component__WEBPACK_IMPORTED_MODULE_3__["WorkVisualizerComponent"], RecursiveObservableWorkPushComponent], pipes: [_libs_template_src_lib_push_push_pipe__WEBPACK_IMPORTED_MODULE_4__["PushPipe"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "ind8":
/*!******************************************************************************************************!*\
  !*** ./apps/demos/src/app/shared/template-structures/recursive/recursive-component-let.component.ts ***!
  \******************************************************************************************************/
/*! exports provided: RecursiveComponentLetComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecursiveComponentLetComponent", function() { return RecursiveComponentLetComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _debug_helper_renderings_renderings_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../debug-helper/renderings/renderings.component */ "y3ji");
/* harmony import */ var _libs_template_src_lib_let_let_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../../libs/template/src/lib/let/let.directive */ "cihl");






function RecursiveComponentLetComponent_ng_container_0_rxa_renders_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "rxa-renders", 4);
} if (rf & 2) {
    const v_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value$", v_r4);
} }
function RecursiveComponentLetComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "rxa-visualizer");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "p", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, RecursiveComponentLetComponent_ng_container_0_rxa_renders_4_Template, 1, 1, "rxa-renders", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Level ", ctx_r0.total - ctx_r0.level, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("poc1Let", ctx_r0.value$);
} }
function RecursiveComponentLetComponent_ng_template_1_rxa_recursive_component_let_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "rxa-recursive-component-let", 6);
} if (rf & 2) {
    const v_r6 = ctx.$implicit;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("total", ctx_r5.total)("level", ctx_r5.level - 1)("value", v_r6);
} }
function RecursiveComponentLetComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "rxa-visualizer");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "p", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, RecursiveComponentLetComponent_ng_template_1_rxa_recursive_component_let_3_Template, 1, 3, "rxa-recursive-component-let", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Level ", ctx_r2.total - ctx_r2.level, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("rxLet", ctx_r2.value$);
} }
class RecursiveComponentLetComponent {
    constructor() {
        this.total = 0;
        this.level = 0;
        this.value$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["ReplaySubject"](1);
    }
    set depth(d) {
        this.total = d;
        this.level = this.total - 1;
    }
    set value(v) {
        this.value$.next(v);
    }
    ;
}
RecursiveComponentLetComponent.ɵfac = function RecursiveComponentLetComponent_Factory(t) { return new (t || RecursiveComponentLetComponent)(); };
RecursiveComponentLetComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: RecursiveComponentLetComponent, selectors: [["rxa-recursive-component-let"]], hostAttrs: [1, "d-flex", "w-100"], inputs: { depth: "depth", total: "total", level: "level", value: "value" }, decls: 3, vars: 2, consts: [[4, "ngIf", "ngIfElse"], ["branch", ""], ["visualizerHeader", ""], [3, "value$", 4, "poc1Let"], [3, "value$"], [3, "total", "level", "value", 4, "rxLet"], [3, "total", "level", "value"]], template: function RecursiveComponentLetComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, RecursiveComponentLetComponent_ng_container_0_Template, 5, 2, "ng-container", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, RecursiveComponentLetComponent_ng_template_1_Template, 4, 2, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.level === 0)("ngIfElse", _r1);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], _debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_3__["VisualizerComponent"], _debug_helper_renderings_renderings_component__WEBPACK_IMPORTED_MODULE_4__["RenderingsComponent"], _libs_template_src_lib_let_let_directive__WEBPACK_IMPORTED_MODULE_5__["LetDirective"], RecursiveComponentLetComponent], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "kU1c":
/*!**************************************************************************************************************!*\
  !*** ./apps/demos/src/app/shared/template-structures/recursive/recursive-observable-work-async.component.ts ***!
  \**************************************************************************************************************/
/*! exports provided: RecursiveObservableWorkAsyncComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecursiveObservableWorkAsyncComponent", function() { return RecursiveObservableWorkAsyncComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _debug_helper_visualizer_visualizer_work_visualizer_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../debug-helper/visualizer/visualizer/work-visualizer.component */ "Sbge");




function RecursiveObservableWorkAsyncComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "rxa-work-visualizer", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "p", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](5, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("work", ctx_r0.work);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Level ", ctx_r0.total - ctx_r0.level, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](5, 3, ctx_r0.value$), " ");
} }
function RecursiveObservableWorkAsyncComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "rxa-work-visualizer", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "p", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "rxa-recursive-observable-work-async", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("work", ctx_r2.work);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Level ", ctx_r2.total - ctx_r2.level, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("work", ctx_r2.work)("total", ctx_r2.total)("level", ctx_r2.level - 1)("value$", ctx_r2.value$);
} }
class RecursiveObservableWorkAsyncComponent {
    constructor() {
        this.work = 10;
        this.total = 0;
        this.level = 0;
    }
    set depth(d) {
        this.total = d;
        this.level = this.total - 1;
    }
}
RecursiveObservableWorkAsyncComponent.ɵfac = function RecursiveObservableWorkAsyncComponent_Factory(t) { return new (t || RecursiveObservableWorkAsyncComponent)(); };
RecursiveObservableWorkAsyncComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: RecursiveObservableWorkAsyncComponent, selectors: [["rxa-recursive-observable-work-async"]], hostAttrs: [1, "d-flex", "w-100"], inputs: { depth: "depth", work: "work", total: "total", level: "level", value$: "value$" }, decls: 3, vars: 2, consts: [[4, "ngIf", "ngIfElse"], ["branch", ""], [3, "work"], ["visualizerHeader", ""], [3, "work", "total", "level", "value$"]], template: function RecursiveObservableWorkAsyncComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, RecursiveObservableWorkAsyncComponent_ng_container_0_Template, 6, 5, "ng-container", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, RecursiveObservableWorkAsyncComponent_ng_template_1_Template, 4, 6, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.level === 0)("ngIfElse", _r1);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], _debug_helper_visualizer_visualizer_work_visualizer_component__WEBPACK_IMPORTED_MODULE_3__["WorkVisualizerComponent"], RecursiveObservableWorkAsyncComponent], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["AsyncPipe"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "yxJE":
/*!***************************************************************************************************!*\
  !*** ./apps/demos/src/app/shared/template-structures/recursive/recursive-observable.component.ts ***!
  \***************************************************************************************************/
/*! exports provided: RecursiveObservableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecursiveObservableComponent", function() { return RecursiveObservableComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _debug_helper_renderings_renderings_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../debug-helper/renderings/renderings.component */ "y3ji");





function RecursiveObservableComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "rxa-visualizer");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "p", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "rxa-renders", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Level ", ctx_r0.total - ctx_r0.level, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value$", ctx_r0.value$);
} }
function RecursiveObservableComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "rxa-visualizer");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "p", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "rxa-recursive-observable", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Level ", ctx_r2.total - ctx_r2.level, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("total", ctx_r2.total)("level", ctx_r2.level - 1)("value$", ctx_r2.value$);
} }
class RecursiveObservableComponent {
    constructor() {
        this.total = 0;
        this.level = 0;
    }
    set depth(d) {
        this.total = d;
        this.level = this.total - 1;
    }
}
RecursiveObservableComponent.ɵfac = function RecursiveObservableComponent_Factory(t) { return new (t || RecursiveObservableComponent)(); };
RecursiveObservableComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: RecursiveObservableComponent, selectors: [["rxa-recursive-observable"]], hostAttrs: [1, "d-flex", "w-100"], inputs: { depth: "depth", total: "total", level: "level", value$: "value$" }, decls: 3, vars: 2, consts: [[4, "ngIf", "ngIfElse"], ["branch", ""], ["visualizerHeader", ""], [3, "value$"], [3, "total", "level", "value$"]], template: function RecursiveObservableComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, RecursiveObservableComponent_ng_container_0_Template, 5, 2, "ng-container", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, RecursiveObservableComponent_ng_template_1_Template, 4, 4, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.level === 0)("ngIfElse", _r1);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], _debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_3__["VisualizerComponent"], _debug_helper_renderings_renderings_component__WEBPACK_IMPORTED_MODULE_4__["RenderingsComponent"], RecursiveObservableComponent], encapsulation: 2, changeDetection: 0 });


/***/ })

}]);
//# sourceMappingURL=default~list-actions-list-actions-module~nested-component-structure-nested-component-structure-modul~14685a13.js.map