"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
// import { Container } from "react-bootstrap";
const antd_1 = require("antd");
const Header_1 = __importDefault(require("./Header"));
const head_1 = __importDefault(require("next/head"));
const MeetingMachineProvider_1 = require("../providers/MeetingMachineProvider");
const AppLayout = (props) => {
    const { children } = props;
    const { status, info, peerId } = (0, MeetingMachineProvider_1.useMeetingMachineContext)();
    return (<>
      <antd_1.Space direction="vertical" className="w-100">
        <head_1.default>
          <title>Strim3</title>
        </head_1.default>
        <antd_1.Layout className="px-5 py-3 h-100">
          <Header_1.default />
          {/* <div>{status}</div>
        <div>{JSON.stringify(info)}</div>
        <div>PeerId: {peerId}</div> */}
          {children}
        </antd_1.Layout>
      </antd_1.Space>
    </>);
};
exports.default = AppLayout;
