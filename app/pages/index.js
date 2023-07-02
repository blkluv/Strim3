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
const react_1 = __importStar(require("react"));
const useCreateRoom_1 = require("../hooks/useCreateRoom");
const wagmi_1 = require("wagmi");
const antd_1 = require("antd");
const router_1 = require("next/router");
const Index = () => {
    const router = (0, router_1.useRouter)();
    const { address } = (0, wagmi_1.useAccount)();
    const [messageApi, contextHolder] = antd_1.message.useMessage();
    const { roomId, createRoom, createRoomIsLoading, createRoomIsSuccess } = (0, useCreateRoom_1.useCreateRoom)(address, messageApi);
    const [joinRoomId, setJoinRoomId] = (0, react_1.useState)("");
    const [title, setTitle] = (0, react_1.useState)("");
    const [desc, setDesc] = (0, react_1.useState)("");
    (0, react_1.useEffect)(() => {
        if (createRoomIsSuccess) {
            router.push(`/${roomId}`);
        }
    }, [createRoomIsSuccess]);
    const handleJoin = () => router.push(`/${joinRoomId}`);
    const handleCreate = () => {
        if (title === "")
            messageApi.error("Title is required");
        else if (desc === "")
            messageApi.error("Description is required");
        else
            createRoom({ address: address, title, desc });
    };
    return (<>
      {contextHolder}
      <antd_1.Row gutter={16}>
        <antd_1.Col xs={12}>
          <antd_1.Card>
            <antd_1.Space direction="vertical" className="w-100">
              <antd_1.Card title="Create room" extra={<antd_1.Button onClick={() => handleCreate()} disabled={createRoomIsLoading}>
                    Create
                  </antd_1.Button>}>
                <antd_1.Form layout="vertical">
                  <antd_1.Form.Item name="title" label="Title">
                    <antd_1.Input onChange={(e) => setTitle(e.target.value)}/>
                  </antd_1.Form.Item>
                  <antd_1.Form.Item name="description" label="Description">
                    <antd_1.Input onChange={(e) => setDesc(e.target.value)}/>
                  </antd_1.Form.Item>
                </antd_1.Form>
              </antd_1.Card>
              <antd_1.Card title="Join room" bordered extra={<antd_1.Button onClick={() => handleJoin()}>Join</antd_1.Button>}>
                <antd_1.Space align="center" direction="vertical" className="w-100 justify-content-center">
                  <antd_1.Form layout="vertical">
                    <antd_1.Form.Item name="roomId" label="Room ID:">
                      <antd_1.Input onChange={(e) => setJoinRoomId(e.target.value)}/>
                    </antd_1.Form.Item>
                  </antd_1.Form>
                </antd_1.Space>
              </antd_1.Card>
            </antd_1.Space>
          </antd_1.Card>
        </antd_1.Col>
        <antd_1.Col xs={12}>
          <antd_1.Card title="Temp"></antd_1.Card>
        </antd_1.Col>
      </antd_1.Row>
    </>);
};
exports.default = Index;
