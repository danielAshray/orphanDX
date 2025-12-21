import { OrganizationRole } from "@prisma/client";
import Joi from "joi";

const createPatientSchema = Joi.object({
  firstName: Joi.string().min(2).max(100).required(),
  lastName: Joi.string().min(2).max(100).required(),
  mrn: Joi.string().max(50).required(),
  dateOfBirth: Joi.date().required(),
  gender: Joi.string().valid("MALE", "FEMALE", "OTHER").required(),
  phone: Joi.string().optional(),
  email: Joi.string().email().optional(),

  insurance: Joi.object({
    provider: Joi.string().required(),
    plan: Joi.string().required(),
  }).optional(),

  facilityId: Joi.string().uuid().optional(),
  providerId: Joi.string().uuid().optional(),
});

const createOrderSchema = Joi.object({
  patientId: Joi.number().integer().required(),
  testId: Joi.number().integer().required(),
  providerId: Joi.number().integer().required(),
}).required();

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

const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).required();

const userRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string()
    .valid("ADMIN", "LAB", "FACILITY", "PROVIDER")
    .default("PROVIDER")
    .optional(),
}).required();

const createOrganizationSchema = Joi.object({
  organization: Joi.object({
    name: Joi.string().required().lowercase(),
    role: Joi.string()
      .valid(...Object.values(OrganizationRole))
      .required(),
    phone: Joi.string().required(),
    street: Joi.string().required(),
    suite: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zipCode: Joi.string().required(),
  }).required(),

  user: Joi.object({
    name: Joi.string().required().lowercase(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().min(6).required(),
  }).required(),
}).required();

const detailsSchema = Joi.object({
  searchBox: Joi.string().required(),
});

export {
  userLoginSchema,
  userRegisterSchema,
  createOrderSchema,
  recommendTestBodySchema,
  createPatientSchema,
  createPatientRecommendationBodySchema,
  detailsSchema,
  createOrganizationSchema,
};

const resultItemSchema = Joi.object({
  component: Joi.string().required(),
  value: Joi.number().required(),
  unit: Joi.string().required(),

  referenceRange: Joi.object({
    low: Joi.number().required(),
    high: Joi.number().required(),
  }).required(),

  status: Joi.string().valid("HIGH", "LOW", "NORMAL", "CRITICAL").required(),
});

const recommendationSchema = Joi.object({
  action: Joi.string().min(3).required(),
});

export const completeTestResultSchema = Joi.object({
  orderId: Joi.string().required(),
  summary: Joi.string().required(),
  result: Joi.array().items(resultItemSchema).min(1).required(),
  recomendations: Joi.array().items(recommendationSchema).min(0).required(),
})
  .unknown(false)
  .required();
