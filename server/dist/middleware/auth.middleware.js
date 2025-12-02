"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = exports.checkPermission = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_config_1 = require("../config/app.config");
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
            .status(401)
            .json({ message: "Unauthorized: No token provided", code: "LOGOUT" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, app_config_1.TOKEN_SECRET_KEY);
        req.id = decoded.id;
        req.role = decoded.role;
        next();
    }
    catch (error) {
        return res
            .status(401)
            .json({ message: "Unauthorized: Invalid token", code: "LOGOUT" });
    }
};
exports.authenticate = authenticate;
const checkPermission = (roles) => (req, res, next) => {
    try {
        if (!req.role)
            return next({ code: 401, message: "Unauthorized access" });
        const currentRole = req.role;
        if (!roles.includes(currentRole))
            return next({ code: 401, message: "Unauthorized access" });
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};
exports.checkPermission = checkPermission;
const authRoute = (handler) => {
    return async (req, res, next) => {
        try {
            const authReq = req;
            if (!authReq.id)
                return res.status(401).json({ message: "Unauthorized" });
            await handler(authReq, res, next);
        }
        catch (err) {
            next(err);
        }
    };
};
exports.authRoute = authRoute;
