"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMeetingMachineContext = exports.MeetingMachineStatus = void 0;
const hooks_1 = require("@huddle01/react/hooks");
const react_1 = __importStar(require("react"));
var MeetingMachineStatus;
(function (MeetingMachineStatus) {
    MeetingMachineStatus["Idle"] = "Idle";
    MeetingMachineStatus["NotJoined"] = "NotJoined";
    MeetingMachineStatus["JoiningLobby"] = "JoiningLobby";
    MeetingMachineStatus["JoinedLobby"] = "JoinedLobby";
    MeetingMachineStatus["JoiningRoom"] = "JoiningRoom";
    MeetingMachineStatus["JoinedRoom"] = "JoinedRoom";
})(MeetingMachineStatus || (exports.MeetingMachineStatus = MeetingMachineStatus = {}));
const MeetingMachineContext = (0, react_1.createContext)({});
const MeetingMachineProvider = (props) => {
    const { state } = (0, hooks_1.useMeetingMachine)();
    const [huddle01States, setHuddle01States] = (0, react_1.useState)({});
    const { children } = props;
    (0, react_1.useEffect)(() => {
        console.log(state);
        const value = state.value;
        if (value == MeetingMachineStatus.Idle) {
            setHuddle01States({
                status: MeetingMachineStatus.Idle,
                info: {},
                peerId: "",
            });
            return;
        }
        if (typeof value === "object") {
            if (value.Initialized == MeetingMachineStatus.NotJoined) {
                setHuddle01States({
                    status: MeetingMachineStatus.NotJoined,
                    info: {},
                    peerId: "",
                });
                return;
            }
            if (value.Initialized == MeetingMachineStatus.JoiningLobby) {
                setHuddle01States({
                    status: MeetingMachineStatus.JoiningLobby,
                    info: {},
                    peerId: "",
                });
                return;
            }
            if (value.Initialized == MeetingMachineStatus.JoiningRoom) {
                setHuddle01States({
                    status: MeetingMachineStatus.JoiningRoom,
                    info: {},
                    peerId: state.context.peerId,
                });
                return;
            }
            const initialized = value.Initialized;
            if (typeof initialized === "object") {
                if (initialized.JoinedLobby) {
                    setHuddle01States({
                        status: MeetingMachineStatus.JoinedLobby,
                        info: initialized.JoinedLobby,
                        peerId: state.context.peerId,
                    });
                    return;
                }
                if (initialized.JoinedRoom) {
                    setHuddle01States({
                        status: MeetingMachineStatus.JoinedRoom,
                        info: initialized.JoinedRoom,
                        peerId: state.context.peerId,
                    });
                    return;
                }
            }
        }
    }, [state.value]);
    return (<MeetingMachineContext.Provider value={huddle01States}>
      {children}
    </MeetingMachineContext.Provider>);
};
const useMeetingMachineContext = () => (0, react_1.useContext)(MeetingMachineContext);
exports.useMeetingMachineContext = useMeetingMachineContext;
exports.default = MeetingMachineProvider;
