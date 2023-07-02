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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
// import { Button, Col, Row, Stack } from "react-bootstrap";
const antd_1 = require("antd");
const hooks_1 = require("@huddle01/react/hooks");
const react_2 = require("@huddle01/react");
const router_1 = require("next/router");
const useRoomEvents_1 = __importDefault(require("../hooks/useRoomEvents"));
const MeetingMachineProvider_1 = require("../providers/MeetingMachineProvider");
const pro_components_1 = require("@ant-design/pro-components");
const Chat_1 = __importDefault(require("./Chat"));
const Peers_1 = __importDefault(require("./Peers"));
const useMedaiRecording_1 = __importDefault(require("../hooks/useMedaiRecording"));
const Host = (props) => {
    const { roomId, roomDetail } = props;
    const router = (0, router_1.useRouter)();
    const [messageApi, contextHolder] = antd_1.message.useMessage();
    const videoRef = (0, react_1.useRef)(null);
    const [camOn, setCamOn] = (0, react_1.useState)(false);
    const [micOn, setMicOn] = (0, react_1.useState)(false);
    const { joinLobby, isLoading: joinLobbyIsLoading, leaveLobby } = (0, hooks_1.useLobby)();
    const { startRecord, stopRecord, isReadyToDownload, downloadVideo, blobUrl } = (0, useMedaiRecording_1.default)(messageApi);
    const { joinRoom, leaveRoom } = (0, hooks_1.useRoom)();
    const { fetchVideoStream, stopVideoStream, produceVideo, stopProducingVideo, stream: camStream, isProducing: isCamProducing, } = (0, hooks_1.useVideo)();
    const { fetchAudioStream, stopAudioStream, produceAudio, stopProducingAudio, stream: micStream, isProducing: isMicProducing, } = (0, hooks_1.useAudio)();
    const { status } = (0, MeetingMachineProvider_1.useMeetingMachineContext)();
    const { Text, Paragraph } = antd_1.Typography;
    (0, react_1.useEffect)(() => {
        if (router.isReady) {
            joinLobby(roomId);
        }
    }, [router.isReady]);
    (0, react_2.useEventListener)("lobby:joined", () => messageApi.success("Joined lobby"));
    (0, react_2.useEventListener)("lobby:failed", () => messageApi.error("Lobby join failed"));
    // TODO: Add mic
    (0, react_2.useEventListener)("lobby:mic-on", () => setMicOn(true));
    (0, react_2.useEventListener)("lobby:mic-off", () => setMicOn(false));
    (0, react_2.useEventListener)("lobby:cam-on", () => {
        setCamOn(true);
        if (videoRef.current)
            videoRef.current.srcObject = camStream;
    });
    (0, react_2.useEventListener)("lobby:cam-off", () => {
        setCamOn(false);
        if (videoRef.current)
            videoRef.current.srcObject = null;
    });
    (0, useRoomEvents_1.default)(messageApi);
    const toggleCam = () => {
        if (camOn)
            stopVideoStream();
        else
            fetchVideoStream();
    };
    const toggleMic = () => {
        if (micOn)
            stopAudioStream();
        else
            fetchAudioStream();
    };
    const startProduce = () => {
        produceVideo(camStream);
        produceAudio(micStream);
        startRecord(true, camStream, micStream);
    };
    const finishStream = () => {
        stopProducingAudio();
        stopProducingVideo();
        stopRecord();
    };
    const handleJoinRoom = () => joinRoom.isCallable && joinRoom();
    const handleLeaveRoom = () => {
        leaveRoom();
        router.push("/");
    };
    if (joinLobbyIsLoading)
        return <>Loading...</>;
    return (<>
      {contextHolder}

      <antd_1.Row gutter={16}>
        <antd_1.Col xs={16}>
          <antd_1.Card title={roomDetail.title}>
            <antd_1.Space direction="vertical" className="w-100">
              <antd_1.Card bordered>
                <antd_1.Space className="w-100" direction="vertical">
                  <video ref={videoRef} autoPlay poster="https://placehold.co/600x400" width={"100%"}/>
                  <Paragraph>{roomDetail.description}</Paragraph>
                </antd_1.Space>
              </antd_1.Card>
              <antd_1.Space direction="horizontal" className="w-100 justify-content-center">
                <antd_1.Button danger={camOn} onClick={toggleCam} disabled={(!fetchVideoStream.isCallable &&
            !stopVideoStream.isCallable) ||
            status !== MeetingMachineProvider_1.MeetingMachineStatus.JoinedLobby}>
                  {!camOn ? (<i className="bi bi-camera-video-fill"></i>) : (<i className="bi bi-camera-video-off-fill"></i>)}
                </antd_1.Button>
                <antd_1.Button danger={micOn} onClick={toggleMic} disabled={(!fetchAudioStream.isCallable &&
            !stopAudioStream.isCallable) ||
            status !== MeetingMachineProvider_1.MeetingMachineStatus.JoinedLobby}>
                  {!micOn ? (<i className="bi bi-mic-fill"></i>) : (<i className="bi bi-mic-mute-fill"></i>)}
                </antd_1.Button>
                <antd_1.Button onClick={() => startProduce()} disabled={!camOn ||
            status !== MeetingMachineProvider_1.MeetingMachineStatus.JoinedRoom ||
            (isCamProducing && isMicProducing)}>
                  Start
                </antd_1.Button>
                <antd_1.Button onClick={() => finishStream()} disabled={status !== MeetingMachineProvider_1.MeetingMachineStatus.JoinedRoom} danger>
                  Finish
                </antd_1.Button>
              </antd_1.Space>
            </antd_1.Space>
          </antd_1.Card>
        </antd_1.Col>
        <antd_1.Col xs={8}>
          {<pro_components_1.ProCard title="Action">
              <pro_components_1.ProCard bordered tabs={{ type: "card" }}>
                {status === MeetingMachineProvider_1.MeetingMachineStatus.JoinedLobby ? (<pro_components_1.ProCard.TabPane key="start" tab="Start">
                    <antd_1.Space className="w-100 justify-content-center" direction="vertical" align="center">
                      <antd_1.Button onClick={() => handleJoinRoom()}>JoinRoom</antd_1.Button>
                    </antd_1.Space>
                  </pro_components_1.ProCard.TabPane>) : (<>
                    <pro_components_1.ProCard.TabPane key="chat" tab="Chat">
                      <Chat_1.default />
                    </pro_components_1.ProCard.TabPane>
                    <pro_components_1.ProCard.TabPane key="peers" tab="Peers">
                      <Peers_1.default />
                    </pro_components_1.ProCard.TabPane>
                    <pro_components_1.ProCard.TabPane key="Mint" tab="Mint">
                      <antd_1.Space direction="vertical" className="w-100 justify-content-center" align="center">
                        <video src={blobUrl} controls className="w-100"/>
                        <antd_1.Button onClick={() => downloadVideo()} disabled={!isReadyToDownload}>
                          Mint
                        </antd_1.Button>
                      </antd_1.Space>
                    </pro_components_1.ProCard.TabPane>
                  </>)}
              </pro_components_1.ProCard>
            </pro_components_1.ProCard>}
        </antd_1.Col>
      </antd_1.Row>
    </>);
};
exports.default = Host;
