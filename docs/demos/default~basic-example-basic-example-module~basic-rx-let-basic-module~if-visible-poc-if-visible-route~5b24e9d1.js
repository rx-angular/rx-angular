(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~basic-example-basic-example-module~basic-rx-let-basic-module~if-visible-poc-if-visible-route~5b24e9d1"],{

/***/ "AjVs":
/*!*****************************************************************************************!*\
  !*** ./apps/demos/src/app/shared/debug-helper/value-provider/array-provider.service.ts ***!
  \*****************************************************************************************/
/*! exports provided: ArrayProviderService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArrayProviderService", function() { return ArrayProviderService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _rx_angular_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @rx-angular/state */ "YYsp");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils */ "eXvN");






class ArrayProviderService extends _rx_angular_state__WEBPACK_IMPORTED_MODULE_1__["RxState"] {
    constructor(cdRef) {
        super();
        this.cdRef = cdRef;
        this.errorSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.error$ = this.errorSubject.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])((_) => {
            throw new Error('ERROR');
        }));
        this.completeSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.resetSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.addItemsImmutableSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.moveItemsImmutableSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.shuffleItemsImmutableSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.updateItemsImmutableSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.removeItemsImmutableSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.addItemsMutableSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.moveItemsMutableSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.updateItemsMutableSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.removeItemsMutableSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.resetAll = () => {
            this.resetObservables();
            this.cdRef.markForCheck();
        };
        this.resetObservables = () => {
            this.array$ = this.$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])((s) => s.array), Object(_utils__WEBPACK_IMPORTED_MODULE_4__["withCompleteAndError"])(this.error$, this.completeSubject));
        };
        this.connect('array', this.addItemsImmutableSubject, (state, numItems = 1) => Object(_utils__WEBPACK_IMPORTED_MODULE_4__["addItemImmutable"])((state === null || state === void 0 ? void 0 : state.array) || [], numItems));
        this.connect('array', this.updateItemsImmutableSubject, (state, num) => Object(_utils__WEBPACK_IMPORTED_MODULE_4__["updateItemImmutable"])((state === null || state === void 0 ? void 0 : state.array) || [], num));
        this.connect('array', this.moveItemsImmutableSubject, (state, positions) => Object(_utils__WEBPACK_IMPORTED_MODULE_4__["moveItemsImmutable"])((state === null || state === void 0 ? void 0 : state.array) || [], positions));
        this.connect('array', this.shuffleItemsImmutableSubject, (state) => Object(_utils__WEBPACK_IMPORTED_MODULE_4__["shuffleItemsImmutable"])((state === null || state === void 0 ? void 0 : state.array) || []));
        this.connect('array', this.removeItemsImmutableSubject, (state, num) => Object(_utils__WEBPACK_IMPORTED_MODULE_4__["removeItemsImmutable"])((state === null || state === void 0 ? void 0 : state.array) || [], num));
        this.connect('array', this.addItemsMutableSubject, (state, numItems = 1) => Object(_utils__WEBPACK_IMPORTED_MODULE_4__["addItemMutable"])((state === null || state === void 0 ? void 0 : state.array) || [], numItems));
        this.connect('array', this.updateItemsMutableSubject, (state, itemIds) => Object(_utils__WEBPACK_IMPORTED_MODULE_4__["updateItemMutable"])((state === null || state === void 0 ? void 0 : state.array) || [], itemIds));
        this.connect('array', this.moveItemsMutableSubject, (state, positions) => Object(_utils__WEBPACK_IMPORTED_MODULE_4__["moveItemMutable"])((state === null || state === void 0 ? void 0 : state.array) || [], positions));
        this.connect('array', this.removeItemsMutableSubject, (state, ids) => Object(_utils__WEBPACK_IMPORTED_MODULE_4__["removeItemsMutable"])((state === null || state === void 0 ? void 0 : state.array) || [], ids));
        this.resetAll();
    }
    addItemsImmutable(numItems) {
        this.addItemsImmutableSubject.next(numItems);
    }
    moveItemsImmutable(numPositions = 1) {
        this.moveItemsImmutableSubject.next(numPositions);
    }
    shuffleAttack() {
        Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["from"])([0, 1, 2]).subscribe(v => {
            this.shuffleItemsImmutable();
        });
    }
    shuffleItemsImmutable() {
        this.shuffleItemsImmutableSubject.next();
    }
    updateItemsImmutable(num) {
        this.updateItemsImmutableSubject.next(num);
    }
    removeItemsImmutable(numItems) {
        this.removeItemsImmutableSubject.next(numItems);
    }
    addItemsMutable(numItems) {
        this.addItemsMutableSubject.next(numItems);
    }
    moveItemsMutable(positions) {
        this.moveItemsMutableSubject.next(positions);
    }
    updateItemsMutable(itemsIds) {
        this.updateItemsMutableSubject.next(itemsIds);
    }
    removeItemsMutable(itemsIds) {
        this.removeItemsMutableSubject.next(itemsIds);
    }
    error() {
        this.errorSubject.next();
    }
    complete() {
        this.completeSubject.next();
    }
    reset() {
        this.resetSubject.next();
    }
}
ArrayProviderService.ɵfac = function ArrayProviderService_Factory(t) { return new (t || ArrayProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"])); };
ArrayProviderService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: ArrayProviderService, factory: ArrayProviderService.ɵfac });


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

/***/ "aUMF":
/*!*****************************************************************************************!*\
  !*** ./apps/demos/src/app/shared/debug-helper/value-provider/value-providers.module.ts ***!
  \*****************************************************************************************/
/*! exports provided: ValueProvidersModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValueProvidersModule", function() { return ValueProvidersModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _value_provider_value_provider_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./value-provider/value-provider.component */ "eHQV");
/* harmony import */ var _rx_angular_template__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @rx-angular/template */ "WFkj");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _array_provider_array_provider_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./array-provider/array-provider.component */ "vvYH");
/* harmony import */ var _zone_patched_icon_zone_patched_icon_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../zone-patched-icon/zone-patched-icon.module */ "xXlh");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ "fXoL");










class ValueProvidersModule {
}
ValueProvidersModule.ɵfac = function ValueProvidersModule_Factory(t) { return new (t || ValueProvidersModule)(); };
ValueProvidersModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineNgModule"]({ type: ValueProvidersModule });
ValueProvidersModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _rx_angular_template__WEBPACK_IMPORTED_MODULE_2__["UnpatchEventsModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButtonModule"],
            _zone_patched_icon_zone_patched_icon_module__WEBPACK_IMPORTED_MODULE_5__["ZonePatchedIconModule"],
            _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatFormFieldModule"],
            _angular_material_input__WEBPACK_IMPORTED_MODULE_7__["MatInputModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormsModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵsetNgModuleScope"](ValueProvidersModule, { declarations: [_value_provider_value_provider_component__WEBPACK_IMPORTED_MODULE_1__["ValueProviderComponent"], _array_provider_array_provider_component__WEBPACK_IMPORTED_MODULE_4__["ArrayProviderComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _rx_angular_template__WEBPACK_IMPORTED_MODULE_2__["UnpatchEventsModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButtonModule"],
        _zone_patched_icon_zone_patched_icon_module__WEBPACK_IMPORTED_MODULE_5__["ZonePatchedIconModule"],
        _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatFormFieldModule"],
        _angular_material_input__WEBPACK_IMPORTED_MODULE_7__["MatInputModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormsModule"]], exports: [_value_provider_value_provider_component__WEBPACK_IMPORTED_MODULE_1__["ValueProviderComponent"], _array_provider_array_provider_component__WEBPACK_IMPORTED_MODULE_4__["ArrayProviderComponent"]] }); })();


/***/ }),

/***/ "eHQV":
/*!**********************************************************************************************************!*\
  !*** ./apps/demos/src/app/shared/debug-helper/value-provider/value-provider/value-provider.component.ts ***!
  \**********************************************************************************************************/
/*! exports provided: ValueProviderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValueProviderComponent", function() { return ValueProviderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _rx_angular_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @rx-angular/state */ "YYsp");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _primitives_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../primitives-provider.service */ "pvtS");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _zone_patched_icon_zone_patched_icon_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../zone-patched-icon/zone-patched-icon.component */ "Lj2X");
/* harmony import */ var _libs_template_src_lib_experimental_unpatch_events_unpatch_events_experimental_directive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../../../../libs/template/src/lib/experimental/unpatch/events/unpatch-events.experimental.directive */ "QZMm");










function ValueProviderComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ValueProviderComponent_ng_container_0_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2); const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r1.reset(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, " Reset ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "rxa-zone-patched-icon", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "button", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ValueProviderComponent_ng_container_0_Template_button_click_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r3.next(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, " Next ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "rxa-zone-patched-icon", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "button", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ValueProviderComponent_ng_container_0_Template_button_click_7_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r4.error(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, " Error ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "rxa-zone-patched-icon", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "button", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ValueProviderComponent_ng_container_0_Template_button_click_10_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5.complete(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, " Complete ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "rxa-zone-patched-icon", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("unpatch", ctx_r0.unpatched);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("zoneState", ctx_r0.getZoneState());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("unpatch", ctx_r0.unpatched);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("zoneState", ctx_r0.getZoneState());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("unpatch", ctx_r0.unpatched);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("zoneState", ctx_r0.getZoneState());
} }
const _c0 = ["*"];
class ValueProviderComponent extends _primitives_provider_service__WEBPACK_IMPORTED_MODULE_3__["PrimitivesProviderService"] {
    constructor(state, cdRef) {
        super(state, cdRef);
        this.state = state;
        this.cdRef = cdRef;
        this.buttons = false;
        this.truthy = 0.5;
        this.min = 0;
        this.max = 10;
        this.resetState = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
    }
    set changes$(o$) {
        this.outerChanges.next(o$);
    }
    reset() {
        super.reset();
        this.resetState.next();
    }
    getZoneState() {
        var _a;
        return ((_a = this.unpatched) === null || _a === void 0 ? void 0 : _a.length) === 0 ? 'patched' : 'unpatched';
    }
}
ValueProviderComponent.ɵfac = function ValueProviderComponent_Factory(t) { return new (t || ValueProviderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_rx_angular_state__WEBPACK_IMPORTED_MODULE_1__["RxState"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"])); };
ValueProviderComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ValueProviderComponent, selectors: [["rxa-value-provider"]], inputs: { unpatched: "unpatched", buttons: "buttons", truthy: "truthy", min: "min", max: "max", changes$: "changes$" }, outputs: { resetState: "resetState" }, exportAs: ["rxaValueProvider"], features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]], ngContentSelectors: _c0, decls: 2, vars: 1, consts: [[4, "ngIf"], ["mat-raised-button", "", 3, "click"], ["zoneState", "patched", 1, "mat-icon"], ["mat-raised-button", "", 3, "unpatch", "click"], [1, "mat-icon", 3, "zoneState"]], template: function ValueProviderComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, ValueProviderComponent_ng_container_0_Template, 13, 6, "ng-container", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](1);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.buttons);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _angular_material_button__WEBPACK_IMPORTED_MODULE_5__["MatButton"], _zone_patched_icon_zone_patched_icon_component__WEBPACK_IMPORTED_MODULE_6__["ZonePatchedIconComponent"], _libs_template_src_lib_experimental_unpatch_events_unpatch_events_experimental_directive__WEBPACK_IMPORTED_MODULE_7__["UnpatchEventsDirective"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "pvtS":
/*!**********************************************************************************************!*\
  !*** ./apps/demos/src/app/shared/debug-helper/value-provider/primitives-provider.service.ts ***!
  \**********************************************************************************************/
/*! exports provided: PrimitivesProviderService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrimitivesProviderService", function() { return PrimitivesProviderService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _rx_angular_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @rx-angular/state */ "YYsp");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _utils_ngInputFlatten__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/ngInputFlatten */ "xLX+");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils */ "eXvN");








class PrimitivesProviderService {
    constructor(state, cdRef) {
        this.state = state;
        this.cdRef = cdRef;
        this.outerChanges = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.nextSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.errorSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.error$ = this.errorSubject.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])((_) => {
            throw new Error('ERROR');
        }));
        this.completeSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.resetSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.truthy = 0.5;
        this.min = 0;
        this.max = 10;
        this.resetAll = () => {
            this.resetObservables();
            this.updateStatic(undefined);
            this.cdRef.markForCheck();
        };
        this.resetObservables = () => {
            this.state.ngOnDestroy();
            this.state = new _rx_angular_state__WEBPACK_IMPORTED_MODULE_1__["RxState"]();
            this.state.connect('random', Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["merge"])(this.nextSubject, this.outerChanges.pipe(Object(_utils_ngInputFlatten__WEBPACK_IMPORTED_MODULE_4__["ngInputFlatten"])())).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(_utils__WEBPACK_IMPORTED_MODULE_5__["toRandom"])));
            this.float$ = this.state.select('random');
            this.int$ = this.state.select(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])((s) => Object(_utils__WEBPACK_IMPORTED_MODULE_5__["toInt"])(s.random, this.min, this.max)), Object(_utils__WEBPACK_IMPORTED_MODULE_5__["withCompleteAndError"])(this.error$, this.completeSubject));
            this.incremental$ = this.state.select(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["scan"])((inc) => ++inc, 0), Object(_utils__WEBPACK_IMPORTED_MODULE_5__["withCompleteAndError"])(this.error$, this.completeSubject));
            this.boolean$ = this.state.select(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])((s) => Object(_utils__WEBPACK_IMPORTED_MODULE_5__["toBoolean"])(s.random, this.truthy)), Object(_utils__WEBPACK_IMPORTED_MODULE_5__["withCompleteAndError"])(this.error$, this.completeSubject));
            this.imgUrl$ = this.state.select(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])((s) => Object(_utils__WEBPACK_IMPORTED_MODULE_5__["toImgUrl"])(s.random)), Object(_utils__WEBPACK_IMPORTED_MODULE_5__["withCompleteAndError"])(this.error$, this.completeSubject));
            this.state.hold(this.float$, this.updateStatic);
            this.state.hold(this.resetSubject, this.resetAll);
        };
        this.updateStatic = (float) => {
            this.float = float;
            this.int = Object(_utils__WEBPACK_IMPORTED_MODULE_5__["toInt"])(float, this.min, this.max);
            this.boolean = Object(_utils__WEBPACK_IMPORTED_MODULE_5__["toBoolean"])(float, this.truthy);
        };
        this.resetAll();
    }
    set changes$(o$) {
        this.outerChanges.next(o$);
    }
    next() {
        this.nextSubject.next();
    }
    error() {
        this.errorSubject.next();
    }
    complete() {
        this.completeSubject.next();
    }
    reset() {
        this.resetSubject.next();
    }
}
PrimitivesProviderService.ɵfac = function PrimitivesProviderService_Factory(t) { return new (t || PrimitivesProviderService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_rx_angular_state__WEBPACK_IMPORTED_MODULE_1__["RxState"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"])); };
PrimitivesProviderService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: PrimitivesProviderService, factory: PrimitivesProviderService.ɵfac });


/***/ }),

/***/ "vvYH":
/*!**********************************************************************************************************!*\
  !*** ./apps/demos/src/app/shared/debug-helper/value-provider/array-provider/array-provider.component.ts ***!
  \**********************************************************************************************************/
/*! exports provided: ArrayProviderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArrayProviderComponent", function() { return ArrayProviderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _array_provider_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../array-provider.service */ "AjVs");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _libs_template_src_lib_experimental_unpatch_events_unpatch_events_experimental_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../../../libs/template/src/lib/experimental/unpatch/events/unpatch-events.experimental.directive */ "QZMm");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "3Pt+");









function ArrayProviderComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Immutable Operations");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "button", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ArrayProviderComponent_ng_container_0_Template_button_click_5_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2); const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r1.addItemsImmutable(1); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, " Add ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "button", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ArrayProviderComponent_ng_container_0_Template_button_click_7_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r3.moveItemsImmutable(1); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, " Move ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "button", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ArrayProviderComponent_ng_container_0_Template_button_click_9_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r4.updateItemsImmutable(1); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, " Update ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "button", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ArrayProviderComponent_ng_container_0_Template_button_click_11_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5.removeItemsImmutable(1); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, " Remove ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "button", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ArrayProviderComponent_ng_container_0_Template_button_click_14_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r6.addItemsImmutable(ctx_r6.numberOfItems); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, " Add Many ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "button", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ArrayProviderComponent_ng_container_0_Template_button_click_16_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r7.moveItemsImmutable(ctx_r7.numberOfItems / 2); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, " Move Many ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "button", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ArrayProviderComponent_ng_container_0_Template_button_click_18_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r8.shuffleItemsImmutable(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, " Shuffle ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "button", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ArrayProviderComponent_ng_container_0_Template_button_click_20_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r9.shuffleAttack(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, " Shuffle Attack ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "button", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ArrayProviderComponent_ng_container_0_Template_button_click_22_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r10.updateItemsImmutable(ctx_r10.numberOfItems / 2); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, " Update Many ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "button", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ArrayProviderComponent_ng_container_0_Template_button_click_24_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r11.removeItemsImmutable(ctx_r11.numberOfItems / 2); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, " Remove Many ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "mat-form-field");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "Number of items");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "input", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ArrayProviderComponent_ng_container_0_Template_input_ngModelChange_29_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r12.numberOfItems = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("unpatch", ctx_r0.unpatched);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("unpatch", ctx_r0.unpatched);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("unpatch", ctx_r0.unpatched);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("unpatch", ctx_r0.unpatched);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("unpatch", ctx_r0.unpatched);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("unpatch", ctx_r0.unpatched);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("unpatch", ctx_r0.unpatched);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("unpatch", ctx_r0.unpatched);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("unpatch", ctx_r0.unpatched);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("unpatch", ctx_r0.unpatched);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r0.numberOfItems);
} }
const _c0 = ["*"];
class ArrayProviderComponent extends _array_provider_service__WEBPACK_IMPORTED_MODULE_1__["ArrayProviderService"] {
    constructor(cdRef) {
        super(cdRef);
        this.cdRef = cdRef;
        this.numberOfItems = 10;
        this.buttons = false;
        this.unpatched = undefined;
        this.min = 0;
        this.max = 1000;
    }
}
ArrayProviderComponent.ɵfac = function ArrayProviderComponent_Factory(t) { return new (t || ArrayProviderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"])); };
ArrayProviderComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ArrayProviderComponent, selectors: [["rxa-array-provider"]], inputs: { buttons: "buttons", unpatched: "unpatched", min: "min", max: "max" }, exportAs: ["rxaArrayProvider"], features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]], ngContentSelectors: _c0, decls: 2, vars: 1, consts: [[4, "ngIf"], [1, "row"], [1, "col"], ["mat-raised-button", "", 3, "unpatch", "click"], ["matInput", "", "type", "number", 3, "ngModel", "ngModelChange"]], template: function ArrayProviderComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, ArrayProviderComponent_ng_container_0_Template, 30, 11, "ng-container", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](1);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.buttons);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButton"], _libs_template_src_lib_experimental_unpatch_events_unpatch_events_experimental_directive__WEBPACK_IMPORTED_MODULE_4__["UnpatchEventsDirective"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatFormField"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatLabel"], _angular_material_input__WEBPACK_IMPORTED_MODULE_6__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NumberValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgModel"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "xLX+":
/*!***********************************************************!*\
  !*** ./apps/demos/src/app/shared/utils/ngInputFlatten.ts ***!
  \***********************************************************/
/*! exports provided: ngInputFlatten */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ngInputFlatten", function() { return ngInputFlatten; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");


function ngInputFlatten() {
    return o$ => o$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(o => Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["isObservable"])(o) ? o : Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(o)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["switchAll"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["distinctUntilChanged"])());
}


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


/***/ })

}]);
//# sourceMappingURL=default~basic-example-basic-example-module~basic-rx-let-basic-module~if-visible-poc-if-visible-route~5b24e9d1.js.map