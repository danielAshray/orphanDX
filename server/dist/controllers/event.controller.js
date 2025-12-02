"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEvents = void 0;
const prisma_1 = require("../prisma");
const getEvents = async (_req, res, next) => {
    try {
        const events = await prisma_1.prisma.event.findMany({});
        return res.status(200).json(events);
    }
    catch (error) {
        next(error);
    }
};
exports.getEvents = getEvents;
