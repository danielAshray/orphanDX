import Joi, { ObjectSchema } from "joi";

class BodySchema {
  // Patient Route
  static readonly Create_Patient_Body_Schema: ObjectSchema = Joi.object({
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

  // Order Route
  static readonly Create_Order_Body_Schema: ObjectSchema = Joi.object({
    patientId: Joi.number().integer().required(),
    testId: Joi.number().integer().required(),
    providerId: Joi.number().integer().required(),
  });

  // Patient Recommendation
  static readonly Create_Patient_Recommendation_Body_Schema: ObjectSchema =
    Joi.object({
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

  // Test Route
  static readonly Recommend_Test_Body_Schema: ObjectSchema = Joi.object({
    patientId: Joi.number().required(),
    testId: Joi.number().required(),
    providerId: Joi.number().required(),
    status: Joi.string().allow("", null),
    reasonText: Joi.array().items(Joi.string()).required(),
  });

  // User Route
  static readonly User_Login_Body_Schema: ObjectSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  static readonly User_Rrefresh_Token_Body_Schema: ObjectSchema = Joi.object({
    refreshToken: Joi.string().required(),
  });
  
  static readonly User_Register_Body_Schema: ObjectSchema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(70).required(),
    password: Joi.string().min(8).required(),
    role: Joi.string()
      .valid("ADMIN", "PROVIDER", "LAB")
      .default("PROVIDER")
      .optional(),
  });
}

export default BodySchema;
