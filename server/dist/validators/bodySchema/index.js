"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPatientRecommendationBodySchema = exports.createPatientBodySchema = exports.createOrderBodySchema = exports.recommendTestBodySchema = exports.userRrefreshTokenBodySchema = exports.userRegisterBodySchema = exports.userLoginBodySchema = void 0;
const joi_1 = __importDefault(require("joi"));
const createPatientBodySchema = joi_1.default.object({
    name: joi_1.default.string().min(2).max(100).required(),
    practiceId: joi_1.default.number().integer().required(),
    ehrPatientId: joi_1.default.string().max(50).required(),
    dob: joi_1.default.date().required(),
    gender: joi_1.default.string()
        .regex(/^(MALE|FEMALE|OTHER)$/)
        .required()
        .messages({
        "any.required": "Gender is required",
        "string.pattern.base": "Gender must be MALE, FEMALE or OTHER",
    }),
    lastVisit: joi_1.default.date().optional().allow(null, ""),
    phone: joi_1.default.string().max(15).required(),
    email: joi_1.default.string().email().max(100).required(),
});
exports.createPatientBodySchema = createPatientBodySchema;
const createOrderBodySchema = joi_1.default.object({
    patientId: joi_1.default.number().integer().required(),
    testId: joi_1.default.number().integer().required(),
    providerId: joi_1.default.number().integer().required(),
});
exports.createOrderBodySchema = createOrderBodySchema;
const createPatientRecommendationBodySchema = joi_1.default.object({
    patientId: joi_1.default.number().integer().required(),
    testId: joi_1.default.number().integer().required(),
    providerId: joi_1.default.number().integer().required(),
    status: joi_1.default.string()
        .regex(/^(PENDING|ACCEPTED|REJECTED)$/)
        .optional()
        .messages({
        "string.pattern.base": "Status must be one of the following values: PENDING, ACCEPTED, REJECTED",
    }),
    reasonText: joi_1.default.array().items(joi_1.default.string()).required(),
});
exports.createPatientRecommendationBodySchema = createPatientRecommendationBodySchema;
const recommendTestBodySchema = joi_1.default.object({
    patientId: joi_1.default.number().required(),
    testId: joi_1.default.number().required(),
    providerId: joi_1.default.number().required(),
    status: joi_1.default.string().allow("", null),
    reasonText: joi_1.default.array().items(joi_1.default.string()).required(),
});
exports.recommendTestBodySchema = recommendTestBodySchema;
const userLoginBodySchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(8).required(),
});
exports.userLoginBodySchema = userLoginBodySchema;
const userRrefreshTokenBodySchema = joi_1.default.object({
    refreshToken: joi_1.default.string().required(),
});
exports.userRrefreshTokenBodySchema = userRrefreshTokenBodySchema;
const userRegisterBodySchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    name: joi_1.default.string().min(2).max(70).required(),
    password: joi_1.default.string().min(8).required(),
    role: joi_1.default.string()
        .valid("ADMIN", "PROVIDER", "LAB")
        .default("PROVIDER")
        .optional(),
}).required();
exports.userRegisterBodySchema = userRegisterBodySchema;
