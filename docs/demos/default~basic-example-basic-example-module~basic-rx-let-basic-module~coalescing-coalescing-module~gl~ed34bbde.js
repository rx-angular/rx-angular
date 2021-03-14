(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~basic-example-basic-example-module~basic-rx-let-basic-module~coalescing-coalescing-module~gl~ed34bbde"],{

/***/ "J4DI":
/*!********************************************************************!*\
  !*** ./apps/demos/src/app/shared/debug-helper/renderings/index.ts ***!
  \********************************************************************/
/*! exports provided: RenderingsModule, RenderingsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _renderings_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderings.module */ "vKJq");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RenderingsModule", function() { return _renderings_module__WEBPACK_IMPORTED_MODULE_0__["RenderingsModule"]; });

/* harmony import */ var _renderings_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderings.component */ "y3ji");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RenderingsComponent", function() { return _renderings_component__WEBPACK_IMPORTED_MODULE_1__["RenderingsComponent"]; });





/***/ }),

/***/ "RtHe":
/*!********************************************************************************!*\
  !*** ./apps/demos/src/app/shared/debug-helper/visualizer/visualizer.module.ts ***!
  \********************************************************************************/
/*! exports provided: VisualizerModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VisualizerModule", function() { return VisualizerModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _dirty_checks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dirty-checks */ "v95w");
/* harmony import */ var _renderings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../renderings */ "J4DI");
/* harmony import */ var _rx_angular_template__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @rx-angular/template */ "WFkj");
/* harmony import */ var _visualizer_work_visualizer_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./visualizer/work-visualizer.component */ "Sbge");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");







class VisualizerModule {
}
VisualizerModule.ɵfac = function VisualizerModule_Factory(t) { return new (t || VisualizerModule)(); };
VisualizerModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({ type: VisualizerModule });
VisualizerModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _dirty_checks__WEBPACK_IMPORTED_MODULE_2__["DirtyChecksModule"],
            _renderings__WEBPACK_IMPORTED_MODULE_3__["RenderingsModule"],
            _rx_angular_template__WEBPACK_IMPORTED_MODULE_4__["PushModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](VisualizerModule, { declarations: [_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_1__["VisualizerComponent"], _visualizer_work_visualizer_component__WEBPACK_IMPORTED_MODULE_5__["WorkVisualizerComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _dirty_checks__WEBPACK_IMPORTED_MODULE_2__["DirtyChecksModule"],
        _renderings__WEBPACK_IMPORTED_MODULE_3__["RenderingsModule"],
        _rx_angular_template__WEBPACK_IMPORTED_MODULE_4__["PushModule"]], exports: [_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_1__["VisualizerComponent"], _visualizer_work_visualizer_component__WEBPACK_IMPORTED_MODULE_5__["WorkVisualizerComponent"]] }); })();


/***/ }),

/***/ "Sbge":
/*!***************************************************************************************************!*\
  !*** ./apps/demos/src/app/shared/debug-helper/visualizer/visualizer/work-visualizer.component.ts ***!
  \***************************************************************************************************/
/*! exports provided: WorkVisualizerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkVisualizerComponent", function() { return WorkVisualizerComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../hooks */ "XoRM");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _dirty_checks_dirty_checks_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../dirty-checks/dirty-checks.component */ "qnLR");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _renderings_renderings_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../renderings/renderings.component */ "y3ji");







function WorkVisualizerComponent_rxa_renders_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "rxa-renders", 6);
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value$", ctx_r0.valuesO$)("radius", ctx_r0.radius);
} }
const _c0 = function (a0) { return { filled: a0 }; };
function WorkVisualizerComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "\u00A0");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const child_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](1, _c0, child_r2 % 2 === 0));
} }
const _c1 = [[["", "visualizerHeader", ""]], "*"];
const _c2 = ["[visualizerHeader]", "*"];
class WorkVisualizerComponent extends _hooks__WEBPACK_IMPORTED_MODULE_2__["Hooks"] {
    constructor() {
        super();
        this.work = 10;
        this.classNames = 'd-flex flex-column w-100 m-1 p-1 dh-l-view';
        this.radius = 20;
        this.renderingsOn = false;
        this.changeO$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["ReplaySubject"](1);
        this.valuesO$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["defer"])(() => this.afterViewInit$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(() => this.changeO$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(o$ => !!this.key ? o$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["pluck"])(this.key)) : o$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(v => console.log('value', v))))));
    }
    set viewType(type) {
        if (type == null) {
            type = 'l-view';
        }
        this.classNames = [...this.classNames.split(' ').filter(c => c.indexOf('dh-') === -1), 'dh-' + type]
            .join(' ');
    }
    set value$(v$) {
        if (Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["isObservable"])(v$)) {
            this.changeO$.next(v$);
        }
        else {
            if (v$ != null) {
                this.renderingsOn = true;
                this.changeO$.next(Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(v$));
            }
            else {
                this.renderingsOn = false;
            }
        }
    }
    ;
    getChildren() {
        const items = [];
        for (let i = 0; i <= this.work * 10; i++) {
            items.push(Math.ceil(Math.random() * 100));
        }
        return items;
    }
}
WorkVisualizerComponent.ɵfac = function WorkVisualizerComponent_Factory(t) { return new (t || WorkVisualizerComponent)(); };
WorkVisualizerComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: WorkVisualizerComponent, selectors: [["rxa-work-visualizer"]], hostVars: 4, hostBindings: function WorkVisualizerComponent_HostBindings(rf, ctx) { if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassMap"](ctx.classNames);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵstyleProp"]("width", ctx.size, "px");
    } }, inputs: { size: "size", work: "work", viewType: "viewType", radius: "radius", renderingsOn: "renderingsOn", value$: "value$", key: "key" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵInheritDefinitionFeature"]], ngContentSelectors: _c2, decls: 8, vars: 3, consts: [[1, "d-flex", "w-100"], [2, "margin-right", "1rem", 3, "radius"], [3, "value$", "radius", 4, "ngIf"], [1, "d-flex", "flex-wrap", "w-100"], ["class", "work-child", 4, "ngFor", "ngForOf"], [1, "w-100", "h-100", "d-flex", "align-items-center", "justify-content-center", "flex-grow-1"], [3, "value$", "radius"], [1, "work-child"], [3, "ngClass"]], template: function WorkVisualizerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵprojectionDef"](_c1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "rxa-dirty-check", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, WorkVisualizerComponent_rxa_renders_2_Template, 1, 2, "rxa-renders", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](4, WorkVisualizerComponent_div_4_Template, 3, 3, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵprojection"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵprojection"](7, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("radius", ctx.radius);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.renderingsOn);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.getChildren());
    } }, directives: [_dirty_checks_dirty_checks_component__WEBPACK_IMPORTED_MODULE_4__["DirtyChecksComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], _renderings_renderings_component__WEBPACK_IMPORTED_MODULE_6__["RenderingsComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgClass"]], styles: [".work-child[_ngcontent-%COMP%] {\n      position: relative;\n      width: 4px;\n      height: 4px;\n      margin: 0 2px 2px 0;\n      padding: 0px;\n      outline: 1px solid green;\n      background-color: transparent;\n    }\n\n    .work-child[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n      position: absolute;\n      width: 100%;\n      height: 100%;\n    }\n    .work-child[_ngcontent-%COMP%]   div.filled[_ngcontent-%COMP%] {\n      background-color: orange;\n    }"] });


/***/ }),

/***/ "cIVi":
/*!**********************************************************************************************!*\
  !*** ./apps/demos/src/app/shared/debug-helper/visualizer/visualizer/visualizer.component.ts ***!
  \**********************************************************************************************/
/*! exports provided: VisualizerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VisualizerComponent", function() { return VisualizerComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../hooks */ "XoRM");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _dirty_checks_dirty_checks_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../dirty-checks/dirty-checks.component */ "qnLR");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _renderings_renderings_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../renderings/renderings.component */ "y3ji");







function VisualizerComponent_rxa_renders_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "rxa-renders", 5);
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value$", ctx_r0.valuesO$)("radius", ctx_r0.radius);
} }
function VisualizerComponent_span_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r1.cDS);
} }
const _c0 = [[["", "visualizerHeader", ""]], "*"];
const _c1 = ["[visualizerHeader]", "*"];
class VisualizerComponent extends _hooks__WEBPACK_IMPORTED_MODULE_2__["Hooks"] {
    constructor() {
        super();
        this.classNames = 'd-flex flex-column w-100 m-1 p-1 dh-l-view';
        this.radius = 20;
        this.renderingsOn = false;
        this.changeO$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["ReplaySubject"](1);
        this.valuesO$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["defer"])(() => this.afterViewInit$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(() => this.changeO$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(o$ => !!this.key ? o$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["pluck"])(this.key)) : o$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(v => console.log('value', v))))));
    }
    set viewType(type) {
        if (type == null) {
            type = 'l-view';
        }
        this.classNames = [...this.classNames.split(' ').filter(c => c.indexOf('dh-') === -1), 'dh-' + type]
            .join(' ');
    }
    set value$(v$) {
        if (Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["isObservable"])(v$)) {
            this.changeO$.next(v$);
        }
        else {
            if (v$ != null) {
                this.renderingsOn = true;
                this.changeO$.next(Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(v$));
            }
            else {
                this.renderingsOn = false;
            }
        }
    }
    ;
}
VisualizerComponent.ɵfac = function VisualizerComponent_Factory(t) { return new (t || VisualizerComponent)(); };
VisualizerComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: VisualizerComponent, selectors: [["rxa-visualizer"]], hostVars: 4, hostBindings: function VisualizerComponent_HostBindings(rf, ctx) { if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassMap"](ctx.classNames);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵstyleProp"]("width", ctx.size, "px");
    } }, inputs: { size: "size", viewType: "viewType", cDS: "cDS", radius: "radius", renderingsOn: "renderingsOn", value$: "value$", key: "key" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵInheritDefinitionFeature"]], ngContentSelectors: _c1, decls: 7, vars: 3, consts: [[1, "d-flex", "w-100"], [2, "margin-right", "1rem", 3, "radius"], [3, "value$", "radius", 4, "ngIf"], [4, "ngIf"], [1, "w-100", "h-100", "d-flex", "align-items-center", "justify-content-center", "flex-grow-1"], [3, "value$", "radius"]], template: function VisualizerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵprojectionDef"](_c0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "rxa-dirty-check", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, VisualizerComponent_rxa_renders_2_Template, 1, 2, "rxa-renders", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](3, VisualizerComponent_span_3_Template, 2, 1, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵprojection"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵprojection"](6, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("radius", ctx.radius);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.renderingsOn);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.cDS);
    } }, directives: [_dirty_checks_dirty_checks_component__WEBPACK_IMPORTED_MODULE_4__["DirtyChecksComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _renderings_renderings_component__WEBPACK_IMPORTED_MODULE_6__["RenderingsComponent"]], encapsulation: 2 });


/***/ }),

/***/ "vKJq":
/*!********************************************************************************!*\
  !*** ./apps/demos/src/app/shared/debug-helper/renderings/renderings.module.ts ***!
  \********************************************************************************/
/*! exports provided: RenderingsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderingsModule", function() { return RenderingsModule; });
/* harmony import */ var _renderings_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderings.component */ "y3ji");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/core */ "FKr1");
/* harmony import */ var _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @rx-angular/template */ "WFkj");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");





const DECLARATIONS = [_renderings_component__WEBPACK_IMPORTED_MODULE_0__["RenderingsComponent"]];
class RenderingsModule {
}
RenderingsModule.ɵfac = function RenderingsModule_Factory(t) { return new (t || RenderingsModule)(); };
RenderingsModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: RenderingsModule });
RenderingsModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_2__["MatRippleModule"], _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__["PushModule"]]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](RenderingsModule, { declarations: [_renderings_component__WEBPACK_IMPORTED_MODULE_0__["RenderingsComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_2__["MatRippleModule"], _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__["PushModule"]], exports: [_renderings_component__WEBPACK_IMPORTED_MODULE_0__["RenderingsComponent"]] }); })();


/***/ }),

/***/ "y3ji":
/*!***********************************************************************************!*\
  !*** ./apps/demos/src/app/shared/debug-helper/renderings/renderings.component.ts ***!
  \***********************************************************************************/
/*! exports provided: RenderingsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderingsComponent", function() { return RenderingsComponent; });
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/material/core */ "FKr1");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../hooks */ "XoRM");
/* harmony import */ var _rx_effects_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../rx-effects.service */ "+Gkt");
/* harmony import */ var _rx_angular_state__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @rx-angular/state */ "YYsp");
/* harmony import */ var _app_config_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../app-config.service */ "uloo");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _libs_template_src_lib_push_push_pipe__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../../../libs/template/src/lib/push/push.pipe */ "duzR");













const _c0 = function (a0, a1) { return { minWidth: a0, minHeight: a1 }; };
class RenderingsComponent extends _hooks__WEBPACK_IMPORTED_MODULE_3__["Hooks"] {
    constructor(configService, rxEf) {
        super();
        this.configService = configService;
        this.rxEf = rxEf;
        this.changeO$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["ReplaySubject"](1);
        this.numRenders$ = this.afterViewInit$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(() => this.changeO$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchAll"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["scan"])(a => ++a, 0), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(() => this.rippleOn && this.ripple.launch({ centered: true })))));
        this.rippleOn = true;
        this.radius = 20;
        this.color = 'rgba(255,0,0,0.24)';
        this.rxEf.hold(this.configService.$.pipe(Object(_rx_angular_state__WEBPACK_IMPORTED_MODULE_5__["select"])('rippleOn')), (r) => {
            this.rippleOn = r;
        });
        this.rxEf.hold(this.afterViewInit$, () => {
            this.launchRipple();
        });
    }
    set value$(v$) {
        if (Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["isObservable"])(v$)) {
            this.changeO$.next(v$);
        }
        else {
            if (v$ != null) {
                this.changeO$.next(Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(v$));
            }
        }
    }
    ;
    launchRipple(options = { centered: true }) {
        if (this.rippleOn) {
            this.ripple.launch(options);
        }
    }
}
RenderingsComponent.ɵfac = function RenderingsComponent_Factory(t) { return new (t || RenderingsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_app_config_service__WEBPACK_IMPORTED_MODULE_6__["AppConfigService"]), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_rx_effects_service__WEBPACK_IMPORTED_MODULE_4__["RxEffects"])); };
RenderingsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({ type: RenderingsComponent, selectors: [["rxa-renders"]], viewQuery: function RenderingsComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](_angular_material_core__WEBPACK_IMPORTED_MODULE_0__["MatRipple"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.ripple = _t.first);
    } }, inputs: { rippleOn: "rippleOn", radius: "radius", color: "color", value$: "value$" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵProvidersFeature"]([_rx_effects_service__WEBPACK_IMPORTED_MODULE_4__["RxEffects"]]), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵInheritDefinitionFeature"]], decls: 4, vars: 11, consts: [["matRipple", "", 1, "indicator-ripple", 3, "ngStyle", "matRippleColor", "matRippleRadius"]], template: function RenderingsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](2, "json");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](3, "push");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction2"](8, _c0, ctx.radius + "px", ctx.radius + "px"))("matRippleColor", ctx.color)("matRippleRadius", ctx.radius);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](2, 4, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](3, 6, ctx.numRenders$)), " ");
    } }, directives: [_angular_material_core__WEBPACK_IMPORTED_MODULE_0__["MatRipple"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgStyle"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_8__["JsonPipe"], _libs_template_src_lib_push_push_pipe__WEBPACK_IMPORTED_MODULE_9__["PushPipe"]], styles: ["[_nghost-%COMP%]   .indicator-ripple[_ngcontent-%COMP%] {\n      border: 1px solid #ff00005f;\n    }"], changeDetection: 0 });


/***/ })

}]);
//# sourceMappingURL=default~basic-example-basic-example-module~basic-rx-let-basic-module~coalescing-coalescing-module~gl~ed34bbde.js.map