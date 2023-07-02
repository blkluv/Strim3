"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCreateRoom = void 0;
const react_query_1 = require("react-query");
const roomsService_1 = require("../api/roomsService");
const react_1 = require("react");
const useCreateRoom = (address, messageApi) => {
    const [roomId, setRoomId] = (0, react_1.useState)();
    const { mutate: createRoom, isLoading: createRoomIsLoading, isSuccess: createRoomIsSuccess, } = (0, react_query_1.useMutation)({
        mutationKey: ["createRoom"],
        mutationFn: (data) => roomsService_1.roomsService.createRoom(data),
        onSuccess: (res) => {
            setRoomId(res.roomId);
            messageApi.success("Created room");
        },
        onError: (error) => {
            messageApi.error("Create room failed");
        },
    });
    return {
        roomId,
        createRoom,
        createRoomIsLoading,
        createRoomIsSuccess,
    };
};
exports.useCreateRoom = useCreateRoom;
