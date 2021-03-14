(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["nested-vs-injected-nested-vs-injected-module"],{

/***/ "289C":
/*!**********************************************************************************************!*\
  !*** ./apps/demos/src/app/shared/debug-helper/cd-on-push/cd-on-push/cd-on-push.component.ts ***!
  \**********************************************************************************************/
/*! exports provided: CdOnPushComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CdOnPushComponent", function() { return CdOnPushComponent; });
/* harmony import */ var _utils_cd_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/cd-helper */ "h33e");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _cd_trigger_cd_trigger_cd_trigger_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../cd-trigger/cd-trigger/cd-trigger.component */ "ezrg");





const _c0 = [[["", "cdOnPushHeader", ""]], "*"];
const _c1 = ["[cdOnPushHeader]", "*"];
class CdOnPushComponent {
    constructor(cdHelper) {
        this.cdHelper = cdHelper;
    }
}
CdOnPushComponent.ɵfac = function CdOnPushComponent_Factory(t) { return new (t || CdOnPushComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_utils_cd_helper__WEBPACK_IMPORTED_MODULE_0__["CdHelper"])); };
CdOnPushComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: CdOnPushComponent, selectors: [["rxa-cd-on-push"]], hostAttrs: [1, "d-block", "w-100"], features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([_utils_cd_helper__WEBPACK_IMPORTED_MODULE_0__["CdHelper"]])], ngContentSelectors: _c1, decls: 7, vars: 1, consts: [["visualizerHeader", ""], [3, "cdHelper"]], template: function CdOnPushComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojectionDef"](_c0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](1, 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "OnPush");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "rxa-cd-trigger", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](6, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("cdHelper", ctx.cdHelper);
    } }, directives: [_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__["VisualizerComponent"], _cd_trigger_cd_trigger_cd_trigger_component__WEBPACK_IMPORTED_MODULE_3__["CdTriggerComponent"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "6XPC":
/*!**********************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/nested-vs-injected/nested-vs-injected.routes.ts ***!
  \**********************************************************************************************/
/*! exports provided: ROUTES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROUTES", function() { return ROUTES; });
/* harmony import */ var _nested_vs_projected_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nested-vs-projected.component */ "v11e");

const ROUTES = [
    {
        path: '',
        component: _nested_vs_projected_component__WEBPACK_IMPORTED_MODULE_0__["NestedVsProjectedComponent"]
    }
];


/***/ }),

/***/ "DC8L":
/*!***********************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/nested-vs-injected/nested/default-1.component.ts ***!
  \***********************************************************************************************/
/*! exports provided: CdDefault1Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CdDefault1Component", function() { return CdDefault1Component; });
/* harmony import */ var _shared_utils_cd_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../shared/utils/cd-helper */ "h33e");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _shared_debug_helper_cd_trigger_cd_trigger_cd_trigger_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/debug-helper/cd-trigger/cd-trigger/cd-trigger.component */ "ezrg");
/* harmony import */ var _default_2_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./default-2.component */ "d2wR");
/* harmony import */ var _push_3_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./push-3.component */ "X2B+");







const _c0 = [[["", "cdDefaultHeader", ""]]];
const _c1 = ["[cdDefaultHeader]"];
class CdDefault1Component {
    constructor(cdHelper) {
        this.cdHelper = cdHelper;
    }
}
CdDefault1Component.ɵfac = function CdDefault1Component_Factory(t) { return new (t || CdDefault1Component)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_shared_utils_cd_helper__WEBPACK_IMPORTED_MODULE_0__["CdHelper"])); };
CdDefault1Component.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: CdDefault1Component, selectors: [["rxa-cd-default-1"]], hostAttrs: [1, "d-block", "w-100"], features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([_shared_utils_cd_helper__WEBPACK_IMPORTED_MODULE_0__["CdHelper"]])], ngContentSelectors: _c1, decls: 11, vars: 1, consts: [["visualizerHeader", ""], [3, "cdHelper"], [1, "row"], [1, "col-sm-12", "col-md-6"]], template: function CdDefault1Component_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojectionDef"](_c0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](1, 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Default");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "rxa-cd-trigger", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](8, "rxa-cd-default-2");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](10, "rxa-cd-push-3");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("cdHelper", ctx.cdHelper);
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__["VisualizerComponent"], _shared_debug_helper_cd_trigger_cd_trigger_cd_trigger_component__WEBPACK_IMPORTED_MODULE_3__["CdTriggerComponent"], _default_2_component__WEBPACK_IMPORTED_MODULE_4__["CdDefault2Component"], _push_3_component__WEBPACK_IMPORTED_MODULE_5__["CdOnPush3Component"]], encapsulation: 2 });


/***/ }),

/***/ "FLe3":
/*!***********************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/nested-vs-injected/nested/default-4.component.ts ***!
  \***********************************************************************************************/
/*! exports provided: CdDefault4Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CdDefault4Component", function() { return CdDefault4Component; });
/* harmony import */ var _shared_utils_cd_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../shared/utils/cd-helper */ "h33e");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _shared_debug_helper_cd_trigger_cd_trigger_cd_trigger_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/debug-helper/cd-trigger/cd-trigger/cd-trigger.component */ "ezrg");





const _c0 = [[["", "cdDefaultHeader", ""]], "*"];
const _c1 = ["[cdDefaultHeader]", "*"];
class CdDefault4Component {
    constructor(cdHelper) {
        this.cdHelper = cdHelper;
    }
}
CdDefault4Component.ɵfac = function CdDefault4Component_Factory(t) { return new (t || CdDefault4Component)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_shared_utils_cd_helper__WEBPACK_IMPORTED_MODULE_0__["CdHelper"])); };
CdDefault4Component.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: CdDefault4Component, selectors: [["rxa-cd-default-4"]], hostAttrs: [1, "d-block", "w-100"], features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([_shared_utils_cd_helper__WEBPACK_IMPORTED_MODULE_0__["CdHelper"]])], ngContentSelectors: _c1, decls: 7, vars: 1, consts: [["visualizerHeader", ""], [3, "cdHelper"]], template: function CdDefault4Component_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojectionDef"](_c0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](1, 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Default");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "rxa-cd-trigger", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](6, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("cdHelper", ctx.cdHelper);
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__["VisualizerComponent"], _shared_debug_helper_cd_trigger_cd_trigger_cd_trigger_component__WEBPACK_IMPORTED_MODULE_3__["CdTriggerComponent"]], encapsulation: 2 });


/***/ }),

/***/ "JxfP":
/*!***********************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/nested-vs-injected/nested/detect-changes.nested.component.ts ***!
  \***********************************************************************************************************/
/*! exports provided: DetectChangesNestedComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetectChangesNestedComponent", function() { return DetectChangesNestedComponent; });
/* harmony import */ var _shared_utils_cd_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../shared/utils/cd-helper */ "h33e");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _default_1_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./default-1.component */ "DC8L");



class DetectChangesNestedComponent {
}
DetectChangesNestedComponent.ɵfac = function DetectChangesNestedComponent_Factory(t) { return new (t || DetectChangesNestedComponent)(); };
DetectChangesNestedComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: DetectChangesNestedComponent, selectors: [["rxa-cd-nested"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([_shared_utils_cd_helper__WEBPACK_IMPORTED_MODULE_0__["CdHelper"]])], decls: 1, vars: 0, template: function DetectChangesNestedComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "rxa-cd-default-1");
    } }, directives: [_default_1_component__WEBPACK_IMPORTED_MODULE_2__["CdDefault1Component"]], encapsulation: 2 });


/***/ }),

/***/ "L019":
/*!***********************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/nested-vs-injected/nested/default-3.component.ts ***!
  \***********************************************************************************************/
/*! exports provided: CdDefault3Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CdDefault3Component", function() { return CdDefault3Component; });
/* harmony import */ var _shared_utils_cd_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../shared/utils/cd-helper */ "h33e");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _shared_debug_helper_cd_trigger_cd_trigger_cd_trigger_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/debug-helper/cd-trigger/cd-trigger/cd-trigger.component */ "ezrg");





const _c0 = [[["", "cdDefaultHeader", ""]], "*"];
const _c1 = ["[cdDefaultHeader]", "*"];
class CdDefault3Component {
    constructor(cdHelper) {
        this.cdHelper = cdHelper;
    }
}
CdDefault3Component.ɵfac = function CdDefault3Component_Factory(t) { return new (t || CdDefault3Component)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_shared_utils_cd_helper__WEBPACK_IMPORTED_MODULE_0__["CdHelper"])); };
CdDefault3Component.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: CdDefault3Component, selectors: [["rxa-cd-default-3"]], hostAttrs: [1, "d-block", "w-100"], features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([_shared_utils_cd_helper__WEBPACK_IMPORTED_MODULE_0__["CdHelper"]])], ngContentSelectors: _c1, decls: 7, vars: 1, consts: [["visualizerHeader", ""], [3, "cdHelper"]], template: function CdDefault3Component_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojectionDef"](_c0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](1, 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Default");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "rxa-cd-trigger", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](6, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("cdHelper", ctx.cdHelper);
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__["VisualizerComponent"], _shared_debug_helper_cd_trigger_cd_trigger_cd_trigger_component__WEBPACK_IMPORTED_MODULE_3__["CdTriggerComponent"]], encapsulation: 2 });


/***/ }),

/***/ "Lj2X":
/*!************************************************************************************!*\
  !*** ./apps/demos/src/app/shared/zone-patched-icon/zone-patched-icon.component.ts ***!
  \************************************************************************************/
/*! exports provided: ZonePatchedIconComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZonePatchedIconComponent", function() { return ZonePatchedIconComponent; });
/* harmony import */ var _rx_angular_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rx-angular/state */ "YYsp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _libs_template_src_lib_let_let_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../libs/template/src/lib/let/let.directive */ "cihl");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");




function ZonePatchedIconComponent_mat_icon_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-icon", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const zoneState_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](zoneState_r1);
} }
class ZonePatchedIconComponent extends _rx_angular_state__WEBPACK_IMPORTED_MODULE_0__["RxState"] {
    constructor() {
        super();
        this.zoneStates = {
            'patched': 'wifi',
            'unpatched': 'wifi_off'
        };
        this.zoneState$ = this.select('zoneState');
    }
    set zoneState(zoneState) {
        if (Object.keys(this.zoneStates).includes(zoneState)) {
            this.set({ zoneState: this.zoneStates[zoneState] });
        }
    }
}
ZonePatchedIconComponent.ɵfac = function ZonePatchedIconComponent_Factory(t) { return new (t || ZonePatchedIconComponent)(); };
ZonePatchedIconComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: ZonePatchedIconComponent, selectors: [["rxa-zone-patched-icon"]], inputs: { zoneState: "zoneState" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]], decls: 1, vars: 1, consts: [["style", "font-size: 18px; height: 18px; width: 18px;", 4, "rxLet"], [2, "font-size", "18px", "height", "18px", "width", "18px"]], template: function ZonePatchedIconComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, ZonePatchedIconComponent_mat_icon_0_Template, 2, 1, "mat-icon", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("rxLet", ctx.zoneState$);
    } }, directives: [_libs_template_src_lib_let_let_directive__WEBPACK_IMPORTED_MODULE_2__["LetDirective"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__["MatIcon"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "RrAg":
/*!********************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/nested-vs-injected/nested/push-2.component.ts ***!
  \********************************************************************************************/
/*! exports provided: CdOnPush2Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CdOnPush2Component", function() { return CdOnPush2Component; });
/* harmony import */ var _shared_utils_cd_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../shared/utils/cd-helper */ "h33e");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _shared_debug_helper_cd_trigger_cd_trigger_cd_trigger_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/debug-helper/cd-trigger/cd-trigger/cd-trigger.component */ "ezrg");





const _c0 = [[["", "cdDefaultHeader", ""]], "*"];
const _c1 = ["[cdDefaultHeader]", "*"];
class CdOnPush2Component {
    constructor(cdHelper) {
        this.cdHelper = cdHelper;
    }
}
CdOnPush2Component.ɵfac = function CdOnPush2Component_Factory(t) { return new (t || CdOnPush2Component)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_shared_utils_cd_helper__WEBPACK_IMPORTED_MODULE_0__["CdHelper"])); };
CdOnPush2Component.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: CdOnPush2Component, selectors: [["rxa-cd-push-2"]], hostAttrs: [1, "d-block", "w-100"], features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([_shared_utils_cd_helper__WEBPACK_IMPORTED_MODULE_0__["CdHelper"]])], ngContentSelectors: _c1, decls: 7, vars: 1, consts: [["visualizerHeader", ""], [3, "cdHelper"]], template: function CdOnPush2Component_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojectionDef"](_c0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](1, 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "OnPush");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "rxa-cd-trigger", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](6, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("cdHelper", ctx.cdHelper);
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__["VisualizerComponent"], _shared_debug_helper_cd_trigger_cd_trigger_cd_trigger_component__WEBPACK_IMPORTED_MODULE_3__["CdTriggerComponent"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "UH6V":
/*!********************************************************************************!*\
  !*** ./apps/demos/src/app/shared/debug-helper/cd-on-push/cd-on-push.module.ts ***!
  \********************************************************************************/
/*! exports provided: CdOnPushModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CdOnPushModule", function() { return CdOnPushModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _visualizer_visualizer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../visualizer/visualizer.module */ "RtHe");
/* harmony import */ var _cd_on_push_cd_on_push_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cd-on-push/cd-on-push.component */ "289C");
/* harmony import */ var _cd_trigger_cd_trigger_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../cd-trigger/cd-trigger.module */ "2ete");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");





class CdOnPushModule {
}
CdOnPushModule.ɵfac = function CdOnPushModule_Factory(t) { return new (t || CdOnPushModule)(); };
CdOnPushModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: CdOnPushModule });
CdOnPushModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _visualizer_visualizer_module__WEBPACK_IMPORTED_MODULE_1__["VisualizerModule"],
            _cd_trigger_cd_trigger_module__WEBPACK_IMPORTED_MODULE_3__["CdTriggerModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](CdOnPushModule, { declarations: [_cd_on_push_cd_on_push_component__WEBPACK_IMPORTED_MODULE_2__["CdOnPushComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _visualizer_visualizer_module__WEBPACK_IMPORTED_MODULE_1__["VisualizerModule"],
        _cd_trigger_cd_trigger_module__WEBPACK_IMPORTED_MODULE_3__["CdTriggerModule"]], exports: [_cd_on_push_cd_on_push_component__WEBPACK_IMPORTED_MODULE_2__["CdOnPushComponent"]] }); })();


/***/ }),

/***/ "X2B+":
/*!********************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/nested-vs-injected/nested/push-3.component.ts ***!
  \********************************************************************************************/
/*! exports provided: CdOnPush3Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CdOnPush3Component", function() { return CdOnPush3Component; });
/* harmony import */ var _shared_utils_cd_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../shared/utils/cd-helper */ "h33e");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _shared_debug_helper_cd_trigger_cd_trigger_cd_trigger_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/debug-helper/cd-trigger/cd-trigger/cd-trigger.component */ "ezrg");
/* harmony import */ var _default_4_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./default-4.component */ "FLe3");






const _c0 = [[["", "cdDefaultHeader", ""]]];
const _c1 = ["[cdDefaultHeader]"];
class CdOnPush3Component {
    constructor(cdHelper) {
        this.cdHelper = cdHelper;
    }
}
CdOnPush3Component.ɵfac = function CdOnPush3Component_Factory(t) { return new (t || CdOnPush3Component)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_shared_utils_cd_helper__WEBPACK_IMPORTED_MODULE_0__["CdHelper"])); };
CdOnPush3Component.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: CdOnPush3Component, selectors: [["rxa-cd-push-3"]], hostAttrs: [1, "d-block", "w-100"], features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([_shared_utils_cd_helper__WEBPACK_IMPORTED_MODULE_0__["CdHelper"]])], ngContentSelectors: _c1, decls: 7, vars: 1, consts: [["visualizerHeader", ""], [3, "cdHelper"]], template: function CdOnPush3Component_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojectionDef"](_c0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](1, 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "OnPush");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "rxa-cd-trigger", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "rxa-cd-default-4");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("cdHelper", ctx.cdHelper);
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__["VisualizerComponent"], _shared_debug_helper_cd_trigger_cd_trigger_cd_trigger_component__WEBPACK_IMPORTED_MODULE_3__["CdTriggerComponent"], _default_4_component__WEBPACK_IMPORTED_MODULE_4__["CdDefault4Component"]], encapsulation: 2, changeDetection: 0 });


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

/***/ "d2wR":
/*!***********************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/nested-vs-injected/nested/default-2.component.ts ***!
  \***********************************************************************************************/
/*! exports provided: CdDefault2Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CdDefault2Component", function() { return CdDefault2Component; });
/* harmony import */ var _shared_utils_cd_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../shared/utils/cd-helper */ "h33e");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _shared_debug_helper_cd_trigger_cd_trigger_cd_trigger_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/debug-helper/cd-trigger/cd-trigger/cd-trigger.component */ "ezrg");
/* harmony import */ var _push_1_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./push-1.component */ "yunC");






const _c0 = [[["", "cdDefaultHeader", ""]]];
const _c1 = ["[cdDefaultHeader]"];
class CdDefault2Component {
    constructor(cdHelper) {
        this.cdHelper = cdHelper;
    }
}
CdDefault2Component.ɵfac = function CdDefault2Component_Factory(t) { return new (t || CdDefault2Component)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_shared_utils_cd_helper__WEBPACK_IMPORTED_MODULE_0__["CdHelper"])); };
CdDefault2Component.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: CdDefault2Component, selectors: [["rxa-cd-default-2"]], hostAttrs: [1, "d-block", "w-100"], features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([_shared_utils_cd_helper__WEBPACK_IMPORTED_MODULE_0__["CdHelper"]])], ngContentSelectors: _c1, decls: 7, vars: 1, consts: [["visualizerHeader", ""], [3, "cdHelper"]], template: function CdDefault2Component_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojectionDef"](_c0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](1, 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Default");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "rxa-cd-trigger", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "rxa-cd-push-1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("cdHelper", ctx.cdHelper);
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__["VisualizerComponent"], _shared_debug_helper_cd_trigger_cd_trigger_cd_trigger_component__WEBPACK_IMPORTED_MODULE_3__["CdTriggerComponent"], _push_1_component__WEBPACK_IMPORTED_MODULE_4__["CdOnPush1Component"]], encapsulation: 2 });


/***/ }),

/***/ "jAPK":
/*!***************************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/nested-vs-injected/injected/detect-changes.injected.component.ts ***!
  \***************************************************************************************************************/
/*! exports provided: DetectChangesInjectedComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetectChangesInjectedComponent", function() { return DetectChangesInjectedComponent; });
/* harmony import */ var _shared_utils_cd_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../shared/utils/cd-helper */ "h33e");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_cd_default_cd_default_cd_default_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/debug-helper/cd-default/cd-default/cd-default.component */ "DAa3");
/* harmony import */ var _shared_debug_helper_cd_on_push_cd_on_push_cd_on_push_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/debug-helper/cd-on-push/cd-on-push/cd-on-push.component */ "289C");




class DetectChangesInjectedComponent {
}
DetectChangesInjectedComponent.ɵfac = function DetectChangesInjectedComponent_Factory(t) { return new (t || DetectChangesInjectedComponent)(); };
DetectChangesInjectedComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: DetectChangesInjectedComponent, selectors: [["rxa-cd-injected"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([_shared_utils_cd_helper__WEBPACK_IMPORTED_MODULE_0__["CdHelper"]])], decls: 8, vars: 0, consts: [[1, "row"], [1, "col-sm-12", "col-md-6"]], template: function DetectChangesInjectedComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "rxa-cd-default");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "rxa-cd-default");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "rxa-cd-on-push");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "rxa-cd-on-push");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](7, "rxa-cd-default");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } }, directives: [_shared_debug_helper_cd_default_cd_default_cd_default_component__WEBPACK_IMPORTED_MODULE_2__["CdDefaultComponent"], _shared_debug_helper_cd_on_push_cd_on_push_cd_on_push_component__WEBPACK_IMPORTED_MODULE_3__["CdOnPushComponent"]], encapsulation: 2 });


/***/ }),

/***/ "t8Vn":
/*!**********************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/nested-vs-injected/nested-vs-injected.module.ts ***!
  \**********************************************************************************************/
/*! exports provided: NestedVsInjectedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NestedVsInjectedModule", function() { return NestedVsInjectedModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _nested_vs_injected_routes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nested-vs-injected.routes */ "6XPC");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _shared_debug_helper_dirty_checks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../shared/debug-helper/dirty-checks */ "v95w");
/* harmony import */ var _rx_angular_template__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @rx-angular/template */ "WFkj");
/* harmony import */ var _injected_detect_changes_injected_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./injected/detect-changes.injected.component */ "jAPK");
/* harmony import */ var _shared_debug_helper_cd_default_cd_default_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../shared/debug-helper/cd-default/cd-default.module */ "Tuk6");
/* harmony import */ var _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../shared/debug-helper/visualizer */ "cyPU");
/* harmony import */ var _shared_debug_helper_cd_on_push_cd_on_push_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../shared/debug-helper/cd-on-push/cd-on-push.module */ "UH6V");
/* harmony import */ var _shared_debug_helper_cd_trigger_cd_trigger_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../shared/debug-helper/cd-trigger/cd-trigger.module */ "2ete");
/* harmony import */ var _nested_detect_changes_nested_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./nested/detect-changes.nested.component */ "JxfP");
/* harmony import */ var _nested_default_1_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./nested/default-1.component */ "DC8L");
/* harmony import */ var _nested_default_2_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./nested/default-2.component */ "d2wR");
/* harmony import */ var _nested_default_3_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./nested/default-3.component */ "L019");
/* harmony import */ var _nested_push_1_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./nested/push-1.component */ "yunC");
/* harmony import */ var _nested_push_2_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./nested/push-2.component */ "RrAg");
/* harmony import */ var _nested_push_3_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./nested/push-3.component */ "X2B+");
/* harmony import */ var _nested_vs_projected_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./nested-vs-projected.component */ "v11e");
/* harmony import */ var _nested_default_4_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./nested/default-4.component */ "FLe3");
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/button-toggle */ "jaxi");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/core */ "fXoL");























class NestedVsInjectedModule {
}
NestedVsInjectedModule.ɵfac = function NestedVsInjectedModule_Factory(t) { return new (t || NestedVsInjectedModule)(); };
NestedVsInjectedModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdefineNgModule"]({ type: NestedVsInjectedModule });
NestedVsInjectedModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(_nested_vs_injected_routes__WEBPACK_IMPORTED_MODULE_2__["ROUTES"]),
            _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButtonModule"],
            _shared_debug_helper_dirty_checks__WEBPACK_IMPORTED_MODULE_4__["DirtyChecksModule"],
            _rx_angular_template__WEBPACK_IMPORTED_MODULE_5__["UnpatchEventsModule"],
            _shared_debug_helper_cd_default_cd_default_module__WEBPACK_IMPORTED_MODULE_7__["CdDefaultModule"],
            _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_8__["VisualizerModule"],
            _shared_debug_helper_cd_on_push_cd_on_push_module__WEBPACK_IMPORTED_MODULE_9__["CdOnPushModule"],
            _shared_debug_helper_cd_trigger_cd_trigger_module__WEBPACK_IMPORTED_MODULE_10__["CdTriggerModule"],
            _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_20__["MatButtonToggleModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵsetNgModuleScope"](NestedVsInjectedModule, { declarations: [_nested_default_1_component__WEBPACK_IMPORTED_MODULE_12__["CdDefault1Component"],
        _nested_default_2_component__WEBPACK_IMPORTED_MODULE_13__["CdDefault2Component"],
        _nested_default_3_component__WEBPACK_IMPORTED_MODULE_14__["CdDefault3Component"],
        _nested_default_4_component__WEBPACK_IMPORTED_MODULE_19__["CdDefault4Component"],
        _nested_push_1_component__WEBPACK_IMPORTED_MODULE_15__["CdOnPush1Component"],
        _nested_push_2_component__WEBPACK_IMPORTED_MODULE_16__["CdOnPush2Component"],
        _nested_push_3_component__WEBPACK_IMPORTED_MODULE_17__["CdOnPush3Component"],
        _injected_detect_changes_injected_component__WEBPACK_IMPORTED_MODULE_6__["DetectChangesInjectedComponent"],
        _nested_detect_changes_nested_component__WEBPACK_IMPORTED_MODULE_11__["DetectChangesNestedComponent"],
        _nested_vs_projected_component__WEBPACK_IMPORTED_MODULE_18__["NestedVsProjectedComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"], _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButtonModule"],
        _shared_debug_helper_dirty_checks__WEBPACK_IMPORTED_MODULE_4__["DirtyChecksModule"],
        _rx_angular_template__WEBPACK_IMPORTED_MODULE_5__["UnpatchEventsModule"],
        _shared_debug_helper_cd_default_cd_default_module__WEBPACK_IMPORTED_MODULE_7__["CdDefaultModule"],
        _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_8__["VisualizerModule"],
        _shared_debug_helper_cd_on_push_cd_on_push_module__WEBPACK_IMPORTED_MODULE_9__["CdOnPushModule"],
        _shared_debug_helper_cd_trigger_cd_trigger_module__WEBPACK_IMPORTED_MODULE_10__["CdTriggerModule"],
        _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_20__["MatButtonToggleModule"]] }); })();


/***/ }),

/***/ "v11e":
/*!**************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/nested-vs-injected/nested-vs-projected.component.ts ***!
  \**************************************************************************************************/
/*! exports provided: NestedVsProjectedComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NestedVsProjectedComponent", function() { return NestedVsProjectedComponent; });
/* harmony import */ var _shared_utils_cd_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../shared/utils/cd-helper */ "h33e");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button-toggle */ "jaxi");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _nested_detect_changes_nested_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./nested/detect-changes.nested.component */ "JxfP");
/* harmony import */ var _injected_detect_changes_injected_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./injected/detect-changes.injected.component */ "jAPK");








function NestedVsProjectedComponent_div_14_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Nested");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "rxa-cd-nested");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function NestedVsProjectedComponent_div_14_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Projected");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "rxa-cd-injected");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function NestedVsProjectedComponent_div_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, NestedVsProjectedComponent_div_14_div_1_Template, 4, 0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, NestedVsProjectedComponent_div_14_div_2_Template, 4, 0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.visible(_r0, ctx_r1.displayStates.nested));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.visible(_r0, ctx_r1.displayStates.projected));
} }
class NestedVsProjectedComponent {
    constructor() {
        this.displayStates = {
            none: 0,
            all: 1,
            nested: 2,
            projected: 3
        };
        this.isVisible = true;
    }
    visible(group, choice) {
        return group.value === choice || group.value === this.displayStates.all;
    }
}
NestedVsProjectedComponent.ɵfac = function NestedVsProjectedComponent_Factory(t) { return new (t || NestedVsProjectedComponent)(); };
NestedVsProjectedComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: NestedVsProjectedComponent, selectors: [["rxa-cd"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([_shared_utils_cd_helper__WEBPACK_IMPORTED_MODULE_0__["CdHelper"]])], decls: 15, vars: 5, consts: [["visualizerHeader", ""], ["name", "visibleExamples", "aria-label", "Visible Examples", 3, "value"], ["group", "matButtonToggleGroup"], [3, "value"], ["mat-raised-button", "", 1, "ml-2", 3, "click"], ["class", "row", 4, "ngIf"], [1, "row"], ["class", "col", 4, "ngIf"], [1, "col"]], template: function NestedVsProjectedComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Nested vs Projected Components");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "mat-button-toggle-group", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "mat-button-toggle", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Nested");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "mat-button-toggle", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "Projected");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "mat-button-toggle", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "All");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function NestedVsProjectedComponent_Template_button_click_12_listener() { return ctx.isVisible = !ctx.isVisible; });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, " Toggle visibility to reset ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](14, NestedVsProjectedComponent_div_14_Template, 3, 2, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", ctx.displayStates.all);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", ctx.displayStates.nested);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", ctx.displayStates.projected);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", ctx.displayStates.all);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isVisible);
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__["VisualizerComponent"], _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_3__["MatButtonToggleGroup"], _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_3__["MatButtonToggle"], _angular_material_button__WEBPACK_IMPORTED_MODULE_4__["MatButton"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _nested_detect_changes_nested_component__WEBPACK_IMPORTED_MODULE_6__["DetectChangesNestedComponent"], _injected_detect_changes_injected_component__WEBPACK_IMPORTED_MODULE_7__["DetectChangesInjectedComponent"]], encapsulation: 2 });


/***/ }),

/***/ "xXlh":
/*!*********************************************************************************!*\
  !*** ./apps/demos/src/app/shared/zone-patched-icon/zone-patched-icon.module.ts ***!
  \*********************************************************************************/
/*! exports provided: ZonePatchedIconModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZonePatchedIconModule", function() { return ZonePatchedIconModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _zone_patched_icon_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./zone-patched-icon.component */ "Lj2X");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @rx-angular/template */ "WFkj");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");





class ZonePatchedIconModule {
}
ZonePatchedIconModule.ɵfac = function ZonePatchedIconModule_Factory(t) { return new (t || ZonePatchedIconModule)(); };
ZonePatchedIconModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: ZonePatchedIconModule });
ZonePatchedIconModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__["MatIconModule"],
            _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__["LetModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](ZonePatchedIconModule, { declarations: [_zone_patched_icon_component__WEBPACK_IMPORTED_MODULE_1__["ZonePatchedIconComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__["MatIconModule"],
        _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__["LetModule"]], exports: [_zone_patched_icon_component__WEBPACK_IMPORTED_MODULE_1__["ZonePatchedIconComponent"]] }); })();


/***/ }),

/***/ "yunC":
/*!********************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/nested-vs-injected/nested/push-1.component.ts ***!
  \********************************************************************************************/
/*! exports provided: CdOnPush1Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CdOnPush1Component", function() { return CdOnPush1Component; });
/* harmony import */ var _shared_utils_cd_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../shared/utils/cd-helper */ "h33e");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _shared_debug_helper_cd_trigger_cd_trigger_cd_trigger_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/debug-helper/cd-trigger/cd-trigger/cd-trigger.component */ "ezrg");





const _c0 = [[["", "cdDefaultHeader", ""]], "*"];
const _c1 = ["[cdDefaultHeader]", "*"];
class CdOnPush1Component {
    constructor(cdHelper) {
        this.cdHelper = cdHelper;
    }
}
CdOnPush1Component.ɵfac = function CdOnPush1Component_Factory(t) { return new (t || CdOnPush1Component)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_shared_utils_cd_helper__WEBPACK_IMPORTED_MODULE_0__["CdHelper"])); };
CdOnPush1Component.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: CdOnPush1Component, selectors: [["rxa-cd-push-1"]], hostAttrs: [1, "d-block", "w-100"], features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([_shared_utils_cd_helper__WEBPACK_IMPORTED_MODULE_0__["CdHelper"]])], ngContentSelectors: _c1, decls: 7, vars: 1, consts: [["visualizerHeader", ""], [3, "cdHelper"]], template: function CdOnPush1Component_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojectionDef"](_c0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](1, 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "OnPush");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "rxa-cd-trigger", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](6, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("cdHelper", ctx.cdHelper);
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__["VisualizerComponent"], _shared_debug_helper_cd_trigger_cd_trigger_cd_trigger_component__WEBPACK_IMPORTED_MODULE_3__["CdTriggerComponent"]], encapsulation: 2, changeDetection: 0 });


/***/ })

}]);
//# sourceMappingURL=nested-vs-injected-nested-vs-injected-module.js.map