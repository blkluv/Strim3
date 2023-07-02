"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveRoomDto = exports.JoinRoomDto = exports.CreateRoomDto = void 0;
const class_validator_1 = require("class-validator");
let CreateRoomDto = exports.CreateRoomDto = (() => {
    var _a;
    let _instanceExtraInitializers = [];
    let _address_decorators;
    let _address_initializers = [];
    let _title_decorators;
    let _title_initializers = [];
    let _desc_decorators;
    let _desc_initializers = [];
    return _a = class CreateRoomDto {
            constructor() {
                this.address = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _address_initializers, void 0));
                this.title = __runInitializers(this, _title_initializers, void 0);
                this.desc = __runInitializers(this, _desc_initializers, void 0);
            }
        },
        (() => {
            _address_decorators = [(0, class_validator_1.IsNotEmpty)()];
            _title_decorators = [(0, class_validator_1.IsNotEmpty)()];
            _desc_decorators = [(0, class_validator_1.IsNotEmpty)()];
            __esDecorate(null, null, _address_decorators, { kind: "field", name: "address", static: false, private: false, access: { has: obj => "address" in obj, get: obj => obj.address, set: (obj, value) => { obj.address = value; } } }, _address_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: obj => "title" in obj, get: obj => obj.title, set: (obj, value) => { obj.title = value; } } }, _title_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _desc_decorators, { kind: "field", name: "desc", static: false, private: false, access: { has: obj => "desc" in obj, get: obj => obj.desc, set: (obj, value) => { obj.desc = value; } } }, _desc_initializers, _instanceExtraInitializers);
        })(),
        _a;
})();
let JoinRoomDto = exports.JoinRoomDto = (() => {
    var _a;
    let _instanceExtraInitializers_1 = [];
    let _roomId_decorators;
    let _roomId_initializers = [];
    let _displayName_decorators;
    let _displayName_initializers = [];
    let _address_decorators;
    let _address_initializers = [];
    return _a = class JoinRoomDto {
            constructor() {
                this.roomId = (__runInitializers(this, _instanceExtraInitializers_1), __runInitializers(this, _roomId_initializers, void 0));
                this.displayName = __runInitializers(this, _displayName_initializers, void 0);
                this.address = __runInitializers(this, _address_initializers, void 0);
            }
        },
        (() => {
            _roomId_decorators = [(0, class_validator_1.IsNotEmpty)()];
            _displayName_decorators = [(0, class_validator_1.IsNotEmpty)()];
            _address_decorators = [(0, class_validator_1.IsNotEmpty)()];
            __esDecorate(null, null, _roomId_decorators, { kind: "field", name: "roomId", static: false, private: false, access: { has: obj => "roomId" in obj, get: obj => obj.roomId, set: (obj, value) => { obj.roomId = value; } } }, _roomId_initializers, _instanceExtraInitializers_1);
            __esDecorate(null, null, _displayName_decorators, { kind: "field", name: "displayName", static: false, private: false, access: { has: obj => "displayName" in obj, get: obj => obj.displayName, set: (obj, value) => { obj.displayName = value; } } }, _displayName_initializers, _instanceExtraInitializers_1);
            __esDecorate(null, null, _address_decorators, { kind: "field", name: "address", static: false, private: false, access: { has: obj => "address" in obj, get: obj => obj.address, set: (obj, value) => { obj.address = value; } } }, _address_initializers, _instanceExtraInitializers_1);
        })(),
        _a;
})();
let LeaveRoomDto = exports.LeaveRoomDto = (() => {
    var _a;
    let _instanceExtraInitializers_2 = [];
    let _address_decorators;
    let _address_initializers = [];
    let _roomId_decorators;
    let _roomId_initializers = [];
    return _a = class LeaveRoomDto {
            constructor() {
                this.address = (__runInitializers(this, _instanceExtraInitializers_2), __runInitializers(this, _address_initializers, void 0));
                this.roomId = __runInitializers(this, _roomId_initializers, void 0);
            }
        },
        (() => {
            _address_decorators = [(0, class_validator_1.IsNotEmpty)()];
            _roomId_decorators = [(0, class_validator_1.IsNotEmpty)()];
            __esDecorate(null, null, _address_decorators, { kind: "field", name: "address", static: false, private: false, access: { has: obj => "address" in obj, get: obj => obj.address, set: (obj, value) => { obj.address = value; } } }, _address_initializers, _instanceExtraInitializers_2);
            __esDecorate(null, null, _roomId_decorators, { kind: "field", name: "roomId", static: false, private: false, access: { has: obj => "roomId" in obj, get: obj => obj.roomId, set: (obj, value) => { obj.roomId = value; } } }, _roomId_initializers, _instanceExtraInitializers_2);
        })(),
        _a;
})();
