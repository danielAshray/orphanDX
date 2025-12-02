"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateReqBody = void 0;
const validateReqBody = (schema) => {
    return (req, _res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true,
        });
        if (error) {
            const validationError = new Error(error.details.map((d) => d.message).join(", "));
            validationError.code = 400;
            return next(validationError);
        }
        req.body = value;
        next();
    };
};
exports.validateReqBody = validateReqBody;
