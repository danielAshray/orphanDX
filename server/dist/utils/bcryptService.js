"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareHashPassword = exports.getHashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const app_config_1 = require("../config/app.config");
const getHashPassword = (password) => {
    return bcryptjs_1.default.hashSync(password, app_config_1.SALT_ROUNDS);
};
exports.getHashPassword = getHashPassword;
const compareHashPassword = (password, hash) => {
    return bcryptjs_1.default.compareSync(password, hash);
};
exports.compareHashPassword = compareHashPassword;
