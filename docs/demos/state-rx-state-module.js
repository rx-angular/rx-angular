(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["state-rx-state-module"],{

/***/ "8Yiz":
/*!***************************************************************************************!*\
  !*** ./apps/demos/src/app/features/experiments/state/composition/parent.component.ts ***!
  \***************************************************************************************/
/*! exports provided: RxStateParentCompositionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RxStateParentCompositionComponent", function() { return RxStateParentCompositionComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _source_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./source.service */ "LwKf");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");







function RxStateParentCompositionComponent_div_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" numberOfEmissions", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](2, 1, ctx_r0.composition1$), " ");
} }
class RxStateParentCompositionComponent {
    constructor(source) {
        this.source = source;
        this.subscription = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subscription"]();
        this.visible = false;
        this.composition1$ = this.source.$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["scan"])((numOfEmissions) => ++numOfEmissions, 0), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["shareReplay"])(1));
        // this.hotComposition1$ = this.composition1$.pipe(publishReplay(1)) as ConnectableObservable<any>
        // this.subscription =  this.hotComposition1$.connect();
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
RxStateParentCompositionComponent.ɵfac = function RxStateParentCompositionComponent_Factory(t) { return new (t || RxStateParentCompositionComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_source_service__WEBPACK_IMPORTED_MODULE_2__["SourceService"])); };
RxStateParentCompositionComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: RxStateParentCompositionComponent, selectors: [["rxa-state-parent-composition"]], decls: 7, vars: 2, consts: [["type", "checkbox", 3, "ngModel", "ngModelChange"], ["class", "case-content", 4, "ngIf"], [1, "case-content"]], template: function RxStateParentCompositionComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Composition Handling");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "Visible:");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "input", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function RxStateParentCompositionComponent_Template_input_ngModelChange_4_listener($event) { return ctx.visible = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](5, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](6, RxStateParentCompositionComponent_div_6_Template, 3, 3, "div", 1);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.visible);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.visible);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["CheckboxControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgModel"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["AsyncPipe"]], encapsulation: 2 });


/***/ }),

/***/ "8yOX":
/*!**************************************************************************************!*\
  !*** ./apps/demos/src/app/features/experiments/state/selections/parent.component.ts ***!
  \**************************************************************************************/
/*! exports provided: RxStateParentSelectionsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RxStateParentSelectionsComponent", function() { return RxStateParentSelectionsComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _child_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./child.component */ "SURr");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");




class RxStateParentSelectionsComponent {
    constructor() {
        this.values$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.formGroupModel$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])({
            name: '',
            age: 0
        });
    }
}
RxStateParentSelectionsComponent.ɵfac = function RxStateParentSelectionsComponent_Factory(t) { return new (t || RxStateParentSelectionsComponent)(); };
RxStateParentSelectionsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: RxStateParentSelectionsComponent, selectors: [["rxa-state-parent-selections"]], decls: 9, vars: 8, consts: [[1, "case-content"], [3, "formGroupModel", "formValueChange"]], template: function RxStateParentSelectionsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Selection Handling");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "pre");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](5, "json");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](6, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "rxa-state-child-selections", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("formValueChange", function RxStateParentSelectionsComponent_Template_rxa_state_child_selections_formValueChange_7_listener($event) { return ctx.values$.next($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](8, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](5, 2, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](6, 4, ctx.values$)));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroupModel", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](8, 6, ctx.formGroupModel$));
    } }, directives: [_child_component__WEBPACK_IMPORTED_MODULE_2__["RxStateChildSelectionsComponent"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["JsonPipe"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["AsyncPipe"]], encapsulation: 2 });


/***/ }),

/***/ "Bo//":
/*!********************************************************************************************!*\
  !*** ./apps/demos/src/app/features/experiments/state/subscription/subscription.service.ts ***!
  \********************************************************************************************/
/*! exports provided: SubscriptionHandlingService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubscriptionHandlingService", function() { return SubscriptionHandlingService; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");



class SubscriptionHandlingService {
    constructor() {
        this.subscription = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subscription"]();
        this.processes$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.subscription.add(this.processes$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["mergeAll"])()).subscribe());
    }
    hold(o$) {
        this.processes$.next(o$);
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
SubscriptionHandlingService.ɵfac = function SubscriptionHandlingService_Factory(t) { return new (t || SubscriptionHandlingService)(); };
SubscriptionHandlingService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: SubscriptionHandlingService, factory: SubscriptionHandlingService.ɵfac });


/***/ }),

/***/ "FgvK":
/*!**************************************************************************************!*\
  !*** ./apps/demos/src/app/features/experiments/state/rx-state.overview.component.ts ***!
  \**************************************************************************************/
/*! exports provided: RxStateOverviewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RxStateOverviewComponent", function() { return RxStateOverviewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class RxStateOverviewComponent {
}
RxStateOverviewComponent.ɵfac = function RxStateOverviewComponent_Factory(t) { return new (t || RxStateOverviewComponent)(); };
RxStateOverviewComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: RxStateOverviewComponent, selectors: [["rxa-push-overview"]], decls: 3, vars: 0, consts: [[1, "push-cases"]], template: function RxStateOverviewComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "ChangeDetection Overview");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "div", 0);
    } }, styles: [".push-cases[_ngcontent-%COMP%] {\n        display: flex;\n        flex-wrap: wrap;\n      }\n\n      .item[_ngcontent-%COMP%] {\n        width: 50%;\n      }"] });


/***/ }),

/***/ "LwKf":
/*!*************************************************************************************!*\
  !*** ./apps/demos/src/app/features/experiments/state/composition/source.service.ts ***!
  \*************************************************************************************/
/*! exports provided: SourceService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SourceService", function() { return SourceService; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class SourceService {
    constructor() {
        this.values = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.$ = this.values.asObservable();
        Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["timer"])(0, 1000).subscribe((n) => {
            console.log('change');
            this.values.next(n);
        });
    }
}
SourceService.ɵfac = function SourceService_Factory(t) { return new (t || SourceService)(); };
SourceService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: SourceService, factory: SourceService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "SURr":
/*!*************************************************************************************!*\
  !*** ./apps/demos/src/app/features/experiments/state/selections/child.component.ts ***!
  \*************************************************************************************/
/*! exports provided: RxStateChildSelectionsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RxStateChildSelectionsComponent", function() { return RxStateChildSelectionsComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/input */ "qFsG");








function RxStateChildSelectionsComponent_form_1_mat_form_field_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-form-field");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "input", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const c_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](c_r3.key);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("formControlName", c_r3.key);
} }
function RxStateChildSelectionsComponent_form_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "form", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, RxStateChildSelectionsComponent_form_1_mat_form_field_1_Template, 4, 2, "mat-form-field", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "keyvalue");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const formGroup_r1 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("formGroup", formGroup_r1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](2, 2, formGroup_r1.controls));
} }
class RxStateChildSelectionsComponent {
    constructor(fb) {
        this.fb = fb;
        this.state$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["ReplaySubject"](1);
        this.formGroup$ = this.state$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["startWith"])({}), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((input) => this.getFormGroupFromConfig(input)));
        this.formValueChange = this.formGroup$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])((fg) => fg.valueChanges));
    }
    set formGroupModel(modelFromInput) {
        if (modelFromInput) {
            this.state$.next(modelFromInput);
        }
    }
    select(o$) {
        return o$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["shareReplay"])(1));
    }
    getFormGroupFromConfig(modelFromInput) {
        const config = Object.entries(modelFromInput).reduce((c, [name, initialValue]) => (Object.assign(Object.assign({}, c), { [name]: [initialValue] })), {});
        return this.fb.group(config);
    }
}
RxStateChildSelectionsComponent.ɵfac = function RxStateChildSelectionsComponent_Factory(t) { return new (t || RxStateChildSelectionsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"])); };
RxStateChildSelectionsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: RxStateChildSelectionsComponent, selectors: [["rxa-state-child-selections"]], inputs: { formGroupModel: "formGroupModel" }, outputs: { formValueChange: "formValueChange" }, decls: 3, vars: 3, consts: [[1, "case-content"], [3, "formGroup", 4, "ngIf"], [3, "formGroup"], [4, "ngFor", "ngForOf"], ["matInput", "", 3, "formControlName"]], template: function RxStateChildSelectionsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, RxStateChildSelectionsComponent_form_1_Template, 3, 4, "form", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](2, 1, ctx.formGroup$));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroupDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatFormField"], _angular_material_input__WEBPACK_IMPORTED_MODULE_6__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControlName"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["AsyncPipe"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["KeyValuePipe"]], encapsulation: 2 });


/***/ }),

/***/ "TPt9":
/*!****************************************************************************************!*\
  !*** ./apps/demos/src/app/features/experiments/state/subscription/parent.component.ts ***!
  \****************************************************************************************/
/*! exports provided: RxStateParentSubscriptionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RxStateParentSubscriptionComponent", function() { return RxStateParentSubscriptionComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _source_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./source.service */ "gFkR");
/* harmony import */ var _subscription_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./subscription.service */ "Bo//");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");







class RxStateParentSubscriptionComponent {
    constructor(source, subs) {
        this.source = source;
        this.subs = subs;
        this.subscription = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subscription"]();
        this.onDestroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.process1$ = this.source.$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])((num) => {
            console.log('New value: ', num);
        }));
        this.process1$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["takeUntil"])(this.onDestroy$)).subscribe();
    }
    ngOnDestroy() {
        this.onDestroy$.next();
    }
}
RxStateParentSubscriptionComponent.ɵfac = function RxStateParentSubscriptionComponent_Factory(t) { return new (t || RxStateParentSubscriptionComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_source_service__WEBPACK_IMPORTED_MODULE_2__["SourceService"]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_subscription_service__WEBPACK_IMPORTED_MODULE_3__["SubscriptionHandlingService"])); };
RxStateParentSubscriptionComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: RxStateParentSubscriptionComponent, selectors: [["rxa-state-parent-subscription"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵProvidersFeature"]([_subscription_service__WEBPACK_IMPORTED_MODULE_3__["SubscriptionHandlingService"]])], decls: 4, vars: 0, consts: [[1, "case-content"]], template: function RxStateParentSubscriptionComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Subscription Handling");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, "Process running internally");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    } }, encapsulation: 2 });


/***/ }),

/***/ "cDpE":
/*!**************************************************************************!*\
  !*** ./apps/demos/src/app/features/experiments/state/rx-state.module.ts ***!
  \**************************************************************************/
/*! exports provided: RxStateModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RxStateModule", function() { return RxStateModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/checkbox */ "bSwM");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/select */ "d3UM");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/table */ "+0xr");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/toolbar */ "/t3+");
/* harmony import */ var _rx_angular_template__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @rx-angular/template */ "WFkj");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _rx_state_routes__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./rx-state.routes */ "kmIr");
/* harmony import */ var _rx_state_overview_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./rx-state.overview.component */ "FgvK");
/* harmony import */ var _composition_parent_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./composition/parent.component */ "8Yiz");
/* harmony import */ var _subscription_parent_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./subscription/parent.component */ "TPt9");
/* harmony import */ var _selections_parent_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./selections/parent.component */ "8yOX");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _selections_child_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./selections/child.component */ "SURr");
/* harmony import */ var _subscription_less_interaction_parent_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./subscription-less-interaction/parent.component */ "qpNa");
/* harmony import */ var _selectslice_select_slice_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./selectslice/select-slice.component */ "eSus");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/core */ "fXoL");























class RxStateModule {
}
RxStateModule.ɵfac = function RxStateModule_Factory(t) { return new (t || RxStateModule)(); };
RxStateModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdefineNgModule"]({ type: RxStateModule });
RxStateModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_11__["RouterModule"].forChild(_rx_state_routes__WEBPACK_IMPORTED_MODULE_12__["ROUTES"]),
            _angular_material_list__WEBPACK_IMPORTED_MODULE_6__["MatListModule"],
            _angular_material_table__WEBPACK_IMPORTED_MODULE_8__["MatTableModule"],
            _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_2__["MatCheckboxModule"],
            _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_9__["MatToolbarModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_1__["MatButtonModule"],
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__["MatIconModule"],
            _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__["MatFormFieldModule"],
            _angular_material_input__WEBPACK_IMPORTED_MODULE_5__["MatInputModule"],
            _angular_material_select__WEBPACK_IMPORTED_MODULE_7__["MatSelectModule"],
            _rx_angular_template__WEBPACK_IMPORTED_MODULE_10__["LetModule"], _rx_angular_template__WEBPACK_IMPORTED_MODULE_10__["PushModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_17__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_17__["ReactiveFormsModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵsetNgModuleScope"](RxStateModule, { declarations: [_rx_state_overview_component__WEBPACK_IMPORTED_MODULE_13__["RxStateOverviewComponent"],
        _selections_child_component__WEBPACK_IMPORTED_MODULE_18__["RxStateChildSelectionsComponent"],
        _composition_parent_component__WEBPACK_IMPORTED_MODULE_14__["RxStateParentCompositionComponent"],
        _selections_parent_component__WEBPACK_IMPORTED_MODULE_16__["RxStateParentSelectionsComponent"],
        _subscription_parent_component__WEBPACK_IMPORTED_MODULE_15__["RxStateParentSubscriptionComponent"],
        _subscription_less_interaction_parent_component__WEBPACK_IMPORTED_MODULE_19__["RxStateParentSubscriptionLessComponent"],
        _selectslice_select_slice_component__WEBPACK_IMPORTED_MODULE_20__["RxStateSelectSliceComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_11__["RouterModule"], _angular_material_list__WEBPACK_IMPORTED_MODULE_6__["MatListModule"],
        _angular_material_table__WEBPACK_IMPORTED_MODULE_8__["MatTableModule"],
        _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_2__["MatCheckboxModule"],
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_9__["MatToolbarModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_1__["MatButtonModule"],
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__["MatIconModule"],
        _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__["MatFormFieldModule"],
        _angular_material_input__WEBPACK_IMPORTED_MODULE_5__["MatInputModule"],
        _angular_material_select__WEBPACK_IMPORTED_MODULE_7__["MatSelectModule"],
        _rx_angular_template__WEBPACK_IMPORTED_MODULE_10__["LetModule"], _rx_angular_template__WEBPACK_IMPORTED_MODULE_10__["PushModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_17__["FormsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_17__["ReactiveFormsModule"]] }); })();


/***/ }),

/***/ "eSus":
/*!*********************************************************************************************!*\
  !*** ./apps/demos/src/app/features/experiments/state/selectslice/select-slice.component.ts ***!
  \*********************************************************************************************/
/*! exports provided: RxStateSelectSliceComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RxStateSelectSliceComponent", function() { return RxStateSelectSliceComponent; });
/* harmony import */ var _rx_angular_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rx-angular/state */ "YYsp");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");





class RxStateSelectSliceComponent extends _rx_angular_state__WEBPACK_IMPORTED_MODULE_0__["RxState"] {
    constructor() {
        super();
        this.viewState$ = this.select(Object(_rx_angular_state__WEBPACK_IMPORTED_MODULE_0__["selectSlice"])(['list', 'isItemRendered']), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(({ isItemRendered, list }) => !isItemRendered && list.length > 0));
        const state$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])({ title: 'myTitle', list: ['foo', 'bar'], isItemRendered: true }, { title: 'myTitle', list: ['foo', 'bar'], isItemRendered: false }, { title: 'nextTitle', list: ['foo', 'baR'], isItemRendered: true }, { title: 'nextTitle', list: ['fooRz', 'boo'], isItemRendered: false });
        this.connect(state$);
    }
}
RxStateSelectSliceComponent.ɵfac = function RxStateSelectSliceComponent_Factory(t) { return new (t || RxStateSelectSliceComponent)(); };
RxStateSelectSliceComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: RxStateSelectSliceComponent, selectors: [["rxa-select-slice"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵInheritDefinitionFeature"]], decls: 4, vars: 5, template: function RxStateSelectSliceComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "json");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](3, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](2, 1, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](3, 3, ctx.viewState$)));
    } }, pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["JsonPipe"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["AsyncPipe"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzZWxlY3Qtc2xpY2UuY29tcG9uZW50LmNzcyJ9 */"], changeDetection: 0 });


/***/ }),

/***/ "gFkR":
/*!**************************************************************************************!*\
  !*** ./apps/demos/src/app/features/experiments/state/subscription/source.service.ts ***!
  \**************************************************************************************/
/*! exports provided: SourceService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SourceService", function() { return SourceService; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class SourceService {
    constructor() {
        this.$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["timer"])(0, 1000);
    }
}
SourceService.ɵfac = function SourceService_Factory(t) { return new (t || SourceService)(); };
SourceService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: SourceService, factory: SourceService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "kmIr":
/*!**************************************************************************!*\
  !*** ./apps/demos/src/app/features/experiments/state/rx-state.routes.ts ***!
  \**************************************************************************/
/*! exports provided: ROUTES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROUTES", function() { return ROUTES; });
/* harmony import */ var _rx_state_overview_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rx-state.overview.component */ "FgvK");
/* harmony import */ var _selectslice_select_slice_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./selectslice/select-slice.component */ "eSus");
/* harmony import */ var _subscription_parent_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./subscription/parent.component */ "TPt9");
/* harmony import */ var _selections_parent_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./selections/parent.component */ "8yOX");
/* harmony import */ var _composition_parent_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./composition/parent.component */ "8Yiz");
/* harmony import */ var _subscription_less_interaction_parent_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./subscription-less-interaction/parent.component */ "qpNa");






const ROUTES = [
    {
        path: 'rx-base-state',
        component: _rx_state_overview_component__WEBPACK_IMPORTED_MODULE_0__["RxStateOverviewComponent"],
    },
    {
        path: 'subscription',
        component: _subscription_parent_component__WEBPACK_IMPORTED_MODULE_2__["RxStateParentSubscriptionComponent"],
    },
    {
        path: 'composition',
        component: _composition_parent_component__WEBPACK_IMPORTED_MODULE_4__["RxStateParentCompositionComponent"],
    },
    {
        path: 'selections',
        component: _selections_parent_component__WEBPACK_IMPORTED_MODULE_3__["RxStateParentSelectionsComponent"],
    },
    {
        path: 'connect',
        component: _subscription_less_interaction_parent_component__WEBPACK_IMPORTED_MODULE_5__["RxStateParentSubscriptionLessComponent"],
    },
    {
        path: 'selectslice',
        component: _selectslice_select_slice_component__WEBPACK_IMPORTED_MODULE_1__["RxStateSelectSliceComponent"],
    },
];


/***/ }),

/***/ "nfZe":
/*!*******************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/experiments/state/subscription-less-interaction/source.service.ts ***!
  \*******************************************************************************************************/
/*! exports provided: SourceService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SourceService", function() { return SourceService; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class SourceService {
    constructor() {
        this.values = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.$ = this.values.asObservable();
        Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["timer"])(0, 1000).subscribe((n) => {
            console.log('change');
            this.values.next(n);
        });
    }
}
SourceService.ɵfac = function SourceService_Factory(t) { return new (t || SourceService)(); };
SourceService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: SourceService, factory: SourceService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "qpNa":
/*!*********************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/experiments/state/subscription-less-interaction/parent.component.ts ***!
  \*********************************************************************************************************/
/*! exports provided: RxStateParentSubscriptionLessComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RxStateParentSubscriptionLessComponent", function() { return RxStateParentSubscriptionLessComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _source_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./source.service */ "nfZe");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");






class RxStateParentSubscriptionLessComponent {
    constructor(source) {
        this.source = source;
        this.subscription = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subscription"]();
        this.stateSources$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.state$ = this.stateSources$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["scan"])((state, slices) => (Object.assign(Object.assign({}, state), slices)), {}));
        this.source1$ = this.source.$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((v) => ({ value: v })));
        this.subscription = this.source1$.subscribe((v) => {
            this.stateSources$.next(v);
        });
    }
    /*
      (this.state$ as any).connect();
      this.stateSources$.next(this.source1$.pipe(tap(console.log)));
  
     state$ = this.stateSources$.pipe(
      map(o => isObservable(o) ? o : of(o)),
      mergeAll(),
      scan((state: ComponentState, slices: Partial<ComponentState>) => ({...state, ...slices}), {}),
      publishReplay(1)
    );
    */
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
RxStateParentSubscriptionLessComponent.ɵfac = function RxStateParentSubscriptionLessComponent_Factory(t) { return new (t || RxStateParentSubscriptionLessComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_source_service__WEBPACK_IMPORTED_MODULE_2__["SourceService"])); };
RxStateParentSubscriptionLessComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: RxStateParentSubscriptionLessComponent, selectors: [["rxa-state-parent-subscription-less-interaction"]], decls: 8, vars: 5, consts: [[1, "case-content"]], template: function RxStateParentSubscriptionLessComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Subscription Less interaction");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, " state: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "pre");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](6, "json");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](7, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](6, 1, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](7, 3, ctx.state$)));
    } }, pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["JsonPipe"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["AsyncPipe"]], encapsulation: 2 });


/***/ })

}]);
//# sourceMappingURL=state-rx-state-module.js.map