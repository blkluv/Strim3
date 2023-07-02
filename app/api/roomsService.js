"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomsService = void 0;
const apiClient_1 = __importDefault(require("./apiClient"));
const createRoom = async (data) => {
    const res = await apiClient_1.default.post("rooms", data);
    return res.data;
};
const getRoomDetail = async (roomId) => {
    const res = await apiClient_1.default.get(`rooms/${roomId}`);
    return res.data;
};
exports.roomsService = {
    createRoom,
    getRoomDetail,
};
