(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "162L":
/*!************************************************************************************!*\
  !*** ./apps/demos/src/app/shared/debug-helper/value-provider/scheduling-helper.ts ***!
  \************************************************************************************/
/*! exports provided: schedulingHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "schedulingHelper", function() { return schedulingHelper; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "eXvN");
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./model */ "V6pN");




const schedulingHelper = () => {
    let active = false;
    const schedulerSubject = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"](_model__WEBPACK_IMPORTED_MODULE_3__["SchedulingPriority"].animationFrame);
    const tickSubject$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
    const ticks$ = tickSubject$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchAll"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["scan"])(a => ++a, 0), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["share"])());
    const toggle = () => {
        tickSubject$.next(active ? rxjs__WEBPACK_IMPORTED_MODULE_0__["EMPTY"] : schedulerSubject.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])((s) => Object(_utils__WEBPACK_IMPORTED_MODULE_2__["toTick"])({ scheduler: s }))));
        active = !active;
    };
    const duration = (d) => {
        tickSubject$.next(active ? rxjs__WEBPACK_IMPORTED_MODULE_0__["EMPTY"] : schedulerSubject.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])((s) => Object(_utils__WEBPACK_IMPORTED_MODULE_2__["toTick"])({ scheduler: s, duration: d }))));
        active = !active;
    };
    const scheduler = (schedulerName) => {
        schedulerSubject.next(schedulerName);
    };
    const tick = (numEmissions = 1, tickSpeed) => {
        tickSubject$.next(schedulerSubject.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])((s) => Object(_utils__WEBPACK_IMPORTED_MODULE_2__["toTick"])({
            scheduler: s,
            numEmissions,
            tickSpeed
        }))));
    };
    return {
        scheduler,
        ticks$,
        tick,
        toggle,
        duration
    };
};


/***/ }),

/***/ "2ete":
/*!********************************************************************************!*\
  !*** ./apps/demos/src/app/shared/debug-helper/cd-trigger/cd-trigger.module.ts ***!
  \********************************************************************************/
/*! exports provided: CdTriggerModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CdTriggerModule", function() { return CdTriggerModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _cd_trigger_cd_trigger_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cd-trigger/cd-trigger.component */ "ezrg");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @rx-angular/template */ "WFkj");
/* harmony import */ var _zone_patched_icon_zone_patched_icon_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../zone-patched-icon/zone-patched-icon.module */ "xXlh");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");






class CdTriggerModule {
}
CdTriggerModule.ɵfac = function CdTriggerModule_Factory(t) { return new (t || CdTriggerModule)(); };
CdTriggerModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({ type: CdTriggerModule });
CdTriggerModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"],
            _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__["UnpatchEventsModule"],
            _zone_patched_icon_zone_patched_icon_module__WEBPACK_IMPORTED_MODULE_4__["ZonePatchedIconModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](CdTriggerModule, { declarations: [_cd_trigger_cd_trigger_component__WEBPACK_IMPORTED_MODULE_1__["CdTriggerComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"],
        _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__["UnpatchEventsModule"],
        _zone_patched_icon_zone_patched_icon_module__WEBPACK_IMPORTED_MODULE_4__["ZonePatchedIconModule"]], exports: [_cd_trigger_cd_trigger_component__WEBPACK_IMPORTED_MODULE_1__["CdTriggerComponent"]] }); })();


/***/ }),

/***/ "6sZn":
/*!**************************************************************!*\
  !*** ./apps/demos/src/app/shared/debug-helper/work/index.ts ***!
  \**************************************************************/
/*! exports provided: ValueModule, ValueComponent, fibonacci */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _value_provider_value_value_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../value-provider/value/value.module */ "Eb7Z");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ValueModule", function() { return _value_provider_value_value_module__WEBPACK_IMPORTED_MODULE_0__["ValueModule"]; });

/* harmony import */ var _value_provider_value_value_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../value-provider/value/value.component */ "gxuc");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ValueComponent", function() { return _value_provider_value_value_component__WEBPACK_IMPORTED_MODULE_1__["ValueComponent"]; });

/* harmony import */ var _fibonacci__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fibonacci */ "w8H7");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fibonacci", function() { return _fibonacci__WEBPACK_IMPORTED_MODULE_2__["fibonacci"]; });






/***/ }),

/***/ "Cz24":
/*!***************************************************************************!*\
  !*** ./apps/demos/src/app/shared/ghost-elements/ghost-elements.module.ts ***!
  \***************************************************************************/
/*! exports provided: GhostElementsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GhostElementsModule", function() { return GhostElementsModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _rx_angular_template__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @rx-angular/template */ "WFkj");
/* harmony import */ var ngx_skeleton_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-skeleton-loader */ "xJkR");
/* harmony import */ var _list_item_ghost_list_item_ghost_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./list-item-ghost/list-item-ghost.component */ "nKlp");
/* harmony import */ var _form_ghost_form_ghost_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./form-ghost/form-ghost.component */ "bkn3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");






const DECLARATIONS = [
    _list_item_ghost_list_item_ghost_component__WEBPACK_IMPORTED_MODULE_3__["ListItemGhostComponent"],
    _form_ghost_form_ghost_component__WEBPACK_IMPORTED_MODULE_4__["FormGhostComponent"]
];
const IMPORTS = [
    _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
    _rx_angular_template__WEBPACK_IMPORTED_MODULE_1__["LetModule"], _rx_angular_template__WEBPACK_IMPORTED_MODULE_1__["PushModule"],
    _rx_angular_template__WEBPACK_IMPORTED_MODULE_1__["UnpatchEventsModule"],
    _rx_angular_template__WEBPACK_IMPORTED_MODULE_1__["PushModule"],
    ngx_skeleton_loader__WEBPACK_IMPORTED_MODULE_2__["NgxSkeletonLoaderModule"]
];
class GhostElementsModule {
}
GhostElementsModule.ɵfac = function GhostElementsModule_Factory(t) { return new (t || GhostElementsModule)(); };
GhostElementsModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({ type: GhostElementsModule });
GhostElementsModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({ imports: [[IMPORTS], _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _rx_angular_template__WEBPACK_IMPORTED_MODULE_1__["LetModule"], _rx_angular_template__WEBPACK_IMPORTED_MODULE_1__["PushModule"],
        _rx_angular_template__WEBPACK_IMPORTED_MODULE_1__["UnpatchEventsModule"],
        _rx_angular_template__WEBPACK_IMPORTED_MODULE_1__["PushModule"],
        ngx_skeleton_loader__WEBPACK_IMPORTED_MODULE_2__["NgxSkeletonLoaderModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](GhostElementsModule, { declarations: [_list_item_ghost_list_item_ghost_component__WEBPACK_IMPORTED_MODULE_3__["ListItemGhostComponent"],
        _form_ghost_form_ghost_component__WEBPACK_IMPORTED_MODULE_4__["FormGhostComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _rx_angular_template__WEBPACK_IMPORTED_MODULE_1__["LetModule"], _rx_angular_template__WEBPACK_IMPORTED_MODULE_1__["PushModule"],
        _rx_angular_template__WEBPACK_IMPORTED_MODULE_1__["UnpatchEventsModule"],
        _rx_angular_template__WEBPACK_IMPORTED_MODULE_1__["PushModule"],
        ngx_skeleton_loader__WEBPACK_IMPORTED_MODULE_2__["NgxSkeletonLoaderModule"]], exports: [_list_item_ghost_list_item_ghost_component__WEBPACK_IMPORTED_MODULE_3__["ListItemGhostComponent"],
        _form_ghost_form_ghost_component__WEBPACK_IMPORTED_MODULE_4__["FormGhostComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _rx_angular_template__WEBPACK_IMPORTED_MODULE_1__["LetModule"], _rx_angular_template__WEBPACK_IMPORTED_MODULE_1__["PushModule"],
        _rx_angular_template__WEBPACK_IMPORTED_MODULE_1__["UnpatchEventsModule"],
        _rx_angular_template__WEBPACK_IMPORTED_MODULE_1__["PushModule"],
        ngx_skeleton_loader__WEBPACK_IMPORTED_MODULE_2__["NgxSkeletonLoaderModule"]] }); })();


/***/ }),

/***/ "DAa3":
/*!**********************************************************************************************!*\
  !*** ./apps/demos/src/app/shared/debug-helper/cd-default/cd-default/cd-default.component.ts ***!
  \**********************************************************************************************/
/*! exports provided: CdDefaultComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CdDefaultComponent", function() { return CdDefaultComponent; });
/* harmony import */ var _utils_cd_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/cd-helper */ "h33e");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _cd_trigger_cd_trigger_cd_trigger_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../cd-trigger/cd-trigger/cd-trigger.component */ "ezrg");





const _c0 = [[["", "cdDefaultHeader", ""]], "*"];
const _c1 = ["[cdDefaultHeader]", "*"];
class CdDefaultComponent {
    constructor(cdHelper) {
        this.cdHelper = cdHelper;
    }
}
CdDefaultComponent.ɵfac = function CdDefaultComponent_Factory(t) { return new (t || CdDefaultComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_utils_cd_helper__WEBPACK_IMPORTED_MODULE_0__["CdHelper"])); };
CdDefaultComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: CdDefaultComponent, selectors: [["rxa-cd-default"]], hostAttrs: [1, "d-block", "w-100"], features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([_utils_cd_helper__WEBPACK_IMPORTED_MODULE_0__["CdHelper"]])], ngContentSelectors: _c1, decls: 7, vars: 1, consts: [["visualizerHeader", ""], [3, "cdHelper"]], template: function CdDefaultComponent_Template(rf, ctx) { if (rf & 1) {
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
    } }, directives: [_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__["VisualizerComponent"], _cd_trigger_cd_trigger_cd_trigger_component__WEBPACK_IMPORTED_MODULE_3__["CdTriggerComponent"]], encapsulation: 2 });


/***/ }),

/***/ "Eb7Z":
/*!*************************************************************************************!*\
  !*** ./apps/demos/src/app/shared/debug-helper/value-provider/value/value.module.ts ***!
  \*************************************************************************************/
/*! exports provided: ValueModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValueModule", function() { return ValueModule; });
/* harmony import */ var _dirty_checks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../dirty-checks */ "v95w");
/* harmony import */ var _value_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./value.component */ "gxuc");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/core */ "FKr1");
/* harmony import */ var _rx_angular_template__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @rx-angular/template */ "WFkj");
/* harmony import */ var _utils_utils_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../utils/utils.module */ "UKRj");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "fXoL");








const DEPRECATIONS = [_value_component__WEBPACK_IMPORTED_MODULE_1__["ValueComponent"]];
class ValueModule {
}
ValueModule.ɵfac = function ValueModule_Factory(t) { return new (t || ValueModule)(); };
ValueModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({ type: ValueModule });
ValueModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_material_core__WEBPACK_IMPORTED_MODULE_3__["MatRippleModule"],
            _rx_angular_template__WEBPACK_IMPORTED_MODULE_4__["PushModule"],
            _utils_utils_module__WEBPACK_IMPORTED_MODULE_5__["UtilsModule"],
            _rx_angular_template__WEBPACK_IMPORTED_MODULE_4__["LetModule"],
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__["MatIconModule"],
            _dirty_checks__WEBPACK_IMPORTED_MODULE_0__["DirtyChecksModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](ValueModule, { declarations: [_value_component__WEBPACK_IMPORTED_MODULE_1__["ValueComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
        _angular_material_core__WEBPACK_IMPORTED_MODULE_3__["MatRippleModule"],
        _rx_angular_template__WEBPACK_IMPORTED_MODULE_4__["PushModule"],
        _utils_utils_module__WEBPACK_IMPORTED_MODULE_5__["UtilsModule"],
        _rx_angular_template__WEBPACK_IMPORTED_MODULE_4__["LetModule"],
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__["MatIconModule"],
        _dirty_checks__WEBPACK_IMPORTED_MODULE_0__["DirtyChecksModule"]], exports: [_value_component__WEBPACK_IMPORTED_MODULE_1__["ValueComponent"]] }); })();


/***/ }),

/***/ "Had5":
/*!***************************************************!*\
  !*** ./apps/demos/src/app/shared/utils/to-int.ts ***!
  \***************************************************/
/*! exports provided: toInt */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toInt", function() { return toInt; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "kU1M");

function toInt(base = 10) {
    return (o$) => o$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(v => parseInt(v, base)));
}


/***/ }),

/***/ "J0zV":
/*!**********************************************************************************************************!*\
  !*** ./apps/demos/src/app/shared/debug-helper/rendering-work/rendering-work/rendering-work.component.ts ***!
  \**********************************************************************************************************/
/*! exports provided: RenderingWorkComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderingWorkComponent", function() { return RenderingWorkComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");


function RenderingWorkComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](item_r1);
} }
class RenderingWorkComponent {
    set factor(factor) {
        this.items = new Array(factor * 100).fill(1).map((v, index) => index);
    }
}
RenderingWorkComponent.ɵfac = function RenderingWorkComponent_Factory(t) { return new (t || RenderingWorkComponent)(); };
RenderingWorkComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: RenderingWorkComponent, selectors: [["rxa-rendering-work"]], inputs: { factor: "factor" }, decls: 1, vars: 1, consts: [[4, "ngFor", "ngForOf"]], template: function RenderingWorkComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, RenderingWorkComponent_div_0_Template, 2, 1, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.items);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["NgForOf"]], encapsulation: 2 });


/***/ }),

/***/ "K9NQ":
/*!***********************************************************!*\
  !*** ./apps/demos/src/app/shared/ghost-elements/index.ts ***!
  \***********************************************************/
/*! exports provided: FormGhostComponent, ListItemGhostComponent, GhostElementsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form_ghost_form_ghost_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form-ghost/form-ghost.component */ "bkn3");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FormGhostComponent", function() { return _form_ghost_form_ghost_component__WEBPACK_IMPORTED_MODULE_0__["FormGhostComponent"]; });

/* harmony import */ var _list_item_ghost_list_item_ghost_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./list-item-ghost/list-item-ghost.component */ "nKlp");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ListItemGhostComponent", function() { return _list_item_ghost_list_item_ghost_component__WEBPACK_IMPORTED_MODULE_1__["ListItemGhostComponent"]; });

/* harmony import */ var _ghost_elements_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ghost-elements.module */ "Cz24");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GhostElementsModule", function() { return _ghost_elements_module__WEBPACK_IMPORTED_MODULE_2__["GhostElementsModule"]; });






/***/ }),

/***/ "NMwP":
/*!**********************************************************************************!*\
  !*** ./apps/demos/src/app/features/integrations/dynamic-counter/shared/utils.ts ***!
  \**********************************************************************************/
/*! exports provided: updateCount */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateCount", function() { return updateCount; });
function updateCount(s) {
    return s.count + ((s.countUp ? 1 : -1) * s.countDiff);
}


/***/ }),

/***/ "Tuk6":
/*!********************************************************************************!*\
  !*** ./apps/demos/src/app/shared/debug-helper/cd-default/cd-default.module.ts ***!
  \********************************************************************************/
/*! exports provided: CdDefaultModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CdDefaultModule", function() { return CdDefaultModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _cd_default_cd_default_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cd-default/cd-default.component */ "DAa3");
/* harmony import */ var _visualizer_visualizer_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../visualizer/visualizer.module */ "RtHe");
/* harmony import */ var _cd_trigger_cd_trigger_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../cd-trigger/cd-trigger.module */ "2ete");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");





class CdDefaultModule {
}
CdDefaultModule.ɵfac = function CdDefaultModule_Factory(t) { return new (t || CdDefaultModule)(); };
CdDefaultModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: CdDefaultModule });
CdDefaultModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _visualizer_visualizer_module__WEBPACK_IMPORTED_MODULE_2__["VisualizerModule"],
            _cd_trigger_cd_trigger_module__WEBPACK_IMPORTED_MODULE_3__["CdTriggerModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](CdDefaultModule, { declarations: [_cd_default_cd_default_component__WEBPACK_IMPORTED_MODULE_1__["CdDefaultComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _visualizer_visualizer_module__WEBPACK_IMPORTED_MODULE_2__["VisualizerModule"],
        _cd_trigger_cd_trigger_module__WEBPACK_IMPORTED_MODULE_3__["CdTriggerModule"]], exports: [_cd_default_cd_default_component__WEBPACK_IMPORTED_MODULE_1__["CdDefaultComponent"]] }); })();


/***/ }),

/***/ "VuqE":
/*!***********************************************************!*\
  !*** ./apps/demos/src/app/shared/utils/to-latest-from.ts ***!
  \***********************************************************/
/*! exports provided: toLatestFrom */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toLatestFrom", function() { return toLatestFrom; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "kU1M");

function toLatestFrom(secondary$, initialValue) {
    return (o$) => {
        const _secondary$ = initialValue !== undefined ? secondary$ : secondary$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["startWith"])(initialValue));
        return o$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["withLatestFrom"])(_secondary$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(v => v[1]));
    };
}


/***/ }),

/***/ "Zwmw":
/*!******************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/integrations/dynamic-counter/shared/counter-display.component.ts ***!
  \******************************************************************************************************/
/*! exports provided: CounterDisplayComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CounterDisplayComponent", function() { return CounterDisplayComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _shared_utils_to_array_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/utils/to-array.pipe */ "bllw");
/* harmony import */ var _libs_template_src_lib_push_push_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../../../libs/template/src/lib/push/push.pipe */ "duzR");





function CounterDisplayComponent_span_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "span", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const d_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](d_r1);
} }
class CounterDisplayComponent {
    constructor() {
        this.count$ = rxjs__WEBPACK_IMPORTED_MODULE_0__["EMPTY"];
    }
}
CounterDisplayComponent.ɵfac = function CounterDisplayComponent_Factory(t) { return new (t || CounterDisplayComponent)(); };
CounterDisplayComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: CounterDisplayComponent, selectors: [["rxa-counter-display"]], hostAttrs: [1, "count"], inputs: { count$: "count$" }, decls: 3, vars: 5, consts: [["class", "position", 4, "ngFor", "ngForOf"], [1, "position"], [1, "digit", "static"]], template: function CounterDisplayComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, CounterDisplayComponent_span_0_Template, 3, 1, "span", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](1, "toArray");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "push");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](1, 1, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](2, 3, ctx.count$)));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgForOf"]], pipes: [_shared_utils_to_array_pipe__WEBPACK_IMPORTED_MODULE_3__["ToArrayPipe"], _libs_template_src_lib_push_push_pipe__WEBPACK_IMPORTED_MODULE_4__["PushPipe"]], encapsulation: 2 });


/***/ }),

/***/ "bkn3":
/*!*************************************************************************************!*\
  !*** ./apps/demos/src/app/shared/ghost-elements/form-ghost/form-ghost.component.ts ***!
  \*************************************************************************************/
/*! exports provided: FormGhostComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormGhostComponent", function() { return FormGhostComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var ngx_skeleton_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-skeleton-loader */ "xJkR");



function FormGhostComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "ngx-skeleton-loader", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "ngx-skeleton-loader", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "ngx-skeleton-loader", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "ngx-skeleton-loader", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "ngx-skeleton-loader", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
class FormGhostComponent {
    constructor() {
        this.numItems = [0];
    }
    set count(n) {
        this.numItems = Array(n < 1 ? 1 : n).fill(0);
    }
}
FormGhostComponent.ɵfac = function FormGhostComponent_Factory(t) { return new (t || FormGhostComponent)(); };
FormGhostComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: FormGhostComponent, selectors: [["rxa-form-ghost"]], inputs: { count: "count" }, decls: 1, vars: 1, consts: [["class", "form-ghost", 4, "ngFor", "ngForOf"], [1, "form-ghost"], [1, "input-ghost"], [1, "button-ghost"]], template: function FormGhostComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, FormGhostComponent_div_0_Template, 6, 0, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.numItems);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["NgForOf"], ngx_skeleton_loader__WEBPACK_IMPORTED_MODULE_2__["NgxSkeletonLoaderComponent"]], styles: ["\n    .form-ghost {\n      position: relative;\n      text-align: left;\n      width: 100%;\n    }\n\n    .form-ghost .button-ghost {\n      width: 50px;\n      float: right;\n    }\n\n    .form-ghost .input-ghost {\n      float: left;\n      line-height: 10px;\n      width: 100%;\n    }\n\n    .form-ghost .input-ghost .loader {\n      border: 1px solid lightgray;\n    }\n\n    .form-ghost .input-ghost:first-child {\n      width: 48%;\n      padding-right: 5px;\n    }\n\n    .form-ghost .input-ghost:nth-child(2) {\n       width: 48%;\n       float: right;\n    }\n  "], encapsulation: 2 });


/***/ }),

/***/ "ezrg":
/*!**********************************************************************************************!*\
  !*** ./apps/demos/src/app/shared/debug-helper/cd-trigger/cd-trigger/cd-trigger.component.ts ***!
  \**********************************************************************************************/
/*! exports provided: CdTriggerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CdTriggerComponent", function() { return CdTriggerComponent; });
/* harmony import */ var _utils_cd_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/cd-helper */ "h33e");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _zone_patched_icon_zone_patched_icon_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../zone-patched-icon/zone-patched-icon.component */ "Lj2X");
/* harmony import */ var _libs_template_src_lib_experimental_unpatch_events_unpatch_events_experimental_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../../../libs/template/src/lib/experimental/unpatch/events/unpatch-events.experimental.directive */ "QZMm");






class CdTriggerComponent {
    constructor(_cdHelper) {
        this._cdHelper = _cdHelper;
        this.cdHelper = this._cdHelper;
    }
}
CdTriggerComponent.ɵfac = function CdTriggerComponent_Factory(t) { return new (t || CdTriggerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_utils_cd_helper__WEBPACK_IMPORTED_MODULE_0__["CdHelper"])); };
CdTriggerComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: CdTriggerComponent, selectors: [["rxa-cd-trigger"]], hostAttrs: [1, "d-flex", "flex-wrap"], inputs: { cdHelper: "cdHelper" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([_utils_cd_helper__WEBPACK_IMPORTED_MODULE_0__["CdHelper"]])], decls: 14, vars: 3, consts: [["mat-raised-button", "", 3, "click"], [1, "mat-icon"], ["mat-raised-button", "", 3, "unpatch", "click"], [1, "mat-icon", 3, "zoneState"]], template: function CdTriggerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CdTriggerComponent_Template_button_click_0_listener() { return ctx.cdHelper.appRef_tick(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " tick ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "button", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CdTriggerComponent_Template_button_click_2_listener() { return ctx.cdHelper.cdRef_markForCheck(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, " markForCheck ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "rxa-zone-patched-icon", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CdTriggerComponent_Template_button_click_5_listener() { return ctx.cdHelper.cdRef_detectChanges(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, " detectChanges ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](7, "rxa-zone-patched-icon", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CdTriggerComponent_Template_button_click_8_listener() { return ctx.cdHelper.markDirty(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, " \u0275markDirty ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](10, "rxa-zone-patched-icon", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CdTriggerComponent_Template_button_click_11_listener() { return ctx.cdHelper.detectChanges(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, " \u0275detectChanges ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](13, "rxa-zone-patched-icon", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("zoneState", "unpatched");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("zoneState", "unpatched");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("zoneState", "unpatched");
    } }, directives: [_angular_material_button__WEBPACK_IMPORTED_MODULE_2__["MatButton"], _zone_patched_icon_zone_patched_icon_component__WEBPACK_IMPORTED_MODULE_3__["ZonePatchedIconComponent"], _libs_template_src_lib_experimental_unpatch_events_unpatch_events_experimental_directive__WEBPACK_IMPORTED_MODULE_4__["UnpatchEventsDirective"]], encapsulation: 2 });


/***/ }),

/***/ "gxuc":
/*!****************************************************************************************!*\
  !*** ./apps/demos/src/app/shared/debug-helper/value-provider/value/value.component.ts ***!
  \****************************************************************************************/
/*! exports provided: ValueComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValueComponent", function() { return ValueComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _rx_angular_state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @rx-angular/state */ "YYsp");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils */ "eXvN");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _libs_template_src_lib_let_let_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../../../libs/template/src/lib/let/let.directive */ "cihl");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "ofXK");









const _c0 = function (a0, a1) { return { red: a0, green: a1 }; };
function ValueComponent_mat_icon_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-icon", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const v_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction2"](2, _c0, !v_r1, v_r1));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](v_r1 ? "check" : "highlight_off");
} }
class ValueComponent {
    constructor(state) {
        this.state = state;
        this.value$ = this.state.select(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(s => Object(_utils__WEBPACK_IMPORTED_MODULE_3__["toBoolean"])(s.item.value, 0.5)));
    }
    set value(o) {
        this.state.connect('item', Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["isObservable"])(o) ? o : Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(o));
    }
}
ValueComponent.ɵfac = function ValueComponent_Factory(t) { return new (t || ValueComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_rx_angular_state__WEBPACK_IMPORTED_MODULE_2__["RxState"])); };
ValueComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: ValueComponent, selectors: [["rxa-value"]], inputs: { value: "value" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵProvidersFeature"]([_rx_angular_state__WEBPACK_IMPORTED_MODULE_2__["RxState"]])], decls: 1, vars: 1, consts: [["class", "item", 3, "ngClass", 4, "rxLet"], [1, "item", 3, "ngClass"]], template: function ValueComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](0, ValueComponent_mat_icon_0_Template, 2, 5, "mat-icon", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("rxLet", ctx.value$);
    } }, directives: [_libs_template_src_lib_let_let_directive__WEBPACK_IMPORTED_MODULE_5__["LetDirective"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__["MatIcon"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgClass"]], styles: [".item.red[_ngcontent-%COMP%] {\n      color: red;\n    }\n    .item.green[_ngcontent-%COMP%] {\n      color: green;\n    }\n    .value.number[_ngcontent-%COMP%] {\n    }\n    .value.string[_ngcontent-%COMP%] {\n    }\n    .value.object[_ngcontent-%COMP%] {\n    }\n    .value.array[_ngcontent-%COMP%] {\n    }"] });


/***/ }),

/***/ "h33e":
/*!******************************************************!*\
  !*** ./apps/demos/src/app/shared/utils/cd-helper.ts ***!
  \******************************************************/
/*! exports provided: CdHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CdHelper", function() { return CdHelper; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class CdHelper {
    constructor(cdRef, appRef) {
        this.cdRef = cdRef;
        this.appRef = appRef;
    }
    appRef_tick() {
        this.appRef.tick();
    }
    cdRef_detectChanges() {
        this.cdRef.detectChanges();
    }
    cdRef_markForCheck() {
        this.cdRef.markForCheck();
    }
    markDirty() {
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmarkDirty"])(this.cdRef.context);
    }
    detectChanges() {
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵdetectChanges"])(this.cdRef.context);
    }
}
CdHelper.ɵfac = function CdHelper_Factory(t) { return new (t || CdHelper)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ApplicationRef"])); };
CdHelper.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: CdHelper, factory: CdHelper.ɵfac });


/***/ }),

/***/ "nKlp":
/*!***********************************************************************************************!*\
  !*** ./apps/demos/src/app/shared/ghost-elements/list-item-ghost/list-item-ghost.component.ts ***!
  \***********************************************************************************************/
/*! exports provided: ListItemGhostComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListItemGhostComponent", function() { return ListItemGhostComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var ngx_skeleton_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-skeleton-loader */ "xJkR");



function ListItemGhostComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "ngx-skeleton-loader", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "ngx-skeleton-loader", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("appearance", "circle");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("count", 3);
} }
class ListItemGhostComponent {
    constructor() {
        this.numItems = [0];
    }
    set count(n) {
        this.numItems = Array(n < 1 ? 1 : n).fill(0);
    }
}
ListItemGhostComponent.ɵfac = function ListItemGhostComponent_Factory(t) { return new (t || ListItemGhostComponent)(); };
ListItemGhostComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ListItemGhostComponent, selectors: [["rxa-list-item-ghost"]], inputs: { count: "count" }, decls: 1, vars: 1, consts: [["class", "list-item-ghost", 4, "ngFor", "ngForOf"], [1, "list-item-ghost"], [1, "icon-ghost", 3, "appearance"], [1, "text-ghost"], [3, "count"]], template: function ListItemGhostComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, ListItemGhostComponent_div_0_Template, 4, 2, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.numItems);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["NgForOf"], ngx_skeleton_loader__WEBPACK_IMPORTED_MODULE_2__["NgxSkeletonLoaderComponent"]], styles: ["\n    .list-item-ghost {\n      position: relative;\n      text-align: left;\n      width: 100%;\n      display: flex;\n      flex-direction: row;\n      margin-bottom: 8px;\n    }\n\n    .list-item-ghost .icon-ghost {\n      margin-right: 15px;\n    }\n\n    .list-item-ghost .icon-ghost .loader.circle {\n      width: 35px;\n      height: 35px;\n      margin: 0;\n    }\n\n    .list-item-ghost .text-ghost {\n      flex-grow: 2;\n      line-height: 10px;\n    }\n\n    .list-item-ghost .text-ghost .loader {\n      height: 8px;\n      margin: 0 0 5px 0;\n    }\n\n    .list-item-ghost .text-ghost .loader:first-child {\n      width: 70%;\n    }\n\n    .list-item-ghost .text-ghost .loader:nth-child(2) {\n      width: 90%;\n    }\n\n    .list-item-ghost .text-ghost .loader:nth-child(3) {\n      width: 50%;\n    }\n  "], encapsulation: 2 });


/***/ }),

/***/ "w8H7":
/*!******************************************************************!*\
  !*** ./apps/demos/src/app/shared/debug-helper/work/fibonacci.ts ***!
  \******************************************************************/
/*! exports provided: fibonacci */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fibonacci", function() { return fibonacci; });
// @ts-ignore
function fibonacci(n) {
    if (n < 1) {
        throw new Error('fibonacci: First argument must be a number greater than zero.');
    }
    if (n === 1 || n === 2) {
        return 1;
    }
    else {
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}


/***/ }),

/***/ "wVZC":
/*!****************************************************************************************!*\
  !*** ./apps/demos/src/app/shared/debug-helper/rendering-work/rendering-work.module.ts ***!
  \****************************************************************************************/
/*! exports provided: RenderingWorkModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderingWorkModule", function() { return RenderingWorkModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _rendering_work_rendering_work_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rendering-work/rendering-work.component */ "J0zV");
/* harmony import */ var _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @rx-angular/template */ "WFkj");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");





class RenderingWorkModule {
}
RenderingWorkModule.ɵfac = function RenderingWorkModule_Factory(t) { return new (t || RenderingWorkModule)(); };
RenderingWorkModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: RenderingWorkModule });
RenderingWorkModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], _angular_material_button__WEBPACK_IMPORTED_MODULE_1__["MatButtonModule"], _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__["UnpatchEventsModule"]]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](RenderingWorkModule, { declarations: [_rendering_work_rendering_work_component__WEBPACK_IMPORTED_MODULE_2__["RenderingWorkComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], _angular_material_button__WEBPACK_IMPORTED_MODULE_1__["MatButtonModule"], _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__["UnpatchEventsModule"]], exports: [_rendering_work_rendering_work_component__WEBPACK_IMPORTED_MODULE_2__["RenderingWorkComponent"]] }); })();


/***/ }),

/***/ "wvVy":
/*!**********************************************************************************!*\
  !*** ./apps/demos/src/app/features/integrations/dynamic-counter/shared/model.ts ***!
  \**********************************************************************************/
/*! exports provided: INITIAL_STATE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INITIAL_STATE", function() { return INITIAL_STATE; });
const INITIAL_STATE = {
    isTicking: false,
    count: 0,
    countUp: true,
    tickSpeed: 200,
    countDiff: 1,
};


/***/ }),

/***/ "zhsl":
/*!******************************************************************************************!*\
  !*** ./apps/demos/src/app/features/integrations/dynamic-counter/shared/shared.module.ts ***!
  \******************************************************************************************/
/*! exports provided: SharedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedModule", function() { return SharedModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @rx-angular/template */ "WFkj");
/* harmony import */ var _counter_display_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./counter-display.component */ "Zwmw");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _shared_utils_utils_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../shared/utils/utils.module */ "UKRj");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ "fXoL");









const DECLARATIONS = [_counter_display_component__WEBPACK_IMPORTED_MODULE_4__["CounterDisplayComponent"]];
class SharedModule {
}
SharedModule.ɵfac = function SharedModule_Factory(t) { return new (t || SharedModule)(); };
SharedModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({ type: SharedModule });
SharedModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__["LetModule"], _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__["PushModule"],
            _shared_utils_utils_module__WEBPACK_IMPORTED_MODULE_7__["UtilsModule"]
        ], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"],
        _angular_material_input__WEBPACK_IMPORTED_MODULE_2__["MatInputModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_1__["MatButtonModule"],
        _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatFormFieldModule"],
        _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__["LetModule"], _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__["PushModule"],
        _shared_utils_utils_module__WEBPACK_IMPORTED_MODULE_7__["UtilsModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](SharedModule, { declarations: [_counter_display_component__WEBPACK_IMPORTED_MODULE_4__["CounterDisplayComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__["LetModule"], _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__["PushModule"],
        _shared_utils_utils_module__WEBPACK_IMPORTED_MODULE_7__["UtilsModule"]], exports: [_counter_display_component__WEBPACK_IMPORTED_MODULE_4__["CounterDisplayComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"],
        _angular_material_input__WEBPACK_IMPORTED_MODULE_2__["MatInputModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_1__["MatButtonModule"],
        _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatFormFieldModule"],
        _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__["LetModule"], _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__["PushModule"],
        _shared_utils_utils_module__WEBPACK_IMPORTED_MODULE_7__["UtilsModule"]] }); })();


/***/ })

}]);
//# sourceMappingURL=common.js.map