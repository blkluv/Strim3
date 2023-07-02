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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomsService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let RoomsService = exports.RoomsService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var RoomsService = _classThis = class {
        constructor(http) {
            this.http = http;
            this.rooms = new Map();
            this.logger = new common_1.Logger(RoomsService.name);
        }
        async getRoomDetail(roomId) {
            if (!this.rooms.has(roomId))
                throw new common_1.HttpException('RoomId Not Found', common_1.HttpStatus.NOT_FOUND);
            return this.rooms.get(roomId);
        }
        async create(body) {
            const { data } = await (0, rxjs_1.firstValueFrom)(this.http.post('create-room', {
                title: body.title,
                description: body.desc,
                hostWallets: [body.address],
            })).catch((error) => {
                throw new common_1.HttpException(error.response.data, error.response.status);
            });
            const { roomId } = data.data;
            const { data: detail } = await (0, rxjs_1.firstValueFrom)(this.http.get(`meeting-details/${roomId}`)).catch((error) => {
                throw new common_1.HttpException(error.response.data, error.response.status);
            });
            this.rooms.set(roomId, detail);
            return detail;
        }
        async join(body) {
            if (!this.rooms.has(body.roomId))
                throw new common_1.HttpException('RoomId Not NotFoundError', common_1.HttpStatus.NOT_FOUND);
            const hosts = this.rooms.get(body.roomId).hostWalletAddress;
            const { data } = await (0, rxjs_1.firstValueFrom)(this.http.post('join-room-token', {
                roomId: body.roomId,
                userType: hosts.indexOf(body.address) === -1 ? 'guest' : 'host',
                displayName: body.displayName,
            }));
            return data;
        }
        async leave(body) {
            if (!this.rooms.has(body.roomId))
                throw new common_1.HttpException('RoomId Not NotFoundError', common_1.HttpStatus.NOT_FOUND);
            const hosts = this.rooms.get(body.roomId).hostWalletAddress;
            if (hosts.indexOf(body.address))
                this.rooms.delete(body.roomId);
            return true;
        }
    };
    __setFunctionName(_classThis, "RoomsService");
    (() => {
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name }, null, _classExtraInitializers);
        RoomsService = _classThis = _classDescriptor.value;
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RoomsService = _classThis;
})();
