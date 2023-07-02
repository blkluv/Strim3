"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@huddle01/react");
const useRoomEvents = (messageApi) => {
    (0, react_1.useEventListener)("room:joined", () => {
        messageApi.success("Room joined");
    });
    (0, react_1.useEventListener)("room:failed", () => {
        messageApi.success("Room joined");
    });
};
exports.default = useRoomEvents;
