"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const rooms_controller_1 = require("./rooms.controller");
describe('RoomsController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [rooms_controller_1.RoomsController],
        }).compile();
        controller = module.get(rooms_controller_1.RoomsController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
