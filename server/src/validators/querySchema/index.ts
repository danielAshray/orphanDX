import Joi from "joi";

const querySchema = Joi.object({
  startIndex: Joi.number().required(),
  sortKey: Joi.string().required().allow(""),
  sortDirection: Joi.string().required().valid("asc", "desc"),
  searchBox: Joi.string().required(),
  timeZone: Joi.string().required(),
});

const pfCallbackQuery = Joi.object({
  token: Joi.string().required(),
  practiceId: Joi.string().required(),
});

const uploadParamsSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

export { querySchema, pfCallbackQuery, uploadParamsSchema };
