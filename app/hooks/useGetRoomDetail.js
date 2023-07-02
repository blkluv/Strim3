"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetRoomDetail = void 0;
const react_query_1 = require("react-query");
const roomsService_1 = require("../api/roomsService");
const react_1 = require("react");
const wagmi_1 = require("wagmi");
const useGetRoomDetail = (messageApi) => {
    const [roomDetail, setRoomDetail] = (0, react_1.useState)();
    const [isHost, setIsHost] = (0, react_1.useState)(false);
    const [isGuest, setIsGuest] = (0, react_1.useState)(false);
    const { address } = (0, wagmi_1.useAccount)();
    const { mutate: getRoomDetail, isLoading: getRoomDetailIsLoading } = (0, react_query_1.useMutation)({
        mutationKey: "getRoomDetail",
        mutationFn: (roomId) => roomsService_1.roomsService.getRoomDetail(roomId),
        onSuccess: (res) => {
            if (res.hostWalletAddress[0] == address) {
                setIsHost(true);
            }
            else {
                setIsGuest(true);
            }
            setRoomDetail(res);
        },
        onError: (error) => {
            messageApi.error("Get room failed");
        },
    });
    return {
        isHost,
        isGuest,
        roomDetail,
        getRoomDetail,
        getRoomDetailIsLoading,
    };
};
exports.useGetRoomDetail = useGetRoomDetail;
