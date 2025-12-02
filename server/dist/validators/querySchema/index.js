"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const querySchema = joi_1.default.object({
    startIndex: joi_1.default.number().required(),
    sortKey: joi_1.default.string().required().allow(""),
    sortDirection: joi_1.default.string().required().valid("asc", "desc"),
    searchBox: joi_1.default.string().required(),
    timeZone: joi_1.default.string().required(),
});
exports.default = querySchema;
