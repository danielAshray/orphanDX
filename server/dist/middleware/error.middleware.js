"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = exports.notFoundHandler = void 0;
const notFoundHandler = (_req, _res, next) => {
    next({ code: 404, message: "resource not found", data: null });
};
exports.notFoundHandler = notFoundHandler;
const globalErrorHandler = (error, _req, res, _next) => {
    let errorCode = 500;
    if (typeof error.code === "number" && error.code >= 100 && error.code < 600) {
        errorCode = error.code;
    }
    const errorMessage = typeof error.message === "string"
        ? error.message
        : "An unexpected error occurred";
    res.status(errorCode).json({
        status: false,
        message: errorMessage,
        data: null,
    });
};
exports.globalErrorHandler = globalErrorHandler;
