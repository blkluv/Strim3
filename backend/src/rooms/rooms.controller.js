"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomsController = void 0;
const common_1 = require("@nestjs/common");
let RoomsController = exports.RoomsController = (() => {
    let _classDecorators = [(0, common_1.Controller)('rooms')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _get_decorators;
    let _create_decorators;
    let _join_decorators;
    let _leave_decorators;
    var RoomsController = _classThis = class {
        constructor(roomsService) {
            this.roomsService = (__runInitializers(this, _instanceExtraInitializers), roomsService);
        }
        async get(roomId) {
            const data = await this.roomsService.getRoomDetail(roomId);
            return data;
        }
        async create(body) {
            const data = await this.roomsService.create(body);
            return data;
        }
        async join(body) {
            const data = await this.roomsService.join(body);
            return data;
        }
        async leave(body) {
            const data = await this.roomsService.leave(body);
            return data;
        }
    };
    __setFunctionName(_classThis, "RoomsController");
    (() => {
        _get_decorators = [(0, common_1.Get)(':roomId')];
        _create_decorators = [(0, common_1.Post)()];
        _join_decorators = [(0, common_1.Post)('join')];
        _leave_decorators = [(0, common_1.Post)('leave')];
        __esDecorate(_classThis, null, _get_decorators, { kind: "method", name: "get", static: false, private: false, access: { has: obj => "get" in obj, get: obj => obj.get } }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: obj => "create" in obj, get: obj => obj.create } }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _join_decorators, { kind: "method", name: "join", static: false, private: false, access: { has: obj => "join" in obj, get: obj => obj.join } }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _leave_decorators, { kind: "method", name: "leave", static: false, private: false, access: { has: obj => "leave" in obj, get: obj => obj.leave } }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        RoomsController = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RoomsController = _classThis;
})();
