"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const network_helpers_1 = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const chai_1 = require("chai");
const hardhat_1 = require("hardhat");
describe("Strim", function () {
    async function deployContract() {
        const factory = await hardhat_1.ethers.getContractFactory("Strim");
        const contract = await factory.deploy();
        await contract.waitForDeployment();
        const [owner, account1] = await hardhat_1.ethers.getSigners();
        return { contract, owner, account1 };
    }
    async function deployContractAndCreateStrim() {
        const { contract, owner, account1 } = await (0, network_helpers_1.loadFixture)(deployContract);
        await contract.connect(owner).createStrim();
        await contract.connect(owner).modifyStrimURI("Helloworld");
        return { contract, owner, account1 };
    }
    describe("createStrim", () => {
        it("should create a strim and modified uri", async () => {
            const { contract, owner } = await (0, network_helpers_1.loadFixture)(deployContractAndCreateStrim);
            const res = await contract.getAllStream(owner);
            (0, chai_1.expect)(res[0][0]).to.be.equal(1);
            (0, chai_1.expect)(res[0][1]).to.be.equal("Helloworld");
        });
        it("should not allow modifyURI", async () => {
            const { contract, account1 } = await (0, network_helpers_1.loadFixture)(deployContractAndCreateStrim);
            await (0, chai_1.expect)(contract.connect(account1).modifyStrimURI("Throw")).to.be
                .rejected;
        });
    });
    async function deployContractAndCreateStrimAndClip() {
        const { contract, owner, account1 } = await (0, network_helpers_1.loadFixture)(deployContractAndCreateStrim);
        await contract.connect(account1).clip(owner, "Sup");
        return { contract, owner, account1 };
    }
    describe("clip", () => {
        it("should clip", async () => {
            const { contract, account1 } = await (0, network_helpers_1.loadFixture)(deployContractAndCreateStrimAndClip);
            const res = await contract.getAllClip(account1);
            (0, chai_1.expect)(res[0][0]).to.be.equal(2);
            (0, chai_1.expect)(res[0][1]).to.be.equal("Sup");
        });
        it("clip should be under stream", async () => {
            const { contract, account1 } = await (0, network_helpers_1.loadFixture)(deployContractAndCreateStrimAndClip);
            const res = await contract.getAllClipsUnderStream(1);
            (0, chai_1.expect)(res[0][0]).to.be.equal(2);
            (0, chai_1.expect)(res[0][1]).to.be.equal("Sup");
        });
    });
});
