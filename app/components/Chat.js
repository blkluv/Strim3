"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const antd_1 = require("antd");
const react_1 = __importDefault(require("react"));
const Chat = () => {
    const { Text } = antd_1.Typography;
    return (<>
      <antd_1.List bordered style={{ overflowY: "scroll", height: 500 }}>
        {Array.from({ length: 10 }).map((value, index) => (<antd_1.List.Item key={index} className="border-0">
            <antd_1.Space direction="vertical">
              <Text strong>Peer {index}</Text>
              <Text type="secondary">Hello world</Text>
            </antd_1.Space>
          </antd_1.List.Item>))}
      </antd_1.List>
      <antd_1.Space.Compact className="w-100 pt-3">
        <antd_1.Input />
        <antd_1.Button>Send</antd_1.Button>
      </antd_1.Space.Compact>
    </>);
};
exports.default = Chat;
