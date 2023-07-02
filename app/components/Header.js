"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
// import { Row, Col } from 'react-bootstrap';
const antd_1 = require("antd");
const rainbowkit_1 = require("@rainbow-me/rainbowkit");
const router_1 = require("next/router");
const MeetingMachineProvider_1 = require("../providers/MeetingMachineProvider");
const hooks_1 = require("@huddle01/react/hooks");
const Header = () => {
    const { Title } = antd_1.Typography;
    const { status, info } = (0, MeetingMachineProvider_1.useMeetingMachineContext)();
    const { leaveLobby } = (0, hooks_1.useLobby)();
    const { leaveRoom } = (0, hooks_1.useRoom)();
    const { stopVideoStream } = (0, hooks_1.useVideo)();
    const { stopAudioStream } = (0, hooks_1.useAudio)();
    const router = (0, router_1.useRouter)();
    const handleHome = () => {
        stopAudioStream();
        stopVideoStream();
        switch (status) {
            case MeetingMachineProvider_1.MeetingMachineStatus.JoinedLobby:
                leaveLobby();
            case MeetingMachineProvider_1.MeetingMachineStatus.JoinedRoom:
                leaveRoom();
            default:
        }
        router.push("/");
    };
    return (<antd_1.Row className="justify-content-between">
      <antd_1.Col>
        <Title style={{ cursor: "pointer" }} onClick={() => handleHome()}>
          Strim3
        </Title>
      </antd_1.Col>
      <antd_1.Col>
        <rainbowkit_1.ConnectButton accountStatus={"full"} chainStatus={"icon"} showBalance={true}/>
      </antd_1.Col>
    </antd_1.Row>);
};
exports.default = Header;
