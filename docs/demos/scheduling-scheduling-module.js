(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["scheduling-scheduling-module"],{

/***/ "2OB9":
/*!***********************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/scheduling/scheduling/utils/index.ts ***!
  \***********************************************************************************/
/*! exports provided: promiseTick, animationFrameTick, SchedulingName, SchedulingPriority, priorityTickMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _promiseTick__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./promiseTick */ "vt0L");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "promiseTick", function() { return _promiseTick__WEBPACK_IMPORTED_MODULE_0__["promiseTick"]; });

/* harmony import */ var _animationFrameTick__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./animationFrameTick */ "uFlU");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "animationFrameTick", function() { return _animationFrameTick__WEBPACK_IMPORTED_MODULE_1__["animationFrameTick"]; });

/* harmony import */ var _interfaces__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./interfaces */ "u/+O");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SchedulingName", function() { return _interfaces__WEBPACK_IMPORTED_MODULE_2__["SchedulingName"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SchedulingPriority", function() { return _interfaces__WEBPACK_IMPORTED_MODULE_2__["SchedulingPriority"]; });

/* harmony import */ var _priority_tick_map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./priority-tick-map */ "QzHz");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "priorityTickMap", function() { return _priority_tick_map__WEBPACK_IMPORTED_MODULE_3__["priorityTickMap"]; });







/***/ }),

/***/ "3iqi":
/*!******************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/scheduling/scheduling.routes.ts ***!
  \******************************************************************************/
/*! exports provided: ROUTES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROUTES", function() { return ROUTES; });
/* harmony import */ var _scheduling_scheduling_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scheduling/scheduling.component */ "zdxM");

const ROUTES = [
    {
        path: '',
        component: _scheduling_scheduling_component__WEBPACK_IMPORTED_MODULE_0__["SchedulingComponent"]
    }
];


/***/ }),

/***/ "QzHz":
/*!***********************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/scheduling/scheduling/utils/priority-tick-map.ts ***!
  \***********************************************************************************************/
/*! exports provided: priorityTickMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "priorityTickMap", function() { return priorityTickMap; });
/* harmony import */ var _animationFrameTick__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animationFrameTick */ "uFlU");
/* harmony import */ var _promiseTick__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./promiseTick */ "vt0L");
/* harmony import */ var _interfaces__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./interfaces */ "u/+O");
/* harmony import */ var _rx_angular_pocs_cdk_utils_rxjs_observable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../rx-angular-pocs/cdk/utils/rxjs/observable */ "CQ8T");




const priorityTickMap = {
    [_interfaces__WEBPACK_IMPORTED_MODULE_2__["SchedulingPriority"].animationFrame]: Object(_animationFrameTick__WEBPACK_IMPORTED_MODULE_0__["animationFrameTick"])(),
    [_interfaces__WEBPACK_IMPORTED_MODULE_2__["SchedulingPriority"].Promise]: Object(_promiseTick__WEBPACK_IMPORTED_MODULE_1__["promiseTick"])(),
    [_interfaces__WEBPACK_IMPORTED_MODULE_2__["SchedulingPriority"].setInterval]: Object(_rx_angular_pocs_cdk_utils_rxjs_observable__WEBPACK_IMPORTED_MODULE_3__["intervalTick"])(),
    [_interfaces__WEBPACK_IMPORTED_MODULE_2__["SchedulingPriority"].setTimeout]: Object(_rx_angular_pocs_cdk_utils_rxjs_observable__WEBPACK_IMPORTED_MODULE_3__["timeoutTick"])(),
};


/***/ }),

/***/ "cLBw":
/*!******************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/scheduling/scheduling.module.ts ***!
  \******************************************************************************/
/*! exports provided: SchedulingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SchedulingModule", function() { return SchedulingModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _scheduling_scheduling_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scheduling/scheduling.component */ "zdxM");
/* harmony import */ var _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @rx-angular/template */ "WFkj");
/* harmony import */ var _scheduling_routes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scheduling.routes */ "3iqi");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../shared/debug-helper/visualizer */ "cyPU");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "fXoL");









const DECLARATIONS = [_scheduling_scheduling_component__WEBPACK_IMPORTED_MODULE_2__["SchedulingComponent"]];
class SchedulingModule {
}
SchedulingModule.ɵfac = function SchedulingModule_Factory(t) { return new (t || SchedulingModule)(); };
SchedulingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({ type: SchedulingModule });
SchedulingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(_scheduling_routes__WEBPACK_IMPORTED_MODULE_4__["ROUTES"]),
            _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__["LetModule"], _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__["PushModule"], _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__["UnpatchEventsModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_5__["MatButtonModule"],
            _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_6__["VisualizerModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](SchedulingModule, { declarations: [_scheduling_scheduling_component__WEBPACK_IMPORTED_MODULE_2__["SchedulingComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"], _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__["LetModule"], _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__["PushModule"], _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__["UnpatchEventsModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_5__["MatButtonModule"],
        _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_6__["VisualizerModule"]], exports: [_scheduling_scheduling_component__WEBPACK_IMPORTED_MODULE_2__["SchedulingComponent"]] }); })();


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

/***/ "u/+O":
/*!****************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/scheduling/scheduling/utils/interfaces.ts ***!
  \****************************************************************************************/
/*! exports provided: SchedulingName, SchedulingPriority */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SchedulingName", function() { return SchedulingName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SchedulingPriority", function() { return SchedulingPriority; });
var SchedulingName;
(function (SchedulingName) {
    SchedulingName["animationFrame"] = "animationFrame";
    SchedulingName["Promise"] = "Promise";
    SchedulingName["idleCallback"] = "idleCallback";
    SchedulingName["userBlocking"] = "userBlocking";
    SchedulingName["userVisible"] = "userVisible";
    SchedulingName["background"] = "background";
    SchedulingName["setInterval"] = "setInterval";
})(SchedulingName || (SchedulingName = {}));
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

/***/ "uFlU":
/*!************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/scheduling/scheduling/utils/animationFrameTick.ts ***!
  \************************************************************************************************/
/*! exports provided: animationFrameTick */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "animationFrameTick", function() { return animationFrameTick; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _rx_angular_cdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @rx-angular/cdk */ "cDIL");


const animationFrameTick = () => new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"]((subscriber) => {
    const id = Object(_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_1__["getZoneUnPatchedApi"])('requestAnimationFrame')(() => {
        subscriber.next(0);
        subscriber.complete();
    });
    return () => {
        Object(_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_1__["getZoneUnPatchedApi"])('cancelAnimationFrame')(id);
    };
});


/***/ }),

/***/ "vt0L":
/*!*****************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/scheduling/scheduling/utils/promiseTick.ts ***!
  \*****************************************************************************************/
/*! exports provided: promiseTick */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "promiseTick", function() { return promiseTick; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _rx_angular_cdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @rx-angular/cdk */ "cDIL");


// @NOTICE replace logic with 7v handling of promises in RxJS
const promiseTick = () => new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"]((subscriber) => {
    let cancelled = false;
    _rx_angular_cdk__WEBPACK_IMPORTED_MODULE_1__["Promise"].resolve()
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

/***/ "zdxM":
/*!********************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/scheduling/scheduling/scheduling.component.ts ***!
  \********************************************************************************************/
/*! exports provided: SchedulingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SchedulingComponent", function() { return SchedulingComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _rx_angular_cdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @rx-angular/cdk */ "cDIL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils */ "2OB9");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _libs_template_src_lib_experimental_unpatch_events_unpatch_events_experimental_directive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../../../../libs/template/src/lib/experimental/unpatch/events/unpatch-events.experimental.directive */ "QZMm");










class SchedulingComponent {
    constructor(cdRef, strategyProvider) {
        this.cdRef = cdRef;
        this.strategyProvider = strategyProvider;
        this.prios = _utils__WEBPACK_IMPORTED_MODULE_4__["SchedulingPriority"];
        this.o$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(0);
        this.nextValues = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.value$ = this.nextValues.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["scan"])(count => ++count), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(v => console.log('count:', v)));
    }
    scheduleAllPrios() {
        const sync = () => {
            this.cdRef.detectChanges();
        };
        const micro = () => {
            this.cdRef.detectChanges();
        };
        const setInterval = () => {
            this.cdRef.detectChanges();
        };
        const setTimeout = () => {
            this.cdRef.detectChanges();
        };
        const animationFrame = () => {
            this.cdRef.detectChanges();
        };
        const idleCallback = () => {
            this.cdRef.detectChanges();
        };
        const userBlocking = () => {
            this.cdRef.detectChanges();
        };
        const userVisible = () => {
            this.cdRef.detectChanges();
        };
        const background = () => {
            this.cdRef.detectChanges();
        };
        sync();
        this.strategyProvider.scheduleCD(this.cdRef, { strategy: '' });
        _utils__WEBPACK_IMPORTED_MODULE_4__["priorityTickMap"][_utils__WEBPACK_IMPORTED_MODULE_4__["SchedulingPriority"].Promise].subscribe(micro);
        _utils__WEBPACK_IMPORTED_MODULE_4__["priorityTickMap"][_utils__WEBPACK_IMPORTED_MODULE_4__["SchedulingPriority"].setTimeout].subscribe(setTimeout);
        _utils__WEBPACK_IMPORTED_MODULE_4__["priorityTickMap"][_utils__WEBPACK_IMPORTED_MODULE_4__["SchedulingPriority"].setInterval].subscribe(setInterval);
        _utils__WEBPACK_IMPORTED_MODULE_4__["priorityTickMap"][_utils__WEBPACK_IMPORTED_MODULE_4__["SchedulingPriority"].animationFrame].subscribe(animationFrame);
        _utils__WEBPACK_IMPORTED_MODULE_4__["priorityTickMap"][_utils__WEBPACK_IMPORTED_MODULE_4__["SchedulingPriority"].idleCallback].subscribe(idleCallback);
        _utils__WEBPACK_IMPORTED_MODULE_4__["priorityTickMap"][_utils__WEBPACK_IMPORTED_MODULE_4__["SchedulingPriority"].background].subscribe(background);
        _utils__WEBPACK_IMPORTED_MODULE_4__["priorityTickMap"][_utils__WEBPACK_IMPORTED_MODULE_4__["SchedulingPriority"].userVisible].subscribe(userVisible);
        _utils__WEBPACK_IMPORTED_MODULE_4__["priorityTickMap"][_utils__WEBPACK_IMPORTED_MODULE_4__["SchedulingPriority"].userBlocking].subscribe(userBlocking);
    }
    scheduleByPrio(priority) {
        const XXXXXXXXXXXXXXXXXXXXX = () => {
            this.cdRef.detectChanges();
            console.log('scheduled over', priority);
        };
        priority
            ? _utils__WEBPACK_IMPORTED_MODULE_4__["priorityTickMap"][priority].subscribe(XXXXXXXXXXXXXXXXXXXXX)
            : XXXXXXXXXXXXXXXXXXXXX();
    }
    ngOnInit() {
        this.strategies = this.strategyProvider.strategies;
    }
}
SchedulingComponent.ɵfac = function SchedulingComponent_Factory(t) { return new (t || SchedulingComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_1__["RxStrategyProvider"])); };
SchedulingComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SchedulingComponent, selectors: [["rxa-scheduling"]], decls: 24, vars: 0, consts: [["visualizerHeader", ""], ["mat-raised-button", "", 3, "unpatch", "click"]], template: function SchedulingComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Scheduling Options");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SchedulingComponent_Template_button_click_4_listener() { return ctx.scheduleAllPrios(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, " scheduleAll ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SchedulingComponent_Template_button_click_6_listener() { return ctx.scheduleByPrio(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, " Unscheduled ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SchedulingComponent_Template_button_click_8_listener() { return ctx.scheduleByPrio(ctx.prios.Promise); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, " Promise ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SchedulingComponent_Template_button_click_10_listener() { return ctx.scheduleByPrio(ctx.prios.setTimeout); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, " setTimeout ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SchedulingComponent_Template_button_click_12_listener() { return ctx.scheduleByPrio(ctx.prios.setInterval); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, " setInterval ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SchedulingComponent_Template_button_click_14_listener() { return ctx.scheduleByPrio(ctx.prios.animationFrame); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, " animationFrame ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SchedulingComponent_Template_button_click_16_listener() { return ctx.scheduleByPrio(ctx.prios.idleCallback); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, " idleCallback ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SchedulingComponent_Template_button_click_18_listener() { return ctx.scheduleByPrio(ctx.prios.background); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, " background ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SchedulingComponent_Template_button_click_20_listener() { return ctx.scheduleByPrio(ctx.prios.userVisible); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, " userVisible ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SchedulingComponent_Template_button_click_22_listener() { return ctx.scheduleByPrio(ctx.prios.userBlocking); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, " userBlocking ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_5__["VisualizerComponent"], _angular_material_button__WEBPACK_IMPORTED_MODULE_6__["MatButton"], _libs_template_src_lib_experimental_unpatch_events_unpatch_events_experimental_directive__WEBPACK_IMPORTED_MODULE_7__["UnpatchEventsDirective"]], styles: ["button[_ngcontent-%COMP%]:active {\n        background: red;\n      }"], changeDetection: 0 });


/***/ })

}]);
//# sourceMappingURL=scheduling-scheduling-module.js.map