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
const react_1 = require("@huddle01/react");
const components_1 = require("@huddle01/react/components");
const hooks_1 = require("@huddle01/react/hooks");
const app_utils_1 = require("@huddle01/react/app-utils");
const react_2 = __importStar(require("react"));
const antd_1 = require("antd");
const useMedaiRecording_1 = __importDefault(require("../hooks/useMedaiRecording"));
const pro_components_1 = require("@ant-design/pro-components");
const Chat_1 = __importDefault(require("./Chat"));
const Peers_1 = __importDefault(require("./Peers"));
const router_1 = require("next/router");
const Guest = (props) => {
    const { roomId, roomDetail } = props;
    const { peers } = (0, hooks_1.usePeers)();
    const { joinLobby, isLoading: joinLobbyIsLoading, isLobbyJoined, } = (0, hooks_1.useLobby)();
    const { joinRoom, leaveRoom, isLoading: joinRoomIsLoading, isRoomJoined, } = (0, hooks_1.useRoom)();
    const { setDisplayName } = (0, app_utils_1.useDisplayName)();
    const [input, setInput] = (0, react_2.useState)("");
    const [messageApi, contextHolder] = antd_1.message.useMessage();
    const { Paragraph, Text } = antd_1.Typography;
    const router = (0, router_1.useRouter)();
    (0, react_2.useEffect)(() => {
        joinLobby(roomId);
    }, []);
    (0, react_1.useEventListener)("lobby:joined", () => messageApi.success("Joined lobby"));
    (0, react_1.useEventListener)("lobby:failed", () => messageApi.error("Lobby join failed"));
    (0, react_1.useEventListener)("room:joined", () => messageApi.success("Joined room"));
    (0, react_1.useEventListener)("room:failed", () => messageApi.error("Join room failed"));
    const handleJoinRoom = () => {
        setDisplayName(input);
        joinRoom();
    };
    const handleLeaveRoom = () => {
        leaveRoom();
        router.push("/");
    };
    const { startRecord, stopRecord, isRecording, downloadVideo, isReadyToDownload, blobUrl, } = (0, useMedaiRecording_1.default)(messageApi);
    return (<>
      {contextHolder}
      {isLobbyJoined && (<antd_1.Card title={`Joining ${roomDetail.title}`}>
          <antd_1.Card bordered>
            <antd_1.Space className="w-100 justify-content-center" direction="vertical">
              <Paragraph>{roomDetail.description}</Paragraph>
              <antd_1.Form layout="inline">
                <antd_1.Form.Item name="displayName" label="Display Name">
                  <antd_1.Input value={input} onChange={(e) => setInput(e.target.value)}/>
                </antd_1.Form.Item>
                <antd_1.Form.Item>
                  <antd_1.Button onClick={() => handleJoinRoom()}>Join</antd_1.Button>
                </antd_1.Form.Item>
              </antd_1.Form>
            </antd_1.Space>
          </antd_1.Card>
        </antd_1.Card>)}
      {isRoomJoined && (<antd_1.Row gutter={16}>
          <antd_1.Col xs={15}>
            {Object.values(peers)
                .filter((peer) => peer.cam && peer.mic)
                .map((peer) => {
                if (peer.role === "host") {
                    return (<antd_1.Card title={roomDetail.title}>
                      <antd_1.Card bordered>
                        <antd_1.Space direction="vertical" className="w-100">
                          <div>
                            <components_1.Video peerId={peer.peerId} track={peer.cam} key={peer.peerId} width={"100%"}/>
                            <components_1.Audio peerId={peer.peerId} track={peer.mic} key={peer.peerId + `audio`}/>
                          </div>
                          <Paragraph>{roomDetail.description}</Paragraph>
                        </antd_1.Space>
                      </antd_1.Card>
                    </antd_1.Card>);
                }
            })}
          </antd_1.Col>
          <antd_1.Col xs={9}>
            <pro_components_1.ProCard title="Chat" extra={<antd_1.Button onClick={() => handleLeaveRoom()} danger>
                  Leave
                </antd_1.Button>}>
              <pro_components_1.ProCard bordered tabs={{ type: "card" }}>
                <pro_components_1.ProCard.TabPane key="chat" tab="Chat">
                  <Chat_1.default />
                </pro_components_1.ProCard.TabPane>
                <pro_components_1.ProCard.TabPane key="peers" tab="Peers">
                  <Peers_1.default />
                </pro_components_1.ProCard.TabPane>
                <pro_components_1.ProCard.TabPane key="record" tab="Clip">
                  <antd_1.Space className="w-100 justify-content-center" align="center">
                    <antd_1.Button danger={isRecording} onClick={isRecording ? () => stopRecord() : () => startRecord()} disabled={isReadyToDownload}>
                      {!isRecording ? (<i className="bi bi-record-fill"></i>) : (<i className="bi bi-stop-fill"></i>)}
                    </antd_1.Button>
                  </antd_1.Space>
                </pro_components_1.ProCard.TabPane>
                <pro_components_1.ProCard.TabPane key="mint" tab="Mint">
                  <antd_1.Space direction="vertical" className="w-100 justify-content-center" align="center">
                    <video src={blobUrl} controls/>
                    <antd_1.Button onClick={() => downloadVideo()} disabled={!isReadyToDownload}>
                      Mint
                    </antd_1.Button>
                  </antd_1.Space>
                </pro_components_1.ProCard.TabPane>
              </pro_components_1.ProCard>
            </pro_components_1.ProCard>
          </antd_1.Col>
        </antd_1.Row>)}
      {(joinLobbyIsLoading || joinRoomIsLoading) && <>Loading...</>}
    </>);
};
exports.default = Guest;
