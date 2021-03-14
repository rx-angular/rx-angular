(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~basic-example-basic-example-module~basic-rx-let-basic-module~if-visible-poc-if-visible-route~593beff9"],{

/***/ "4HpG":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs/node_modules/tslib/tslib.es6.js ***!
  \***********************************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __createBinding, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__createBinding", function() { return __createBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}

function __exportStar(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}


/***/ }),

/***/ "eXvN":
/*!************************************************************************!*\
  !*** ./apps/demos/src/app/shared/debug-helper/value-provider/utils.ts ***!
  \************************************************************************/
/*! exports provided: compareIdFn, withCompleteAndError, toTick, toInt, toRandom, toBoolean, toImgUrl, toRandomItems, toNewItems, getRandomItems, getRandomRecords, getItems, updateItemMutable, updateItemImmutable, addItemMutable, addItemImmutable, moveItemMutable, moveItemImmutable, moveItemsImmutable, shuffleItemsImmutable, removeItemsMutable, removeItemsImmutable, GliphyApi, placeholderImg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compareIdFn", function() { return compareIdFn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withCompleteAndError", function() { return withCompleteAndError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toTick", function() { return toTick; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toInt", function() { return toInt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toRandom", function() { return toRandom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toBoolean", function() { return toBoolean; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toImgUrl", function() { return toImgUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toRandomItems", function() { return toRandomItems; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toNewItems", function() { return toNewItems; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomItems", function() { return getRandomItems; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomRecords", function() { return getRandomRecords; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getItems", function() { return getItems; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateItemMutable", function() { return updateItemMutable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateItemImmutable", function() { return updateItemImmutable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addItemMutable", function() { return addItemMutable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addItemImmutable", function() { return addItemImmutable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "moveItemMutable", function() { return moveItemMutable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "moveItemImmutable", function() { return moveItemImmutable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "moveItemsImmutable", function() { return moveItemsImmutable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shuffleItemsImmutable", function() { return shuffleItemsImmutable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeItemsMutable", function() { return removeItemsMutable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeItemsImmutable", function() { return removeItemsImmutable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GliphyApi", function() { return GliphyApi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "placeholderImg", function() { return placeholderImg; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var rxjs_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/fetch */ "p4Ve");



function compareIdFn(a, b) {
    return a.id === b.id;
}
const theMax = 10000;
function withCompleteAndError(error$, complete$) {
    return (o) => o.pipe(
    /* tslint:disable */
    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["merge"])(error$), 
    /* tslint:enable */
    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["takeUntil"])(complete$));
}
function toTick(scheduleConfig) {
    if (!scheduleConfig) {
        return rxjs__WEBPACK_IMPORTED_MODULE_0__["EMPTY"];
    }
    else {
        const timerConfig = Array.isArray(scheduleConfig.tickSpeed) ? {
            dueTime: scheduleConfig.tickSpeed[0],
            period: scheduleConfig.tickSpeed[1]
        } : { dueTime: 0, period: scheduleConfig.tickSpeed };
        console.log('timerConfig', timerConfig);
        const stop$ = scheduleConfig.duration
            ? Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["timer"])(scheduleConfig.duration)
            : rxjs__WEBPACK_IMPORTED_MODULE_0__["EMPTY"];
        if (scheduleConfig.scheduler) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["timer"])(timerConfig.dueTime, timerConfig.period).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["take"])(scheduleConfig.numEmissions), 
            // switchMap(t => priorityTickMap[scheduleConfig.scheduler]),
            Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["takeUntil"])(stop$));
        }
        throw new Error('Wrong scheduler config');
    }
}
function toInt(float = toRandom(), min = 0, max = theMax) {
    // tslint:disable-next-line:no-bitwise
    return ~~(min + float * (max + 1 - min));
}
function toRandom() {
    return Math.random();
}
function toBoolean(float, truthy = 0.5) {
    return float !== undefined ? float < truthy : undefined;
}
function toImgUrl(float) {
    return 'https://media0.giphy.com/media/oeGgcmHVHLVCg/200_d.gif';
}
function toRandomItems(ids) {
    const _ids = [...ids];
    return new Array(ids.length).fill(0).map((v) => ({ id: _ids.pop(), value: toRandom() }));
}
function toNewItems(arr = [], numItems, maxId = theMax) {
    const ids = arr.map(i => i.id);
    const newItems = [];
    if (arr.length >= maxId) {
        return newItems;
    }
    // arr.length <= maxId to avoid infinite loops if no new item can be found
    while (newItems.length < numItems) {
        const id = toInt(undefined, 0, maxId);
        if (!ids.includes(id) && !newItems.map(i => i.id).includes(id)) {
            newItems.push(toRandomItems([id])[0]);
        }
    }
    return newItems;
}
function getRandomItems(arr = [], numItems, exclude) {
    const result = new Array(numItems);
    let len = arr.length;
    const taken = new Array(len);
    if (numItems > len) {
        numItems = len - 1;
    }
    while (numItems--) {
        const x = Math.floor(Math.random() * len);
        const i = arr[x in taken ? taken[x] : x];
        if (exclude && exclude(i)) {
            numItems++;
            continue;
        }
        result[numItems] = i;
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}
function getRandomRecords(arr = [], numItems) {
    numItems = Math.abs(Math.max(numItems, arr.length - 1));
    const randomItems = new Map();
    while (randomItems.size < numItems) {
        randomItems.set(numItems, arr[toInt(0, arr.length - 1)]);
    }
    return randomItems;
}
function getItems(arr = [], itemIds) {
    return arr.filter(i => itemIds.includes(i.id));
}
function updateItemMutable(arr = [], itemIds) {
    if (!arr.length) {
        return arr;
    }
    itemIds = itemIds || getRandomItems(arr, 1).map(i => i.id);
    getItems(arr, itemIds).forEach(i => arr.find(ii => i.id === ii.id).value = toRandom());
    return arr;
}
function updateItemImmutable(arr = [], num) {
    const itemIds = getRandomItems(arr, num).map(i => i.id);
    return [...updateItemMutable(arr, itemIds).map(i => itemIds.find(id => id + '' === i.id + '') ? Object.assign({}, i) : i)];
}
function addItemMutable(arr = [], numItems) {
    toNewItems(arr, numItems).forEach(i => arr.push(i));
    return arr;
}
function addItemImmutable(arr = [], numItems) {
    return [...addItemMutable(arr, numItems)];
}
function moveItemMutable(arr = [], num) {
    if (!arr.length) {
        return arr;
    }
    const numItems = arr.length - 1;
    if (num > numItems) {
        num = numItems;
    }
    for (let i = 0; i < num; i++) {
        // local variables
        const id1 = getRandomItems(arr, 1)[0].id;
        const id2 = getRandomItems(arr, 1, (it) => it.id === id1)[0].id;
        let tmp;
        const pos1 = arr.findIndex(ii => +ii.id === id1);
        const pos2 = arr.findIndex(ii => +ii.id === id2);
        console.log('id1', id1, pos1, pos2);
        // if positions are different and inside array
        if (arr.length >= 2 && pos1 !== pos2 && 0 <= pos1 && pos1 <= arr.length && 0 <= pos2 && pos2 <= arr.length) {
            // save element from position 1
            tmp = arr[pos1];
            // move element down and shift other elements up
            if (pos1 < pos2) {
                for (i = pos1; i < pos2; i++) {
                    arr[i] = arr[i + 1];
                }
            }
            // move element up and shift other elements down
            else {
                for (i = pos1; i > pos2; i--) {
                    arr[i] = arr[i - 1];
                }
            }
            // put element from position 1 to destination
            arr[+pos2] = tmp;
        }
    }
    return arr;
}
function moveItemImmutable(arr = []) {
    return [...moveItemMutable(arr, 1)];
}
function moveItemsImmutable(arr = [], num) {
    return [...moveItemMutable(arr, num)];
}
function shuffleItemsImmutable(arr = []) {
    // console.log(arr.map(i => i.id));
    const shuffled = [...arr.sort(() => Math.random() - .5)];
    // console.log(shuffled.map(i => i.id));
    return shuffled;
}
function removeItemsMutable(arr = [], ids) {
    if (!arr.length) {
        return arr;
    }
    ids = ids || getRandomItems(arr, 1);
    ids.forEach(id => {
        arr.splice(arr.findIndex(i => i.id === id), 1);
    });
    return arr;
}
function removeItemsImmutable(arr = [], num) {
    return [...removeItemsMutable(arr, getRandomItems(arr, num).map(i => i.id))];
}
class GliphyApi {
    constructor(key) {
        this.key = key;
        this.baseUrl = 'https://api.giphy.com/v1/gifs';
    }
    random() {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["from"])(Object(rxjs_fetch__WEBPACK_IMPORTED_MODULE_2__["fromFetch"])(this.getUrl()).pipe(this.handleFetch)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["share"])());
    }
    ;
    search(queryParams) {
        queryParams = Object.assign({ limit: 25, offset: 0, lang: 'en' }, queryParams);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["from"])(Object(rxjs_fetch__WEBPACK_IMPORTED_MODULE_2__["fromFetch"])(this.getUrl(['search'], queryParams))).pipe(this.handleFetch, Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["share"])());
    }
    ;
    getUrl(params = ['random'], queryParams) {
        const qP = Object.assign({ api_key: this.key, tag: '', rating: 'G' }, queryParams);
        return [
            this.baseUrl,
            [
                params.join('/'),
                Object
                    .entries(qP)
                    .reduce((s, i) => {
                    s.push(i[0] + '=' + i[1]);
                    return s;
                }, [])
                    .join('&')
            ]
                .join('?')
        ]
            .join('/');
    }
    handleFetch(o$) {
        return o$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMap"])(response => {
            // @ts-ignore
            if (response.ok) {
                // OK return data
                // @ts-ignore
                return response.json();
            }
            else {
                // Server is returning a status requiring the client to try something else.
                // @ts-ignore
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])({ error: true, message: `Error ${response.status}` });
            }
        }));
    }
}
const base64Src = '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';
const placeholderImg = `data:image/png;base64, ` + base64Src;


/***/ }),

/***/ "p4Ve":
/*!***************************************************!*\
  !*** ./node_modules/rxjs/_esm2015/fetch/index.js ***!
  \***************************************************/
/*! exports provided: fromFetch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_observable_dom_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../internal/observable/dom/fetch */ "pHqg");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fromFetch", function() { return _internal_observable_dom_fetch__WEBPACK_IMPORTED_MODULE_0__["fromFetch"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "pHqg":
/*!*********************************************************************!*\
  !*** ./node_modules/rxjs/_esm2015/internal/observable/dom/fetch.js ***!
  \*********************************************************************/
/*! exports provided: fromFetch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromFetch", function() { return fromFetch; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "4HpG");
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Observable */ "HDdC");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Subscription */ "quSY");
/* harmony import */ var _observable_from__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../observable/from */ "Cfvw");




function fromFetch(input, initWithSelector = {}) {
    const { selector } = initWithSelector, init = tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"](initWithSelector, ["selector"]);
    return new _Observable__WEBPACK_IMPORTED_MODULE_1__["Observable"](subscriber => {
        const controller = new AbortController();
        const signal = controller.signal;
        let abortable = true;
        let unsubscribed = false;
        const subscription = new _Subscription__WEBPACK_IMPORTED_MODULE_2__["Subscription"]();
        subscription.add(() => {
            unsubscribed = true;
            if (abortable) {
                controller.abort();
            }
        });
        let perSubscriberInit;
        if (init) {
            if (init.signal) {
                if (init.signal.aborted) {
                    controller.abort();
                }
                else {
                    const outerSignal = init.signal;
                    const outerSignalHandler = () => {
                        if (!signal.aborted) {
                            controller.abort();
                        }
                    };
                    outerSignal.addEventListener('abort', outerSignalHandler);
                    subscription.add(() => outerSignal.removeEventListener('abort', outerSignalHandler));
                }
            }
            perSubscriberInit = Object.assign({}, init, { signal });
        }
        else {
            perSubscriberInit = { signal };
        }
        fetch(input, perSubscriberInit).then(response => {
            if (selector) {
                subscription.add(Object(_observable_from__WEBPACK_IMPORTED_MODULE_3__["from"])(selector(response)).subscribe(value => subscriber.next(value), err => {
                    abortable = false;
                    if (!unsubscribed) {
                        subscriber.error(err);
                    }
                }, () => {
                    abortable = false;
                    subscriber.complete();
                }));
            }
            else {
                abortable = false;
                subscriber.next(response);
                subscriber.complete();
            }
        }).catch(err => {
            abortable = false;
            if (!unsubscribed) {
                subscriber.error(err);
            }
        });
        return subscription;
    });
}
//# sourceMappingURL=fetch.js.map

/***/ })

}]);
//# sourceMappingURL=default~basic-example-basic-example-module~basic-rx-let-basic-module~if-visible-poc-if-visible-route~593beff9.js.map