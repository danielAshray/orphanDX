import Joi from "joi";

const querySchema = Joi.object({
  startIndex: Joi.number().required(),
  sortKey: Joi.string().required().allow(""),
  sortDirection: Joi.string().required().valid("asc", "desc"),
  searchBox: Joi.string().required(),
  timeZone: Joi.string().required(),
});

export default querySchema;
