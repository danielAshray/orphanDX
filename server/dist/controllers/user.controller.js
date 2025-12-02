"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = exports.getProfile = void 0;
const prisma_1 = require("../prisma");
const bcryptService_1 = require("../utils/bcryptService");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_config_1 = require("../config/app.config");
const getProfile = async (req, res, next) => {
    try {
        const userExists = await prisma_1.prisma.user.findUnique({
            where: { id: req.id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                status: true,
            },
        });
        if (!userExists) {
            return next({ code: 400, message: "user not found" });
        }
        if (userExists.status !== "ACTIVE") {
            return next({ code: 400, message: "user not active" });
        }
        return res.status(200).send(userExists);
    }
    catch (error) {
        next(error);
    }
};
exports.getProfile = getProfile;
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userExists = await prisma_1.prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
                role: true,
                status: true,
            },
        });
        if (!userExists) {
            return next({ code: 400, message: "User not found" });
        }
        const matchPassword = (0, bcryptService_1.compareHashPassword)(password, userExists.password);
        if (!matchPassword) {
            return next({ code: 400, message: "Invalid credentials" });
        }
        const payload = {
            token: jsonwebtoken_1.default.sign({ id: userExists.id, role: userExists.role }, app_config_1.TOKEN_SECRET_KEY, { expiresIn: "1d" }),
            email: userExists.email,
        };
        return res.status(200).json(payload);
    }
    catch (error) {
        next(error);
    }
};
exports.loginUser = loginUser;
const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        const userExists = await prisma_1.prisma.user.findUnique({
            where: { email },
        });
        if (userExists) {
            return next({ code: 400, message: "User already exists" });
        }
        const hashPassword = (0, bcryptService_1.getHashPassword)(password);
        const newUser = await prisma_1.prisma.user.create({
            data: {
                name,
                email,
                password: hashPassword,
                role,
            },
        });
        return res.status(200).json(newUser);
    }
    catch (error) {
        next(error);
    }
};
exports.registerUser = registerUser;
