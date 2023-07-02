"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_1 = require("@huddle01/react/hooks");
const antd_1 = require("antd");
const react_1 = __importDefault(require("react"));
const Peers = () => {
    const { peers } = (0, hooks_1.usePeers)();
    const { Text } = antd_1.Typography;
    return (<antd_1.List dataSource={Object.values(peers)} className="w-100" renderItem={(peer) => (<antd_1.List.Item>
          <antd_1.Row className="justify-content-between w-100">
            <antd_1.Col xs={12}>
              <Text ellipsis>{peer.displayName}</Text>
            </antd_1.Col>
            <antd_1.Col className="text-end">
              <Text>{peer.role}</Text>
            </antd_1.Col>
          </antd_1.Row>
        </antd_1.List.Item>)}/>);
};
exports.default = Peers;
