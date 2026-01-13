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

const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().min(8).required(),
  newPassword: Joi.string().min(8).required(),
}).required();

const updateProfileSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  title: Joi.string().allow("").optional(),
  phone: Joi.string().required(),
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

const createOrderSchema = Joi.object({
  recomendationIds: Joi.array().items(Joi.string().required()).required(),
})
  .unknown(false)
  .required();

const createManualOrderSchema = Joi.object({
  patientId: Joi.string().required(),
  labId: Joi.string().required(),
  diagnosis: Joi.array().items(Joi.string().required()).min(1),
  tests: Joi.array()
    .items(
      Joi.object({
        testName: Joi.string().required(),
        cptCode: Joi.string().required(),
      })
    )
    .min(1),
})
  .unknown(false)
  .required();

const createNewManualOrderSchema = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  mrn: Joi.string().trim().required(),
  dateOfBirth: Joi.string().required(),
  gender: Joi.string().valid("MALE", "FEMALE", "OTHER").required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
  lastVisit: Joi.date().required(),

  /* Insurance */
  provider: Joi.string().required(),
  plan: Joi.string().required(),
  type: Joi.string().required(),
  memberId: Joi.string().required(),

  /* Diagnosis */
  diagnosis: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        icd10: Joi.string().required(),
        onsetDate: Joi.date().required(),
      })
    )
    .min(1),

  /* Lab */
  labId: Joi.string().required(),

  /* Tests */
  tests: Joi.array()
    .items(
      Joi.object({
        testName: Joi.string().required(),
        cptCode: Joi.string().required(),
      })
    )
    .min(1),
})
  .unknown(false)
  .required();

const collectOrderSchema = Joi.object({
  collectedAt: Joi.date().required(),
  collectedBy: Joi.string().trim().required(),
})
  .unknown(false)
  .required();

export {
  changePasswordSchema,
  updateProfileSchema,
  userLoginSchema,
  userRegisterSchema,
  createOrderSchema,
  recommendTestBodySchema,
  createPatientSchema,
  createPatientRecommendationBodySchema,
  detailsSchema,
  createOrganizationSchema,
  createManualOrderSchema,
  createNewManualOrderSchema,
  collectOrderSchema,
};
