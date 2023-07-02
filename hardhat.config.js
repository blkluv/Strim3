"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
require("@nomicfoundation/hardhat-toolbox");
dotenv_1.default.config();
const config = {
    solidity: "0.8.18",
    paths: {
        artifacts: "./app/artifacts",
    },
    defaultNetwork: "localhost",
    networks: {
        sepolia: {
            url: process.env.ALCHEMY_SEPOLIA_URL,
            accounts: [process.env.SEPOLIA_PRIVATE_KEY]
        }
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY
    }
};
exports.default = config;
