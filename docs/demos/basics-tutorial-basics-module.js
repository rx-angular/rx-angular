(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["basics-tutorial-basics-module"],{

/***/ "1wwe":
/*!**********************************************************************************************!*\
  !*** ./apps/demos/src/app/features/tutorials/basics/solution/demo-basics.adapter.service.ts ***!
  \**********************************************************************************************/
/*! exports provided: DemoBasicsAdapterService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DemoBasicsAdapterService", function() { return DemoBasicsAdapterService; });
/* harmony import */ var _rx_angular_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rx-angular/state */ "YYsp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _data_access_list_resource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../data-access/list-resource */ "SWRN");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");







class DemoBasicsAdapterService extends _rx_angular_state__WEBPACK_IMPORTED_MODULE_0__["RxState"] {
    constructor(listService, route) {
        super();
        this.listService = listService;
        this.loadingSignal$ = this.listService.loadingSignal$;
        this.list$ = this.listService.list$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(this.parseListItems));
        this.hold(route.params, () => this.refetchList());
    }
    refetchList() {
        this.listService.refetchList();
    }
    parseListItems(l) {
        return l.map(({ id, name }) => ({ id, name }));
    }
}
DemoBasicsAdapterService.ɵfac = function DemoBasicsAdapterService_Factory(t) { return new (t || DemoBasicsAdapterService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_data_access_list_resource__WEBPACK_IMPORTED_MODULE_2__["ListService"]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"])); };
DemoBasicsAdapterService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({ token: DemoBasicsAdapterService, factory: DemoBasicsAdapterService.ɵfac });


/***/ }),

/***/ "2Cwq":
/*!*************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/tutorials/basics/solution/demo-basics.view-model.service.ts ***!
  \*************************************************************************************************/
/*! exports provided: DemoBasicsViewModelService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DemoBasicsViewModelService", function() { return DemoBasicsViewModelService; });
/* harmony import */ var _rx_angular_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rx-angular/state */ "YYsp");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");




const initState = {
    refreshInterval: 1000,
    listExpanded: true,
    isPending: true,
    list: [],
};
class DemoBasicsViewModelService extends _rx_angular_state__WEBPACK_IMPORTED_MODULE_0__["RxState"] {
    constructor() {
        super();
        this.baseModel$ = this.select();
        this.refreshClicks = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.listExpandedChanges = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.refreshListSideEffect$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["merge"])(this.refreshClicks, this.select(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])((s) => s.refreshInterval), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])((refreshInterval) => refreshInterval > 4000)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])((ms) => Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["timer"])(ms))));
        this.set(initState);
        this.connect('listExpanded', this.listExpandedChanges);
    }
}
DemoBasicsViewModelService.ɵfac = function DemoBasicsViewModelService_Factory(t) { return new (t || DemoBasicsViewModelService)(); };
DemoBasicsViewModelService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: DemoBasicsViewModelService, factory: DemoBasicsViewModelService.ɵfac });


/***/ }),

/***/ "5O//":
/*!**************************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/tutorials/basics/3-output-bindings/output-bindings.solution.component.ts ***!
  \**************************************************************************************************************/
/*! exports provided: OutputBindingsSolution */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OutputBindingsSolution", function() { return OutputBindingsSolution; });
/* harmony import */ var _rx_angular_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rx-angular/state */ "YYsp");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _data_access_list_resource__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../data-access/list-resource */ "SWRN");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/expansion */ "7EHt");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/progress-bar */ "bv9b");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");












function OutputBindingsSolution_mat_expansion_panel_2_mat_progress_bar_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "mat-progress-bar", 7);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("mode", "query");
} }
function OutputBindingsSolution_mat_expansion_panel_2_ng_container_11_div_1_mat_list_item_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-list-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r9 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", item_r9.name, " ");
} }
function OutputBindingsSolution_mat_expansion_panel_2_ng_container_11_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-list");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, OutputBindingsSolution_mat_expansion_panel_2_ng_container_11_div_1_mat_list_item_2_Template, 2, 1, "mat-list-item", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const list_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", list_r6);
} }
function OutputBindingsSolution_mat_expansion_panel_2_ng_container_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, OutputBindingsSolution_mat_expansion_panel_2_ng_container_11_div_1_Template, 3, 1, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const list_r6 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", list_r6 == null ? null : list_r6.length)("ngIfElse", _r4);
} }
function OutputBindingsSolution_mat_expansion_panel_2_ng_template_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-card");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "No list given!");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function OutputBindingsSolution_mat_expansion_panel_2_Template(rf, ctx) { if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-expansion-panel", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("expandedChange", function OutputBindingsSolution_mat_expansion_panel_2_Template_mat_expansion_panel_expandedChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r12); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r11.listExpandedChanges.next($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-expansion-panel-header", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, OutputBindingsSolution_mat_expansion_panel_2_mat_progress_bar_2_Template, 1, 1, "mat-progress-bar", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "mat-panel-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, " List ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "mat-panel-description");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](8, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "button", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function OutputBindingsSolution_mat_expansion_panel_2_Template_button_click_9_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r12); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r13.onRefreshClicks($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10, " Refresh List ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](11, OutputBindingsSolution_mat_expansion_panel_2_ng_container_11_Template, 2, 2, "ng-container", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](12, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](13, OutputBindingsSolution_mat_expansion_panel_2_ng_template_13_Template, 2, 0, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const vm_r1 = ctx.ngIf;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    let tmp_2_0 = null;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("expanded", vm_r1.listExpanded);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate2"]("", (tmp_2_0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](8, 5, ctx_r0.storeList$)) == null ? null : tmp_2_0.length, " Repositories Updated every: ", vm_r1.refreshInterval, " ms ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](12, 7, ctx_r0.storeList$));
} }
const initComponentState = {
    refreshInterval: 10000,
    listExpanded: false,
    list: [],
};
class OutputBindingsSolution extends _rx_angular_state__WEBPACK_IMPORTED_MODULE_0__["RxState"] {
    constructor(listService) {
        super();
        this.listService = listService;
        this.model$ = this.select();
        this.intervalSubscription = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subscription"]();
        this.listExpandedChanges = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.storeList$ = this.listService.list$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(this.parseListItems), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["startWith"])(initComponentState.list));
        this.listExpanded = initComponentState.listExpanded;
        this.listExpandedChange = this.$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["distinctUntilKeyChanged"])('listExpanded'), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(s => s.listExpanded));
        this.set(initComponentState);
        this.connect('listExpanded', this.listExpandedChanges);
    }
    set refreshInterval(refreshInterval) {
        if (refreshInterval > 4000) {
            this.set({ refreshInterval });
            this.resetRefreshTick();
        }
    }
    ngOnDestroy() {
        this.intervalSubscription.unsubscribe();
    }
    ngOnInit() {
        this.resetRefreshTick();
    }
    resetRefreshTick() {
        this.intervalSubscription.unsubscribe();
        this.intervalSubscription = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["interval"])(this.get('refreshInterval'))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])((_) => this.listService.refetchList()))
            .subscribe();
    }
    onRefreshClicks(event) {
        this.listService.refetchList();
    }
    parseListItems(l) {
        return l.map(({ id, name }) => ({ id, name }));
    }
}
OutputBindingsSolution.ɵfac = function OutputBindingsSolution_Factory(t) { return new (t || OutputBindingsSolution)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_data_access_list_resource__WEBPACK_IMPORTED_MODULE_3__["ListService"])); };
OutputBindingsSolution.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: OutputBindingsSolution, selectors: [["rxa-output-bindings-solution"]], inputs: { refreshInterval: "refreshInterval" }, outputs: { listExpandedChange: "listExpandedChange" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵInheritDefinitionFeature"]], decls: 4, vars: 3, consts: [[3, "expanded", "expandedChange", 4, "ngIf"], [3, "expanded", "expandedChange"], [1, "list"], [3, "mode", 4, "ngIf"], ["mat-raised-button", "", "color", "primary", 3, "click"], [4, "ngIf"], ["noList", ""], [3, "mode"], [4, "ngIf", "ngIfElse"], [4, "ngFor", "ngForOf"]], template: function OutputBindingsSolution_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " Output Bindings ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, OutputBindingsSolution_mat_expansion_panel_2_Template, 15, 9, "mat-expansion-panel", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](3, "async");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](3, 1, ctx.model$));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__["MatExpansionPanel"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__["MatExpansionPanelHeader"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__["MatExpansionPanelTitle"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__["MatExpansionPanelDescription"], _angular_material_button__WEBPACK_IMPORTED_MODULE_7__["MatButton"], _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_8__["MatProgressBar"], _angular_material_list__WEBPACK_IMPORTED_MODULE_9__["MatList"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], _angular_material_list__WEBPACK_IMPORTED_MODULE_9__["MatListItem"], _angular_material_card__WEBPACK_IMPORTED_MODULE_10__["MatCard"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["AsyncPipe"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "5hye":
/*!*************************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/tutorials/basics/2-input-bindings/input-bindings-container.component.ts ***!
  \*************************************************************************************************************/
/*! exports provided: InputBindingsContainerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputBindingsContainerComponent", function() { return InputBindingsContainerComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _input_bindings_start_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./input-bindings.start.component */ "ocRB");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");







class InputBindingsContainerComponent {
    constructor() {
        this.refreshIntervalInput$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.refreshInterval$ = this.refreshIntervalInput$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((e) => e.target.value));
        this.listExpandedChange$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
    }
}
InputBindingsContainerComponent.ɵfac = function InputBindingsContainerComponent_Factory(t) { return new (t || InputBindingsContainerComponent)(); };
InputBindingsContainerComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: InputBindingsContainerComponent, selectors: [["rxa-input-bindings-container"]], decls: 8, vars: 3, consts: [["type", "number", "matInput", "", 3, "input"], [3, "refreshInterval", "listExpandedChange"]], template: function InputBindingsContainerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Input Bindings");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "RefreshInterval");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "input", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("input", function InputBindingsContainerComponent_Template_input_input_5_listener($event) { return ctx.refreshIntervalInput$.next($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "rxa-input-bindings-start", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("listExpandedChange", function InputBindingsContainerComponent_Template_rxa_input_bindings_start_listExpandedChange_6_listener($event) { return ctx.listExpandedChange$.next($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](7, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("refreshInterval", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](7, 1, ctx.refreshInterval$));
    } }, directives: [_angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__["MatFormField"], _angular_material_input__WEBPACK_IMPORTED_MODULE_4__["MatInput"], _input_bindings_start_component__WEBPACK_IMPORTED_MODULE_5__["InputBindingsStart"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["AsyncPipe"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "ANEb":
/*!*****************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/tutorials/basics/5-side-effects/side-effects.start.component.ts ***!
  \*****************************************************************************************************/
/*! exports provided: SideEffectsStart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SideEffectsStart", function() { return SideEffectsStart; });
/* harmony import */ var _rx_angular_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rx-angular/state */ "YYsp");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _data_access_list_resource__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../data-access/list-resource */ "SWRN");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/expansion */ "7EHt");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/progress-bar */ "bv9b");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");












function SideEffectsStart_mat_expansion_panel_2_mat_progress_bar_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "mat-progress-bar", 7);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("mode", "query");
} }
function SideEffectsStart_mat_expansion_panel_2_div_10_mat_list_item_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-list-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", item_r7.name, " ");
} }
function SideEffectsStart_mat_expansion_panel_2_div_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-list");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, SideEffectsStart_mat_expansion_panel_2_div_10_mat_list_item_2_Template, 2, 1, "mat-list-item", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const vm_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", vm_r1.list);
} }
function SideEffectsStart_mat_expansion_panel_2_ng_template_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-card");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "No list given!");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function SideEffectsStart_mat_expansion_panel_2_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-expansion-panel", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("expandedChange", function SideEffectsStart_mat_expansion_panel_2_Template_mat_expansion_panel_expandedChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r10); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r9.listExpandedChanges.next($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-expansion-panel-header", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, SideEffectsStart_mat_expansion_panel_2_mat_progress_bar_2_Template, 1, 1, "mat-progress-bar", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "mat-panel-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, " List ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "mat-panel-description");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "button", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function SideEffectsStart_mat_expansion_panel_2_Template_button_click_8_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r10); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r11.onRefreshClicks($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9, " Refresh List ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](10, SideEffectsStart_mat_expansion_panel_2_div_10_Template, 3, 1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](11, SideEffectsStart_mat_expansion_panel_2_ng_template_11_Template, 2, 0, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const vm_r1 = ctx.ngIf;
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("expanded", vm_r1.listExpanded);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate2"]("", vm_r1.list.length, " Repositories Updated every: ", vm_r1.refreshInterval, " ms ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", vm_r1.list == null ? null : vm_r1.list.length)("ngIfElse", _r4);
} }
const initComponentState = {
    refreshInterval: 10000,
    listExpanded: false,
    list: [],
};
class SideEffectsStart extends _rx_angular_state__WEBPACK_IMPORTED_MODULE_0__["RxState"] {
    constructor(listService) {
        super();
        this.listService = listService;
        this.model$ = this.select();
        this.intervalSubscription = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subscription"]();
        this.listExpandedChanges = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.storeList$ = this.listService.list$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(this.parseListItems), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["startWith"])(initComponentState.list));
        this.listExpanded = initComponentState.listExpanded;
        this.listExpandedChange = this.$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["distinctUntilKeyChanged"])('listExpanded'), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(s => s.listExpanded));
        this.set(initComponentState);
        this.connect('listExpanded', this.listExpandedChanges);
        this.connect('list', this.listService.list$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(this.parseListItems)));
    }
    set refreshInterval(refreshInterval) {
        if (refreshInterval > 4000) {
            this.set({ refreshInterval });
            this.resetRefreshTick();
        }
    }
    ngOnDestroy() {
        this.intervalSubscription.unsubscribe();
    }
    ngOnInit() {
        this.resetRefreshTick();
    }
    resetRefreshTick() {
        this.intervalSubscription.unsubscribe();
        this.intervalSubscription = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["interval"])(this.get('refreshInterval'))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])((_) => this.listService.refetchList()))
            .subscribe();
    }
    onRefreshClicks(event) {
        this.listService.refetchList();
    }
    parseListItems(l) {
        return l.map(({ id, name }) => ({ id, name }));
    }
}
SideEffectsStart.ɵfac = function SideEffectsStart_Factory(t) { return new (t || SideEffectsStart)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_data_access_list_resource__WEBPACK_IMPORTED_MODULE_3__["ListService"])); };
SideEffectsStart.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: SideEffectsStart, selectors: [["rxa-side-effects-start"]], inputs: { refreshInterval: "refreshInterval" }, outputs: { listExpandedChange: "listExpandedChange" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵInheritDefinitionFeature"]], decls: 4, vars: 3, consts: [[3, "expanded", "expandedChange", 4, "ngIf"], [3, "expanded", "expandedChange"], [1, "list"], [3, "mode", 4, "ngIf"], ["mat-raised-button", "", "color", "primary", 3, "click"], [4, "ngIf", "ngIfElse"], ["noList", ""], [3, "mode"], [4, "ngFor", "ngForOf"]], template: function SideEffectsStart_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " Side Effects ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, SideEffectsStart_mat_expansion_panel_2_Template, 13, 6, "mat-expansion-panel", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](3, "async");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](3, 1, ctx.model$));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__["MatExpansionPanel"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__["MatExpansionPanelHeader"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__["MatExpansionPanelTitle"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__["MatExpansionPanelDescription"], _angular_material_button__WEBPACK_IMPORTED_MODULE_7__["MatButton"], _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_8__["MatProgressBar"], _angular_material_list__WEBPACK_IMPORTED_MODULE_9__["MatList"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], _angular_material_list__WEBPACK_IMPORTED_MODULE_9__["MatListItem"], _angular_material_card__WEBPACK_IMPORTED_MODULE_10__["MatCard"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["AsyncPipe"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "Cqk5":
/*!******************************************************************************************!*\
  !*** ./apps/demos/src/app/features/tutorials/basics/1-setup/setup.solution.component.ts ***!
  \******************************************************************************************/
/*! exports provided: SetupSolution */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetupSolution", function() { return SetupSolution; });
/* harmony import */ var _rx_angular_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rx-angular/state */ "YYsp");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _data_access_list_resource__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../data-access/list-resource */ "SWRN");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/expansion */ "7EHt");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/progress-bar */ "bv9b");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");












function SetupSolution_mat_progress_bar_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "mat-progress-bar", 6);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("mode", "query");
} }
function SetupSolution_ng_container_16_div_1_mat_list_item_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-list-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", item_r7.name, " ");
} }
function SetupSolution_ng_container_16_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-list");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, SetupSolution_ng_container_16_div_1_mat_list_item_2_Template, 2, 1, "mat-list-item", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const list_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", list_r4);
} }
function SetupSolution_ng_container_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, SetupSolution_ng_container_16_div_1_Template, 3, 1, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const list_r4 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", list_r4 == null ? null : list_r4.length)("ngIfElse", _r2);
} }
function SetupSolution_ng_template_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-card");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "No list given!");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
const initComponentState = {
    refreshInterval: 10000,
    listExpanded: false,
    list: [],
};
class SetupSolution extends _rx_angular_state__WEBPACK_IMPORTED_MODULE_0__["RxState"] {
    constructor(listService) {
        super();
        this.listService = listService;
        this.model$ = this.select();
        this.intervalSubscription = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subscription"]();
        this.listExpandedChanges = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.storeList$ = this.listService.list$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(this.parseListItems), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["startWith"])(initComponentState.list));
        this._refreshInterval = initComponentState.refreshInterval;
        this.listExpanded = initComponentState.listExpanded;
        this.listExpandedChange = this.listExpandedChanges;
        this.set(initComponentState);
    }
    set refreshInterval(refreshInterval) {
        if (refreshInterval > 4000) {
            this._refreshInterval = refreshInterval;
            this.resetRefreshTick();
        }
    }
    ngOnDestroy() {
        this.intervalSubscription.unsubscribe();
    }
    ngOnInit() {
        this.resetRefreshTick();
    }
    resetRefreshTick() {
        this.intervalSubscription.unsubscribe();
        this.intervalSubscription = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["interval"])(this._refreshInterval)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])((_) => this.listService.refetchList()))
            .subscribe();
    }
    onRefreshClicks(event) {
        this.listService.refetchList();
    }
    parseListItems(l) {
        return l.map(({ id, name }) => ({ id, name }));
    }
}
SetupSolution.ɵfac = function SetupSolution_Factory(t) { return new (t || SetupSolution)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_data_access_list_resource__WEBPACK_IMPORTED_MODULE_3__["ListService"])); };
SetupSolution.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: SetupSolution, selectors: [["rxa-setup-solution"]], inputs: { refreshInterval: "refreshInterval" }, outputs: { listExpandedChange: "listExpandedChange" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵInheritDefinitionFeature"]], decls: 20, vars: 14, consts: [[3, "expanded", "expandedChange"], [1, "list"], [3, "mode", 4, "ngIf"], ["mat-raised-button", "", "color", "primary", 3, "click"], [4, "ngIf"], ["noList", ""], [3, "mode"], [4, "ngIf", "ngIfElse"], [4, "ngFor", "ngForOf"]], template: function SetupSolution_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " Setup ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](3, "json");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](4, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "mat-expansion-panel", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("expandedChange", function SetupSolution_Template_mat_expansion_panel_expandedChange_5_listener($event) { ctx.listExpanded = $event; return ctx.listExpandedChanges.next($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "mat-expansion-panel-header", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](7, SetupSolution_mat_progress_bar_7_Template, 1, 1, "mat-progress-bar", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "mat-panel-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9, " List ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "mat-panel-description");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](13, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](14, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function SetupSolution_Template_button_click_14_listener($event) { return ctx.onRefreshClicks($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](15, " Refresh List ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](16, SetupSolution_ng_container_16_Template, 2, 2, "ng-container", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](17, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](18, SetupSolution_ng_template_18_Template, 2, 0, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    } if (rf & 2) {
        let tmp_3_0 = null;
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](3, 6, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](4, 8, ctx.model$)), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("expanded", ctx.listExpanded);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate2"]("", (tmp_3_0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](13, 10, ctx.storeList$)) == null ? null : tmp_3_0.length, " Repositories Updated every: ", ctx._refreshInterval, " ms ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](17, 12, ctx.storeList$));
    } }, directives: [_angular_material_expansion__WEBPACK_IMPORTED_MODULE_5__["MatExpansionPanel"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_5__["MatExpansionPanelHeader"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_5__["MatExpansionPanelTitle"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_5__["MatExpansionPanelDescription"], _angular_material_button__WEBPACK_IMPORTED_MODULE_7__["MatButton"], _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_8__["MatProgressBar"], _angular_material_list__WEBPACK_IMPORTED_MODULE_9__["MatList"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgForOf"], _angular_material_list__WEBPACK_IMPORTED_MODULE_9__["MatListItem"], _angular_material_card__WEBPACK_IMPORTED_MODULE_10__["MatCard"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["JsonPipe"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["AsyncPipe"]], styles: [".list[_ngcontent-%COMP%]   .mat-expansion-panel-header[_ngcontent-%COMP%] {\n        position: relative;\n      }\n\n      .list[_ngcontent-%COMP%]   .mat-expansion-panel-header[_ngcontent-%COMP%]   mat-progress-bar[_ngcontent-%COMP%] {\n        position: absolute;\n        top: 0px;\n        left: 0;\n      }\n\n      .list[_ngcontent-%COMP%]   .mat-expansion-panel-content[_ngcontent-%COMP%]   .mat-expansion-panel-body[_ngcontent-%COMP%] {\n        padding-top: 10px;\n      }"], changeDetection: 0 });


/***/ }),

/***/ "E4d5":
/*!***************************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/tutorials/basics/6-presenter-pattern/presenter-pattern.start.component.ts ***!
  \***************************************************************************************************************/
/*! exports provided: PresenterPatternStart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PresenterPatternStart", function() { return PresenterPatternStart; });
/* harmony import */ var _rx_angular_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rx-angular/state */ "YYsp");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _data_access_list_resource__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../data-access/list-resource */ "SWRN");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/expansion */ "7EHt");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/progress-bar */ "bv9b");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");












function PresenterPatternStart_mat_expansion_panel_2_mat_progress_bar_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "mat-progress-bar", 7);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("mode", "query");
} }
function PresenterPatternStart_mat_expansion_panel_2_div_10_mat_list_item_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-list-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", item_r7.name, " ");
} }
function PresenterPatternStart_mat_expansion_panel_2_div_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-list");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, PresenterPatternStart_mat_expansion_panel_2_div_10_mat_list_item_2_Template, 2, 1, "mat-list-item", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const vm_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", vm_r1.list);
} }
function PresenterPatternStart_mat_expansion_panel_2_ng_template_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-card");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "No list given!");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function PresenterPatternStart_mat_expansion_panel_2_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-expansion-panel", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("expandedChange", function PresenterPatternStart_mat_expansion_panel_2_Template_mat_expansion_panel_expandedChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r10); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r9.listExpandedChanges.next($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-expansion-panel-header", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, PresenterPatternStart_mat_expansion_panel_2_mat_progress_bar_2_Template, 1, 1, "mat-progress-bar", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "mat-panel-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, " List ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "mat-panel-description");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "button", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function PresenterPatternStart_mat_expansion_panel_2_Template_button_click_8_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r10); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r11.onRefreshClicks($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9, " Refresh List ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](10, PresenterPatternStart_mat_expansion_panel_2_div_10_Template, 3, 1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](11, PresenterPatternStart_mat_expansion_panel_2_ng_template_11_Template, 2, 0, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const vm_r1 = ctx.ngIf;
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("expanded", vm_r1.listExpanded);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate2"]("", vm_r1.list.length, " Repositories Updated every: ", vm_r1.refreshInterval, " ms ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", vm_r1.list == null ? null : vm_r1.list.length)("ngIfElse", _r4);
} }
const initComponentState = {
    refreshInterval: 10000,
    listExpanded: false,
    list: []
};
class PresenterPatternStart extends _rx_angular_state__WEBPACK_IMPORTED_MODULE_0__["RxState"] {
    constructor(listService) {
        super();
        this.listService = listService;
        this.model$ = this.select();
        this.intervalSubscription = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subscription"]();
        this.listExpandedChanges = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.listExpanded = initComponentState.listExpanded;
        this.listExpandedChange = this.$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["distinctUntilKeyChanged"])('listExpanded'), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(s => s.listExpanded));
        this.set(initComponentState);
        this.connect('listExpanded', this.listExpandedChanges);
        this.connect('list', this.listService.list$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(this.parseListItems)));
    }
    set refreshInterval(refreshInterval) {
        if (refreshInterval > 4000) {
            this.set({ refreshInterval });
            this.resetRefreshTick();
        }
    }
    ngOnDestroy() {
        this.intervalSubscription.unsubscribe();
    }
    ngOnInit() {
        this.resetRefreshTick();
    }
    resetRefreshTick() {
        this.intervalSubscription.unsubscribe();
        this.intervalSubscription = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["interval"])(this.get('refreshInterval'))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])((_) => this.listService.refetchList()))
            .subscribe();
    }
    onRefreshClicks(event) {
        this.listService.refetchList();
    }
    parseListItems(l) {
        return l.map(({ id, name }) => ({ id, name }));
    }
}
PresenterPatternStart.ɵfac = function PresenterPatternStart_Factory(t) { return new (t || PresenterPatternStart)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_data_access_list_resource__WEBPACK_IMPORTED_MODULE_3__["ListService"])); };
PresenterPatternStart.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: PresenterPatternStart, selectors: [["rxa-presenter-pattern-start"]], inputs: { refreshInterval: "refreshInterval" }, outputs: { listExpandedChange: "listExpandedChange" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵInheritDefinitionFeature"]], decls: 4, vars: 3, consts: [[3, "expanded", "expandedChange", 4, "ngIf"], [3, "expanded", "expandedChange"], [1, "list"], [3, "mode", 4, "ngIf"], ["mat-raised-button", "", "color", "primary", 3, "click"], [4, "ngIf", "ngIfElse"], ["noList", ""], [3, "mode"], [4, "ngFor", "ngForOf"]], template: function PresenterPatternStart_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " Presenter Pattern ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, PresenterPatternStart_mat_expansion_panel_2_Template, 13, 6, "mat-expansion-panel", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](3, "async");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](3, 1, ctx.model$));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__["MatExpansionPanel"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__["MatExpansionPanelHeader"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__["MatExpansionPanelTitle"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__["MatExpansionPanelDescription"], _angular_material_button__WEBPACK_IMPORTED_MODULE_7__["MatButton"], _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_8__["MatProgressBar"], _angular_material_list__WEBPACK_IMPORTED_MODULE_9__["MatList"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], _angular_material_list__WEBPACK_IMPORTED_MODULE_9__["MatListItem"], _angular_material_card__WEBPACK_IMPORTED_MODULE_10__["MatCard"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["AsyncPipe"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "Hx9d":
/*!************************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/tutorials/basics/2-input-bindings/input-bindings.solution.component.ts ***!
  \************************************************************************************************************/
/*! exports provided: InputBindingsSolution */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputBindingsSolution", function() { return InputBindingsSolution; });
/* harmony import */ var _rx_angular_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rx-angular/state */ "YYsp");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _data_access_list_resource__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../data-access/list-resource */ "SWRN");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/expansion */ "7EHt");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/progress-bar */ "bv9b");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");












function InputBindingsSolution_mat_expansion_panel_2_mat_progress_bar_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "mat-progress-bar", 7);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("mode", "query");
} }
function InputBindingsSolution_mat_expansion_panel_2_ng_container_11_div_1_mat_list_item_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-list-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r9 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", item_r9.name, " ");
} }
function InputBindingsSolution_mat_expansion_panel_2_ng_container_11_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-list");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, InputBindingsSolution_mat_expansion_panel_2_ng_container_11_div_1_mat_list_item_2_Template, 2, 1, "mat-list-item", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const list_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", list_r6);
} }
function InputBindingsSolution_mat_expansion_panel_2_ng_container_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, InputBindingsSolution_mat_expansion_panel_2_ng_container_11_div_1_Template, 3, 1, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const list_r6 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", list_r6 == null ? null : list_r6.length)("ngIfElse", _r4);
} }
function InputBindingsSolution_mat_expansion_panel_2_ng_template_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-card");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "No list given!");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function InputBindingsSolution_mat_expansion_panel_2_Template(rf, ctx) { if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-expansion-panel", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("expandedChange", function InputBindingsSolution_mat_expansion_panel_2_Template_mat_expansion_panel_expandedChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r12); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); ctx_r11.listExpanded = $event; return ctx_r11.listExpandedChanges.next($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-expansion-panel-header", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, InputBindingsSolution_mat_expansion_panel_2_mat_progress_bar_2_Template, 1, 1, "mat-progress-bar", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "mat-panel-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, " List ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "mat-panel-description");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](8, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "button", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function InputBindingsSolution_mat_expansion_panel_2_Template_button_click_9_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r12); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r13.onRefreshClicks($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10, " Refresh List ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](11, InputBindingsSolution_mat_expansion_panel_2_ng_container_11_Template, 2, 2, "ng-container", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](12, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](13, InputBindingsSolution_mat_expansion_panel_2_ng_template_13_Template, 2, 0, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const vm_r1 = ctx.ngIf;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    let tmp_2_0 = null;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("expanded", ctx_r0.listExpanded);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate2"]("", (tmp_2_0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](8, 5, ctx_r0.storeList$)) == null ? null : tmp_2_0.length, " Repositories Updated every: ", vm_r1.refreshInterval, " ms ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](12, 7, ctx_r0.storeList$));
} }
const initComponentState = {
    refreshInterval: 10000,
    listExpanded: false,
    list: [],
};
class InputBindingsSolution extends _rx_angular_state__WEBPACK_IMPORTED_MODULE_0__["RxState"] {
    constructor(listService) {
        super();
        this.listService = listService;
        this.model$ = this.select();
        this.intervalSubscription = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subscription"]();
        this.listExpandedChanges = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.storeList$ = this.listService.list$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(this.parseListItems), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["startWith"])(initComponentState.list));
        this.listExpanded = initComponentState.listExpanded;
        this.listExpandedChange = this.listExpandedChanges;
        this.set(initComponentState);
    }
    set refreshInterval(refreshInterval) {
        if (refreshInterval > 4000) {
            this.set({ refreshInterval });
            this.resetRefreshTick();
        }
    }
    ngOnDestroy() {
        this.intervalSubscription.unsubscribe();
    }
    ngOnInit() {
        this.resetRefreshTick();
    }
    resetRefreshTick() {
        this.intervalSubscription.unsubscribe();
        this.intervalSubscription = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["interval"])(this.get('refreshInterval'))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])((_) => this.listService.refetchList()))
            .subscribe();
    }
    onRefreshClicks(event) {
        this.listService.refetchList();
    }
    parseListItems(l) {
        return l.map(({ id, name }) => ({ id, name }));
    }
}
InputBindingsSolution.ɵfac = function InputBindingsSolution_Factory(t) { return new (t || InputBindingsSolution)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_data_access_list_resource__WEBPACK_IMPORTED_MODULE_3__["ListService"])); };
InputBindingsSolution.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: InputBindingsSolution, selectors: [["rxa-input-bindings-solution"]], inputs: { refreshInterval: "refreshInterval" }, outputs: { listExpandedChange: "listExpandedChange" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵInheritDefinitionFeature"]], decls: 4, vars: 3, consts: [[3, "expanded", "expandedChange", 4, "ngIf"], [3, "expanded", "expandedChange"], [1, "list"], [3, "mode", 4, "ngIf"], ["mat-raised-button", "", "color", "primary", 3, "click"], [4, "ngIf"], ["noList", ""], [3, "mode"], [4, "ngIf", "ngIfElse"], [4, "ngFor", "ngForOf"]], template: function InputBindingsSolution_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " Input Bindings ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, InputBindingsSolution_mat_expansion_panel_2_Template, 15, 9, "mat-expansion-panel", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](3, "async");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](3, 1, ctx.model$));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__["MatExpansionPanel"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__["MatExpansionPanelHeader"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__["MatExpansionPanelTitle"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__["MatExpansionPanelDescription"], _angular_material_button__WEBPACK_IMPORTED_MODULE_7__["MatButton"], _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_8__["MatProgressBar"], _angular_material_list__WEBPACK_IMPORTED_MODULE_9__["MatList"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], _angular_material_list__WEBPACK_IMPORTED_MODULE_9__["MatListItem"], _angular_material_card__WEBPACK_IMPORTED_MODULE_10__["MatCard"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["AsyncPipe"]], styles: [".list[_ngcontent-%COMP%]   .mat-expansion-panel-header[_ngcontent-%COMP%] {\n          position: relative;\n        }\n  \n        .list[_ngcontent-%COMP%]   .mat-expansion-panel-header[_ngcontent-%COMP%]   mat-progress-bar[_ngcontent-%COMP%] {\n          position: absolute;\n          top: 0px;\n          left: 0;\n        }\n  \n        .list[_ngcontent-%COMP%]   .mat-expansion-panel-content[_ngcontent-%COMP%]   .mat-expansion-panel-body[_ngcontent-%COMP%] {\n          padding-top: 10px;\n        }"], changeDetection: 0 });


/***/ }),

/***/ "JB58":
/*!********************************************************************************!*\
  !*** ./apps/demos/src/app/features/tutorials/basics/tutorial-basics.module.ts ***!
  \********************************************************************************/
/*! exports provided: ROUTES, materialModules, TutorialBasicsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROUTES", function() { return ROUTES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "materialModules", function() { return materialModules; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TutorialBasicsModule", function() { return TutorialBasicsModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_badge__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/badge */ "TU8p");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/expansion */ "7EHt");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/progress-bar */ "bv9b");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/progress-spinner */ "Xa2L");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _1_setup_setup_container_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./1-setup/setup-container.component */ "RUF2");
/* harmony import */ var _1_setup_setup_solution_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./1-setup/setup.solution.component */ "Cqk5");
/* harmony import */ var _1_setup_setup_start_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./1-setup/setup.start.component */ "MVwU");
/* harmony import */ var _2_input_bindings_input_bindings_container_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./2-input-bindings/input-bindings-container.component */ "5hye");
/* harmony import */ var _2_input_bindings_input_bindings_solution_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./2-input-bindings/input-bindings.solution.component */ "Hx9d");
/* harmony import */ var _2_input_bindings_input_bindings_start_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./2-input-bindings/input-bindings.start.component */ "ocRB");
/* harmony import */ var _3_output_bindings_output_bindings_container_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./3-output-bindings/output-bindings-container.component */ "oerN");
/* harmony import */ var _3_output_bindings_output_bindings_solution_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./3-output-bindings/output-bindings.solution.component */ "5O//");
/* harmony import */ var _3_output_bindings_output_bindings_start_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./3-output-bindings/output-bindings.start.component */ "vO42");
/* harmony import */ var _4_global_state_global_state_container_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./4-global-state/global-state-container.component */ "SMUY");
/* harmony import */ var _4_global_state_global_state_solution_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./4-global-state/global-state.solution.component */ "Zurv");
/* harmony import */ var _4_global_state_global_state_start_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./4-global-state/global-state.start.component */ "WSzP");
/* harmony import */ var _5_side_effects_side_effects_container_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./5-side-effects/side-effects-container.component */ "tDq3");
/* harmony import */ var _5_side_effects_side_effects_solution_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./5-side-effects/side-effects.solution.component */ "SWnS");
/* harmony import */ var _5_side_effects_side_effects_start_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./5-side-effects/side-effects.start.component */ "ANEb");
/* harmony import */ var _6_presenter_pattern_presenter_pattern_container_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./6-presenter-pattern/presenter-pattern.container.component */ "RYsK");
/* harmony import */ var _6_presenter_pattern_presenter_pattern_solutuion_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./6-presenter-pattern/presenter-pattern.solutuion.component */ "zRP/");
/* harmony import */ var _6_presenter_pattern_presenter_pattern_start_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./6-presenter-pattern/presenter-pattern.start.component */ "E4d5");
/* harmony import */ var _solution_demo_basics_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./solution/demo-basics.component */ "tRCl");
/* harmony import */ var _solution_demo_basics_container_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./solution/demo-basics.container.component */ "VRx3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @angular/core */ "fXoL");


































const ROUTES = [
    {
        path: '',
        redirectTo: 'setup'
    },
    {
        path: 'setup',
        component: _1_setup_setup_container_component__WEBPACK_IMPORTED_MODULE_12__["SetupContainerComponent"]
    },
    {
        path: 'input-bindings',
        component: _2_input_bindings_input_bindings_container_component__WEBPACK_IMPORTED_MODULE_15__["InputBindingsContainerComponent"]
    },
    {
        path: 'output-bindings',
        component: _3_output_bindings_output_bindings_container_component__WEBPACK_IMPORTED_MODULE_18__["OutputBindingsContainerComponent"]
    },
    {
        path: 'global-state',
        component: _4_global_state_global_state_container_component__WEBPACK_IMPORTED_MODULE_21__["GlobalStateContainerComponent"]
    },
    {
        path: 'side-effects',
        component: _5_side_effects_side_effects_container_component__WEBPACK_IMPORTED_MODULE_24__["SideEffectsContainerComponent"]
    },
    {
        path: 'presenter-pattern',
        component: _6_presenter_pattern_presenter_pattern_container_component__WEBPACK_IMPORTED_MODULE_27__["PresenterPatternContainerComponent"]
    },
    {
        path: 'solution',
        component: _solution_demo_basics_container_component__WEBPACK_IMPORTED_MODULE_31__["DemoBasicsContainerComponent"]
    }
];
const DECLARATIONS = [
    _1_setup_setup_container_component__WEBPACK_IMPORTED_MODULE_12__["SetupContainerComponent"],
    _1_setup_setup_start_component__WEBPACK_IMPORTED_MODULE_14__["SetupStart"],
    _1_setup_setup_solution_component__WEBPACK_IMPORTED_MODULE_13__["SetupSolution"],
    _2_input_bindings_input_bindings_container_component__WEBPACK_IMPORTED_MODULE_15__["InputBindingsContainerComponent"],
    _2_input_bindings_input_bindings_start_component__WEBPACK_IMPORTED_MODULE_17__["InputBindingsStart"],
    _2_input_bindings_input_bindings_solution_component__WEBPACK_IMPORTED_MODULE_16__["InputBindingsSolution"],
    _3_output_bindings_output_bindings_container_component__WEBPACK_IMPORTED_MODULE_18__["OutputBindingsContainerComponent"],
    _3_output_bindings_output_bindings_start_component__WEBPACK_IMPORTED_MODULE_20__["OutputBindingsStart"],
    _3_output_bindings_output_bindings_solution_component__WEBPACK_IMPORTED_MODULE_19__["OutputBindingsSolution"],
    _4_global_state_global_state_container_component__WEBPACK_IMPORTED_MODULE_21__["GlobalStateContainerComponent"],
    _4_global_state_global_state_start_component__WEBPACK_IMPORTED_MODULE_23__["GlobalStateStart"],
    _4_global_state_global_state_solution_component__WEBPACK_IMPORTED_MODULE_22__["GlobalStateSolution"],
    _5_side_effects_side_effects_container_component__WEBPACK_IMPORTED_MODULE_24__["SideEffectsContainerComponent"],
    _5_side_effects_side_effects_start_component__WEBPACK_IMPORTED_MODULE_26__["SideEffectsStart"],
    _5_side_effects_side_effects_solution_component__WEBPACK_IMPORTED_MODULE_25__["SideEffectsSolution"],
    _6_presenter_pattern_presenter_pattern_container_component__WEBPACK_IMPORTED_MODULE_27__["PresenterPatternContainerComponent"],
    _6_presenter_pattern_presenter_pattern_start_component__WEBPACK_IMPORTED_MODULE_29__["PresenterPatternStart"],
    _6_presenter_pattern_presenter_pattern_solutuion_component__WEBPACK_IMPORTED_MODULE_28__["PresenterPatternSolution"],
    _solution_demo_basics_container_component__WEBPACK_IMPORTED_MODULE_31__["DemoBasicsContainerComponent"],
    _solution_demo_basics_component__WEBPACK_IMPORTED_MODULE_30__["DemoBasicsComponent"]
];
const materialModules = [
    _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__["MatIconModule"],
    _angular_material_list__WEBPACK_IMPORTED_MODULE_8__["MatListModule"],
    _angular_material_card__WEBPACK_IMPORTED_MODULE_3__["MatCardModule"],
    _angular_material_button__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"],
    _angular_material_expansion__WEBPACK_IMPORTED_MODULE_4__["MatExpansionModule"],
    _angular_material_badge__WEBPACK_IMPORTED_MODULE_1__["MatBadgeModule"],
    _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_10__["MatProgressSpinnerModule"],
    _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_9__["MatProgressBarModule"],
    _angular_material_input__WEBPACK_IMPORTED_MODULE_7__["MatInputModule"],
    _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatFormFieldModule"]
];
class TutorialBasicsModule {
}
TutorialBasicsModule.ɵfac = function TutorialBasicsModule_Factory(t) { return new (t || TutorialBasicsModule)(); };
TutorialBasicsModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_32__["ɵɵdefineNgModule"]({ type: TutorialBasicsModule });
TutorialBasicsModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_32__["ɵɵdefineInjector"]({ imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], materialModules, _angular_router__WEBPACK_IMPORTED_MODULE_11__["RouterModule"].forChild(ROUTES)]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_32__["ɵɵsetNgModuleScope"](TutorialBasicsModule, { declarations: [_1_setup_setup_container_component__WEBPACK_IMPORTED_MODULE_12__["SetupContainerComponent"],
        _1_setup_setup_start_component__WEBPACK_IMPORTED_MODULE_14__["SetupStart"],
        _1_setup_setup_solution_component__WEBPACK_IMPORTED_MODULE_13__["SetupSolution"],
        _2_input_bindings_input_bindings_container_component__WEBPACK_IMPORTED_MODULE_15__["InputBindingsContainerComponent"],
        _2_input_bindings_input_bindings_start_component__WEBPACK_IMPORTED_MODULE_17__["InputBindingsStart"],
        _2_input_bindings_input_bindings_solution_component__WEBPACK_IMPORTED_MODULE_16__["InputBindingsSolution"],
        _3_output_bindings_output_bindings_container_component__WEBPACK_IMPORTED_MODULE_18__["OutputBindingsContainerComponent"],
        _3_output_bindings_output_bindings_start_component__WEBPACK_IMPORTED_MODULE_20__["OutputBindingsStart"],
        _3_output_bindings_output_bindings_solution_component__WEBPACK_IMPORTED_MODULE_19__["OutputBindingsSolution"],
        _4_global_state_global_state_container_component__WEBPACK_IMPORTED_MODULE_21__["GlobalStateContainerComponent"],
        _4_global_state_global_state_start_component__WEBPACK_IMPORTED_MODULE_23__["GlobalStateStart"],
        _4_global_state_global_state_solution_component__WEBPACK_IMPORTED_MODULE_22__["GlobalStateSolution"],
        _5_side_effects_side_effects_container_component__WEBPACK_IMPORTED_MODULE_24__["SideEffectsContainerComponent"],
        _5_side_effects_side_effects_start_component__WEBPACK_IMPORTED_MODULE_26__["SideEffectsStart"],
        _5_side_effects_side_effects_solution_component__WEBPACK_IMPORTED_MODULE_25__["SideEffectsSolution"],
        _6_presenter_pattern_presenter_pattern_container_component__WEBPACK_IMPORTED_MODULE_27__["PresenterPatternContainerComponent"],
        _6_presenter_pattern_presenter_pattern_start_component__WEBPACK_IMPORTED_MODULE_29__["PresenterPatternStart"],
        _6_presenter_pattern_presenter_pattern_solutuion_component__WEBPACK_IMPORTED_MODULE_28__["PresenterPatternSolution"],
        _solution_demo_basics_container_component__WEBPACK_IMPORTED_MODULE_31__["DemoBasicsContainerComponent"],
        _solution_demo_basics_component__WEBPACK_IMPORTED_MODULE_30__["DemoBasicsComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__["MatIconModule"],
        _angular_material_list__WEBPACK_IMPORTED_MODULE_8__["MatListModule"],
        _angular_material_card__WEBPACK_IMPORTED_MODULE_3__["MatCardModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"],
        _angular_material_expansion__WEBPACK_IMPORTED_MODULE_4__["MatExpansionModule"],
        _angular_material_badge__WEBPACK_IMPORTED_MODULE_1__["MatBadgeModule"],
        _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_10__["MatProgressSpinnerModule"],
        _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_9__["MatProgressBarModule"],
        _angular_material_input__WEBPACK_IMPORTED_MODULE_7__["MatInputModule"],
        _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatFormFieldModule"], _angular_router__WEBPACK_IMPORTED_MODULE_11__["RouterModule"]], exports: [_1_setup_setup_container_component__WEBPACK_IMPORTED_MODULE_12__["SetupContainerComponent"],
        _1_setup_setup_start_component__WEBPACK_IMPORTED_MODULE_14__["SetupStart"],
        _1_setup_setup_solution_component__WEBPACK_IMPORTED_MODULE_13__["SetupSolution"],
        _2_input_bindings_input_bindings_container_component__WEBPACK_IMPORTED_MODULE_15__["InputBindingsContainerComponent"],
        _2_input_bindings_input_bindings_start_component__WEBPACK_IMPORTED_MODULE_17__["InputBindingsStart"],
        _2_input_bindings_input_bindings_solution_component__WEBPACK_IMPORTED_MODULE_16__["InputBindingsSolution"],
        _3_output_bindings_output_bindings_container_component__WEBPACK_IMPORTED_MODULE_18__["OutputBindingsContainerComponent"],
        _3_output_bindings_output_bindings_start_component__WEBPACK_IMPORTED_MODULE_20__["OutputBindingsStart"],
        _3_output_bindings_output_bindings_solution_component__WEBPACK_IMPORTED_MODULE_19__["OutputBindingsSolution"],
        _4_global_state_global_state_container_component__WEBPACK_IMPORTED_MODULE_21__["GlobalStateContainerComponent"],
        _4_global_state_global_state_start_component__WEBPACK_IMPORTED_MODULE_23__["GlobalStateStart"],
        _4_global_state_global_state_solution_component__WEBPACK_IMPORTED_MODULE_22__["GlobalStateSolution"],
        _5_side_effects_side_effects_container_component__WEBPACK_IMPORTED_MODULE_24__["SideEffectsContainerComponent"],
        _5_side_effects_side_effects_start_component__WEBPACK_IMPORTED_MODULE_26__["SideEffectsStart"],
        _5_side_effects_side_effects_solution_component__WEBPACK_IMPORTED_MODULE_25__["SideEffectsSolution"],
        _6_presenter_pattern_presenter_pattern_container_component__WEBPACK_IMPORTED_MODULE_27__["PresenterPatternContainerComponent"],
        _6_presenter_pattern_presenter_pattern_start_component__WEBPACK_IMPORTED_MODULE_29__["PresenterPatternStart"],
        _6_presenter_pattern_presenter_pattern_solutuion_component__WEBPACK_IMPORTED_MODULE_28__["PresenterPatternSolution"],
        _solution_demo_basics_container_component__WEBPACK_IMPORTED_MODULE_31__["DemoBasicsContainerComponent"],
        _solution_demo_basics_component__WEBPACK_IMPORTED_MODULE_30__["DemoBasicsComponent"]] }); })();


/***/ }),

/***/ "K2NB":
/*!*************************************************************************************!*\
  !*** ./apps/demos/src/app/features/tutorials/basics/6-presenter-pattern/adapter.ts ***!
  \*************************************************************************************/
/*! exports provided: Adapter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Adapter", function() { return Adapter; });
/* harmony import */ var _rx_angular_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rx-angular/state */ "YYsp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _data_access_list_resource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../data-access/list-resource */ "SWRN");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");





class Adapter extends _rx_angular_state__WEBPACK_IMPORTED_MODULE_0__["RxState"] {
    constructor(listService) {
        super();
        this.listService = listService;
        this.list$ = this.select('list');
        this.refresh = () => {
            this.listService.refetchList();
        };
        this.connect('list', this.listService.list$
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(this.parseListItems)));
    }
    parseListItems(l) {
        return l.map(({ id, name }) => ({ id, name }));
    }
}
Adapter.ɵfac = function Adapter_Factory(t) { return new (t || Adapter)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_data_access_list_resource__WEBPACK_IMPORTED_MODULE_2__["ListService"])); };
Adapter.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: Adapter, factory: Adapter.ɵfac });


/***/ }),

/***/ "MVwU":
/*!***************************************************************************************!*\
  !*** ./apps/demos/src/app/features/tutorials/basics/1-setup/setup.start.component.ts ***!
  \***************************************************************************************/
/*! exports provided: SetupStart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetupStart", function() { return SetupStart; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _data_access_list_resource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../data-access/list-resource */ "SWRN");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/expansion */ "7EHt");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/progress-bar */ "bv9b");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");











function SetupStart_mat_progress_bar_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "mat-progress-bar", 6);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("mode", "query");
} }
function SetupStart_ng_container_13_div_1_mat_list_item_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-list-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", item_r7.name, " ");
} }
function SetupStart_ng_container_13_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "mat-list");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, SetupStart_ng_container_13_div_1_mat_list_item_2_Template, 2, 1, "mat-list-item", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const list_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", list_r4);
} }
function SetupStart_ng_container_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, SetupStart_ng_container_13_div_1_Template, 3, 1, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const list_r4 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", list_r4 == null ? null : list_r4.length)("ngIfElse", _r2);
} }
function SetupStart_ng_template_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-card");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "No list given!");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
// The  initial base-state is normally derived form somewhere else automatically. But could also get specified statically here.
const initComponentState = {
    refreshInterval: 10000,
    listExpanded: false,
    list: []
};
class SetupStart {
    constructor(listService) {
        this.listService = listService;
        this.intervalSubscription = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subscription"]();
        this.listExpandedChanges = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.storeList$ = this.listService.list$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(this.parseListItems), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["startWith"])(initComponentState.list));
        this._refreshInterval = initComponentState.refreshInterval;
        this.listExpanded = initComponentState.listExpanded;
        this.listExpandedChange = this.listExpandedChanges;
    }
    set refreshInterval(refreshInterval) {
        if (refreshInterval > 4000) {
            this._refreshInterval = refreshInterval;
            this.resetRefreshTick();
        }
    }
    ngOnDestroy() {
        this.intervalSubscription.unsubscribe();
    }
    ngOnInit() {
        this.resetRefreshTick();
    }
    resetRefreshTick() {
        this.intervalSubscription.unsubscribe();
        this.intervalSubscription = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["interval"])(this._refreshInterval)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])((_) => this.listService.refetchList()))
            .subscribe();
    }
    onRefreshClicks(event) {
        this.listService.refetchList();
    }
    parseListItems(l) {
        return l.map(({ id, name }) => ({ id, name }));
    }
}
SetupStart.ɵfac = function SetupStart_Factory(t) { return new (t || SetupStart)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_data_access_list_resource__WEBPACK_IMPORTED_MODULE_2__["ListService"])); };
SetupStart.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: SetupStart, selectors: [["rxa-setup-start"]], inputs: { refreshInterval: "refreshInterval" }, outputs: { listExpandedChange: "listExpandedChange" }, decls: 17, vars: 9, consts: [[3, "expanded", "expandedChange"], [1, "list"], [3, "mode", 4, "ngIf"], ["mat-raised-button", "", "color", "primary", 3, "click"], [4, "ngIf"], ["noList", ""], [3, "mode"], [4, "ngIf", "ngIfElse"], [4, "ngFor", "ngForOf"]], template: function SetupStart_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " Setup ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "mat-expansion-panel", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("expandedChange", function SetupStart_Template_mat_expansion_panel_expandedChange_2_listener($event) { ctx.listExpanded = $event; return ctx.listExpandedChanges.next($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "mat-expansion-panel-header", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](4, SetupStart_mat_progress_bar_4_Template, 1, 1, "mat-progress-bar", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "mat-panel-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, " List ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "mat-panel-description");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](10, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SetupStart_Template_button_click_11_listener($event) { return ctx.onRefreshClicks($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](12, " Refresh List ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](13, SetupStart_ng_container_13_Template, 2, 2, "ng-container", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](14, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](15, SetupStart_ng_template_15_Template, 2, 0, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } if (rf & 2) {
        let tmp_2_0 = null;
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("expanded", ctx.listExpanded);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate2"]("", (tmp_2_0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](10, 5, ctx.storeList$)) == null ? null : tmp_2_0.length, " Repositories Updated every: ", ctx._refreshInterval, " ms ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](14, 7, ctx.storeList$));
    } }, directives: [_angular_material_expansion__WEBPACK_IMPORTED_MODULE_4__["MatExpansionPanel"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_4__["MatExpansionPanelHeader"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_4__["MatExpansionPanelTitle"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_4__["MatExpansionPanelDescription"], _angular_material_button__WEBPACK_IMPORTED_MODULE_6__["MatButton"], _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_7__["MatProgressBar"], _angular_material_list__WEBPACK_IMPORTED_MODULE_8__["MatList"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], _angular_material_list__WEBPACK_IMPORTED_MODULE_8__["MatListItem"], _angular_material_card__WEBPACK_IMPORTED_MODULE_9__["MatCard"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["AsyncPipe"]], styles: [".list[_ngcontent-%COMP%]   .mat-expansion-panel-header[_ngcontent-%COMP%] {\n        position: relative;\n      }\n\n      .list[_ngcontent-%COMP%]   .mat-expansion-panel-header[_ngcontent-%COMP%]   mat-progress-bar[_ngcontent-%COMP%] {\n        position: absolute;\n        top: 0px;\n        left: 0;\n      }\n\n      .list[_ngcontent-%COMP%]   .mat-expansion-panel-content[_ngcontent-%COMP%]   .mat-expansion-panel-body[_ngcontent-%COMP%] {\n        padding-top: 10px;\n      }"], changeDetection: 0 });


/***/ }),

/***/ "RUF2":
/*!*******************************************************************************************!*\
  !*** ./apps/demos/src/app/features/tutorials/basics/1-setup/setup-container.component.ts ***!
  \*******************************************************************************************/
/*! exports provided: SetupContainerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetupContainerComponent", function() { return SetupContainerComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _setup_start_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./setup.start.component */ "MVwU");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");







class SetupContainerComponent {
    constructor() {
        this.refreshIntervalInput$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.refreshInterval$ = this.refreshIntervalInput$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((e) => e.target.value));
        this.listExpandedChange$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
    }
}
SetupContainerComponent.ɵfac = function SetupContainerComponent_Factory(t) { return new (t || SetupContainerComponent)(); };
SetupContainerComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: SetupContainerComponent, selectors: [["rxa-setup-container"]], decls: 8, vars: 3, consts: [["type", "number", "matInput", "", 3, "input"], [3, "refreshInterval", "listExpandedChange"]], template: function SetupContainerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Setup");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "RefreshInterval");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "input", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("input", function SetupContainerComponent_Template_input_input_5_listener($event) { return ctx.refreshIntervalInput$.next($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "rxa-setup-start", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("listExpandedChange", function SetupContainerComponent_Template_rxa_setup_start_listExpandedChange_6_listener($event) { return ctx.listExpandedChange$.next($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](7, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("refreshInterval", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](7, 1, ctx.refreshInterval$));
    } }, directives: [_angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__["MatFormField"], _angular_material_input__WEBPACK_IMPORTED_MODULE_4__["MatInput"], _setup_start_component__WEBPACK_IMPORTED_MODULE_5__["SetupStart"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["AsyncPipe"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "RYsK":
/*!*******************************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/tutorials/basics/6-presenter-pattern/presenter-pattern.container.component.ts ***!
  \*******************************************************************************************************************/
/*! exports provided: PresenterPatternContainerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PresenterPatternContainerComponent", function() { return PresenterPatternContainerComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _presenter_pattern_start_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./presenter-pattern.start.component */ "E4d5");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");







class PresenterPatternContainerComponent {
    constructor() {
        this.refreshIntervalInput$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.refreshInterval$ = this.refreshIntervalInput$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((e) => e.target.value));
    }
}
PresenterPatternContainerComponent.ɵfac = function PresenterPatternContainerComponent_Factory(t) { return new (t || PresenterPatternContainerComponent)(); };
PresenterPatternContainerComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: PresenterPatternContainerComponent, selectors: [["rxa-presenter-pattern-container"]], decls: 9, vars: 6, consts: [["type", "number", "matInput", "", 3, "input"], [3, "refreshInterval"]], template: function PresenterPatternContainerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Presenter Pattern");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](5, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "input", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("input", function PresenterPatternContainerComponent_Template_input_input_6_listener($event) { return ctx.refreshIntervalInput$.next($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](7, "rxa-presenter-pattern-start", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](8, "async");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("RefreshInterval ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](5, 2, ctx.refreshInterval$), "");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("refreshInterval", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](8, 4, ctx.refreshInterval$));
    } }, directives: [_angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__["MatFormField"], _angular_material_input__WEBPACK_IMPORTED_MODULE_4__["MatInput"], _presenter_pattern_start_component__WEBPACK_IMPORTED_MODULE_5__["PresenterPatternStart"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["AsyncPipe"]], encapsulation: 2 });


/***/ }),

/***/ "SMUY":
/*!*********************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/tutorials/basics/4-global-state/global-state-container.component.ts ***!
  \*********************************************************************************************************/
/*! exports provided: GlobalStateContainerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GlobalStateContainerComponent", function() { return GlobalStateContainerComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _global_state_start_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./global-state.start.component */ "WSzP");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");







class GlobalStateContainerComponent {
    constructor() {
        this.refreshIntervalInput$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.refreshInterval$ = this.refreshIntervalInput$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((e) => e.target.value));
        this.listExpandedChange$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
    }
}
GlobalStateContainerComponent.ɵfac = function GlobalStateContainerComponent_Factory(t) { return new (t || GlobalStateContainerComponent)(); };
GlobalStateContainerComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: GlobalStateContainerComponent, selectors: [["rxa-output-bindings-container"]], decls: 8, vars: 3, consts: [["type", "number", "matInput", "", 3, "input"], [3, "refreshInterval", "listExpandedChange"]], template: function GlobalStateContainerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Global State");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "RefreshInterval");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "input", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("input", function GlobalStateContainerComponent_Template_input_input_5_listener($event) { return ctx.refreshIntervalInput$.next($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "rxa-global-state-start", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("listExpandedChange", function GlobalStateContainerComponent_Template_rxa_global_state_start_listExpandedChange_6_listener($event) { return ctx.listExpandedChange$.next($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](7, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("refreshInterval", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](7, 1, ctx.refreshInterval$));
    } }, directives: [_angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__["MatFormField"], _angular_material_input__WEBPACK_IMPORTED_MODULE_4__["MatInput"], _global_state_start_component__WEBPACK_IMPORTED_MODULE_5__["GlobalStateStart"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["AsyncPipe"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "SWRN":
/*!*****************************************************************************************!*\
  !*** ./apps/demos/src/app/features/tutorials/basics/data-access/list-resource/index.ts ***!
  \*****************************************************************************************/
/*! exports provided: ListService, getData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _list_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./list.service */ "VChH");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ListService", function() { return _list_service__WEBPACK_IMPORTED_MODULE_0__["ListService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getData", function() { return _list_service__WEBPACK_IMPORTED_MODULE_0__["getData"]; });

/* harmony import */ var _list_server_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./list.server.model */ "zw3j");
/* empty/unused harmony star reexport */



/***/ }),

/***/ "SWnS":
/*!********************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/tutorials/basics/5-side-effects/side-effects.solution.component.ts ***!
  \********************************************************************************************************/
/*! exports provided: SideEffectsSolution */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SideEffectsSolution", function() { return SideEffectsSolution; });
/* harmony import */ var _rx_angular_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rx-angular/state */ "YYsp");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _data_access_list_resource__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../data-access/list-resource */ "SWRN");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/expansion */ "7EHt");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/progress-bar */ "bv9b");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");












function SideEffectsSolution_mat_expansion_panel_2_mat_progress_bar_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "mat-progress-bar", 7);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("mode", "query");
} }
function SideEffectsSolution_mat_expansion_panel_2_div_10_mat_list_item_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-list-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", item_r7.name, " ");
} }
function SideEffectsSolution_mat_expansion_panel_2_div_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-list");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, SideEffectsSolution_mat_expansion_panel_2_div_10_mat_list_item_2_Template, 2, 1, "mat-list-item", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const vm_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", vm_r1.list);
} }
function SideEffectsSolution_mat_expansion_panel_2_ng_template_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-card");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "No list given!");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function SideEffectsSolution_mat_expansion_panel_2_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-expansion-panel", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("expandedChange", function SideEffectsSolution_mat_expansion_panel_2_Template_mat_expansion_panel_expandedChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r10); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r9.listExpandedChanges.next($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-expansion-panel-header", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, SideEffectsSolution_mat_expansion_panel_2_mat_progress_bar_2_Template, 1, 1, "mat-progress-bar", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "mat-panel-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, " List ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "mat-panel-description");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "button", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function SideEffectsSolution_mat_expansion_panel_2_Template_button_click_8_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r10); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r11.refreshClicks$.next($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9, " Refresh List ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](10, SideEffectsSolution_mat_expansion_panel_2_div_10_Template, 3, 1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](11, SideEffectsSolution_mat_expansion_panel_2_ng_template_11_Template, 2, 0, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const vm_r1 = ctx.ngIf;
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("expanded", vm_r1.listExpanded);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate2"]("", vm_r1.list.length, " Repositories Updated every: ", vm_r1.refreshInterval, " ms ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", vm_r1.list == null ? null : vm_r1.list.length)("ngIfElse", _r4);
} }
const initComponentState = {
    refreshInterval: 10000,
    listExpanded: false,
    list: [],
};
class SideEffectsSolution extends _rx_angular_state__WEBPACK_IMPORTED_MODULE_0__["RxState"] {
    constructor(listService) {
        super();
        this.listService = listService;
        this.model$ = this.select();
        this.listExpandedChanges = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.refreshClicks$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.listExpanded = initComponentState.listExpanded;
        this.listExpandedChange = this.$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["distinctUntilKeyChanged"])('listExpanded'), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(s => s.listExpanded));
        this.set(initComponentState);
        this.connect('listExpanded', this.listExpandedChanges);
        this.connect('list', this.listService.list$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(this.parseListItems)));
        this.hold(this.refreshClicks$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["startWith"])(true)), () => this.listService.refetchList());
    }
    set refreshInterval(refreshInterval) {
        if (refreshInterval > 4000) {
            this.set({ refreshInterval });
        }
    }
    ngOnInit() {
        this.refreshClicks$.next();
    }
    parseListItems(l) {
        return l.map(({ id, name }) => ({ id, name }));
    }
}
SideEffectsSolution.ɵfac = function SideEffectsSolution_Factory(t) { return new (t || SideEffectsSolution)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_data_access_list_resource__WEBPACK_IMPORTED_MODULE_3__["ListService"])); };
SideEffectsSolution.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: SideEffectsSolution, selectors: [["rxa-side-effects-solution"]], inputs: { refreshInterval: "refreshInterval" }, outputs: { listExpandedChange: "listExpandedChange" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵInheritDefinitionFeature"]], decls: 4, vars: 3, consts: [[3, "expanded", "expandedChange", 4, "ngIf"], [3, "expanded", "expandedChange"], [1, "list"], [3, "mode", 4, "ngIf"], ["mat-raised-button", "", "color", "primary", 3, "click"], [4, "ngIf", "ngIfElse"], ["noList", ""], [3, "mode"], [4, "ngFor", "ngForOf"]], template: function SideEffectsSolution_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " Side Effects ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, SideEffectsSolution_mat_expansion_panel_2_Template, 13, 6, "mat-expansion-panel", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](3, "async");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](3, 1, ctx.model$));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__["MatExpansionPanel"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__["MatExpansionPanelHeader"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__["MatExpansionPanelTitle"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__["MatExpansionPanelDescription"], _angular_material_button__WEBPACK_IMPORTED_MODULE_7__["MatButton"], _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_8__["MatProgressBar"], _angular_material_list__WEBPACK_IMPORTED_MODULE_9__["MatList"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], _angular_material_list__WEBPACK_IMPORTED_MODULE_9__["MatListItem"], _angular_material_card__WEBPACK_IMPORTED_MODULE_10__["MatCard"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["AsyncPipe"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "VChH":
/*!************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/tutorials/basics/data-access/list-resource/list.service.ts ***!
  \************************************************************************************************/
/*! exports provided: ListService, getData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListService", function() { return ListService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getData", function() { return getData; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");





class ListService {
    constructor(http) {
        this.http = http;
        this.state$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"]({
            list: [],
            loading: false,
            error: '',
        });
        this.list$ = this.state$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])((s) => s.list), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["distinctUntilChanged"])());
        this.errorSignal$ = this.state$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])((s) => s.error), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])((b) => !!b));
        this.successSignal$ = this.state$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(({ loading, error }) => ({ loading, error })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])((o) => o.loading === false && o.error !== ''));
        this.loadingSignal$ = this.state$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(({ loading }) => loading));
        this.httpGetListItem = (arg) => Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(getData(arg)).pipe(
        // tslint:disable-next-line:no-bitwise
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["delay"])(~~(Math.random() * 5000)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])((list) => ({ list })));
        this.state$.subscribe(console.log);
    }
    refetchList() {
        this.state$.next(Object.assign(Object.assign({}, this.state$.getValue()), { loading: true }));
        this.httpGetListItem({ num: 1 })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])((e) => Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])({ error: e, loading: false, list: [] })))
            .subscribe((slice) => {
            console.log('list: ', this.state$.getValue());
            return this.state$.next({
                error: '',
                list: [...this.state$.value.list, ...slice.list],
                loading: false,
            });
        });
    }
}
ListService.ɵfac = function ListService_Factory(t) { return new (t || ListService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"])); };
ListService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: ListService, factory: ListService.ɵfac, providedIn: 'root' });
function getData(cfg = { num: 5 }) {
    // tslint:disable-next-line:no-bitwise
    const randId = (s) => s + ~~(Math.random() * 100);
    return new Array(cfg.num).fill(cfg.num).map((_) => ({
        id: randId('id'),
        name: randId('name'),
        created: Date.now() / 1000 + '',
    }));
}


/***/ }),

/***/ "VRx3":
/*!**************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/tutorials/basics/solution/demo-basics.container.component.ts ***!
  \**************************************************************************************************/
/*! exports provided: DemoBasicsContainerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DemoBasicsContainerComponent", function() { return DemoBasicsContainerComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _demo_basics_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./demo-basics.component */ "tRCl");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");







class DemoBasicsContainerComponent {
    constructor() {
        this.refreshIntervalInput$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.refreshInterval$ = this.refreshIntervalInput$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((e) => e.target.value));
    }
}
DemoBasicsContainerComponent.ɵfac = function DemoBasicsContainerComponent_Factory(t) { return new (t || DemoBasicsContainerComponent)(); };
DemoBasicsContainerComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: DemoBasicsContainerComponent, selectors: [["rxa-demo-basics4-container"]], decls: 9, vars: 3, consts: [["type", "number", "matInput", "", 3, "input"], [3, "refreshInterval"]], template: function DemoBasicsContainerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Solution");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "RefreshInterval");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "input", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("input", function DemoBasicsContainerComponent_Template_input_input_6_listener($event) { return ctx.refreshIntervalInput$.next($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](7, "rxa-demo-basics", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](8, "async");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("refreshInterval", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](8, 1, ctx.refreshInterval$));
    } }, directives: [_angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__["MatFormField"], _angular_material_input__WEBPACK_IMPORTED_MODULE_4__["MatInput"], _demo_basics_component__WEBPACK_IMPORTED_MODULE_5__["DemoBasicsComponent"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["AsyncPipe"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "WSzP":
/*!*****************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/tutorials/basics/4-global-state/global-state.start.component.ts ***!
  \*****************************************************************************************************/
/*! exports provided: GlobalStateStart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GlobalStateStart", function() { return GlobalStateStart; });
/* harmony import */ var _rx_angular_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rx-angular/state */ "YYsp");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _data_access_list_resource__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../data-access/list-resource */ "SWRN");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/expansion */ "7EHt");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/progress-bar */ "bv9b");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");












function GlobalStateStart_mat_expansion_panel_2_mat_progress_bar_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "mat-progress-bar", 7);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("mode", "query");
} }
function GlobalStateStart_mat_expansion_panel_2_ng_container_11_div_1_mat_list_item_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-list-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r9 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", item_r9.name, " ");
} }
function GlobalStateStart_mat_expansion_panel_2_ng_container_11_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-list");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, GlobalStateStart_mat_expansion_panel_2_ng_container_11_div_1_mat_list_item_2_Template, 2, 1, "mat-list-item", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const list_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", list_r6);
} }
function GlobalStateStart_mat_expansion_panel_2_ng_container_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, GlobalStateStart_mat_expansion_panel_2_ng_container_11_div_1_Template, 3, 1, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const list_r6 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", list_r6 == null ? null : list_r6.length)("ngIfElse", _r4);
} }
function GlobalStateStart_mat_expansion_panel_2_ng_template_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-card");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "No list given!");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function GlobalStateStart_mat_expansion_panel_2_Template(rf, ctx) { if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-expansion-panel", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("expandedChange", function GlobalStateStart_mat_expansion_panel_2_Template_mat_expansion_panel_expandedChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r12); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); ctx_r11.listExpanded = $event; return ctx_r11.listExpandedChanges.next($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-expansion-panel-header", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, GlobalStateStart_mat_expansion_panel_2_mat_progress_bar_2_Template, 1, 1, "mat-progress-bar", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "mat-panel-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, " List ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "mat-panel-description");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](8, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "button", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function GlobalStateStart_mat_expansion_panel_2_Template_button_click_9_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r12); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r13.onRefreshClicks($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10, " Refresh List ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](11, GlobalStateStart_mat_expansion_panel_2_ng_container_11_Template, 2, 2, "ng-container", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](12, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](13, GlobalStateStart_mat_expansion_panel_2_ng_template_13_Template, 2, 0, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const vm_r1 = ctx.ngIf;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    let tmp_2_0 = null;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("expanded", ctx_r0.listExpanded);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate2"]("", (tmp_2_0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](8, 5, ctx_r0.storeList$)) == null ? null : tmp_2_0.length, " Repositories Updated every: ", vm_r1.refreshInterval, " ms ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](12, 7, ctx_r0.storeList$));
} }
const initComponentState = {
    refreshInterval: 10000,
    listExpanded: false,
    list: []
};
class GlobalStateStart extends _rx_angular_state__WEBPACK_IMPORTED_MODULE_0__["RxState"] {
    constructor(listService) {
        super();
        this.listService = listService;
        this.model$ = this.select();
        this.intervalSubscription = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subscription"]();
        this.listExpandedChanges = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.storeList$ = this.listService.list$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(this.parseListItems), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["startWith"])(initComponentState.list));
        this.listExpanded = initComponentState.listExpanded;
        this.listExpandedChange = this.$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["distinctUntilKeyChanged"])('listExpanded'), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(s => s.listExpanded));
        this.set(initComponentState);
        this.connect('listExpanded', this.listExpandedChanges);
    }
    set refreshInterval(refreshInterval) {
        if (refreshInterval > 4000) {
            this.set({ refreshInterval });
            this.resetRefreshTick();
        }
    }
    ;
    ngOnDestroy() {
        this.intervalSubscription.unsubscribe();
    }
    ngOnInit() {
        this.resetRefreshTick();
    }
    resetRefreshTick() {
        this.intervalSubscription.unsubscribe();
        this.intervalSubscription = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["interval"])(this.get('refreshInterval'))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])((_) => this.listService.refetchList()))
            .subscribe();
    }
    onRefreshClicks(event) {
        this.listService.refetchList();
    }
    parseListItems(l) {
        return l.map(({ id, name }) => ({ id, name }));
    }
}
GlobalStateStart.ɵfac = function GlobalStateStart_Factory(t) { return new (t || GlobalStateStart)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_data_access_list_resource__WEBPACK_IMPORTED_MODULE_3__["ListService"])); };
GlobalStateStart.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: GlobalStateStart, selectors: [["rxa-global-state-start"]], inputs: { refreshInterval: "refreshInterval" }, outputs: { listExpandedChange: "listExpandedChange" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵInheritDefinitionFeature"]], decls: 4, vars: 3, consts: [[3, "expanded", "expandedChange", 4, "ngIf"], [3, "expanded", "expandedChange"], [1, "list"], [3, "mode", 4, "ngIf"], ["mat-raised-button", "", "color", "primary", 3, "click"], [4, "ngIf"], ["noList", ""], [3, "mode"], [4, "ngIf", "ngIfElse"], [4, "ngFor", "ngForOf"]], template: function GlobalStateStart_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " Output Bindings ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, GlobalStateStart_mat_expansion_panel_2_Template, 15, 9, "mat-expansion-panel", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](3, "async");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](3, 1, ctx.model$));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__["MatExpansionPanel"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__["MatExpansionPanelHeader"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__["MatExpansionPanelTitle"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__["MatExpansionPanelDescription"], _angular_material_button__WEBPACK_IMPORTED_MODULE_7__["MatButton"], _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_8__["MatProgressBar"], _angular_material_list__WEBPACK_IMPORTED_MODULE_9__["MatList"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], _angular_material_list__WEBPACK_IMPORTED_MODULE_9__["MatListItem"], _angular_material_card__WEBPACK_IMPORTED_MODULE_10__["MatCard"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["AsyncPipe"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "Zurv":
/*!********************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/tutorials/basics/4-global-state/global-state.solution.component.ts ***!
  \********************************************************************************************************/
/*! exports provided: GlobalStateSolution */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GlobalStateSolution", function() { return GlobalStateSolution; });
/* harmony import */ var _rx_angular_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rx-angular/state */ "YYsp");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _data_access_list_resource__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../data-access/list-resource */ "SWRN");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/expansion */ "7EHt");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/progress-bar */ "bv9b");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");












function GlobalStateSolution_mat_expansion_panel_2_mat_progress_bar_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "mat-progress-bar", 7);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("mode", "query");
} }
function GlobalStateSolution_mat_expansion_panel_2_div_10_mat_list_item_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-list-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", item_r7.name, " ");
} }
function GlobalStateSolution_mat_expansion_panel_2_div_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-list");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, GlobalStateSolution_mat_expansion_panel_2_div_10_mat_list_item_2_Template, 2, 1, "mat-list-item", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const vm_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", vm_r1.list);
} }
function GlobalStateSolution_mat_expansion_panel_2_ng_template_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-card");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "No list given!");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function GlobalStateSolution_mat_expansion_panel_2_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-expansion-panel", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("expandedChange", function GlobalStateSolution_mat_expansion_panel_2_Template_mat_expansion_panel_expandedChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r10); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r9.listExpandedChanges.next($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-expansion-panel-header", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, GlobalStateSolution_mat_expansion_panel_2_mat_progress_bar_2_Template, 1, 1, "mat-progress-bar", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "mat-panel-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, " List ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "mat-panel-description");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "button", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function GlobalStateSolution_mat_expansion_panel_2_Template_button_click_8_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r10); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r11.onRefreshClicks($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9, " Refresh List ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](10, GlobalStateSolution_mat_expansion_panel_2_div_10_Template, 3, 1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](11, GlobalStateSolution_mat_expansion_panel_2_ng_template_11_Template, 2, 0, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const vm_r1 = ctx.ngIf;
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("expanded", vm_r1.listExpanded);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate2"]("", vm_r1.list.length, " Repositories Updated every: ", vm_r1.refreshInterval, " ms ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", vm_r1.list == null ? null : vm_r1.list.length)("ngIfElse", _r4);
} }
const initComponentState = {
    refreshInterval: 10000,
    listExpanded: false,
    list: []
};
class GlobalStateSolution extends _rx_angular_state__WEBPACK_IMPORTED_MODULE_0__["RxState"] {
    constructor(listService) {
        super();
        this.listService = listService;
        this.model$ = this.select();
        this.intervalSubscription = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subscription"]();
        this.listExpandedChanges = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.listExpanded = initComponentState.listExpanded;
        this.listExpandedChange = this.$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["distinctUntilKeyChanged"])('listExpanded'), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(s => s.listExpanded));
        this.set(initComponentState);
        this.connect('listExpanded', this.listExpandedChanges);
        this.connect('list', this.listService.list$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(this.parseListItems)));
    }
    set refreshInterval(refreshInterval) {
        if (refreshInterval > 4000) {
            this.set({ refreshInterval });
            this.resetRefreshTick();
        }
    }
    ngOnDestroy() {
        this.intervalSubscription.unsubscribe();
    }
    ngOnInit() {
        this.resetRefreshTick();
    }
    resetRefreshTick() {
        this.intervalSubscription.unsubscribe();
        this.intervalSubscription = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["interval"])(this.get('refreshInterval'))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])((_) => this.listService.refetchList()))
            .subscribe();
    }
    onRefreshClicks(event) {
        this.listService.refetchList();
    }
    parseListItems(l) {
        return l.map(({ id, name }) => ({ id, name }));
    }
}
GlobalStateSolution.ɵfac = function GlobalStateSolution_Factory(t) { return new (t || GlobalStateSolution)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_data_access_list_resource__WEBPACK_IMPORTED_MODULE_3__["ListService"])); };
GlobalStateSolution.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: GlobalStateSolution, selectors: [["rxa-global-state-solution"]], inputs: { refreshInterval: "refreshInterval" }, outputs: { listExpandedChange: "listExpandedChange" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵInheritDefinitionFeature"]], decls: 4, vars: 3, consts: [[3, "expanded", "expandedChange", 4, "ngIf"], [3, "expanded", "expandedChange"], [1, "list"], [3, "mode", 4, "ngIf"], ["mat-raised-button", "", "color", "primary", 3, "click"], [4, "ngIf", "ngIfElse"], ["noList", ""], [3, "mode"], [4, "ngFor", "ngForOf"]], template: function GlobalStateSolution_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " Global State ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, GlobalStateSolution_mat_expansion_panel_2_Template, 13, 6, "mat-expansion-panel", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](3, "async");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](3, 1, ctx.model$));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__["MatExpansionPanel"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__["MatExpansionPanelHeader"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__["MatExpansionPanelTitle"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__["MatExpansionPanelDescription"], _angular_material_button__WEBPACK_IMPORTED_MODULE_7__["MatButton"], _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_8__["MatProgressBar"], _angular_material_list__WEBPACK_IMPORTED_MODULE_9__["MatList"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], _angular_material_list__WEBPACK_IMPORTED_MODULE_9__["MatListItem"], _angular_material_card__WEBPACK_IMPORTED_MODULE_10__["MatCard"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["AsyncPipe"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "iV5q":
/*!***************************************************************************************!*\
  !*** ./apps/demos/src/app/features/tutorials/basics/6-presenter-pattern/presenter.ts ***!
  \***************************************************************************************/
/*! exports provided: Presenter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Presenter", function() { return Presenter; });
/* harmony import */ var _rx_angular_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rx-angular/state */ "YYsp");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");




const initComponentState = {
    refreshInterval: 10000,
    listExpanded: false,
    list: [],
};
class Presenter extends _rx_angular_state__WEBPACK_IMPORTED_MODULE_0__["RxState"] {
    constructor() {
        super();
        this.refreshClicks = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.listExpandedChanges = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.vm$ = this.select();
        this.refreshListTrigger$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["merge"])(this.refreshClicks, this.select(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])((s) => s.refreshInterval), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])((ms) => Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["timer"])(0, ms))));
        this.set(initComponentState);
        this.connect(this.listExpandedChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])((b) => ({ listExpanded: b }))));
    }
}
Presenter.ɵfac = function Presenter_Factory(t) { return new (t || Presenter)(); };
Presenter.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: Presenter, factory: Presenter.ɵfac });


/***/ }),

/***/ "ocRB":
/*!*********************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/tutorials/basics/2-input-bindings/input-bindings.start.component.ts ***!
  \*********************************************************************************************************/
/*! exports provided: InputBindingsStart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputBindingsStart", function() { return InputBindingsStart; });
/* harmony import */ var _rx_angular_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rx-angular/state */ "YYsp");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _data_access_list_resource__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../data-access/list-resource */ "SWRN");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/expansion */ "7EHt");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/progress-bar */ "bv9b");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");












function InputBindingsStart_mat_progress_bar_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "mat-progress-bar", 6);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("mode", "query");
} }
function InputBindingsStart_ng_container_16_div_1_mat_list_item_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-list-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", item_r7.name, " ");
} }
function InputBindingsStart_ng_container_16_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-list");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, InputBindingsStart_ng_container_16_div_1_mat_list_item_2_Template, 2, 1, "mat-list-item", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const list_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", list_r4);
} }
function InputBindingsStart_ng_container_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, InputBindingsStart_ng_container_16_div_1_Template, 3, 1, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const list_r4 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", list_r4 == null ? null : list_r4.length)("ngIfElse", _r2);
} }
function InputBindingsStart_ng_template_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-card");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "No list given!");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
const initComponentState = {
    refreshInterval: 10000,
    listExpanded: false,
    list: [],
};
class InputBindingsStart extends _rx_angular_state__WEBPACK_IMPORTED_MODULE_0__["RxState"] {
    constructor(listService) {
        super();
        this.listService = listService;
        this.model$ = this.select();
        this.intervalSubscription = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subscription"]();
        this.listExpandedChanges = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.storeList$ = this.listService.list$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(this.parseListItems), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["startWith"])(initComponentState.list));
        this._refreshInterval = initComponentState.refreshInterval;
        this.listExpanded = initComponentState.listExpanded;
        this.listExpandedChange = this.listExpandedChanges;
        this.set(initComponentState);
    }
    set refreshInterval(refreshInterval) {
        if (refreshInterval > 4000) {
            this._refreshInterval = refreshInterval;
            this.resetRefreshTick();
        }
    }
    ngOnDestroy() {
        this.intervalSubscription.unsubscribe();
    }
    ngOnInit() {
        this.resetRefreshTick();
    }
    resetRefreshTick() {
        this.intervalSubscription.unsubscribe();
        this.intervalSubscription = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["interval"])(this._refreshInterval)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])((_) => this.listService.refetchList()))
            .subscribe();
    }
    onRefreshClicks(event) {
        this.listService.refetchList();
    }
    parseListItems(l) {
        return l.map(({ id, name }) => ({ id, name }));
    }
}
InputBindingsStart.ɵfac = function InputBindingsStart_Factory(t) { return new (t || InputBindingsStart)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_data_access_list_resource__WEBPACK_IMPORTED_MODULE_3__["ListService"])); };
InputBindingsStart.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: InputBindingsStart, selectors: [["rxa-input-bindings-start"]], inputs: { refreshInterval: "refreshInterval" }, outputs: { listExpandedChange: "listExpandedChange" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵInheritDefinitionFeature"]], decls: 20, vars: 14, consts: [[3, "expanded", "expandedChange"], [1, "list"], [3, "mode", 4, "ngIf"], ["mat-raised-button", "", "color", "primary", 3, "click"], [4, "ngIf"], ["noList", ""], [3, "mode"], [4, "ngIf", "ngIfElse"], [4, "ngFor", "ngForOf"]], template: function InputBindingsStart_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " Input Bindings ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](3, "json");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](4, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "mat-expansion-panel", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("expandedChange", function InputBindingsStart_Template_mat_expansion_panel_expandedChange_5_listener($event) { ctx.listExpanded = $event; return ctx.listExpandedChanges.next($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "mat-expansion-panel-header", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](7, InputBindingsStart_mat_progress_bar_7_Template, 1, 1, "mat-progress-bar", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "mat-panel-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9, " List ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "mat-panel-description");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](13, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](14, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function InputBindingsStart_Template_button_click_14_listener($event) { return ctx.onRefreshClicks($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](15, " Refresh List ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](16, InputBindingsStart_ng_container_16_Template, 2, 2, "ng-container", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](17, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](18, InputBindingsStart_ng_template_18_Template, 2, 0, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    } if (rf & 2) {
        let tmp_3_0 = null;
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](3, 6, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](4, 8, ctx.model$)), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("expanded", ctx.listExpanded);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate2"]("", (tmp_3_0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](13, 10, ctx.storeList$)) == null ? null : tmp_3_0.length, " Repositories Updated every: ", ctx._refreshInterval, " ms ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](17, 12, ctx.storeList$));
    } }, directives: [_angular_material_expansion__WEBPACK_IMPORTED_MODULE_5__["MatExpansionPanel"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_5__["MatExpansionPanelHeader"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_5__["MatExpansionPanelTitle"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_5__["MatExpansionPanelDescription"], _angular_material_button__WEBPACK_IMPORTED_MODULE_7__["MatButton"], _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_8__["MatProgressBar"], _angular_material_list__WEBPACK_IMPORTED_MODULE_9__["MatList"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgForOf"], _angular_material_list__WEBPACK_IMPORTED_MODULE_9__["MatListItem"], _angular_material_card__WEBPACK_IMPORTED_MODULE_10__["MatCard"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["JsonPipe"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["AsyncPipe"]], styles: [".list[_ngcontent-%COMP%]   .mat-expansion-panel-header[_ngcontent-%COMP%] {\n        position: relative;\n      }\n\n      .list[_ngcontent-%COMP%]   .mat-expansion-panel-header[_ngcontent-%COMP%]   mat-progress-bar[_ngcontent-%COMP%] {\n        position: absolute;\n        top: 0px;\n        left: 0;\n      }\n\n      .list[_ngcontent-%COMP%]   .mat-expansion-panel-content[_ngcontent-%COMP%]   .mat-expansion-panel-body[_ngcontent-%COMP%] {\n        padding-top: 10px;\n      }"], changeDetection: 0 });


/***/ }),

/***/ "oerN":
/*!***************************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/tutorials/basics/3-output-bindings/output-bindings-container.component.ts ***!
  \***************************************************************************************************************/
/*! exports provided: OutputBindingsContainerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OutputBindingsContainerComponent", function() { return OutputBindingsContainerComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _output_bindings_start_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./output-bindings.start.component */ "vO42");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");







class OutputBindingsContainerComponent {
    constructor() {
        this.refreshIntervalInput$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.refreshInterval$ = this.refreshIntervalInput$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((e) => e.target.value));
        this.listExpandedChange$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
    }
}
OutputBindingsContainerComponent.ɵfac = function OutputBindingsContainerComponent_Factory(t) { return new (t || OutputBindingsContainerComponent)(); };
OutputBindingsContainerComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: OutputBindingsContainerComponent, selectors: [["rxa-output-bindings-container"]], decls: 8, vars: 3, consts: [["type", "number", "matInput", "", 3, "input"], [3, "refreshInterval", "listExpandedChange"]], template: function OutputBindingsContainerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Output Bindings");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "RefreshInterval");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "input", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("input", function OutputBindingsContainerComponent_Template_input_input_5_listener($event) { return ctx.refreshIntervalInput$.next($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "rxa-output-bindings-start", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("listExpandedChange", function OutputBindingsContainerComponent_Template_rxa_output_bindings_start_listExpandedChange_6_listener($event) { return ctx.listExpandedChange$.next($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](7, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("refreshInterval", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](7, 1, ctx.refreshInterval$));
    } }, directives: [_angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__["MatFormField"], _angular_material_input__WEBPACK_IMPORTED_MODULE_4__["MatInput"], _output_bindings_start_component__WEBPACK_IMPORTED_MODULE_5__["OutputBindingsStart"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["AsyncPipe"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "tDq3":
/*!*********************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/tutorials/basics/5-side-effects/side-effects-container.component.ts ***!
  \*********************************************************************************************************/
/*! exports provided: SideEffectsContainerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SideEffectsContainerComponent", function() { return SideEffectsContainerComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _side_effects_start_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./side-effects.start.component */ "ANEb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");







class SideEffectsContainerComponent {
    constructor() {
        this.refreshIntervalInput$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.refreshInterval$ = this.refreshIntervalInput$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((e) => e.target.value));
    }
}
SideEffectsContainerComponent.ɵfac = function SideEffectsContainerComponent_Factory(t) { return new (t || SideEffectsContainerComponent)(); };
SideEffectsContainerComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: SideEffectsContainerComponent, selectors: [["rxa-side-effects-container"]], decls: 9, vars: 3, consts: [["type", "number", "matInput", "", 3, "input"], [3, "refreshInterval"]], template: function SideEffectsContainerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Side Effects");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "RefreshInterval");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "input", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("input", function SideEffectsContainerComponent_Template_input_input_6_listener($event) { return ctx.refreshIntervalInput$.next($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](7, "rxa-side-effects-start", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](8, "async");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("refreshInterval", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](8, 1, ctx.refreshInterval$));
    } }, directives: [_angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__["MatFormField"], _angular_material_input__WEBPACK_IMPORTED_MODULE_4__["MatInput"], _side_effects_start_component__WEBPACK_IMPORTED_MODULE_5__["SideEffectsStart"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["AsyncPipe"]], encapsulation: 2 });


/***/ }),

/***/ "tRCl":
/*!****************************************************************************************!*\
  !*** ./apps/demos/src/app/features/tutorials/basics/solution/demo-basics.component.ts ***!
  \****************************************************************************************/
/*! exports provided: DemoBasicsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DemoBasicsComponent", function() { return DemoBasicsComponent; });
/* harmony import */ var _demo_basics_view_model_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./demo-basics.view-model.service */ "2Cwq");
/* harmony import */ var _rx_angular_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @rx-angular/state */ "YYsp");
/* harmony import */ var _demo_basics_adapter_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./demo-basics.adapter.service */ "1wwe");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/expansion */ "7EHt");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/progress-bar */ "bv9b");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");












function DemoBasicsComponent_mat_expansion_panel_3_mat_progress_bar_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "mat-progress-bar", 8);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("mode", "query");
} }
function DemoBasicsComponent_mat_expansion_panel_3_span_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const bm_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate2"]("", bm_r1.list.length, " Repositories Updated every: ", bm_r1.refreshInterval, " ms ");
} }
function DemoBasicsComponent_mat_expansion_panel_3_span_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const bm_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](bm_r1.list.length);
} }
function DemoBasicsComponent_mat_expansion_panel_3_div_10_mat_list_item_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-list-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r11 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", item_r11.name, " ");
} }
function DemoBasicsComponent_mat_expansion_panel_3_div_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "mat-list");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, DemoBasicsComponent_mat_expansion_panel_3_div_10_mat_list_item_2_Template, 2, 1, "mat-list-item", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const bm_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", bm_r1.list);
} }
function DemoBasicsComponent_mat_expansion_panel_3_ng_template_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-card");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "No list given!");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function DemoBasicsComponent_mat_expansion_panel_3_Template(rf, ctx) { if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-expansion-panel", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("expandedChange", function DemoBasicsComponent_mat_expansion_panel_3_Template_mat_expansion_panel_expandedChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r14); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r13.vm.listExpandedChanges.next($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "mat-expansion-panel-header", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, DemoBasicsComponent_mat_expansion_panel_3_mat_progress_bar_2_Template, 1, 1, "mat-progress-bar", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "mat-panel-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "User Name");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "mat-panel-description");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](6, DemoBasicsComponent_mat_expansion_panel_3_span_6_Template, 2, 2, "span", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](7, DemoBasicsComponent_mat_expansion_panel_3_span_7_Template, 2, 1, "span", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function DemoBasicsComponent_mat_expansion_panel_3_Template_button_click_8_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r14); const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r15.vm.refreshClicks.next($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9, " Refresh List ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](10, DemoBasicsComponent_mat_expansion_panel_3_div_10_Template, 3, 1, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](11, DemoBasicsComponent_mat_expansion_panel_3_ng_template_11_Template, 2, 0, "ng-template", null, 7, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const bm_r1 = ctx.ngIf;
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("expanded", bm_r1.listExpanded);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", bm_r1.isPending);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !bm_r1.listExpanded);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", bm_r1.listExpanded);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", bm_r1.list.length)("ngIfElse", _r6);
} }
class DemoBasicsComponent extends _rx_angular_state__WEBPACK_IMPORTED_MODULE_1__["RxState"] {
    constructor(vm, ca) {
        super();
        this.vm = vm;
        this.ca = ca;
        this.vm.connect('list', this.ca.list$);
        this.vm.connect('isPending', this.ca.loadingSignal$);
        this.hold(this.vm.refreshListSideEffect$, (_) => this.ca.refetchList());
    }
    set refreshInterval(refreshInterval) {
        this.vm.set({ refreshInterval });
    }
}
DemoBasicsComponent.ɵfac = function DemoBasicsComponent_Factory(t) { return new (t || DemoBasicsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_demo_basics_view_model_service__WEBPACK_IMPORTED_MODULE_0__["DemoBasicsViewModelService"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_demo_basics_adapter_service__WEBPACK_IMPORTED_MODULE_2__["DemoBasicsAdapterService"])); };
DemoBasicsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: DemoBasicsComponent, selectors: [["rxa-demo-basics"]], inputs: { refreshInterval: "refreshInterval" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵProvidersFeature"]([_demo_basics_view_model_service__WEBPACK_IMPORTED_MODULE_0__["DemoBasicsViewModelService"], _demo_basics_adapter_service__WEBPACK_IMPORTED_MODULE_2__["DemoBasicsAdapterService"]]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵInheritDefinitionFeature"]], decls: 5, vars: 3, consts: [["class", "list", 3, "expanded", "expandedChange", 4, "ngIf"], [1, "list", 3, "expanded", "expandedChange"], [2, "position", "relative"], [3, "mode", 4, "ngIf"], [4, "ngIf"], ["mat-raised-button", "", "color", "primary", 3, "click"], [4, "ngIf", "ngIfElse"], ["noList", ""], [3, "mode"], [4, "ngFor", "ngForOf"]], template: function DemoBasicsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Final Example");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](3, DemoBasicsComponent_mat_expansion_panel_3_Template, 13, 6, "mat-expansion-panel", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](4, "async");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](4, 1, ctx.vm.baseModel$));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_5__["MatExpansionPanel"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_5__["MatExpansionPanelHeader"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_5__["MatExpansionPanelTitle"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_5__["MatExpansionPanelDescription"], _angular_material_button__WEBPACK_IMPORTED_MODULE_6__["MatButton"], _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_7__["MatProgressBar"], _angular_material_list__WEBPACK_IMPORTED_MODULE_8__["MatList"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"], _angular_material_list__WEBPACK_IMPORTED_MODULE_8__["MatListItem"], _angular_material_card__WEBPACK_IMPORTED_MODULE_9__["MatCard"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["AsyncPipe"]], styles: [".list[_ngcontent-%COMP%]   .mat-expansion-panel-header[_ngcontent-%COMP%] {\n        position: relative;\n      }\n      .list[_ngcontent-%COMP%]   .mat-expansion-panel-header[_ngcontent-%COMP%]   mat-progress-bar[_ngcontent-%COMP%] {\n        position: absolute;\n        top: 0px;\n        left: 0;\n      }\n\n      .list[_ngcontent-%COMP%]   .mat-expansion-panel-content[_ngcontent-%COMP%]   .mat-expansion-panel-body[_ngcontent-%COMP%] {\n        padding-top: 10px;\n      }"], changeDetection: 0 });


/***/ }),

/***/ "vO42":
/*!***********************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/tutorials/basics/3-output-bindings/output-bindings.start.component.ts ***!
  \***********************************************************************************************************/
/*! exports provided: OutputBindingsStart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OutputBindingsStart", function() { return OutputBindingsStart; });
/* harmony import */ var _rx_angular_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rx-angular/state */ "YYsp");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _data_access_list_resource__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../data-access/list-resource */ "SWRN");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/expansion */ "7EHt");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/progress-bar */ "bv9b");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");












function OutputBindingsStart_mat_expansion_panel_2_mat_progress_bar_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "mat-progress-bar", 7);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("mode", "query");
} }
function OutputBindingsStart_mat_expansion_panel_2_ng_container_11_div_1_mat_list_item_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-list-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r9 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", item_r9.name, " ");
} }
function OutputBindingsStart_mat_expansion_panel_2_ng_container_11_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-list");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, OutputBindingsStart_mat_expansion_panel_2_ng_container_11_div_1_mat_list_item_2_Template, 2, 1, "mat-list-item", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const list_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", list_r6);
} }
function OutputBindingsStart_mat_expansion_panel_2_ng_container_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, OutputBindingsStart_mat_expansion_panel_2_ng_container_11_div_1_Template, 3, 1, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const list_r6 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", list_r6 == null ? null : list_r6.length)("ngIfElse", _r4);
} }
function OutputBindingsStart_mat_expansion_panel_2_ng_template_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-card");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "No list given!");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function OutputBindingsStart_mat_expansion_panel_2_Template(rf, ctx) { if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-expansion-panel", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("expandedChange", function OutputBindingsStart_mat_expansion_panel_2_Template_mat_expansion_panel_expandedChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r12); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); ctx_r11.listExpanded = $event; return ctx_r11.listExpandedChanges.next($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-expansion-panel-header", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, OutputBindingsStart_mat_expansion_panel_2_mat_progress_bar_2_Template, 1, 1, "mat-progress-bar", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "mat-panel-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, " List ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "mat-panel-description");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](8, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "button", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function OutputBindingsStart_mat_expansion_panel_2_Template_button_click_9_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r12); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r13.onRefreshClicks($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10, " Refresh List ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](11, OutputBindingsStart_mat_expansion_panel_2_ng_container_11_Template, 2, 2, "ng-container", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](12, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](13, OutputBindingsStart_mat_expansion_panel_2_ng_template_13_Template, 2, 0, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const vm_r1 = ctx.ngIf;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    let tmp_2_0 = null;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("expanded", ctx_r0.listExpanded);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate2"]("", (tmp_2_0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](8, 5, ctx_r0.storeList$)) == null ? null : tmp_2_0.length, " Repositories Updated every: ", vm_r1.refreshInterval, " ms ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](12, 7, ctx_r0.storeList$));
} }
const initComponentState = {
    refreshInterval: 10000,
    listExpanded: false,
    list: [],
};
class OutputBindingsStart extends _rx_angular_state__WEBPACK_IMPORTED_MODULE_0__["RxState"] {
    constructor(listService) {
        super();
        this.listService = listService;
        this.model$ = this.select();
        this.intervalSubscription = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subscription"]();
        this.listExpandedChanges = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.storeList$ = this.listService.list$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(this.parseListItems), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["startWith"])(initComponentState.list));
        this.listExpanded = initComponentState.listExpanded;
        this.listExpandedChange = this.listExpandedChanges;
        this.set(initComponentState);
    }
    set refreshInterval(refreshInterval) {
        if (refreshInterval > 4000) {
            this.set({ refreshInterval });
            this.resetRefreshTick();
        }
    }
    ngOnDestroy() {
        this.intervalSubscription.unsubscribe();
    }
    ngOnInit() {
        this.resetRefreshTick();
    }
    resetRefreshTick() {
        this.intervalSubscription.unsubscribe();
        this.intervalSubscription = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["interval"])(this.get('refreshInterval'))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])((_) => this.listService.refetchList()))
            .subscribe();
    }
    onRefreshClicks(event) {
        this.listService.refetchList();
    }
    parseListItems(l) {
        return l.map(({ id, name }) => ({ id, name }));
    }
}
OutputBindingsStart.ɵfac = function OutputBindingsStart_Factory(t) { return new (t || OutputBindingsStart)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_data_access_list_resource__WEBPACK_IMPORTED_MODULE_3__["ListService"])); };
OutputBindingsStart.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: OutputBindingsStart, selectors: [["rxa-output-bindings-start"]], inputs: { refreshInterval: "refreshInterval" }, outputs: { listExpandedChange: "listExpandedChange" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵInheritDefinitionFeature"]], decls: 4, vars: 3, consts: [[3, "expanded", "expandedChange", 4, "ngIf"], [3, "expanded", "expandedChange"], [1, "list"], [3, "mode", 4, "ngIf"], ["mat-raised-button", "", "color", "primary", 3, "click"], [4, "ngIf"], ["noList", ""], [3, "mode"], [4, "ngIf", "ngIfElse"], [4, "ngFor", "ngForOf"]], template: function OutputBindingsStart_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " Output Bindings ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, OutputBindingsStart_mat_expansion_panel_2_Template, 15, 9, "mat-expansion-panel", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](3, "async");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](3, 1, ctx.model$));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__["MatExpansionPanel"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__["MatExpansionPanelHeader"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__["MatExpansionPanelTitle"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_6__["MatExpansionPanelDescription"], _angular_material_button__WEBPACK_IMPORTED_MODULE_7__["MatButton"], _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_8__["MatProgressBar"], _angular_material_list__WEBPACK_IMPORTED_MODULE_9__["MatList"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], _angular_material_list__WEBPACK_IMPORTED_MODULE_9__["MatListItem"], _angular_material_card__WEBPACK_IMPORTED_MODULE_10__["MatCard"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["AsyncPipe"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "zRP/":
/*!*******************************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/tutorials/basics/6-presenter-pattern/presenter-pattern.solutuion.component.ts ***!
  \*******************************************************************************************************************/
/*! exports provided: PresenterPatternSolution */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PresenterPatternSolution", function() { return PresenterPatternSolution; });
/* harmony import */ var _rx_angular_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rx-angular/state */ "YYsp");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _adapter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./adapter */ "K2NB");
/* harmony import */ var _presenter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./presenter */ "iV5q");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/expansion */ "7EHt");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");













function PresenterPatternSolution_mat_expansion_panel_2_span_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const m_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate2"]("", m_r1.list.length, " Repositories Updated every: ", m_r1.refreshInterval, " ms");
} }
function PresenterPatternSolution_mat_expansion_panel_2_span_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const m_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](m_r1.list.length);
} }
function PresenterPatternSolution_mat_expansion_panel_2_div_9_mat_list_item_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "mat-list-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", item_r10.name, " ");
} }
function PresenterPatternSolution_mat_expansion_panel_2_div_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "mat-list");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](2, PresenterPatternSolution_mat_expansion_panel_2_div_9_mat_list_item_2_Template, 2, 1, "mat-list-item", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const m_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", m_r1.list);
} }
function PresenterPatternSolution_mat_expansion_panel_2_ng_template_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "mat-card");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "No list given!");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} }
function PresenterPatternSolution_mat_expansion_panel_2_Template(rf, ctx) { if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "mat-expansion-panel", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("expandedChange", function PresenterPatternSolution_mat_expansion_panel_2_Template_mat_expansion_panel_expandedChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r13); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r12.ps.listExpandedChanges.next($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "mat-expansion-panel-header");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "mat-panel-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3, " User Name ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "mat-panel-description");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](5, PresenterPatternSolution_mat_expansion_panel_2_span_5_Template, 2, 2, "span", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](6, PresenterPatternSolution_mat_expansion_panel_2_span_6_Template, 2, 1, "span", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "button", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function PresenterPatternSolution_mat_expansion_panel_2_Template_button_click_7_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r13); const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r14.ps.refreshClicks.next($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](8, " Refresh List ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](9, PresenterPatternSolution_mat_expansion_panel_2_div_9_Template, 3, 1, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](10, PresenterPatternSolution_mat_expansion_panel_2_ng_template_10_Template, 2, 0, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const m_r1 = ctx.ngIf;
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("expanded", m_r1.listExpanded);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !m_r1.listExpanded);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", m_r1.listExpanded);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", m_r1.list.length)("ngIfElse", _r5);
} }
class PresenterPatternSolution extends _rx_angular_state__WEBPACK_IMPORTED_MODULE_0__["RxState"] {
    constructor(ps, ad) {
        super();
        this.ps = ps;
        this.ad = ad;
        this.ps.connect('list', this.ad.list$);
        this.hold(this.ps.refreshListTrigger$, this.ad.refresh);
    }
    set refreshInterval(refreshInterval$) {
        this.ps.connect('refreshInterval', refreshInterval$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(i => i > 100)));
    }
}
PresenterPatternSolution.ɵfac = function PresenterPatternSolution_Factory(t) { return new (t || PresenterPatternSolution)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_presenter__WEBPACK_IMPORTED_MODULE_4__["Presenter"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_adapter__WEBPACK_IMPORTED_MODULE_3__["Adapter"])); };
PresenterPatternSolution.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: PresenterPatternSolution, selectors: [["rxa-presenter-pattern-solution"]], inputs: { refreshInterval: "refreshInterval" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵProvidersFeature"]([_presenter__WEBPACK_IMPORTED_MODULE_4__["Presenter"], _adapter__WEBPACK_IMPORTED_MODULE_3__["Adapter"]]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵInheritDefinitionFeature"]], decls: 4, vars: 3, consts: [[3, "expanded", "expandedChange", 4, "ngIf"], [3, "expanded", "expandedChange"], [4, "ngIf"], ["mat-raised-button", "", "color", "primary", 3, "click"], [4, "ngIf", "ngIfElse"], ["noList", ""], [4, "ngFor", "ngForOf"]], template: function PresenterPatternSolution_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "Presenter Pattern");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](2, PresenterPatternSolution_mat_expansion_panel_2_Template, 12, 5, "mat-expansion-panel", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](3, "async");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](3, 1, ctx.ps.vm$));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_7__["MatExpansionPanel"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_7__["MatExpansionPanelHeader"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_7__["MatExpansionPanelTitle"], _angular_material_expansion__WEBPACK_IMPORTED_MODULE_7__["MatExpansionPanelDescription"], _angular_material_button__WEBPACK_IMPORTED_MODULE_8__["MatButton"], _angular_material_list__WEBPACK_IMPORTED_MODULE_9__["MatList"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgForOf"], _angular_material_list__WEBPACK_IMPORTED_MODULE_9__["MatListItem"], _angular_material_card__WEBPACK_IMPORTED_MODULE_10__["MatCard"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["AsyncPipe"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "zw3j":
/*!*****************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/tutorials/basics/data-access/list-resource/list.server.model.ts ***!
  \*****************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ })

}]);
//# sourceMappingURL=basics-tutorial-basics-module.js.map