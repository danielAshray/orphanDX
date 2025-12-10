import Joi from "joi";

const createPatientBodySchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  practiceId: Joi.number().integer().required(),
  ehrPatientId: Joi.string().max(50).required(),
  dob: Joi.date().required(),
  gender: Joi.string()
    .regex(/^(MALE|FEMALE|OTHER)$/)
    .required()
    .messages({
      "any.required": "Gender is required",
      "string.pattern.base": "Gender must be MALE, FEMALE or OTHER",
    }),
  lastVisit: Joi.date().optional().allow(null, ""),
  phone: Joi.string().max(15).required(),
  email: Joi.string().email().max(100).required(),
});

const createOrderBodySchema = Joi.object({
  patientId: Joi.number().integer().required(),
  testId: Joi.number().integer().required(),
  providerId: Joi.number().integer().required(),
});

const createPatientRecommendationBodySchema = Joi.object({
  patientId: Joi.number().integer().required(),
  testId: Joi.number().integer().required(),
  providerId: Joi.number().integer().required(),
  status: Joi.string()
    .regex(/^(PENDING|ACCEPTED|REJECTED)$/)
    .optional()
    .messages({
      "string.pattern.base":
        "Status must be one of the following values: PENDING, ACCEPTED, REJECTED",
    }),
  reasonText: Joi.array().items(Joi.string()).required(),
});

const recommendTestBodySchema = Joi.object({
  patientId: Joi.number().required(),
  testId: Joi.number().required(),
  providerId: Joi.number().required(),
  status: Joi.string().allow("", null),
  reasonText: Joi.array().items(Joi.string()).required(),
});

const userLoginBodySchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
}).required();

const userRrefreshTokenBodySchema = Joi.object({
  refreshToken: Joi.string().required(),
});

const userRegisterBodySchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(2).max(70).required(),
  password: Joi.string().min(8).required(),
  role: Joi.string()
    .valid("ADMIN", "PROVIDER", "LAB")
    .default("PROVIDER")
    .optional(),
}).required();

export {
  userLoginBodySchema,
  userRegisterBodySchema,
  userRrefreshTokenBodySchema,
  recommendTestBodySchema,
  createOrderBodySchema,
  createPatientBodySchema,
  createPatientRecommendationBodySchema,
};
